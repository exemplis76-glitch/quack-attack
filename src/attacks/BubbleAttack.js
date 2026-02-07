import Phaser from 'phaser';
import { BUBBLE_FREEZE_DURATION } from '../config/gameConfig.js';
import Bubble from '../entities/Bubble.js';
import SoundFX from '../utils/SoundFX.js';

export default class BubbleAttack {
  execute(scene, player) {
    SoundFX.play('bubble');
    const bubble = new Bubble(scene, player.x, player.y);
    const freezeRadius = 150;

    // Freeze all nearby octopuses
    scene.enemyGroup.getChildren().forEach((enemy) => {
      if (enemy.isDead || enemy.frozen) return;
      const dist = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);
      if (dist <= freezeRadius) {
        enemy.freeze(BUBBLE_FREEZE_DURATION);
      }
    });

    return bubble;
  }
}
