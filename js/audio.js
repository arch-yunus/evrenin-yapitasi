// Cosmic Web Audio Procedural Synthesizer
class CosmicSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.gainNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  }

  toggleAmbient() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  startAmbient() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);
    this.gainNode.connect(this.ctx.destination);

    // Cosmic chord frequencies (432Hz root harmonics: 108Hz, 216Hz, 432Hz, 648Hz)
    const freqs = [108, 216, 324, 432];
    this.oscillators = freqs.map((f, i) => {
      const osc = this.ctx.createOscillator();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);

      // Add gentle frequency modulation (LFO)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.1 + i * 0.05, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(2.0, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      if (panner) {
        panner.pan.setValueAtTime((i % 2 === 0 ? -0.5 : 0.5), this.ctx.currentTime);
        osc.connect(panner);
        panner.connect(this.gainNode);
      } else {
        osc.connect(this.gainNode);
      }

      osc.start();
      return osc;
    });
  }

  stopAmbient() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.gainNode) {
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
      setTimeout(() => {
        this.oscillators.forEach(o => {
          try { o.stop(); o.disconnect(); } catch (e) {}
        });
        this.oscillators = [];
      }, 1600);
    }
  }

  playQuantumPing(freq = 528) {
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) {
      // Audio not permitted without gesture
    }
  }
}

window.CosmicAudio = new CosmicSynthesizer();
