const SAVE_KEY = 'quack-attack-save';

function getDefaultSave() {
  return {
    totalDuckies: 0,
    unlockedCharacters: ['fireDucky'],
    selectedCharacter: 'fireDucky',
    unlockedLevels: [1],
    completedLevels: [],
    difficulty: 'medium',
  };
}

export default class SaveSystem {
  static load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return getDefaultSave();
      const data = JSON.parse(raw);
      const defaults = getDefaultSave();
      return { ...defaults, ...data };
    } catch {
      return getDefaultSave();
    }
  }

  static save(data) {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  }

  static getDifficulty() {
    return this.load().difficulty;
  }

  static setDifficulty(diff) {
    const data = this.load();
    data.difficulty = diff;
    this.save(data);
  }

  static getSelectedCharacter() {
    return this.load().selectedCharacter;
  }

  static setSelectedCharacter(charId) {
    const data = this.load();
    data.selectedCharacter = charId;
    this.save(data);
  }

  static getTotalDuckies() {
    return this.load().totalDuckies;
  }

  static addDuckies(amount) {
    const data = this.load();
    data.totalDuckies += amount;
    this.save(data);
  }

  static spendDuckies(amount) {
    const data = this.load();
    if (data.totalDuckies < amount) return false;
    data.totalDuckies -= amount;
    this.save(data);
    return true;
  }

  static unlockCharacter(charId) {
    const data = this.load();
    if (!data.unlockedCharacters.includes(charId)) {
      data.unlockedCharacters.push(charId);
    }
    this.save(data);
  }

  static isCharacterUnlocked(charId) {
    return this.load().unlockedCharacters.includes(charId);
  }

  static unlockLevel(levelNum) {
    const data = this.load();
    if (!data.unlockedLevels.includes(levelNum)) {
      data.unlockedLevels.push(levelNum);
    }
    this.save(data);
  }

  static completeLevel(levelNum) {
    const data = this.load();
    if (!data.completedLevels.includes(levelNum)) {
      data.completedLevels.push(levelNum);
    }
    if (!data.unlockedLevels.includes(levelNum + 1) && levelNum < 10) {
      data.unlockedLevels.push(levelNum + 1);
    }
    this.save(data);
  }

  static isLevelUnlocked(levelNum) {
    return this.load().unlockedLevels.includes(levelNum);
  }
}
