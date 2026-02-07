import Phaser from 'phaser';
import { CHARACTERS, BEACH_ORDER } from '../config/characterDefs.js';
import SaveSystem from '../systems/SaveSystem.js';
import SoundFX from '../utils/SoundFX.js';
import MusicPlayer from '../utils/MusicPlayer.js';

export default class BeachCharacterStoreScene extends Phaser.Scene {
  constructor() {
    super('BeachCharacterStoreScene');
  }

  create() {
    MusicPlayer.play('menu');
    const { width, height } = this.scale;

    // Beach-themed background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x4fc3f7, 0x4fc3f7, 0x1565c0, 0x1565c0, 1);
    bg.fillRect(0, 0, width, height * 0.25);
    bg.fillGradientStyle(0xf0d9a0, 0xf0d9a0, 0xe8c878, 0xe8c878, 1);
    bg.fillRect(0, height * 0.25, width, height * 0.75);

    this.add.text(width / 2, 30, 'BEACH SHOP', {
      fontSize: '28px',
      color: '#1a1a2e',
      fontFamily: 'monospace',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Total duckies
    const totalDuckies = SaveSystem.getTotalDuckies();
    this.add.image(width / 2 - 50, 65, 'miniDucky').setScale(1.2);
    this.duckyCountText = this.add.text(width / 2 - 35, 58, `x ${totalDuckies}`, {
      fontSize: '16px',
      color: '#996600',
      fontFamily: 'monospace',
    });

    const saveData = SaveSystem.load();
    const selectedChar = saveData.selectedCharacter;

    const cardWidth = 140;
    const totalWidth = BEACH_ORDER.length * cardWidth;
    const startX = (width - totalWidth) / 2 + cardWidth / 2;

    BEACH_ORDER.forEach((charId, idx) => {
      const char = CHARACTERS[charId];
      const x = startX + idx * cardWidth;
      const y = 200;

      const isUnlocked = saveData.unlockedCharacters.includes(charId);
      const isSelected = charId === selectedChar;

      // Card background - sandy/ocean tones
      const cardColor = isSelected ? 0x1565c0 : isUnlocked ? 0xc9a96e : 0xa08050;
      const card = this.add.rectangle(x, y, 120, 200, cardColor);
      card.setStrokeStyle(2, isSelected ? 0xffdd00 : 0x8d6e63);

      // Character sprite
      this.add.image(x, y - 55, charId).setScale(2);

      // Character name
      this.add.text(x, y - 15, char.name, {
        fontSize: '11px',
        color: '#ffffff',
        fontFamily: 'monospace',
        fontStyle: 'bold',
      }).setOrigin(0.5);

      // Description
      this.add.text(x, y + 10, char.description, {
        fontSize: '8px',
        color: '#eeeeee',
        fontFamily: 'monospace',
        wordWrap: { width: 110 },
        align: 'center',
      }).setOrigin(0.5);

      // Action button
      if (isSelected) {
        this.add.text(x, y + 65, 'SELECTED', {
          fontSize: '11px',
          color: '#ffdd00',
          fontFamily: 'monospace',
          fontStyle: 'bold',
        }).setOrigin(0.5);
      } else if (isUnlocked) {
        const selectBtn = this.add.text(x, y + 65, 'SELECT', {
          fontSize: '12px',
          color: '#ffffff',
          fontFamily: 'monospace',
          backgroundColor: '#1565c0',
          padding: { x: 10, y: 4 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        selectBtn.on('pointerdown', () => {
          SoundFX.play('menuClick');
          SaveSystem.setSelectedCharacter(charId);
          this.scene.restart();
        });
      } else {
        const costText = `${char.cost} duckies`;
        const canAfford = totalDuckies >= char.cost;

        this.add.text(x, y + 55, costText, {
          fontSize: '10px',
          color: canAfford ? '#ffdd00' : '#888888',
          fontFamily: 'monospace',
        }).setOrigin(0.5);

        if (canAfford) {
          const unlockBtn = this.add.text(x, y + 75, 'UNLOCK', {
            fontSize: '12px',
            color: '#ffffff',
            fontFamily: 'monospace',
            backgroundColor: '#2e7d32',
            padding: { x: 10, y: 4 },
          }).setOrigin(0.5).setInteractive({ useHandCursor: true });

          unlockBtn.on('pointerdown', () => {
            SoundFX.play('unlock');
            if (SaveSystem.spendDuckies(char.cost)) {
              SaveSystem.unlockCharacter(charId);
              this.scene.restart();
            }
          });
        } else {
          this.add.text(x, y + 75, 'LOCKED', {
            fontSize: '11px',
            color: '#666666',
            fontFamily: 'monospace',
          }).setOrigin(0.5);
        }
      }
    });

    // Back button
    const backBtn = this.add.text(width / 2, height - 35, 'BACK', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'monospace',
      backgroundColor: '#1565c0',
      padding: { x: 20, y: 8 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    backBtn.on('pointerover', () => backBtn.setStyle({ backgroundColor: '#1976d2' }));
    backBtn.on('pointerout', () => backBtn.setStyle({ backgroundColor: '#1565c0' }));
    backBtn.on('pointerdown', () => {
      SoundFX.play('menuClick');
      this.scene.start('BeachMenuScene');
    });
  }
}
