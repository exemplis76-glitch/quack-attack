import Shark from '../entities/Shark.js';
import SoundFX from '../utils/SoundFX.js';

export default class SharkAttack {
  execute(scene, player) {
    SoundFX.play('shark');
    const dir = player.facingRight ? 1 : -1;
    const shark = new Shark(scene, player.x + dir * 16, player.y + 8, dir);

    // Shark kills everything it touches — doesn't stop, does two passes
    scene.physics.add.overlap(shark, scene.enemyGroup, (s, enemy) => {
      if (!enemy.isDead) {
        enemy.die();
        scene.combatSystem.registerKill();
      }
    });

    return shark;
  }
}
