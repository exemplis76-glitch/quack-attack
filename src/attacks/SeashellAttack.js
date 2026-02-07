import Phaser from 'phaser';
import Shockwave from '../entities/Shockwave.js';
import SoundFX from '../utils/SoundFX.js';

export default class SeashellAttack {
  execute(scene, player) {
    SoundFX.play('seashell');
    const shockwave = new Shockwave(scene, player.x, player.y);

    const killRadius = 150;
    const pushRadius = 250;

    scene.enemyGroup.getChildren().forEach((enemy) => {
      if (enemy.isDead) return;
      const dist = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

      if (dist <= killRadius) {
        // Close enemies die instantly
        enemy.die();
        scene.combatSystem.registerKill();
      } else if (dist <= pushRadius) {
        // Far enemies get blasted away with strong knockback
        const angle = Phaser.Math.Angle.Between(player.x, player.y, enemy.x, enemy.y);
        enemy.setVelocityX(Math.cos(angle) * 600);
        enemy.setVelocityY(-300);
      }
    });

    return shockwave;
  }
}
