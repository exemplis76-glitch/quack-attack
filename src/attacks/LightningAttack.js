import Phaser from 'phaser';
import Lightning from '../entities/Lightning.js';

export default class LightningAttack {
  execute(scene, player) {
    const strikeRadius = 200;
    const enemies = scene.enemyGroup.getChildren().filter((e) => !e.isDead);

    enemies.forEach((enemy) => {
      const dist = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);
      if (dist <= strikeRadius) {
        new Lightning(scene, enemy.x, enemy.y - 16);
        enemy.die();
        scene.combatSystem.registerKill();
      }
    });
  }
}
