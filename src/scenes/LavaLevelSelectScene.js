import Phaser from 'phaser';
import { LAVA_LEVELS } from '../config/lavaLevelDefs.js';
import SaveSystem from '../systems/SaveSystem.js';
import SoundFX from '../utils/SoundFX.js';
import MusicPlayer from '../utils/MusicPlayer.js';

export default class LavaLevelSelectScene extends Phaser.Scene {
  constructor() {
    super('LavaLevelSelectScene');
  }

  create() {
    MusicPlayer.play('menu');
    const { width, height } = this.scale;

    // Dark volcanic background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a0a0a, 0x1a0a0a, 0x4a1a1a, 0x4a1a1a, 1);
    bg.fillRect(0, 0, width, height * 0.7);
    bg.fillGradientStyle(0xff4400, 0xff4400, 0xcc2200, 0xcc2200, 1);
    bg.fillRect(0, height * 0.7, width, height * 0.3);

    this.add.text(width / 2, 40, 'LAVA LEVELS', {
      fontSize: '32px',
      color: '#ff6600',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      stroke: '#cc2200',
      strokeThickness: 3,
    }).setOrigin(0.5);

    const saveData = SaveSystem.load();
    const lavaUnlocked = saveData.lavaUnlockedLevels || [1];
    const lavaCompleted = saveData.lavaCompletedLevels || [];
    const cols = 5;
    const startX = 150;
    const startY = 120;
    const spacingX = 120;
    const spacingY = 100;

    LAVA_LEVELS.forEach((level, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = startX + col * spacingX;
      const y = startY + row * spacingY;

      const isUnlocked = lavaUnlocked.includes(level.id);
      const isCompleted = lavaCompleted.includes(level.id);

      const bgColor = isCompleted ? '#8b1a1a' : isUnlocked ? '#b71c1c' : '#555555';
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
          color: '#ffaa00',
          fontFamily: 'monospace',
        });
      }

      if (isUnlocked) {
        btn.setInteractive({ useHandCursor: true });
        btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#d32f2f' }));
        btn.on('pointerout', () => btn.setStyle({ backgroundColor: bgColor }));
        btn.on('pointerdown', () => {
          SoundFX.play('menuClick');
          this.scene.start('GameScene', { level: level.id, mode: 'lava' });
        });
      }
    });

    // Back button
    this.createButton(width / 2, height - 40, 'BACK', () => {
      this.scene.start('LavaMenuScene');
    });
  }

  createButton(x, y, text, callback) {
    const btn = this.add.text(x, y, text, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'monospace',
      backgroundColor: '#b71c1c',
      padding: { x: 20, y: 8 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#d32f2f' }));
    btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#b71c1c' }));
    btn.on('pointerdown', () => { SoundFX.play('menuClick'); callback(); });
  }
}
