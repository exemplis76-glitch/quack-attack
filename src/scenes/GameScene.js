import Phaser from 'phaser';
import { TILE_SIZE } from '../config/gameConfig.js';
import { LEVELS } from '../config/levelDefs.js';
import Player from '../entities/Player.js';
import Octopus from '../entities/Octopus.js';
import Collectible from '../entities/Collectible.js';
import Pancake from '../entities/Pancake.js';
import HealthSystem from '../systems/HealthSystem.js';
import CombatSystem from '../systems/CombatSystem.js';
import ScoreSystem from '../systems/ScoreSystem.js';
import SaveSystem from '../systems/SaveSystem.js';
import { CHARACTERS } from '../config/characterDefs.js';
import FireballAttack from '../attacks/FireballAttack.js';
import BubbleAttack from '../attacks/BubbleAttack.js';
import LightningAttack from '../attacks/LightningAttack.js';
import BombAttack from '../attacks/BombAttack.js';
import LuckyAttack from '../attacks/LuckyAttack.js';

const SPECIAL_ATTACKS = {
  FireballAttack: new FireballAttack(),
  BubbleAttack: new BubbleAttack(),
  LightningAttack: new LightningAttack(),
  BombAttack: new BombAttack(),
  LuckyAttack: new LuckyAttack(),
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init(data) {
    this.levelNumber = data.level || 1;
  }

  create() {
    const levelDef = LEVELS[this.levelNumber - 1];
    if (!levelDef) {
      this.scene.start('MainMenuScene');
      return;
    }

    const saveData = SaveSystem.load();
    this.difficulty = saveData.difficulty;
    this.characterId = saveData.selectedCharacter;

    // Get character's special attack
    const charDef = CHARACTERS[this.characterId];
    this.specialAttackHandler = SPECIAL_ATTACKS[charDef.specialAttack];

    // World bounds
    const worldWidth = levelDef.width * TILE_SIZE;
    const worldHeight = 15 * TILE_SIZE;
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // Background
    this.cameras.main.setBackgroundColor('#87CEEB');

    // Create ground/platform group
    this.platformGroup = this.physics.add.staticGroup();
    this.buildLevel(levelDef);

    // Moving platforms
    this.movingPlatforms = [];
    if (levelDef.movingPlatforms) {
      this.buildMovingPlatforms(levelDef.movingPlatforms);
    }

    // Create player
    const px = levelDef.playerStart.x * TILE_SIZE;
    const py = levelDef.playerStart.y * TILE_SIZE;
    this.player = new Player(this, px, py, this.characterId);
    this.physics.add.collider(this.player, this.platformGroup);

    // Moving platform colliders
    this.movingPlatforms.forEach((mp) => {
      this.physics.add.collider(this.player, mp.platforms);
      // Also collide enemies with moving platforms
    });

    // Camera
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    // Systems
    this.healthSystem = new HealthSystem(this, this.difficulty);
    this.combatSystem = new CombatSystem(this);
    this.scoreSystem = new ScoreSystem(this);

    // Enemies
    this.enemyGroup = this.physics.add.group();
    this.spawnEnemies(levelDef);
    this.physics.add.collider(this.enemyGroup, this.platformGroup);

    // Enemy-player collision
    this.physics.add.overlap(this.player, this.enemyGroup, (player, enemy) => {
      if (enemy.isDead || enemy.frozen) return;
      if (player.takeHit(enemy.x)) {
        this.healthSystem.takeDamage(1);
      }
    });

    // Collectibles
    this.collectibleGroup = this.physics.add.group({ allowGravity: false });
    this.spawnCollectibles(levelDef);
    this.physics.add.overlap(this.player, this.collectibleGroup, (player, ducky) => {
      ducky.destroy();
      this.scoreSystem.collectDucky();
    });

    // Pancake
    const pcx = levelDef.pancakePosition.x * TILE_SIZE;
    const pcy = levelDef.pancakePosition.y * TILE_SIZE;
    this.pancake = new Pancake(this, pcx, pcy);
    this.physics.add.overlap(this.player, this.pancake, () => {
      this.completeLevel();
    });

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Player death
    this.events.on('player-died', () => {
      this.gameOver();
    });

    // Fall death
    this.fallDeathY = worldHeight + 50;

    // Launch UI
    this.scene.launch('UIScene', {
      maxHP: this.healthSystem.getMaxHP(),
      currentHP: this.healthSystem.getHP(),
    });

    // Forward events to UI
    this.events.on('hp-changed', (current, max) => {
      this.scene.get('UIScene').events.emit('update-hp', current, max);
    });
    this.events.on('kill-count-changed', (kills, specials) => {
      this.scene.get('UIScene').events.emit('update-kills', kills, specials);
    });
    this.events.on('ducky-collected', (count) => {
      this.scene.get('UIScene').events.emit('update-duckies', count);
    });
    this.events.on('special-earned', () => {
      this.scene.get('UIScene').events.emit('special-earned');
    });

    this.levelCompleted = false;
  }

  buildLevel(levelDef) {
    for (const plat of levelDef.platforms) {
      for (let i = 0; i < plat.w; i++) {
        for (let j = 0; j < plat.h; j++) {
          const tile = this.platformGroup.create(
            (plat.x + i) * TILE_SIZE + TILE_SIZE / 2,
            (plat.y + j) * TILE_SIZE + TILE_SIZE / 2,
            'groundTile'
          );
          tile.setDisplaySize(TILE_SIZE, TILE_SIZE);
          tile.refreshBody();
        }
      }
    }
  }

  buildMovingPlatforms(defs) {
    for (const mp of defs) {
      const group = this.physics.add.staticGroup();
      const tiles = [];

      for (let i = 0; i < mp.w; i++) {
        const tile = group.create(
          (mp.x + i) * TILE_SIZE + TILE_SIZE / 2,
          mp.y * TILE_SIZE + TILE_SIZE / 2,
          'movingTile'
        );
        tile.setDisplaySize(TILE_SIZE, TILE_SIZE);
        tile.refreshBody();
        tiles.push(tile);
      }

      const startX = mp.x * TILE_SIZE;
      const startY = mp.y * TILE_SIZE;
      const moveX = (mp.moveX || 0) * TILE_SIZE;
      const moveY = (mp.moveY || 0) * TILE_SIZE;

      this.movingPlatforms.push({
        tiles,
        platforms: group,
        startX,
        startY,
        moveX,
        moveY,
        speed: mp.speed,
        time: 0,
      });
    }
  }

  spawnEnemies(levelDef) {
    for (const ep of levelDef.enemyPositions) {
      const ex = ep.x * TILE_SIZE;
      const ey = ep.y * TILE_SIZE;
      const octopus = new Octopus(this, ex, ey, levelDef.octopusSpeed, ep.patrolDist);
      this.enemyGroup.add(octopus);
    }
  }

  spawnCollectibles(levelDef) {
    for (const cp of levelDef.collectiblePositions) {
      const cx = cp.x * TILE_SIZE;
      const cy = cp.y * TILE_SIZE;
      const collectible = new Collectible(this, cx, cy);
      this.collectibleGroup.add(collectible);
    }
  }

  update(time, delta) {
    if (this.levelCompleted) return;

    // Player movement
    this.player.handleMovement(this.cursors);

    // Slide attack (down arrow)
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      const hitbox = this.player.slideAttack();
      if (hitbox) {
        this.physics.add.overlap(hitbox, this.enemyGroup, (hb, enemy) => {
          if (!enemy.isDead) {
            enemy.die();
            this.combatSystem.registerKill();
          }
        });
      }
    }

    // Special attack (spacebar)
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      if (this.combatSystem.canUseSpecial() && this.specialAttackHandler) {
        this.combatSystem.useSpecial();
        this.specialAttackHandler.execute(this, this.player);
      }
    }

    // Update enemies
    this.enemyGroup.getChildren().forEach((enemy) => {
      enemy.update();
    });

    // Update moving platforms
    this.movingPlatforms.forEach((mp) => {
      mp.time += delta * 0.001 * mp.speed;
      const offsetX = Math.sin(mp.time * Math.PI) * mp.moveX;
      const offsetY = Math.sin(mp.time * Math.PI) * mp.moveY;

      mp.tiles.forEach((tile, i) => {
        tile.x = mp.startX + i * TILE_SIZE + TILE_SIZE / 2 + offsetX;
        tile.y = mp.startY + TILE_SIZE / 2 + offsetY;
        tile.refreshBody();
      });
    });

    // Fall death
    if (this.player.y > this.fallDeathY) {
      this.healthSystem.takeDamage(this.healthSystem.getHP());
    }
  }

  completeLevel() {
    if (this.levelCompleted) return;
    this.levelCompleted = true;

    // Save progress
    const duckiesCollected = this.scoreSystem.getLevelDuckies();
    SaveSystem.addDuckies(duckiesCollected);
    SaveSystem.completeLevel(this.levelNumber);

    this.scene.stop('UIScene');
    this.scene.start('LevelCompleteScene', {
      levelNumber: this.levelNumber,
      duckiesCollected,
      totalDuckies: SaveSystem.getTotalDuckies(),
    });
  }

  gameOver() {
    this.levelCompleted = true;
    this.scene.stop('UIScene');
    this.scene.start('GameOverScene', {
      levelNumber: this.levelNumber,
    });
  }
}
