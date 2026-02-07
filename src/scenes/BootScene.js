import Phaser from 'phaser';
import SoundFX from '../utils/SoundFX.js';
import MusicPlayer from '../utils/MusicPlayer.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    SoundFX.init(this.sound.context);
    MusicPlayer.init(this.sound.context);
    this.generateSprites();
    this.scene.start('PreloadScene');
  }

  generateSprites() {
    // --- Player ducky sprites (32x32) ---
    const duckyColors = {
      fireDucky: { body: 0xff4400, shade: 0xcc3300, belly: 0xff7744, accent: 0xff6600 },
      bubbleDucky: { body: 0x00ccff, shade: 0x0099cc, belly: 0x66ddff, accent: 0x00aadd },
      lightningDucky: { body: 0xffdd00, shade: 0xccaa00, belly: 0xffee66, accent: 0xffcc00 },
      bombingDucky: { body: 0x666666, shade: 0x444444, belly: 0x888888, accent: 0x555555 },
      luckyDucky: { body: 0x00dd66, shade: 0x00aa44, belly: 0x66ffaa, accent: 0x00cc55 },
      surfDucky: { body: 0x00bcd4, shade: 0x0097a7, belly: 0x4dd0e1, accent: 0x00acc1 },
      coconutDucky: { body: 0x8d6e63, shade: 0x6d4c41, belly: 0xa1887f, accent: 0x795548 },
      sandDucky: { body: 0xffd54f, shade: 0xffb300, belly: 0xffe082, accent: 0xffc107 },
      sharkDucky: { body: 0x546e7a, shade: 0x37474f, belly: 0x78909c, accent: 0x455a64 },
      seashellDucky: { body: 0xf48fb1, shade: 0xec407a, belly: 0xf8bbd0, accent: 0xe91e63 },
    };

    for (const [key, colors] of Object.entries(duckyColors)) {
      this.generateDuckySprite(key, colors);
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

    // --- Beach mode sprites ---
    this.generateSandTile();
    this.generateCrabSprite();
    this.generateSpike();
    this.generateWaterTile();

    // --- Lava mode sprites ---
    this.generateLavaTile();
    this.generateLavaSpike();
    this.generateLavaPool();
    this.generateMagmaDragon();

    // --- Beach ducky projectile sprites ---
    this.generateWave();
    this.generateCoconut();
    this.generateSandstormSprite();
    this.generateShark();
    this.generateShockwave();
  }

  generateDuckySprite(key, colors) {
    const g = this.add.graphics();

    // Shadow under body
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(16, 30, 22, 4);

    // Tail feathers
    g.fillStyle(colors.shade, 1);
    g.fillTriangle(2, 16, 0, 10, 6, 14);
    g.fillTriangle(1, 18, -1, 12, 5, 16);

    // Body (main oval)
    g.fillStyle(colors.body, 1);
    g.fillEllipse(16, 20, 24, 18);

    // Body shading (darker bottom)
    g.fillStyle(colors.shade, 0.4);
    g.fillEllipse(16, 24, 22, 10);

    // Belly highlight
    g.fillStyle(colors.belly, 0.6);
    g.fillEllipse(17, 18, 12, 10);

    // Wing
    g.fillStyle(colors.shade, 0.5);
    g.fillEllipse(11, 20, 10, 12);
    g.fillStyle(colors.body, 0.3);
    g.fillEllipse(11, 19, 8, 10);

    // Head
    g.fillStyle(colors.body, 1);
    g.fillCircle(20, 8, 9);

    // Head highlight
    g.fillStyle(colors.belly, 0.4);
    g.fillCircle(19, 6, 5);

    // Beak (layered for depth)
    g.fillStyle(0xdd6600, 1);
    g.fillTriangle(27, 7, 32, 9, 27, 11);
    g.fillStyle(0xff8800, 1);
    g.fillTriangle(27, 7, 31, 8, 27, 10);
    // Beak line
    g.lineStyle(1, 0xcc5500, 0.6);
    g.lineBetween(27, 9, 31, 9);

    // Eye (white part)
    g.fillStyle(0xffffff, 1);
    g.fillCircle(22, 6, 3);
    // Pupil
    g.fillStyle(0x000000, 1);
    g.fillCircle(23, 6, 2);
    // Eye highlight
    g.fillStyle(0xffffff, 1);
    g.fillCircle(24, 5, 1);

    // Feet
    g.fillStyle(0xdd6600, 1);
    g.fillTriangle(10, 28, 14, 28, 8, 31);
    g.fillTriangle(14, 28, 18, 28, 12, 31);
    g.fillTriangle(18, 28, 22, 28, 16, 31);
    g.fillTriangle(22, 28, 26, 28, 20, 31);

    // Character-specific accent
    if (key === 'fireDucky') {
      // Flame tuft on head
      g.fillStyle(0xff6600, 1);
      g.fillTriangle(17, 2, 20, -2, 23, 2);
      g.fillStyle(0xffaa00, 1);
      g.fillTriangle(18, 2, 20, -1, 22, 2);
      g.fillStyle(0xffff00, 0.8);
      g.fillTriangle(19, 2, 20, 0, 21, 2);
    } else if (key === 'bubbleDucky') {
      // Small bubbles around
      g.fillStyle(0xffffff, 0.4);
      g.fillCircle(4, 6, 2);
      g.fillCircle(28, 14, 1.5);
      g.fillCircle(1, 14, 1);
    } else if (key === 'lightningDucky') {
      // Lightning bolt on chest
      g.fillStyle(0xffff00, 0.8);
      g.fillPoints([
        { x: 16, y: 14 },
        { x: 14, y: 19 },
        { x: 16, y: 19 },
        { x: 13, y: 25 },
        { x: 18, y: 18 },
        { x: 16, y: 18 },
        { x: 19, y: 14 },
      ], true);
    } else if (key === 'bombingDucky') {
      // Aviator goggles
      g.lineStyle(2, 0x443322, 1);
      g.strokeCircle(22, 6, 4);
      g.fillStyle(0x88ccff, 0.5);
      g.fillCircle(22, 6, 3);
    } else if (key === 'luckyDucky') {
      // Star on chest
      g.fillStyle(0xffff00, 0.8);
      this.drawStar(g, 17, 19, 4, 5);
      // Clover/shamrock accent on head
      g.fillStyle(0x00aa44, 1);
      g.fillCircle(16, 1, 2);
      g.fillCircle(19, 0, 2);
      g.fillCircle(22, 1, 2);
      g.fillStyle(0x008833, 1);
      g.fillRect(18, 1, 2, 3);
    } else if (key === 'surfDucky') {
      // Wave curl on head
      g.fillStyle(0x0088cc, 0.9);
      g.beginPath();
      g.arc(20, 1, 4, Math.PI, 0, false);
      g.fillPath();
      g.fillStyle(0x44ccff, 0.7);
      g.beginPath();
      g.arc(20, 1, 2.5, Math.PI, 0, false);
      g.fillPath();
      // Foam
      g.fillStyle(0xffffff, 0.6);
      g.fillCircle(17, 0, 1);
      g.fillCircle(23, 0, 1);
    } else if (key === 'coconutDucky') {
      // Coconut on head
      g.fillStyle(0x5d4037, 1);
      g.fillCircle(19, 1, 4);
      g.fillStyle(0x795548, 0.6);
      g.fillCircle(18, 0, 2);
      // Coconut eyes (dark dots)
      g.fillStyle(0x3e2723, 1);
      g.fillCircle(17, 1, 1);
      g.fillCircle(21, 1, 1);
    } else if (key === 'sandDucky') {
      // Sand grains swirling around
      g.fillStyle(0xd4a030, 0.7);
      g.fillCircle(3, 8, 1);
      g.fillCircle(28, 12, 1.5);
      g.fillCircle(6, 3, 1);
      g.fillCircle(26, 6, 1);
      g.fillCircle(1, 16, 1.5);
      g.fillStyle(0xc49020, 0.5);
      g.fillCircle(30, 20, 1);
      g.fillCircle(4, 24, 1);
    } else if (key === 'sharkDucky') {
      // Shark fin on back
      g.fillStyle(0x37474f, 1);
      g.fillTriangle(8, 12, 12, 2, 16, 14);
      g.fillStyle(0x455a64, 0.7);
      g.fillTriangle(10, 12, 12, 4, 14, 13);
    } else if (key === 'seashellDucky') {
      // Shell accessory on head
      g.fillStyle(0xffccdd, 1);
      g.fillTriangle(14, 2, 17, -2, 20, 2);
      g.fillTriangle(17, -2, 20, -3, 20, 2);
      g.fillStyle(0xff8899, 0.6);
      g.lineBetween(15, 1, 17, -1);
      g.lineBetween(17, 1, 19, -2);
      // Pearl dot
      g.fillStyle(0xffffff, 0.8);
      g.fillCircle(17, 0, 1);
    }

    g.generateTexture(key, 32, 32);
    g.destroy();
  }

  drawStar(g, cx, cy, r, points) {
    const pts = [];
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const radius = i % 2 === 0 ? r : r * 0.4;
      pts.push({ x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius });
    }
    g.fillPoints(pts, true);
  }

  generateOctopusSprite() {
    const g = this.add.graphics();

    // Tentacles (wavy, with suction cups)
    const tentacleColor = 0x7722aa;
    const tentacleLight = 0x9944cc;
    for (let i = 0; i < 4; i++) {
      const x = 5 + i * 7;
      g.fillStyle(tentacleColor, 1);
      // Wavy tentacle shape
      g.fillRoundedRect(x, 18, 4, 10, 2);
      // Curl at bottom
      g.fillCircle(x + (i % 2 === 0 ? 4 : 0), 27, 2.5);
      // Suction cups
      g.fillStyle(0xbb66dd, 0.7);
      g.fillCircle(x + 2, 21, 1);
      g.fillCircle(x + 2, 24, 1);
    }

    // Head dome (main)
    g.fillStyle(0x9933cc, 1);
    g.fillEllipse(16, 12, 26, 20);

    // Head shading (darker bottom)
    g.fillStyle(0x7722aa, 0.4);
    g.fillEllipse(16, 16, 24, 10);

    // Head highlight (top)
    g.fillStyle(0xbb66ee, 0.5);
    g.fillEllipse(14, 7, 14, 8);

    // Spots on head
    g.fillStyle(0xaa44dd, 0.5);
    g.fillCircle(8, 8, 2);
    g.fillCircle(24, 10, 1.5);

    // Eyes (white part, larger for character)
    g.fillStyle(0xffffff, 1);
    g.fillEllipse(11, 12, 8, 9);
    g.fillEllipse(21, 12, 8, 9);

    // Pupils (looking slightly to side)
    g.fillStyle(0x220044, 1);
    g.fillCircle(12, 12, 3);
    g.fillCircle(22, 12, 3);

    // Eye highlights
    g.fillStyle(0xffffff, 1);
    g.fillCircle(13, 11, 1);
    g.fillCircle(23, 11, 1);

    // Angry eyebrows
    g.lineStyle(2, 0x440066, 1);
    g.lineBetween(7, 6, 13, 8);
    g.lineBetween(25, 6, 19, 8);

    // Mouth
    g.lineStyle(1.5, 0x440066, 0.8);
    g.beginPath();
    g.arc(16, 16, 4, 0.2, Math.PI - 0.2, false);
    g.strokePath();

    g.generateTexture('octopus', 32, 32);
    g.destroy();
  }

  generateMiniDucky() {
    const g = this.add.graphics();

    // Glow/sparkle effect
    g.fillStyle(0xffff00, 0.15);
    g.fillCircle(8, 8, 7);

    // Body
    g.fillStyle(0xffdd00, 1);
    g.fillEllipse(8, 9, 12, 10);
    // Belly highlight
    g.fillStyle(0xffee66, 0.6);
    g.fillEllipse(8, 8, 6, 6);

    // Head
    g.fillStyle(0xffdd00, 1);
    g.fillCircle(9, 4, 4);
    // Head highlight
    g.fillStyle(0xffee66, 0.5);
    g.fillCircle(8, 3, 2);

    // Beak
    g.fillStyle(0xff8800, 1);
    g.fillTriangle(12, 3, 15, 4, 12, 5);

    // Eye
    g.fillStyle(0x000000, 1);
    g.fillCircle(10, 3, 1);
    g.fillStyle(0xffffff, 1);
    g.fillRect(10, 2, 1, 1);

    g.generateTexture('miniDucky', 16, 16);
    g.destroy();
  }

  generatePancake() {
    const g = this.add.graphics();

    // Plate
    g.fillStyle(0xdddddd, 0.4);
    g.fillEllipse(16, 28, 30, 6);

    // Bottom pancake
    g.fillStyle(0xc8941e, 1);
    g.fillEllipse(16, 26, 28, 8);
    g.fillStyle(0xb8840e, 0.5);
    g.fillEllipse(16, 27, 26, 4);

    // Middle pancake
    g.fillStyle(0xdaa520, 1);
    g.fillEllipse(16, 21, 26, 8);
    g.fillStyle(0xca9510, 0.4);
    g.fillEllipse(16, 22, 24, 4);

    // Top pancake
    g.fillStyle(0xe8b530, 1);
    g.fillEllipse(16, 16, 24, 8);
    // Top highlight
    g.fillStyle(0xf0c840, 0.6);
    g.fillEllipse(14, 14, 14, 4);

    // Butter pat (3D-ish)
    g.fillStyle(0xffee88, 1);
    g.fillRoundedRect(11, 10, 10, 5, 1);
    g.fillStyle(0xfff4aa, 0.7);
    g.fillRoundedRect(12, 10, 6, 3, 1);

    // Syrup drips
    g.fillStyle(0x884400, 0.8);
    g.fillRoundedRect(5, 17, 3, 8, 1);
    g.fillCircle(6, 25, 2);
    g.fillRoundedRect(24, 15, 3, 10, 1);
    g.fillCircle(25, 25, 2.5);
    // Syrup pool on top
    g.fillStyle(0x884400, 0.3);
    g.fillEllipse(16, 15, 16, 4);

    g.generateTexture('pancake', 32, 32);
    g.destroy();
  }

  generateFireball() {
    const g = this.add.graphics();

    // Outer flame
    g.fillStyle(0xcc2200, 0.7);
    g.fillCircle(6, 6, 6);
    // Trail
    g.fillStyle(0xff4400, 0.4);
    g.fillEllipse(3, 6, 6, 4);

    // Mid flame
    g.fillStyle(0xff4400, 1);
    g.fillCircle(6, 6, 4.5);

    // Inner flame
    g.fillStyle(0xffaa00, 1);
    g.fillCircle(7, 6, 3);

    // Core
    g.fillStyle(0xffee00, 1);
    g.fillCircle(7, 5, 1.5);

    // Highlight
    g.fillStyle(0xffffff, 0.5);
    g.fillCircle(8, 4, 1);

    g.generateTexture('fireball', 12, 12);
    g.destroy();
  }

  generateBomb() {
    const g = this.add.graphics();

    // Body
    g.fillStyle(0x222222, 1);
    g.fillCircle(8, 10, 6);

    // Shading
    g.fillStyle(0x111111, 0.5);
    g.fillEllipse(9, 12, 8, 5);

    // Highlight
    g.fillStyle(0x555555, 0.6);
    g.fillCircle(6, 8, 2.5);
    g.fillStyle(0x777777, 0.4);
    g.fillCircle(5, 7, 1);

    // Fuse nozzle
    g.fillStyle(0x666666, 1);
    g.fillRoundedRect(6, 3, 5, 3, 1);

    // Fuse string
    g.lineStyle(1.5, 0x886644, 1);
    g.beginPath();
    g.moveTo(8, 3);
    g.lineTo(7, 1);
    g.lineTo(9, -1);
    g.strokePath();

    // Spark
    g.fillStyle(0xffaa00, 1);
    g.fillCircle(9, -1, 2);
    g.fillStyle(0xffff00, 1);
    g.fillCircle(9, -1, 1);
    // Spark particles
    g.fillStyle(0xffdd00, 0.8);
    g.fillCircle(7, -2, 0.5);
    g.fillCircle(11, -1, 0.5);
    g.fillCircle(9, -3, 0.5);

    g.generateTexture('bomb', 16, 16);
    g.destroy();
  }

  generateBubble() {
    const g = this.add.graphics();

    // Outer glow
    g.fillStyle(0x00ccff, 0.1);
    g.fillCircle(12, 12, 11);

    // Main bubble
    g.fillStyle(0x00ccff, 0.15);
    g.fillCircle(12, 12, 10);

    // Bubble outline (thinner for more delicate look)
    g.lineStyle(1.5, 0x44ddff, 0.6);
    g.strokeCircle(12, 12, 10);

    // Inner edge highlight
    g.lineStyle(1, 0x88eeff, 0.3);
    g.beginPath();
    g.arc(12, 12, 8, Math.PI * 0.7, Math.PI * 1.5, false);
    g.strokePath();

    // Main highlight (top-left)
    g.fillStyle(0xffffff, 0.7);
    g.fillEllipse(8, 7, 5, 4);

    // Small highlight
    g.fillStyle(0xffffff, 0.5);
    g.fillCircle(15, 15, 1.5);

    g.generateTexture('bubble', 24, 24);
    g.destroy();
  }

  generateLightning() {
    const g = this.add.graphics();

    // Outer glow
    g.fillStyle(0xffff00, 0.2);
    g.fillPoints([
      { x: 9, y: 0 },
      { x: 4, y: 13 },
      { x: 9, y: 11 },
      { x: 2, y: 32 },
      { x: 14, y: 15 },
      { x: 9, y: 17 },
      { x: 16, y: 0 },
    ], true);

    // Main bolt
    g.fillStyle(0xffff00, 1);
    g.fillPoints([
      { x: 10, y: 1 },
      { x: 5, y: 13 },
      { x: 9, y: 12 },
      { x: 3, y: 31 },
      { x: 13, y: 16 },
      { x: 9, y: 17 },
      { x: 15, y: 1 },
    ], true);

    // Bright core
    g.fillStyle(0xffffff, 0.7);
    g.fillPoints([
      { x: 11, y: 3 },
      { x: 7, y: 13 },
      { x: 10, y: 12 },
      { x: 6, y: 28 },
      { x: 12, y: 17 },
      { x: 10, y: 17 },
      { x: 14, y: 3 },
    ], true);

    // Spark at tip
    g.fillStyle(0xffffff, 0.8);
    g.fillCircle(4, 31, 2);

    g.generateTexture('lightning', 16, 32);
    g.destroy();
  }

  generateHeart() {
    const g = this.add.graphics();

    // Heart shape
    g.fillStyle(0xee0000, 1);
    g.fillCircle(5, 5, 4);
    g.fillCircle(11, 5, 4);
    g.fillTriangle(1, 7, 8, 15, 15, 7);

    // Shading (darker bottom)
    g.fillStyle(0xaa0000, 0.4);
    g.fillTriangle(3, 9, 8, 15, 13, 9);

    // Highlight
    g.fillStyle(0xff6666, 0.7);
    g.fillCircle(5, 4, 2);
    g.fillStyle(0xffffff, 0.5);
    g.fillCircle(5, 3, 1);

    g.generateTexture('heart', 16, 16);
    g.destroy();

    // Empty heart
    const g2 = this.add.graphics();
    g2.fillStyle(0x440000, 0.6);
    g2.fillCircle(5, 5, 4);
    g2.fillCircle(11, 5, 4);
    g2.fillTriangle(1, 7, 8, 15, 15, 7);
    // Outline
    g2.lineStyle(1, 0x660000, 0.5);
    g2.strokeCircle(5, 5, 4);
    g2.strokeCircle(11, 5, 4);

    g2.generateTexture('heartEmpty', 16, 16);
    g2.destroy();
  }

  generateTile() {
    const g = this.add.graphics();

    // Dirt base
    g.fillStyle(0x8b5e3c, 1);
    g.fillRect(0, 0, 16, 16);

    // Dirt texture variation
    g.fillStyle(0x7b4e2c, 0.5);
    g.fillRect(0, 8, 8, 4);
    g.fillRect(10, 12, 6, 4);
    g.fillStyle(0x9b6e4c, 0.3);
    g.fillRect(4, 6, 6, 3);
    g.fillRect(12, 4, 4, 4);

    // Grass top
    g.fillStyle(0x4a8c1a, 1);
    g.fillRect(0, 0, 16, 5);

    // Grass highlight
    g.fillStyle(0x6aac3a, 0.7);
    g.fillRect(0, 0, 16, 2);

    // Grass blades
    g.fillStyle(0x5a9c2a, 1);
    g.fillTriangle(1, 0, 2, -2, 3, 0);
    g.fillTriangle(5, 0, 7, -3, 8, 0);
    g.fillTriangle(11, 0, 12, -2, 14, 0);

    // Dirt/grass border
    g.fillStyle(0x3a7c10, 0.6);
    g.fillRect(0, 4, 16, 1);

    // Small rocks in dirt
    g.fillStyle(0x9a7a5a, 0.5);
    g.fillCircle(3, 11, 1);
    g.fillCircle(12, 9, 1.5);

    g.generateTexture('groundTile', 16, 16);
    g.destroy();
  }

  generateMovingTile() {
    const g = this.add.graphics();

    // Metal base
    g.fillStyle(0x4477aa, 1);
    g.fillRect(0, 0, 16, 16);

    // Beveled edges (3D look)
    g.fillStyle(0x5599cc, 1);
    g.fillRect(0, 0, 16, 2);  // top highlight
    g.fillRect(0, 0, 2, 16);  // left highlight
    g.fillStyle(0x335577, 1);
    g.fillRect(0, 14, 16, 2);  // bottom shadow
    g.fillRect(14, 0, 2, 16);  // right shadow

    // Center plate
    g.fillStyle(0x4488bb, 1);
    g.fillRect(3, 3, 10, 10);

    // Rivets
    g.fillStyle(0x88bbdd, 1);
    g.fillCircle(4, 4, 1.5);
    g.fillCircle(12, 4, 1.5);
    g.fillCircle(4, 12, 1.5);
    g.fillCircle(12, 12, 1.5);

    // Rivet shadows
    g.fillStyle(0x336688, 0.5);
    g.fillCircle(4.5, 4.5, 1);
    g.fillCircle(12.5, 4.5, 1);
    g.fillCircle(4.5, 12.5, 1);
    g.fillCircle(12.5, 12.5, 1);

    // Center detail (arrow or pattern)
    g.fillStyle(0x66aadd, 0.5);
    g.fillTriangle(6, 10, 8, 6, 10, 10);

    g.generateTexture('movingTile', 16, 16);
    g.destroy();
  }

  generateSandTile() {
    const g = this.add.graphics();

    // Sand base
    g.fillStyle(0xe8c878, 1);
    g.fillRect(0, 0, 16, 16);

    // Sand texture variation
    g.fillStyle(0xd4b460, 0.5);
    g.fillRect(1, 6, 5, 3);
    g.fillRect(9, 10, 6, 4);
    g.fillStyle(0xf0d890, 0.4);
    g.fillRect(5, 2, 7, 3);
    g.fillRect(0, 12, 4, 4);

    // Lighter top surface
    g.fillStyle(0xf0d9a0, 1);
    g.fillRect(0, 0, 16, 4);
    g.fillStyle(0xf5e0b0, 0.7);
    g.fillRect(0, 0, 16, 2);

    // Small shell
    g.fillStyle(0xffeecc, 0.6);
    g.fillCircle(4, 10, 1.5);
    g.fillStyle(0xeeddbb, 0.4);
    g.fillCircle(4, 10, 1);

    // Small pebble
    g.fillStyle(0xbbaa88, 0.5);
    g.fillCircle(12, 8, 1);

    // Sand grain dots
    g.fillStyle(0xd0b868, 0.3);
    g.fillCircle(8, 5, 0.5);
    g.fillCircle(14, 13, 0.5);
    g.fillCircle(2, 14, 0.5);

    g.generateTexture('sandTile', 16, 16);
    g.destroy();
  }

  generateCrabSprite() {
    const g = this.add.graphics();

    // Legs (4 per side)
    g.lineStyle(2, 0xcc3300, 1);
    // Left legs
    g.lineBetween(6, 18, 0, 24);
    g.lineBetween(8, 20, 1, 27);
    g.lineBetween(10, 20, 3, 28);
    g.lineBetween(12, 20, 5, 27);
    // Right legs
    g.lineBetween(26, 18, 32, 24);
    g.lineBetween(24, 20, 31, 27);
    g.lineBetween(22, 20, 29, 28);
    g.lineBetween(20, 20, 27, 27);

    // Body (main shell)
    g.fillStyle(0xdd4422, 1);
    g.fillEllipse(16, 18, 22, 14);

    // Shell shading (darker bottom)
    g.fillStyle(0xbb3311, 0.5);
    g.fillEllipse(16, 22, 20, 8);

    // Shell highlight (top)
    g.fillStyle(0xff6644, 0.5);
    g.fillEllipse(14, 14, 12, 6);

    // Shell pattern spots
    g.fillStyle(0xcc2200, 0.4);
    g.fillCircle(10, 17, 2);
    g.fillCircle(22, 17, 2);
    g.fillCircle(16, 15, 1.5);

    // Left claw arm
    g.fillStyle(0xdd4422, 1);
    g.fillRoundedRect(0, 10, 8, 6, 2);
    // Left claw (pincer)
    g.fillStyle(0xee5533, 1);
    g.fillTriangle(0, 8, -2, 12, 4, 10);
    g.fillTriangle(0, 16, -2, 12, 4, 14);

    // Right claw arm
    g.fillStyle(0xdd4422, 1);
    g.fillRoundedRect(24, 10, 8, 6, 2);
    // Right claw (pincer)
    g.fillStyle(0xee5533, 1);
    g.fillTriangle(32, 8, 34, 12, 28, 10);
    g.fillTriangle(32, 16, 34, 12, 28, 14);

    // Eye stalks
    g.lineStyle(2, 0xdd4422, 1);
    g.lineBetween(11, 12, 9, 5);
    g.lineBetween(21, 12, 23, 5);

    // Eyes
    g.fillStyle(0xffffff, 1);
    g.fillCircle(9, 4, 3);
    g.fillCircle(23, 4, 3);
    // Pupils
    g.fillStyle(0x000000, 1);
    g.fillCircle(10, 4, 1.5);
    g.fillCircle(24, 4, 1.5);
    // Eye highlights
    g.fillStyle(0xffffff, 1);
    g.fillCircle(10, 3, 0.5);
    g.fillCircle(24, 3, 0.5);

    // Angry mouth
    g.lineStyle(1.5, 0x881100, 0.8);
    g.beginPath();
    g.arc(16, 22, 3, 0.3, Math.PI - 0.3, false);
    g.strokePath();

    g.generateTexture('crab', 32, 32);
    g.destroy();
  }

  generateSpike() {
    const g = this.add.graphics();

    // Base on sand
    g.fillStyle(0xe8c878, 1);
    g.fillRect(0, 12, 16, 4);

    // Spike triangles (3 spikes)
    g.fillStyle(0x555555, 1);
    g.fillTriangle(1, 12, 3, 2, 5, 12);
    g.fillTriangle(5, 12, 8, 0, 11, 12);
    g.fillTriangle(11, 12, 13, 2, 15, 12);

    // Spike highlights (metallic shine)
    g.fillStyle(0x888888, 0.6);
    g.fillTriangle(2, 12, 3, 3, 3, 12);
    g.fillTriangle(6, 12, 8, 1, 8, 12);
    g.fillTriangle(12, 12, 13, 3, 13, 12);

    // Tips (bright)
    g.fillStyle(0xaaaaaa, 0.8);
    g.fillCircle(3, 3, 1);
    g.fillCircle(8, 1, 1);
    g.fillCircle(13, 3, 1);

    g.generateTexture('spike', 16, 16);
    g.destroy();
  }

  generateWaterTile() {
    const g = this.add.graphics();

    // Deep water base
    g.fillStyle(0x1565c0, 1);
    g.fillRect(0, 0, 16, 16);

    // Water variation
    g.fillStyle(0x1255a0, 0.5);
    g.fillRect(0, 6, 8, 4);
    g.fillRect(8, 10, 8, 4);

    // Surface highlight (top)
    g.fillStyle(0x42a5f5, 0.6);
    g.fillRect(0, 0, 16, 3);

    // Wave highlights
    g.fillStyle(0x90caf9, 0.4);
    g.fillEllipse(4, 2, 6, 2);
    g.fillEllipse(12, 1, 4, 2);

    // Deeper shade at bottom
    g.fillStyle(0x0d47a1, 0.3);
    g.fillRect(0, 12, 16, 4);

    // Sparkle
    g.fillStyle(0xffffff, 0.3);
    g.fillCircle(5, 4, 0.5);
    g.fillCircle(11, 7, 0.5);

    g.generateTexture('waterTile', 16, 16);
    g.destroy();
  }

  generateWave() {
    const g = this.add.graphics();

    // Wave body
    g.fillStyle(0x0088cc, 0.8);
    g.beginPath();
    g.moveTo(0, 10);
    g.lineTo(4, 4);
    g.lineTo(10, 2);
    g.lineTo(16, 4);
    g.lineTo(22, 2);
    g.lineTo(28, 4);
    g.lineTo(32, 8);
    g.lineTo(32, 16);
    g.lineTo(0, 16);
    g.closePath();
    g.fillPath();

    // Wave highlight
    g.fillStyle(0x44ccff, 0.6);
    g.beginPath();
    g.moveTo(2, 10);
    g.lineTo(6, 5);
    g.lineTo(12, 3);
    g.lineTo(18, 5);
    g.lineTo(24, 3);
    g.lineTo(30, 6);
    g.lineTo(30, 10);
    g.lineTo(2, 10);
    g.closePath();
    g.fillPath();

    // Foam crest
    g.fillStyle(0xffffff, 0.7);
    g.fillCircle(10, 3, 2);
    g.fillCircle(22, 3, 2);
    g.fillCircle(6, 5, 1.5);
    g.fillCircle(28, 5, 1.5);

    g.generateTexture('wave', 32, 16);
    g.destroy();
  }

  generateCoconut() {
    const g = this.add.graphics();

    // Coconut shell
    g.fillStyle(0x5d4037, 1);
    g.fillCircle(6, 6, 5);

    // Texture
    g.fillStyle(0x795548, 0.6);
    g.fillCircle(5, 5, 3);

    // Highlight
    g.fillStyle(0x8d6e63, 0.5);
    g.fillCircle(4, 4, 1.5);

    // Dark spots (coconut eyes)
    g.fillStyle(0x3e2723, 1);
    g.fillCircle(4, 7, 1);
    g.fillCircle(7, 7, 1);
    g.fillCircle(5.5, 5, 0.8);

    g.generateTexture('coconut', 12, 12);
    g.destroy();
  }

  generateSandstormSprite() {
    const g = this.add.graphics();

    // Outer swirl
    g.fillStyle(0xd4a030, 0.3);
    g.fillCircle(12, 12, 11);

    // Mid swirl
    g.fillStyle(0xe8c060, 0.4);
    g.fillCircle(12, 12, 8);

    // Inner cloud
    g.fillStyle(0xffd54f, 0.5);
    g.fillCircle(12, 12, 5);

    // Sand grain particles
    g.fillStyle(0xc49020, 0.7);
    g.fillCircle(4, 6, 1.5);
    g.fillCircle(18, 8, 1);
    g.fillCircle(8, 18, 1.5);
    g.fillCircle(20, 16, 1);
    g.fillCircle(6, 14, 1);
    g.fillCircle(16, 4, 1);

    // Bright center
    g.fillStyle(0xffe082, 0.6);
    g.fillCircle(12, 12, 3);

    g.generateTexture('sandstorm', 24, 24);
    g.destroy();
  }

  generateShark() {
    const g = this.add.graphics();

    // Body
    g.fillStyle(0x546e7a, 1);
    g.beginPath();
    g.moveTo(0, 8);
    g.lineTo(6, 4);
    g.lineTo(20, 3);
    g.lineTo(30, 6);
    g.lineTo(32, 8);
    g.lineTo(30, 10);
    g.lineTo(20, 13);
    g.lineTo(6, 12);
    g.closePath();
    g.fillPath();

    // Dorsal fin
    g.fillStyle(0x455a64, 1);
    g.fillTriangle(14, 3, 18, -1, 20, 3);

    // Tail fin
    g.fillStyle(0x455a64, 1);
    g.fillTriangle(0, 8, -2, 3, 4, 6);
    g.fillTriangle(0, 8, -2, 13, 4, 10);

    // Belly
    g.fillStyle(0x90a4ae, 0.5);
    g.fillEllipse(18, 10, 16, 4);

    // Eye
    g.fillStyle(0x000000, 1);
    g.fillCircle(26, 6, 1.5);
    g.fillStyle(0xffffff, 0.8);
    g.fillCircle(26, 5.5, 0.5);

    // Mouth
    g.lineStyle(1, 0x37474f, 0.8);
    g.lineBetween(28, 8, 32, 8);

    // Teeth
    g.fillStyle(0xffffff, 1);
    g.fillTriangle(29, 7, 30, 8, 29, 9);
    g.fillTriangle(31, 7, 32, 8, 31, 9);

    g.generateTexture('shark', 32, 16);
    g.destroy();
  }

  generateShockwave() {
    const g = this.add.graphics();

    // Outer ring
    g.lineStyle(3, 0xf48fb1, 0.6);
    g.strokeCircle(12, 12, 10);

    // Inner ring
    g.lineStyle(2, 0xfce4ec, 0.8);
    g.strokeCircle(12, 12, 7);

    // Core flash
    g.fillStyle(0xffffff, 0.3);
    g.fillCircle(12, 12, 4);

    // Sparkle accents
    g.fillStyle(0xffffff, 0.6);
    g.fillCircle(6, 5, 1);
    g.fillCircle(18, 7, 1);
    g.fillCircle(8, 18, 1);
    g.fillCircle(16, 16, 1);

    g.generateTexture('shockwave', 24, 24);
    g.destroy();
  }

  generateLavaTile() {
    const g = this.add.graphics();

    // Dark rock base
    g.fillStyle(0x3a3a3a, 1);
    g.fillRect(0, 0, 16, 16);

    // Rock texture
    g.fillStyle(0x2a2a2a, 0.5);
    g.fillRect(0, 7, 7, 4);
    g.fillRect(9, 11, 7, 5);
    g.fillStyle(0x444444, 0.3);
    g.fillRect(4, 2, 6, 3);
    g.fillRect(10, 6, 4, 3);

    // Lava cracks (orange glow)
    g.lineStyle(1, 0xff4400, 0.8);
    g.lineBetween(2, 8, 6, 6);
    g.lineBetween(6, 6, 10, 9);
    g.lineBetween(10, 9, 14, 7);
    g.lineStyle(1, 0xff6600, 0.5);
    g.lineBetween(4, 13, 8, 11);
    g.lineBetween(8, 11, 12, 14);

    // Top edge glow
    g.fillStyle(0xff4400, 0.3);
    g.fillRect(0, 0, 16, 2);
    g.fillStyle(0xff6600, 0.2);
    g.fillRect(0, 0, 16, 1);

    // Embers
    g.fillStyle(0xff8800, 0.4);
    g.fillCircle(3, 7, 0.5);
    g.fillCircle(11, 10, 0.5);

    g.generateTexture('lavaTile', 16, 16);
    g.destroy();
  }

  generateLavaSpike() {
    const g = this.add.graphics();

    // Dark rock base
    g.fillStyle(0x333333, 1);
    g.fillRect(0, 12, 16, 4);

    // Obsidian spikes
    g.fillStyle(0x2a2a2a, 1);
    g.fillTriangle(1, 12, 3, 2, 5, 12);
    g.fillTriangle(5, 12, 8, 0, 11, 12);
    g.fillTriangle(11, 12, 13, 2, 15, 12);

    // Lava glow on spike edges
    g.fillStyle(0xff4400, 0.4);
    g.fillTriangle(2, 12, 3, 3, 3, 12);
    g.fillTriangle(6, 12, 8, 1, 8, 12);
    g.fillTriangle(12, 12, 13, 3, 13, 12);

    // Hot glowing tips
    g.fillStyle(0xff6600, 0.9);
    g.fillCircle(3, 3, 1.5);
    g.fillCircle(8, 1, 1.5);
    g.fillCircle(13, 3, 1.5);
    g.fillStyle(0xffaa00, 0.7);
    g.fillCircle(3, 3, 0.8);
    g.fillCircle(8, 1, 0.8);
    g.fillCircle(13, 3, 0.8);

    g.generateTexture('lavaSpike', 16, 16);
    g.destroy();
  }

  generateLavaPool() {
    const g = this.add.graphics();

    // Deep lava base
    g.fillStyle(0xcc2200, 1);
    g.fillRect(0, 0, 16, 16);

    // Lava variation
    g.fillStyle(0xaa1100, 0.5);
    g.fillRect(0, 6, 8, 5);
    g.fillRect(8, 10, 8, 4);

    // Bright surface
    g.fillStyle(0xff6600, 0.6);
    g.fillRect(0, 0, 16, 3);

    // Yellow hot spots
    g.fillStyle(0xffaa00, 0.5);
    g.fillEllipse(5, 2, 6, 3);
    g.fillEllipse(12, 1, 5, 2);

    // Bubbles
    g.fillStyle(0xff8800, 0.6);
    g.fillCircle(4, 8, 2);
    g.fillCircle(12, 6, 1.5);
    g.fillStyle(0xffcc00, 0.4);
    g.fillCircle(4, 7, 1);
    g.fillCircle(12, 5, 0.8);

    // Darker bottom
    g.fillStyle(0x881100, 0.3);
    g.fillRect(0, 12, 16, 4);

    g.generateTexture('lavaPool', 16, 16);
    g.destroy();
  }

  generateMagmaDragon() {
    const g = this.add.graphics();

    // Tail
    g.fillStyle(0x8b1a1a, 1);
    g.fillTriangle(0, 20, 4, 16, 6, 22);
    g.fillStyle(0xff4400, 0.6);
    g.fillTriangle(0, 19, 2, 17, 3, 21);

    // Body
    g.fillStyle(0xb71c1c, 1);
    g.fillEllipse(16, 20, 22, 16);

    // Body shading
    g.fillStyle(0x8b1a1a, 0.4);
    g.fillEllipse(16, 24, 20, 8);

    // Belly (lighter)
    g.fillStyle(0xff6600, 0.4);
    g.fillEllipse(17, 22, 12, 8);

    // Folded wings
    g.fillStyle(0x8b1a1a, 0.7);
    g.fillTriangle(8, 14, 14, 8, 18, 16);
    g.fillStyle(0xc62828, 0.5);
    g.fillTriangle(10, 14, 14, 10, 16, 16);

    // Head
    g.fillStyle(0xc62828, 1);
    g.fillCircle(24, 10, 8);

    // Snout
    g.fillStyle(0xb71c1c, 1);
    g.fillEllipse(30, 12, 6, 4);

    // Horns
    g.fillStyle(0x4a148c, 1);
    g.fillTriangle(20, 4, 22, 0, 24, 5);
    g.fillTriangle(26, 3, 28, -1, 28, 5);

    // Eye (glowing orange)
    g.fillStyle(0xff8800, 1);
    g.fillCircle(26, 9, 2.5);
    g.fillStyle(0xffff00, 1);
    g.fillCircle(27, 8, 1);
    g.fillStyle(0x000000, 1);
    g.fillCircle(27, 9, 1);

    // Nostril smoke
    g.fillStyle(0xff4400, 0.5);
    g.fillCircle(31, 10, 1);

    // Mouth
    g.lineStyle(1.5, 0x4a0000, 0.8);
    g.beginPath();
    g.arc(28, 14, 3, 0.3, Math.PI - 0.3, false);
    g.strokePath();

    // Legs
    g.fillStyle(0x8b1a1a, 1);
    g.fillRoundedRect(10, 26, 4, 5, 1);
    g.fillRoundedRect(20, 26, 4, 5, 1);

    // Claws
    g.fillStyle(0x4a148c, 1);
    g.fillTriangle(10, 30, 11, 31, 9, 31);
    g.fillTriangle(14, 30, 15, 31, 13, 31);
    g.fillTriangle(20, 30, 21, 31, 19, 31);
    g.fillTriangle(24, 30, 25, 31, 23, 31);

    // Flame wisps on body
    g.fillStyle(0xff6600, 0.3);
    g.fillCircle(6, 18, 1.5);
    g.fillCircle(28, 16, 1);
    g.fillStyle(0xffaa00, 0.2);
    g.fillCircle(4, 14, 1);

    g.generateTexture('magmaDragon', 32, 32);
    g.destroy();
  }
}
