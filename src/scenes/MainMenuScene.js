import Phaser from 'phaser';
import SaveSystem from '../systems/SaveSystem.js';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  create() {
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
    this.add.image(width / 2, 170, 'fireDucky').setScale(3);

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
    btn.on('pointerdown', callback);

    return btn;
  }
}
