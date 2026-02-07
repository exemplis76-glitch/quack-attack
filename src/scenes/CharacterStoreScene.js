import Phaser from 'phaser';
import { CHARACTERS, CHARACTER_ORDER } from '../config/characterDefs.js';
import SaveSystem from '../systems/SaveSystem.js';

export default class CharacterStoreScene extends Phaser.Scene {
  constructor() {
    super('CharacterStoreScene');
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor('#1a1a2e');

    this.add.text(width / 2, 30, 'CHARACTER STORE', {
      fontSize: '28px',
      color: '#ffdd00',
      fontFamily: 'monospace',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Total duckies
    const totalDuckies = SaveSystem.getTotalDuckies();
    this.add.image(width / 2 - 50, 65, 'miniDucky').setScale(1.2);
    this.duckyCountText = this.add.text(width / 2 - 35, 58, `x ${totalDuckies}`, {
      fontSize: '16px',
      color: '#ffdd00',
      fontFamily: 'monospace',
    });

    const saveData = SaveSystem.load();
    const selectedChar = saveData.selectedCharacter;

    const cardWidth = 140;
    const totalWidth = CHARACTER_ORDER.length * cardWidth;
    const startX = (width - totalWidth) / 2 + cardWidth / 2;

    CHARACTER_ORDER.forEach((charId, idx) => {
      const char = CHARACTERS[charId];
      const x = startX + idx * cardWidth;
      const y = 200;

      const isUnlocked = saveData.unlockedCharacters.includes(charId);
      const isSelected = charId === selectedChar;

      // Card background
      const cardColor = isSelected ? 0x3355aa : isUnlocked ? 0x2a2a4e : 0x1a1a2e;
      const card = this.add.rectangle(x, y, 120, 200, cardColor);
      card.setStrokeStyle(2, isSelected ? 0xffdd00 : 0x555577);

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
        color: '#aaaaaa',
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
          backgroundColor: '#3355aa',
          padding: { x: 10, y: 4 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        selectBtn.on('pointerdown', () => {
          SaveSystem.setSelectedCharacter(charId);
          this.scene.restart();
        });
      } else {
        const costText = `${char.cost} duckies`;
        const canAfford = totalDuckies >= char.cost;

        const buyBtn = this.add.text(x, y + 55, costText, {
          fontSize: '10px',
          color: canAfford ? '#ffdd00' : '#888888',
          fontFamily: 'monospace',
        }).setOrigin(0.5);

        if (canAfford) {
          const unlockBtn = this.add.text(x, y + 75, 'UNLOCK', {
            fontSize: '12px',
            color: '#ffffff',
            fontFamily: 'monospace',
            backgroundColor: '#228833',
            padding: { x: 10, y: 4 },
          }).setOrigin(0.5).setInteractive({ useHandCursor: true });

          unlockBtn.on('pointerdown', () => {
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
      backgroundColor: '#333355',
      padding: { x: 20, y: 8 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    backBtn.on('pointerover', () => backBtn.setStyle({ backgroundColor: '#444477' }));
    backBtn.on('pointerout', () => backBtn.setStyle({ backgroundColor: '#333355' }));
    backBtn.on('pointerdown', () => {
      this.scene.start('MainMenuScene');
    });
  }
}
