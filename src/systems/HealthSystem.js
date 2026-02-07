import { DIFFICULTY_HP } from '../config/gameConfig.js';

export default class HealthSystem {
  constructor(scene, difficulty) {
    this.scene = scene;
    this.maxHP = DIFFICULTY_HP[difficulty] || 5;
    this.currentHP = this.maxHP;
  }

  takeDamage(amount) {
    this.currentHP = Math.max(0, this.currentHP - amount);
    this.scene.events.emit('hp-changed', this.currentHP, this.maxHP);
    if (this.currentHP <= 0) {
      this.scene.events.emit('player-died');
    }
  }

  heal(amount) {
    this.currentHP = Math.min(this.maxHP, this.currentHP + amount);
    this.scene.events.emit('hp-changed', this.currentHP, this.maxHP);
  }

  getHP() {
    return this.currentHP;
  }

  getMaxHP() {
    return this.maxHP;
  }
}
