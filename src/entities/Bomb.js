import Phaser from 'phaser';

export default class Bomb extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bomb');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(true);
    this.setVelocityY(200);

    // Destroy after a timeout if it doesn't hit anything
    scene.time.delayedCall(3000, () => {
      if (this.active) this.destroy();
    });
  }
}
