import Phaser from 'phaser';
import SaveSystem from '../systems/SaveSystem.js';
import SoundFX from '../utils/SoundFX.js';
import MusicPlayer from '../utils/MusicPlayer.js';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  create() {
    MusicPlayer.play('menu');
    const { width, height } = this.scale;

    // Background
    this.cameras.main.setBackgroundColor('#1a1a2e');

    // Title
    this.add.text(width / 2, 60, 'QUACK ATTACK', {
      fontSize: '48px',
      color: '#ffdd00',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      stroke: '#ff8800',
      strokeThickness: 4,
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(width / 2, 110, 'A Rubber Ducky Adventure', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    // Ducky display
    const ducky = this.add.image(width / 2, 170, 'fireDucky').setScale(3);

    // Secret beach mode - only available after completing all 10 levels
    if (SaveSystem.areAllLevelsCompleted()) {
      ducky.setInteractive({ useHandCursor: true });
      ducky.on('pointerdown', () => {
        SoundFX.play('menuClick');
        this.scene.start('BeachMenuScene');
      });

      // Arrow pointing at the bird with caption
      const arrow = this.add.graphics();
      arrow.lineStyle(2, 0xffffff, 0.9);
      arrow.beginPath();
      arrow.moveTo(width / 2 + 80, 140);
      arrow.lineTo(width / 2 + 52, 162);
      arrow.strokePath();
      arrow.fillStyle(0xffffff, 0.9);
      arrow.fillTriangle(
        width / 2 + 52, 162,
        width / 2 + 60, 152,
        width / 2 + 62, 162
      );
      this.add.text(width / 2 + 115, 132, 'nothing here', {
        fontSize: '12px',
        color: '#ffffff',
        fontFamily: 'monospace',
        fontStyle: 'italic',
      }).setOrigin(0.5);
    }

    // Total duckies
    const totalDuckies = SaveSystem.getTotalDuckies();
    this.add.image(width / 2 - 40, 220, 'miniDucky').setScale(1.5);
    this.add.text(width / 2 - 20, 213, `x ${totalDuckies}`, {
      fontSize: '16px',
      color: '#ffdd00',
      fontFamily: 'monospace',
    });

    // Play button
    this.createButton(width / 2, 280, 'PLAY', () => {
      this.scene.start('LevelSelectScene');
    });

    // Characters button
    this.createButton(width / 2, 330, 'CHARACTERS', () => {
      this.scene.start('CharacterStoreScene');
    });

    // Difficulty button
    const difficulty = SaveSystem.getDifficulty();
    const diffText = this.add.text(width / 2, 380, `DIFFICULTY: ${difficulty.toUpperCase()}`, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'monospace',
      backgroundColor: '#333355',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    diffText.on('pointerover', () => diffText.setStyle({ backgroundColor: '#444477' }));
    diffText.on('pointerout', () => diffText.setStyle({ backgroundColor: '#333355' }));
    diffText.on('pointerdown', () => {
      SoundFX.play('menuClick');
      const difficulties = ['easy', 'medium', 'hard'];
      const currentIdx = difficulties.indexOf(SaveSystem.getDifficulty());
      const nextIdx = (currentIdx + 1) % difficulties.length;
      SaveSystem.setDifficulty(difficulties[nextIdx]);
      diffText.setText(`DIFFICULTY: ${difficulties[nextIdx].toUpperCase()}`);
    });

    // Controls hint
    this.add.text(width / 2, 440, 'Arrows: Move/Jump | Down: Slide | Space: Special', {
      fontSize: '11px',
      color: '#888888',
      fontFamily: 'monospace',
    }).setOrigin(0.5);
  }

  createButton(x, y, text, callback) {
    const btn = this.add.text(x, y, text, {
      fontSize: '22px',
      color: '#ffffff',
      fontFamily: 'monospace',
      backgroundColor: '#3355aa',
      padding: { x: 30, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#4466cc' }));
    btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#3355aa' }));
    btn.on('pointerdown', () => { SoundFX.play('menuClick'); callback(); });

    return btn;
  }
}
