import Phaser from 'phaser';
import SaveSystem from '../systems/SaveSystem.js';
import SoundFX from '../utils/SoundFX.js';
import MusicPlayer from '../utils/MusicPlayer.js';

export default class LavaMenuScene extends Phaser.Scene {
  constructor() {
    super('LavaMenuScene');
  }

  create() {
    MusicPlayer.play('menu');
    const { width, height } = this.scale;

    // Dark volcanic sky
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a0a0a, 0x1a0a0a, 0x4a1a1a, 0x4a1a1a, 1);
    bg.fillRect(0, 0, width, height * 0.5);
    // Volcanic rock
    bg.fillGradientStyle(0x3a2a2a, 0x3a2a2a, 0x2a1a1a, 0x2a1a1a, 1);
    bg.fillRect(0, height * 0.5, width, height * 0.2);
    // Lava lake
    bg.fillGradientStyle(0xff4400, 0xff4400, 0xcc2200, 0xcc2200, 1);
    bg.fillRect(0, height * 0.7, width, height * 0.3);

    // Lava bubbles
    const lava = this.add.graphics();
    lava.fillStyle(0xffaa00, 0.4);
    lava.fillCircle(100, height * 0.75, 8);
    lava.fillCircle(350, height * 0.78, 6);
    lava.fillCircle(600, height * 0.73, 10);
    lava.fillStyle(0xffcc00, 0.3);
    lava.fillCircle(200, height * 0.8, 5);
    lava.fillCircle(500, height * 0.82, 7);

    // Volcanic rocks (dark pillars)
    bg.fillStyle(0x2a1a1a, 1);
    bg.fillTriangle(40, height * 0.5, 80, height * 0.2, 120, height * 0.5);
    bg.fillTriangle(680, height * 0.5, 720, height * 0.15, 760, height * 0.5);
    bg.fillStyle(0x3a2020, 0.8);
    bg.fillTriangle(50, height * 0.5, 80, height * 0.25, 110, height * 0.5);
    bg.fillTriangle(690, height * 0.5, 720, height * 0.2, 750, height * 0.5);

    // Embers floating
    const embers = this.add.graphics();
    embers.fillStyle(0xff6600, 0.6);
    embers.fillCircle(150, 80, 2);
    embers.fillCircle(400, 50, 1.5);
    embers.fillCircle(600, 90, 2);
    embers.fillCircle(250, 120, 1);
    embers.fillStyle(0xffaa00, 0.4);
    embers.fillCircle(300, 60, 1.5);
    embers.fillCircle(550, 40, 1);

    // Smoke wisps
    bg.fillStyle(0x555555, 0.15);
    bg.fillEllipse(80, height * 0.15, 40, 20);
    bg.fillEllipse(720, height * 0.1, 50, 25);

    // Title
    this.add.text(width / 2, 60, 'QUACK ATTACK', {
      fontSize: '48px',
      color: '#ff6600',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      stroke: '#cc2200',
      strokeThickness: 4,
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(width / 2, 110, 'Volcanic Inferno', {
      fontSize: '16px',
      color: '#ffaa00',
      fontFamily: 'monospace',
      fontStyle: 'italic',
    }).setOrigin(0.5);

    // Ducky display
    const ducky = this.add.image(width / 2, 170, 'fireDucky').setScale(3);
    ducky.setInteractive({ useHandCursor: true });
    ducky.on('pointerdown', () => {
      SoundFX.play('menuClick');
      this.scene.start('BeachMenuScene');
    });

    // Caption
    this.add.text(width / 2 + 115, 155, 'too hot...', {
      fontSize: '11px',
      color: '#ff8800',
      fontFamily: 'monospace',
      fontStyle: 'italic',
    }).setOrigin(0.5);

    // Total duckies
    const totalDuckies = SaveSystem.getTotalDuckies();
    this.add.image(width / 2 - 40, 220, 'miniDucky').setScale(1.5);
    this.add.text(width / 2 - 20, 213, `x ${totalDuckies}`, {
      fontSize: '16px',
      color: '#ffaa00',
      fontFamily: 'monospace',
    });

    // Play button
    this.createButton(width / 2, 280, 'PLAY', () => {
      this.scene.start('LavaLevelSelectScene');
    });

    // Characters button
    this.createButton(width / 2, 330, 'CHARACTERS', () => {
      this.scene.start('LavaCharacterStoreScene');
    });

    // Difficulty button
    const difficulty = SaveSystem.getDifficulty();
    const diffText = this.add.text(width / 2, 380, `DIFFICULTY: ${difficulty.toUpperCase()}`, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'monospace',
      backgroundColor: '#8b1a1a',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    diffText.on('pointerover', () => diffText.setStyle({ backgroundColor: '#a52020' }));
    diffText.on('pointerout', () => diffText.setStyle({ backgroundColor: '#8b1a1a' }));
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
      color: '#aa6644',
      fontFamily: 'monospace',
    }).setOrigin(0.5);
  }

  createButton(x, y, text, callback) {
    const btn = this.add.text(x, y, text, {
      fontSize: '22px',
      color: '#ffffff',
      fontFamily: 'monospace',
      backgroundColor: '#b71c1c',
      padding: { x: 30, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#d32f2f' }));
    btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#b71c1c' }));
    btn.on('pointerdown', () => { SoundFX.play('menuClick'); callback(); });

    return btn;
  }
}
