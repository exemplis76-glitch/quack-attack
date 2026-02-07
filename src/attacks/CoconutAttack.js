import Coconut from '../entities/Coconut.js';
import SoundFX from '../utils/SoundFX.js';

export default class CoconutAttack {
  execute(scene, player) {
    SoundFX.play('coconut');
    // Target ALL enemies in the level, not just on-screen
    const enemies = scene.enemyGroup.getChildren().filter((e) => !e.isDead);

    enemies.forEach((enemy) => {
      const coconut = new Coconut(scene, enemy.x, scene.cameras.main.scrollY - 20);

      scene.physics.add.overlap(coconut, scene.enemyGroup, (c, e) => {
        if (!e.isDead) {
          e.die();
          scene.combatSystem.registerKill();
        }
        c.destroy();
      });
    });
  }
}
