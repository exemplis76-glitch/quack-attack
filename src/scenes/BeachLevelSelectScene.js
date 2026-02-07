import Phaser from 'phaser';
import { BEACH_LEVELS } from '../config/beachLevelDefs.js';
import SaveSystem from '../systems/SaveSystem.js';
import SoundFX from '../utils/SoundFX.js';
import MusicPlayer from '../utils/MusicPlayer.js';

export default class BeachLevelSelectScene extends Phaser.Scene {
  constructor() {
    super('BeachLevelSelectScene');
  }

  create() {
    MusicPlayer.play('menu');
    const { width, height } = this.scale;

    // Beach sky + sand background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x87ceeb, 0x87ceeb, 0x4fc3f7, 0x4fc3f7, 1);
    bg.fillRect(0, 0, width, height * 0.7);
    bg.fillGradientStyle(0xf0d9a0, 0xf0d9a0, 0xe8c878, 0xe8c878, 1);
    bg.fillRect(0, height * 0.7, width, height * 0.3);

    this.add.text(width / 2, 40, 'BEACH LEVELS', {
      fontSize: '32px',
      color: '#ffdd00',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      stroke: '#ff8800',
      strokeThickness: 3,
    }).setOrigin(0.5);

    const saveData = SaveSystem.load();
    const beachUnlocked = saveData.beachUnlockedLevels || [1];
    const beachCompleted = saveData.beachCompletedLevels || [];
    const cols = 5;
    const startX = 150;
    const startY = 120;
    const spacingX = 120;
    const spacingY = 100;

    BEACH_LEVELS.forEach((level, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = startX + col * spacingX;
      const y = startY + row * spacingY;

      const isUnlocked = beachUnlocked.includes(level.id);
      const isCompleted = beachCompleted.includes(level.id);

      const bgColor = isCompleted ? '#2e7d32' : isUnlocked ? '#1565c0' : '#555555';
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
        btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#1976d2' }));
        btn.on('pointerout', () => btn.setStyle({ backgroundColor: bgColor }));
        btn.on('pointerdown', () => {
          SoundFX.play('menuClick');
          this.scene.start('GameScene', { level: level.id, mode: 'beach' });
        });
      }
    });

    // Back button
    this.createButton(width / 2, height - 40, 'BACK', () => {
      this.scene.start('BeachMenuScene');
    });
  }

  createButton(x, y, text, callback) {
    const btn = this.add.text(x, y, text, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'monospace',
      backgroundColor: '#1565c0',
      padding: { x: 20, y: 8 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#1976d2' }));
    btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#1565c0' }));
    btn.on('pointerdown', () => { SoundFX.play('menuClick'); callback(); });
  }
}
