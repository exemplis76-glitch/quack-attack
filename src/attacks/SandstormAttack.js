import Sandstorm from '../entities/Sandstorm.js';
import SoundFX from '../utils/SoundFX.js';

const SANDSTORM_FREEZE_DURATION = 5000;

export default class SandstormAttack {
  execute(scene, player) {
    SoundFX.play('sandstorm');
    const storm = new Sandstorm(scene, player.x, player.y);

    // Freeze ALL enemies in the entire level — no radius limit
    scene.enemyGroup.getChildren().forEach((enemy) => {
      if (enemy.isDead || enemy.frozen) return;
      enemy.freeze(SANDSTORM_FREEZE_DURATION);
    });

    return storm;
  }
}
