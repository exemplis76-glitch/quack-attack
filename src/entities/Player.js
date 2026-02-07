import Phaser from 'phaser';
import { PLAYER_SPEED, JUMP_FORCE, INVINCIBILITY_DURATION } from '../config/gameConfig.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, characterId) {
    super(scene, x, y, characterId);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.characterId = characterId;
    this.isInvincible = false;
    this.isSliding = false;
    this.facingRight = true;

    this.body.setSize(20, 24);
    this.body.setOffset(6, 8);
    this.setCollideWorldBounds(true);
  }

  handleMovement(cursors) {
    if (this.isSliding) return;

    if (cursors.left.isDown) {
      this.setVelocityX(-PLAYER_SPEED);
      this.setFlipX(true);
      this.facingRight = false;
    } else if (cursors.right.isDown) {
      this.setVelocityX(PLAYER_SPEED);
      this.setFlipX(false);
      this.facingRight = true;
    } else {
      this.setVelocityX(0);
    }

    if (cursors.up.isDown && this.body.onFloor()) {
      this.setVelocityY(JUMP_FORCE);
    }
  }

  slideAttack() {
    if (this.isSliding) return null;

    this.isSliding = true;

    const dir = this.facingRight ? 1 : -1;
    this.setVelocityX(dir * PLAYER_SPEED * 2);

    // Create attack hitbox
    const hitboxX = this.x + dir * 20;
    const hitbox = this.scene.add.zone(hitboxX, this.y, 28, 24);
    this.scene.physics.add.existing(hitbox, false);
    hitbox.body.setAllowGravity(false);

    this.scene.time.delayedCall(300, () => {
      hitbox.destroy();
      this.isSliding = false;
    });

    return hitbox;
  }

  triggerInvincibility() {
    if (this.isInvincible) return;
    this.isInvincible = true;

    this.scene.tweens.add({
      targets: this,
      alpha: { from: 0.3, to: 1 },
      duration: 100,
      repeat: Math.floor(INVINCIBILITY_DURATION / 200),
      yoyo: true,
    });

    this.scene.time.delayedCall(INVINCIBILITY_DURATION, () => {
      this.isInvincible = false;
      this.setAlpha(1);
    });
  }

  takeHit(enemyX) {
    if (this.isInvincible) return false;

    const knockDir = this.x < enemyX ? -1 : 1;
    this.setVelocityX(knockDir * 200);
    this.setVelocityY(-150);
    this.triggerInvincibility();
    return true;
  }
}
