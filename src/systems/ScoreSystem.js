export default class ScoreSystem {
  constructor(scene) {
    this.scene = scene;
    this.levelDuckies = 0;
  }

  collectDucky() {
    this.levelDuckies++;
    this.scene.events.emit('ducky-collected', this.levelDuckies);
  }

  getLevelDuckies() {
    return this.levelDuckies;
  }
}
