import Phaser from 'phaser';
import { CHARACTERS, CHARACTER_ORDER } from '../config/characterDefs.js';
import SaveSystem from '../systems/SaveSystem.js';
import SoundFX from '../utils/SoundFX.js';
import MusicPlayer from '../utils/MusicPlayer.js';

export default class LavaCharacterStoreScene extends Phaser.Scene {
  constructor() {
    super('LavaCharacterStoreScene');
  }

  create() {
    MusicPlayer.play('menu');
    const { width, height } = this.scale;

    // Lava-themed background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a0a0a, 0x1a0a0a, 0x3a1a1a, 0x3a1a1a, 1);
    bg.fillRect(0, 0, width, height);

    this.add.text(width / 2, 25, 'INFERNO SHOP', {
      fontSize: '24px',
      color: '#ff6600',
      fontFamily: 'monospace',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Total duckies
    const totalDuckies = SaveSystem.getTotalDuckies();
    this.add.image(width / 2 - 50, 55, 'miniDucky').setScale(1.2);
    this.duckyCountText = this.add.text(width / 2 - 35, 48, `x ${totalDuckies}`, {
      fontSize: '16px',
      color: '#ffaa00',
      fontFamily: 'monospace',
    });

    const saveData = SaveSystem.load();
    const selectedChar = saveData.selectedCharacter;

    // Row labels
    this.add.text(width / 2, 75, 'CLASSIC', {
      fontSize: '11px',
      color: '#ff8800',
      fontFamily: 'monospace',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(width / 2, 245, 'BEACH', {
      fontSize: '11px',
      color: '#ff8800',
      fontFamily: 'monospace',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // 2 rows of 5
    const cardWidth = 140;
    const totalWidth = 5 * cardWidth;
    const startX = (width - totalWidth) / 2 + cardWidth / 2;

    CHARACTER_ORDER.forEach((charId, idx) => {
      const char = CHARACTERS[charId];
      const row = Math.floor(idx / 5);
      const col = idx % 5;
      const x = startX + col * cardWidth;
      const y = row === 0 ? 155 : 325;

      const isUnlocked = saveData.unlockedCharacters.includes(charId);
      const isSelected = charId === selectedChar;

      // Card background - lava tones
      const cardColor = isSelected ? 0xb71c1c : isUnlocked ? 0x4a2020 : 0x2a1a1a;
      const card = this.add.rectangle(x, y, 120, 150, cardColor);
      card.setStrokeStyle(2, isSelected ? 0xffaa00 : 0x6a3030);

      // Character sprite
      this.add.image(x, y - 40, charId).setScale(1.8);

      // Character name
      this.add.text(x, y - 5, char.name, {
        fontSize: '9px',
        color: '#ffffff',
        fontFamily: 'monospace',
        fontStyle: 'bold',
      }).setOrigin(0.5);

      // Description
      this.add.text(x, y + 15, char.description, {
        fontSize: '7px',
        color: '#cccccc',
        fontFamily: 'monospace',
        wordWrap: { width: 110 },
        align: 'center',
      }).setOrigin(0.5);

      // Action button
      if (isSelected) {
        this.add.text(x, y + 50, 'SELECTED', {
          fontSize: '10px',
          color: '#ffaa00',
          fontFamily: 'monospace',
          fontStyle: 'bold',
        }).setOrigin(0.5);
      } else if (isUnlocked) {
        const selectBtn = this.add.text(x, y + 50, 'SELECT', {
          fontSize: '10px',
          color: '#ffffff',
          fontFamily: 'monospace',
          backgroundColor: '#b71c1c',
          padding: { x: 8, y: 3 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        selectBtn.on('pointerdown', () => {
          SoundFX.play('menuClick');
          SaveSystem.setSelectedCharacter(charId);
          this.scene.restart();
        });
      } else {
        const costText = `${char.cost} duckies`;
        const canAfford = totalDuckies >= char.cost;

        this.add.text(x, y + 42, costText, {
          fontSize: '9px',
          color: canAfford ? '#ffaa00' : '#888888',
          fontFamily: 'monospace',
        }).setOrigin(0.5);

        if (canAfford) {
          const unlockBtn = this.add.text(x, y + 58, 'UNLOCK', {
            fontSize: '10px',
            color: '#ffffff',
            fontFamily: 'monospace',
            backgroundColor: '#2e7d32',
            padding: { x: 8, y: 3 },
          }).setOrigin(0.5).setInteractive({ useHandCursor: true });

          unlockBtn.on('pointerdown', () => {
            SoundFX.play('unlock');
            if (SaveSystem.spendDuckies(char.cost)) {
              SaveSystem.unlockCharacter(charId);
              this.scene.restart();
            }
          });
        } else {
          this.add.text(x, y + 58, 'LOCKED', {
            fontSize: '10px',
            color: '#666666',
            fontFamily: 'monospace',
          }).setOrigin(0.5);
        }
      }
    });

    // Back button
    const backBtn = this.add.text(width / 2, height - 25, 'BACK', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
      backgroundColor: '#b71c1c',
      padding: { x: 20, y: 6 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    backBtn.on('pointerover', () => backBtn.setStyle({ backgroundColor: '#d32f2f' }));
    backBtn.on('pointerout', () => backBtn.setStyle({ backgroundColor: '#b71c1c' }));
    backBtn.on('pointerdown', () => {
      SoundFX.play('menuClick');
      this.scene.start('LavaMenuScene');
    });
  }
}
