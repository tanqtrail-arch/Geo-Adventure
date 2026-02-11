// =============================================================
// Geo Adventure - Audio Manager (Web Audio API)
// BGM & SE 管理
// =============================================================

class AudioManager {
  constructor() {
    this.ctx = null;
    this.bgmGain = null;
    this.seGain = null;
    this.bgmSource = null;
    this.bgmPlaying = false;
    this.muted = false;
    this.bgmVolume = 0.5;
    this.seVolume = 0.7;
  }

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.connect(this.ctx.destination);
      this.bgmGain.gain.value = this.bgmVolume;
      this.seGain = this.ctx.createGain();
      this.seGain.connect(this.ctx.destination);
      this.seGain.gain.value = this.seVolume;
    } catch (e) { /* Audio not supported */ }
  }

  resume() {
    if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
  }

  setBGMVolume(v) {
    this.bgmVolume = v;
    if (this.bgmGain) this.bgmGain.gain.value = this.muted ? 0 : v;
  }

  setSEVolume(v) {
    this.seVolume = v;
    if (this.seGain) this.seGain.gain.value = this.muted ? 0 : v;
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.bgmGain) this.bgmGain.gain.value = this.muted ? 0 : this.bgmVolume;
    if (this.seGain) this.seGain.gain.value = this.muted ? 0 : this.seVolume;
    return this.muted;
  }

  // プロシージャルBGM生成（シンプルなアンビエント）
  playBGM() {
    if (!this.ctx) return;
    this.resume();
    this.stopBGM();

    const now = this.ctx.currentTime;
    const duration = 16;

    const playLoop = () => {
      if (!this.bgmPlaying) return;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      const env = this.ctx.createGain();

      osc1.type = "sine";
      osc2.type = "triangle";
      lfo.type = "sine";
      lfo.frequency.value = 0.3;
      lfoGain.gain.value = 2;

      // ランダムなペンタトニック音
      const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];
      osc1.frequency.value = notes[Math.floor(Math.random() * notes.length)] * 0.5;
      osc2.frequency.value = notes[Math.floor(Math.random() * notes.length)] * 0.25;

      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);

      osc1.connect(env);
      osc2.connect(env);
      env.connect(this.bgmGain);

      const t = this.ctx.currentTime;
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(0.08, t + 2);
      env.gain.linearRampToValueAtTime(0.05, t + duration - 4);
      env.gain.linearRampToValueAtTime(0, t + duration);

      osc1.start(t);
      osc2.start(t);
      lfo.start(t);
      osc1.stop(t + duration);
      osc2.stop(t + duration);
      lfo.stop(t + duration);

      setTimeout(playLoop, (duration - 2) * 1000);
    };

    this.bgmPlaying = true;
    playLoop();
  }

  stopBGM() {
    this.bgmPlaying = false;
  }

  // SE: 正解
  playCorrect() {
    if (!this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    this._playTone(523.25, t, 0.15, "sine", 0.3);
    this._playTone(659.25, t + 0.1, 0.15, "sine", 0.3);
    this._playTone(783.99, t + 0.2, 0.25, "sine", 0.25);
  }

  // SE: 不正解
  playWrong() {
    if (!this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    this._playTone(200, t, 0.3, "sawtooth", 0.15);
    this._playTone(150, t + 0.15, 0.3, "sawtooth", 0.12);
  }

  // SE: ヒント開示
  playHint() {
    if (!this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    this._playTone(440, t, 0.1, "sine", 0.2);
    this._playTone(554.37, t + 0.08, 0.15, "sine", 0.15);
  }

  // SE: 秘宝獲得
  playTreasure() {
    if (!this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, i) => this._playTone(n, t + i * 0.12, 0.3, "sine", 0.2));
  }

  // SE: 購入
  playPurchase() {
    if (!this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    this._playTone(800, t, 0.08, "sine", 0.2);
    this._playTone(1000, t + 0.06, 0.12, "sine", 0.15);
  }

  // SE: 実績解放
  playAchievement() {
    if (!this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((n, i) =>
      this._playTone(n, t + i * 0.1, 0.35, "sine", 0.18)
    );
  }

  // SE: タイマー警告
  playTimerWarn() {
    if (!this.ctx) return;
    this.resume();
    this._playTone(880, this.ctx.currentTime, 0.08, "square", 0.1);
  }

  // SE: 合成
  playSynthesize() {
    if (!this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    for (let i = 0; i < 8; i++) {
      const freq = 400 + Math.random() * 800;
      this._playTone(freq, t + i * 0.06, 0.2, "sine", 0.1);
    }
    this._playTone(1046.5, t + 0.5, 0.5, "sine", 0.25);
  }

  _playTone(freq, startTime, duration, type, vol) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(this.seGain);
    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.01);
  }
}
