import Bomb from '../entities/Bomb.js';

export default class BombAttack {
  execute(scene, player) {
    const enemies = scene.enemyGroup.getChildren().filter((e) => !e.isDead);

    // Drop bombs from sky on all enemies on screen
    const cam = scene.cameras.main;
    const screenLeft = cam.scrollX;
    const screenRight = cam.scrollX + cam.width;

    enemies.forEach((enemy) => {
      if (enemy.x >= screenLeft && enemy.x <= screenRight) {
        const bomb = new Bomb(scene, enemy.x, cam.scrollY - 20);

        scene.physics.add.overlap(bomb, scene.enemyGroup, (b, e) => {
          if (!e.isDead) {
            e.die();
            scene.combatSystem.registerKill();
          }
          b.destroy();
        });
      }
    });
  }
}
