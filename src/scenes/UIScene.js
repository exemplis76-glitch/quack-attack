import Phaser from 'phaser';
import { KILLS_PER_SPECIAL } from '../config/gameConfig.js';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  init(data) {
    this.maxHP = data.maxHP || 5;
    this.currentHP = data.currentHP || 5;
  }

  create() {
    // Hearts display (top-left)
    this.hearts = [];
    for (let i = 0; i < this.maxHP; i++) {
      const heart = this.add.image(20 + i * 20, 20, 'heart').setScale(1);
      this.hearts.push(heart);
    }

    // Kill counter (top-center)
    this.killText = this.add.text(400, 10, 'Kills: 0', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'monospace',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5, 0);

    // Special attack indicator
    this.specialText = this.add.text(400, 28, `Next special: ${KILLS_PER_SPECIAL} kills`, {
      fontSize: '12px',
      color: '#aaaaaa',
      fontFamily: 'monospace',
      stroke: '#000000',
      strokeThickness: 2,
    }).setOrigin(0.5, 0);

    // Ducky counter (top-right)
    this.duckyIcon = this.add.image(740, 20, 'miniDucky').setScale(1.2);
    this.duckyText = this.add.text(755, 13, 'x 0', {
      fontSize: '14px',
      color: '#ffdd00',
      fontFamily: 'monospace',
      stroke: '#000000',
      strokeThickness: 3,
    });

    // Listen for events from GameScene
    this.events.on('update-hp', (current, max) => {
      this.updateHearts(current, max);
    });

    this.events.on('update-kills', (kills, specials) => {
      this.killText.setText(`Kills: ${kills}`);
      if (specials > 0) {
        this.specialText.setText(`SPECIAL READY! x${specials} [SPACE]`);
        this.specialText.setColor('#ffff00');
      } else {
        const remaining = KILLS_PER_SPECIAL - (kills % KILLS_PER_SPECIAL);
        this.specialText.setText(`Next special: ${remaining} kills`);
        this.specialText.setColor('#aaaaaa');
      }
    });

    this.events.on('update-duckies', (count) => {
      this.duckyText.setText(`x ${count}`);
    });

    this.events.on('special-earned', () => {
      // Flash the special text
      this.tweens.add({
        targets: this.specialText,
        scaleX: 1.3,
        scaleY: 1.3,
        duration: 200,
        yoyo: true,
        repeat: 2,
      });
    });
  }

  updateHearts(current, max) {
    // Remove old hearts and recreate
    this.hearts.forEach((h) => h.destroy());
    this.hearts = [];

    for (let i = 0; i < max; i++) {
      const texture = i < current ? 'heart' : 'heartEmpty';
      const heart = this.add.image(20 + i * 20, 20, texture).setScale(1);
      this.hearts.push(heart);
    }
  }
}
