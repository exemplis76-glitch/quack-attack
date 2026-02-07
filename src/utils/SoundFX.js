export default class SoundFX {
  static init(context) {
    this.ctx = context;
    if (!this.ctx) return;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.35;
    this.masterGain.connect(this.ctx.destination);

    // Shared noise buffer
    const bufSize = this.ctx.sampleRate;
    this.noiseBuffer = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }

  static play(type) {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const t = this.ctx.currentTime;

    switch (type) {
      case 'jump': this._jump(t); break;
      case 'slide': this._slide(t); break;
      case 'hit': this._hit(t); break;
      case 'kill': this._kill(t); break;
      case 'collect': this._collect(t); break;
      case 'fireball': this._fireball(t); break;
      case 'bubble': this._bubble(t); break;
      case 'lightning': this._lightning(t); break;
      case 'bomb': this._bomb(t); break;
      case 'specialReady': this._specialReady(t); break;
      case 'specialUse': this._specialUse(t); break;
      case 'levelComplete': this._levelComplete(t); break;
      case 'gameOver': this._gameOver(t); break;
      case 'menuClick': this._menuClick(t); break;
      case 'unlock': this._unlock(t); break;
      case 'surf': this._surf(t); break;
      case 'coconut': this._coconut(t); break;
      case 'sandstorm': this._sandstorm(t); break;
      case 'shark': this._shark(t); break;
      case 'seashell': this._seashell(t); break;
      case 'dragonFire': this._dragonFire(t); break;
    }
  }

  static _osc(type, freq, startTime, duration, vol = 0.5) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(startTime);
    osc.stop(startTime + duration);
    return osc;
  }

  static _noise(startTime, duration, vol = 0.3) {
    const src = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    src.buffer = this.noiseBuffer;
    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    src.connect(gain);
    gain.connect(this.masterGain);
    src.start(startTime);
    src.stop(startTime + duration);
  }

  // Quick ascending boing
  static _jump(t) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.exponentialRampToValueAtTime(560, t + 0.08);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.12);
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  // Swoosh noise burst
  static _slide(t) {
    this._noise(t, 0.15, 0.25);
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.12);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.12);
  }

  // Low thud + noise impact
  static _hit(t) {
    this._osc('sine', 120, t, 0.2, 0.5);
    this._osc('sine', 80, t, 0.25, 0.3);
    this._noise(t, 0.1, 0.3);
  }

  // Descending pop
  static _kill(t) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.15);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.2);
    this._noise(t, 0.05, 0.15);
  }

  // Coin bling - two quick ascending notes
  static _collect(t) {
    this._osc('sine', 880, t, 0.1, 0.3);
    this._osc('sine', 1320, t + 0.07, 0.15, 0.3);
  }

  // Flame whoosh
  static _fireball(t) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.25);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.3);
    this._noise(t, 0.2, 0.2);
  }

  // Crystalline shimmer
  static _bubble(t) {
    this._osc('sine', 800, t, 0.3, 0.2);
    this._osc('sine', 1200, t + 0.05, 0.25, 0.15);
    this._osc('sine', 1000, t + 0.1, 0.2, 0.15);
    this._osc('sine', 1400, t + 0.15, 0.2, 0.1);
  }

  // Electric zap
  static _lightning(t) {
    this._noise(t, 0.15, 0.4);
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.1);
    osc.frequency.setValueAtTime(800, t + 0.1);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.2);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.25);
  }

  // Explosion
  static _bomb(t) {
    this._noise(t, 0.4, 0.5);
    this._osc('sine', 60, t, 0.3, 0.5);
    this._osc('sine', 40, t + 0.05, 0.35, 0.3);
  }

  // Ascending chime (special ready)
  static _specialReady(t) {
    this._osc('sine', 523, t, 0.15, 0.3);       // C5
    this._osc('sine', 659, t + 0.1, 0.15, 0.3);  // E5
    this._osc('sine', 784, t + 0.2, 0.2, 0.35);  // G5
    this._osc('sine', 1047, t + 0.3, 0.3, 0.3);  // C6
  }

  // Power-up whoosh
  static _specialUse(t) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.2);
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.3);
    this._noise(t + 0.05, 0.15, 0.15);
  }

  // Victory jingle
  static _levelComplete(t) {
    this._osc('sine', 523, t, 0.15, 0.3);        // C
    this._osc('sine', 659, t + 0.12, 0.15, 0.3);  // E
    this._osc('sine', 784, t + 0.24, 0.15, 0.3);  // G
    this._osc('sine', 1047, t + 0.36, 0.25, 0.35); // C high
    this._osc('sine', 784, t + 0.5, 0.12, 0.2);   // G
    this._osc('sine', 1047, t + 0.62, 0.4, 0.4);  // C high (held)
  }

  // Sad descending tones
  static _gameOver(t) {
    this._osc('sine', 440, t, 0.3, 0.3);          // A
    this._osc('sine', 370, t + 0.25, 0.3, 0.3);   // F#
    this._osc('sine', 311, t + 0.5, 0.3, 0.3);    // Eb
    this._osc('sine', 261, t + 0.75, 0.6, 0.35);  // C (held)
  }

  // Short blip
  static _menuClick(t) {
    this._osc('sine', 660, t, 0.06, 0.25);
  }

  // Purchase/unlock jingle
  static _unlock(t) {
    this._osc('sine', 660, t, 0.1, 0.3);
    this._osc('sine', 880, t + 0.08, 0.1, 0.3);
    this._osc('sine', 1100, t + 0.16, 0.2, 0.3);
  }

  // Wave crash whoosh
  static _surf(t) {
    this._noise(t, 0.4, 0.35);
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.3);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.4);
  }

  // Coconut bonk thud
  static _coconut(t) {
    this._osc('sine', 180, t, 0.15, 0.4);
    this._osc('triangle', 120, t + 0.02, 0.12, 0.25);
    this._noise(t, 0.06, 0.2);
  }

  // Hissing wind burst
  static _sandstorm(t) {
    this._noise(t, 0.5, 0.4);
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.4);
    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.5);
  }

  // Fast swoosh
  static _shark(t) {
    this._noise(t, 0.12, 0.2);
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(500, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.15);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.18);
  }

  // Conch horn blast - ascending tone
  static _seashell(t) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.15);
    osc.frequency.setValueAtTime(800, t + 0.15);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.35);
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.4);
    this._osc('triangle', 600, t + 0.05, 0.25, 0.15);
  }

  // Deep aggressive flame burst
  static _dragonFire(t) {
    this._noise(t, 0.2, 0.3);
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.2);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.25);
    this._osc('sine', 100, t, 0.15, 0.3);
  }
}
