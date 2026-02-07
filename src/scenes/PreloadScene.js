import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  create() {
    const { width, height } = this.scale;

    // Simple loading text
    this.add.text(width / 2, height / 2, 'QUACK ATTACK', {
      fontSize: '32px',
      color: '#ffdd00',
      fontFamily: 'monospace',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 40, 'Loading...', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    // Short delay then go to menu
    this.time.delayedCall(500, () => {
      this.scene.start('MainMenuScene');
    });
  }
}
