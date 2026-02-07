import Phaser from 'phaser';

export default class Bubble extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bubble');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);
    this.body.setCircle(12);

    // Expand animation
    this.setScale(0.1);
    scene.tweens.add({
      targets: this,
      scaleX: 1.5,
      scaleY: 1.5,
      duration: 300,
      ease: 'Back.easeOut',
    });

    // Destroy after effect radius reached
    scene.time.delayedCall(500, () => {
      if (this.active) this.destroy();
    });
  }
}
