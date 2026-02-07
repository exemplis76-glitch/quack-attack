import Phaser from 'phaser';
import { TILE_SIZE } from '../config/gameConfig.js';
import { LEVELS } from '../config/levelDefs.js';
import { BEACH_LEVELS } from '../config/beachLevelDefs.js';
import { LAVA_LEVELS } from '../config/lavaLevelDefs.js';
import Player from '../entities/Player.js';
import Octopus from '../entities/Octopus.js';
import Crab from '../entities/Crab.js';
import MagmaDragon from '../entities/MagmaDragon.js';
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
import SurfAttack from '../attacks/SurfAttack.js';
import CoconutAttack from '../attacks/CoconutAttack.js';
import SandstormAttack from '../attacks/SandstormAttack.js';
import SharkAttack from '../attacks/SharkAttack.js';
import SeashellAttack from '../attacks/SeashellAttack.js';
import SoundFX from '../utils/SoundFX.js';
import MusicPlayer from '../utils/MusicPlayer.js';

const SPECIAL_ATTACKS = {
  FireballAttack: new FireballAttack(),
  BubbleAttack: new BubbleAttack(),
  LightningAttack: new LightningAttack(),
  BombAttack: new BombAttack(),
  LuckyAttack: new LuckyAttack(),
  SurfAttack: new SurfAttack(),
  CoconutAttack: new CoconutAttack(),
  SandstormAttack: new SandstormAttack(),
  SharkAttack: new SharkAttack(),
  SeashellAttack: new SeashellAttack(),
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init(data) {
    this.levelNumber = data.level || 1;
    this.mode = data.mode || 'normal';
  }

  create() {
    MusicPlayer.play('game');
    let levelDef;
    if (this.mode === 'lava') {
      levelDef = LAVA_LEVELS[this.levelNumber - 1];
    } else if (this.mode === 'beach') {
      levelDef = BEACH_LEVELS[this.levelNumber - 1];
    } else {
      levelDef = LEVELS[this.levelNumber - 1];
    }
    if (!levelDef) {
      const menuMap = { lava: 'LavaMenuScene', beach: 'BeachMenuScene' };
      this.scene.start(menuMap[this.mode] || 'MainMenuScene');
      return;
    }

    const saveData = SaveSystem.load();
    this.difficulty = saveData.difficulty;
    this.characterId = saveData.selectedCharacter;

    // Get character's special attack
    const charDef = CHARACTERS[this.characterId];
    this.specialAttackHandler = SPECIAL_ATTACKS[charDef.specialAttack];

    // World bounds - extend below level so player can fall into gaps
    const worldWidth = levelDef.width * TILE_SIZE;
    const worldHeight = 15 * TILE_SIZE;
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight + 300);

    // Background
    const bgColors = { beach: '#4fc3f7', lava: '#4a1a1a', normal: '#87CEEB' };
    this.cameras.main.setBackgroundColor(bgColors[this.mode] || '#87CEEB');

    // Create ground/platform group
    this.platformGroup = this.physics.add.staticGroup();
    this.buildLevel(levelDef);

    // Water zones (beach mode - visual only)
    if (this.mode === 'beach' && levelDef.waterZones) {
      this.buildWater(levelDef.waterZones);
    }

    // Lava zones (lava mode - visual only, death handled by fall)
    if (this.mode === 'lava' && levelDef.lavaZones) {
      this.buildLava(levelDef.lavaZones);
    }

    // Spikes (beach mode - create sprites, overlap added after player)
    if (this.mode === 'beach' && levelDef.spikePositions) {
      this.buildSpikes(levelDef.spikePositions);
    }

    // Lava spikes (lava mode)
    if (this.mode === 'lava' && levelDef.spikePositions) {
      this.buildLavaSpikes(levelDef.spikePositions);
    }

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
    if (this.characterId === 'luckyDucky') {
      this.combatSystem.specialMultiplier = 2;
    }
    this.scoreSystem = new ScoreSystem(this);

    // Restore saved special charges from previous level
    const savedCharges = SaveSystem.getSpecialCharges();
    if (savedCharges > 0) {
      this.combatSystem.bonusCharges = savedCharges;
      this.combatSystem.specialUsesAvailable = savedCharges;
      SaveSystem.setSpecialCharges(0);
    }

    // Enemies
    this.enemyGroup = this.physics.add.group();
    // Dragon fireball group (lava mode)
    this.dragonFireballGroup = this.physics.add.group({ allowGravity: false });
    this.spawnEnemies(levelDef);
    this.physics.add.collider(this.enemyGroup, this.platformGroup);

    // Enemy-player collision
    this.physics.add.overlap(this.player, this.enemyGroup, (player, enemy) => {
      if (enemy.isDead || enemy.frozen || player.isSliding || this.godMode) return;
      if (player.takeHit(enemy.x)) {
        this.healthSystem.takeDamage(1);
        SoundFX.play('hit');
      }
    });

    // Spike-player collision (beach/lava mode - instant death)
    if (this.spikeGroup) {
      this.physics.add.overlap(this.player, this.spikeGroup, () => {
        if (!this.godMode && !this.levelCompleted) {
          this.healthSystem.takeDamage(this.healthSystem.getHP());
        }
      });
    }

    // Dragon fireball-player collision (lava mode)
    this.physics.add.overlap(this.player, this.dragonFireballGroup, (player, fb) => {
      if (this.godMode || this.levelCompleted) return;
      fb.destroy();
      if (player.takeHit(fb.x)) {
        this.healthSystem.takeDamage(1);
        SoundFX.play('hit');
      }
    });
    // Dragon fireballs die on platform contact
    this.physics.add.collider(this.dragonFireballGroup, this.platformGroup, (fb) => {
      fb.destroy();
    });

    // Collectibles
    this.collectibleGroup = this.physics.add.group({ allowGravity: false });
    this.spawnCollectibles(levelDef);
    this.physics.add.overlap(this.player, this.collectibleGroup, (player, ducky) => {
      ducky.destroy();
      this.scoreSystem.collectDucky();
      SoundFX.play('collect');
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

    // God mode cheat code: type G-O-D
    this.godMode = false;
    this.godCodeProgress = 0;
    const godSequence = [
      Phaser.Input.Keyboard.KeyCodes.G,
      Phaser.Input.Keyboard.KeyCodes.O,
      Phaser.Input.Keyboard.KeyCodes.D,
    ];
    this.godWaitingForB = false;
    this.input.keyboard.on('keydown', (event) => {
      // God mode attack shortcuts
      if (this.godMode && !this.levelCompleted) {
        if (this.godWaitingForB) {
          this.godWaitingForB = false;
          if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.O) {
            SPECIAL_ATTACKS.BombAttack.execute(this, this.player);
            return;
          } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.U) {
            SPECIAL_ATTACKS.BubbleAttack.execute(this, this.player);
            return;
          }
        }
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.F) {
          SPECIAL_ATTACKS.FireballAttack.execute(this, this.player);
          return;
        } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.L) {
          SPECIAL_ATTACKS.LightningAttack.execute(this, this.player);
          return;
        } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.B) {
          this.godWaitingForB = true;
          return;
        }
      }

      // God mode cheat code sequence
      if (event.keyCode === godSequence[this.godCodeProgress]) {
        this.godCodeProgress++;
        if (this.godCodeProgress === godSequence.length) {
          this.godMode = !this.godMode;
          this.godCodeProgress = 0;
          this.scene.get('UIScene').events.emit(
            'god-mode-changed', this.godMode
          );
        }
      } else {
        this.godCodeProgress = 0;
      }
    });

    // Player death
    this.events.on('player-died', () => {
      if (!this.godMode) this.gameOver();
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
      SoundFX.play('specialReady');
    });

    this.levelCompleted = false;

    // Notify UI of carried-over specials after UIScene is ready
    if (this.combatSystem.getSpecialUses() > 0) {
      this.time.delayedCall(50, () => {
        const uiScene = this.scene.get('UIScene');
        if (uiScene && uiScene.scene.isActive()) {
          uiScene.events.emit('update-kills',
            this.combatSystem.getKillCount(),
            this.combatSystem.getSpecialUses()
          );
        }
      });
    }
  }

  buildLevel(levelDef) {
    const tileKeys = { beach: 'sandTile', lava: 'lavaTile' };
    const tileKey = tileKeys[this.mode] || 'groundTile';
    for (const plat of levelDef.platforms) {
      for (let i = 0; i < plat.w; i++) {
        for (let j = 0; j < plat.h; j++) {
          const tile = this.platformGroup.create(
            (plat.x + i) * TILE_SIZE + TILE_SIZE / 2,
            (plat.y + j) * TILE_SIZE + TILE_SIZE / 2,
            tileKey
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
        prevOffsetX: 0,
        prevOffsetY: 0,
      });
    }
  }

  spawnEnemies(levelDef) {
    for (const ep of levelDef.enemyPositions) {
      const ex = ep.x * TILE_SIZE;
      const ey = ep.y * TILE_SIZE;
      const speed = levelDef.octopusSpeed;
      let enemy;
      if (this.mode === 'lava') {
        enemy = new MagmaDragon(this, ex, ey, speed, ep.patrolDist);
      } else if (this.mode === 'beach') {
        enemy = new Crab(this, ex, ey, speed, ep.patrolDist);
      } else {
        enemy = new Octopus(this, ex, ey, speed, ep.patrolDist);
      }
      this.enemyGroup.add(enemy);
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

  buildWater(waterZones) {
    for (const wz of waterZones) {
      for (let i = 0; i < wz.w; i++) {
        const tile = this.add.image(
          (wz.x + i) * TILE_SIZE + TILE_SIZE / 2,
          13 * TILE_SIZE + TILE_SIZE / 2,
          'waterTile'
        );
        tile.setDisplaySize(TILE_SIZE, TILE_SIZE);
      }
    }
  }

  buildSpikes(spikePositions) {
    this.spikeGroup = this.physics.add.staticGroup();
    for (const sp of spikePositions) {
      const spike = this.spikeGroup.create(
        sp.x * TILE_SIZE + TILE_SIZE / 2,
        sp.y * TILE_SIZE + TILE_SIZE / 2,
        'spike'
      );
      spike.setDisplaySize(TILE_SIZE, TILE_SIZE);
      spike.refreshBody();
    }
  }

  buildLava(lavaZones) {
    for (const lz of lavaZones) {
      for (let i = 0; i < lz.w; i++) {
        const tile = this.add.image(
          (lz.x + i) * TILE_SIZE + TILE_SIZE / 2,
          13 * TILE_SIZE + TILE_SIZE / 2,
          'lavaPool'
        );
        tile.setDisplaySize(TILE_SIZE, TILE_SIZE);
      }
    }
  }

  buildLavaSpikes(spikePositions) {
    this.spikeGroup = this.physics.add.staticGroup();
    for (const sp of spikePositions) {
      const spike = this.spikeGroup.create(
        sp.x * TILE_SIZE + TILE_SIZE / 2,
        sp.y * TILE_SIZE + TILE_SIZE / 2,
        'lavaSpike'
      );
      spike.setDisplaySize(TILE_SIZE, TILE_SIZE);
      spike.refreshBody();
    }
  }

  update(time, delta) {
    if (this.levelCompleted) return;

    // Player movement
    this.player.handleMovement(this.cursors);

    // Fly mode controls (up/down move freely)
    if (this.flyMode) {
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-200);
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(200);
      } else {
        this.player.setVelocityY(0);
      }
    }

    // Slide attack (down arrow) - only when not flying
    if (!this.flyMode && Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      const hitbox = this.player.slideAttack();
      if (hitbox) {
        this.physics.add.overlap(hitbox, this.enemyGroup, (hb, enemy) => {
          if (!enemy.isDead) {
            enemy.die();
            this.combatSystem.registerKill();
            SoundFX.play('kill');
          }
        });
      }
    }

    // Special attack (spacebar)
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      if (this.combatSystem.canUseSpecial() && this.specialAttackHandler) {
        this.combatSystem.useSpecial();
        SoundFX.play('specialUse');
        this.specialAttackHandler.execute(this, this.player);
      }
    }

    // Update enemies
    this.enemyGroup.getChildren().forEach((enemy) => {
      enemy.update(time);
    });

    // Update moving platforms
    this.movingPlatforms.forEach((mp) => {
      mp.time += delta * 0.001 * mp.speed;
      const offsetX = Math.sin(mp.time * Math.PI) * mp.moveX;
      const offsetY = Math.sin(mp.time * Math.PI) * mp.moveY;

      // Calculate movement delta for carrying the player
      const deltaX = offsetX - mp.prevOffsetX;
      const deltaY = offsetY - mp.prevOffsetY;
      mp.prevOffsetX = offsetX;
      mp.prevOffsetY = offsetY;

      // Check if player is on this platform before moving it
      let playerOnPlatform = false;
      if (this.player.body.touching.down || this.player.body.blocked.down) {
        const platTop = mp.tiles[0].y - TILE_SIZE / 2;
        const platLeft = mp.tiles[0].x - TILE_SIZE / 2;
        const platRight = mp.tiles[mp.tiles.length - 1].x + TILE_SIZE / 2;
        if (
          Math.abs(this.player.body.bottom - platTop) < 8 &&
          this.player.body.right > platLeft &&
          this.player.body.left < platRight
        ) {
          playerOnPlatform = true;
        }
      }

      // Move platform tiles
      mp.tiles.forEach((tile, i) => {
        tile.x = mp.startX + i * TILE_SIZE + TILE_SIZE / 2 + offsetX;
        tile.y = mp.startY + TILE_SIZE / 2 + offsetY;
        tile.refreshBody();
      });

      // Carry player with the platform
      if (playerOnPlatform) {
        this.player.x += deltaX;
        this.player.y += deltaY;
      }
    });

    // Fall death
    if (this.player.y > this.fallDeathY && !this.godMode) {
      this.healthSystem.takeDamage(this.healthSystem.getHP());
    }
  }

  toggleFlyMode(enabled) {
    this.flyMode = enabled;
    if (enabled) {
      this.player.body.setAllowGravity(false);
      this.player.setVelocityY(0);
    } else {
      this.player.body.setAllowGravity(true);
    }
  }

  completeLevel() {
    if (this.levelCompleted) return;
    this.levelCompleted = true;
    MusicPlayer.stop();
    SoundFX.play('levelComplete');

    // Save progress
    const duckiesCollected = this.scoreSystem.getLevelDuckies();
    SaveSystem.addDuckies(duckiesCollected);
    if (this.mode === 'lava') {
      SaveSystem.completeLavaLevel(this.levelNumber);
    } else if (this.mode === 'beach') {
      SaveSystem.completeBeachLevel(this.levelNumber);
    } else {
      SaveSystem.completeLevel(this.levelNumber);
    }
    SaveSystem.setSpecialCharges(this.combatSystem.getSpecialUses());

    this.scene.stop('UIScene');
    this.scene.start('LevelCompleteScene', {
      levelNumber: this.levelNumber,
      duckiesCollected,
      totalDuckies: SaveSystem.getTotalDuckies(),
      mode: this.mode,
    });
  }

  gameOver() {
    this.levelCompleted = true;
    MusicPlayer.stop();
    SoundFX.play('gameOver');
    this.scene.stop('UIScene');
    this.scene.start('GameOverScene', {
      levelNumber: this.levelNumber,
      mode: this.mode,
    });
  }
}
