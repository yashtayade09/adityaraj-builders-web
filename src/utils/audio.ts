/**
 * Web Audio API synthesizer for realistic architectural drafting soundscapes:
 * - Graphite pencil friction on textured paper
 * - Engineer's scale placement
 * - Drafting compass mechanical pivot
 * - Architectural reveal cinematic shimmer & sub-bass chord
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Check if user previously muted
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('adityaraj_audio_muted');
      this.isMuted = saved === 'true';
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('adityaraj_audio_muted', String(this.isMuted));
    }
    if (!this.isMuted) {
      this.initCtx();
      this.playChime(440, 0.1);
    }
    return this.isMuted;
  }

  /**
   * Generates a realistic pencil graphite friction sound on heavy cotton paper
   * using filtered pink/brown noise with micro-frequency modulation.
   */
  public playPencilDrawing(durationMs: number = 900) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * (durationMs / 1000);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate brown/pink noise profile (gritty friction)
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.025 * white) / 1.025;
        // Add tiny micro-clicks simulating graphite grains
        const grain = Math.random() > 0.985 ? (Math.random() - 0.5) * 0.4 : 0;
        data[i] = lastOut * 3.5 + grain;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;

      // Bandpass filter to match pencil scraping frequency (1200Hz - 3200Hz)
      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(2200, this.ctx.currentTime);
      bandpass.Q.setValueAtTime(2.2, this.ctx.currentTime);

      // High shelf filter to give soft papery hiss
      const highShelf = this.ctx.createBiquadFilter();
      highShelf.type = 'highshelf';
      highShelf.frequency.setValueAtTime(4500, this.ctx.currentTime);
      highShelf.gain.setValueAtTime(-4, this.ctx.currentTime);

      const gainNode = this.ctx.createGain();
      const now = this.ctx.currentTime;
      const dur = durationMs / 1000;

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.22, now + 0.08);
      gainNode.gain.setValueAtTime(0.22, now + dur - 0.12);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + dur);

      noiseSource.connect(bandpass);
      bandpass.connect(highShelf);
      highShelf.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      noiseSource.start(now);
      noiseSource.stop(now + dur);
    } catch {
      // Audio autoplay policy or browser restriction
    }
  }

  /**
   * Sound of metallic engineer's scale settling onto the drafting table
   */
  public playScaleSlide() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  /**
   * Precision drafting compass rotation sound: soft mechanical gear/pivot hiss
   */
  public playCompassDraw(durationMs: number = 1000) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const dur = durationMs / 1000;

      // Friction component
      const bufferSize = this.ctx.sampleRate * dur;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.95 * b1 + white * 0.08;
        data[i] = (b0 + b1) * 1.5;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.linearRampToValueAtTime(2400, now + dur);
      filter.Q.value = 3.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.1);
      gain.gain.setValueAtTime(0.18, now + dur - 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + dur);
    } catch {}
  }

  /**
   * Premium architectural reveal chime / subtle cinematic chord
   */
  public playRevealChord() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Warm chord: D minor / F Major harmonic overtone (D3, A3, D4, F#4)
      const freqs = [146.83, 220.0, 293.66, 369.99, 587.33];

      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        const initialGain = 0.06 / (idx + 1);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(initialGain, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.15);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now);
        osc.stop(now + 1.5);
      });
    } catch {}
  }

  private playChime(freq: number, dur: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + dur);
  }
}

export const soundFx = new SoundController();
