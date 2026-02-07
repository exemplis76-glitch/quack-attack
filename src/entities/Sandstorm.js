import Phaser from 'phaser';

export default class Sandstorm extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'sandstorm');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);

    // Expand animation — larger and longer than bubble
    this.setScale(0.1);
    this.setAlpha(0.8);
    scene.tweens.add({
      targets: this,
      scaleX: 3,
      scaleY: 3,
      alpha: 0,
      duration: 800,
      ease: 'Sine.easeOut',
      onComplete: () => {
        if (this.active) this.destroy();
      },
    });
  }
}
