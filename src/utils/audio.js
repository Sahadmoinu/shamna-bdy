// Romantic audio synthesizer and sound effect engine using Web Audio API

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.gainNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.value = 0.25;
        this.gainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft magic chime chord
  playMagicChime() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        noteGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

        osc.connect(noteGain);
        noteGain.connect(this.gainNode);

        osc.start();
        osc.stop(this.ctx.currentTime + 1.3);
      }, idx * 75);
    });
  }

  // Play candle blow whoosh sound
  playBlowSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.2;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.8);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.8);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.gainNode);

    noise.start();
    noise.stop(this.ctx.currentTime + 0.8);
  }

  // Cute pop sound for hearts / balloons
  playPop() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.gainNode);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  // Gentle, soothing romantic lullaby / piano arpeggio progression in background
  startRomanticBGM() {
    this.init();
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    // Sweet romantic melody notes (Happy Birthday motif mixed with dreamy arpeggio)
    // C4, D4, E4, F4, G4, A4, B4, C5, D5, E5, F5, G5
    const melody = [
      { f: 523.25, d: 0.5 }, // C5
      { f: 523.25, d: 0.5 }, // C5
      { f: 587.33, d: 0.9 }, // D5
      { f: 523.25, d: 0.9 }, // C5
      { f: 698.46, d: 0.9 }, // F5
      { f: 659.25, d: 1.5 }, // E5
      { f: 523.25, d: 0.5 }, // C5
      { f: 523.25, d: 0.5 }, // C5
      { f: 587.33, d: 0.9 }, // D5
      { f: 523.25, d: 0.9 }, // C5
      { f: 783.99, d: 0.9 }, // G5
      { f: 698.46, d: 1.5 }, // F5
      { f: 523.25, d: 0.5 }, // C5
      { f: 523.25, d: 0.5 }, // C5
      { f: 1046.5, d: 0.9 }, // C6
      { f: 880.00, d: 0.9 }, // A5
      { f: 698.46, d: 0.9 }, // F5
      { f: 659.25, d: 0.9 }, // E5
      { f: 587.33, d: 1.4 }, // D5
      { f: 932.33, d: 0.5 }, // Bb5
      { f: 932.33, d: 0.5 }, // Bb5
      { f: 880.00, d: 0.9 }, // A5
      { f: 698.46, d: 0.9 }, // F5
      { f: 783.99, d: 0.9 }, // G5
      { f: 698.46, d: 2.0 }, // F5
    ];

    let noteIdx = 0;
    const playNext = () => {
      if (!this.isPlayingMusic) return;

      const note = melody[noteIdx];
      if (this.ctx && !this.isMuted) {
        // Soft electric piano / celesta tone
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(0.08, now + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + note.d * 0.95);

        osc.connect(noteGain);
        noteGain.connect(this.gainNode);

        osc.start();
        osc.stop(now + note.d);
      }

      noteIdx = (noteIdx + 1) % melody.length;
      const delay = (melody[noteIdx].d * 600) + 100;
      this.musicTimer = setTimeout(playNext, delay);
    };

    playNext();
  }

  stopRomanticBGM() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.gainNode) {
      this.gainNode.gain.value = this.isMuted ? 0 : 0.25;
    }
    return this.isMuted;
  }
}

export const sound = new SoundEngine();
