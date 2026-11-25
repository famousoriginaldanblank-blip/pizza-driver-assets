// ============================================================================
// STAGE 1 INTER-BOROUGH BONUS: "LI'L (SLICE) SHOP OF HORRORS" (32-BIT NEO-GEO)
// ============================================================================
(function () {
  const GH_PAGES = "https://famousoriginaldanblank-blip.github.io/pizza-driver-assets";
  const JSDELIVR = "https://cdn.jsdelivr.net/gh/famousoriginaldanblank-blip/pizza-driver-assets@main";

  const S1_FRAMES = {
    dough_0:[4,4,79,67], dough_1:[87,4,89,55], dough_2:[180,4,92,52], dough_3:[276,4,99,61], dough_4:[379,4,104,64], dough_5:[487,4,107,67],
    fire_0:[598,4,82,96], fire_1:[684,4,78,105], fire_2:[766,4,77,101], fire_3:[847,4,68,95], flour_0:[919,4,70,68], flour_1:[4,113,93,84],
    peel_0:[101,113,92,92], peel_1:[197,113,105,106], peel_2:[306,113,91,95], brush_0:[401,113,67,65], brush_1:[472,113,103,82], brush_2:[579,113,81,73],
    pie_sauced:[664,113,128,84], pie_mozz:[796,113,128,84], top_roni:[4,223,97,74], top_garlic:[105,223,87,69], top_sausage:[196,223,93,78],
    top_mushroom:[293,223,97,78], top_olive:[394,223,86,77], top_pepper:[484,223,86,78], pie_baked:[574,223,189,106], vfx_spark:[767,223,127,102],
    zy_walk_0:[898,223,110,159,43,159], zy_walk_1:[4,386,91,159,36,159], zy_walk_2:[99,386,83,158,25,158], zy_walk_3:[186,386,100,160,42,160],
    zy_walk_4:[290,386,105,158,42,158], zy_walk_5:[399,386,94,159,41,159], zy_walk_6:[497,386,92,151,32,151], zy_walk_7:[593,386,102,151,33,151],
    zy_lunge_0:[699,386,142,138,50,138], zy_lunge_1:[845,386,108,136,41,136], zy_hit_0:[4,550,97,160,48,160], zy_hit_1:[105,550,87,168,40,168],
    zc_walk_0:[196,550,104,156,30,156], zc_walk_1:[304,550,90,153,27,153], zc_walk_2:[398,550,101,155,33,155], zc_walk_3:[503,550,103,157,34,157],
    zc_walk_4:[610,550,102,155,33,155], zc_walk_5:[716,550,91,162,29,162], zc_walk_6:[811,550,91,156,29,156], zc_walk_7:[906,550,90,156,30,156],
    zc_lunge_0:[4,722,133,145,45,145], zc_lunge_1:[141,722,120,143,47,143], zc_hit_0:[265,722,99,159,47,159], zc_hit_1:[368,722,101,169,50,169],
    rat_0:[473,722,45,18,23,18], rat_1:[522,722,47,43,24,40], rat_2:[573,722,45,48,23,48], rat_3:[622,722,47,48,24,48],
    rat_4:[673,722,43,47,22,47], rat_5:[720,722,48,47,24,47], rat_6:[772,722,46,50,23,50], rat_7:[822,722,44,51,22,51]
  };

  function loadImg(rel) {
    const cands = [
      `./assets/${rel}`,
      `../assets/${rel}`,
      `${GH_PAGES}/${rel}`,
      `${GH_PAGES}/assets/${rel}`,
      `${JSDELIVR}/assets/${rel}`,
      `${JSDELIVR}/${rel}`
    ];
    const im = new Image();
    let i = 0;
    im._ready = false;
    im.onload = () => { im._ready = true; };
    im.onerror = () => { if (++i < cands.length) im.src = cands[i]; };
    im.src = cands[0];
    return im;
  }

  const s1BgImg = loadImg("minigames/stage1/s1_kitchen_bg.jpg");
  const s1AtlasImg = loadImg("minigames/stage1/s1_sprites.png");

  const S1BGM = {
    audio: null,
    vol: 0.44,
    idx: 0,
    active: false,
    cands: [
      `${GH_PAGES}/audio/MiniGame1_Midnight_Alley_Run.mp3`,
      `${JSDELIVR}/audio/MiniGame1_Midnight_Alley_Run.mp3`,
      "./audio/MiniGame1_Midnight_Alley_Run.mp3",
      "./assets/audio/MiniGame1_Midnight_Alley_Run.mp3",
      "../audio/MiniGame1_Midnight_Alley_Run.mp3"
    ],
    init() {
      if (this.audio || typeof Audio === "undefined") return;
      const a = new Audio();
      a.loop = true;
      a.preload = "auto";
      a.onerror = () => {
        if (++this.idx < this.cands.length) {
          a.src = this.cands[this.idx];
          this.sync(true);
        }
      };
      a.src = this.cands[0];
      this.audio = a;
    },
    play(v = 0.44) {
      this.init();
      this.active = true;
      this.vol = v;
      this.sync(true);
    },
    sync(tryPlay = false) {
      if (!this.audio) return;
      const hostSFX = S1.host && S1.host.getSoundFX ? S1.host.getSoundFX() : null;
      const muted = !!(hostSFX && (hostSFX.muted || hostSFX.musicMuted));
      this.audio.volume = muted ? 0 : this.vol;
      if (muted || !this.active) {
        if (!this.audio.paused) this.audio.pause();
      } else if (tryPlay && this.audio.paused) {
        this.audio.play().catch(() => {});
      }
    },
    stop() {
      this.active = false;
      if (this.audio) {
        this.audio.pause();
        try { this.audio.currentTime = 0; } catch (e) {}
      }
    }
  };

  // Dark 32-Bit Horror-Action Arcade YM2610 FM + ADPCM Sound Bank
  const S1SFX = {
    ctx: null,
    masterIn: null,
    b18: null,
    b9: null,
    isMuted() {
      const hostSFX = S1.host && S1.host.getSoundFX ? S1.host.getSoundFX() : null;
      return !!(hostSFX && hostSFX.muted);
    },
    init() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        this.ctx = new AC();
        this.masterIn = this.ctx.createGain();
        this.masterIn.gain.value = 0.92;

        const sh = this.ctx.createWaveShaper();
        const cv = new Float32Array(512);
        for (let i = 0; i < 512; i++) {
          const x = i / 255.5 - 1;
          cv[i] = Math.tanh((Math.round(x * 64) / 64) * 1.45);
        }
        sh.curve = cv;

        const cp = this.ctx.createDynamicsCompressor();
        cp.threshold.value = -14;
        cp.ratio.value = 5;
        cp.attack.value = 0.002;
        cp.release.value = 0.11;

        const dl = this.ctx.createDelay(0.1);
        dl.delayTime.value = 0.026;
        const lp = this.ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = 3100;
        const wet = this.ctx.createGain();
        wet.gain.value = 0.13;

        const out = this.ctx.createGain();
        out.gain.value = 0.86;

        this.masterIn.connect(sh);
        sh.connect(cp);
        sh.connect(dl);
        dl.connect(lp);
        lp.connect(wet);
        wet.connect(cp);
        cp.connect(out);
        out.connect(this.ctx.destination);

        this.b18 = this._mkBuf(18500, 16);
        this.b9 = this._mkBuf(9200, 8);
      }
      if (this.ctx && this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
    },
    _mkBuf(rate, lv) {
      const sr = this.ctx.sampleRate;
      const len = sr | 0;
      const b = this.ctx.createBuffer(1, len, sr);
      const d = b.getChannelData(0);
      const hs = Math.max(1, Math.round(sr / rate));
      let c = 0;
      for (let i = 0; i < len; i++) {
        if (i % hs === 0) c = Math.round((Math.random() * 2 - 1) * lv) / lv;
        d[i] = c;
      }
      return b;
    },
    _dst(pan = 0) {
      if (pan && this.ctx.createStereoPanner) {
        const p = this.ctx.createStereoPanner();
        p.pan.value = Math.max(-0.85, Math.min(0.85, pan));
        p.connect(this.masterIn);
        return p;
      }
      return this.masterIn;
    },
    fm({ freq = 440, endFreq = null, dur = 0.12, ratio = 2, modIdx = 3, modEndIdx = 0.2, carType = "sine", gain = 0.12, attack = 0.003, delay = 0, pan = 0 }) {
      if (this.isMuted() || !this.ctx) return;
      const t = this.ctx.currentTime + delay;
      const st = t + dur + 0.015;
      const car = this.ctx.createOscillator();
      const mod = this.ctx.createOscillator();
      const mg = this.ctx.createGain();
      const amp = this.ctx.createGain();
      car.type = carType;
      car.frequency.setValueAtTime(freq, t);
      if (endFreq && endFreq !== freq) car.frequency.exponentialRampToValueAtTime(Math.max(18, endFreq), t + dur);
      mod.frequency.setValueAtTime(freq * ratio, t);
      if (endFreq && endFreq !== freq) mod.frequency.exponentialRampToValueAtTime(Math.max(18, endFreq * ratio), t + dur);
      mg.gain.setValueAtTime(Math.max(1, freq * modIdx), t);
      mg.gain.exponentialRampToValueAtTime(Math.max(1, (endFreq || freq) * modEndIdx), t + dur);
      amp.gain.setValueAtTime(0.0001, t);
      amp.gain.linearRampToValueAtTime(gain, t + attack);
      amp.gain.exponentialRampToValueAtTime(0.0008, t + dur);
      mod.connect(mg); mg.connect(car.frequency); car.connect(amp); amp.connect(this._dst(pan));
      mod.start(t); car.start(t); mod.stop(st); car.stop(st);
    },
    adpcm({ loFi = false, dur = 0.12, startFreq = 1800, endFreq = 450, Q = 1.8, filterType = "bandpass", gain = 0.16, attack = 0.002, delay = 0, pan = 0 }) {
      if (this.isMuted() || !this.ctx) return;
      const buf = loFi ? this.b9 : this.b18;
      if (!buf) return;
      const t = this.ctx.currentTime + delay;
      const s = this.ctx.createBufferSource();
      const f = this.ctx.createBiquadFilter();
      const a = this.ctx.createGain();
      s.buffer = buf; s.loop = true;
      f.type = filterType; f.Q.value = Q;
      f.frequency.setValueAtTime(startFreq, t);
      if (endFreq && endFreq !== startFreq) f.frequency.exponentialRampToValueAtTime(Math.max(40, endFreq), t + dur);
      a.gain.setValueAtTime(0.0001, t);
      a.gain.linearRampToValueAtTime(gain, t + attack);
      a.gain.exponentialRampToValueAtTime(0.0008, t + dur);
      s.connect(f); f.connect(a); a.connect(this._dst(pan));
      s.start(t, Math.random() * 0.5, dur + 0.02);
    },
    start() { this.adpcm({ loFi: true, dur: 0.08, startFreq: 1900, endFreq: 380, gain: 0.16 }); this.fm({ freq: 146.8, dur: 0.22, ratio: 1, modIdx: 4.8, modEndIdx: 0.9, carType: "sawtooth", gain: 0.13 }); this.fm({ freq: 293.7, dur: 0.18, modIdx: 3.4, gain: 0.1, delay: 0.045 }); this.fm({ freq: 440, dur: 0.22, modIdx: 2.8, gain: 0.09, delay: 0.09 }); },
    intro(n = 1) { this.adpcm({ loFi: true, dur: 0.17, startFreq: 2100, endFreq: 320, Q: 1.1, gain: 0.2 }); const m = n === 1 ? 1 : (n === 2 ? 1.0595 : 1.189); [73.4, 110, 146.8, 174.6].forEach((f, i) => this.fm({ freq: f * m, dur: 0.28, ratio: 1, modIdx: 5.2, modEndIdx: 1.2, carType: "sawtooth", gain: 0.08, delay: i * 0.012, pan: (i - 1.5) * 0.2 })); },
    go() { this.adpcm({ dur: 0.05, startFreq: 2600, endFreq: 900, gain: 0.11 }); this.fm({ freq: 220, dur: 0.065, modIdx: 3.5, carType: "sawtooth", gain: 0.1 }); this.fm({ freq: 293.7, dur: 0.12, modIdx: 4, carType: "sawtooth", gain: 0.12, delay: 0.06 }); },
    slap(st, alt, s) { const p = (s ? 0.42 : -0.42) + (alt ? 0.08 : -0.08); this.fm({ freq: (alt ? 104 : 92) + st * 3.5, endFreq: 38, dur: 0.075, ratio: 1, modIdx: 3.2, carType: "triangle", gain: 0.17, pan: p }); this.adpcm({ loFi: true, dur: 0.05, startFreq: 880 + st * 45, endFreq: 260, gain: 0.14, pan: p }); },
    ready(s) { const p = s ? 0.38 : -0.38; this.adpcm({ dur: 0.08, startFreq: 1400, endFreq: 420, gain: 0.14, pan: p }); this.fm({ freq: 146.8, endFreq: 73.4, dur: 0.1, ratio: 1, modIdx: 3, gain: 0.14, pan: p }); this.fm({ freq: 293.7, dur: 0.075, gain: 0.095, delay: 0.02, pan: p }); this.fm({ freq: 440, dur: 0.11, gain: 0.105, delay: 0.065, pan: p }); },
    top(idx, s) { const p = s ? 0.35 : -0.35, ns = [293.7, 311.1, 349.2, 392, 440, 466.2, 523.3, 587.3], f = ns[(idx - 1) % 8]; this.adpcm({ dur: 0.038, startFreq: 2200, endFreq: 680, Q: 2.4, gain: 0.11, pan: p }); this.fm({ freq: f, endFreq: f * 0.72, dur: 0.072, ratio: 1.5, modIdx: 3.4, carType: "triangle", gain: 0.125, pan: p }); },
    belt(s) { const p = s ? 0.28 : -0.28; for (let i = 0; i < 4; i++) this.fm({ freq: 215 + i * 22, endFreq: 112, dur: 0.038, ratio: 2.73, modIdx: 5, gain: 0.1, delay: i * 0.036, pan: p }); this.adpcm({ loFi: true, dur: 0.18, startFreq: 520, endFreq: 1550, gain: 0.15, pan: p }); },
    oven() { this.adpcm({ loFi: true, dur: 0.28, startFreq: 820, endFreq: 135, Q: 1, filterType: "lowpass", gain: 0.24 }); this.fm({ freq: 98, endFreq: 42, dur: 0.22, ratio: 1, modIdx: 3.5, gain: 0.16 }); this.fm({ freq: 587.3, endFreq: 584, dur: 0.22, ratio: 2.41, modIdx: 3.8, gain: 0.11, delay: 0.03 }); },
    hit(s) { const p = s ? 0.55 : -0.55; this.adpcm({ loFi: true, dur: 0.16, startFreq: 1950, endFreq: 240, Q: 1.2, gain: 0.28, pan: p }); this.fm({ freq: 330, endFreq: 78, dur: 0.11, ratio: 1.73, modIdx: 6.8, carType: "square", gain: 0.18, pan: p }); this.fm({ freq: 148, endFreq: 31, dur: 0.2, ratio: 1, modIdx: 2.8, gain: 0.24, pan: p * 0.4 }); this.fm({ freq: 112, endFreq: 52, dur: 0.19, ratio: 0.5, modIdx: 6, modEndIdx: 1.8, carType: "sawtooth", gain: 0.1, delay: 0.04, pan: p }); },
    whiff(s) { const p = s === 0 ? -0.4 : (s === 1 ? 0.4 : 0); this.adpcm({ loFi: true, dur: 0.11, startFreq: 1150, endFreq: 210, gain: 0.15, pan: p }); this.fm({ freq: 175, endFreq: 68, dur: 0.09, ratio: 1, modIdx: 2, gain: 0.09, pan: p }); },
    ratIn(bx) { const p = ((bx - 320) / 320) * 0.65; this.adpcm({ dur: 0.075, startFreq: 3400, endFreq: 1600, Q: 2.8, gain: 0.13, pan: p }); [1180, 960].forEach((f, i) => this.fm({ freq: f, endFreq: f * 0.76, dur: 0.055, ratio: 1.41, modIdx: 5.5, modEndIdx: 1.4, carType: "sawtooth", gain: 0.085, delay: 0.035 + i * 0.058, pan: p })); },
    ratHit(bx) { const p = ((bx - 320) / 320) * 0.65; this.adpcm({ loFi: true, dur: 0.12, startFreq: 2400, endFreq: 340, Q: 1.4, gain: 0.22, pan: p }); this.fm({ freq: 235, endFreq: 62, dur: 0.12, ratio: 1.85, modIdx: 5.8, gain: 0.19, pan: p }); this.fm({ freq: 1080, endFreq: 340, dur: 0.12, ratio: 1.41, modIdx: 4.8, modEndIdx: 1.2, carType: "sawtooth", gain: 0.085, delay: 0.035, pan: p }); },
    stole(s) { const p = s ? 0.35 : -0.35; this.adpcm({ loFi: true, dur: 0.24, startFreq: 1500, endFreq: 180, Q: 1.1, gain: 0.22, pan: p }); [73.4, 103.8, 155.6].forEach((f, i) => this.fm({ freq: f, endFreq: f * 0.78, dur: 0.34, ratio: 1, modIdx: 6, modEndIdx: 1.8, carType: "sawtooth", gain: 0.11, delay: i * 0.025, pan: p })); },
    wrong(s) { const p = s ? 0.35 : -0.35; [98, 103.8].forEach(f => this.fm({ freq: f, endFreq: f * 0.92, dur: 0.11, ratio: 1, modIdx: 5.5, modEndIdx: 2, carType: "sawtooth", gain: 0.105, pan: p })); },
    nudge(s) { const p = s ? 0.35 : -0.35; this.adpcm({ dur: 0.03, startFreq: 1800, endFreq: 700, Q: 2.5, gain: 0.09, pan: p }); this.fm({ freq: 280, endFreq: 140, dur: 0.04, modIdx: 3, gain: 0.09, pan: p }); },
    clear() { this.adpcm({ loFi: true, dur: 0.14, startFreq: 2300, endFreq: 420, Q: 1.2, gain: 0.19 }); this.adpcm({ loFi: true, dur: 0.18, startFreq: 2500, endFreq: 360, Q: 1.2, gain: 0.21, delay: 0.24 }); [[146.8, 0, 0.1], [174.6, 0.08, 0.1], [196, 0.16, 0.1], [220, 0.24, 0.32]].forEach(([f, t, d], i) => { this.fm({ freq: f, dur: d, ratio: 1, modIdx: 4.8, modEndIdx: 1.1, carType: "sawtooth", gain: 0.11, delay: t, pan: i % 2 ? 0.18 : -0.18 }); this.fm({ freq: f * 2, dur: d, modIdx: 3.2, carType: "sawtooth", gain: 0.08, delay: t }); }); },
    groan(s) { const p = s ? 0.58 : -0.58; this.fm({ freq: 71, endFreq: 46, dur: 0.34, ratio: 0.5, modIdx: 7.2, modEndIdx: 2.6, carType: "sawtooth", gain: 0.105, attack: 0.025, pan: p }); this.adpcm({ loFi: true, dur: 0.28, startFreq: 440, endFreq: 185, Q: 3.4, gain: 0.1, attack: 0.02, pan: p }); },
    tick(u) { const f = u ? 440 : 329.6; this.fm({ freq: f, endFreq: f * 0.96, dur: 0.055, modIdx: 2.6, gain: 0.085 }); this.adpcm({ dur: 0.025, startFreq: 2400, endFreq: 1100, Q: 3, gain: 0.06 }); },
    buzz() { this.adpcm({ loFi: true, dur: 0.28, startFreq: 1800, endFreq: 140, Q: 1, gain: 0.26 }); this.fm({ freq: 146.8, endFreq: 36.7, dur: 0.44, ratio: 1, modIdx: 6.2, modEndIdx: 1.6, carType: "sawtooth", gain: 0.18 }); this.fm({ freq: 103.8, endFreq: 32.7, dur: 0.44, ratio: 1.5, modIdx: 5.5, modEndIdx: 1.4, carType: "sawtooth", gain: 0.14, delay: 0.03 }); }
  };

  const BINS = [
    { idx: 0, hand: 0, code: "KeyA", key: "A", name: "SAUCE", color: "#ef4444", x: 52, y: 332, sprite: null, baseStage: "sauced" },
    { idx: 1, hand: 0, code: "KeyS", key: "S", name: "MOZZ", color: "#fef08a", x: 121, y: 332, sprite: null, baseStage: "mozz" },
    { idx: 2, hand: 0, code: "KeyD", key: "D", name: "RONI", color: "#dc2626", x: 190, y: 332, sprite: "top_roni" },
    { idx: 3, hand: 0, code: "KeyF", key: "F", name: "GARLIC", color: "#facc15", x: 256, y: 332, sprite: "top_garlic" },
    { idx: 4, hand: 1, code: "KeyJ", key: "J", name: "SAUSAGE", color: "#b45309", x: 385, y: 332, sprite: "top_sausage" },
    { idx: 5, hand: 1, code: "KeyK", key: "K", name: "SHROOMS", color: "#e2e8f0", x: 452, y: 332, sprite: "top_mushroom" },
    { idx: 6, hand: 1, code: "KeyL", key: "L", name: "OLIVES", color: "#94a3b8", x: 518, y: 332, sprite: "top_olive" },
    { idx: 7, hand: 1, code: "Semicolon", key: ";", name: "PEPPERS", color: "#22c55e", x: 584, y: 332, sprite: "top_pepper" }
  ];
  const BIN_MAP = { Quote: BINS[7] };
  BINS.forEach(b => { BIN_MAP[b.code] = b; });

  const BOARDS = [
    { side: 0, x: 234, y: 258, pairs: [{ code: "KeyA", label: "A" }, { code: "KeyS", label: "S" }] },
    { side: 1, x: 410, y: 258, pairs: [{ code: "KeyJ", label: "J" }, { code: "KeyK", label: "K" }] }
  ];
  const BELTS = [
    { startX: 245, startY: 231, endX: 294, endY: 184, wB: 70, wT: 38 },
    { startX: 395, startY: 231, endX: 346, endY: 184, wB: 70, wT: 38 }
  ];
  const AISLES = [
    { spawnX: 36, edgeX: 170, keyLabel: "TAB" },
    { spawnX: 604, edgeX: 470, keyLabel: "ENTER" }
  ];
  const ORDERS = [
    { num: 1, name: "ORDER 1: STEINWAY WARM-UP", sub: "Alternate [A ↔ S] & [J ↔ K] to Knead Dough • Dress & Conveyor 3 Pies!", quota: 3, timeLimit: 30, cashReward: 60, mashGoal: 6, allKeys: false, zInt: [4.2, 6], zDur: 3.4, rInt: [6.2, 8.8] },
    { num: 2, name: "ORDER 2: FRIDAY DINNER RUSH", sub: "Shambling NYC Horde & Whack-A-Mole Templeton • Fire 4 Pies!", quota: 4, timeLimit: 36, cashReward: 95, mashGoal: 8, allKeys: false, zInt: [2.9, 4.4], zDur: 2.8, rInt: [4.5, 6.6] },
    { num: 3, name: "ORDER 3: ALL-BOROUGH SUPREME SLAM", sub: "ALL 8 KEYS [ASDF + JKL;] ON EVERY PIE! • Fire 5 Supreme Pies!", quota: 5, timeLimit: 44, cashReward: 145, mashGoal: 8, allKeys: true, zInt: [2.4, 3.8], zDur: 2.55, rInt: [4, 5.8] }
  ];

  const S1 = {
    host: null,
    phase: "ready", timer: 0, phaseTimer: 0, orderIdx: 0, orderTimeLeft: 30, lastHurrySec: 7, orderPiesDone: 0,
    stolenCount: 0, totalCash: 0, speedBonus: 0, officialDone: false, isReplay: false, banked: 0, lastBanked: 0,
    completedOrders: [], endReason: "", hitStop: 0, shake: 0, ovenFlare: 0, scroll: [0, 0], boost: [0, 0],
    flashMsg: "", flashColor: "#fde047", flashTimer: 0, binFlash: new Array(8).fill(0), boards: [null, null],
    conveyorPies: [], puffs: [], flying: [], sparks: [], popups: [], zombies: [null, null],
    whacks: [{ anim: 0, cd: 0 }, { anim: 0, cd: 0 }], zClock: 2.5, rat: null, brushAnim: 0, brushX: 320, rClock: 4.8, _ptrBound: false
  };

  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function setBanner(msg, c = "#fde047", d = 1.0) { S1.flashMsg = msg; S1.flashColor = c; S1.flashTimer = d; }
  function syncStatus() { if (S1.host && S1.host.onUpdateHUD) S1.host.onUpdateHUD(statusLabel()); }

  function statusLabel() {
    const ord = ORDERS[S1.orderIdx] || ORDERS[0];
    return S1.isReplay ? `REPLAY ($0 BANK) • ORD ${ord.num}/3` : `ORD ${ord.num}/3 • BANKED: +$${S1.banked}`;
  }

  function makePie(side) {
    const ord = ORDERS[S1.orderIdx];
    let recipe = [], preCheese = false;
    if (!ord.allKeys) {
      if (side === 0) {
        const extra = S1.orderIdx === 0 ? 2 : 3, pool = BINS.slice(0, 4);
        recipe = [BINS[0], BINS[1], pick([BINS[2], BINS[3]])];
        while (recipe.length < 2 + extra) recipe.push(pick(pool.filter(b => b.idx !== recipe[recipe.length - 1].idx)));
      } else {
        preCheese = true;
        const cnt = S1.orderIdx === 0 ? 3 : 4, pool = BINS.slice(4);
        let last = -1;
        for (let i = 0; i < cnt; i++) {
          const p = pick(pool.filter(b => b.idx !== last));
          last = p.idx;
          recipe.push(p);
        }
      }
    } else {
      const tops = BINS.slice(2);
      recipe = [BINS[0], BINS[1]];
      const bag = [pick([BINS[2], BINS[3]]), pick(BINS.slice(4))];
      while (bag.length < 4) bag.push(pick(tops));
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      bag.forEach(it => recipe.push(it.idx === recipe[recipe.length - 1].idx ? tops.find(b => b.idx !== it.idx) : it));
    }
    return { side, state: "mash", mashCount: 0, mashGoal: ord.mashGoal, expectedAlt: -1, lastDent: 0, mashBump: 0, nudge: 0, preCheese, hasSauce: false, hasMozz: false, sprites: [], recipe, stepIdx: 0, wrongShake: 0 };
  }

  function setupOrder(idx) {
    S1.orderIdx = idx;
    const ord = ORDERS[idx];
    S1.orderTimeLeft = ord.timeLimit;
    S1.lastHurrySec = 7;
    S1.orderPiesDone = 0;
    S1.boards = [makePie(0), makePie(1)];
    S1.zombies = [null, null];
    S1.rat = null;
    S1.conveyorPies = [];
    S1.popups = [];
    S1.zClock = idx === 0 ? 3.0 : 1.9;
    S1.rClock = idx === 0 ? 5.0 : 3.4;
    S1.phase = "order_intro";
    S1.phaseTimer = 1.65;
    S1SFX.intro(ord.num);
    syncStatus();
  }

  function startRun(orderIdx = 0, forceReplay = false) {
    S1SFX.init();
    S1SFX.start();
    S1BGM.play(0.44);
    S1.isReplay = forceReplay || S1.officialDone;
    S1.stolenCount = 0;
    S1.totalCash = 0;
    S1.speedBonus = 0;
    S1.completedOrders = [];
    S1.endReason = "";
    S1.puffs = [];
    S1.flying = [];
    S1.sparks = [];
    S1.popups = [];
    setupOrder(orderIdx);
  }

  function finishRun(reason) {
    S1.endReason = reason;
    S1.phase = "tally";
    S1.zombies = [null, null];
    S1.rat = null;
    S1BGM.play(0.18);
    const grand = S1.totalCash + S1.speedBonus;
    if (!S1.officialDone && !S1.isReplay) {
      S1.officialDone = true;
      S1.lastBanked = grand;
      S1.banked += grand;
      if (S1.host && S1.host.addAccountCash && grand > 0) S1.host.addAccountCash(grand);
    } else {
      S1.isReplay = true;
      S1.lastBanked = 0; // Replays never add cash to in-game account!
    }
    syncStatus();
  }

  function exitToBorough(skippedFromReady = false) {
    if (skippedFromReady && !S1.officialDone) {
      S1.officialDone = true;
      S1.lastBanked = 0;
    }
    S1BGM.stop();
    if (S1.host && S1.host.onExit) S1.host.onExit({ skippedFromReady, bankedCash: S1.banked });
  }

  function skipAction() {
    S1SFX.init();
    if (S1.phase === "ready") { exitToBorough(true); return; }
    if (S1.phase === "tally") { exitToBorough(false); return; }
    S1SFX.whiff(-1);
    finishRun(S1.isReplay ? "SKIPPED PRACTICE REPLAY — $0 ADDED TO ACCOUNT!" : "SKIPPED MID-SHIFT — HEADING TO BROOKLYN!");
  }

  function knead(b, altIdx, flashIdx) {
    if (flashIdx !== undefined) S1.binFlash[flashIdx] = 0.16;
    const pairs = BOARDS[b.side].pairs;
    if (altIdx === -1) {
      b.nudge = 0.35; S1SFX.nudge(b.side);
      setBanner(`KNEAD WITH ALTERNATING [${pairs[0].label}] ↔ [${pairs[1].label}]!`, "#fde047", 0.65);
      return;
    }
    if (b.expectedAlt !== -1 && altIdx !== b.expectedAlt) {
      b.nudge = 0.3; S1SFX.nudge(b.side);
      setBanner(`ALTERNATE KEYS! TAP [${pairs[b.expectedAlt].label}] NEXT!`, "#fde047", 0.55);
      return;
    }
    b.mashCount++; b.lastDent = altIdx; b.expectedAlt = 1 - altIdx; b.mashBump = 1;
    const pos = BOARDS[b.side];
    S1SFX.slap(b.mashCount, altIdx, b.side);
    S1.puffs.push({ x: pos.x + (altIdx === 0 ? -18 : 18), y: pos.y + rand(-6, 8), life: 0.3, max: 0.3, sc: 0.78 });
    if (b.mashCount >= b.mashGoal) {
      b.state = "top";
      if (b.preCheese) { b.hasSauce = true; b.hasMozz = true; }
      S1SFX.ready(b.side);
      S1.puffs.push({ x: pos.x, y: pos.y, life: 0.3, max: 0.3, sc: 1.15 });
    }
  }

  function whack(side) {
    const w = S1.whacks[side];
    if (w.cd > 0) return;
    w.anim = 0.27;
    const z = S1.zombies[side];
    if (z && z.state === "walk") {
      z.state = "hit"; z.hitT = 0; w.cd = 0.18; S1.hitStop = 0.055; S1.shake = 7;
      const a = AISLES[side], zx = a.spawnX + (a.edgeX - a.spawnX) * z.reach;
      S1.sparks.push({ x: zx + (side === 0 ? 28 : -28), y: 164, life: 0.24, max: 0.24 });
      S1SFX.hit(side);
      setBanner(side === 0 ? "WHACKED LEFT ZOMBIE! 👋" : "WHACKED RIGHT ZOMBIE! 👋", "#4ade80", 0.75);
    } else {
      w.cd = 0.42; S1SFX.whiff(side);
      setBanner("PEEL WHIFF! (0.4s RECOVERY)", "#94a3b8", 0.55);
    }
  }

  function sweepRat() {
    if (S1.brushAnim > 0.05) return;
    S1.brushAnim = 0.27;
    if (S1.rat && S1.rat.state === "active") {
      S1.brushX = S1.rat.x; S1.rat.state = "bonked"; S1.rat.timer = 0; S1.hitStop = 0.045; S1.shake = 5;
      S1.sparks.push({ x: S1.rat.x, y: 313, life: 0.24, max: 0.24 });
      S1SFX.ratHit(S1.rat.x);
      setBanner("BONKED TEMPLETON OUTTA THE TIN! 🧹", "#38bdf8", 0.85);
    } else {
      S1.brushX = 320; S1SFX.whiff(-1);
    }
  }

  function handleKey(code) {
    S1SFX.init();
    if (code === "Escape") { skipAction(); return; }
    if (S1.phase === "ready") {
      if (code === "Enter" || code === "NumpadEnter" || code === "Space") startRun(0, false);
      return;
    }
    if (S1.phase === "tally") {
      if (code === "KeyR") { startRun(0, true); return; }
      if (code === "Enter" || code === "NumpadEnter" || code === "Space") { exitToBorough(false); return; }
      return;
    }
    if (S1.phase !== "playing") return;
    if (code === "Tab") { whack(0); return; }
    if (code === "Enter" || code === "NumpadEnter") { whack(1); return; }
    if (code === "Space") { sweepRat(); return; }

    const bin = BIN_MAP[code];
    if (!bin) return;
    const hb = S1.boards[bin.hand];
    if (hb && hb.state === "mash") {
      const altIdx = BOARDS[bin.hand].pairs.findIndex(p => p.code === bin.code);
      knead(hb, altIdx, bin.idx);
      return;
    }
    S1.binFlash[bin.idx] = 0.2;
    if (S1.rat && S1.rat.state === "active") {
      S1SFX.ratIn(S1.rat.x); S1.shake = 3.5;
      setBanner("🐀 TEMPLETON IN THE TIN! HIT [SPACE] TO BONK HIM!", "#fb7185", 0.85);
      return;
    }
    const ord = ORDERS[S1.orderIdx];
    let tb = null;
    if (!ord.allKeys) {
      const b = S1.boards[bin.hand];
      if (b && b.state === "top") tb = b;
    } else {
      const cands = S1.boards.filter(b => b && b.state === "top" && b.recipe[b.stepIdx]?.idx === bin.idx).sort((a, b) => b.stepIdx - a.stepIdx);
      tb = cands[0] || S1.boards.find(b => b && b.state === "top") || null;
    }
    if (!tb) return;
    const needed = tb.recipe[tb.stepIdx], bp = BOARDS[tb.side];
    if (needed && needed.idx === bin.idx) {
      tb.stepIdx++;
      S1SFX.top(tb.stepIdx, tb.side);
      S1.flying.push({ bin, sx: bin.x, sy: bin.y - 10, tx: bp.x + rand(-8, 8), ty: bp.y + rand(-4, 4), t: 0, dur: 0.13 });
      if (bin.baseStage === "sauced") tb.hasSauce = true;
      else if (bin.baseStage === "mozz") tb.hasMozz = true;
      else if (bin.sprite) tb.sprites.push(bin.sprite);

      if (tb.stepIdx >= tb.recipe.length) {
        const side = tb.side, ch = BELTS[side];
        S1SFX.belt(side); S1.boost[side] = 1.05;
        S1.conveyorPies.push({ side, bx: bp.x, by: bp.y, p: 0, inOven: false, sprites: [...tb.sprites] });
        S1.popups.push({ x: ch.endX + (side === 0 ? -18 : 18), y: ch.startY - 28, text: "CONVEYOR! ▲", color: "#fde047", life: 0.75 });
        S1.orderPiesDone++;
        syncStatus();
        if (S1.orderPiesDone >= ord.quota) {
          const tBonus = Math.max(5, Math.round(S1.orderTimeLeft) * 2);
          S1.totalCash += ord.cashReward;
          S1.speedBonus += tBonus;
          S1.completedOrders.push({ num: ord.num, cash: ord.cashReward, timeBonus: tBonus });
          S1SFX.clear();
          S1.boards = [null, null]; S1.zombies = [null, null]; S1.rat = null;
          syncStatus();
          if (S1.orderIdx < ORDERS.length - 1) {
            S1.phase = "order_clear";
            S1.phaseTimer = 2.1;
          } else {
            setTimeout(() => { if (S1.host && S1.host.isActive()) finishRun("ALL 3 ORDERS FIRED — FULL SLATE!"); }, 850);
          }
        } else {
          S1.boards[side] = makePie(side);
        }
      }
    } else {
      tb.wrongShake = 0.28; S1SFX.wrong(tb.side);
      setBanner(`WRONG TIN! NEED [${needed ? needed.key : "?"}] ${needed ? needed.name : ""}!`, "#f87171", 0.7);
    }
  }

  function bindCanvasPointer(cvs) {
    if (S1._ptrBound || !cvs) return;
    S1._ptrBound = true;
    cvs.addEventListener("pointerdown", (e) => {
      if (!S1.host || !S1.host.isActive()) return;
      S1SFX.init();
      const r = cvs.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 640;
      const my = ((e.clientY - r.top) / r.height) * 360;
      if (S1.phase === "ready") {
        if (mx >= 334 && mx <= 524 && my >= 264 && my <= 302) skipAction();
        else startRun(0, false);
        return;
      }
      if (S1.phase === "tally") {
        if (mx >= 72 && mx <= 314 && my >= 292 && my <= 332) startRun(0, true);
        else if (mx >= 326 && mx <= 568 && my >= 292 && my <= 332) exitToBorough(false);
        return;
      }
      if (mx >= 196 && mx <= 264 && my >= 2 && my <= 30) { skipAction(); return; }
      if (S1.phase !== "playing") return;
      if (S1.rat && S1.rat.state === "active" && Math.hypot(mx - S1.rat.x, my - 321) < 48) { sweepRat(); return; }
      if (mx < 185 && my < 245) { whack(0); return; }
      if (mx > 455 && my < 245) { whack(1); return; }
      if (my > 295) {
        let best = null, bd = 42;
        BINS.forEach(b => { const d = Math.abs(mx - b.x); if (d < bd) { bd = d; best = b; } });
        if (best) { handleKey(best.code); return; }
      }
      BOARDS.forEach(bp => {
        const b = S1.boards[bp.side];
        if (b && b.state === "mash" && Math.hypot(mx - bp.x, my - bp.y) < 75) {
          const na = b.expectedAlt === -1 ? 0 : b.expectedAlt;
          knead(b, na, bp.side === 0 ? na : 4 + na);
        }
      });
    });
  }

  function drawSpr(ctx, nm, cx, cy, w, h, flipX = false, alpha = 1) {
    const f = S1_FRAMES[nm];
    if (!f || !s1AtlasImg._ready) return;
    ctx.save();
    if (alpha < 1) ctx.globalAlpha = alpha;
    ctx.translate(Math.round(cx), Math.round(cy));
    if (flipX) ctx.scale(-1, 1);
    ctx.drawImage(s1AtlasImg, f[0], f[1], f[2], f[3], Math.round(-w / 2), Math.round(-h / 2), Math.round(w), Math.round(h));
    ctx.restore();
  }

  function draw1x(ctx, nm, px, py, flipX = false) {
    const f = S1_FRAMES[nm];
    if (!f || !s1AtlasImg._ready) return;
    const ax = f[4] !== undefined ? f[4] : (f[2] >> 1);
    const ay = f[5] !== undefined ? f[5] : f[3];
    ctx.save();
    ctx.translate(Math.round(px), Math.round(py));
    if (flipX) ctx.scale(-1, 1);
    ctx.drawImage(s1AtlasImg, f[0], f[1], f[2], f[3], -ax, -ay, f[2], f[3]);
    ctx.restore();
  }

  function pill(ctx, x, y, w, h, fill, stroke) {
    ctx.fillStyle = fill;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 2;
      ctx.strokeRect(Math.round(x) + 1, Math.round(y) + 1, Math.round(w) - 2, Math.round(h) - 2);
    }
  }

  function lineItems(total) {
    if (total <= 0) return [
      { c: "$0", t: "Taping over Ma's 1987 Russo's wedding VHS cassette" },
      { c: "$0", t: "Duct-taping a RadioShack mic to Nick's mop handle" }
    ];
    const it = [];
    if (total >= 60) it.push(
      { c: "$35", t: "2 beat-up C-Stands rented off a guy's Econoline in LIC" },
      { c: "$25", t: "Lukewarm bodega coffee & buttered rolls for unpaid NYU grips" }
    );
    if (total >= 130) it.push(
      { c: "$65", t: "Weekend wind-up 16mm Bolex camera from Steinway Pawn" },
      { c: "$30", t: "Cash bribe so ConEd doesn't tow the generator on 30th Ave" }
    );
    if (total >= 240) it.push(
      { c: "$95", t: "400ft recanned Kodak 35mm short-ends (slightly expired)" },
      { c: "$50", t: "Bootleg doorway dolly + hot pastrami crafty so lead stays!" }
    );
    const rem = total - it.reduce((s, r) => s + (parseInt(r.c.slice(1), 10) || 0), 0);
    if (rem > 0) it.push({ c: `$${rem}`, t: "Gaffer tape, parking-ticket slush fund & extra fake blood" });
    return it;
  }

  function updateAndDraw(ctx, dt) {
    S1BGM.sync();
    S1.timer += dt;
    if (S1.flashTimer > 0) S1.flashTimer = Math.max(0, S1.flashTimer - dt);
    if (S1.ovenFlare > 0) S1.ovenFlare = Math.max(0, S1.ovenFlare - dt);
    if (S1.shake > 0) S1.shake = Math.max(0, S1.shake - dt * 28);
    for (let i = 0; i < 8; i++) if (S1.binFlash[i] > 0) S1.binFlash[i] = Math.max(0, S1.binFlash[i] - dt);
    for (let s = 0; s < 2; s++) {
      if (S1.boost[s] > 0) S1.boost[s] = Math.max(0, S1.boost[s] - dt);
      S1.scroll[s] = (S1.scroll[s] + dt * (1.1 + (S1.boost[s] > 0 ? 2.4 : 0))) % 1;
    }

    const stepVfx = () => {
      for (let i = S1.conveyorPies.length - 1; i >= 0; i--) {
        const cp = S1.conveyorPies[i];
        cp.p += dt * 1.08;
        if (cp.p >= 0.9 && !cp.inOven) {
          cp.inOven = true; S1.ovenFlare = 0.55; S1SFX.oven();
          S1.popups.push({ x: 320 + (cp.side === 0 ? -24 : 24), y: 154, text: "🔥 IN THE OVEN!", color: "#4ade80", life: 0.75 });
        }
        if (cp.p >= 1) S1.conveyorPies.splice(i, 1);
      }
      for (let i = S1.flying.length - 1; i >= 0; i--) { S1.flying[i].t += dt; if (S1.flying[i].t >= S1.flying[i].dur) S1.flying.splice(i, 1); }
      for (let i = S1.puffs.length - 1; i >= 0; i--) { S1.puffs[i].life -= dt; if (S1.puffs[i].life <= 0) S1.puffs.splice(i, 1); }
      for (let i = S1.sparks.length - 1; i >= 0; i--) { S1.sparks[i].life -= dt; if (S1.sparks[i].life <= 0) S1.sparks.splice(i, 1); }
      for (let i = S1.popups.length - 1; i >= 0; i--) { S1.popups[i].life -= dt; if (S1.popups[i].life <= 0) S1.popups.splice(i, 1); }
    };

    if (S1.hitStop > 0) {
      S1.hitStop = Math.max(0, S1.hitStop - dt);
    } else if (S1.phase === "order_intro") {
      S1.phaseTimer -= dt;
      if (S1.phaseTimer <= 0) { S1.phase = "playing"; S1SFX.go(); }
    } else if (S1.phase === "order_clear") {
      stepVfx();
      S1.phaseTimer -= dt;
      if (S1.phaseTimer <= 0) setupOrder(S1.orderIdx + 1);
    } else if (S1.phase === "playing") {
      const ord = ORDERS[S1.orderIdx];
      S1.orderTimeLeft -= dt;
      const sc = Math.ceil(S1.orderTimeLeft);
      if (sc >= 1 && sc <= 6 && sc < S1.lastHurrySec) { S1.lastHurrySec = sc; S1SFX.tick(sc <= 3); }
      if (S1.orderTimeLeft <= 0) {
        S1.orderTimeLeft = 0; S1SFX.buzz();
        finishRun(`TIME'S UP ON ORDER ${ord.num}! HEADING TO BROOKLYN!`);
      } else {
        S1.boards.forEach(b => {
          if (!b) return;
          if (b.mashBump > 0) b.mashBump = Math.max(0, b.mashBump - dt * 8);
          if (b.nudge > 0) b.nudge = Math.max(0, b.nudge - dt);
          if (b.wrongShake > 0) b.wrongShake = Math.max(0, b.wrongShake - dt);
        });
        S1.whacks.forEach(w => { if (w.anim > 0) w.anim = Math.max(0, w.anim - dt); if (w.cd > 0) w.cd = Math.max(0, w.cd - dt); });
        if (S1.brushAnim > 0) S1.brushAnim = Math.max(0, S1.brushAnim - dt);

        S1.zClock -= dt;
        if (S1.zClock <= 0) {
          const free = [0, 1].filter(s => !S1.zombies[s] && S1.boards[s]);
          if (free.length) {
            const s = pick(free);
            S1.zombies[s] = { side: s, kind: Math.random() < 0.5 ? "zy" : "zc", state: "walk", reach: 0, clk: Math.random() * 0.5, dur: ord.zDur, hitT: 0 };
            S1SFX.groan(s);
          }
          S1.zClock = rand(ord.zInt[0], ord.zInt[1]);
        }
        for (let s = 0; s < 2; s++) {
          const z = S1.zombies[s];
          if (!z) continue;
          z.clk += dt;
          if (z.state === "walk") {
            z.reach += dt / z.dur;
            if (z.reach >= 1) {
              S1.zombies[s] = null; S1.stolenCount++; S1.shake = 9; S1SFX.stole(s); syncStatus();
              if (S1.stolenCount >= 5) { finishRun("5 PIES STOLEN — RITCHIE SHUT DOWN THE PARLOR!"); break; }
              S1.boards[s] = makePie(s);
              setBanner(`🧟 ZOMBIE GRABBED ${s === 0 ? "LEFT" : "RIGHT"} PIE! (${S1.stolenCount}/5 STOLEN)`, "#ef4444", 1.25);
            }
          } else {
            z.hitT += dt;
            if (z.hitT >= 0.56) S1.zombies[s] = null;
          }
        }
        if (!S1.rat) {
          S1.rClock -= dt;
          if (S1.rClock <= 0) {
            const b = pick(BINS), rx = b.idx === 0 ? b.x + 6 : b.x;
            S1.rat = { state: "active", binIdx: b.idx, x: rx, timer: 0 };
            S1SFX.ratIn(rx);
            S1.rClock = rand(ord.rInt[0], ord.rInt[1]);
          }
        } else {
          S1.rat.timer += dt;
          if (S1.rat.state === "bonked" && S1.rat.timer >= 0.96) S1.rat = null;
        }
        stepVfx();
      }
    } else {
      stepVfx();
    }

    // --- RENDER 640x360 NEO-GEO STAGE 1 ---
    ctx.imageSmoothingEnabled = false;
    ctx.save();
    if (S1.shake > 0.2) ctx.translate(Math.round((Math.random() - 0.5) * S1.shake), Math.round((Math.random() - 0.5) * S1.shake));
    if (s1BgImg._ready) ctx.drawImage(s1BgImg, 0, 0, 640, 360);
    else { ctx.fillStyle = "#1e1024"; ctx.fillRect(0, 0, 640, 360); }

    BELTS.forEach((ch, s) => {
      for (let r = 0; r < 7; r++) {
        const u = (r / 7 + S1.scroll[s]) % 1;
        const cx = ch.startX + (ch.endX - ch.startX) * u;
        const cy = ch.startY + (ch.endY - ch.startY) * u;
        const w = ch.wB + (ch.wT - ch.wB) * u;
        ctx.fillStyle = S1.boost[s] > 0 ? "rgba(254,240,138,0.5)" : "rgba(226,232,240,0.3)";
        ctx.fillRect(Math.round(cx - w / 2), Math.round(cy), Math.round(w), 2);
      }
    });

    const ff = `fire_${Math.floor(S1.timer * 8) % 4}`, fd = S1_FRAMES[ff], fsc = 0.48 + (S1.ovenFlare > 0 ? 0.12 : 0);
    ctx.save();
    ctx.beginPath(); ctx.ellipse(320, 176, 46, 41, 0, Math.PI, 0, false); ctx.lineTo(366, 174); ctx.lineTo(274, 174); ctx.closePath(); ctx.clip();
    drawSpr(ctx, ff, 320, 158, fd[2] * fsc, fd[3] * fsc, false, 0.88 + (S1.ovenFlare > 0 ? 0.12 : 0));
    ctx.restore();

    S1.conveyorPies.forEach(cp => {
      if (cp.p < 0.24) return;
      const ch = BELTS[cp.side], u = Math.min(1, (cp.p - 0.24) / 0.76);
      const px = ch.startX + (ch.endX - ch.startX) * u, py = ch.startY + (ch.endY - ch.startY) * u - 3, sc = 0.62 * (1 - u * 0.46);
      ctx.save();
      ctx.beginPath(); ctx.ellipse(320, 178, 46, 43, 0, Math.PI, 0, false); ctx.lineTo(445, 178); ctx.lineTo(445, 240); ctx.lineTo(195, 240); ctx.lineTo(195, 178); ctx.closePath(); ctx.clip();
      if (u < 0.45) { drawSpr(ctx, "pie_mozz", px, py, 128 * sc, 80 * sc); cp.sprites.forEach(ts => drawSpr(ctx, ts, px, py - 1, 88 * sc, 54 * sc)); }
      else drawSpr(ctx, "pie_baked", px, py, 146 * sc, 84 * sc, false, u > 0.88 ? (1 - u) / 0.12 : 1);
      ctx.restore();
    });

    const drawZ = (z, s) => {
      const a = AISLES[s];
      let nm = `${z.kind}_walk_0`, zx = a.spawnX, ky = 266;
      if (z.state === "walk") {
        zx = a.spawnX + (a.edgeX - a.spawnX) * Math.min(1, z.reach);
        if (z.reach < 0.72) nm = `${z.kind}_walk_${Math.floor(z.clk * 6) % 8}`;
        else { nm = `${z.kind}_lunge_${Math.floor(z.clk * 6) % 2}`; ky = 258; }
      } else {
        nm = `${z.kind}_hit_${z.hitT < (1 / 6) ? 0 : 1}`;
        zx = a.spawnX + (a.edgeX - a.spawnX) * Math.min(1, z.reach) + (s === 0 ? -1 : 1) * Math.min(1, z.hitT / 0.56) * 34;
      }
      draw1x(ctx, nm, zx, ky, s === 1);
    };

    for (let s = 0; s < 2; s++) { const z = S1.zombies[s]; if (z && !(z.state === "walk" && z.reach >= 0.72)) drawZ(z, s); }
    if (s1BgImg._ready) ctx.drawImage(s1BgImg, 0, 234, 640, 126, 0, 234, 640, 126);
    for (let s = 0; s < 2; s++) {
      const z = S1.zombies[s];
      if (z && z.state === "walk" && z.reach >= 0.72) { ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 640, 246); ctx.clip(); drawZ(z, s); ctx.restore(); }
    }
    for (let s = 0; s < 2; s++) {
      const z = S1.zombies[s];
      if (!z || z.state !== "walk") continue;
      const urg = z.reach > 0.62, blk = Math.floor(S1.timer * (urg ? 14 : 7)) % 2 === 0, tx = s === 0 ? 14 : 522;
      pill(ctx, tx, 40, 104, 22, urg && blk ? "#dc2626" : "#090d16", urg ? "#fde047" : "#ef4444");
      ctx.fillStyle = "#fde047"; ctx.font = 'bold 10px "JetBrains Mono",monospace'; ctx.textAlign = "center"; ctx.fillText(`[${AISLES[s].keyLabel}] WHACK!`, tx + 52, 55);
      ctx.fillStyle = "#1e293b"; ctx.fillRect(tx + 6, 64, 92, 5); ctx.fillStyle = urg ? "#ef4444" : "#facc15"; ctx.fillRect(tx + 6, 64, Math.round(92 * z.reach), 5);
    }

    const neededSet = new Set();
    S1.boards.forEach(b => {
      if (!b) return;
      const bp = BOARDS[b.side], px = bp.x + ((b.wrongShake > 0 || b.nudge > 0) ? Math.sin(S1.timer * 55) * 5 : 0), py = bp.y - 2;
      if (b.state === "mash") {
        const r = b.mashCount / b.mashGoal;
        const nm = b.mashCount === 0 ? "dough_0" : (r < 0.55 ? (b.lastDent === 0 ? "dough_1" : "dough_2") : (r < 0.82 ? "dough_3" : "dough_4"));
        const df = S1_FRAMES[nm], sc = 1.16 * (1 + b.mashBump * 0.06);
        drawSpr(ctx, nm, px, py + b.mashBump * 2, df[2] * sc, df[3] * sc);
        const p0 = b.expectedAlt === -1 || b.expectedAlt === 0, p1 = b.expectedAlt === -1 || b.expectedAlt === 1, ty = bp.y - 68;
        pill(ctx, bp.x - 68, ty, 136, 28, "rgba(9,13,22,0.94)", b.nudge > 0 ? "#ef4444" : "#f59e0b");
        pill(ctx, bp.x - 60, ty + 3, 42, 16, p0 ? "#facc15" : "#1e293b", p0 ? "#fff" : "#475569");
        ctx.fillStyle = p0 ? "#090d16" : "#94a3b8"; ctx.font = 'bold 10.5px "JetBrains Mono",monospace'; ctx.textAlign = "center"; ctx.fillText(`[${bp.pairs[0].label}]`, bp.x - 39, ty + 15);
        ctx.fillStyle = "#fde047"; ctx.fillText("↔", bp.x - 10, ty + 15);
        pill(ctx, bp.x - 1, ty + 3, 42, 16, p1 ? "#facc15" : "#1e293b", p1 ? "#fff" : "#475569");
        ctx.fillStyle = p1 ? "#090d16" : "#94a3b8"; ctx.fillText(`[${bp.pairs[1].label}]`, bp.x + 20, ty + 15);
        ctx.fillStyle = "#e2e8f0"; ctx.font = 'bold 9.5px "JetBrains Mono",monospace'; ctx.fillText(`${b.mashCount}/${b.mashGoal}`, bp.x + 53, ty + 15);
        ctx.fillStyle = "#334155"; ctx.fillRect(bp.x - 60, ty + 22, 120, 3); ctx.fillStyle = "#22c55e"; ctx.fillRect(bp.x - 60, ty + 22, Math.round(120 * r), 3);
      } else {
        if (b.hasMozz) drawSpr(ctx, "pie_mozz", px, py, 132, 82);
        else if (b.hasSauce) drawSpr(ctx, "pie_sauced", px, py, 132, 82);
        else { const df = S1_FRAMES.dough_5; drawSpr(ctx, "dough_5", px, py, df[2] * 1.22, df[3] * 1.22); }
        b.sprites.forEach(ts => drawSpr(ctx, ts, px, py - 2, 92, 58));
        const rec = b.recipe, bw = 21, gap = 3, tw = rec.length * bw + (rec.length - 1) * gap, sx = bp.x - tw / 2, ty = bp.y - 66;
        pill(ctx, sx - 5, ty - 4, tw + 10, 26, "rgba(9,13,22,0.92)", "#38bdf8");
        rec.forEach((sb, i) => {
          const bx = sx + i * (bw + gap), dn = i < b.stepIdx, nx = i === b.stepIdx;
          if (nx) neededSet.add(sb.idx);
          ctx.fillStyle = dn ? "#16a34a" : (nx ? sb.color : "#1e293b"); ctx.fillRect(Math.round(bx), ty, bw, 18);
          if (nx) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.strokeRect(Math.round(bx), ty, bw, 18); }
          ctx.fillStyle = nx && (sb.key === "S" || sb.key === "F" || sb.key === "K") ? "#090d16" : "#fff";
          ctx.font = 'bold 11px "JetBrains Mono",monospace'; ctx.textAlign = "center"; ctx.fillText(dn ? "✓" : sb.key, Math.round(bx + bw / 2), ty + 13);
        });
      }
    });

    S1.conveyorPies.forEach(cp => {
      if (cp.p >= 0.24) return;
      const ch = BELTS[cp.side], u = cp.p / 0.24, px = cp.bx + (ch.startX - cp.bx) * u, py = cp.by + (ch.startY - 3 - cp.by) * u, sc = 1 - u * 0.36, pf = S1_FRAMES.peel_0;
      drawSpr(ctx, "peel_0", px + (cp.side === 0 ? -18 : 18) * sc, py + 14 * sc, pf[2] * 0.92 * sc, pf[3] * 0.92 * sc, cp.side === 1);
      drawSpr(ctx, "pie_mozz", px, py, 128 * sc, 80 * sc); cp.sprites.forEach(ts => drawSpr(ctx, ts, px, py - 1, 88 * sc, 54 * sc));
    });

    S1.flying.forEach(ft => {
      const p = Math.min(1, ft.t / ft.dur), x = ft.sx + (ft.tx - ft.sx) * p, y = ft.sy + (ft.ty - ft.sy) * p - Math.sin(p * Math.PI) * 44;
      if (ft.bin.sprite) drawSpr(ctx, ft.bin.sprite, x, y, 52, 36);
      else { ctx.fillStyle = ft.bin.color; ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill(); }
    });
    S1.puffs.forEach(pf => { const p = 1 - pf.life / pf.max, nm = p < 0.45 ? "flour_0" : "flour_1", f = S1_FRAMES[nm]; drawSpr(ctx, nm, pf.x, pf.y - p * 10, f[2] * 0.68 * pf.sc, f[3] * 0.68 * pf.sc, false, 1 - p * 0.85); });

    for (let s = 0; s < 2; s++) {
      const w = S1.whacks[s];
      if (w.anim <= 0) continue;
      const el = 1 - w.anim / 0.27, nm = el < 0.24 ? "peel_0" : (el < 0.68 ? "peel_1" : "peel_2"), f = S1_FRAMES[nm];
      drawSpr(ctx, nm, s === 0 ? 178 - el * 46 : 462 + el * 46, 192 - Math.sin(el * Math.PI) * 20, f[2] * 1.15, f[3] * 1.15, s === 0);
    }

    if (S1.rat) {
      const r = S1.rat, rx = Math.round(r.x);
      if (r.state === "active") {
        const fi = Math.floor(r.timer * 6), seq = ["rat_2", "rat_3", "rat_4", "rat_3"];
        const nm = fi === 0 ? "rat_0" : (fi < 3 ? "rat_1" : seq[(fi - 3) % 4]);
        draw1x(ctx, nm, rx, nm === "rat_1" ? 350 : 349);
        if (s1BgImg._ready) {
          const mx = Math.max(0, rx - 28), mw = Math.min(56, 640 - mx);
          if (nm !== "rat_1") {
            ctx.drawImage(s1BgImg, mx, 349, mw, 11, mx, 349, mw, 11);
            ctx.drawImage(s1BgImg, rx - 18, 348, 9, 1, rx - 18, 348, 9, 1);
            ctx.drawImage(s1BgImg, rx + 9, 348, 9, 1, rx + 9, 348, 9, 1);
          } else {
            ctx.drawImage(s1BgImg, mx, 350, mw, 10, mx, 350, mw, 10);
            const f1 = S1_FRAMES.rat_1;
            if (s1AtlasImg._ready) ctx.drawImage(s1AtlasImg, f1[0], f1[1] + f1[5], f1[2], f1[3] - f1[5], rx - f1[4], 350, f1[2], f1[3] - f1[5]);
          }
        }
        const tx = Math.max(72, Math.min(568, rx));
        pill(ctx, tx - 62, 268, 124, 20, Math.floor(S1.timer * 10) % 2 === 0 ? "#be123c" : "#090d16", "#fde047");
        ctx.fillStyle = "#fff"; ctx.font = 'bold 10px "JetBrains Mono",monospace'; ctx.textAlign = "center"; ctx.fillText("[SPACE] WHACK RAT!", tx, 282);
      } else {
        const nm = r.timer < 0.24 ? "rat_5" : (r.timer < 0.48 ? "rat_6" : "rat_7");
        const vis = r.timer < 0.58 || Math.floor((r.timer - 0.58) * 18) % 2 === 0;
        if (vis) {
          draw1x(ctx, nm, rx, nm === "rat_6" ? 345 : (nm === "rat_5" ? 349 : 350));
          if (s1BgImg._ready) { const mx = Math.max(0, rx - 28), mw = Math.min(56, 640 - mx); ctx.drawImage(s1BgImg, mx, 350, mw, 10, mx, 350, mw, 10); }
        }
      }
    }

    BINS.forEach(b => {
      if (S1.rat && S1.rat.binIdx === b.idx) return;
      const nd = neededSet.has(b.idx), fl = S1.binFlash[b.idx] > 0, by = fl ? 294 : 298;
      pill(ctx, b.x - 28, by, 56, 19, fl ? "#fde047" : (nd ? "#0f172a" : "rgba(9,13,22,0.86)"), fl ? "#fff" : (nd ? "#facc15" : "#475569"));
      ctx.fillStyle = fl ? "#090d16" : (nd ? "#fde047" : "#cbd5e1"); ctx.font = 'bold 10px "JetBrains Mono",monospace'; ctx.textAlign = "center"; ctx.fillText(`[${b.key}]${b.name.slice(0, 4)}`, b.x, by + 13);
    });

    if (S1.brushAnim > 0) {
      const el = 1 - S1.brushAnim / 0.27, nm = el < 0.24 ? "brush_0" : (el < 0.7 ? "brush_1" : "brush_2"), f = S1_FRAMES[nm];
      drawSpr(ctx, nm, S1.brushX + (el - 0.5) * 64, 316 - Math.sin(el * Math.PI) * 14, f[2] * 1.05, f[3] * 1.05);
    }
    S1.sparks.forEach(sp => { const s = 0.72 + (1 - sp.life / sp.max) * 0.42; drawSpr(ctx, "vfx_spark", sp.x, sp.y, 92 * s, 74 * s); });
    S1.popups.forEach(pp => {
      const p = 1 - pp.life / 0.75;
      ctx.save(); ctx.globalAlpha = Math.min(1, pp.life * 2.5); ctx.font = 'bold 10.5px "JetBrains Mono",monospace'; ctx.textAlign = "center";
      ctx.fillStyle = "#090d16"; ctx.fillText(pp.text, Math.round(pp.x) + 1, Math.round(pp.y - p * 18) + 1);
      ctx.fillStyle = pp.color; ctx.fillText(pp.text, Math.round(pp.x), Math.round(pp.y - p * 18));
      ctx.restore();
    });

    // Top Arcade HUD Bar
    pill(ctx, 0, 0, 640, 32, "rgba(9,13,22,0.92)", null);
    ctx.fillStyle = "#f59e0b"; ctx.fillRect(0, 31, 640, 2);
    const ord = ORDERS[S1.orderIdx] || ORDERS[0];
    ctx.textAlign = "left"; ctx.font = 'bold 10.5px "JetBrains Mono",monospace';
    ctx.fillStyle = "#fde047"; ctx.fillText(`ORD ${ord.num}/3`, 10, 20);
    ctx.fillStyle = "#38bdf8"; ctx.fillText(`PIES:${S1.orderPiesDone}/${ord.quota}`, 80, 20);
    if (S1.phase === "playing" || S1.phase === "order_intro" || S1.phase === "order_clear") {
      pill(ctx, 196, 5, 66, 21, "#1e293b", "#94a3b8");
      ctx.textAlign = "center"; ctx.fillStyle = "#f8fafc"; ctx.font = 'bold 9.5px "JetBrains Mono",monospace'; ctx.fillText("ESC SKIP⏭", 229, 19);
    }
    const low = S1.orderTimeLeft < 8;
    pill(ctx, 268, 4, 104, 23, low ? "#7f1d1d" : "#1e293b", low ? "#ef4444" : "#64748b");
    ctx.textAlign = "center"; ctx.fillStyle = low ? "#fecaca" : "#fff"; ctx.font = 'bold 12.5px "JetBrains Mono",monospace'; ctx.fillText(`⏱ ${S1.orderTimeLeft.toFixed(1)}s`, 320, 20);
    ctx.textAlign = "right"; ctx.font = 'bold 10.5px "JetBrains Mono",monospace';
    const runTot = S1.totalCash + S1.speedBonus;
    ctx.fillStyle = S1.isReplay ? "#fbbf24" : "#4ade80";
    ctx.fillText(S1.isReplay ? `REPLAY($0 BANK): $${runTot}` : `FILM FUND: +$${runTot}`, 532, 20);
    ctx.fillStyle = S1.stolenCount >= 3 ? "#ef4444" : "#cbd5e1"; ctx.fillText(`STOLEN:${S1.stolenCount}/5`, 630, 20);

    if (S1.flashTimer > 0 && S1.flashMsg && S1.phase === "playing") {
      pill(ctx, 125, 106, 390, 24, "rgba(9,13,22,0.9)", S1.flashColor);
      ctx.fillStyle = S1.flashColor; ctx.font = 'bold 11px "JetBrains Mono",monospace'; ctx.textAlign = "center"; ctx.fillText(S1.flashMsg, 320, 122);
    }

    if (S1.phase === "ready") {
      ctx.fillStyle = "rgba(9,11,18,0.82)"; ctx.fillRect(0, 0, 640, 360); pill(ctx, 72, 46, 496, 268, "#0f172a", "#f59e0b");
      ctx.textAlign = "center"; ctx.fillStyle = "#facc15"; ctx.font = '21px "Black Ops One",cursive'; ctx.fillText("LI'L (SLICE) SHOP OF HORRORS", 320, 86);
      ctx.fillStyle = "#38bdf8"; ctx.font = 'bold 11px "JetBrains Mono",monospace'; ctx.fillText("BONUS STAGE • EARN LINE ITEMS FOR 'MADONNA & CHILD'!", 320, 108);
      const rules = [
        "1. ALTERNATE [A ↔ S] (Left) & [J ↔ K] (Right) to knead raw dough balls!",
        "2. TYPE the topping sequence above each pie to send it up the conveyor!",
        "3. [TAB] whacks Left Parlor Zombie • [ENTER] whacks Right Parlor Zombie!",
        "4. [SPACE] Whack-A-Moles Templeton when he pops out of the topping tins!",
        "5. Finish full orders before 0.0s to bank cash • 5 Stolen Pies = Kicked Out!"
      ];
      ctx.textAlign = "left"; ctx.fillStyle = "#e2e8f0"; ctx.font = 'bold 10.5px "JetBrains Mono",monospace'; rules.forEach((l, i) => ctx.fillText(l, 94, 140 + i * 24));
      pill(ctx, 116, 268, 206, 30, Math.floor(S1.timer * 3) % 2 === 0 ? "#f59e0b" : "#d97706", "#fef08a");
      ctx.textAlign = "center"; ctx.fillStyle = "#090d16"; ctx.font = 'bold 11.5px "JetBrains Mono",monospace'; ctx.fillText("[ENTER] START COOKING!", 219, 287);
      pill(ctx, 334, 268, 190, 30, "#1e293b", "#94a3b8"); ctx.fillStyle = "#e2e8f0"; ctx.font = 'bold 11px "JetBrains Mono",monospace'; ctx.fillText("[ESC] SKIP BONUS ⏭", 429, 287);
    } else if (S1.phase === "order_intro" || S1.phase === "order_clear") {
      ctx.fillStyle = "rgba(9,11,18,0.72)"; ctx.fillRect(0, 112, 640, 126); ctx.fillStyle = "#facc15"; ctx.fillRect(0, 112, 640, 3); ctx.fillRect(0, 235, 640, 3); ctx.textAlign = "center";
      if (S1.phase === "order_intro") {
        ctx.fillStyle = "#fde047"; ctx.font = '22px "Black Ops One",cursive'; ctx.fillText(ord.name, 320, 156);
        ctx.fillStyle = "#fff"; ctx.font = 'bold 11px "JetBrains Mono",monospace'; ctx.fillText(ord.sub, 320, 182);
        ctx.fillStyle = "#4ade80"; ctx.fillText(`QUOTA: ${ord.quota} PIES IN ${ord.timeLimit}s  •  PAYOUT: +$${ord.cashReward}`, 320, 206);
      } else {
        const last = S1.completedOrders[S1.completedOrders.length - 1];
        ctx.fillStyle = "#4ade80"; ctx.font = '24px "Black Ops One",cursive'; ctx.fillText(`ORDER ${last.num} FIRED & BANKED!`, 320, 160);
        ctx.fillStyle = "#fde047"; ctx.font = 'bold 13px "JetBrains Mono",monospace'; ctx.fillText(`+$${last.cash} ORDER PAY  +$${last.timeBonus} SPEED TIP!`, 320, 194);
      }
    } else if (S1.phase === "tally") {
      const curFund = S1.host && S1.host.getAccountCash ? S1.host.getAccountCash() : S1.banked;
      ctx.fillStyle = "rgba(9,11,18,0.88)"; ctx.fillRect(0, 0, 640, 360); pill(ctx, 48, 22, 544, 316, "#0f172a", "#facc15");
      const grand = S1.totalCash + S1.speedBonus;
      ctx.textAlign = "center"; ctx.fillStyle = S1.stolenCount >= 5 ? "#f87171" : "#facc15"; ctx.font = '21px "Black Ops One",cursive'; ctx.fillText("🎬 LINE ITEMS EARNED", 320, 50);
      ctx.fillStyle = "#94a3b8"; ctx.font = 'bold 10px "JetBrains Mono",monospace'; ctx.fillText(S1.endReason, 320, 68);
      pill(ctx, 72, 76, 496, 40, "#1e293b", S1.isReplay ? "#f59e0b" : "#475569");
      ctx.textAlign = "left"; ctx.font = 'bold 10.5px "JetBrains Mono",monospace';
      if (S1.isReplay) {
        ctx.fillStyle = "#fde047"; ctx.fillText(`PRACTICE REPLAY SCORE: $${grand} (${S1.completedOrders.length}/3 ORDERS)`, 84, 93);
        ctx.fillStyle = "#94a3b8"; ctx.fillText(`REPLAY CASH IS NOT ADDED • IN-GAME FILM FUND: $${curFund}`, 84, 108);
      } else {
        ctx.fillStyle = "#e2e8f0"; ctx.fillText(`ORDERS: ${S1.completedOrders.length}/3 ($${S1.totalCash}) • SPEED TIPS: +$${S1.speedBonus}`, 84, 93);
        ctx.fillStyle = "#4ade80"; ctx.fillText(`ADDED TO IN-GAME FILM FUND: +$${S1.lastBanked} (TOTAL: $${curFund})`, 84, 108);
      }
      ctx.textAlign = "right"; ctx.fillStyle = S1.isReplay ? "#fbbf24" : "#4ade80"; ctx.font = 'bold 13px "JetBrains Mono",monospace';
      ctx.fillText(S1.isReplay ? "+$0 BANKED" : `BANKED +$${S1.lastBanked}`, 556, 100);
      ctx.textAlign = "left"; ctx.fillStyle = "#fde047"; ctx.font = 'bold 10.5px "JetBrains Mono",monospace';
      ctx.fillText(S1.isReplay ? "WHAT THIS REPLAY SCORE WOULD BUY (FOR FUN ONLY):" : "WHAT NICK CAN AFFORD FOR 'MADONNA & CHILD':", 74, 134);
      lineItems(grand).forEach((row, idx) => {
        const ry = 146 + idx * 28; pill(ctx, 72, ry, 496, 24, "rgba(30,41,59,0.72)", "#334155");
        ctx.fillStyle = "#4ade80"; ctx.font = 'bold 10.5px "JetBrains Mono",monospace'; ctx.textAlign = "left"; ctx.fillText(row.c, 82, ry + 16);
        ctx.fillStyle = "#f8fafc"; ctx.fillText(`• ${row.t}`, 126, ry + 16);
      });
      pill(ctx, 72, 298, 242, 28, "#1e293b", "#f59e0b"); ctx.textAlign = "center"; ctx.fillStyle = "#fde047"; ctx.font = 'bold 10.5px "JetBrains Mono",monospace'; ctx.fillText("[R] REPLAY ($0 TO ACCOUNT)", 193, 316);
      pill(ctx, 326, 298, 242, 28, "#22c55e", "#bbf7d0"); ctx.fillStyle = "#090d16"; ctx.font = 'bold 11px "JetBrains Mono",monospace'; ctx.fillText("[ENTER] TO BROOKLYN ▶", 447, 316);
    }
    ctx.restore();
  }

  window.Stage1HorrorShop = {
    launch(host) {
      S1.host = host;
      bindCanvasPointer(document.getElementById("minigame-canvas"));
      S1.phase = "ready"; S1.timer = 0; S1.orderIdx = 0; S1.orderPiesDone = 0; S1.stolenCount = 0;
      S1.totalCash = 0; S1.speedBonus = 0; S1.isReplay = S1.officialDone;
      S1.boards = [null, null]; S1.zombies = [null, null]; S1.rat = null; S1.conveyorPies = [];
      S1BGM.play(0.36);
      syncStatus();
    },
    handleKey,
    skip: skipAction,
    stopAudio() { S1BGM.stop(); },
    statusLabel,
    getBanked() { return S1.banked; },
    updateAndDraw
  };
})();
