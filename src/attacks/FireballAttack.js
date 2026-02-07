import Fireball from '../entities/Fireball.js';
import SoundFX from '../utils/SoundFX.js';

export default class FireballAttack {
  execute(scene, player) {
    SoundFX.play('fireball');
    const dir = player.facingRight ? 1 : -1;
    const fireball = new Fireball(scene, player.x + dir * 16, player.y, dir);

    // Add collision with enemies
    scene.physics.add.overlap(fireball, scene.enemyGroup, (fb, enemy) => {
      enemy.die();
      scene.combatSystem.registerKill();
      fb.destroy();
    });

    return fireball;
  }
}
