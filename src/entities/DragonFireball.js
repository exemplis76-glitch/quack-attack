import Phaser from 'phaser';

export default class DragonFireball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, dirX) {
    super(scene, x, y, 'fireball');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);
    this.setVelocityX(dirX * 200);
    this.setTint(0xff4400);

    scene.time.delayedCall(2000, () => {
      if (this.active) this.destroy();
    });
  }
}
