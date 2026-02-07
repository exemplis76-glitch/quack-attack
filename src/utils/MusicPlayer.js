const N = {
  0: 0,
  Eb3: 156, Bb3: 233,
  C3: 131, D3: 147, E3: 165, F3: 175, G3: 196, A3: 220, B3: 247,
  C4: 262, D4: 294, E4: 330, F4: 349, G4: 392, A4: 440, Bb4: 466, B4: 494,
  C5: 523, D5: 587, E5: 659, F5: 698, G5: 784, A5: 880, Bb5: 932, B5: 988,
  C6: 1047, D6: 1175,
};

const TRACKS = {
  // Whimsical duck waddle theme - Bb major, swung feel
  menu: {
    tempo: 105,
    melody: [
      N.F5, 0,    N.G5, N.F5, 0,    N.D5, 0,    N.Bb4,
      0,    N.C5, N.D5, 0,    N.F5, 0,    0,    0,
      N.G5, 0,    N.A5, N.Bb5,0,    N.A5, 0,    N.G5,
      0,    N.F5, 0,    N.D5, 0,    0,    0,    0,
      N.Bb5,0,    N.A5, 0,    N.G5, 0,    N.F5, N.G5,
      0,    N.F5, 0,    N.D5, N.C5, 0,    0,    0,
      N.D5, 0,    N.F5, 0,    N.G5, N.F5, N.D5, 0,
      N.C5, 0,    N.D5, 0,    N.F5, 0,    0,    0,
    ],
    bass: [
      N.Bb3,0,    0,    N.Bb3,0,    0,    N.F3, 0,
      0,    N.F3, 0,    0,    N.Bb3,0,    0,    0,
      N.Eb3,0,    0,    N.Eb3,0,    0,    N.Bb3,0,
      0,    N.F3, 0,    0,    N.Bb3,0,    0,    0,
      N.G3, 0,    0,    N.G3, 0,    0,    N.D3, 0,
      0,    N.D3, 0,    0,    N.G3, 0,    0,    0,
      N.F3, 0,    0,    N.F3, 0,    0,    N.Bb3,0,
      N.C3, 0,    0,    N.F3, 0,    N.Bb3,0,    0,
    ],
    arp: [
      N.Bb4,N.D5, N.F5, N.D5, N.Bb4,N.D5, N.F5, N.D5,
      N.F4, N.A4, N.C5, N.A4, N.F4, N.A4, N.C5, 0,
      N.Eb3,N.G4, N.Bb4,N.G4, N.Eb3,N.G4, N.Bb4,N.G4,
      N.F4, N.A4, N.C5, N.A4, N.Bb4,N.D5, N.F5, 0,
      N.G4, N.Bb4,N.D5, N.Bb4,N.G4, N.Bb4,N.D5, N.Bb4,
      N.D4, N.F4, N.A4, N.F4, N.D4, N.F4, N.A4, 0,
      N.F4, N.A4, N.C5, N.A4, N.F4, N.Bb4,N.D5, N.Bb4,
      N.C4, N.F4, N.A4, N.F4, N.Bb4,N.D5, N.F5, 0,
    ],
    melodyVol: 0.10,
    bassVol: 0.12,
    arpVol: 0.04,
    melodyWave: 'triangle',
    bassWave: 'sine',
    arpWave: 'sine',
  },

  // Driving adventure theme - D minor, syncopated and urgent
  game: {
    tempo: 145,
    melody: [
      N.D5, 0,    N.F5, N.D5, 0,    N.A5, 0,    0,
      N.G5, N.F5, 0,    N.D5, 0,    N.C5, N.D5, 0,
      N.F5, 0,    N.G5, 0,    N.A5, 0,    N.C6, N.A5,
      0,    N.G5, N.F5, 0,    0,    0,    0,    0,
      N.D5, N.F5, 0,    N.A5, N.G5, 0,    N.F5, 0,
      N.E5, 0,    N.D5, 0,    N.C5, N.D5, 0,    0,
      N.A5, 0,    N.G5, N.F5, 0,    N.D5, N.F5, 0,
      N.G5, 0,    N.F5, 0,    N.D5, 0,    0,    0,
    ],
    bass: [
      N.D3, 0,    N.D3, 0,    N.A3, 0,    N.A3, 0,
      N.Bb3,0,    N.Bb3,0,    N.A3, 0,    N.G3, 0,
      N.F3, 0,    N.F3, 0,    N.C3, 0,    N.C3, 0,
      N.Bb3,0,    N.A3, 0,    N.G3, 0,    N.A3, 0,
      N.D3, 0,    N.D3, 0,    N.A3, 0,    N.A3, 0,
      N.C3, 0,    N.C3, 0,    N.G3, 0,    N.G3, 0,
      N.F3, 0,    N.F3, 0,    N.D3, 0,    N.D3, 0,
      N.G3, 0,    N.A3, 0,    N.D3, 0,    N.D3, 0,
    ],
    arp: [
      N.D4, N.F4, N.A4, N.D4, N.F4, N.A4, N.D4, N.F4,
      N.Bb4,N.D4, N.F4, N.Bb4,N.A4, N.D4, N.F4, N.A4,
      N.F4, N.A4, N.C5, N.F4, N.A4, N.C5, N.F4, N.A4,
      N.Bb4,N.D4, N.G4, N.Bb4,N.A4, N.D4, N.F4, N.A4,
      N.D4, N.F4, N.A4, N.D4, N.F4, N.A4, N.D4, N.F4,
      N.C4, N.E4, N.G4, N.C4, N.E4, N.G4, N.C4, N.E4,
      N.F4, N.A4, N.C5, N.F4, N.D4, N.F4, N.A4, N.D4,
      N.G4, N.Bb4,N.D5, N.G4, N.A4, N.D4, N.F4, N.A4,
    ],
    melodyVol: 0.10,
    bassVol: 0.14,
    arpVol: 0.04,
    melodyWave: 'square',
    bassWave: 'triangle',
    arpWave: 'sine',
  },
};

