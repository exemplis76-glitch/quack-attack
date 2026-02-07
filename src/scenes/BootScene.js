import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    this.generateSprites();
    this.scene.start('PreloadScene');
  }

  generateSprites() {
    // --- Player ducky sprites (32x32) ---
    const duckyColors = {
      fireDucky: 0xff4400,
      bubbleDucky: 0x00ccff,
      lightningDucky: 0xffff00,
      bombingDucky: 0x666666,
      luckyDucky: 0x00ff88,
    };

    for (const [key, color] of Object.entries(duckyColors)) {
      this.generateDuckySprite(key, color);
    }

    // --- Octopus sprite (32x32) ---
    this.generateOctopusSprite();

    // --- Collectible mini ducky (16x16) ---
    this.generateMiniDucky();

    // --- Pancake (32x32) ---
    this.generatePancake();

    // --- Fireball (12x12) ---
    this.generateFireball();

    // --- Bomb (16x16) ---
    this.generateBomb();

    // --- Bubble (24x24) ---
    this.generateBubble();

    // --- Lightning (16x32) ---
    this.generateLightning();

    // --- Heart (16x16) ---
    this.generateHeart();

    // --- Platform tile (16x16) ---
    this.generateTile();

    // --- Moving platform tile (16x16) ---
    this.generateMovingTile();
  }

  generateDuckySprite(key, color) {
    const g = this.add.graphics();
    // Body (rounded rectangle)
    g.fillStyle(color, 1);
    g.fillRoundedRect(4, 8, 24, 20, 6);
    // Head
    g.fillCircle(16, 8, 8);
    // Beak
    g.fillStyle(0xff8800, 1);
    g.fillTriangle(22, 6, 30, 8, 22, 10);
    // Eye
    g.fillStyle(0x000000, 1);
    g.fillCircle(18, 6, 2);
    // Eye highlight
    g.fillStyle(0xffffff, 1);
    g.fillCircle(19, 5, 1);

    g.generateTexture(key, 32, 32);
    g.destroy();
  }

  generateOctopusSprite() {
    const g = this.add.graphics();
    // Head
    g.fillStyle(0x9933cc, 1);
    g.fillRoundedRect(4, 2, 24, 16, 8);
    // Tentacles
    g.fillStyle(0x7722aa, 1);
    for (let i = 0; i < 4; i++) {
      const x = 6 + i * 6;
      g.fillRect(x, 18, 4, 8);
      g.fillCircle(x + 2, 26, 2);
    }
    // Eyes
    g.fillStyle(0xffffff, 1);
    g.fillCircle(12, 10, 4);
    g.fillCircle(22, 10, 4);
    g.fillStyle(0x000000, 1);
    g.fillCircle(13, 10, 2);
    g.fillCircle(23, 10, 2);

    g.generateTexture('octopus', 32, 32);
    g.destroy();
  }

  generateMiniDucky() {
    const g = this.add.graphics();
    g.fillStyle(0xffdd00, 1);
    g.fillRoundedRect(2, 4, 12, 10, 3);
    g.fillCircle(8, 4, 4);
    g.fillStyle(0xff8800, 1);
    g.fillTriangle(11, 3, 15, 4, 11, 5);
    g.fillStyle(0x000000, 1);
    g.fillCircle(9, 3, 1);

    g.generateTexture('miniDucky', 16, 16);
    g.destroy();
  }

  generatePancake() {
    const g = this.add.graphics();
    // Stack of pancakes
    g.fillStyle(0xdaa520, 1);
    g.fillEllipse(16, 24, 28, 8);
    g.fillStyle(0xc8941e, 1);
    g.fillEllipse(16, 20, 26, 8);
    g.fillStyle(0xdaa520, 1);
    g.fillEllipse(16, 16, 24, 8);
    // Butter on top
    g.fillStyle(0xffee88, 1);
    g.fillRect(12, 10, 8, 4);
    // Syrup drip
    g.fillStyle(0x884400, 1);
    g.fillRect(6, 18, 3, 6);
    g.fillRect(24, 16, 3, 8);

    g.generateTexture('pancake', 32, 32);
    g.destroy();
  }

  generateFireball() {
    const g = this.add.graphics();
    g.fillStyle(0xff4400, 1);
    g.fillCircle(6, 6, 5);
    g.fillStyle(0xffaa00, 1);
    g.fillCircle(6, 6, 3);
    g.fillStyle(0xffff00, 1);
    g.fillCircle(6, 6, 1);

    g.generateTexture('fireball', 12, 12);
    g.destroy();
  }

  generateBomb() {
    const g = this.add.graphics();
    g.fillStyle(0x333333, 1);
    g.fillCircle(8, 10, 6);
    g.fillStyle(0x888888, 1);
    g.fillRect(6, 2, 4, 4);
    g.fillStyle(0xff4400, 1);
    g.fillCircle(8, 2, 2);

    g.generateTexture('bomb', 16, 16);
    g.destroy();
  }

  generateBubble() {
    const g = this.add.graphics();
    g.lineStyle(2, 0x00ccff, 0.8);
    g.strokeCircle(12, 12, 10);
    g.fillStyle(0x00ccff, 0.2);
    g.fillCircle(12, 12, 10);
    g.fillStyle(0xffffff, 0.6);
    g.fillCircle(8, 8, 3);

    g.generateTexture('bubble', 24, 24);
    g.destroy();
  }

  generateLightning() {
    const g = this.add.graphics();
    g.fillStyle(0xffff00, 1);
    g.fillPoints([
      { x: 10, y: 0 },
      { x: 6, y: 12 },
      { x: 10, y: 12 },
      { x: 4, y: 32 },
      { x: 12, y: 16 },
      { x: 8, y: 16 },
      { x: 14, y: 0 },
    ], true);

    g.generateTexture('lightning', 16, 32);
    g.destroy();
  }

  generateHeart() {
    const g = this.add.graphics();
    g.fillStyle(0xff0000, 1);
    g.fillCircle(5, 5, 4);
    g.fillCircle(11, 5, 4);
    g.fillTriangle(1, 7, 8, 15, 15, 7);

    g.generateTexture('heart', 16, 16);
    g.destroy();

    // Empty heart
    const g2 = this.add.graphics();
    g2.fillStyle(0x440000, 1);
    g2.fillCircle(5, 5, 4);
    g2.fillCircle(11, 5, 4);
    g2.fillTriangle(1, 7, 8, 15, 15, 7);

    g2.generateTexture('heartEmpty', 16, 16);
    g2.destroy();
  }

  generateTile() {
    const g = this.add.graphics();
    g.fillStyle(0x5b8c2a, 1);
    g.fillRect(0, 0, 16, 4);
    g.fillStyle(0x8b5e3c, 1);
    g.fillRect(0, 4, 16, 12);
    g.lineStyle(1, 0x6b4e2c, 1);
    g.strokeRect(0, 4, 16, 12);

    g.generateTexture('groundTile', 16, 16);
    g.destroy();
  }

  generateMovingTile() {
    const g = this.add.graphics();
    g.fillStyle(0x4488cc, 1);
    g.fillRect(0, 0, 16, 16);
    g.lineStyle(1, 0x3366aa, 1);
    g.strokeRect(0, 0, 16, 16);
    g.fillStyle(0x66aaee, 1);
    g.fillRect(2, 2, 4, 4);
    g.fillRect(10, 10, 4, 4);

    g.generateTexture('movingTile', 16, 16);
    g.destroy();
  }
}
