import Phaser from 'phaser';

export default class Shockwave extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'shockwave');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);

    // Expanding ring effect
    this.setScale(0.2);
    this.setAlpha(0.9);
    scene.tweens.add({
      targets: this,
      scaleX: 4,
      scaleY: 4,
      alpha: 0,
      duration: 400,
      ease: 'Sine.easeOut',
      onComplete: () => {
        if (this.active) this.destroy();
      },
    });
  }
}