export default class MusicPlayer {
  static init(context) {
    this.ctx = context;
    if (!this.ctx) return;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.5;
    this.masterGain.connect(this.ctx.destination);

    this.currentTrack = null;
    this.isPlaying = false;
    this.noteIndex = 0;
    this.nextNoteTime = 0;
    this.schedulerId = null;
  }

  static play(trackName) {
    if (!this.ctx) return;
    if (this.currentTrack === trackName && this.isPlaying) return;

    this.stop();
    this.currentTrack = trackName;
    this.isPlaying = true;
    this.noteIndex = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.1;
    this._startScheduler();
  }

  static stop() {
    this.isPlaying = false;
    this.currentTrack = null;
    if (this.schedulerId) {
      clearInterval(this.schedulerId);
      this.schedulerId = null;
    }
  }

  static setVolume(vol) {
    if (this.masterGain) {
      this.masterGain.gain.value = vol;
    }
  }

  static _startScheduler() {
    this.schedulerId = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      // Schedule notes 150ms ahead
      while (this.nextNoteTime < this.ctx.currentTime + 0.15) {
        this._scheduleStep();
      }
    }, 25);
  }

  static _scheduleStep() {
    const track = TRACKS[this.currentTrack];
    if (!track) return;

    const stepDur = 60 / track.tempo / 2; // 8th note duration
    const t = this.nextNoteTime;

    // Melody
    const melodyNote = track.melody[this.noteIndex % track.melody.length];
    if (melodyNote > 0) {
      this._playNote(track.melodyWave, melodyNote, t, stepDur * 0.85, track.melodyVol);
    }

    // Bass
    const bassNote = track.bass[this.noteIndex % track.bass.length];
    if (bassNote > 0) {
      this._playNote(track.bassWave, bassNote, t, stepDur * 0.9, track.bassVol);
    }

    // Arpeggio
    if (track.arp) {
      const arpNote = track.arp[this.noteIndex % track.arp.length];
      if (arpNote > 0) {
        this._playNote(track.arpWave, arpNote, t, stepDur * 0.5, track.arpVol);
      }
    }

    this.noteIndex++;
    this.nextNoteTime += stepDur;
  }

  static _playNote(type, freq, time, duration, vol) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(vol, time + 0.01);
    gain.gain.setValueAtTime(vol, time + duration * 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + duration + 0.01);
  }
}
