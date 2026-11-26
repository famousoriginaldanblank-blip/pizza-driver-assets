// ============================================================================
// STAGE 2 INTER-BOROUGH BONUS: "DITMARS BLVD: JOHNNY BRESAOLA & THE GABAGHOULS"
// 32-Bit SNK Neo-Geo HD Pixel Beat-'Em-Up (960x540 -> 1920x1080 2x Nearest-Neighbor)
// ============================================================================
(function () {
  const W = 960, H = 540;

  // 6 Full Looping 960px Lower-Platform Screens (0..5760) -> Unified 1-Point 2-Story Station Panorama (5760..7058)!
  const NUM_LOWER_TILES = 6;
  const TWO_STORY_X = NUM_LOWER_TILES * W; // 5760
  const TWO_STORY_Y = -420;
  const TWO_STORY_W = 1298, TWO_STORY_H = 960;
  const MAX_CAM_X = TWO_STORY_X + TWO_STORY_W - W; // 6098
  const MAX_CAM_Y = -420;
  const WALK_TOP = 318, WALK_BOT = 436;

  // Single Unbroken Side-Profile Left-to-Right (`/`) Staircase Spine inside s2_two_story_mask.png!
  const STAIR_X0 = TWO_STORY_X + 124, STAIR_Y0 = 346;  // 5884: Foot of `/` stairs on Lower Ditmars Platform
  const STAIR_X1 = TWO_STORY_X + 596, STAIR_Y1 = -74;  // 6356: Top step emerging onto Upper Mezzanine Concourse
  const TURNSTILE_X = TWO_STORY_X + 819;               // 6579: Exact 1-point central tile grout seam (localX = 817..821)
  const STREET_GATE_X = TWO_STORY_X + 890, STREET_GATE_Y = TWO_STORY_Y + 309; // 6650: Chained/Padlocked MTA Street-Exit Iron Gate!
  const BOOTH_DOOR_X = TWO_STORY_X + 1042, BOOTH_DOOR_Y = -98; // 6802: Recessed side steel door of Built-In TOKENS Booth

  const GH_PAGES = "https://famousoriginaldanblank-blip.github.io/pizza-driver-assets";
  const JSDELIVR = "https://cdn.jsdelivr.net/gh/famousoriginaldanblank-blip/pizza-driver-assets@main";

  const S2_FRAMES = {
    g_idle_0:[4,4,78,136,44,135], g_idle_1:[86,4,79,134,44,133],
    g_walk_0:[169,4,81,132,44,131], g_walk_1:[254,4,74,132,42,131], g_walk_2:[332,4,77,132,42,131], g_walk_3:[413,4,74,132,41,131],
    g_jab:[491,4,103,137,46,136], g_kick:[598,4,113,130,36,129],
    g_umb_wind:[715,4,66,173,33,172], g_umb_hit:[785,4,140,136,48,135], g_shield:[929,4,100,137,46,136],
    g_sip_0:[1033,4,76,136,36,135], g_sip_1:[1113,4,76,136,36,135],
    g_jump:[1193,4,90,127,59,126], g_jkick:[1287,4,204,99,107,98],
    g_sprint_0:[1495,4,95,133,43,132], g_sprint_1:[1594,4,111,132,59,131],
    g_throw:[1709,4,104,155,45,154], g_hurt:[1817,4,82,132,33,131], g_phone:[1903,4,74,153,43,152],
    p_walk_0:[4,181,71,148,38,147], p_walk_1:[79,181,82,144,41,143],
    p_walk_2:[165,181,67,143,36,142], p_walk_3:[236,181,70,138,37,137],
    p_atk:[310,181,84,157,37,156], p_hit:[398,181,93,141,45,140],
    p_fall:[495,181,146,99,79,98], p_daze:[645,181,120,102,66,101], p_splat:[769,181,143,112,71,111],
    c_walk_0:[916,181,82,140,37,139], c_walk_1:[1002,181,89,135,38,134], c_walk_2:[1095,181,79,138,39,137],
    c_atk:[1178,181,100,138,40,137], c_hit:[1282,181,116,128,55,127],
    c_fall:[1402,181,139,106,78,105], c_daze:[1545,181,114,99,57,98], c_splat:[1663,181,143,108,71,107],
    door_jam:[1810,181,77,91,29,90],
    b_walk_0:[1891,181,96,137,39,136], b_walk_1:[4,342,68,138,35,137], b_walk_2:[76,342,90,137,37,136],
    b_wind:[170,342,107,137,53,136], b_throw:[281,342,114,125,48,124], b_hit:[399,342,79,134,46,133],
    b_fall:[482,342,144,109,85,108], b_daze:[630,342,117,101,55,100], b_splat:[751,342,162,66,80,65],
    jb_walk_0:[917,342,109,173,48,172], jb_walk_1:[1030,342,97,171,44,170], jb_walk_2:[1131,342,86,171,42,170],
    jb_hook:[1221,342,122,142,50,141], jb_smash:[1347,342,88,173,40,172], jb_hit:[1439,342,93,152,49,151],
    bench:[1536,342,212,85,106,84], trash_intact:[1752,342,64,90,32,89], trash_smashed:[1820,342,108,65,51,64],
    loot_clip:[1932,342,45,38,22,37], loot_wallet:[1981,342,45,45,22,44],
    item_papaya:[4,519,34,59,16,58], item_papaya_empty:[42,519,38,56,18,55],
    proj_bresaola:[84,519,63,39,38,38], proj_cleaver:[151,519,55,51,28,50],
    hud_gianna:[210,519,59,61,29,60], hud_bresaola:[273,519,60,60,29,59],
    vfx_hit:[337,519,68,68,33,67], vfx_deflect:[409,519,56,76,36,75],
    rat_ground:[469,519,72,30,33,29], rat_held:[545,519,30,61,14,3],
    turnstile_idle:[579,519,98,56,32,54], turnstile_spin:[681,519,98,56,32,54],
    street_gate_locked:[783,519,134,182,67,181],
    fg_ibeam:[921,519,65,90,33,89], fg_sign:[990,519,208,78,104,77],
    train_car:[1202,519,671,178,332,177], train_door_l:[1877,519,33,81,16,80], train_door_r:[1914,519,33,81,16,80]
  };

  function loadImg(rel) {
    const cands = [
      `./assets/${rel}`, `../assets/${rel}`,
      `${GH_PAGES}/${rel}`, `${GH_PAGES}/assets/${rel}`,
      `${JSDELIVR}/assets/${rel}`, `${JSDELIVR}/${rel}`
    ];
    const im = new Image();
    let i = 0;
    im._ready = false;
    im.onload = () => { im._ready = true; };
    im.onerror = () => { if (++i < cands.length) im.src = cands[i]; };
    im.src = cands[0];
    return im;
  }

  const IMG = {
    intro:        loadImg("minigames/stage2/s2_intro_card.jpg"),
    bg:           loadImg("minigames/stage2/s2_platform_bg.png"),
    mask:         loadImg("minigames/stage2/s2_platform_mask.png"),
    twoStoryMask: loadImg("minigames/stage2/s2_two_story_mask.png"),
    twoStoryFg:   loadImg("minigames/stage2/s2_two_story_fg.png"),
    atlas:        loadImg("minigames/stage2/s2_sprites.png")
  };

  const BGM = {
    audio: null, active: false, vol: 0.50, idx: 0,
    urls: [
      "./_music/MiniGame2_Midnight_Street_Chase.mp3",
      "../_music/MiniGame2_Midnight_Street_Chase.mp3",
      "./assets/audio/MiniGame2_Midnight_Street_Chase.mp3",
      `${GH_PAGES}/audio/MiniGame2_Midnight_Street_Chase.mp3`,
      `${JSDELIVR}/audio/MiniGame2_Midnight_Street_Chase.mp3`
    ],
    ensure() {
      if (this.audio || typeof Audio === "undefined") return;
      const a = new Audio();
      a.loop = true; a.preload = "auto"; a.volume = this.vol;
      a.addEventListener("error", () => {
        if (++this.idx < this.urls.length) {
          a.src = this.urls[this.idx]; a.load();
          this.sync(true);
        }
      });
      a.src = this.urls[0];
      this.audio = a;
    },
    play(v = 0.50) {
      this.ensure();
      this.active = true;
      this.vol = v;
      this.sync(true);
    },
    sync(tryPlay = false) {
      if (!this.audio) return;
      const hostSFX = G.host && G.host.getSoundFX ? G.host.getSoundFX() : null;
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

  // Dark 32-Bit SNK Neo-Geo YM2610 FM + ADPCM Beat-'Em-Up Sound Engine
  const SFX = {
    ctx: null, masterIn: null, b18: null, b9: null, _cd: {},
    isMuted() {
      const hostSFX = G.host && G.host.getSoundFX ? G.host.getSoundFX() : null;
      return !!(hostSFX && hostSFX.muted);
    },
    init() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        this.ctx = new AC();
        this.masterIn = this.ctx.createGain(); this.masterIn.gain.value = 0.92;
        const sh = this.ctx.createWaveShaper(), cv = new Float32Array(512);
        for (let i = 0; i < 512; i++) { const x = i / 255.5 - 1; cv[i] = Math.tanh((Math.round(x * 64) / 64) * 1.45); }
        sh.curve = cv;
        const cp = this.ctx.createDynamicsCompressor();
        cp.threshold.value = -14; cp.ratio.value = 5; cp.attack.value = 0.002; cp.release.value = 0.11;
        const dl = this.ctx.createDelay(0.1); dl.delayTime.value = 0.028;
        const lp = this.ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 3000;
        const wet = this.ctx.createGain(); wet.gain.value = 0.14;
        const out = this.ctx.createGain(); out.gain.value = 0.86;
        this.masterIn.connect(sh); sh.connect(cp);
        sh.connect(dl); dl.connect(lp); lp.connect(wet); wet.connect(cp);
        cp.connect(out); out.connect(this.ctx.destination);
        this.b18 = this._mkBuf(18500, 16);
        this.b9 = this._mkBuf(9200, 8);
      }
      if (this.ctx && this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
    },
    _mkBuf(rate, lv) {
      const sr = this.ctx.sampleRate, len = sr | 0, b = this.ctx.createBuffer(1, len, sr), d = b.getChannelData(0);
      const hs = Math.max(1, Math.round(sr / rate)); let c = 0;
      for (let i = 0; i < len; i++) { if (i % hs === 0) c = Math.round((Math.random() * 2 - 1) * lv) / lv; d[i] = c; }
      return b;
    },
    _dst(pan = 0) {
      if (pan && this.ctx.createStereoPanner) {
        const p = this.ctx.createStereoPanner();
        p.pan.value = Math.max(-0.85, Math.min(0.85, pan)); p.connect(this.masterIn); return p;
      }
      return this.masterIn;
    },
    _ok(k, ms) { const n = performance.now(); if (n - (this._cd[k] || 0) < ms) return false; this._cd[k] = n; return true; },
    fm({ freq = 220, endFreq = null, dur = 0.12, ratio = 2, modIdx = 3, modEndIdx = 0.2, carType = "sine", gain = 0.12, attack = 0.003, delay = 0, pan = 0 }) {
      if (this.isMuted() || !this.ctx) return;
      const t = this.ctx.currentTime + delay, st = t + dur + 0.015;
      const car = this.ctx.createOscillator(), mod = this.ctx.createOscillator(), mg = this.ctx.createGain(), amp = this.ctx.createGain();
      car.type = carType; car.frequency.setValueAtTime(freq, t);
      if (endFreq && endFreq !== freq) car.frequency.exponentialRampToValueAtTime(Math.max(18, endFreq), t + dur);
      mod.frequency.setValueAtTime(freq * ratio, t);
      if (endFreq && endFreq !== freq) mod.frequency.exponentialRampToValueAtTime(Math.max(18, endFreq * ratio), t + dur);
      mg.gain.setValueAtTime(Math.max(1, freq * modIdx), t);
      mg.gain.exponentialRampToValueAtTime(Math.max(1, (endFreq || freq) * modEndIdx), t + dur);
      amp.gain.setValueAtTime(0.0001, t); amp.gain.linearRampToValueAtTime(gain, t + attack); amp.gain.exponentialRampToValueAtTime(0.0008, t + dur);
      mod.connect(mg); mg.connect(car.frequency); car.connect(amp); amp.connect(this._dst(pan));
      mod.start(t); car.start(t); mod.stop(st); car.stop(st);
    },
    adpcm({ loFi = false, dur = 0.12, startFreq = 1800, endFreq = 450, Q = 1.8, filterType = "bandpass", gain = 0.16, attack = 0.002, delay = 0, pan = 0 }) {
      if (this.isMuted() || !this.ctx) return;
      const buf = loFi ? this.b9 : this.b18; if (!buf) return;
      const t = this.ctx.currentTime + delay, s = this.ctx.createBufferSource(), f = this.ctx.createBiquadFilter(), a = this.ctx.createGain();
      s.buffer = buf; s.loop = true; f.type = filterType; f.Q.value = Q; f.frequency.setValueAtTime(startFreq, t);
      if (endFreq && endFreq !== startFreq) f.frequency.exponentialRampToValueAtTime(Math.max(40, endFreq), t + dur);
      a.gain.setValueAtTime(0.0001, t); a.gain.linearRampToValueAtTime(gain, t + attack); a.gain.exponentialRampToValueAtTime(0.0008, t + dur);
      s.connect(f); f.connect(a); a.connect(this._dst(pan));
      s.start(t, Math.random() * 0.5, dur + 0.02);
    },
    swing(heavy = false) {
      this.init();
      this.adpcm({ loFi: heavy, dur: heavy ? 0.14 : 0.08, startFreq: heavy ? 1350 : 1900, endFreq: 240, Q: 1.5, gain: heavy ? 0.19 : 0.12 });
      this.fm({ freq: heavy ? 185 : 260, endFreq: heavy ? 62 : 95, dur: heavy ? 0.12 : 0.07, ratio: 1.5, modIdx: 3.4, gain: 0.12 });
    },
    hit(heavy = false, pan = 0) {
      this.init();
      this.adpcm({ loFi: true, dur: heavy ? 0.18 : 0.12, startFreq: heavy ? 2200 : 1850, Q: 1.2, endFreq: 210, gain: heavy ? 0.28 : 0.21, pan });
      this.fm({ freq: heavy ? 340 : 270, endFreq: 68, dur: 0.11, ratio: 1.73, modIdx: 6.5, carType: "square", gain: heavy ? 0.19 : 0.14, pan });
      this.fm({ freq: heavy ? 148 : 122, endFreq: 31, dur: heavy ? 0.21 : 0.14, ratio: 1, modIdx: 3.0, gain: heavy ? 0.25 : 0.18, pan: pan * 0.5 });
    },
    shieldOpen() {
      this.init();
      this.adpcm({ dur: 0.065, startFreq: 2600, endFreq: 780, Q: 2.2, gain: 0.14 });
      this.fm({ freq: 210, endFreq: 135, dur: 0.075, ratio: 2.41, modIdx: 4.5, gain: 0.12 });
    },
    deflect(pan = 0) {
      this.init();
      this.adpcm({ dur: 0.11, startFreq: 3400, endFreq: 920, Q: 2.4, gain: 0.22, pan });
      this.fm({ freq: 587.3, endFreq: 880, dur: 0.14, ratio: 2.41, modIdx: 6.2, modEndIdx: 0.8, carType: "sawtooth", gain: 0.17, pan });
      this.fm({ freq: 293.7, dur: 0.18, ratio: 1.5, modIdx: 4.0, gain: 0.14, delay: 0.03, pan });
    },
    turnstileClank() {
      this.init();
      this.adpcm({ dur: 0.09, startFreq: 3100, endFreq: 880, Q: 2.8, gain: 0.22 });
      this.fm({ freq: 420, endFreq: 195, dur: 0.11, ratio: 2.76, modIdx: 6.5, carType: "square", gain: 0.18 });
      this.fm({ freq: 610, endFreq: 310, dur: 0.09, ratio: 1.41, modIdx: 5.0, gain: 0.15, delay: 0.055 });
    },
    gateRattle() {
      this.init();
      [0, 0.075, 0.155].forEach((d, i) => {
        this.adpcm({ dur: 0.065, startFreq: 3400 - i * 350, endFreq: 950, Q: 3.1, gain: 0.20, delay: d });
        this.fm({ freq: 520 - i * 48, endFreq: 210, dur: 0.08, ratio: 2.91, modIdx: 7.2, carType: "square", gain: 0.16, delay: d });
      });
    },
    trackFall(pan = 0) {
      this.init();
      this.fm({ freq: 440, endFreq: 112, dur: 0.36, ratio: 1.5, modIdx: 3.8, modEndIdx: 0.6, carType: "triangle", gain: 0.15, pan });
      this.adpcm({ loFi: true, dur: 0.16, startFreq: 1500, endFreq: 260, Q: 1.4, gain: 0.18, delay: 0.34, pan });
    },
    trainSplat(pan = 0) {
      this.init();
      this.adpcm({ loFi: true, dur: 0.26, startFreq: 2600, endFreq: 190, Q: 1.0, gain: 0.32, pan });
      this.fm({ freq: 290, endFreq: 42, dur: 0.22, ratio: 1.73, modIdx: 8.5, carType: "sawtooth", gain: 0.25, pan });
      this.fm({ freq: 118, endFreq: 28, dur: 0.28, ratio: 1, modIdx: 4.5, gain: 0.28, pan });
      [523.3, 784.0].forEach((f, i) => this.fm({ freq: f, dur: 0.12, ratio: 2, modIdx: 3.0, gain: 0.12, delay: 0.06 + i * 0.055, pan }));
    },
    jump(fromBench = false) {
      this.init();
      this.adpcm({ loFi: true, dur: 0.09, startFreq: 720, endFreq: fromBench ? 2200 : 1650, Q: 1.9, gain: 0.14 });
      this.fm({ freq: fromBench ? 146.8 : 118, endFreq: fromBench ? 360 : 255, dur: 0.12, ratio: 1, modIdx: 3.6, carType: "triangle", gain: 0.15 });
    },
    cash() {
      this.init();
      this.adpcm({ dur: 0.05, startFreq: 2800, endFreq: 900, Q: 2.5, gain: 0.12 });
      [329.6, 493.9].forEach((f, i) => this.fm({ freq: f, dur: 0.11, ratio: 2, modIdx: 3.2, modEndIdx: 0.4, gain: 0.11, delay: i * 0.045 }));
    },
    papayaSplash(pan = 0) {
      this.init();
      this.adpcm({ loFi: false, dur: 0.20, startFreq: 2400, endFreq: 380, Q: 1.1, gain: 0.22, pan });
      this.fm({ freq: 260, endFreq: 74, dur: 0.14, ratio: 1.41, modIdx: 5.0, gain: 0.15, pan });
    },
    sipDrink() {
      this.init();
      this.adpcm({ dur: 0.14, startFreq: 1200, endFreq: 2600, Q: 3.4, gain: 0.14 });
      this.adpcm({ dur: 0.13, startFreq: 1350, endFreq: 2900, Q: 3.6, gain: 0.13, delay: 0.20 });
      [392.0, 523.3, 659.3].forEach((f, i) => {
        this.fm({ freq: f, dur: 0.13, ratio: 2, modIdx: 2.8, modEndIdx: 0.3, gain: 0.11, delay: 0.12 + i * 0.075 });
      });
    },
    trainBell() {
      this.init();
      if (!this._ok("bell", 380)) return;
      [659.3, 523.3].forEach((f, i) => this.fm({ freq: f, dur: 0.16, ratio: 2.76, modIdx: 4.5, modEndIdx: 0.5, gain: 0.11, delay: i * 0.15 }));
    },
    trainPass(fg = false) {
      this.init();
      if (!this._ok(fg ? "trfg" : "trbg", 900)) return;
      const dur = fg ? 0.95 : 0.75, g = fg ? 0.24 : 0.13;
      this.adpcm({ loFi: true, dur, startFreq: fg ? 920 : 620, endFreq: 190, Q: 0.9, filterType: "lowpass", gain: g, attack: 0.08 });
      this.fm({ freq: fg ? 78 : 62, endFreq: 44, dur, ratio: 0.5, modIdx: 5.5, carType: "sawtooth", gain: g * 0.65, attack: 0.06 });
    },
    doorSlam() {
      this.init();
      this.adpcm({ loFi: true, dur: 0.19, startFreq: 1650, endFreq: 180, Q: 1.2, gain: 0.26 });
      this.fm({ freq: 164, endFreq: 38, dur: 0.21, ratio: 2.41, modIdx: 6.4, carType: "square", gain: 0.20 });
    },
    koGroan(boss = false, pan = 0) {
      this.init();
      this.fm({ freq: boss ? 62 : 76, endFreq: boss ? 34 : 46, dur: boss ? 0.48 : 0.28, ratio: 0.5, modIdx: 7.0, modEndIdx: 2.2, carType: "sawtooth", gain: boss ? 0.18 : 0.12, attack: 0.02, pan });
      this.adpcm({ loFi: true, dur: boss ? 0.36 : 0.22, startFreq: 480, endFreq: 160, Q: 3.0, gain: 0.12, pan });
    },
    phoneRing() {
      this.init();
      [0, 0.14].forEach(d => {
        this.fm({ freq: 440, dur: 0.09, ratio: 2, modIdx: 3.8, gain: 0.11, delay: d });
        this.fm({ freq: 554.4, dur: 0.09, ratio: 2, modIdx: 3.8, gain: 0.09, delay: d + 0.03 });
      });
    },
    clearFanfare() {
      this.init();
      [[146.8, 0, 0.1], [174.6, 0.09, 0.1], [220, 0.18, 0.11], [293.7, 0.28, 0.36]].forEach(([f, d, l], i) => {
        this.fm({ freq: f, dur: l, ratio: 1, modIdx: 4.8, modEndIdx: 1.0, carType: "sawtooth", gain: 0.12, delay: d, pan: (i % 2 ? 0.2 : -0.2) });
        this.fm({ freq: f * 2, dur: l, ratio: 1, modIdx: 3.0, carType: "sawtooth", gain: 0.08, delay: d });
      });
    }
  };

  const keys = { up: false, down: false, left: false, right: false, shield: false };
  let lastTapDir = 0, lastTapTime = 0;

  const G = {
    host: null,
    phase: "intro", // "intro" | "play" | "booth_win" | "tally"
    time: 0,
    camX: 0,
    camY: 0,
    lockMinX: 0,
    lockMaxX: 960,
    zoneIdx: 0,
    zoneSpawned: true,
    hitStop: 0,
    shake: 0,
    goArrowTimer: 0,
    officialBankedDone: false,
    isReplay: false,
    lastBanked: 0,
    cashEarned: 0,
    kills: 0,
    deflects: 0,
    trainSplats: 0,
    lootPicked: 0,
    bossDefeated: false,
    climaxStarted: false,
    departTrainMissed: false,
    turnstilePassed: false,
    turnstileSpinTimer: 0,
    streetGateChecked: false,
    streetGateRattleTimer: 0,
    boothLockTimer: 0,

    player: null,
    benches: [],
    trashCans: [],
    turnstiles: [],
    enemies: [],
    projectiles: [],
    pickups: [],
    vfx: [],
    popups: [],
    bubbles: [],
    bubbleQueue: [],
    bgTrains: [],
    fgTrain: null,
    fgTrainCooldown: 10.0,
    bgTrainCooldown: 4.5,
    _lastHudLabel: ""
  };

  function statusLabel() {
    if (G.phase === "intro") return "INTRO • PRESS ENTER";
    if (G.phase === "tally") return G.isReplay ? `REPLAY ($0 BANK)` : `BANKED +$${G.lastBanked}`;
    if (G.phase === "booth_win") return "SAFE IN TOKEN BOOTH!";
    if (G.climaxStarted) return `CHASE! LOOT: $${G.cashEarned}`;
    if (G.zoneIdx === 3 && G.zoneSpawned) return `BOSS: JOHNNY BRESAOLA • $${G.cashEarned}`;
    return `ZONE ${Math.min(4, G.zoneIdx + 1)}/4 • LOOT: $${G.cashEarned}`;
  }

  function syncHostHUD() {
    if (!G.host || !G.host.onUpdateHUD) return;
    const lbl = statusLabel();
    if (lbl !== G._lastHudLabel) {
      G._lastHudLabel = lbl;
      G.host.onUpdateHUD(lbl);
    }
  }

  function stairCenterY(x) {
    if (x <= STAIR_X0) return STAIR_Y0;
    if (x >= STAIR_X1) return STAIR_Y1;
    const t = (x - STAIR_X0) / (STAIR_X1 - STAIR_X0);
    return STAIR_Y0 + t * (STAIR_Y1 - STAIR_Y0);
  }

  function walkBoundsAtX(x) {
    if (x < STAIR_X0) return [WALK_TOP, WALK_BOT];
    if (x <= STAIR_X1) {
      const cy = stairCenterY(x);
      return [cy - 10, cy + 10];
    }
    return [-108, -38];
  }

  function getNearbyColumns(worldX) {
    const cols = [];
    if (worldX < TWO_STORY_X + 60) {
      const t0 = Math.max(0, Math.floor((worldX - 120) / W));
      const t1 = Math.min(NUM_LOWER_TILES - 1, Math.floor((worldX + 120) / W));
      for (let t = t0; t <= t1; t++) {
        cols.push({ cx: t * W + 312, y: 348, hw: 26 });
        cols.push({ cx: t * W + 659, y: 348, hw: 26 });
        if (t >= 1) cols.push({ cx: t * W, y: 348, hw: 26 });
      }
      cols.push({ cx: TWO_STORY_X, y: 348, hw: 26 });
    }
    if (worldX > TWO_STORY_X - 60 && worldX < TWO_STORY_X + 1060) {
      cols.push({ cx: TWO_STORY_X + 309, y: 342, hw: 26 });
      cols.push({ cx: TWO_STORY_X + 649, y: 342, hw: 26 });
      cols.push({ cx: TWO_STORY_X + 987, y: 342, hw: 26 });
    }
    return cols;
  }

  function resolveColumnFootCollision(ent) {
    if ((ent.z || 0) > 10 || ent.x >= STAIR_X0 + 36) return;
    const cols = getNearbyColumns(ent.x);
    for (let i = 0; i < cols.length; i++) {
      const c = cols[i];
      if (Math.abs(ent.x - c.cx) < c.hw && Math.abs(ent.y - c.y) < 5) {
        ent.y = ent.y < c.y ? (c.y - 5) : (c.y + 5);
      }
    }
  }

  function resetPlayer(x = 150, y = 382) {
    G.player = {
      x, y, z: 0, vz: 0, vx: 0, vy: 0,
      dir: 1,
      hp: 100, maxHp: 100,
      sprinting: false,
      onBench: null,
      fromBenchLeap: false,
      heldItem: null,
      state: "idle",
      stateT: 0,
      comboStep: 0,
      comboWindow: 0,
      parryWindow: 0,
      invuln: 0,
      animT: 0,
      hitIds: new Set()
    };
  }

  function addBubble(who, text, dur = 2.6, anchorEntity = null, queueIfBusy = false) {
    const item = { who, text: text.toUpperCase(), timer: dur, maxTimer: dur, entity: anchorEntity };
    if (queueIfBusy && G.bubbles.length > 0) {
      G.bubbleQueue.push(item);
      return;
    }
    G.bubbleQueue = [];
    G.bubbles = [item];
  }

  function addPopup(x, y, text, color = "#fde047") {
    G.popups.push({ x, y, text, color, t: 0, dur: 0.9 });
  }

  function addVfx(sprite, x, y, dur = 0.2, flip = false) {
    G.vfx.push({ sprite, x, y, t: 0, dur, flip });
  }

  function spawnEnemy(kind, x, y, opts = {}) {
    const defs = {
      paulie:   { name: "GABAGHOUL PAULIE",  hp: 40,  speed: 86,  dmg: 9,  reward: 15 },
      crew:     { name: "THE GABAGHOULS",    hp: 50,  speed: 78,  dmg: 11, reward: 20 },
      butcher:  { name: "GABAGHOUL BUTCHER", hp: 56,  speed: 68,  dmg: 12, reward: 25 },
      bresaola: { name: "JOHNNY BRESAOLA",   hp: 235, speed: 76,  dmg: 16, reward: 100, isBoss: true }
    };
    const d = defs[kind] || defs.paulie;
    const [minY, maxY] = walkBoundsAtX(x);
    const e = {
      id: Math.random().toString(36).slice(2),
      kind,
      name: d.name,
      isBoss: !!d.isBoss,
      x, y: Math.max(minY, Math.min(maxY, y)),
      z: opts.z || 0, vz: 0, vx: 0,
      dir: -1,
      hp: opts.hp || d.hp,
      maxHp: opts.hp || d.hp,
      speed: opts.speed || d.speed,
      dmg: d.dmg,
      reward: d.reward,
      state: opts.enterFromTrain ? "train_exit" : "walk",
      stateT: opts.enterFromTrain ? 0.55 : 0,
      atkCd: 0.75 + Math.random() * 0.9,
      throwCd: 1.6 + Math.random() * 1.4,
      animT: Math.random() * 5,
      chaser: !!opts.chaser
    };
    G.enemies.push(e);
    return e;
  }

  function spawnPickup(kind, x, y, pop = true) {
    const [minY, maxY] = walkBoundsAtX(x);
    G.pickups.push({
      kind,
      x, y: Math.max(minY + 6, Math.min(maxY - 6, y)),
      z: pop ? 26 : 0,
      vz: pop ? 200 : 0,
      bob: Math.random() * 6
    });
  }

  function spawnBackgroundTrain({ targetX, startX = null, unloadKinds = [], jamDoor = true, isClimaxDepart = false, isBossTrain = false }) {
    if (!isClimaxDepart) SFX.trainPass(false);
    const initX = startX !== null ? startX : Math.min(targetX - 920, G.camX - 720);
    G.bgTrains.push({
      x: initX,
      targetX,
      y: 300,
      vx: 780,
      phase: isClimaxDepart ? "climax_wait" : "arriving",
      doorOpen: isClimaxDepart ? 1.0 : 0.0,
      timer: 0,
      unloadKinds: unloadKinds.slice(),
      jamDoor,
      jamZombieActive: false,
      isClimaxDepart,
      isBossTrain
    });
    if (isClimaxDepart) {
      const tr = G.bgTrains[G.bgTrains.length - 1];
      tr.x = targetX;
      tr.vx = 0;
    }
  }

  function buildStageLayout(opts = {}) {
    G.camX = 0;
    G.camY = 0;
    G.lockMinX = 0;
    G.lockMaxX = 960;
    G.zoneIdx = 0;
    G.zoneSpawned = true;
    G.cashEarned = 0;
    G.kills = 0;
    G.deflects = 0;
    G.trainSplats = 0;
    G.lootPicked = 0;
    G.bossDefeated = false;
    G.climaxStarted = false;
    G.departTrainMissed = false;
    G.turnstilePassed = false;
    G.turnstileSpinTimer = 0;
    G.streetGateChecked = false;
    G.streetGateRattleTimer = 0;
    G.boothLockTimer = 0;
    G.enemies = [];
    G.projectiles = [];
    G.pickups = [];
    G.vfx = [];
    G.popups = [];
    G.bubbles = [];
    G.bubbleQueue = [];
    G.bgTrains = [];
    G.fgTrain = null;
    G.fgTrainCooldown = 10.5;
    G.bgTrainCooldown = 6.0;
    keys.up = keys.down = keys.left = keys.right = keys.shield = false;

    G.benches = [
      { x: 485,  y: 354, w: 190 },
      { x: 1445, y: 354, w: 190 },
      { x: 2405, y: 354, w: 190 },
      { x: 3365, y: 354, w: 190 },
      { x: 4325, y: 354, w: 190 },
      { x: 5285, y: 354, w: 190 }
    ];
    G.trashCans = [
      { x: 176,  y: 360, z: 0, vz: 0, smashed: false, drop: "papaya" },
      { x: 782,  y: 362, z: 0, vz: 0, smashed: false, drop: "rat" },
      { x: 1136, y: 360, z: 0, vz: 0, smashed: false, drop: "papaya" },
      { x: 1742, y: 362, z: 0, vz: 0, smashed: false, drop: "rat" },
      { x: 2096, y: 360, z: 0, vz: 0, smashed: false, drop: "papaya" },
      { x: 2702, y: 362, z: 0, vz: 0, smashed: false, drop: "rat" },
      { x: 3056, y: 360, z: 0, vz: 0, smashed: false, drop: "papaya" },
      { x: 3662, y: 362, z: 0, vz: 0, smashed: false, drop: "rat" },
      { x: 4016, y: 360, z: 0, vz: 0, smashed: false, drop: "papaya" },
      { x: 4622, y: 362, z: 0, vz: 0, smashed: false, drop: "rat" },
      { x: 4976, y: 360, z: 0, vz: 0, smashed: false, drop: "papaya" }
    ];

    G.turnstiles = [
      { x: TWO_STORY_X + 817, y: -84, scale: 0.90, spinning: false },
      { x: TWO_STORY_X + 819, y: -63, scale: 0.95, spinning: false },
      { x: TWO_STORY_X + 821, y: -39, scale: 1.00, spinning: false }
    ];

    spawnPickup("papaya", 415, 396, false);
    spawnPickup("rat", 915, 412, false);
    spawnPickup("papaya", 1980, 398, false);
    spawnPickup("rat", 2540, 410, false);
    spawnPickup("papaya", 3540, 398, false);
    spawnPickup("rat", 4520, 412, false);

    resetPlayer(145, 382);

    if (!opts.skipZone0) {
      const p1 = spawnEnemy("paulie", 695, 382);
      spawnEnemy("crew", 835, 414);
      spawnEnemy("paulie", 940, 352);
      spawnBackgroundTrain({ targetX: 295, unloadKinds: ["paulie", "crew", "paulie"], jamDoor: true });

      setTimeout(() => {
        if (G.host && G.host.isActive() && G.phase === "play" && G.zoneIdx === 0 && !G.climaxStarted) {
          addBubble("goon", "TELL NICKY TO STOP SLINGING PIES INTO BRESAOLA TERRITORY!", 2.7, p1);
          addBubble("gianna", "SHOVE IT, GOOMBA! DIS BUSTED UMBRELLA'S YOUR BAD LUCK!", 2.8, G.player, true);
        }
      }, 300);
    }
  }

  function startGameplay(isReplay = false, opts = {}) {
    SFX.init();
    G.isReplay = isReplay || G.officialBankedDone;
    G.phase = "play";
    buildStageLayout(opts);
    BGM.play(0.50);
    syncHostHUD();
  }

  function startPapayaSip(p) {
    p.heldItem = "empty_cup";
    p.state = "sip";
    p.stateT = 0.68;
    p.vx = 0;
    p.vy = 0;
    p.sprinting = false;
    p.comboStep = 0;
    p.comboWindow = 0;
    p.invuln = Math.max(p.invuln, 0.72);
    const healAmt = 20;
    p.hp = Math.min(p.maxHp, p.hp + healAmt);
    SFX.sipDrink();
    addPopup(p.x, p.y - 128, `+${healAmt} HP`, "#4ade80");
    addBubble("gianna", "MMM—GRAY'S PAPAYA!", 2.0, p);
  }

  function performPlayerAttack() {
    const p = G.player;
    if (!p || G.phase !== "play") return;
    if (p.state === "hurt" || p.state === "phone" || p.state === "sip") return;

    if (p.z > 9 && !p.onBench) {
      if (p.state !== "jkick") {
        p.state = "jkick";
        p.stateT = 0.36;
        p.vx = p.dir * (p.fromBenchLeap ? 385 : 300);
        p.hitIds.clear();
        SFX.swing(true);
      }
      return;
    }

    if (!p.heldItem) {
      for (let i = 0; i < G.pickups.length; i++) {
        const pk = G.pickups[i];
        if ((pk.kind === "papaya" || pk.kind === "rat") && pk.z < 16 && Math.abs(pk.x - p.x) < 54 && Math.abs(pk.y - p.y) < 36) {
          G.pickups.splice(i, 1);
          if (pk.kind === "papaya") {
            startPapayaSip(p);
          } else {
            p.heldItem = "rat";
            SFX.cash();
          }
          return;
        }
      }
    }

    if (p.heldItem) {
      const kind = p.heldItem;
      p.heldItem = null;
      p.state = "throw";
      p.stateT = 0.24;
      SFX.swing(true);
      const isCup = (kind === "empty_cup" || kind === "papaya");
      G.projectiles.push({
        fromPlayer: true,
        kind: isCup ? "empty_cup" : "rat",
        sprite: isCup ? "item_papaya_empty" : "rat_held",
        x: p.x + p.dir * 38,
        y: p.y,
        z: 64,
        vx: p.dir * (isCup ? 545 : 525),
        dmg: kind === "rat" ? 38 : 26,
        rot: 0
      });
      addBubble("gianna", isCup ? "YOU CAN HAVE IT, YA FILTHY GHOUL!" : "RAT ATTACK!", 2.1, p);
      return;
    }

    // Holding DOWN + Attack performs a purposeful Umbrella Track-Shove to punt ghouls onto Track 1!
    if (keys.down && p.state !== "umb_wind" && p.state !== "umb_hit") {
      p.comboStep = 0;
      p.state = "umb_wind";
      p.stateT = 0.06;
      p.comboWindow = 0;
      p.vx = p.dir * 80;
      p.hitIds.clear();
      SFX.swing(true);
      return;
    }

    if (p.state === "jab" || p.state === "kick" || p.state === "umb_wind" || p.state === "umb_hit") {
      if (p.stateT > 0.09) return;
    }
    if (p.comboWindow > 0 && p.comboStep === 1) {
      p.comboStep = 2;
      p.state = "kick";
      p.stateT = 0.21;
      p.comboWindow = 0.44;
      p.vx = p.dir * 72;
      p.hitIds.clear();
      SFX.swing(false);
    } else if (p.comboWindow > 0 && p.comboStep === 2) {
      p.comboStep = 0;
      p.state = "umb_wind";
      p.stateT = 0.08;
      p.comboWindow = 0;
      p.vx = p.dir * 105;
      p.hitIds.clear();
      SFX.swing(true);
    } else {
      p.comboStep = 1;
      p.state = "jab";
      p.stateT = 0.17;
      p.comboWindow = 0.42;
      p.vx = p.dir * 46;
      p.hitIds.clear();
      SFX.swing(false);
    }
  }

  function performPlayerJump() {
    const p = G.player;
    if (!p || G.phase !== "play" || p.state === "hurt" || p.state === "phone" || p.state === "sip") return;
    if (p.z <= 2 || p.onBench) {
      const fromBench = !!p.onBench;
      p.onBench = null;
      p.fromBenchLeap = fromBench;
      p.vz = fromBench ? 505 : 405;
      p.z += 3;
      p.state = "jump";
      p.stateT = 0.5;
      SFX.jump(fromBench);
      if (fromBench) p.vx = p.dir * 300;
    }
  }

  function checkMeleeHitbox(attackerX, attackerY, dir, reachX, reachY, dmg, knockback, launchToForeground = false) {
    const p = G.player;
    G.trashCans.forEach(tc => {
      if (!tc.smashed) {
        const dx = (tc.x - attackerX) * dir;
        if (dx > -18 && dx < reachX && Math.abs(tc.y - attackerY) < reachY + 14) {
          tc.smashed = true;
          tc.z = 14;
          tc.vz = 115;
          tc.y = Math.min(WALK_BOT - 12, tc.y + 8);
          SFX.hit(true, ((tc.x - G.camX) - W * 0.5) / (W * 0.5));
          addVfx("vfx_hit", tc.x, tc.y - 45, 0.22);
          G.shake = 0.14;
          spawnPickup(tc.drop || "papaya", tc.x + dir * 24, tc.y + 12, true);
          if (Math.random() < 0.65) spawnPickup("clip", tc.x - dir * 15, tc.y + 18, true);
        }
      }
    });

    G.enemies.forEach(e => {
      if (e.hp <= 0 || p.hitIds.has(e.id) || e.state === "train_exit" || e.state === "track_fall" || e.state === "track_daze" || e.state === "train_splat") return;
      const dx = (e.x - attackerX) * dir;
      const dy = Math.abs(e.y - attackerY);
      if (dx >= -20 && dx <= reachX && dy <= reachY) {
        p.hitIds.add(e.id);
        damageEnemy(e, dmg, dir, knockback, launchToForeground || keys.down);
      }
    });
  }

  function launchEnemyOntoTracks(e, dir) {
    e.hp = Math.max(1, e.hp);
    e.state = "track_fall";
    e.stateT = 0.56;
    e.vx = dir * 135;
    e.vyTrack = Math.max(155, (534 - e.y) / 0.54);
    e.z = Math.max(22, e.z);
    e.vz = 285;
    const pan = Math.max(-0.8, Math.min(0.8, ((e.x - G.camX) - W * 0.5) / (W * 0.5)));
    SFX.trackFall(pan);
    if (!G.fgTrain && G.fgTrainCooldown > 0.85) {
      G.fgTrainCooldown = 0.85;
    }
  }

  function splatEnemyWithTrain(e) {
    e.hp = 0;
    e.state = "train_splat";
    e.splatPhase = "stuck";
    e.stateT = 0.74;
    e.vx = -620;
    e.vz = 110;
    e.z = 0;
    e.y = 538;
    G.trainSplats++;
    G.kills++;
    G.cashEarned += 30;
    G.hitStop = 0.052;
    G.shake = 0.22;
    const pan = Math.max(-0.8, Math.min(0.8, ((e.x - G.camX) - W * 0.5) / (W * 0.5)));
    SFX.trainSplat(pan);
    addVfx("vfx_hit", e.x, 488, 0.26);
    addPopup(e.x, 424, "SPLAT! +$30", "#f97316");
    const dropX = Math.max(G.camX + 64, Math.min(Math.min(STAIR_X0 - 60, G.camX + W - 64), e.x));
    spawnPickup((e.kind === "butcher" || Math.random() < 0.5) ? "wallet" : "clip", dropX, 412, true);
  }

  function damageEnemy(e, dmg, dir, knockback = 135, heavy = false) {
    if (e.state === "track_fall" || e.state === "track_daze" || e.state === "train_splat") return;
    const pan = Math.max(-0.8, Math.min(0.8, ((e.x - G.camX) - W * 0.5) / (W * 0.5)));
    const onLowerPlatform = !e.isBoss && e.x < STAIR_X0 - 44 && !G.climaxStarted;

    if (onLowerPlatform && keys.down) {
      e.y = Math.min(WALK_BOT, e.y + 26);
    }

    const shouldKnockOntoTracks = onLowerPlatform && (
      (heavy && e.y >= 360) ||
      (e.y >= 398 && (dmg >= 15 || e.hp - dmg <= 0))
    );

    if (shouldKnockOntoTracks) {
      SFX.hit(true, pan);
      addVfx("vfx_hit", e.x - dir * 12, e.y - 72 - e.z, 0.22);
      G.hitStop = 0.048;
      G.shake = 0.16;
      launchEnemyOntoTracks(e, dir);
      return;
    }

    e.hp -= dmg;
    e.state = "hit";
    e.stateT = heavy ? 0.42 : 0.26;
    e.vx = dir * (e.isBoss ? knockback * 0.45 : knockback);
    if (heavy && !e.isBoss && e.x < STAIR_X0) {
      e.vz = 215;
      e.z = Math.max(3, e.z);
      e.y = Math.min(WALK_BOT, e.y + 30);
    }
    SFX.hit(heavy, pan);
    addVfx("vfx_hit", e.x - dir * 12, e.y - 72 - e.z, 0.2);
    G.hitStop = heavy ? 0.048 : 0.024;
    if (heavy) G.shake = 0.16;

    if (e.hp <= 0) defeatEnemy(e, dir);
  }

  function defeatEnemy(e, dir) {
    e.hp = 0;
    e.state = "ko";
    e.stateT = 0.55;
    e.vx = dir * 230;
    e.vz = 225;
    e.z = Math.max(6, e.z);
    G.kills++;
    const pan = Math.max(-0.8, Math.min(0.8, ((e.x - G.camX) - W * 0.5) / (W * 0.5)));
    SFX.koGroan(e.isBoss, pan);

    if (e.isBoss) {
      G.bossDefeated = true;
      spawnPickup("wallet", e.x - 24, e.y, true);
      spawnPickup("clip", e.x + 26, e.y + 6, true);
      spawnPickup("wallet", e.x + 4, e.y - 9, true);
      spawnPickup("wallet", e.x - 8, e.y + 8, true);
      addBubble("bresaola", "UGH—ALL UNITS ON DA N-LINE, SWARM DIS BROAD!!", 3.2, e);
      setTimeout(() => { if (G.host && G.host.isActive()) triggerClimaxChaseSequence(); }, 1350);
    } else {
      const dropKind = (e.kind === "butcher" || Math.random() < 0.45) ? "wallet" : "clip";
      spawnPickup(dropKind, e.x, e.y, true);
    }
  }

  function triggerClimaxChaseSequence() {
    if (G.climaxStarted || G.phase !== "play") return;
    G.climaxStarted = true;
    G.zoneIdx = 4;
    G.lockMinX = 0;
    G.lockMaxX = MAX_CAM_X;
    G.goArrowTimer = 6.0;
    G.bgTrains = G.bgTrains.filter(tr => Math.abs(tr.x - 5095) > 520);
    spawnBackgroundTrain({ targetX: 5095, unloadKinds: [], jamDoor: true, isClimaxDepart: true });
    addBubble("gianna", "OPEN TRAIN DOOR AHEAD! GOTTA CATCH IT! ->", 3.0, G.player);

    for (let i = 0; i < 6; i++) {
      spawnEnemy(i % 2 === 0 ? "paulie" : "crew", G.camX - 55 - i * 72, 336 + (i % 4) * 24, {
        hp: 99, speed: 158 + (i % 3) * 10, chaser: true
      });
    }
  }

  function updateZoneProgression() {
    if (G.climaxStarted) return;
    const p = G.player;
    const alive = G.enemies.filter(e => e.hp > 0);
    const activeUnloads = G.bgTrains.some(t => t.unloadKinds.length > 0 && t.phase !== "departing");

    if (G.zoneSpawned && alive.length === 0 && !activeUnloads) {
      if (G.zoneIdx === 0) {
        G.zoneIdx = 1;
        G.zoneSpawned = false;
        G.lockMaxX = 2160;
        G.goArrowTimer = 4.0;
      } else if (G.zoneIdx === 1) {
        G.zoneIdx = 2;
        G.zoneSpawned = false;
        G.lockMaxX = 3480;
        G.goArrowTimer = 4.0;
      } else if (G.zoneIdx === 2) {
        G.zoneIdx = 3;
        G.zoneSpawned = false;
        G.lockMaxX = 4800;
        G.goArrowTimer = 4.5;
      }
    }

    if (!G.zoneSpawned) {
      if (G.zoneIdx === 1 && p.x >= 1560) {
        G.zoneSpawned = true;
        G.lockMinX = Math.floor(G.camX);
        const b1 = spawnEnemy("butcher", 2060, 368);
        spawnEnemy("crew", 2185, 414);
        spawnEnemy("butcher", 2320, 348);
        spawnEnemy("paulie", 2420, 392);
        spawnBackgroundTrain({ targetX: 1920 + 295, unloadKinds: ["paulie", "butcher", "crew"], jamDoor: true });
        addBubble("goon", "SLICE HER UP! MAKE ITALIAN COLD CUTS OUT OF HER!", 3.2, b1);
      } else if (G.zoneIdx === 2 && p.x >= 2880) {
        G.zoneSpawned = true;
        G.lockMinX = Math.floor(G.camX);
        const c1 = spawnEnemy("crew", 3420, 362);
        spawnEnemy("butcher", 3540, 412);
        spawnEnemy("paulie", 3650, 348);
        spawnEnemy("butcher", 3760, 396);
        spawnBackgroundTrain({ targetX: 2880 + 295, unloadKinds: ["crew", "butcher", "paulie", "crew"], jamDoor: true });
        addBubble("goon", "EY! FORGET WHAT STOP IT IS! STOP THIS PUNK!", 3.2, c1);
      } else if (G.zoneIdx === 3 && p.x >= 5050) {
        G.zoneSpawned = true;
        G.lockMinX = Math.floor(G.camX);
        G.lockMaxX = 4800;
        SFX.trainBell();
        spawnBackgroundTrain({
          targetX: 5095,
          startX: G.camX - 720,
          unloadKinds: ["bresaola", "crew", "butcher"],
          jamDoor: true,
          isBossTrain: true
        });
        addBubble("gianna", "HOLD UP... WHAT'S WAFTIN' OUT OF THE EXPRESS?!", 2.6, p);
      }
    }
  }

  function updateCamera(dt) {
    const p = G.player;
    if (!p) return;

    let wantX = G.camX;
    if (G.climaxStarted && p.x > TWO_STORY_X - 230) {
      const lead = p.x >= STAIR_X0 ? 124 : Math.round(440 - ((p.x - (TWO_STORY_X - 230)) / (STAIR_X0 - (TWO_STORY_X - 230))) * 316);
      wantX = Math.max(G.camX, Math.min(MAX_CAM_X, p.x - lead));
    } else if (p.x - G.camX > W * 0.52) {
      wantX = Math.min(G.lockMaxX, p.x - W * 0.52);
    } else if (p.x - G.camX < W * 0.26 && G.camX > G.lockMinX) {
      wantX = Math.max(G.lockMinX, p.x - W * 0.26);
    }
    G.camX += (wantX - G.camX) * Math.min(1, dt * 7.5);
    if (Math.abs(wantX - G.camX) < 0.4) G.camX = wantX;

    let targetCamY = 0;
    if (p.x > STAIR_X0 && G.camX >= TWO_STORY_X - 8) {
      const u = Math.max(0, Math.min(1, (p.x - STAIR_X0) / (STAIR_X1 - STAIR_X0)));
      const smooth = u * u * (3 - 2 * u);
      targetCamY = MAX_CAM_Y * smooth;
    }
    G.camY += (targetCamY - G.camY) * Math.min(1, dt * 9.0);
    if (Math.abs(targetCamY - G.camY) < 0.4) G.camY = targetCamY;
  }

  function hurtPlayer(dmg, pushDir) {
    const p = G.player;
    p.hp = Math.max(0, p.hp - dmg);
    p.invuln = 0.85;
    p.state = "hurt";
    p.stateT = 0.28;
    p.vx = pushDir * 165;
    G.shake = 0.16;
    SFX.hit(false, 0);
    if (p.hp <= 0) {
      p.hp = 65;
      G.cashEarned = Math.max(0, G.cashEarned - 20);
      addPopup(p.x, p.y - 124, "-$20", "#f97316");
      addBubble("gianna", "NOT DYIN' IN DITMARS. NO FRIGGIN' WAY!", 2.8, p);
    }
  }

  function finishStageWin() {
    if (G.phase === "tally") return;
    G.phase = "tally";
    BGM.stop();
    SFX.clearFanfare();
    if (!G.isReplay && !G.officialBankedDone) {
      G.officialBankedDone = true;
      G.lastBanked = G.cashEarned;
      if (G.host && G.host.addAccountCash && G.cashEarned > 0) {
        G.host.addAccountCash(G.cashEarned);
      }
    }
    syncHostHUD();
  }

  function update(dt) {
    G.time += dt;
    BGM.sync(false);
    if (G.phase === "intro") return;

    if (G.hitStop > 0) { G.hitStop -= dt; return; }
    if (G.shake > 0) G.shake = Math.max(0, G.shake - dt);
    if (G.goArrowTimer > 0) G.goArrowTimer = Math.max(0, G.goArrowTimer - dt);
    if (G.turnstileSpinTimer > 0) G.turnstileSpinTimer = Math.max(0, G.turnstileSpinTimer - dt);
    if (G.streetGateRattleTimer > 0) G.streetGateRattleTimer = Math.max(0, G.streetGateRattleTimer - dt);

    for (let i = G.bubbles.length - 1; i >= 0; i--) {
      G.bubbles[i].timer -= dt;
      if (G.bubbles[i].timer <= 0) G.bubbles.splice(i, 1);
    }
    if (G.bubbles.length === 0 && G.bubbleQueue.length > 0) {
      G.bubbles.push(G.bubbleQueue.shift());
    }
    for (let i = G.popups.length - 1; i >= 0; i--) {
      G.popups[i].t += dt; G.popups[i].y -= 32 * dt;
      if (G.popups[i].t >= G.popups[i].dur) G.popups.splice(i, 1);
    }
    for (let i = G.vfx.length - 1; i >= 0; i--) {
      G.vfx[i].t += dt;
      if (G.vfx[i].t >= G.vfx[i].dur) G.vfx.splice(i, 1);
    }

    if (G.phase === "booth_win") {
      G.boothLockTimer += dt;
      G.camX += (MAX_CAM_X - G.camX) * Math.min(1, dt * 8);
      G.camY += (MAX_CAM_Y - G.camY) * Math.min(1, dt * 8);
      G.enemies.forEach((e, idx) => {
        e.animT += dt * 8;
        const stopX = TURNSTILE_X - 58 - (idx % 3) * 24;
        if (e.x < stopX) {
          e.x += 175 * dt;
          e.dir = 1;
          const [minY, maxY] = walkBoundsAtX(e.x);
          if (e.x >= STAIR_X0 && e.x <= STAIR_X1) e.y = stairCenterY(e.x) + ((idx % 3) - 1) * 5;
          else e.y = Math.max(minY, Math.min(maxY, -63 + ((idx % 3) - 1) * 22));
        } else {
          e.dir = 1;
          e.state = ((G.time * 5 + idx) | 0) % 2 === 0 ? "atk" : "walk";
        }
      });
      if (G.boothLockTimer > 3.8) finishStageWin();
      return;
    }
    if (G.phase !== "play") return;

    const p = G.player;
    if (p.invuln > 0) p.invuln = Math.max(0, p.invuln - dt);
    if (p.comboWindow > 0) p.comboWindow = Math.max(0, p.comboWindow - dt);
    if (p.parryWindow > 0) p.parryWindow = Math.max(0, p.parryWindow - dt);

    if (!G.climaxStarted && G.zoneSpawned && G.bgTrains.length === 0) {
      G.bgTrainCooldown -= dt;
      if (G.bgTrainCooldown <= 0 && G.enemies.filter(e => e.hp > 0).length >= 1 && G.enemies.filter(e => e.hp > 0).length < 4) {
        G.bgTrainCooldown = 14.0;
        const bayBase = Math.min((NUM_LOWER_TILES - 1) * W, Math.floor((G.camX + 180) / 960) * 960) + 295;
        spawnBackgroundTrain({
          targetX: bayBase,
          unloadKinds: [G.zoneIdx === 0 ? "paulie" : "crew"],
          jamDoor: true
        });
      }
    }

    G.trashCans.forEach(tc => {
      if ((tc.z || 0) > 0 || (tc.vz || 0) !== 0) {
        tc.z = (tc.z || 0) + tc.vz * dt;
        tc.vz -= 920 * dt;
        if (tc.z <= 0) { tc.z = 0; tc.vz = 0; }
      }
    });

    for (let i = G.bgTrains.length - 1; i >= 0; i--) {
      const tr = G.bgTrains[i];
      if (tr.phase === "arriving") {
        tr.x += tr.vx * dt;
        tr.vx = Math.max(210, (tr.targetX - tr.x) * 3.1);
        if (tr.x >= tr.targetX - 4) {
          tr.x = tr.targetX; tr.vx = 0; tr.phase = "doors_open"; tr.timer = 0;
          SFX.shieldOpen();
          if (tr.isBossTrain) G.shake = 0.12;
        }
      } else if (tr.phase === "doors_open") {
        tr.doorOpen = Math.min(1, tr.doorOpen + dt * 2.5);
        if (tr.doorOpen >= 1) { tr.phase = "unloading"; tr.timer = 0.25; }
      } else if (tr.phase === "unloading") {
        tr.timer -= dt;
        if (tr.timer <= 0) {
          if (tr.unloadKinds.length > 0) {
            const k = tr.unloadKinds.shift();
            const spread = (k === "bresaola") ? 0 : ((tr.unloadKinds.length % 2 === 0 ? -14 : 14));
            const doorWorldX = tr.x + 202 + spread;
            const spawned = spawnEnemy(k, doorWorldX, WALK_TOP + 8, { enterFromTrain: true });
            if (k === "bresaola") {
              addBubble("bresaola", "END OF DA LINE, SWEETHEART!", 2.7, spawned);
              addBubble("gianna", "AH, STUFF IT IN CASING, YA MEAT HEAD!", 2.9, p, true);
            }
            tr.timer = 0.52;
          } else {
            tr.phase = "doors_close";
            if (tr.jamDoor) tr.jamZombieActive = true;
            SFX.doorSlam();
          }
        }
      } else if (tr.phase === "doors_close") {
        const minGap = tr.jamZombieActive ? 0.28 : 0;
        tr.doorOpen = Math.max(minGap, tr.doorOpen - dt * 2.8);
        if (tr.doorOpen <= minGap + 0.01) {
          tr.phase = "departing";
          tr.vx = 60;
          SFX.trainPass(false);
        }
      } else if (tr.phase === "climax_wait") {
        if (p.x >= tr.x + 150 && !G.departTrainMissed) {
          G.departTrainMissed = true;
          tr.phase = "climax_slam";
          tr.jamZombieActive = true;
          SFX.doorSlam();
          G.shake = 0.18;
          addBubble("gianna", "HEY—WAIT!! DAMMIT, UPSTAIRS TO DA BOOTH!", 3.5, p);
        }
      } else if (tr.phase === "climax_slam") {
        tr.doorOpen = Math.max(0.24, tr.doorOpen - dt * 5.2);
        if (tr.doorOpen <= 0.25) {
          tr.phase = "departing";
          tr.vx = 270;
          SFX.trainPass(false);
        }
      } else if (tr.phase === "departing") {
        tr.vx = Math.min(1080, tr.vx + 680 * dt);
        tr.x += tr.vx * dt;
        if (tr.x > G.camX + W + 780) G.bgTrains.splice(i, 1);
      }
    }

    if (G.camY > -100) {
      if (!G.fgTrain) {
        G.fgTrainCooldown -= dt;
        if (G.fgTrainCooldown <= 0 && !G.climaxStarted) {
          G.fgTrain = { phase: "warn", warnT: 1.45, x: G.camX + W + 240, vx: -1420 };
          SFX.trainBell();
        }
      } else {
        if (G.fgTrain.phase === "warn") {
          G.fgTrain.warnT -= dt;
          if (G.fgTrain.warnT <= 0.75 && G.fgTrain.warnT + dt > 0.75) SFX.trainBell();
          if (G.fgTrain.warnT <= 0) {
            G.fgTrain.phase = "pass";
            G.fgTrain.x = G.camX + W + 180;
            SFX.trainPass(true);
            G.shake = 0.12;
          }
        } else {
          G.fgTrain.x += G.fgTrain.vx * dt;
          G.enemies.forEach(e => {
            if (e.hp > 0 && !e.isBoss && e.x < STAIR_X0 && e.state !== "train_splat") {
              const onTracks = (e.state === "track_fall" || e.state === "track_daze" || e.y >= 432);
              if (onTracks && G.fgTrain.x <= e.x + 30 && (G.fgTrain.x + 1350) >= e.x - 40) {
                splatEnemyWithTrain(e);
              }
            }
          });
          if (G.fgTrain.x < G.camX - 1720) {
            G.fgTrain = null;
            const anyoneWaitingOnTracks = G.enemies.some(e => e.hp > 0 && (e.state === "track_fall" || e.state === "track_daze"));
            G.fgTrainCooldown = anyoneWaitingOnTracks ? 1.0 : (11.5 + Math.random() * 3.5);
          }
        }
      }
    }

    const inLockState = (p.state === "jab" || p.state === "kick" || p.state === "umb_wind" || p.state === "umb_hit" || p.state === "throw" || p.state === "hurt" || p.state === "sip");
    if (keys.shield && p.z <= 2 && !inLockState) {
      if (p.state !== "shield") {
        p.state = "shield";
        p.parryWindow = 0.34;
        SFX.shieldOpen();
      }
    } else if (p.state === "shield" && !keys.shield) {
      p.state = "idle";
    }

    if (p.stateT > 0) {
      p.stateT -= dt;
      if (p.state === "jab" && p.stateT > 0.05 && p.stateT < 0.13) {
        checkMeleeHitbox(p.x, p.y, p.dir, 84, 30, 12, 72, false);
      } else if (p.state === "kick" && p.stateT > 0.05 && p.stateT < 0.16) {
        checkMeleeHitbox(p.x, p.y, p.dir, 98, 34, 16, 112, false);
      } else if (p.state === "umb_wind" && p.stateT <= 0) {
        p.state = "umb_hit";
        p.stateT = 0.24;
        p.hitIds.clear();
      } else if (p.state === "umb_hit" && p.stateT > 0.06 && p.stateT < 0.21) {
        checkMeleeHitbox(p.x, p.y, p.dir, 126, 42, 28, 265, true);
      } else if (p.state === "jkick" && p.z > 3) {
        checkMeleeHitbox(p.x, p.y, p.dir, 118, 38, p.fromBenchLeap ? 32 : 22, 240, true);
      }
      if (p.stateT <= 0 && p.state !== "umb_hit" && p.z <= 2) p.state = "idle";
      else if (p.stateT <= 0 && p.state === "umb_hit") p.state = "idle";
    }

    let mx = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    let my = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
    if (mx === 0) p.sprinting = false;
    if (G.climaxStarted && mx > 0) p.sprinting = true;

    if (!inLockState && p.state !== "shield" && p.z <= 2) {
      const spd = p.sprinting ? 258 : 178;
      p.vx = mx * spd;
      p.vy = my * 132;
      if (mx !== 0) p.dir = mx > 0 ? 1 : -1;
      if (mx !== 0 || my !== 0) {
        p.state = "walk";
        p.animT += dt * (p.sprinting ? 10.5 : 7.8);
      } else if (p.state === "walk") {
        p.state = "idle";
      }
    } else if (p.z > 2) {
      if (mx !== 0 && p.state !== "jkick") {
        p.vx = mx * (p.fromBenchLeap ? 315 : 225);
        p.dir = mx > 0 ? 1 : -1;
      }
      p.vy = my * 105;
    } else {
      p.vx *= Math.exp(-10 * dt);
      p.vy = 0;
    }

    const prevX = p.x;
    p.x += p.vx * dt;

    if (p.x >= STAIR_X0 && p.x <= STAIR_X1) {
      const prevSpine = stairCenterY(Math.max(STAIR_X0, Math.min(STAIR_X1, prevX)));
      const newSpine = stairCenterY(p.x);
      if (prevX < STAIR_X0) {
        p.y += (newSpine - p.y) * Math.min(1, dt * 14);
      } else {
        p.y += (newSpine - prevSpine) + p.vy * 0.35 * dt;
      }
    } else {
      p.y += p.vy * dt;
      if (G.climaxStarted && p.x > TURNSTILE_X + 35 && mx > 0) {
        p.y += (BOOTH_DOOR_Y - p.y) * Math.min(1, dt * 6.0);
      }
    }

    const [minWalkY, maxWalkY] = walkBoundsAtX(p.x);
    p.y = Math.max(minWalkY, Math.min(maxWalkY, p.y));
    resolveColumnFootCollision(p);

    if (p.z > 0 || p.vz !== 0) {
      const prevZ = p.z;
      p.z += p.vz * dt;
      p.vz -= 1140 * dt;
      let landedBench = null;
      if (p.vz < 0 && prevZ >= 33 && p.z <= 36 && p.x < STAIR_X0) {
        for (const b of G.benches) {
          if (Math.abs(p.x - b.x) < b.w * 0.45 && Math.abs(p.y - b.y) < 26) {
            landedBench = b;
            break;
          }
        }
      }
      if (landedBench) {
        p.z = 36; p.vz = 0; p.onBench = landedBench; p.fromBenchLeap = false;
        if (p.state === "jump" || p.state === "jkick") p.state = "idle";
      } else if (p.z <= 0) {
        p.z = 0; p.vz = 0; p.onBench = null; p.fromBenchLeap = false;
        if (p.state === "jump" || p.state === "jkick") p.state = "idle";
      }
    } else if (p.onBench) {
      if (Math.abs(p.x - p.onBench.x) >= p.onBench.w * 0.47 || Math.abs(p.y - p.onBench.y) >= 30) {
        p.onBench = null; p.vz = 0;
      } else {
        p.z = 36;
      }
    }

    if (G.climaxStarted && !G.turnstilePassed && p.x >= TURNSTILE_X - 16) {
      G.turnstilePassed = true;
      G.turnstileSpinTimer = 0.65;
      let bestTs = G.turnstiles[1], bestD = 9999;
      G.turnstiles.forEach(ts => {
        const d = Math.abs(ts.y - p.y);
        if (d < bestD) { bestD = d; bestTs = ts; }
      });
      bestTs.spinning = true;
      SFX.turnstileClank();
    }
    if (G.turnstilePassed && p.x < TURNSTILE_X + 18) {
      p.x = TURNSTILE_X + 18;
    }

    if (G.climaxStarted && G.turnstilePassed && !G.streetGateChecked && p.x >= STREET_GATE_X - 24) {
      G.streetGateChecked = true;
      G.streetGateRattleTimer = 0.55;
      G.shake = 0.10;
      p.vx = -55;
      SFX.gateRattle();
      addBubble("gianna", "SHIT! GATE'S LOCKED!", 2.4, p);
    }

    if (G.climaxStarted && p.x >= BOOTH_DOOR_X) {
      p.x = TWO_STORY_X + 1168;
      p.y = TWO_STORY_Y + 225;
      p.z = 0;
      p.state = "phone";
      G.phase = "booth_win";
      G.boothLockTimer = 0;
      SFX.doorSlam();
      setTimeout(() => { if (G.host && G.host.isActive()) SFX.phoneRing(); }, 420);
      G.cashEarned += 75;
      addPopup(TWO_STORY_X + 1090, TWO_STORY_Y + 195, "+$75", "#4ade80");
      addBubble("gianna", "BEST I CAN DO! 'EY DE PALMA, PICK ME UP—DITMARS IS CRAWLIN' WIT GHOULS!'", 3.8, { x: TWO_STORY_X + 1168, y: TWO_STORY_Y + 235, z: 0 });
      syncHostHUD();
      return;
    }

    const maxAllowedX = G.climaxStarted ? (BOOTH_DOOR_X + 16) : Math.min(TWO_STORY_X - 48, G.lockMaxX + W - 64);
    const minAllowedX = Math.max(G.lockMinX + 36, G.camX + 36);
    p.x = Math.max(minAllowedX, Math.min(maxAllowedX, p.x));

    updateCamera(dt);

    for (let i = G.pickups.length - 1; i >= 0; i--) {
      const pk = G.pickups[i];
      pk.bob += dt * 5;
      if (pk.z > 0 || pk.vz !== 0) {
        pk.z += pk.vz * dt; pk.vz -= 780 * dt;
        if (pk.z <= 0) { pk.z = 0; pk.vz = 0; }
      }
      if (pk.z < 20 && Math.abs(pk.x - p.x) < 46 && Math.abs(pk.y - p.y) < 30) {
        if (pk.kind === "clip" || pk.kind === "wallet") {
          const val = pk.kind === "wallet" ? 25 : 15;
          G.cashEarned += val;
          G.lootPicked++;
          SFX.cash();
          addPopup(pk.x, pk.y - 40, `+$${val}`, "#4ade80");
          G.pickups.splice(i, 1);
        } else if (pk.kind === "papaya" && !p.heldItem && p.z <= 2 && (p.state === "idle" || p.state === "walk") && Math.abs(pk.x - p.x) < 32 && Math.abs(pk.y - p.y) < 22) {
          G.pickups.splice(i, 1);
          startPapayaSip(p);
        }
      }
    }

    for (let i = G.projectiles.length - 1; i >= 0; i--) {
      const pr = G.projectiles[i];
      pr.x += pr.vx * dt;
      pr.rot = (pr.rot || 0) + dt * 10;
      if (pr.x < G.camX - 120 || pr.x > G.camX + W + 120) {
        G.projectiles.splice(i, 1);
        continue;
      }
      if (!pr.fromPlayer) {
        if (Math.abs(pr.x - p.x) < 48 && Math.abs(pr.y - p.y) < 32 && p.z < 38) {
          const facingProj = (pr.vx < 0 && p.dir === 1) || (pr.vx > 0 && p.dir === -1);
          if (p.state === "shield" && facingProj) {
            pr.fromPlayer = true;
            pr.vx = -pr.vx * 1.95;
            pr.dmg = 40;
            G.deflects++;
            G.cashEarned += 15;
            SFX.deflect(((p.x - G.camX) - W * 0.5) / (W * 0.5));
            addVfx("vfx_deflect", p.x + p.dir * 38, p.y - 68, 0.25, p.dir < 0);
            addPopup(p.x, p.y - 124, "+$15", "#38bdf8");
            G.hitStop = 0.045;
            continue;
          } else if (p.invuln <= 0) {
            hurtPlayer(pr.dmg || 12, pr.vx > 0 ? 1 : -1);
            G.projectiles.splice(i, 1);
            continue;
          }
        }
      } else {
        let hitOne = false;
        for (const e of G.enemies) {
          if (e.hp > 0 && Math.abs(pr.x - e.x) < 50 && Math.abs(pr.y - e.y) < 36) {
            if (pr.kind === "papaya" || pr.kind === "empty_cup") SFX.papayaSplash(((e.x - G.camX) - W * 0.5) / (W * 0.5));
            damageEnemy(e, pr.dmg || 26, pr.vx >= 0 ? 1 : -1, 220, true);
            hitOne = true;
            break;
          }
        }
        if (hitOne) { G.projectiles.splice(i, 1); continue; }
      }
    }

    for (let i = G.enemies.length - 1; i >= 0; i--) {
      const e = G.enemies[i];
      if (e.state === "train_splat") {
        e.stateT -= dt;
        if (e.splatPhase === "stuck" && G.fgTrain && G.fgTrain.phase === "pass" && e.stateT > 0.44) {
          e.x = G.fgTrain.x + 42;
          e.y = 538;
          e.z = 0;
        } else {
          if (e.splatPhase === "stuck") {
            e.splatPhase = "peel";
            e.vz = 125;
          }
          e.x += e.vx * dt;
          e.vx *= Math.exp(-3.2 * dt);
          e.z += e.vz * dt;
          e.vz -= 880 * dt;
          if (e.z < 0) { e.z = 0; e.vz = 0; }
        }
        if (e.stateT <= 0 || e.x < G.camX - 240) G.enemies.splice(i, 1);
        continue;
      }
      if (e.state === "track_fall") {
        e.x += e.vx * dt;
        e.vx *= Math.exp(-3.5 * dt);
        e.y = Math.min(534, e.y + (e.vyTrack || 180) * dt);
        e.z += e.vz * dt;
        e.vz -= 980 * dt;
        if (e.z <= 0 && e.y >= 526) {
          e.z = 0;
          e.vz = 0;
          e.y = 534;
          e.dir = 1;
          e.state = "track_daze";
          e.stateT = 8.0;
        }
        continue;
      }
      if (e.state === "track_daze") {
        e.z = 0;
        e.y = 534;
        e.dir = 1;
        e.animT += dt * 8;
        if (!G.fgTrain && G.fgTrainCooldown > 0.75) G.fgTrainCooldown = 0.75;
        continue;
      }
      if (e.z > 0 || e.vz !== 0) {
        e.z += e.vz * dt; e.vz -= 960 * dt;
        if (e.z <= 0) { e.z = 0; e.vz = 0; }
      }
      if (e.state === "ko") {
        e.x += e.vx * dt; e.vx *= Math.exp(-4 * dt);
        e.stateT -= dt;
        if (e.stateT <= 0) G.enemies.splice(i, 1);
        continue;
      }
      if (e.state === "train_exit") {
        e.y += 96 * dt; e.animT += dt * 7;
        e.stateT -= dt;
        if (e.stateT <= 0) e.state = "walk";
        continue;
      }
      if (e.state === "hit") {
        e.x += e.vx * dt; e.vx *= Math.exp(-7 * dt);
        e.stateT -= dt;
        if (e.stateT <= 0) e.state = "walk";
        continue;
      }
      if (e.atkCd > 0) e.atkCd -= dt;
      if (e.throwCd > 0) e.throwCd -= dt;

      const dx = p.x - e.x, dy = p.y - e.y;
      e.dir = dx >= 0 ? 1 : -1;

      if (G.turnstilePassed && e.x >= TURNSTILE_X - 54) {
        e.x = TURNSTILE_X - 54;
        e.animT += dt * 8;
        continue;
      }

      if (e.state === "wind") {
        e.stateT -= dt;
        if (e.stateT <= 0) {
          e.state = "throw"; e.stateT = 0.28;
          const isBres = e.isBoss || Math.random() < 0.55;
          SFX.swing(true);
          G.projectiles.push({
            fromPlayer: false,
            kind: isBres ? "bresaola" : "cleaver",
            sprite: isBres ? "proj_bresaola" : "proj_cleaver",
            x: e.x + e.dir * 42,
            y: e.y,
            z: 66,
            vx: e.dir * (e.isBoss ? 355 : 300),
            dmg: e.isBoss ? 15 : 11,
            rot: 0
          });
        }
        continue;
      }
      if (e.state === "throw" || e.state === "atk") {
        e.stateT -= dt;
        if (e.state === "atk" && e.stateT > 0.08 && e.stateT < 0.18 && !e._struck) {
          if (Math.abs(dx) < (e.isBoss ? 102 : 78) && Math.abs(dy) < 30 && p.z < 26) {
            e._struck = true;
            const blocked = p.state === "shield" && ((e.dir === -1 && p.dir === 1) || (e.dir === 1 && p.dir === -1));
            if (blocked) {
              SFX.shieldOpen();
              addVfx("vfx_deflect", p.x + p.dir * 32, p.y - 66, 0.16, p.dir < 0);
              p.vx = e.dir * 95;
            } else if (p.invuln <= 0) {
              hurtPlayer(e.dmg, e.dir);
            }
          }
        }
        if (e.stateT <= 0) e.state = "walk";
        continue;
      }

      if ((e.kind === "butcher" || e.isBoss) && e.throwCd <= 0 && Math.abs(dx) > 185 && Math.abs(dx) < 495 && Math.abs(dy) < 44) {
        e.state = "wind";
        e.stateT = 0.36;
        e.throwCd = e.isBoss ? 2.4 : 3.2;
        continue;
      }

      const atkRange = e.isBoss ? 86 : 66;
      if (Math.abs(dx) < atkRange && Math.abs(dy) < 24 && e.atkCd <= 0) {
        e.state = "atk";
        e._struck = false;
        e.stateT = e.isBoss ? 0.36 : 0.30;
        e.atkCd = e.isBoss ? 0.85 : 1.15;
        SFX.swing(e.isBoss);
        continue;
      }

      const prevEX = e.x;
      const wantX = p.x - e.dir * (atkRange - 12);
      e.x += Math.sign(wantX - e.x) * e.speed * dt;
      if (e.x >= STAIR_X0 && e.x <= STAIR_X1) {
        const prevSp = stairCenterY(Math.max(STAIR_X0, Math.min(STAIR_X1, prevEX)));
        e.y += (stairCenterY(e.x) - prevSp);
      } else {
        e.y += Math.sign(dy) * (e.speed * 0.68) * dt;
      }
      const [eMinY, eMaxY] = walkBoundsAtX(e.x);
      e.y = Math.max(eMinY, Math.min(eMaxY, e.y));
      resolveColumnFootCollision(e);
      e.animT += dt * 6.0;
    }

    updateZoneProgression();
    syncHostHUD();
  }

  // =========================================================================
  // RAZOR-SHARP 960x540 -> 1920x1080 NEAREST-NEIGHBOR 4-PLANE MULTIPLANE ENGINE
  // =========================================================================
  const offCvs = document.createElement("canvas");
  offCvs.width = W;
  offCvs.height = H;
  const ctx = offCvs.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  const textStampCache = new Map();
  let fontsReady = false;
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { fontsReady = true; textStampCache.clear(); });
  }

  function hexToRgb(hex) {
    const n = parseInt(hex.replace("#", ""), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function getCrispTextStamp(txt, size, fillHex, outlineHex) {
    const key = `${txt}|${size}|${fillHex}|${outlineHex}`;
    if (fontsReady && textStampCache.has(key)) return textStampCache.get(key);

    const sc = document.createElement("canvas");
    const sctx = sc.getContext("2d", { willReadFrequently: true });
    sctx.font = `${size}px "Press Start 2P", monospace`;
    const mw = Math.max(4, Math.ceil(sctx.measureText(txt).width) + 6);
    const mh = size + 6;
    sc.width = mw;
    sc.height = mh;
    sctx.imageSmoothingEnabled = false;
    sctx.font = `${size}px "Press Start 2P", monospace`;
    sctx.textBaseline = "top";
    sctx.fillStyle = "#ffffff";
    sctx.fillText(txt, 2, 2);

    try {
      const id = sctx.getImageData(0, 0, mw, mh);
      const d = id.data;
      const mask = new Uint8Array(mw * mh);
      for (let i = 0; i < mw * mh; i++) mask[i] = d[i * 4 + 3] >= 110 ? 1 : 0;
      const [fr, fg, fb] = hexToRgb(fillHex);
      const [or, og, ob] = hexToRgb(outlineHex);
      for (let y = 0; y < mh; y++) {
        for (let x = 0; x < mw; x++) {
          const i = y * mw + x, p = i * 4;
          if (mask[i]) {
            d[p] = fr; d[p + 1] = fg; d[p + 2] = fb; d[p + 3] = 255;
          } else {
            const adj = (x > 0 && mask[i - 1]) || (x < mw - 1 && mask[i + 1]) ||
                        (y > 0 && mask[i - mw]) || (y < mh - 1 && mask[i + mw]) ||
                        (x > 0 && y > 0 && mask[i - mw - 1]);
            if (adj) {
              d[p] = or; d[p + 1] = og; d[p + 2] = ob; d[p + 3] = 255;
            } else {
              d[p] = d[p + 1] = d[p + 2] = d[p + 3] = 0;
            }
          }
        }
      }
      sctx.putImageData(id, 0, 0);
    } catch (e) {}

    if (fontsReady) {
      if (textStampCache.size > 260) textStampCache.clear();
      textStampCache.set(key, sc);
    }
    return sc;
  }

  function drawPixelText(txt, x, y, size, fill, outline = "#090d16", align = "left") {
    if (!txt) return;
    const stamp = getCrispTextStamp(String(txt), size, fill, outline);
    let dx = Math.round(x) - 2;
    if (align === "center") dx = Math.round(x - stamp.width * 0.5);
    else if (align === "right") dx = Math.round(x - stamp.width + 2);
    ctx.drawImage(stamp, dx, Math.round(y) - 2);
  }

  function drawSprite(name, x, y, flip = false, scale = 1, quarterTurns = 0) {
    if (!IMG.atlas._ready) return;
    const f = S2_FRAMES[name];
    if (!f) return;
    const [sx, sy, sw, sh, ax, ay] = f;
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.translate(Math.round(x), Math.round(y));
    if (quarterTurns) ctx.rotate((quarterTurns & 3) * (Math.PI * 0.5));
    if (flip) ctx.scale(-1, 1);
    if (scale !== 1) {
      const dw = Math.round(sw * scale), dh = Math.round(sh * scale);
      ctx.drawImage(IMG.atlas, sx, sy, sw, sh, -Math.round(ax * scale), -Math.round(ay * scale), dw, dh);
    } else {
      ctx.drawImage(IMG.atlas, sx, sy, sw, sh, -ax, -ay, sw, sh);
    }
    ctx.restore();
  }

  function drawTrainUnit(screenX, screenY, doorOpenFrac, jamZombie, scale = 1) {
    if (!IMG.atlas._ready) return;
    const carF = S2_FRAMES.train_car;
    const dlF = S2_FRAMES.train_door_l, drF = S2_FRAMES.train_door_r;
    const cw = Math.round(carF[2] * scale), ch = Math.round(carF[3] * scale);
    const x0 = Math.round(screenX), y0 = Math.round(screenY - ch);

    ctx.fillStyle = "#1c140d";
    ctx.fillRect(x0 + Math.round(162 * scale), y0 + Math.round(30 * scale), Math.round(72 * scale), Math.round(110 * scale));
    ctx.fillRect(x0 + Math.round(446 * scale), y0 + Math.round(30 * scale), Math.round(72 * scale), Math.round(110 * scale));
    ctx.fillStyle = "#45230e";
    ctx.fillRect(x0 + Math.round(168 * scale), y0 + Math.round(36 * scale), Math.round(60 * scale), Math.round(28 * scale));
    ctx.fillRect(x0 + Math.round(452 * scale), y0 + Math.round(36 * scale), Math.round(60 * scale), Math.round(28 * scale));

    const slidePx = Math.round(doorOpenFrac * 28 * scale);
    [171, 457].forEach((dOff, idx) => {
      const dx = x0 + Math.round(dOff * scale);
      const dy = y0 + Math.round(32 * scale);
      const dw = Math.round(33 * scale), dh = Math.round(108 * scale);
      ctx.drawImage(IMG.atlas, dlF[0], dlF[1], dlF[2], dlF[3], dx - slidePx, dy, dw, dh);
      ctx.drawImage(IMG.atlas, drF[0], drF[1], drF[2], drF[3], dx + dw + slidePx, dy, dw, dh);

      if (jamZombie && idx === 0) {
        const wig = Math.round(Math.sin(G.time * 24) * 3);
        drawSprite("door_jam", dx + dw + wig, dy + dh - 6, false, scale);
      }
    });

    ctx.drawImage(IMG.atlas, carF[0], carF[1], carF[2], carF[3], x0, y0, cw, ch);

    if (Math.abs(doorOpenFrac) < 0.4) {
      const spk = ((G.time * 18) | 0) % 3;
      ctx.fillStyle = spk === 0 ? "#fef08a" : "#f97316";
      ctx.fillRect(x0 + Math.round(102 * scale) - spk * 6, y0 + ch - 6, 8, 4);
      ctx.fillRect(x0 + Math.round(542 * scale) - spk * 8, y0 + ch - 5, 9, 4);
    }
  }

  function wrapBubbleLines(text, maxChars = 25) {
    const words = text.split(" ");
    const lines = [];
    let cur = "";
    for (const w of words) {
      if ((cur + " " + w).trim().length > maxChars && cur) {
        lines.push(cur);
        cur = w;
      } else {
        cur = (cur ? cur + " " : "") + w;
      }
    }
    if (cur) lines.push(cur);
    return lines.slice(0, 3);
  }

  function drawTMNTSpeechBubbles() {
    G.bubbles.forEach((b, idx) => {
      let ax = W * 0.5, ay = 138;
      if (b.entity) {
        ax = Math.round(b.entity.x - G.camX);
        ay = Math.round(b.entity.y - G.camY - (b.entity.z || 0) - (b.entity.isBoss ? 176 : 144));
      }
      const lines = wrapBubbleLines(b.text, 25);
      const fontSize = 10;
      let maxW = 120;
      lines.forEach(l => {
        const st = getCrispTextStamp(l, fontSize, "#0f172a", "#ffffff");
        if (st.width > maxW) maxW = st.width;
      });
      const bw = maxW + 24;
      const bh = lines.length * 17 + 16;
      const bx = Math.max(12, Math.min(W - bw - 12, Math.round(ax - bw * 0.5)));
      const by = Math.max(70, Math.min(285, ay - bh - 12 - idx * 8));
      const tailX = Math.max(bx + 18, Math.min(bx + bw - 18, ax));

      const isG = b.who === "gianna";
      const bgCol = isG ? "#fefce8" : "#fff1f2";
      const borderCol = "#090d16";

      ctx.fillStyle = borderCol;
      ctx.fillRect(bx - 3, by, bw + 6, bh);
      ctx.fillRect(bx, by - 3, bw, bh + 6);
      ctx.fillStyle = bgCol;
      ctx.fillRect(bx, by, bw, bh);

      ctx.fillStyle = isG ? "#fde047" : "#fecdd3";
      ctx.fillRect(bx + 3, by + 3, bw - 6, 3);

      ctx.fillStyle = borderCol;
      ctx.fillRect(tailX - 6, by + bh, 12, 6);
      ctx.fillRect(tailX - 3, by + bh + 6, 7, 6);
      ctx.fillStyle = bgCol;
      ctx.fillRect(tailX - 3, by + bh - 2, 6, 6);
      ctx.fillRect(tailX - 1, by + bh + 4, 3, 5);

      lines.forEach((ln, li) => {
        drawPixelText(ln, bx + Math.floor(bw / 2), by + 10 + li * 17, fontSize, "#0f172a", "#ffffff", "center");
      });
    });
  }

  function drawHUD() {
    const p = G.player;
    if (!p) return;

    ctx.fillStyle = "#090d16";
    ctx.fillRect(12, 9, 64, 64);
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(14, 11, 60, 60);
    if (IMG.atlas._ready) {
      const gf = S2_FRAMES.hud_gianna;
      ctx.drawImage(IMG.atlas, gf[0], gf[1], gf[2], Math.min(60, gf[3]), 14, 11, gf[2], Math.min(60, gf[3]));
    }
    drawPixelText("GIANNA", 84, 12, 13, "#f8fafc", "#090d16", "left");

    ctx.fillStyle = "#090d16";
    ctx.fillRect(83, 31, 202, 19);
    ctx.fillStyle = "#334155";
    ctx.fillRect(86, 34, 196, 13);
    const hpW = Math.round(196 * (p.hp / p.maxHp));
    ctx.fillStyle = p.hp > 35 ? "#facc15" : "#ef4444";
    ctx.fillRect(86, 34, hpW, 13);
    ctx.fillStyle = "#fef08a";
    if (hpW > 3) ctx.fillRect(86, 34, hpW, 3);

    const itemLabel = (p.heldItem === "empty_cup" || p.heldItem === "papaya") ? " • HELD: EMPTY CUP" : (p.heldItem === "rat" ? " • HELD: DEAD RAT" : "");
    drawPixelText(`LOOT: $${G.cashEarned}${itemLabel}`, 84, 55, 10, "#4ade80", "#090d16", "left");

    const boss = G.enemies.find(e => e.isBoss && e.hp > 0);
    const targetEnemy = boss || G.enemies.find(e => e.hp > 0 && !e.chaser);
    if (targetEnemy) {
      const hasPortrait = !!boss;
      const rightEdge = hasPortrait ? W - 82 : W - 18;
      if (hasPortrait) {
        ctx.fillStyle = "#090d16";
        ctx.fillRect(W - 76, 9, 64, 64);
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(W - 74, 11, 60, 60);
        if (IMG.atlas._ready) {
          const bf = S2_FRAMES.hud_bresaola;
          ctx.drawImage(IMG.atlas, bf[0], bf[1], bf[2], bf[3], W - 74, 11, 60, 60);
        }
      }
      drawPixelText(targetEnemy.name, rightEdge, 12, 12, boss ? "#fca5a5" : "#e2e8f0", "#090d16", "right");
      const barW = boss ? 252 : 178;
      ctx.fillStyle = "#090d16";
      ctx.fillRect(rightEdge - barW - 3, 31, barW + 6, 18);
      ctx.fillStyle = "#334155";
      ctx.fillRect(rightEdge - barW, 34, barW, 12);
      const ew = Math.max(0, Math.round(barW * (targetEnemy.hp / targetEnemy.maxHp)));
      ctx.fillStyle = "#dc2626";
      ctx.fillRect(rightEdge - ew, 34, ew, 12);
      ctx.fillStyle = "#f87171";
      if (ew > 3) ctx.fillRect(rightEdge - ew, 34, ew, 3);

      const crewCnt = G.enemies.filter(e => e.hp > 0 && !e.isBoss).length;
      if (crewCnt > 0) {
        drawPixelText(`THE GABAGHOULS x${crewCnt}`, rightEdge, 55, 10, "#fbbf24", "#090d16", "right");
      }
    }

    if (G.phase === "play" && (!G.zoneSpawned || G.goArrowTimer > 0 || G.climaxStarted) && ((G.time * 5) | 0) % 2 === 0) {
      let msg = "ADVANCE! ->";
      if (G.climaxStarted) {
        if (!G.departTrainMissed) msg = "CATCH OPEN TRAIN! ->";
        else if (!G.turnstilePassed) msg = "UP STAIRS -> TURNSTILE!";
        else if (!G.streetGateChecked) msg = "TRY STREET EXIT GATE! ->";
        else msg = "GATE LOCKED -> TOKEN BOOTH!";
      }
      drawPixelText(msg, W * 0.5, 18, 11, "#facc15", "#090d16", "center");
    }
  }

  function drawMultiplaneBackground() {
    ctx.fillStyle = "#080e12";
    ctx.fillRect(0, 0, W, H);

    if (IMG.bg._ready) {
      const bayW = 248, bayH = 192;
      const farOffX = ((Math.floor(G.camX * 0.35) % bayW) + bayW) % bayW;
      const farOffY = Math.round(-G.camY * 0.35);
      for (let by = -bayH + (farOffY % bayH); by < H + bayH; by += bayH) {
        for (let bx = -farOffX; bx < W + bayW; bx += bayW) {
          ctx.drawImage(IMG.bg, 378, 114, bayW, bayH, Math.round(bx), Math.round(by), bayW, bayH);
        }
      }
    }

    const midSpanX = 296, midSpanY = 220;
    const midOffX = ((Math.floor(G.camX * 0.65) % midSpanX) + midSpanX) % midSpanX;
    const midOffY = Math.round(-G.camY * 0.65);
    for (let gx = -midOffX; gx < W + midSpanX; gx += midSpanX) {
      const ix = Math.round(gx);
      ctx.fillStyle = "#0e1d1c";
      ctx.fillRect(ix, 0, 24, H);
      ctx.fillStyle = "#19322e";
      ctx.fillRect(ix + 4, 0, 5, H);
    }
    for (let gy = -midSpanY + (midOffY % midSpanY); gy < H + midSpanY; gy += midSpanY) {
      const iy = Math.round(gy);
      ctx.fillStyle = "#0b1616";
      ctx.fillRect(0, iy, W, 18);
      ctx.fillStyle = "#1c3833";
      ctx.fillRect(0, iy + 2, W, 3);
      for (let lx = -midOffX + 128; lx < W; lx += midSpanX) {
        ctx.fillStyle = "#f59e0b";
        ctx.fillRect(Math.round(lx), iy + 19, 36, 3);
      }
    }
  }

  function drawMainStationPlane() {
    const camX = Math.round(G.camX), camY = Math.round(G.camY);

    G.bgTrains.forEach(tr => {
      const sx = tr.x - camX, sy = tr.y - camY;
      if (sx > -780 && sx < W + 180 && sy > -40 && sy < H + 240) {
        drawTrainUnit(sx, sy, tr.doorOpen, tr.jamZombieActive, 1.0);
      }
    });

    const maskImg = IMG.mask._ready ? IMG.mask : IMG.bg;
    if (maskImg._ready && camX < TWO_STORY_X) {
      const startTile = Math.max(0, Math.floor(camX / W));
      const endTile = Math.min(NUM_LOWER_TILES - 1, startTile + 1);
      for (let t = startTile; t <= endTile; t++) {
        const tx = t * W - camX;
        if (tx < W && tx + W > 0) {
          ctx.drawImage(maskImg, tx, 0 - camY, W, H);
        }
      }
      for (let t = Math.max(1, startTile); t <= endTile + 1; t++) {
        if (t >= NUM_LOWER_TILES) continue;
        const seamX = t * W - camX - 27;
        ctx.drawImage(maskImg, 285, 66, 54, 283, seamX, 66 - camY, 54, 283);
      }
    }

    const tsScreenX = TWO_STORY_X - camX;
    const tsScreenY = TWO_STORY_Y - camY;
    if (IMG.twoStoryMask._ready && tsScreenX < W) {
      ctx.drawImage(IMG.twoStoryMask, tsScreenX, tsScreenY, TWO_STORY_W, TWO_STORY_H);

      if (IMG.atlas._ready) {
        const rattleX = G.streetGateRattleTimer > 0 ? Math.round(Math.sin(G.time * 58) * 3) : 0;
        drawSprite("street_gate_locked", (STREET_GATE_X - camX) + rattleX, STREET_GATE_Y - camY, false, 1);
      }

      if (maskImg._ready && tsScreenX > -60 && tsScreenX < W) {
        for (let wy = -420; wy < 140; wy += 200) {
          ctx.drawImage(maskImg, 285, 70, 54, 200, tsScreenX - 27, wy - camY, 54, 200);
        }
        ctx.drawImage(maskImg, 285, 66, 54, 283, tsScreenX - 27, 66 - camY, 54, 283);
      }

      if (G.phase === "booth_win" && IMG.atlas._ready) {
        const winX = tsScreenX + 1119, winY = tsScreenY + 130, winW = 98, winH = 102;
        ctx.save();
        ctx.beginPath();
        ctx.rect(winX, winY, winW, winH);
        ctx.clip();
        ctx.fillStyle = "#0c1c1b";
        ctx.fillRect(winX, winY, winW, winH);
        drawSprite("g_phone", winX + 50, winY + 146, true, 1);
        ctx.fillStyle = "rgba(153, 246, 228, 0.16)";
        ctx.fillRect(winX + 8, winY + 6, 12, winH - 12);
        ctx.fillRect(winX + 24, winY + 6, 4, winH - 12);
        const gx = winX + 54, gy = winY + 70;
        for (let dy = -9; dy <= 9; dy++) {
          for (let dx = -9; dx <= 9; dx++) {
            const d2 = dx * dx + dy * dy;
            if (d2 <= 84) {
              if (d2 >= 60) ctx.fillStyle = "#6e521d";
              else if ((Math.abs(dx) % 3 === 0) && (Math.abs(dy) % 3 === 0) && d2 < 46) ctx.fillStyle = "#1c1508";
              else ctx.fillStyle = "#b48a3e";
              ctx.fillRect(gx + dx, gy + dy, 1, 1);
            }
          }
        }
        ctx.restore();
        drawPixelText("LOCKED!", winX + 49, winY + winH + 10, 9, "#fde047", "#090d16", "center");
      }
    }

    if (((G.time * 9) | 0) % 17 === 0 && (88 - camY) < H && camX < TWO_STORY_X) {
      ctx.fillStyle = "rgba(94, 234, 212, 0.06)";
      ctx.fillRect(64, 86 - camY, 176, 18);
      ctx.fillRect(738, 86 - camY, 168, 18);
    }
  }

  function drawForegroundMultiplane() {
    if (!IMG.atlas._ready) return;

    const fgColWorldXs = [680, 1840, 3040, 4240, 5820, 6140];
    const ibF = S2_FRAMES.fg_ibeam;
    fgColWorldXs.forEach(wx => {
      const mpx = Math.round(W * 0.5 + (wx - (G.camX + W * 0.5)) * 1.30);
      if (mpx < -50 || mpx > W + 50) return;
      const offY = ((Math.round(-G.camY * 1.30) % ibF[3]) + ibF[3]) % ibF[3];
      ctx.save();
      ctx.globalAlpha = 0.92;
      for (let y = -ibF[3] + offY; y < H + ibF[3]; y += ibF[3] - 2) {
        ctx.drawImage(IMG.atlas, ibF[0], ibF[1], ibF[2], ibF[3], mpx - ibF[4], y, ibF[2], ibF[3]);
      }
      ctx.restore();
    });

    const fgSigns = [
      { wx: 1520, wy: 76 },
      { wx: 3680, wy: 76 },
      { wx: TWO_STORY_X + 295, wy: -125 },
      { wx: TWO_STORY_X + 680, wy: -362 }
    ];
    fgSigns.forEach(sg => {
      const mpx = Math.round(W * 0.5 + (sg.wx - (G.camX + W * 0.5)) * 1.30);
      const mpy = Math.round(H * 0.5 + (sg.wy - (G.camY + H * 0.5)) * 1.30);
      if (mpx > -140 && mpx < W + 140 && mpy > -20 && mpy < H + 90) {
        drawSprite("fg_sign", mpx, mpy, false, 1);
      }
    });
  }

  function renderToDisplay(dispCtx) {
    const dispCvs = dispCtx.canvas;
    if (dispCvs.width !== 1920 || dispCvs.height !== 1080) {
      dispCvs.width = 1920;
      dispCvs.height = 1080;
    }
    dispCtx.imageSmoothingEnabled = false;

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (G.shake > 0) {
      ctx.translate(Math.round((Math.random() - 0.5) * 8), Math.round((Math.random() - 0.5) * 7));
    }

    if (G.phase === "intro") {
      ctx.fillStyle = "#070a10";
      ctx.fillRect(0, 0, W, H);
      if (IMG.intro._ready) {
        ctx.drawImage(IMG.intro, 0, 0, W, H);
      }
      ctx.fillStyle = "rgba(7, 10, 16, 0.82)";
      ctx.fillRect(0, H - 54, W, 54);
      if (((G.time * 2.5) | 0) % 2 === 0) {
        drawPixelText("PRESS [ENTER / SPACE] OR CLICK TO FIGHT!   [ESC] SKIP", W / 2, H - 34, 11, "#facc15", "#090d16", "center");
      }
      ctx.restore();
      dispCtx.drawImage(offCvs, 0, 0, dispCvs.width, dispCvs.height);
      return;
    }

    const camX = Math.round(G.camX), camY = Math.round(G.camY);

    drawMultiplaneBackground();
    drawMainStationPlane();

    const drawList = [];

    const maskImg = IMG.mask._ready ? IMG.mask : IMG.bg;
    if (maskImg._ready && camX < TWO_STORY_X + 60) {
      const startTile = Math.max(0, Math.floor((camX - 60) / W));
      const endTile = Math.min(NUM_LOWER_TILES - 1, Math.floor((camX + W + 60) / W));
      for (let t = startTile; t <= endTile; t++) {
        [285, 632].forEach(lx => {
          const sx = t * W + lx - camX;
          if (sx > -60 && sx < W + 10) {
            drawList.push({
              y: 348,
              draw: () => ctx.drawImage(maskImg, lx, 66, 54, 283, sx, 66 - camY, 54, 283)
            });
          }
        });
        if (t >= 1) {
          const seamSx = t * W - 27 - camX;
          if (seamSx > -60 && seamSx < W + 10) {
            drawList.push({
              y: 348,
              draw: () => ctx.drawImage(maskImg, 285, 66, 54, 283, seamSx, 66 - camY, 54, 283)
            });
          }
        }
      }
      const boundSx = TWO_STORY_X - 27 - camX;
      if (boundSx > -60 && boundSx < W + 10) {
        drawList.push({
          y: 348,
          draw: () => ctx.drawImage(maskImg, 285, 66, 54, 283, boundSx, 66 - camY, 54, 283)
        });
      }
    }
    if (IMG.twoStoryMask._ready && (TWO_STORY_X - camX) < W) {
      const tsSx = TWO_STORY_X - camX, tsSy = TWO_STORY_Y - camY;
      [282, 622, 960].forEach(lx => {
        const sx = tsSx + lx;
        if (sx > -60 && sx < W + 10) {
          drawList.push({
            y: 342,
            draw: () => ctx.drawImage(IMG.twoStoryMask, lx, 468, 54, 294, sx, tsSy + 468, 54, 294)
          });
        }
      });
    }

    G.benches.forEach(b => {
      if (b.x - camX > -180 && b.x - camX < W + 180) {
        drawList.push({
          y: b.y,
          draw: () => {
            const sx = Math.round(b.x - camX), sy = Math.round(b.y - camY);
            ctx.fillStyle = "rgba(9, 13, 22, 0.56)";
            ctx.fillRect(sx - 97, sy - 5, 194, 9);
            drawSprite("bench", sx, sy, false, 1);
          }
        });
      }
    });
    G.trashCans.forEach(tc => {
      if (tc.x - camX > -120 && tc.x - camX < W + 120) {
        drawList.push({
          y: tc.y,
          draw: () => {
            const sx = Math.round(tc.x - camX);
            const groundSy = Math.round(tc.y - camY);
            const sy = Math.round(groundSy - (tc.z || 0));
            ctx.fillStyle = "rgba(9, 13, 22, 0.62)";
            if (tc.smashed) {
              ctx.fillRect(sx - 46, groundSy - 5, 94, 9);
              drawSprite("trash_smashed", sx, sy + 3, false, 1);
            } else {
              ctx.fillRect(sx - 27, groundSy - 5, 54, 8);
              drawSprite("trash_intact", sx, sy, false, 1);
            }
          }
        });
      }
    });

    G.turnstiles.forEach(ts => {
      if (ts.x - camX > -140 && ts.x - camX < W + 140) {
        drawList.push({
          y: ts.y,
          draw: () => {
            const sx = Math.round(ts.x - camX), sy = Math.round(ts.y - camY);
            const sc = ts.scale || 1;
            ctx.fillStyle = "rgba(9, 13, 22, 0.45)";
            ctx.fillRect(sx - Math.round(4 * sc), sy - 2, Math.round(66 * sc), 4);
            const useSpin = ts.spinning && (G.turnstileSpinTimer > 0.15 || G.turnstilePassed);
            drawSprite(useSpin ? "turnstile_spin" : "turnstile_idle", sx, sy, false, sc);
          }
        });
      }
    });

    G.pickups.forEach(pk => {
      const spMap = { clip: "loot_clip", wallet: "loot_wallet", papaya: "item_papaya", rat: "rat_ground" };
      drawList.push({
        y: pk.y,
        draw: () => {
          const sx = Math.round(pk.x - camX);
          const bobOff = (pk.kind === "rat" && pk.z <= 0) ? 0 : Math.abs(Math.sin(pk.bob)) * 4;
          const sy = Math.round(pk.y - camY - pk.z - bobOff);
          ctx.fillStyle = "rgba(9, 13, 22, 0.55)";
          const shW = pk.kind === "rat" ? 48 : 28;
          ctx.fillRect(sx - (shW >> 1), Math.round(pk.y - camY) - 4, shW, 6);
          drawSprite(spMap[pk.kind] || "loot_clip", sx, sy, false, 1);
        }
      });
    });

    G.enemies.forEach(e => {
      if (e.state === "train_splat") return;
      drawList.push({
        y: e.y,
        draw: () => {
          const jitterX = (e.state === "track_daze" && G.fgTrain && G.fgTrain.phase === "warn") ? Math.round(Math.sin(G.time * 36) * 2) : 0;
          const sx = Math.round(e.x - camX) + jitterX, sy = Math.round(e.y - camY - e.z);
          if (sx < -160 || sx > W + 160 || sy < -80 || sy > H + 200) return;
          ctx.fillStyle = "rgba(9, 13, 22, 0.58)";
          ctx.fillRect(sx - (e.isBoss ? 32 : 26), Math.round(e.y - camY) - 4, e.isBoss ? 64 : 52, 7);
          let sp = "p_walk_0";
          let flip = e.dir < 0;
          if (e.kind === "paulie") {
            if (e.state === "track_fall") { sp = "p_fall"; flip = e.vx > 0; }
            else if (e.state === "track_daze") { sp = "p_daze"; flip = false; }
            else if (e.state === "hit" || e.state === "ko") sp = "p_hit";
            else if (e.state === "atk") sp = "p_atk";
            else sp = `p_walk_${((e.animT | 0) % 4)}`;
          } else if (e.kind === "crew") {
            if (e.state === "track_fall") { sp = "c_fall"; flip = e.vx > 0; }
            else if (e.state === "track_daze") { sp = "c_daze"; flip = false; }
            else if (e.state === "hit" || e.state === "ko") sp = "c_hit";
            else if (e.state === "atk") sp = "c_atk";
            else sp = `c_walk_${((e.animT | 0) % 3)}`;
          } else if (e.kind === "butcher") {
            if (e.state === "track_fall") { sp = "b_fall"; flip = e.vx > 0; }
            else if (e.state === "track_daze") { sp = "b_daze"; flip = false; }
            else if (e.state === "hit" || e.state === "ko") sp = "b_hit";
            else if (e.state === "wind") sp = "b_wind";
            else if (e.state === "throw" || e.state === "atk") sp = "b_throw";
            else sp = `b_walk_${((e.animT | 0) % 3)}`;
          } else {
            if (e.state === "hit" || e.state === "ko") sp = "jb_hit";
            else if (e.state === "wind" || e.state === "throw") sp = "jb_smash";
            else if (e.state === "atk") sp = (((G.time * 4) | 0) % 2 === 0 ? "jb_hook" : "jb_smash");
            else sp = `jb_walk_${((e.animT | 0) % 3)}`;
          }
          if (e.state === "ko" && ((G.time * 18) | 0) % 2 === 0) return;
          const eScale = e.state === "track_daze" ? 0.86 : (e.state === "track_fall" ? 0.92 : 1);
          drawSprite(sp, sx, sy, flip, eScale);
          if (e.state === "track_daze") {
            drawPixelText(G.fgTrain ? "!!" : "?!", sx, sy - 92, 10, G.fgTrain ? "#ef4444" : "#fde047", "#090d16", "center");
          }
        }
      });
    });

    if (G.player && G.phase !== "booth_win") {
      const p = G.player;
      drawList.push({
        y: p.y + 0.1,
        draw: () => {
          if (p.invuln > 0 && ((G.time * 22) | 0) % 2 === 0) return;
          const sx = Math.round(p.x - camX), sy = Math.round(p.y - camY - p.z);
          ctx.fillStyle = "rgba(9, 13, 22, 0.62)";
          ctx.fillRect(sx - 24, Math.round(p.y - camY - (p.onBench ? 36 : 0)) - 4, 48, 7);

          let sp = ((G.time * 2.5) | 0) % 2 === 0 ? "g_idle_0" : "g_idle_1";
          if (p.state === "walk") {
            sp = p.sprinting ? `g_sprint_${((p.animT | 0) % 2)}` : `g_walk_${((p.animT | 0) % 4)}`;
          } else if (p.state === "jab") sp = "g_jab";
          else if (p.state === "kick") sp = "g_kick";
          else if (p.state === "umb_wind") sp = "g_umb_wind";
          else if (p.state === "umb_hit") sp = "g_umb_hit";
          else if (p.state === "shield") sp = "g_shield";
          else if (p.state === "sip") {
            sp = (p.stateT > 0.48 || (p.stateT <= 0.28 && p.stateT > 0.14)) ? "g_sip_0" : "g_sip_1";
          }
          else if (p.state === "jump" || (p.z > 3 && p.state !== "jkick")) sp = "g_jump";
          else if (p.state === "jkick") sp = "g_jkick";
          else if (p.state === "throw") sp = "g_throw";
          else if (p.state === "hurt") sp = "g_hurt";
          else if (p.state === "phone") sp = "g_phone";

          drawSprite(sp, sx, sy, p.dir < 0, 1);

          if (p.heldItem && p.state !== "shield" && p.state !== "sip") {
            if (p.heldItem === "rat") {
              drawSprite("rat_held", sx + p.dir * 26, sy - 74, p.dir < 0, 1);
            } else {
              drawSprite("item_papaya_empty", sx + p.dir * 24, sy - 56, p.dir < 0, 1);
            }
          }
        }
      });
    }

    G.projectiles.forEach(pr => {
      drawList.push({
        y: pr.y + 1,
        draw: () => {
          const qRot = ((pr.rot * 1.6) | 0) & 3;
          drawSprite(pr.sprite, pr.x - camX, pr.y - camY - pr.z, pr.vx < 0, 1, qRot);
        }
      });
    });

    drawList.sort((a, b) => a.y - b.y);
    drawList.forEach(item => item.draw());

    if (IMG.twoStoryFg._ready && (TWO_STORY_X - camX) < W) {
      ctx.drawImage(IMG.twoStoryFg, TWO_STORY_X - camX, TWO_STORY_Y - camY, TWO_STORY_W, TWO_STORY_H);
    }

    G.vfx.forEach(v => drawSprite(v.sprite, v.x - camX, v.y - camY, v.flip, 1));

    drawForegroundMultiplane();

    if (G.fgTrain) {
      if (G.fgTrain.phase === "warn") {
        if (((G.time * 10) | 0) % 2 === 0) {
          ctx.fillStyle = "#f59e0b";
          ctx.fillRect(W - 318, H - 44, 304, 26);
          drawPixelText("<!> LOCAL TRAIN TRACK 1", W - 166, H - 36, 10, "#090d16", "#fde047", "center");
        }
      } else {
        const fx = Math.round(G.fgTrain.x - camX);
        const fy = Math.round(H + 78 - camY);
        drawTrainUnit(fx, fy, 0, false, 1);
        drawTrainUnit(fx + 675, fy, 0, false, 1);
      }
    }

    G.enemies.forEach(e => {
      if (e.state !== "train_splat") return;
      if (e.splatPhase === "peel" && e.stateT < 0.22 && ((G.time * 22) | 0) % 2 === 0) return;
      const sx = Math.round(e.x - camX), sy = Math.round(e.y - camY - e.z);
      const sp = e.kind === "butcher" ? "b_splat" : (e.kind === "crew" ? "c_splat" : "p_splat");
      const qTurns = e.splatPhase === "peel" ? (((0.44 - e.stateT) * 10) | 0) & 3 : 0;
      drawSprite(sp, sx, sy, false, 0.88, qTurns);
    });

    G.popups.forEach(pp => {
      const st = getCrispTextStamp(pp.text, 10, pp.color, "#090d16");
      const halfW = Math.ceil(st.width * 0.5) + 12;
      const px = Math.max(halfW, Math.min(W - halfW, pp.x - camX));
      drawPixelText(pp.text, px, pp.y - camY, 10, pp.color, "#090d16", "center");
    });
    drawTMNTSpeechBubbles();
    drawHUD();

    if (G.phase === "tally") {
      const curFund = (G.host && G.host.getAccountCash) ? G.host.getAccountCash() : G.lastBanked;
      ctx.fillStyle = "rgba(7, 11, 18, 0.88)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(118, 44, W - 236, H - 88);
      ctx.fillStyle = "#facc15";
      ctx.fillRect(118, 44, W - 236, 6);
      ctx.fillRect(118, H - 50, W - 236, 6);

      drawPixelText("THE NUMBERS", W / 2, 68, 20, "#facc15", "#090d16", "center");
      drawPixelText("SAFE INSIDE DITMARS TOKEN BOOTH — CALLING NICKY!", W / 2, 104, 10, "#5eead4", "#090d16", "center");

      const rows = [
        ["GABAGHOULS CLOBBERED", `${G.kills}`],
        ["WISEGUY CLIPS & WALLETS", `${G.lootPicked}`],
        ["UMBRELLA DEFLECTS (+$15)", `${G.deflects}`],
        ["SUBWAY TRAIN SPLATS (+$30)", `${G.trainSplats}`],
        ["JOHNNY BRESAOLA DEFEATED", G.bossDefeated ? "YES!" : "ESCAPED"],
        [G.isReplay ? "PRACTICE REPLAY ($0 BANK)" : `BANKED TO FILM FUND ($${curFund})`, G.isReplay ? `$0 ($${G.cashEarned} RUN)` : `+$${G.lastBanked}`]
      ];
      rows.forEach(([k, v], idx) => {
        const ry = 146 + idx * 36;
        const isTotal = idx === rows.length - 1;
        drawPixelText(k, 166, ry, isTotal ? 11 : 10, isTotal ? "#fde047" : "#cbd5e1", "#090d16", "left");
        drawPixelText(v, W - 166, ry, isTotal ? 13 : 11, isTotal ? "#4ade80" : "#f8fafc", "#090d16", "right");
      });

      drawPixelText("[R] PRACTICE REPLAY ($0 BANK)   [ENTER] TO THE BRONX ▶", W / 2, 418, 11, "#facc15", "#090d16", "center");
    }

    ctx.restore();
    dispCtx.drawImage(offCvs, 0, 0, dispCvs.width, dispCvs.height);
  }

  let pointerBoundCvs = null;
  function bindCanvasPointer(cvs) {
    if (!cvs || pointerBoundCvs === cvs) return;
    pointerBoundCvs = cvs;
    cvs.addEventListener("mousedown", (e) => {
      if (!G.host || !G.host.isActive()) return;
      SFX.init();
      if (G.phase === "intro") { startGameplay(false); return; }
      if (G.phase === "tally") {
        if (G.host.onExit) G.host.onExit({ skippedFromIntro: false });
        return;
      }
      if (e.button === 2) keys.shield = true;
      else performPlayerAttack();
    });
    cvs.addEventListener("mouseup", (e) => {
      if (e.button === 2) keys.shield = false;
    });
    cvs.addEventListener("contextmenu", (e) => {
      if (G.host && G.host.isActive()) e.preventDefault();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (!G.host || !G.host.isActive()) return;
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
    if (e.code === "KeyA" || e.code === "ArrowLeft") {
      if (!keys.left) {
        const now = performance.now();
        if (lastTapDir === -1 && now - lastTapTime < 260 && G.player) G.player.sprinting = true;
        lastTapDir = -1; lastTapTime = now;
      }
      keys.left = true;
    }
    if (e.code === "KeyD" || e.code === "ArrowRight") {
      if (!keys.right) {
        const now = performance.now();
        if (lastTapDir === 1 && now - lastTapTime < 260 && G.player) G.player.sprinting = true;
        lastTapDir = 1; lastTapTime = now;
      }
      keys.right = true;
    }
    if (e.code === "KeyW" || e.code === "ArrowUp") keys.up = true;
    if (e.code === "KeyS" || e.code === "ArrowDown") keys.down = true;
    if (e.code === "KeyL" || e.code === "KeyE" || e.code === "ShiftLeft" || e.code === "ShiftRight") keys.shield = true;
  });

  window.addEventListener("keyup", (e) => {
    if (e.code === "KeyA" || e.code === "ArrowLeft") keys.left = false;
    if (e.code === "KeyD" || e.code === "ArrowRight") keys.right = false;
    if (e.code === "KeyW" || e.code === "ArrowUp") keys.up = false;
    if (e.code === "KeyS" || e.code === "ArrowDown") keys.down = false;
    if (e.code === "KeyL" || e.code === "KeyE" || e.code === "ShiftLeft" || e.code === "ShiftRight") keys.shield = false;
  });

  function skipAction() {
    SFX.init();
    if (G.phase === "intro") {
      BGM.stop();
      if (G.host && G.host.onExit) G.host.onExit({ skippedFromIntro: true });
      return;
    }
    if (G.phase === "tally") {
      BGM.stop();
      if (G.host && G.host.onExit) G.host.onExit({ skippedFromIntro: false });
      return;
    }
    finishStageWin();
  }

  function handleKey(code) {
    SFX.init();
    if (G.phase === "intro") {
      if (code === "Escape") { skipAction(); return; }
      if (code === "Enter" || code === "NumpadEnter" || code === "Space" || code === "KeyJ") startGameplay(false);
      return;
    }
    if (G.phase === "tally") {
      if (code === "KeyR") { startGameplay(true); return; }
      if (code === "Enter" || code === "NumpadEnter" || code === "Space" || code === "Escape") {
        BGM.stop();
        if (G.host && G.host.onExit) G.host.onExit({ skippedFromIntro: false });
      }
      return;
    }
    if (code === "Escape") {
      finishStageWin();
      return;
    }
    if (code === "KeyJ" || code === "KeyF" || code === "KeyZ") performPlayerAttack();
    if (code === "KeyK" || code === "Space") performPlayerJump();
  }

  window.Stage2DitmarsBrawl = {
    launch(host) {
      G.host = host;
      G._lastHudLabel = "";
      keys.up = keys.down = keys.left = keys.right = keys.shield = false;
      const cvs = document.getElementById("minigame-canvas");
      if (cvs) {
        cvs.width = 1920;
        cvs.height = 1080;
        bindCanvasPointer(cvs);
      }
      G.isReplay = G.officialBankedDone;
      G.phase = "intro";
      G.time = 0;
      BGM.stop();
      syncHostHUD();
    },
    handleKey,
    skip: skipAction,
    stopAudio() { BGM.stop(); },
    statusLabel,
    getBanked() { return G.lastBanked; },
    updateAndDraw(dispCtx, dt) {
      update(Math.min(0.05, Math.max(0.001, dt)));
      renderToDisplay(dispCtx);
    }
  };
})();
