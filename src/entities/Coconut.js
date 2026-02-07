import Phaser from 'phaser';

export default class Coconut extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'coconut');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(true);
    this.setVelocityY(250);

    // Spin as it falls
    scene.tweens.add({
      targets: this,
      angle: 360,
      duration: 600,
      repeat: -1,
    });

    scene.time.delayedCall(3000, () => {
      if (this.active) this.destroy();
    });
  }
}
