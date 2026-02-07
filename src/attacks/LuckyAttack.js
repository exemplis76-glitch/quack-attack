import BubbleAttack from './BubbleAttack.js';
import LightningAttack from './LightningAttack.js';
import BombAttack from './BombAttack.js';

const attacks = [
  new BubbleAttack(),
  new LightningAttack(),
  new BombAttack(),
];

export default class LuckyAttack {
  execute(scene, player) {
    const chosen = attacks[Math.floor(Math.random() * attacks.length)];
    return chosen.execute(scene, player);
  }
}
