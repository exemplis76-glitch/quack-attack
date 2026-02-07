import Phaser from 'phaser';
import { LEVELS } from '../config/levelDefs.js';
import SaveSystem from '../systems/SaveSystem.js';

export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super('LevelSelectScene');
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#1a1a2e');

    this.add.text(width / 2, 40, 'SELECT LEVEL', {
      fontSize: '32px',
      color: '#ffdd00',
      fontFamily: 'monospace',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    const saveData = SaveSystem.load();
    const cols = 5;
    const startX = 150;
    const startY = 120;
    const spacingX = 120;
    const spacingY = 100;

    LEVELS.forEach((level, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = startX + col * spacingX;
      const y = startY + row * spacingY;

      const isUnlocked = saveData.unlockedLevels.includes(level.id);
      const isCompleted = saveData.completedLevels.includes(level.id);

      const bgColor = isCompleted ? '#228833' : isUnlocked ? '#3355aa' : '#555555';
      const textColor = isUnlocked ? '#ffffff' : '#888888';

      const btn = this.add.text(x, y, `${level.id}`, {
        fontSize: '28px',
        color: textColor,
        fontFamily: 'monospace',
        fontStyle: 'bold',
        backgroundColor: bgColor,
        padding: { x: 20, y: 12 },
      }).setOrigin(0.5);

      // Level name below
      this.add.text(x, y + 32, level.name, {
        fontSize: '10px',
        color: textColor,
        fontFamily: 'monospace',
      }).setOrigin(0.5);

      if (isCompleted) {
        this.add.text(x + 22, y - 18, '★', {
          fontSize: '14px',
          color: '#ffdd00',
          fontFamily: 'monospace',
        });
      }

      if (isUnlocked) {
        btn.setInteractive({ useHandCursor: true });
        btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#4466cc' }));
        btn.on('pointerout', () => btn.setStyle({ backgroundColor: bgColor }));
        btn.on('pointerdown', () => {
          this.scene.start('GameScene', { level: level.id });
        });
      }
    });

    // Back button
    this.createButton(width / 2, height - 40, 'BACK', () => {
      this.scene.start('MainMenuScene');
    });
  }

  createButton(x, y, text, callback) {
    const btn = this.add.text(x, y, text, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'monospace',
      backgroundColor: '#333355',
      padding: { x: 20, y: 8 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#444477' }));
    btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#333355' }));
    btn.on('pointerdown', callback);
  }
}
