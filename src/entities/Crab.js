import Phaser from 'phaser';
import { TILE_SIZE } from '../config/gameConfig.js';

export default class Crab extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, speed, patrolDist) {
    super(scene, x, y, 'crab');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = speed;
    this.patrolDist = patrolDist * TILE_SIZE;
    this.startX = x;
    this.direction = 1;
    this.frozen = false;
    this.isDead = false;

    this.body.setSize(24, 28);
    this.body.setOffset(4, 4);
    this.setVelocityX(this.speed);
    this.setCollideWorldBounds(true);
  }

  update() {
    if (this.isDead || this.frozen) return;

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
