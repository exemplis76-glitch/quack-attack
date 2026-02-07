import Phaser from 'phaser';

export default class Lightning extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'lightning');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);

    // Flash effect
    scene.tweens.add({
      targets: this,
      alpha: { from: 1, to: 0 },
      duration: 400,
      ease: 'Power2',
      onComplete: () => {
        if (this.active) this.destroy();
      },
    });
  }
}
