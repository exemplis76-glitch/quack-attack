import Phaser from 'phaser';
import { TILE_SIZE } from '../config/gameConfig.js';
import DragonFireball from './DragonFireball.js';
import SoundFX from '../utils/SoundFX.js';

export default class MagmaDragon extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, speed, patrolDist) {
    super(scene, x, y, 'magmaDragon');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = speed;
    this.patrolDist = patrolDist * TILE_SIZE;
    this.startX = x;
    this.direction = 1;
    this.frozen = false;
    this.isDead = false;
    this.lastFireTime = 0;
    this.fireCooldown = 2000;

    this.body.setSize(24, 28);
    this.body.setOffset(4, 4);
    this.setVelocityX(this.speed);
    this.setCollideWorldBounds(true);
  }

  update(time) {
    if (this.isDead || this.frozen) return;

    // Patrol
    if (this.x > this.startX + this.patrolDist) {
      this.direction = -1;
    } else if (this.x < this.startX - this.patrolDist) {
      this.direction = 1;
    }

    if (this.body.blocked.left) {
      this.direction = 1;
    } else if (this.body.blocked.right) {
      this.direction = -1;
    }

    this.setVelocityX(this.speed * this.direction);
    this.setFlipX(this.direction === -1);

    // Shoot fireballs at nearby player
    const player = this.scene.player;
    if (player && !player.isDead && this.scene.dragonFireballGroup) {
      const dx = player.x - this.x;
      const dy = player.y - this.y;

      if (Math.abs(dx) < 250 && Math.abs(dy) < 64) {
        const now = time || Date.now();
        if (now - this.lastFireTime > this.fireCooldown) {
          this.lastFireTime = now;
          const fireDir = dx > 0 ? 1 : -1;
          const fb = new DragonFireball(this.scene, this.x, this.y, fireDir);
          this.scene.dragonFireballGroup.add(fb);
          SoundFX.play('dragonFire');
        }
      }
    }
  }

  freeze(duration) {
    this.frozen = true;
    this.setVelocityX(0);
    this.setTint(0x00ccff);
    this.scene.time.delayedCall(duration, () => {
      if (!this.isDead && this.active) {
        this.frozen = false;
        this.clearTint();
        this.setVelocityX(this.speed * this.direction);
      }
    });
  }

  die() {
    if (this.isDead) return;
    this.isDead = true;
    this.body.enable = false;
    this.setTint(0xff0000);
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      y: this.y - 20,
      duration: 400,
      onComplete: () => this.destroy(),
    });
  }
}
