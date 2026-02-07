import { KILLS_PER_SPECIAL } from '../config/gameConfig.js';

export default class CombatSystem {
  constructor(scene) {
    this.scene = scene;
    this.killCount = 0;
    this.specialUsesAvailable = 0;
    this.specialUsesUsed = 0;
  }

  registerKill() {
    this.killCount++;
    const totalEarned = Math.floor(this.killCount / KILLS_PER_SPECIAL);
    this.specialUsesAvailable = totalEarned - this.specialUsesUsed;
    this.scene.events.emit('kill-count-changed', this.killCount, this.specialUsesAvailable);

    if (this.specialUsesAvailable > 0 && totalEarned === this.specialUsesUsed + this.specialUsesAvailable) {
      this.scene.events.emit('special-earned');
    }
  }

  canUseSpecial() {
    return this.specialUsesAvailable > 0;
  }

  useSpecial() {
    if (this.specialUsesAvailable > 0) {
      this.specialUsesAvailable--;
      this.specialUsesUsed++;
      this.scene.events.emit('kill-count-changed', this.killCount, this.specialUsesAvailable);
      return true;
    }
    return false;
  }

  getKillCount() {
    return this.killCount;
  }

  getSpecialUses() {
    return this.specialUsesAvailable;
  }

  getKillsUntilNextSpecial() {
    const nextThreshold = (this.specialUsesUsed + this.specialUsesAvailable + 1) * KILLS_PER_SPECIAL;
    return nextThreshold - this.killCount;
  }
}
