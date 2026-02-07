import Phaser from 'phaser';
import SaveSystem from '../systems/SaveSystem.js';
import SoundFX from '../utils/SoundFX.js';
import MusicPlayer from '../utils/MusicPlayer.js';

export default class BeachMenuScene extends Phaser.Scene {
  constructor() {
    super('BeachMenuScene');
  }

  create() {
    MusicPlayer.play('menu');
    const { width, height } = this.scale;

    // Beach sky gradient background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x87ceeb, 0x87ceeb, 0x4fc3f7, 0x4fc3f7, 1);
    bg.fillRect(0, 0, width, height * 0.55);
    // Ocean
    bg.fillGradientStyle(0x1565c0, 0x1565c0, 0x0d47a1, 0x0d47a1, 1);
    bg.fillRect(0, height * 0.55, width, height * 0.15);
    // Sand
    bg.fillGradientStyle(0xf0d9a0, 0xf0d9a0, 0xe8c878, 0xe8c878, 1);
    bg.fillRect(0, height * 0.7, width, height * 0.3);

    // Sun
    const sun = this.add.graphics();
    sun.fillStyle(0xffee58, 1);
    sun.fillCircle(680, 60, 40);
    sun.fillStyle(0xffee58, 0.3);
    sun.fillCircle(680, 60, 55);

    // Secret hint + clickable sun after all 10 beach levels complete
    if (SaveSystem.areAllBeachLevelsCompleted()) {
      const arrow = this.add.graphics();
      arrow.lineStyle(2, 0xff8800, 0.9);
      arrow.beginPath();
      arrow.moveTo(620, 100);
      arrow.lineTo(650, 78);
      arrow.strokePath();
      arrow.fillStyle(0xff8800, 0.9);
      arrow.fillTriangle(650, 78, 642, 86, 648, 88);

      this.add.text(590, 110, "It's so hot!", {
        fontSize: '12px',
        color: '#ff8800',
        fontFamily: 'monospace',
        fontStyle: 'italic',
      }).setOrigin(0.5);

      // Make sun clickable → lava world
      const sunHit = this.add.circle(680, 60, 55, 0x000000, 0)
        .setInteractive({ useHandCursor: true });
      sunHit.on('pointerdown', () => {
        SoundFX.play('menuClick');
        this.scene.start('LavaMenuScene');
      });
    }

    // Clouds
    this.drawCloud(bg, 100, 50, 0.8);
    this.drawCloud(bg, 350, 30, 0.6);
    this.drawCloud(bg, 550, 70, 0.7);

    // Waves
    const waves = this.add.graphics();
    waves.lineStyle(2, 0xffffff, 0.4);
    for (let w = 0; w < 3; w++) {
      waves.beginPath();
      for (let x = 0; x <= width; x += 5) {
        const y = height * 0.55 + w * 12 + Math.sin(x * 0.03 + w) * 4;
        if (x === 0) waves.moveTo(x, y);
        else waves.lineTo(x, y);
      }
      waves.strokePath();
    }

    // Palm tree left
    this.drawPalmTree(bg, 60, height * 0.7);
    // Palm tree right
    this.drawPalmTree(bg, 740, height * 0.7);

    // Beach umbrella
    const umbrella = this.add.graphics();
    umbrella.fillStyle(0xff4444, 1);
    umbrella.fillTriangle(600, height * 0.58, 560, height * 0.7, 640, height * 0.7);
    umbrella.fillStyle(0xffffff, 1);
    umbrella.fillTriangle(600, height * 0.58, 580, height * 0.7, 620, height * 0.7);
    umbrella.lineStyle(3, 0x8d6e63, 1);
    umbrella.beginPath();
    umbrella.moveTo(600, height * 0.58);
    umbrella.lineTo(600, height * 0.82);
    umbrella.strokePath();

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
    this.add.text(width / 2, 110, 'Beach Vacation Edition', {
      fontSize: '16px',
      color: '#1a1a2e',
      fontFamily: 'monospace',
      fontStyle: 'italic',
    }).setOrigin(0.5);

    // Ducky display with sunglasses vibe
    const ducky = this.add.image(width / 2, 170, 'fireDucky').setScale(3);
    ducky.setInteractive({ useHandCursor: true });
    ducky.on('pointerdown', () => {
      SoundFX.play('menuClick');
      this.scene.start('MainMenuScene');
    });

    // "shhh" caption
    this.add.text(width / 2 + 115, 155, 'shhh...', {
      fontSize: '11px',
      color: '#1a1a2e',
      fontFamily: 'monospace',
      fontStyle: 'italic',
    }).setOrigin(0.5);

    // Total duckies
    const totalDuckies = SaveSystem.getTotalDuckies();
    this.add.image(width / 2 - 40, 220, 'miniDucky').setScale(1.5);
    this.add.text(width / 2 - 20, 213, `x ${totalDuckies}`, {
      fontSize: '16px',
      color: '#996600',
      fontFamily: 'monospace',
    });

    // Play button
    this.createButton(width / 2, 280, 'PLAY', () => {
      this.scene.start('BeachLevelSelectScene');
    });

    // Characters button
    this.createButton(width / 2, 330, 'CHARACTERS', () => {
      this.scene.start('BeachCharacterStoreScene');
    });

    // Difficulty button
    const difficulty = SaveSystem.getDifficulty();
    const diffText = this.add.text(width / 2, 380, `DIFFICULTY: ${difficulty.toUpperCase()}`, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'monospace',
      backgroundColor: '#2e7d32',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    diffText.on('pointerover', () => diffText.setStyle({ backgroundColor: '#388e3c' }));
    diffText.on('pointerout', () => diffText.setStyle({ backgroundColor: '#2e7d32' }));
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
      color: '#5d4037',
      fontFamily: 'monospace',
    }).setOrigin(0.5);
  }

  drawCloud(g, x, y, alpha) {
    g.fillStyle(0xffffff, alpha);
    g.fillEllipse(x, y, 60, 24);
    g.fillEllipse(x - 20, y + 6, 40, 18);
    g.fillEllipse(x + 22, y + 4, 44, 20);
  }

  drawPalmTree(g, x, groundY) {
    // Trunk
    g.lineStyle(8, 0x8d6e63, 1);
    g.beginPath();
    g.moveTo(x, groundY);
    g.lineTo(x - 10, groundY - 80);
    g.lineTo(x - 5, groundY - 130);
    g.strokePath();

    // Leaves
    const leafTop = groundY - 130;
    g.fillStyle(0x2e7d32, 1);
    g.fillEllipse(x - 30, leafTop + 5, 50, 12);
    g.fillEllipse(x + 25, leafTop + 8, 50, 12);
    g.fillEllipse(x - 10, leafTop - 10, 40, 12);
    g.fillEllipse(x + 15, leafTop - 5, 45, 12);
    g.fillStyle(0x388e3c, 1);
    g.fillEllipse(x - 20, leafTop + 12, 45, 10);
    g.fillEllipse(x + 30, leafTop + 15, 40, 10);
  }

  createButton(x, y, text, callback) {
    const btn = this.add.text(x, y, text, {
      fontSize: '22px',
      color: '#ffffff',
      fontFamily: 'monospace',
      backgroundColor: '#1565c0',
      padding: { x: 30, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#1976d2' }));
    btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#1565c0' }));
    btn.on('pointerdown', () => { SoundFX.play('menuClick'); callback(); });

    return btn;
  }
}
