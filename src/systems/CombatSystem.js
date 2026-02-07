import { KILLS_PER_SPECIAL } from '../config/gameConfig.js';

export default class CombatSystem {
  constructor(scene) {
    this.scene = scene;
    this.killCount = 0;
    this.specialUsesAvailable = 0;
    this.specialUsesUsed = 0;
    this.bonusCharges = 0;
    this.specialMultiplier = 1;
  }

  registerKill() {
    this.killCount++;
    const totalEarned = Math.floor(this.killCount / KILLS_PER_SPECIAL) * this.specialMultiplier;
    this.specialUsesAvailable = totalEarned - this.specialUsesUsed + this.bonusCharges;
    this.scene.events.emit('kill-count-changed', this.killCount, this.specialUsesAvailable);

    if (totalEarned > 0 && this.killCount % KILLS_PER_SPECIAL === 0) {
      this.scene.events.emit('special-earned');
    }
  }

  canUseSpecial() {
    return this.specialUsesAvailable > 0;
  }

  useSpecial() {
    if (this.specialUsesAvailable > 0) {
      this.specialUsesAvailable--;
      if (this.bonusCharges > 0) {
        this.bonusCharges--;
      } else {
        this.specialUsesUsed++;
      }
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
