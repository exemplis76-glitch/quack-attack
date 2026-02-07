import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  init(data) {
    this.levelNumber = data.levelNumber || 1;
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#2e1a1a');

    this.add.text(width / 2, 100, 'GAME OVER', {
      fontSize: '48px',
      color: '#ff4444',
      fontFamily: 'monospace',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(width / 2, 160, `Level ${this.levelNumber}`, {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.add.text(width / 2, 200, 'The octopuses got you!', {
      fontSize: '14px',
      color: '#aaaaaa',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    // Buttons
    this.createButton(width / 2, 280, 'RETRY', () => {
      this.scene.start('GameScene', { level: this.levelNumber });
    });

    this.createButton(width / 2, 330, 'CHARACTER STORE', () => {
      this.scene.start('CharacterStoreScene');
    });

    this.createButton(width / 2, 380, 'HOME', () => {
      this.scene.start('MainMenuScene');
    });
  }

  createButton(x, y, text, callback) {
    const btn = this.add.text(x, y, text, {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'monospace',
      backgroundColor: '#3355aa',
      padding: { x: 25, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#4466cc' }));
    btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#3355aa' }));
    btn.on('pointerdown', callback);
  }
}
