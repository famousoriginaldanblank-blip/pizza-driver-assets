// ============================================================================
// STAGE 1 INTER-BOROUGH BONUS: "LI'L (SLICE) SHOP OF HORRORS"
// Authentic Chunky 32-Bit SNK Neo-Geo Edition (640x360 -> 3x Nearest-Neighbor 1920x1080)
// ============================================================================
(function () {
  const W = 640, H = 360;
  const GH_PAGES = "https://famousoriginaldanblank-blip.github.io/pizza-driver-assets";
  const JSDELIVR = "https://cdn.jsdelivr.net/gh/famousoriginaldanblank-blip/pizza-driver-assets@main";

  const S1_FRAMES = {
    dough_0:[4,4,89,76], dough_1:[97,4,102,63], dough_2:[203,4,106,60],
    dough_3:[313,4,113,69], dough_4:[430,4,120,73], dough_5:[554,4,129,80],
    fire_0:[687,4,82,95], fire_1:[773,4,77,103], fire_2:[854,4,76,100], fire_3:[934,4,67,93],
    flour_0:[4,111,70,68], flour_1:[78,111,92,84],
    peel_0:[174,111,91,92], peel_1:[269,111,104,105], peel_2:[377,111,90,94],
    brush_0:[471,111,66,64], brush_1:[541,111,103,82], brush_2:[648,111,80,71],
    pie_sauced:[732,111,132,86], pie_mozz:[868,111,132,86],
    top_roni:[4,220,96,74], top_garlic:[104,220,86,69], top_sausage:[194,220,92,77],
    top_mushroom:[290,220,97,77], top_olive:[391,220,86,77], top_pepper:[481,220,86,77],
    pie_baked:[571,220,188,106], vfx_spark:[763,220,125,101],
    zy_walk_0:[892,220,109,158,42,158], zy_walk_1:[4,382,90,158,35,158],
    zy_walk_2:[98,382,82,158,25,158], zy_walk_3:[184,382,100,160,42,160],
    zy_walk_4:[288,382,104,158,41,158], zy_walk_5:[396,382,93,158,40,158],
    zy_walk_6:[493,382,91,151,32,151], zy_walk_7:[588,382,102,151,33,151],
    zy_lunge_0:[694,382,141,137,50,137], zy_lunge_1:[839,382,108,136,41,136],
    zy_hit_0:[4,546,96,160,47,160], zy_hit_1:[104,546,86,168,39,168],
    zc_walk_0:[194,546,103,155,30,155], zc_walk_1:[301,546,89,153,27,153],
    zc_walk_2:[394,546,100,154,33,154], zc_walk_3:[498,546,102,157,33,157],
    zc_walk_4:[604,546,101,154,31,154], zc_walk_5:[709,546,91,161,28,161],
    zc_walk_6:[804,546,90,156,29,156], zc_walk_7:[898,546,89,155,29,155],
    zc_lunge_0:[4,718,133,144,45,144], zc_lunge_1:[141,718,120,142,46,142],
    zc_hit_0:[265,718,98,158,46,158], zc_hit_1:[367,718,100,168,49,168],
    rat_0:[471,718,45,18,23,18], rat_1:[520,718,46,43,23,40], rat_2:[570,718,45,48,23,48], rat_3:[619,718,46,48,23,48],
    rat_4:[669,718,43,47,22,47], rat_5:[716,718,48,47,24,47], rat_6:[768,718,46,50,23,50], rat_7:[818,718,43,51,22,51]
  };

  function loadImgWithCands(cands) {
    const im = new Image();
    let i = 0;
    im._ready = false;
    im.onload = () => { im._ready = true; };
    im.onerror = () => { if (++i < cands.length) im.src = cands[i]; };
    im.src = cands[0];
    return im;
  }

  const s1BgImg = loadImgWithCands([
    "./assets/minigames/stage1/s1_kitchen_bg.png?v=0235e",
    "../assets/minigames/stage1/s1_kitchen_bg.png?v=0235e",
    `${GH_PAGES}/minigames/stage1/s1_kitchen_bg.png?v=0235e`,
    `${GH_PAGES}/assets/minigames/stage1/s1_kitchen_bg.png?v=0235e`,
    `${JSDELIVR}/assets/minigames/stage1/s1_kitchen_bg.png`,
    `${JSDELIVR}/minigames/stage1/s1_kitchen_bg.png`,
    "./assets/minigames/stage1/s1_kitchen_bg.jpg",
    `${GH_PAGES}/minigames/stage1/s1_kitchen_bg.jpg`,
    `${JSDELIVR}/assets/minigames/stage1/s1_kitchen_bg.jpg`
  ]);

  const s1AtlasImg = loadImgWithCands([
    "./assets/minigames/stage1/s1_sprites.png?v=0235e",
    "../assets/minigames/stage1/s1_sprites.png?v=0235e",
    `${GH_PAGES}/minigames/stage1/s1_sprites.png?v=0235e`,
    `${GH_PAGES}/assets/minigames/stage1/s1_sprites.png?v=0235e`,
    `${JSDELIVR}/assets/minigames/stage1/s1_sprites.png`,
    `${JSDELIVR}/minigames/stage1/s1_sprites.png`
  ]);

  const S1BGM = {
    audio: null,
    vol: 0.44,
    idx: 0,
    active: false,
    cands: [
      "./_music/MiniGame1_Midnight_Alley_Run.mp3",
      "../_music/MiniGame1_Midnight_Alley_Run.mp3",
      "./assets/audio/MiniGame1_Midnight_Alley_Run.mp3",
      `${GH_PAGES}/audio/MiniGame1_Midnight_Alley_Run.mp3`,
      `${JSDELIVR}/audio/MiniGame1_Midnight_Alley_Run.mp3`
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

  // Native 640x360 Neo-Geo Coordinates (3x integer blit -> 1920x1080!)
  const BINS = [
    { idx: 0, hand: 0, code: "KeyA", key: "A", name: "SAUCE", color: "#ef4444", x: 52,  y: 332, sprite: null, baseStage: "sauced" },
    { idx: 1, hand: 0, code: "KeyS", key: "S", name: "MOZZ",  color: "#fef08a", x: 121, y: 332, sprite: null, baseStage: "mozz" },
    { idx: 2, hand: 0, code: "KeyD", key: "D", name: "RONI",  color: "#dc2626", x: 190, y: 332, sprite: "top_roni" },
    { idx: 3, hand: 0, code: "KeyF", key: "F", name: "GARLIC",color: "#facc15", x: 256, y: 332, sprite: "top_garlic" },
    { idx: 4, hand: 1, code: "KeyJ", key: "J", name: "SAUSAGE",color: "#b45309", x: 385, y: 332, sprite: "top_sausage" },
    { idx: 5, hand: 1, code: "KeyK", key: "K", name: "SHROOMS",color: "#e2e8f0", x: 452, y: 332, sprite: "top_mushroom" },
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
    { spawnX: 36,  edgeX: 170, keyLabel: "TAB" },
    { spawnX: 604, edgeX: 470, keyLabel: "ENTER" }
  ];
  const ORDERS = [
    { num: 1, name: "ORDER 1: STEINWAY WARM-UP", sub: "ALTERNATE [A \x01 S] & [J \x01 K] TO KNEAD * DRESS 3 PIES!", quota: 3, timeLimit: 30, cashReward: 60, mashGoal: 6, allKeys: false, zInt: [4.2, 6], zDur: 3.4, rInt: [6.2, 8.8] },
    { num: 2, name: "ORDER 2: FRIDAY DINNER RUSH", sub: "SHAMBLING HORDE & TEMPLETON * FIRE 4 PIES!", quota: 4, timeLimit: 36, cashReward: 95, mashGoal: 8, allKeys: false, zInt: [2.9, 4.4], zDur: 2.8, rInt: [4.5, 6.6] },
    { num: 3, name: "ORDER 3: ALL-BOROUGH SUPREME", sub: "ALL 8 KEYS [ASDF + JKL;] ON EVERY PIE! * FIRE 5 PIES!", quota: 5, timeLimit: 44, cashReward: 145, mashGoal: 8, allKeys: true, zInt: [2.4, 3.8], zDur: 2.55, rInt: [4, 5.8] }
  ];

  const S1 = {
    host: null,
    phase: "ready", timer: 0, phaseTimer: 0, orderIdx: 0, orderTimeLeft: 30, lastHurrySec: 7, orderPiesDone: 0,
    stolenCount: 0, totalCash: 0, speedBonus: 0, officialDone: false, isReplay: false, banked: 0, lastBanked: 0,
    completedOrders: [], endReason: "", hitStop: 0, shake: 0, ovenFlare: 0, scroll: [0, 0], boost: [0, 0],
    flashMsg: "", flashColor: "#fde047", flashTimer: 0, binFlash: new Array(8).fill(0), boards: [null, null],
    conveyorPies: [], puffs: [], flying: [], sparks: [], popups: [], zombies: [null, null],
    whacks: [{ anim: 0, cd: 0 }, { anim: 0, cd: 0 }], zClock: 2.5, rat: null, brushAnim: 0, brushX: 320, rClock: 4.8,
    _ptrCvs: null
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
      S1.lastBanked = 0;
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
    finishRun(S1.isReplay ? "SKIPPED PRACTICE REPLAY - $0 ADDED TO ACCOUNT!" : "SKIPPED MID-SHIFT - HEADING TO BROOKLYN!");
  }

  function knead(b, altIdx, flashIdx) {
    if (flashIdx !== undefined) S1.binFlash[flashIdx] = 0.16;
    const pairs = BOARDS[b.side].pairs;
    if (altIdx === -1) {
      b.nudge = 0.35; S1SFX.nudge(b.side);
      setBanner(`KNEAD WITH ALTERNATING [${pairs[0].label}] \x01 [${pairs[1].label}]!`, "#fde047", 0.65);
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
      setBanner(side === 0 ? "WHACKED LEFT ZOMBIE!" : "WHACKED RIGHT ZOMBIE!", "#4ade80", 0.75);
    } else {
      w.cd = 0.42; S1SFX.whiff(side);
      setBanner("PEEL WHIFF! (0.4S RECOVERY)", "#94a3b8", 0.55);
    }
  }

  function sweepRat() {
    if (S1.brushAnim > 0.05) return;
    S1.brushAnim = 0.27;
    if (S1.rat && S1.rat.state === "active") {
      S1.brushX = S1.rat.x; S1.rat.state = "bonked"; S1.rat.timer = 0; S1.hitStop = 0.045; S1.shake = 5;
      S1.sparks.push({ x: S1.rat.x, y: 313, life: 0.24, max: 0.24 });
      S1SFX.ratHit(S1.rat.x);
      setBanner("BONKED TEMPLETON OUTTA DA TIN!", "#38bdf8", 0.85);
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
      setBanner("<!> TEMPLETON IN DA TIN! HIT [SPACE] TO BONK HIM!", "#fb7185", 0.85);
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
        S1.popups.push({ x: ch.endX + (side === 0 ? -18 : 18), y: ch.startY - 28, text: "CONVEYOR! ^", color: "#fde047", life: 0.75 });
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
            setTimeout(() => { if (S1.host && S1.host.isActive()) finishRun("ALL 3 ORDERS FIRED - FULL SLATE!"); }, 850);
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
    if (!cvs || S1._ptrCvs === cvs) return;
    S1._ptrCvs = cvs;
    cvs.addEventListener("pointerdown", (e) => {
      if (!S1.host || !S1.host.isActive()) return;
      S1SFX.init();
      const r = cvs.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * W;
      const my = ((e.clientY - r.top) / r.height) * H;
      if (S1.phase === "ready") {
        if (mx >= 330 && mx <= 538 && my >= 264 && my <= 302) skipAction();
        else startRun(0, false);
        return;
      }
      if (S1.phase === "tally") {
        if (mx >= 64 && mx <= 312 && my >= 294 && my <= 334) startRun(0, true);
        else if (mx >= 328 && mx <= 576 && my >= 294 && my <= 334) exitToBorough(false);
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

  // =========================================================================
  // AUTHENTIC SNK NEO-GEO MVS INTEGER PIXEL-MATRIX ROM BITMAP FONT
  // Zero browser font resampling! Every stem, bracket, colon & arrow is 100% uniform!
  // Special glyphs: \x01 = ↔ (2-way arrow), \x02 = ✓ (checkmark), \x03 = ▶ (play arrow)
  // =========================================================================
  const NEO_ROM = {
    "A":["01110","10001","10001","11111","10001","10001","10001"],
    "B":["11110","10001","10001","11110","10001","10001","11110"],
    "C":["01111","10000","10000","10000","10000","10000","01111"],
    "D":["11110","10001","10001","10001","10001","10001","11110"],
    "E":["11111","10000","10000","11110","10000","10000","11111"],
    "F":["11111","10000","10000","11110","10000","10000","10000"],
    "G":["01111","10000","10000","10111","10001","10001","01111"],
    "H":["10001","10001","10001","11111","10001","10001","10001"],
    "I":["01110","00100","00100","00100","00100","00100","01110"],
    "J":["00111","00010","00010","00010","10010","10010","01100"],
    "K":["10001","10010","10100","11000","10100","10010","10001"],
    "L":["10000","10000","10000","10000","10000","10000","11111"],
    "M":["10001","11011","10101","10101","10001","10001","10001"],
    "N":["10001","11001","10101","10011","10001","10001","10001"],
    "O":["01110","10001","10001","10001","10001","10001","01110"],
    "P":["11110","10001","10001","11110","10000","10000","10000"],
    "Q":["01110","10001","10001","10001","10101","10010","01101"],
    "R":["11110","10001","10001","11110","10100","10010","10001"],
    "S":["01111","10000","10000","01110","00001","00001","11110"],
    "T":["11111","00100","00100","00100","00100","00100","00100"],
    "U":["10001","10001","10001","10001","10001","10001","01110"],
    "V":["10001","10001","10001","10001","10001","01010","00100"],
    "W":["10001","10001","10001","10101","10101","11011","10001"],
    "X":["10001","10001","01010","00100","01010","10001","10001"],
    "Y":["10001","10001","01010","00100","00100","00100","00100"],
    "Z":["11111","00001","00010","00100","01000","10000","11111"],
    "0":["01110","10011","10101","10101","10101","11001","01110"],
    "1":["00100","01100","00100","00100","00100","00100","01110"],
    "2":["01110","10001","00001","00110","01000","10000","11111"],
    "3":["11110","00001","00001","01110","00001","00001","11110"],
    "4":["00010","00110","01010","10010","11111","00010","00010"],
    "5":["11111","10000","10000","11110","00001","00001","11110"],
    "6":["01111","10000","10000","11110","10001","10001","01110"],
    "7":["11111","00001","00010","00100","01000","01000","01000"],
    "8":["01110","10001","10001","01110","10001","10001","01110"],
    "9":["01110","10001","10001","01111","00001","00001","11110"],
    "[":["111","100","100","100","100","100","111"],
    "]":["111","001","001","001","001","001","111"],
    "(":["011","100","100","100","100","100","011"],
    ")":["110","001","001","001","001","001","110"],
    ":":["00","11","00","00","00","11","00"],
    ";":["00","11","00","00","01","01","10"],
    ".":["00","00","00","00","00","11","11"],
    ",":["00","00","00","00","01","01","10"],
    "!":["1","1","1","1","1","0","1"],
    "?":["01110","10001","00010","00100","00100","00000","00100"],
    "$":["00100","01111","10100","01110","00101","11110","00100"],
    "+":["00000","00100","00100","11111","00100","00100","00000"],
    "=":["00000","00000","11111","00000","11111","00000","00000"],
    "-":["0000","0000","0000","1111","0000","0000","0000"],
    "_":["00000","00000","00000","00000","00000","00000","11111"],
    "#":["01010","11111","01010","01010","11111","01010","00000"],
    "•":["000","010","111","010","000","000","000"],
    "/":["00001","00010","00100","00100","01000","10000","00000"],
    "&":["01100","10010","10100","01000","10101","10010","01101"],
    "'":["1","1","0","0","0","0","0"],
    "\"":["101","101","000","000","000","000","000"],
    "%":["11001","11010","00100","00100","01011","10011","00000"],
    "*":["000","101","010","111","010","101","000"],
    "^":["00100","01110","10101","00100","00100","00000","00000"],
    "<":["001","010","100","010","001","000","000"],
    ">":["100","010","001","010","100","000","000"],
    "\x01":["0010100","0110110","1111111","0110110","0010100","0000000","0000000"],
    "\x02":["0000001","0000011","0000110","1101100","0111000","0010000","0000000"],
    "\x03":["10000","11000","11100","11110","11100","11000","10000"],
    " ":["000","000","000","000","000","000","000"]
  };

  const offCvs = document.createElement("canvas");
  offCvs.width = W;
  offCvs.height = H;
  const ctx = offCvs.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  const romStampCache = new Map();

  function hexToRgb(hex) {
    const n = parseInt(hex.replace("#", ""), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  // Builds a pure integer pixel-matrix stamp (scale=1 -> 7px tall, scale=2 -> 14px tall chunky arcade header!)
  // bold=true widens horizontal stems by +1px for chunky Neo-Geo HUD counters & titles!
  function getNeoRomStamp(rawTxt, scale = 1, fillHex = "#f8fafc", outlineHex = "#090d16", bold = false, topHighlightHex = null) {
    const txt = String(rawTxt).toUpperCase();
    const key = `${txt}|${scale}|${fillHex}|${outlineHex}|${bold ? 1 : 0}|${topHighlightHex || ""}`;
    if (romStampCache.has(key)) return romStampCache.get(key);

    const glyphs = [];
    let logicalW = 0;
    for (let i = 0; i < txt.length; i++) {
      const g = NEO_ROM[txt[i]] || NEO_ROM[" "];
      const gw = g[0].length + (bold && txt[i] !== " " ? 1 : 0);
      glyphs.push({ g, gw, rawW: g[0].length });
      logicalW += gw + (i < txt.length - 1 ? 1 : 0);
    }
    const logicalH = 7;
    const pad = 1; // in scaled units: 1 logical pixel outline all around + 1px drop shadow
    const bw = (logicalW + pad * 2 + 1) * scale;
    const bh = (logicalH + pad * 2 + 1) * scale;

    const sc = document.createElement("canvas");
    sc.width = Math.max(2, bw);
    sc.height = Math.max(2, bh);
    const sctx = sc.getContext("2d");
    const imgData = sctx.createImageData(sc.width, sc.height);
    const d = imgData.data;

    // Step 1: Rasterize logical glyph mask at (logicalW + 3) x (logicalH + 3)
    const mw = logicalW + 3, mh = logicalH + 3;
    const mask = new Uint8Array(mw * mh); // 0=empty, 1..7=row+1
    let curX = 1;
    for (let gi = 0; gi < glyphs.length; gi++) {
      const { g, gw, rawW } = glyphs[gi];
      for (let r = 0; r < 7; r++) {
        const rowStr = g[r];
        for (let c = 0; c < rawW; c++) {
          if (rowStr[c] === "1") {
            mask[(r + 1) * mw + (curX + c)] = r + 1;
            if (bold && gw > rawW) mask[(r + 1) * mw + (curX + c + 1)] = r + 1;
          }
        }
      }
      curX += gw + 1;
    }

    const [fr, fg, fb] = hexToRgb(fillHex);
    const [hr, hg, hb] = topHighlightHex ? hexToRgb(topHighlightHex) : [Math.min(255, fr + 28), Math.min(255, fg + 28), Math.min(255, fb + 28)];
    const [or, og, ob] = hexToRgb(outlineHex);

    // Step 2: Expand each logical pixel into an exact scale x scale block with crisp 1-unit Neo-Geo outline + bottom-right drop shadow!
    for (let ly = 0; ly < mh; ly++) {
      for (let lx = 0; lx < mw; lx++) {
        const v = mask[ly * mw + lx];
        let pr = 0, pg = 0, pb = 0, pa = 0;
        if (v > 0) {
          // Authentic subtle Neo-Geo top-scanline specular highlight on bold/header text
          const useHi = (topHighlightHex || scale >= 2) && v <= 2;
          pr = useHi ? hr : fr;
          pg = useHi ? hg : fg;
          pb = useHi ? hb : fb;
          pa = 255;
        } else {
          const touch =
            (lx > 0 && mask[ly * mw + lx - 1]) ||
            (lx < mw - 1 && mask[ly * mw + lx + 1]) ||
            (ly > 0 && mask[(ly - 1) * mw + lx]) ||
            (ly < mh - 1 && mask[(ly + 1) * mw + lx]) ||
            (lx > 0 && ly > 0 && mask[(ly - 1) * mw + lx - 1]);
          if (touch) {
            pr = or; pg = og; pb = ob; pa = 255;
          }
        }
        if (!pa) continue;
        for (let sy = 0; sy < scale; sy++) {
          const py = ly * scale + sy;
          if (py >= sc.height) continue;
          for (let sx = 0; sx < scale; sx++) {
            const px = lx * scale + sx;
            if (px >= sc.width) continue;
            const p = (py * sc.width + px) * 4;
            d[p] = pr; d[p + 1] = pg; d[p + 2] = pb; d[p + 3] = 255;
          }
        }
      }
    }

    sctx.putImageData(imgData, 0, 0);
    if (romStampCache.size > 360) romStampCache.clear();
    romStampCache.set(key, sc);
    return sc;
  }

  function drawNeoText(txt, x, y, { scale = 1, fill = "#f8fafc", outline = "#090d16", align = "left", bold = false, hi = null } = {}) {
    if (!txt) return;
    const st = getNeoRomStamp(txt, scale, fill, outline, bold, hi);
    let dx = Math.round(x) - scale;
    if (align === "center") dx = Math.round(x - st.width * 0.5);
    else if (align === "right") dx = Math.round(x - st.width + scale);
    ctx.drawImage(st, dx, Math.round(y) - scale);
  }

  // Chunky 640x360 Neo-Geo arcade box (crisp 1px dark outer rim + 2px colored bevel, = 3px/6px on 1920x1080!)
  function pill(x, y, w, h, fill, stroke) {
    const ix = Math.round(x), iy = Math.round(y), iw = Math.round(w), ih = Math.round(h);
    ctx.fillStyle = "#090d16";
    ctx.fillRect(ix - 1, iy - 1, iw + 2, ih + 2);
    if (stroke) {
      ctx.fillStyle = stroke;
      ctx.fillRect(ix, iy, iw, ih);
      ctx.fillStyle = fill;
      ctx.fillRect(ix + 2, iy + 2, iw - 4, ih - 4);
    } else {
      ctx.fillStyle = fill;
      ctx.fillRect(ix, iy, iw, ih);
    }
  }

  function drawSpr(nm, cx, cy, w, h, flipX = false, alpha = 1) {
    const f = S1_FRAMES[nm];
    if (!f || !s1AtlasImg._ready) return;
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (alpha < 1) ctx.globalAlpha = alpha;
    ctx.translate(Math.round(cx), Math.round(cy));
    if (flipX) ctx.scale(-1, 1);
    ctx.drawImage(s1AtlasImg, f[0], f[1], f[2], f[3], Math.round(-w / 2), Math.round(-h / 2), Math.round(w), Math.round(h));
    ctx.restore();
  }

  function draw1x(nm, px, py, flipX = false) {
    const f = S1_FRAMES[nm];
    if (!f || !s1AtlasImg._ready) return;
    const ax = f[4] !== undefined ? f[4] : (f[2] >> 1);
    const ay = f[5] !== undefined ? f[5] : f[3];
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.translate(Math.round(px), Math.round(py));
    if (flipX) ctx.scale(-1, 1);
    ctx.drawImage(s1AtlasImg, f[0], f[1], f[2], f[3], -ax, -ay, f[2], f[3]);
    ctx.restore();
  }

  function lineItems(total) {
    if (total <= 0) return [
      { c: "$0", t: "TAPING OVER MA'S 1987 RUSSO'S WEDDING VHS CASSETTE" },
      { c: "$0", t: "DUCT-TAPING A RADIOSHACK MIC TO NICK'S MOP HANDLE" }
    ];
    const it = [];
    if (total >= 60) it.push(
      { c: "$35", t: "2 BEAT-UP C-STANDS RENTED OFF AN ECONOLINE IN LIC" },
      { c: "$25", t: "BODEGA COFFEE & BUTTERED ROLLS FOR UNPAID NYU GRIPS" }
    );
    if (total >= 130) it.push(
      { c: "$65", t: "WEEKEND WIND-UP 16MM BOLEX CAMERA FROM STEINWAY PAWN" },
      { c: "$30", t: "CASH BRIBE SO CONED DOESN'T TOW GENERATOR ON 30TH AVE" }
    );
    if (total >= 240) it.push(
      { c: "$95", t: "400FT RECANNED KODAK 35MM SHORT-ENDS (SLIGHTLY EXPIRED)" },
      { c: "$50", t: "BOOTLEG DOORWAY DOLLY + HOT PASTRAMI CRAFTY FOR LEAD" }
    );
    const rem = total - it.reduce((s, r) => s + (parseInt(r.c.slice(1), 10) || 0), 0);
    if (rem > 0) it.push({ c: `$${rem}`, t: "GAFFER TAPE, PARKING-TICKET SLUSH FUND & FAKE BLOOD" });
    return it;
  }

  function updateAndDraw(dispCtx, dt) {
    dt = Math.min(0.05, Math.max(0.001, dt));
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
          S1.popups.push({ x: 320 + (cp.side === 0 ? -24 : 24), y: 154, text: "IN DA OVEN!", color: "#4ade80", life: 0.75 });
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
              if (S1.stolenCount >= 5) { finishRun("5 PIES STOLEN - RITCHIE SHUT DOWN THE PARLOR!"); break; }
              S1.boards[s] = makePie(s);
              setBanner(`<!> ZOMBIE GRABBED ${s === 0 ? "LEFT" : "RIGHT"} PIE! (${S1.stolenCount}/5 STOLEN)`, "#ef4444", 1.25);
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

    // --- RENDER CHUNKY 640x360 NEO-GEO BUFFER -> EXACT 4x INTEGER BLIT TO 2560x1440 (SHARP-BILINEAR READY!) ---
    const dispCvs = dispCtx.canvas;
    if (dispCvs.width !== 2560 || dispCvs.height !== 1440) {
      dispCvs.width = 2560;
      dispCvs.height = 1440;
    }
    dispCtx.imageSmoothingEnabled = false;

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (S1.shake > 0.2) ctx.translate(Math.round((Math.random() - 0.5) * S1.shake), Math.round((Math.random() - 0.5) * S1.shake));

    if (s1BgImg._ready) ctx.drawImage(s1BgImg, 0, 0, W, H);
    else { ctx.fillStyle = "#1e1024"; ctx.fillRect(0, 0, W, H); }

    BELTS.forEach((ch, s) => {
      for (let r = 0; r < 7; r++) {
        const u = (r / 7 + S1.scroll[s]) % 1;
        const cx = ch.startX + (ch.endX - ch.startX) * u;
        const cy = ch.startY + (ch.endY - ch.startY) * u;
        const bw = ch.wB + (ch.wT - ch.wB) * u;
        ctx.fillStyle = S1.boost[s] > 0 ? "rgba(254,240,138,0.5)" : "rgba(226,232,240,0.3)";
        ctx.fillRect(Math.round(cx - bw / 2), Math.round(cy), Math.round(bw), 2);
      }
    });

    const ff = `fire_${Math.floor(S1.timer * 8) % 4}`, fd = S1_FRAMES[ff], fsc = 0.48 + (S1.ovenFlare > 0 ? 0.12 : 0);
    ctx.save();
    ctx.beginPath(); ctx.ellipse(320, 176, 46, 41, 0, Math.PI, 0, false); ctx.lineTo(366, 174); ctx.lineTo(274, 174); ctx.closePath(); ctx.clip();
    drawSpr(ff, 320, 158, fd[2] * fsc, fd[3] * fsc, false, 0.88 + (S1.ovenFlare > 0 ? 0.12 : 0));
    ctx.restore();

    S1.conveyorPies.forEach(cp => {
      if (cp.p < 0.24) return;
      const ch = BELTS[cp.side], u = Math.min(1, (cp.p - 0.24) / 0.76);
      const px = ch.startX + (ch.endX - ch.startX) * u, py = ch.startY + (ch.endY - ch.startY) * u - 3, sc = 0.62 * (1 - u * 0.46);
      ctx.save();
      ctx.beginPath(); ctx.ellipse(320, 178, 46, 43, 0, Math.PI, 0, false); ctx.lineTo(445, 178); ctx.lineTo(445, 240); ctx.lineTo(195, 240); ctx.lineTo(195, 178); ctx.closePath(); ctx.clip();
      if (u < 0.45) {
        drawSpr("pie_mozz", px, py, 128 * sc, 80 * sc);
        cp.sprites.forEach(ts => drawSpr(ts, px, py - 1, 88 * sc, 54 * sc));
      } else {
        drawSpr("pie_baked", px, py, 146 * sc, 84 * sc, false, u > 0.88 ? (1 - u) / 0.12 : 1);
      }
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
      draw1x(nm, zx, ky, s === 1);
    };

    for (let s = 0; s < 2; s++) { const z = S1.zombies[s]; if (z && !(z.state === "walk" && z.reach >= 0.72)) drawZ(z, s); }
    if (s1BgImg._ready) ctx.drawImage(s1BgImg, 0, 234, W, 126, 0, 234, W, 126);
    for (let s = 0; s < 2; s++) {
      const z = S1.zombies[s];
      if (z && z.state === "walk" && z.reach >= 0.72) {
        ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 246); ctx.clip(); drawZ(z, s); ctx.restore();
      }
    }
    for (let s = 0; s < 2; s++) {
      const z = S1.zombies[s];
      if (!z || z.state !== "walk") continue;
      const urg = z.reach > 0.62, blk = Math.floor(S1.timer * (urg ? 14 : 7)) % 2 === 0, tx = s === 0 ? 12 : 520;
      pill(tx, 39, 108, 21, urg && blk ? "#dc2626" : "#090d16", urg ? "#fde047" : "#ef4444");
      drawNeoText(`[${AISLES[s].keyLabel}] WHACK!`, tx + 54, 46, { fill: "#fde047", align: "center" });
      ctx.fillStyle = "#090d16"; ctx.fillRect(tx + 5, 62, 98, 6);
      ctx.fillStyle = "#1e293b"; ctx.fillRect(tx + 6, 63, 96, 4);
      ctx.fillStyle = urg ? "#ef4444" : "#facc15"; ctx.fillRect(tx + 6, 63, Math.round(96 * z.reach), 4);
    }

    const neededSet = new Set();
    S1.boards.forEach(b => {
      if (!b) return;
      const bp = BOARDS[b.side], px = bp.x + ((b.wrongShake > 0 || b.nudge > 0) ? Math.round(Math.sin(S1.timer * 55) * 5) : 0), py = bp.y - 2;
      if (b.state === "mash") {
        const r = b.mashCount / b.mashGoal;
        const nm = b.mashCount === 0 ? "dough_0" : (r < 0.55 ? (b.lastDent === 0 ? "dough_1" : "dough_2") : (r < 0.82 ? "dough_3" : "dough_4"));
        const df = S1_FRAMES[nm], sc = 1 + b.mashBump * 0.06;
        drawSpr(nm, px, py + b.mashBump * 2, df[2] * sc, df[3] * sc);

        const p0 = b.expectedAlt === -1 || b.expectedAlt === 0, p1 = b.expectedAlt === -1 || b.expectedAlt === 1, ty = bp.y - 68;
        pill(bp.x - 70, ty, 140, 28, "rgba(9,13,22,0.95)", b.nudge > 0 ? "#ef4444" : "#f59e0b");
        pill(bp.x - 63, ty + 4, 38, 15, p0 ? "#facc15" : "#1e293b", p0 ? "#fef08a" : "#475569");
        drawNeoText(`[${bp.pairs[0].label}]`, bp.x - 44, ty + 8, { fill: p0 ? "#090d16" : "#94a3b8", outline: p0 ? "#fef08a" : "#090d16", align: "center", bold: true });
        drawNeoText("\x01", bp.x - 15, ty + 8, { fill: "#fde047", align: "center" });
        pill(bp.x - 4, ty + 4, 38, 15, p1 ? "#facc15" : "#1e293b", p1 ? "#fef08a" : "#475569");
        drawNeoText(`[${bp.pairs[1].label}]`, bp.x + 15, ty + 8, { fill: p1 ? "#090d16" : "#94a3b8", outline: p1 ? "#fef08a" : "#090d16", align: "center", bold: true });
        drawNeoText(`${b.mashCount}/${b.mashGoal}`, bp.x + 51, ty + 8, { fill: "#f8fafc", align: "center" });
        ctx.fillStyle = "#334155"; ctx.fillRect(bp.x - 62, ty + 22, 124, 3);
        ctx.fillStyle = "#22c55e"; ctx.fillRect(bp.x - 62, ty + 22, Math.round(124 * r), 3);
      } else {
        if (b.hasMozz) { const mf = S1_FRAMES.pie_mozz; drawSpr("pie_mozz", px, py, mf[2], mf[3]); }
        else if (b.hasSauce) { const sf = S1_FRAMES.pie_sauced; drawSpr("pie_sauced", px, py, sf[2], sf[3]); }
        else { const df = S1_FRAMES.dough_5; drawSpr("dough_5", px, py, df[2], df[3]); }
        b.sprites.forEach(ts => { const tf = S1_FRAMES[ts]; drawSpr(ts, px, py - 2, tf[2], tf[3]); });

        const rec = b.recipe, bw = 21, gap = 3, tw = rec.length * bw + (rec.length - 1) * gap, sx = Math.round(bp.x - tw / 2), ty = bp.y - 66;
        pill(sx - 5, ty - 4, tw + 10, 26, "rgba(9,13,22,0.94)", "#38bdf8");
        rec.forEach((sb, i) => {
          const bx = sx + i * (bw + gap), dn = i < b.stepIdx, nx = i === b.stepIdx;
          if (nx) neededSet.add(sb.idx);
          pill(bx, ty, bw, 18, dn ? "#16a34a" : (nx ? sb.color : "#1e293b"), nx ? "#ffffff" : (dn ? "#4ade80" : "#334155"));
          const darkTxt = nx && (sb.key === "S" || sb.key === "F" || sb.key === "K");
          drawNeoText(dn ? "\x02" : sb.key, bx + (bw >> 1), ty + 5, {
            fill: dn ? "#ffffff" : (darkTxt ? "#090d16" : "#f8fafc"),
            outline: darkTxt ? "#fef08a" : "#090d16",
            align: "center",
            bold: !dn
          });
        });
      }
    });

    S1.conveyorPies.forEach(cp => {
      if (cp.p >= 0.24) return;
      const ch = BELTS[cp.side], u = cp.p / 0.24, px = cp.bx + (ch.startX - cp.bx) * u, py = cp.by + (ch.startY - 3 - cp.by) * u, sc = 1 - u * 0.36, pf = S1_FRAMES.peel_0;
      drawSpr("peel_0", px + (cp.side === 0 ? -18 : 18) * sc, py + 14 * sc, pf[2] * 0.92 * sc, pf[3] * 0.92 * sc, cp.side === 1);
      drawSpr("pie_mozz", px, py, 128 * sc, 80 * sc);
      cp.sprites.forEach(ts => drawSpr(ts, px, py - 1, 88 * sc, 54 * sc));
    });

    S1.flying.forEach(ft => {
      const p = Math.min(1, ft.t / ft.dur), x = ft.sx + (ft.tx - ft.sx) * p, y = ft.sy + (ft.ty - ft.sy) * p - Math.sin(p * Math.PI) * 44;
      if (ft.bin.sprite) drawSpr(ft.bin.sprite, x, y, 52, 36);
      else {
        ctx.fillStyle = "#090d16"; ctx.fillRect(Math.round(x) - 9, Math.round(y) - 9, 18, 18);
        ctx.fillStyle = ft.bin.color; ctx.fillRect(Math.round(x) - 7, Math.round(y) - 7, 14, 14);
      }
    });
    S1.puffs.forEach(pf => {
      const p = 1 - pf.life / pf.max, nm = p < 0.45 ? "flour_0" : "flour_1", f = S1_FRAMES[nm];
      drawSpr(nm, pf.x, pf.y - p * 10, f[2] * 0.68 * pf.sc, f[3] * 0.68 * pf.sc, false, 1 - p * 0.85);
    });

    for (let s = 0; s < 2; s++) {
      const w = S1.whacks[s];
      if (w.anim <= 0) continue;
      const el = 1 - w.anim / 0.27, nm = el < 0.24 ? "peel_0" : (el < 0.68 ? "peel_1" : "peel_2"), f = S1_FRAMES[nm];
      drawSpr(nm, s === 0 ? 178 - el * 46 : 462 + el * 46, 192 - Math.sin(el * Math.PI) * 20, f[2] * 1.15, f[3] * 1.15, s === 0);
    }

    if (S1.rat) {
      const r = S1.rat, rx = Math.round(r.x);
      if (r.state === "active") {
        const fi = Math.floor(r.timer * 6), seq = ["rat_2", "rat_3", "rat_4", "rat_3"];
        const nm = fi === 0 ? "rat_0" : (fi < 3 ? "rat_1" : seq[(fi - 3) % 4]);
        draw1x(nm, rx, nm === "rat_1" ? 350 : 349);
        if (s1BgImg._ready) {
          const mx = Math.max(0, rx - 28), mw = Math.min(56, W - mx);
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
        const tx = Math.max(68, Math.min(W - 68, rx));
        pill(tx - 62, 268, 124, 19, Math.floor(S1.timer * 10) % 2 === 0 ? "#be123c" : "#090d16", "#fde047");
        drawNeoText("[SPACE] WHACK RAT!", tx, 274, { fill: "#ffffff", align: "center" });
      } else {
        const nm = r.timer < 0.24 ? "rat_5" : (r.timer < 0.48 ? "rat_6" : "rat_7");
        const vis = r.timer < 0.58 || Math.floor((r.timer - 0.58) * 18) % 2 === 0;
        if (vis) {
          draw1x(nm, rx, nm === "rat_6" ? 345 : (nm === "rat_5" ? 349 : 350));
          if (s1BgImg._ready) { const mx = Math.max(0, rx - 28), mw = Math.min(56, W - mx); ctx.drawImage(s1BgImg, mx, 350, mw, 10, mx, 350, mw, 10); }
        }
      }
    }

    BINS.forEach(b => {
      if (S1.rat && S1.rat.binIdx === b.idx) return;
      const nd = neededSet.has(b.idx), fl = S1.binFlash[b.idx] > 0, by = fl ? 294 : 298;
      pill(b.x - 29, by, 58, 18, fl ? "#fde047" : (nd ? "#0f172a" : "rgba(9,13,22,0.90)"), fl ? "#ffffff" : (nd ? "#facc15" : "#475569"));
      drawNeoText(`[${b.key}]${b.name.slice(0, 4)}`, b.x, by + 5, {
        fill: fl ? "#090d16" : (nd ? "#fde047" : "#cbd5e1"),
        outline: fl ? "#fef08a" : "#090d16",
        align: "center"
      });
    });

    if (S1.brushAnim > 0) {
      const el = 1 - S1.brushAnim / 0.27, nm = el < 0.24 ? "brush_0" : (el < 0.7 ? "brush_1" : "brush_2"), f = S1_FRAMES[nm];
      drawSpr(nm, S1.brushX + (el - 0.5) * 64, 316 - Math.sin(el * Math.PI) * 14, f[2] * 1.05, f[3] * 1.05);
    }
    S1.sparks.forEach(sp => { const s = 0.72 + (1 - sp.life / sp.max) * 0.42; drawSpr("vfx_spark", sp.x, sp.y, 92 * s, 74 * s); });
    S1.popups.forEach(pp => {
      const p = 1 - pp.life / 0.75;
      drawNeoText(pp.text, pp.x, pp.y - p * 18, { fill: pp.color, align: "center", bold: true });
    });

    // Top Arcade HUD Bar (Chunky 640x360 Neo-Geo Header)
    ctx.fillStyle = "rgba(9,13,22,0.94)";
    ctx.fillRect(0, 0, W, 31);
    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(0, 30, W, 2);

    const ord = ORDERS[S1.orderIdx] || ORDERS[0];
    drawNeoText(`ORD ${ord.num}/3`, 10, 12, { fill: "#fde047", bold: true, hi: "#fef9c3" });
    drawNeoText(`PIES:${S1.orderPiesDone}/${ord.quota}`, 82, 12, { fill: "#38bdf8", bold: true });

    if (S1.phase === "playing" || S1.phase === "order_intro" || S1.phase === "order_clear") {
      pill(194, 5, 68, 20, "#1e293b", "#94a3b8");
      drawNeoText("ESC SKIP\x03", 228, 11, { fill: "#f8fafc", align: "center" });
    }

    const low = S1.orderTimeLeft < 8;
    pill(270, 4, 100, 22, low ? "#7f1d1d" : "#1e293b", low ? "#ef4444" : "#64748b");
    drawNeoText(`${S1.orderTimeLeft.toFixed(1)}S`, 320, 11, { fill: low ? "#fecaca" : "#ffffff", align: "center", bold: true, hi: "#ffffff" });

    const runTot = S1.totalCash + S1.speedBonus;
    drawNeoText(S1.isReplay ? `REPLAY($0): $${runTot}` : `FILM FUND: +$${runTot}`, 532, 12, {
      fill: S1.isReplay ? "#fbbf24" : "#4ade80",
      align: "right",
      bold: true
    });
    drawNeoText(`LOST:${S1.stolenCount}/5`, 630, 12, {
      fill: S1.stolenCount >= 3 ? "#ef4444" : "#cbd5e1",
      align: "right",
      bold: true
    });

    if (S1.flashTimer > 0 && S1.flashMsg && S1.phase === "playing") {
      pill(108, 106, 424, 22, "rgba(9,13,22,0.94)", S1.flashColor);
      drawNeoText(S1.flashMsg, W / 2, 113, { fill: S1.flashColor, align: "center", bold: true });
    }

    if (S1.phase === "ready") {
      ctx.fillStyle = "rgba(9,11,18,0.84)";
      ctx.fillRect(0, 0, W, H);
      pill(60, 44, 520, 272, "#0f172a", "#f59e0b");
      drawNeoText("LI'L (SLICE) SHOP OF HORRORS", W / 2, 66, { scale: 2, fill: "#facc15", align: "center", bold: true, hi: "#fef08a" });
      drawNeoText("BONUS STAGE * EARN LINE ITEMS FOR 'MADONNA & CHILD'!", W / 2, 92, { fill: "#38bdf8", align: "center", bold: true });

      const rules = [
        "1. ALTERNATE [A \x01 S] (LEFT) & [J \x01 K] (RIGHT) TO KNEAD!",
        "2. TYPE TOPPING KEYS ABOVE EACH PIE TO CONVEYOR IT!",
        "3. [TAB] WHACKS LEFT ZOMBIE  *  [ENTER] WHACKS RIGHT!",
        "4. [SPACE] WHACK-A-MOLES TEMPLETON OUT OF THE TINS!",
        "5. FINISH ORDERS BEFORE 0.0S * 5 STOLEN = KICKED OUT!"
      ];
      rules.forEach((l, i) => drawNeoText(l, 82, 122 + i * 26, { fill: "#e2e8f0" }));

      pill(104, 268, 212, 30, Math.floor(S1.timer * 3) % 2 === 0 ? "#f59e0b" : "#d97706", "#fef08a");
      drawNeoText("[ENTER] START COOKING!", 210, 279, { fill: "#090d16", outline: "#fef08a", align: "center", bold: true });
      pill(332, 268, 204, 30, "#1e293b", "#94a3b8");
      drawNeoText("[ESC] SKIP BONUS \x03", 434, 279, { fill: "#e2e8f0", align: "center", bold: true });
    } else if (S1.phase === "order_intro" || S1.phase === "order_clear") {
      ctx.fillStyle = "rgba(9,11,18,0.80)";
      ctx.fillRect(0, 112, W, 126);
      ctx.fillStyle = "#facc15";
      ctx.fillRect(0, 112, W, 3);
      ctx.fillRect(0, 235, W, 3);
      if (S1.phase === "order_intro") {
        drawNeoText(ord.name, W / 2, 138, { scale: 2, fill: "#fde047", align: "center", bold: true, hi: "#fef9c3" });
        drawNeoText(ord.sub, W / 2, 172, { fill: "#ffffff", align: "center", bold: true });
        drawNeoText(`QUOTA: ${ord.quota} PIES IN ${ord.timeLimit}S   *   PAYOUT: +$${ord.cashReward}`, W / 2, 198, { fill: "#4ade80", align: "center", bold: true });
      } else {
        const last = S1.completedOrders[S1.completedOrders.length - 1];
        drawNeoText(`ORDER ${last.num} FIRED & BANKED!`, W / 2, 146, { scale: 2, fill: "#4ade80", align: "center", bold: true, hi: "#bbf7d0" });
        drawNeoText(`+$${last.cash} ORDER PAY   +$${last.timeBonus} SPEED TIP!`, W / 2, 188, { fill: "#fde047", align: "center", bold: true });
      }
    } else if (S1.phase === "tally") {
      const curFund = S1.host && S1.host.getAccountCash ? S1.host.getAccountCash() : S1.banked;
      ctx.fillStyle = "rgba(9,11,18,0.90)";
      ctx.fillRect(0, 0, W, H);
      pill(44, 18, 552, 324, "#0f172a", "#facc15");

      const grand = S1.totalCash + S1.speedBonus;
      drawNeoText("THE NUMBERS", W / 2, 30, { scale: 2, fill: S1.stolenCount >= 5 ? "#f87171" : "#facc15", align: "center", bold: true, hi: "#fef08a" });
      drawNeoText(S1.endReason, W / 2, 50, { fill: "#94a3b8", align: "center" });

      pill(64, 62, 512, 34, "#1e293b", S1.isReplay ? "#f59e0b" : "#475569");
      if (S1.isReplay) {
        drawNeoText(`PRACTICE REPLAY SCORE: $${grand} (${S1.completedOrders.length}/3 ORDERS)`, 76, 69, { fill: "#fde047", bold: true });
        drawNeoText(`REPLAY CASH NOT ADDED * FILM FUND: $${curFund}`, 76, 83, { fill: "#94a3b8" });
      } else {
        drawNeoText(`ORDERS: ${S1.completedOrders.length}/3 ($${S1.totalCash}) * SPEED TIPS: +$${S1.speedBonus}`, 76, 69, { fill: "#e2e8f0", bold: true });
        drawNeoText(`ADDED TO FILM FUND: +$${S1.lastBanked} (TOTAL: $${curFund})`, 76, 83, { fill: "#4ade80", bold: true });
      }
      drawNeoText(S1.isReplay ? "+$0 BANKED" : `BANKED +$${S1.lastBanked}`, 564, 76, {
        fill: S1.isReplay ? "#fbbf24" : "#4ade80",
        align: "right",
        bold: true
      });

      drawNeoText(S1.isReplay ? "WHAT THIS REPLAY SCORE WOULD BUY (FOR FUN):" : "WHAT NICK CAN AFFORD FOR 'MADONNA & CHILD':", 66, 103, {
        fill: "#fde047",
        bold: true
      });

      const rows = lineItems(grand);
      const rowStep = rows.length >= 7 ? 25 : 26;
      rows.forEach((row, idx) => {
        const ry = 115 + idx * rowStep;
        pill(64, ry, 512, 21, "rgba(30,41,59,0.85)", "#334155");
        drawNeoText(row.c, 74, ry + 7, { fill: "#4ade80", bold: true });
        drawNeoText(`* ${row.t}`, 114, ry + 7, { fill: "#f8fafc" });
      });

      pill(64, 298, 248, 28, "#1e293b", "#f59e0b");
      drawNeoText("[R] REPLAY ($0 TO ACCOUNT)", 188, 308, { fill: "#fde047", align: "center", bold: true });
      pill(328, 298, 248, 28, "#22c55e", "#bbf7d0");
      drawNeoText("[ENTER] TO BROOKLYN \x03", 452, 308, { fill: "#090d16", outline: "#bbf7d0", align: "center", bold: true });
    }

    ctx.restore();
    dispCtx.drawImage(offCvs, 0, 0, dispCvs.width, dispCvs.height);
  }

  window.Stage1HorrorShop = {
    launch(host) {
      S1.host = host;
      const cvs = document.getElementById("minigame-canvas") || document.getElementById("kitchen-canvas");
      if (cvs) {
        cvs.width = 2560;
        cvs.height = 1440;
        bindCanvasPointer(cvs);
      }
      S1.phase = "ready"; S1.timer = 0; S1.orderIdx = 0; S1.orderPiesDone = 0; S1.stolenCount = 0;
      S1.totalCash = 0; S1.speedBonus = 0; S1.isReplay = S1.officialDone;
      S1.boards = [null, null]; S1.zombies = [null, null]; S1.rat = null; S1.conveyorPies = [];
      S1BGM.play(0.36);
      syncStatus();
    },
    jumpToOrder(orderIdx, isDev = false) {
      if (isDev) S1.officialDone = false;
      startRun(Math.max(0, Math.min(2, orderIdx | 0)), false);
    },
    previewTally() {
      S1.totalCash = 300; S1.speedBonus = 48;
      S1.completedOrders = [{ num: 1, cash: 60, timeBonus: 14 }, { num: 2, cash: 95, timeBonus: 16 }, { num: 3, cash: 145, timeBonus: 18 }];
      finishRun("ALL 3 ORDERS FIRED - FULL SLATE!");
    },
    resetOfficialForTest() {
      S1.officialDone = false; S1.isReplay = false; S1.banked = 0; S1.lastBanked = 0;
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
