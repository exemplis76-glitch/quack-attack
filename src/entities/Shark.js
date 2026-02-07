import Phaser from 'phaser';

export default class Shark extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, direction) {
    super(scene, x, y, 'shark');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);
    this.direction = direction;
    this.speed = 500;
    this.setVelocityX(direction * this.speed);
    this.setFlipX(direction < 0);
    this.hasReversed = false;

    // Reverse after 1.2 seconds for a second pass
    scene.time.delayedCall(1200, () => {
      if (this.active) {
        this.hasReversed = true;
        this.direction *= -1;
        this.setVelocityX(this.direction * this.speed);
        this.setFlipX(this.direction < 0);
      }
    });

    // Destroy after total 3 seconds
    scene.time.delayedCall(3000, () => {
      if (this.active) this.destroy();
    });
  }
}
