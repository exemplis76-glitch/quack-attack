import Phaser from 'phaser';

export default class Wave extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, direction) {
    super(scene, x, y, 'wave');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);
    this.setVelocityX(direction * 400);
    this.setScale(1.5, 1);

    // Wave doesn't die on contact — plows through everything
    scene.time.delayedCall(3000, () => {
      if (this.active) this.destroy();
    });
  }
}
