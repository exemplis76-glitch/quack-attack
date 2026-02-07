import Phaser from 'phaser';

export default class Fireball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, direction) {
    super(scene, x, y, 'fireball');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);
    this.setVelocityX(direction * 300);

    // Destroy after traveling far enough
    scene.time.delayedCall(1500, () => {
      if (this.active) this.destroy();
    });
  }
}
