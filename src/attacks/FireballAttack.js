import Fireball from '../entities/Fireball.js';

export default class FireballAttack {
  execute(scene, player) {
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
