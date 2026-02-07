import Phaser from 'phaser';
import SaveSystem from '../systems/SaveSystem.js';
import SoundFX from '../utils/SoundFX.js';

export default class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super('LevelCompleteScene');
  }

  init(data) {
    this.levelNumber = data.levelNumber || 1;
    this.duckiesCollected = data.duckiesCollected || 0;
    this.totalDuckies = data.totalDuckies || 0;
    this.mode = data.mode || 'normal';
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#1a2e1a');

    // Pancake graphic
    this.add.image(width / 2, 70, 'pancake').setScale(3);

    // Title
    this.add.text(width / 2, 130, 'LEVEL COMPLETE!', {
      fontSize: '36px',
      color: '#ffdd00',
      fontFamily: 'monospace',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Level info
    this.add.text(width / 2, 170, `Level ${this.levelNumber}`, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    // Duckies collected
    this.add.image(width / 2 - 60, 210, 'miniDucky').setScale(1.5);
    this.add.text(width / 2 - 40, 203, `+${this.duckiesCollected} collected`, {
      fontSize: '16px',
      color: '#ffdd00',
      fontFamily: 'monospace',
    });

    this.add.text(width / 2, 240, `Total: ${this.totalDuckies}`, {
      fontSize: '14px',
      color: '#aaffaa',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    // Buttons
    const buttonY = 300;
    const spacing = 50;

    this.createButton(width / 2, buttonY, 'REDO LEVEL', () => {
      this.scene.start('GameScene', { level: this.levelNumber, mode: this.mode });
    });

    if (this.levelNumber < 10) {
      this.createButton(width / 2, buttonY + spacing, 'NEXT LEVEL', () => {
        this.scene.start('GameScene', { level: this.levelNumber + 1, mode: this.mode });
      });
    }

    this.createButton(width / 2, buttonY + spacing * 2, 'CHARACTER STORE', () => {
      this.scene.start('CharacterStoreScene');
    });

    this.createButton(width / 2, buttonY + spacing * 3, 'HOME', () => {
      this.scene.start(this.mode === 'beach' ? 'BeachMenuScene' : 'MainMenuScene');
    });
  }

  createButton(x, y, text, callback) {
    const btn = this.add.text(x, y, text, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'monospace',
      backgroundColor: '#3355aa',
      padding: { x: 25, y: 8 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#4466cc' }));
    btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#3355aa' }));
    btn.on('pointerdown', () => { SoundFX.play('menuClick'); callback(); });
  }
}
