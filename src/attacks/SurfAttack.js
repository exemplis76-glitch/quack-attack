import Wave from '../entities/Wave.js';
import SoundFX from '../utils/SoundFX.js';

export default class SurfAttack {
  execute(scene, player) {
    SoundFX.play('surf');
    const dir = player.facingRight ? 1 : -1;
    const wave = new Wave(scene, player.x + dir * 16, player.y, dir);

    // Wave kills everything it touches — doesn't stop on contact
    scene.physics.add.overlap(wave, scene.enemyGroup, (w, enemy) => {
      if (!enemy.isDead) {
        enemy.die();
        scene.combatSystem.registerKill();
      }
    });

    return wave;
  }
}
