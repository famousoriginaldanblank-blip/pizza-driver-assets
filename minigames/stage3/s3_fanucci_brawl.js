// ============================================================================
// STAGE 3 INTER-BOROUGH BONUS: "FEAST OF BLOOD: MULBERRY ST., 1919"
// 32-Bit CPS-2 / SNK Neo-Geo Street Fighter II Rooftop Boss Battle
// 15-Year-Old Giuseppe Marzano vs. Gluttonous Zombie Don Fanucci (Best of 3 Rounds)
// ============================================================================
(function () {
  const W = 960, H = 540;
  const WORLD_W = 1640;
  const STAGE_LEFT = 195, STAGE_RIGHT = 1445;
  const GROUND_Y = 502;

  const GH_PAGES = "https://famousoriginaldanblank-blip.github.io/pizza-driver-assets";
  const getJsDelivr = () => `https://cdn.jsdelivr.net/gh/famousoriginaldanblank-blip/pizza-driver-assets@${window.__PD_ASSET_REF || "main"}`;

  // 73 Marvel-vs-Capcom Scale Fighter Keyframes (s3_sprites_fighters.png: [x, y, w, h, ax, ay], facing RIGHT +1)
  const F_FRAMES = {
    g_idle_0:[4,4,191,210,69,209], g_idle_1:[199,4,184,203,67,202], g_idle_2:[387,4,166,217,56,216],
    g_walk_0:[557,4,179,214,61,213], g_walk_1:[740,4,175,211,78,210], g_walk_2:[919,4,156,213,61,212],
    g_walk_3:[1079,4,183,201,59,200], g_crouch:[1266,4,179,148,92,147], g_block:[1449,4,145,201,70,200],
    g_jump_rise:[1598,4,164,195,78,194], g_jump_slash:[1766,4,156,205,78,204], g_victory:[1926,4,186,238,106,237],
    g_jab_0:[2116,4,204,219,73,218], g_jab_1:[2324,4,190,209,68,208], g_bat_0:[4,246,120,226,60,225], g_bat_1:[128,246,204,200,72,199],
    g_thrust:[336,246,259,185,96,184], g_sweep:[599,246,193,139,78,138], g_upper_0:[796,246,196,182,83,181], g_upper_1:[996,246,134,299,78,298],
    g_throw_0:[1134,246,128,220,62,219], g_throw_1:[1266,246,131,217,63,216], g_hurt:[1401,246,191,236,64,235], g_ko:[1596,246,209,83,104,82],

    f1_idle_0:[1809,246,183,297,79,296], f1_idle_1:[1996,246,175,304,88,303],
    f1_walk_0:[2175,246,175,293,84,292], f1_walk_1:[2354,246,180,298,84,297], f1_walk_2:[4,554,153,296,72,295],
    f1_charge:[161,554,222,277,100,276], f1_cigar:[387,554,214,300,88,299], f1_belch:[605,554,205,299,88,298],
    f1_hat_wind_bald:[814,554,189,302,76,301], f1_hat_throw_bald:[1007,554,212,285,78,284],
    f1_hurt:[1223,554,220,295,103,294], f1_ko_bald:[1447,554,254,116,127,115],

    f2_idle_0:[1705,554,176,297,80,296], f2_idle_1:[1885,554,157,304,80,303],
    f2_walk_0:[2046,554,161,294,81,293], f2_walk_1:[2211,554,163,298,78,297],
    f2_charge:[4,862,184,262,96,261], f2_slap:[192,862,200,296,80,295], f2_slap_bald:[396,862,200,287,81,286],
    f2_belch:[600,862,211,301,84,300], f2_sky_leap:[815,862,170,273,86,272], f2_sky_slam:[989,862,234,226,116,225],
    f2_hat_throw_bald:[1227,862,195,283,79,282], f2_hurt_bald:[1426,862,165,280,81,279], f2_ko_bald:[1595,862,255,115,127,114],

    f3_idle_0:[1854,862,177,299,79,298], f3_idle_1:[2035,862,161,305,82,304],
    f3_walk_0:[2200,862,163,295,82,294], f3_walk_1:[2367,862,164,300,79,299],
    f3_charge:[4,1171,186,264,97,263], f3_slap:[194,1171,201,302,81,301],
    f3_walk_1_bald:[399,1171,163,289,78,288], f3_charge_bald:[566,1171,186,257,95,256], f3_slap_bald:[756,1171,201,290,81,289],
    f3_belch:[961,1171,213,301,86,300], f3_sky_slam:[1178,1171,193,226,92,225], f3_cigar:[1375,1171,191,289,73,288],
    f3_hat_throw_bald:[1570,1171,197,283,80,282], f3_hurt_bald:[1771,1171,168,281,85,280], f3_ko_bald:[1943,1171,255,116,127,115],

    f1_esp_sip:[2202,1171,182,298,93,297], f1_esp_toss:[4,1477,214,301,95,300],
    f2_esp_sip:[222,1477,150,298,69,297], f2_esp_toss:[376,1477,181,297,80,296],
    f3_esp_sip:[561,1477,150,298,68,297], f3_esp_toss:[715,1477,193,298,87,297],
    f_dizzy_bald:[912,1477,178,290,85,289], f_headless_stand:[1094,1477,163,265,78,264], f_headless_ko:[1261,1477,286,123,137,122]
  };

  // 47 Prop, Smaller Stogie/Cannoli, Animated Crowd, Portrait, Float & Fatality Frames (s3_sprites_props.png)
  const P_FRAMES = {
    float_r1:[4,4,141,161,71,160], float_r2:[149,4,175,161,88,160], float_r3:[328,4,155,162,78,161],
    bg_fire_0:[487,4,58,90,29,89], bg_fire_1:[549,4,78,117,39,116], bg_fire_2:[631,4,68,118,34,117],
    bg_zmob_0:[703,4,131,102,66,101], bg_zmob_1:[838,4,131,100,66,99], bg_zmob_2:[973,4,131,100,66,99],
    bg_crowd_0:[1108,4,110,97,55,96], bg_crowd_1:[4,170,116,89,58,88], bg_crowd_2:[124,170,118,86,59,85], bg_crowd_3:[246,170,109,87,55,86],
    bg_climber_0:[359,170,45,98,23,49], bg_climber_1:[408,170,53,85,27,43],
    bg_smoke_0:[465,170,102,118,51,117], bg_smoke_1:[571,170,97,118,49,117], bg_smoke_2:[672,170,92,118,46,117],
    crate_intact:[768,170,144,109,72,108], crate_smashed:[916,170,149,73,75,72],
    coop_intact:[1069,170,154,97,77,96], coop_smashed:[4,292,169,87,85,86],
    pigeon_0:[177,292,44,53,22,27], pigeon_1:[225,292,55,36,28,18],
    port_giuseppe_vs:[284,292,116,133,58,67], port_giuseppe_win:[404,292,109,132,55,66],
    port_fanucci_vs:[517,292,129,135,65,68], port_fanucci_lose:[650,292,138,132,69,66],
    loot_watch:[792,292,65,72,33,36], loot_chest:[861,292,66,71,33,36], vfx_spark:[931,292,83,90,42,45],
    proj_tomato_0:[1018,292,40,59,20,30], proj_tomato_1:[1062,292,56,38,28,19],
    proj_oil_can:[1122,292,43,66,22,33], proj_oil_puddle:[4,431,111,46,56,23],
    proj_flour_scoop:[119,431,55,45,28,23], proj_flour_cloud:[178,431,121,117,61,59],
    proj_hat_0:[303,431,92,53,46,27], proj_hat_1:[399,431,102,66,51,33],
    proj_stogie:[505,431,32,21,16,11], proj_ember:[541,431,25,30,13,29],
    item_cannoli:[570,431,38,34,19,33], item_salami:[612,431,47,40,24,39],
    head_fly_0:[663,431,79,98,38,49], head_fly_1:[746,431,91,96,44,48],
    esp_cup:[841,431,24,23,12,12], esp_saucer:[869,431,33,17,16,9]
  };

  function loadImg(rel) {
    const jsd = getJsDelivr();
    const cands = [
      `./assets/${rel}?v=0235w`,
      `../assets/${rel}?v=0235w`,
      `${GH_PAGES}/${rel}?v=0235w`,
      `${GH_PAGES}/assets/${rel}?v=0235w`,
      `${jsd}/assets/${rel}`,
      `${jsd}/${rel}`
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
    poster:   loadImg("minigames/stage3/s3_boxing_poster_bg.png"),
    sky:      loadImg("minigames/stage3/s3_bg_sky.png"),
    far:      loadImg("minigames/stage3/s3_bg_far.png"),
    vista:    loadImg("minigames/stage3/s3_vista_bg.png"),
    wings:    loadImg("minigames/stage3/s3_bg_wings.png"),
    roof:     loadImg("minigames/stage3/s3_rooftop_fg.png"),
    fighters: loadImg("minigames/stage3/s3_sprites_fighters.png"),
    props:    loadImg("minigames/stage3/s3_sprites_props.png"),
    cutscene: loadImg("art/05_cutscene03.jpeg")
  };

  // Dedicated 1919 Don Fanucci Soundtrack ("Don_Fanucci_Sunday_on_the_Bowery.mp3")
  const BGM = {
    audio: null, active: false, vol: 0.48, idx: 0,
    urls: [
      "./assets/audio/Don_Fanucci_Sunday_on_the_Bowery.mp3",
      "../assets/audio/Don_Fanucci_Sunday_on_the_Bowery.mp3",
      "./_music/Don_Fanucci_Sunday_on_the_Bowery.mp3",
      "../_music/Don_Fanucci_Sunday_on_the_Bowery.mp3",
      `${GH_PAGES}/audio/Don_Fanucci_Sunday_on_the_Bowery.mp3`,
      `${GH_PAGES}/assets/audio/Don_Fanucci_Sunday_on_the_Bowery.mp3`,
      `${getJsDelivr()}/assets/audio/Don_Fanucci_Sunday_on_the_Bowery.mp3`,
      `${getJsDelivr()}/audio/Don_Fanucci_Sunday_on_the_Bowery.mp3`
    ],
    init() {
      if (this.audio || typeof Audio === "undefined") return;
      const a = new Audio();
      a.loop = true;
      a.preload = "auto";
      a.onerror = () => {
        if (++this.idx < this.urls.length) { a.src = this.urls[this.idx]; this.sync(true); }
      };
      a.src = this.urls[0];
      this.audio = a;
    },
    play(v = 0.48) {
      this.init();
      this.active = true;
      this.vol = v;
      this.sync(true);
    },
    sync(tryPlay = false) {
      if (!this.audio) return;
      const hs = G.host && G.host.getSoundFX ? G.host.getSoundFX() : null;
      const muted = !!(hs && (hs.muted || hs.musicMuted));
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

  // CPS-2 / YM2151 + QSound Arcade Fighting Sound Synthesizer
  const SFX = {
    ctx: null, out: null, nBuf: null,
    muted() {
      const hs = G.host && G.host.getSoundFX ? G.host.getSoundFX() : null;
      return !!(hs && hs.muted);
    },
    init() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        this.ctx = new AC();
        const cp = this.ctx.createDynamicsCompressor();
        cp.threshold.value = -12; cp.ratio.value = 5;
        this.out = this.ctx.createGain();
        this.out.gain.value = 0.85;
        this.out.connect(cp);
        cp.connect(this.ctx.destination);

        const sr = this.ctx.sampleRate;
        this.nBuf = this.ctx.createBuffer(1, sr, sr);
        const ch = this.nBuf.getChannelData(0);
        let v = 0;
        for (let i = 0; i < sr; i++) {
          if (i % 3 === 0) v = (Math.round((Math.random() * 2 - 1) * 12) / 12);
          ch[i] = v;
        }
      }
      if (this.ctx && this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
    },
    tone(freq, endF, dur, type = "sawtooth", gain = 0.14, delay = 0) {
      if (this.muted() || !this.ctx) return;
      const t = this.ctx.currentTime + delay;
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t);
      if (endF && endF !== freq) o.frequency.exponentialRampToValueAtTime(Math.max(20, endF), t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(gain, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
      o.connect(g); g.connect(this.out);
      o.start(t); o.stop(t + dur + 0.02);
    },
    noise(f0, f1, dur, gain = 0.18, Q = 1.4, delay = 0) {
      if (this.muted() || !this.ctx || !this.nBuf) return;
      const t = this.ctx.currentTime + delay;
      const s = this.ctx.createBufferSource(), f = this.ctx.createBiquadFilter(), g = this.ctx.createGain();
      s.buffer = this.nBuf; s.loop = true;
      f.type = "bandpass"; f.Q.value = Q;
      f.frequency.setValueAtTime(f0, t);
      if (f1 && f1 !== f0) f.frequency.exponentialRampToValueAtTime(Math.max(40, f1), t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(gain, t + 0.003);
      g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
      s.connect(f); f.connect(g); g.connect(this.out);
      s.start(t, Math.random() * 0.4, dur + 0.02);
    },
    slurp() {
      this.noise(950, 2600, 0.22, 0.14, 5.5);
      this.tone(240, 580, 0.19, "sine", 0.09, 0.03);
    },
    cupShatter() {
      this.noise(4200, 1900, 0.14, 0.2, 2.2);
      [2150, 2780, 3320].forEach((f, i) => this.tone(f, f * 0.85, 0.09, "triangle", 0.09, i * 0.024));
    },
    announcerFight() {
      [196, 246.9, 293.7, 392].forEach((f, i) => this.tone(f, f * 1.02, 0.2, "sawtooth", 0.11, i * 0.035));
      this.noise(2400, 520, 0.16, 0.18, 1.2);
    },
    swing(heavy = false) {
      this.noise(heavy ? 1400 : 1900, heavy ? 260 : 420, heavy ? 0.14 : 0.09, heavy ? 0.17 : 0.12, 1.6);
      this.tone(heavy ? 185 : 260, 72, heavy ? 0.12 : 0.08, "triangle", 0.1);
    },
    hit(heavy = false) {
      this.noise(heavy ? 2200 : 2600, 180, heavy ? 0.2 : 0.12, heavy ? 0.28 : 0.2, 1.1);
      this.tone(heavy ? 155 : 210, 36, heavy ? 0.18 : 0.11, "square", heavy ? 0.22 : 0.15);
    },
    block() {
      this.noise(3200, 1100, 0.08, 0.15, 3.0);
      this.tone(620, 310, 0.07, "square", 0.12);
    },
    deflect() {
      this.tone(880, 1760, 0.12, "triangle", 0.18);
      this.tone(1320, 660, 0.14, "sawtooth", 0.12, 0.03);
      this.noise(3400, 900, 0.1, 0.16, 2.5);
    },
    jump() { this.tone(150, 390, 0.13, "triangle", 0.11); },
    throwItem() { this.noise(2200, 680, 0.09, 0.13, 2.0); this.tone(320, 170, 0.09, "sine", 0.1); },
    tinClang() { this.tone(940, 510, 0.12, "square", 0.15); this.noise(2800, 700, 0.12, 0.18, 2.4); },
    oilSlip() { this.tone(540, 145, 0.26, "sine", 0.16); this.tone(260, 480, 0.14, "triangle", 0.12, 0.12); },
    flourPoof() { this.noise(1600, 360, 0.24, 0.2, 0.9); },
    hatWhir() { this.tone(420, 620, 0.14, "triangle", 0.09); this.tone(620, 410, 0.14, "triangle", 0.09, 0.12); },
    belch() {
      this.tone(86, 52, 0.45, "sawtooth", 0.2);
      this.tone(129, 74, 0.42, "square", 0.12, 0.03);
      this.noise(540, 190, 0.42, 0.18, 2.6);
    },
    quake() {
      this.noise(680, 75, 0.34, 0.3, 0.9);
      this.tone(98, 28, 0.32, "sawtooth", 0.25);
    },
    crateSmash() {
      this.noise(1900, 210, 0.24, 0.25, 1.1);
      this.tone(180, 55, 0.18, "square", 0.16);
    },
    powerup(heal = true) {
      const notes = heal ? [523.3, 659.3, 784, 1046.5] : [293.7, 370, 440, 587.3];
      notes.forEach((f, i) => this.tone(f, f * 1.02, 0.12, "triangle", 0.13, i * 0.045));
    },
    superFlash() {
      [220, 330, 440, 660, 880].forEach((f, i) => this.tone(f, f * 1.15, 0.22, "sawtooth", 0.13, i * 0.03));
      this.noise(3200, 400, 0.28, 0.22, 1.3);
    },
    finishHim() {
      [110, 103.8, 98].forEach((f, i) => this.tone(f, f * 0.94, 0.42, "sawtooth", 0.19, i * 0.14));
      this.noise(1500, 140, 0.38, 0.22, 1.1);
    },
    decapSlice() {
      this.noise(3600, 180, 0.32, 0.32, 1.1);
      this.tone(660, 55, 0.28, "sawtooth", 0.26);
      // Whistle as head arcs over parapet into Mulberry St!
      this.tone(980, 260, 1.35, "sine", 0.12, 0.25);
      // Distant street splat + crowd roar
      this.noise(1200, 260, 0.55, 0.22, 1.4, 1.65);
    },
    koEcho() {
      for (let i = 0; i < 3; i++) {
        this.noise(2100, 150, 0.24, 0.24 * (1 - i * 0.28), 1.0, i * 0.18);
        this.tone(145, 36, 0.24, "sawtooth", 0.2 * (1 - i * 0.28), i * 0.18);
      }
    }
  };

  // =========================================================================
  // PURE INTEGER PIXEL-MATRIX CPS-2 / NEO-GEO ROM BITMAP FONT
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
    "!":["11","11","11","11","11","00","11"],
    "?":["01110","10001","00010","00100","00100","00000","00100"],
    "$":["00100","01111","10100","01110","00101","11110","00100"],
    "+":["00000","00100","00100","11111","00100","00100","00000"],
    "=":["00000","00000","11111","00000","11111","00000","00000"],
    "-":["0000","0000","0000","1111","0000","0000","0000"],
    "–":["00000","00000","00000","11111","00000","00000","00000"],
    "—":["000000","000000","000000","111111","000000","000000","000000"],
    "/":["00001","00010","00100","00100","01000","10000","00000"],
    "&":["01100","10010","10100","01000","10101","10010","01101"],
    "'":["1","1","0","0","0","0","0"],
    "\"":["101","101","000","000","000","000","000"],
    "%":["11001","11010","00100","00100","01011","10011","00000"],
    "*":["00100","10101","01110","11111","01110","10101","00100"],
    "•":["00000","00100","01110","11111","01110","00100","00000"],
    "\x03":["10000","11000","11100","11110","11100","11000","10000"],
    " ":["000","000","000","000","000","000","000"]
  };

  const offCvs = document.createElement("canvas");
  offCvs.width = W;
  offCvs.height = H;
  const ctx = offCvs.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  const romCache = new Map();
  function hexRgb(hex) {
    const n = parseInt(hex.replace("#", ""), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function getRomStamp(raw, scale = 1, fill = "#f8fafc", outline = "#090812", bold = false, hi = null) {
    const txt = String(raw).toUpperCase();
    const key = `${txt}|${scale}|${fill}|${outline}|${bold ? 1 : 0}|${hi || ""}`;
    if (romCache.has(key)) return romCache.get(key);

    const glyphs = [];
    let lw = 0;
    for (let i = 0; i < txt.length; i++) {
      const ch = txt[i];
      const g = NEO_ROM[ch] || NEO_ROM[" "];
      const noWiden = ch === " " || ch === "*" || ch === "•" || ch === "\x03";
      const gw = g[0].length + (bold && !noWiden ? 1 : 0);
      glyphs.push({ g, gw, rw: g[0].length });
      lw += gw + (i < txt.length - 1 ? 1 : 0);
    }
    const mw = lw + 3, mh = 10;
    const mask = new Uint8Array(mw * mh);
    let cx = 1;
    for (let i = 0; i < glyphs.length; i++) {
      const { g, gw, rw } = glyphs[i];
      for (let r = 0; r < 7; r++) {
        const rs = g[r];
        for (let c = 0; c < rw; c++) {
          if (rs[c] === "1") {
            mask[(r + 1) * mw + cx + c] = r + 1;
            if (bold && gw > rw) mask[(r + 1) * mw + cx + c + 1] = r + 1;
          }
        }
      }
      cx += gw + 1;
    }

    const sc = document.createElement("canvas");
    sc.width = Math.max(2, mw * scale);
    sc.height = Math.max(2, mh * scale);
    const sctx = sc.getContext("2d");
    const im = sctx.createImageData(sc.width, sc.height);
    const d = im.data;
    const [fr, fg, fb] = hexRgb(fill);
    const [hr, hg, hb] = hi ? hexRgb(hi) : [Math.min(255, fr + 36), Math.min(255, fg + 36), Math.min(255, fb + 36)];
    const [or, og, ob] = outline ? hexRgb(outline) : [0, 0, 0];

    for (let ly = 0; ly < mh; ly++) {
      for (let lx = 0; lx < mw; lx++) {
        const v = mask[ly * mw + lx];
        let pr = 0, pg = 0, pb = 0, pa = 0;
        if (v > 0) {
          const useHi = (hi !== false) && (hi || scale >= 2) && v <= 2;
          pr = useHi ? hr : fr; pg = useHi ? hg : fg; pb = useHi ? hb : fb; pa = 255;
        } else if (outline) {
          const touch =
            (lx > 0 && mask[ly * mw + lx - 1]) ||
            (lx < mw - 1 && mask[ly * mw + lx + 1]) ||
            (ly > 0 && mask[(ly - 1) * mw + lx]) ||
            (ly < mh - 1 && mask[(ly + 1) * mw + lx]) ||
            (lx > 0 && ly > 0 && mask[(ly - 1) * mw + lx - 1]);
          if (touch) { pr = or; pg = og; pb = ob; pa = 255; }
        }
        if (!pa) continue;
        for (let sy = 0; sy < scale; sy++) {
          const py = ly * scale + sy;
          for (let sx = 0; sx < scale; sx++) {
            const px = lx * scale + sx;
            const p = (py * sc.width + px) * 4;
            d[p] = pr; d[p + 1] = pg; d[p + 2] = pb; d[p + 3] = 255;
          }
        }
      }
    }
    sctx.putImageData(im, 0, 0);
    if (romCache.size > 400) romCache.clear();
    romCache.set(key, sc);
    return sc;
  }

  function drawTxt(txt, x, y, { scale = 1, fill = "#f8fafc", outline = "#090812", align = "left", bold = false, hi = null } = {}) {
    if (!txt) return;
    const st = getRomStamp(txt, scale, fill, outline, bold, hi);
    let dx = Math.round(x) - scale;
    if (align === "center") dx = Math.round(x - st.width * 0.5);
    else if (align === "right") dx = Math.round(x - st.width + scale);
    ctx.drawImage(st, dx, Math.round(y) - scale);
  }

  function box(x, y, w, h, fill, border) {
    const ix = Math.round(x), iy = Math.round(y), iw = Math.round(w), ih = Math.round(h);
    ctx.fillStyle = "#090812";
    ctx.fillRect(ix - 2, iy - 2, iw + 4, ih + 4);
    if (border) {
      ctx.fillStyle = border;
      ctx.fillRect(ix, iy, iw, ih);
      ctx.fillStyle = fill;
      ctx.fillRect(ix + 2, iy + 2, iw - 4, ih - 4);
    } else {
      ctx.fillStyle = fill;
      ctx.fillRect(ix, iy, iw, ih);
    }
  }

  function drawFighter(nm, wx, wy, facing = 1, scale = 1) {
    const f = F_FRAMES[nm];
    if (!f || !IMG.fighters._ready) return;
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.translate(Math.round(wx - G.camX), Math.round(wy - G.camY));
    if (facing < 0) ctx.scale(-1, 1);
    if (scale !== 1) ctx.scale(scale, scale);
    ctx.drawImage(IMG.fighters, f[0], f[1], f[2], f[3], -f[4], -f[5], f[2], f[3]);
    ctx.restore();
  }

  function drawProp(nm, sx, sy, { flipX = false, scale = 1, rot = 0, alpha = 1 } = {}) {
    const f = P_FRAMES[nm];
    if (!f || !IMG.props._ready) return;
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (alpha < 1) ctx.globalAlpha = Math.max(0, alpha);
    ctx.translate(Math.round(sx), Math.round(sy));
    if (rot) ctx.rotate(rot);
    if (flipX) ctx.scale(-1, 1);
    if (scale !== 1) ctx.scale(scale, scale);
    ctx.drawImage(IMG.props, f[0], f[1], f[2], f[3], -f[4], -f[5], f[2], f[3]);
    ctx.restore();
  }

  // =========================================================================
  // GAME STATE & ROUND / COMBAT ENGINE
  // =========================================================================
  const THROW_BAG = [
    { kind: "tomato", label: "SAN MARZANO TIN", color: "#ef4444" },
    { kind: "oil",    label: "OLIO D'OLIVA CAN", color: "#eab308" },
    { kind: "flour",  label: "00-FLOUR BURST",   color: "#f8fafc" }
  ];

  const ROUND_INTROS = [
    { quote: "MMMPH... ONE SIP OF ESPRESSO, DEN HAND OVER A SLICE OF EVERY PIE ON MULBERRY ST!", gReply: "EAT MY ASH-WOOD PEEL, YA BLOATED BLACK-HAND GHOUL!" },
    { quote: "BAH—TOO HOT IN DIS OVERCOAT! WATCH DA WHITE SUIT WHILE I SQUASH YA, KID!", gReply: "YOUR SUIT'S ALREADY COVERED IN GRAVE DIRT, FANUCCI!" },
    { quote: "MY SUIT'S RUINED!! FINISHIN' MY DEMITASSE AND GRINDIN' YOUR BONES INTO SAUSAGE!", gReply: "ROUND THREE—BACK INTO DA COAL OVEN WIT' YA!" }
  ];

  const keys = { left: false, right: false, up: false, down: false };

  const G = {
    host: null,
    phase: "vs_intro", // vs_intro | round_intro | fighting | round_over | finish_him | fatality_anim | victory_quote | tally
    time: 0,
    phaseT: 0,
    hitStop: 0,
    superFreeze: 0,
    shake: 0,
    camX: 200,
    camY: 0,

    roundNum: 1,
    gWins: 0,
    fWins: 0,
    roundClock: 99,
    perfectRounds: 0,
    timeBonusTotal: 0,
    stogiesDeflected: 0,
    fatalityDone: false,

    officialBankedDone: false,
    isReplay: false,
    banked: 0,
    lastBanked: 0,
    matchWon: false,
    _lastHud: "",
    _ptrCvs: null,

    bannerMsg: "",
    bannerCol: "#fde047",
    bannerT: 0,
    bubble: null,

    bagIdx: 0,
    midRoundDropSent: false,

    props: [],
    pigeons: [],
    projectiles: [],
    puddles: [],
    embers: [],
    items: [],
    sparks: [],
    porcelain: [],
    popups: [],
    bgEmbers: [],
    severedHead: null,
    lootDrops: [],

    p: null, // Giuseppe
    b: null  // Zombie Don Fanucci
  };

  for (let i = 0; i < 28; i++) {
    G.bgEmbers.push({ x: Math.random() * W, y: Math.random() * H, vy: 18 + Math.random() * 34, vx: -12 + Math.random() * 24, sz: Math.random() < 0.4 ? 3 : 2 });
  }

  function setBanner(msg, col = "#fde047", dur = 1.15) {
    G.bannerMsg = msg; G.bannerCol = col; G.bannerT = dur;
  }

  function showBubble(who, text, dur = 2.4) {
    G.bubble = { who, text, t: dur };
  }

  function statusLabel() {
    if (G.phase === "tally") return G.matchWon ? `VICTORY • BANKED +$${G.lastBanked}` : "DEFEAT • REMATCH OR CONTINUE";
    return `${G.isReplay ? "REMATCH ($0) • " : ""}RD ${G.roundNum}/3 (${G.gWins}-${G.fWins}) • ${Math.ceil(G.roundClock)}S`;
  }

  function syncHUD() {
    const lbl = statusLabel();
    if (lbl !== G._lastHud) {
      G._lastHud = lbl;
      if (G.host && G.host.onUpdateHUD) G.host.onUpdateHUD(lbl);
    }
  }

  function makeFightersForRound(rNum) {
    const costume = Math.min(3, Math.max(1, rNum));
    // Meaty 3-Round Street Fighter II Boss HP so rounds showcase full animations, footsies & multiple Supers!
    const fMax = costume === 1 ? 230 : (costume === 2 ? 275 : 320);
    G.p = {
      x: 590, y: GROUND_Y, vx: 0, vy: 0, facing: 1,
      hp: 125, maxHp: 125, dispHp: 125,
      ovenMeter: rNum > 1 ? 40 : 25,
      salamiT: 0,
      state: "idle", stateT: 0, animT: 0,
      comboStep: 0, comboWin: 0, hitRegistered: false,
      superStage: 0,
      throwCd: 0, invuln: 0, dizzyT: 0
    };
    G.b = {
      x: 1050, y: GROUND_Y, vx: 0, vy: 0, facing: -1,
      costume,
      hp: fMax, maxHp: fMax, dispHp: fMax,
      hatOut: false,
      armor: 0,
      poiseHits: 0, poiseWin: 0, poiseArmorT: 0,
      enraged: false,
      state: "esp_sip", stateT: 0, animT: 0,
      aiCd: 0.45, moveQueue: [], lastMoves: [],
      hitRegistered: false,
      blindedT: 0, invuln: 0,
      belchTick: 0, targetX: 590
    };
    G.camX = 340;
    G.comboCount = 0;
    G.comboDisp = 0;
    G.comboTimer = 0;

    G.roundClock = 99;
    G.midRoundDropSent = false;
    G.projectiles = [];
    G.puddles = [];
    G.embers = [];
    G.items = [];
    G.sparks = [];
    G.porcelain = [];
    G.popups = [];
    G.severedHead = null;
    G.lootDrops = [];

    // Reset breakable SF2 rooftop corner props each round!
    G.props = [
      { kind: "coop",  x: 295, y: GROUND_Y - 22, broken: false, drop: "cannoli" },
      { kind: "crate", x: 1345, y: GROUND_Y - 22, broken: false, drop: "salami" }
    ];
    G.pigeons = [];
  }

  function beginRound(rNum) {
    G.roundNum = rNum;
    makeFightersForRound(rNum);
    G.phase = "round_intro";
    G.phaseT = 0;
    G._espSlurped = false;
    G._espTossed = false;
    G._fightCalled = false;
    const ri = ROUND_INTROS[Math.min(2, rNum - 1)];
    showBubble("fanucci", ri.quote, 2.05);
    syncHUD();
  }

  function startNewMatch(forceReplay = false) {
    SFX.init();
    BGM.play(0.48);
    G.isReplay = forceReplay || G.officialBankedDone;
    G.gWins = 0;
    G.fWins = 0;
    G.perfectRounds = 0;
    G.timeBonusTotal = 0;
    G.stogiesDeflected = 0;
    G.fatalityDone = false;
    G.matchWon = false;
    beginRound(1);
  }

  function finishMatch(won) {
    G.matchWon = won;
    G.phase = "tally";
    BGM.play(0.22);
    let payout = 0;
    if (won) {
      const base = 185;
      const sweep = G.fWins === 0 ? 45 : 0;
      const perf = G.perfectRounds * 35;
      const fat = G.fatalityDone ? 40 : 0;
      payout = base + sweep + perf + fat + G.timeBonusTotal;
    }
    if (won && !G.officialBankedDone && !G.isReplay) {
      G.officialBankedDone = true;
      G.lastBanked = payout;
      G.banked += payout;
      if (G.host && G.host.addAccountCash && payout > 0) G.host.addAccountCash(payout);
    } else {
      if (won) G.isReplay = true;
      G.lastBanked = 0;
    }
    syncHUD();
  }

  function exitStage(skippedFromIntro = false) {
    if (skippedFromIntro && !G.officialBankedDone) {
      G.officialBankedDone = true;
      G.lastBanked = 0;
    }
    BGM.stop();
    if (G.host && G.host.onExit) G.host.onExit({ skippedFromIntro, bankedCash: G.banked });
  }

  // =========================================================================
  // GIUSEPPE ACTIONS & 1919 KITCHEN SPECIALS
  // =========================================================================
  function isHoldingBack() {
    const p = G.p;
    if (!p) return false;
    return (p.facing === 1 && keys.left && !keys.right) || (p.facing === -1 && keys.right && !keys.left);
  }
  function isHoldingForward() {
    const p = G.p;
    if (!p) return false;
    return (p.facing === 1 && keys.right && !keys.left) || (p.facing === -1 && keys.left && !keys.right);
  }

  function spawnSpark(wx, wy, scale = 1) {
    G.sparks.push({ x: wx, y: wy, t: 0, dur: 0.22, sc: scale });
  }
  function addPopup(wx, wy, text, color = "#fde047") {
    G.popups.push({ x: wx, y: wy, text, color, t: 0, dur: 0.85 });
  }

  function triggerFatalityStrike() {
    const p = G.p, b = G.b;
    G.phase = "fatality_anim";
    G.phaseT = 0;
    G.fatalityDone = true;
    // Snap Giuseppe cleanly into Babe Ruth peel-decapitation range!
    p.y = GROUND_Y; p.vy = 0;
    p.facing = b.x >= p.x ? 1 : -1;
    p.x = Math.max(STAGE_LEFT + 30, Math.min(STAGE_RIGHT - 30, b.x - p.facing * 148));
    p.state = "bat"; p.stateT = 0;
    b.y = GROUND_Y; b.vy = 0;
    G._fatalitySliced = false;
    G._fatalityBodyFell = false;
    SFX.swing(true);
  }

  function startGiuseppeLight() {
    const p = G.p;
    if (G.phase === "finish_him") { triggerFatalityStrike(); return; }
    if (G.phase !== "fighting") return;
    if (p.state === "hurt" || p.state === "ko" || p.dizzyT > 0) return;

    // Aerial Peel Chop!
    if (p.y < GROUND_Y - 4) {
      if (p.state !== "jump_slash") {
        p.state = "jump_slash"; p.stateT = 0; p.hitRegistered = false;
        SFX.swing(false);
      }
      return;
    }

    // Crouch Peel Poke
    if (keys.down) {
      if (p.state === "idle" || p.state === "walk" || p.state === "crouch") {
        p.state = "sweep"; p.stateT = 0; p.hitRegistered = false;
        p.vx = p.facing * 140;
        SFX.swing(false);
      }
      return;
    }

    // 3-Hit Standing Peel Chain: Jab -> Baseball Bat Swing (Deflects Stogies!) -> Long Peel Thrust!
    const canChain = (p.state === "jab" && p.stateT > 0.11) || (p.state === "bat" && p.stateT > 0.16);
    if (p.state === "idle" || p.state === "walk" || canChain) {
      if (p.comboWin > 0 && p.comboStep === 1) {
        p.comboStep = 2; p.state = "bat";
      } else if (p.comboWin > 0 && p.comboStep === 2) {
        p.comboStep = 3; p.state = "thrust"; p.vx = p.facing * 190;
      } else {
        p.comboStep = 1; p.state = "jab";
      }
      p.stateT = 0; p.comboWin = 0.48; p.hitRegistered = false;
      SFX.swing(p.comboStep >= 2);
    }
  }

  function startGiuseppeHeavyOrSpecial() {
    const p = G.p;
    if (G.phase === "finish_him") { triggerFatalityStrike(); return; }
    if (G.phase !== "fighting") return;
    if (p.state === "hurt" || p.state === "ko" || p.dizzyT > 0) return;

    if (p.y < GROUND_Y - 4) {
      if (p.state !== "jump_slash") {
        p.state = "jump_slash"; p.stateT = 0; p.hitRegistered = false;
        SFX.swing(true);
      }
      return;
    }
    if (!(p.state === "idle" || p.state === "walk" || p.state === "crouch" || (p.state === "jab" && p.stateT > 0.12))) return;

    // Up + K -> Flaming Coal-Oven Peel Uppercut (Shoryuken!)
    if (keys.up) {
      p.state = "upper"; p.stateT = 0; p.hitRegistered = false;
      p.vy = -715; p.vx = p.facing * 205; p.invuln = 0.26;
      SFX.swing(true);
      addPopup(p.x, p.y - 195, "COAL UPPERCUT!", "#fb923c");
      return;
    }
    // Down + K -> Low Baker's Peel Ankle Sweep
    if (keys.down) {
      p.state = "sweep"; p.stateT = 0; p.hitRegistered = false;
      p.vx = p.facing * 285;
      SFX.swing(true);
      return;
    }
    // Forward + K -> 6-Foot Ash Peel Vault Thrust
    if (isHoldingForward()) {
      p.state = "thrust"; p.stateT = 0; p.hitRegistered = false;
      p.vx = p.facing * 320;
      SFX.swing(true);
      return;
    }
    // Neutral / Back + K -> Hurl 1919 Parlor Kitchen Item (San Marzano Tin -> Rectangular Olive Oil -> 00-Flour!)
    if (p.throwCd <= 0) {
      p.state = "throw"; p.stateT = 0; p.hitRegistered = false;
      p.throwCd = 0.62;
      p._thrown = false;
      SFX.throwItem();
    } else {
      // Fallback heavy bat swing while throw is cooling down
      p.state = "bat"; p.stateT = 0; p.hitRegistered = false;
      SFX.swing(true);
    }
  }

  function startGiuseppeSuper() {
    const p = G.p;
    if (G.phase === "finish_him") { triggerFatalityStrike(); return; }
    if (G.phase !== "fighting" || !p || p.ovenMeter < 100) return;
    if (p.state === "hurt" || p.state === "ko") return;

    p.ovenMeter = 0;
    p.y = GROUND_Y;
    p.vy = 0;
    p.state = "super";
    p.stateT = 0;
    p.superStage = 0;
    p.hitRegistered = false;
    p.invuln = 1.18;
    p.vx = p.facing * 470;
    G.superFreeze = 0.34;
    G.shake = 10;
    SFX.superFlash();
    setBanner("HYPER COMBO: LA FORNACE 1919!!", "#fb923c", 1.8);
    showBubble("giuseppe", "900 DEGREES OF MULBERRY STREET COAL!!", 1.9);
  }

  function setKeyState(code, isDown, isRepeat = false) {
    SFX.init();
    if (code === "KeyA" || code === "ArrowLeft") keys.left = isDown;
    if (code === "KeyD" || code === "ArrowRight") keys.right = isDown;
    if (code === "KeyW" || code === "ArrowUp") keys.up = isDown;
    if (code === "KeyS" || code === "ArrowDown") keys.down = isDown;

    if (!isDown || isRepeat) return;

    if (code === "Escape") {
      if (G.phase === "vs_intro") exitStage(true);
      else if (G.phase === "tally") exitStage(false);
      else finishMatch(false);
      return;
    }

    if (G.phase === "vs_intro") {
      if (["Enter", "NumpadEnter", "Space", "KeyJ", "KeyK", "KeyF"].includes(code)) startNewMatch(false);
      return;
    }
    if (G.phase === "victory_quote") {
      if (["Enter", "NumpadEnter", "Space", "KeyJ", "KeyK"].includes(code)) finishMatch(G.gWins >= 2);
      return;
    }
    if (G.phase === "tally") {
      if (code === "KeyR" || (!G.matchWon && (code === "Enter" || code === "NumpadEnter"))) {
        startNewMatch(true);
      } else if (code === "Enter" || code === "NumpadEnter" || code === "Space") {
        exitStage(false);
      }
      return;
    }

    if (code === "KeyJ" || code === "KeyF") startGiuseppeLight();
    else if (code === "KeyK" || code === "Space") startGiuseppeHeavyOrSpecial();
    else if (code === "KeyL" || code === "KeyE" || code === "ShiftLeft" || code === "ShiftRight") startGiuseppeSuper();
    else if ((code === "KeyW" || code === "ArrowUp") && G.phase === "fighting" && G.p && G.p.y >= GROUND_Y - 2 && G.p.dizzyT <= 0 && !["jab", "bat", "thrust", "sweep", "upper", "throw", "hurt", "ko", "super"].includes(G.p.state)) {
      G.p.vy = -785;
      G.p.state = "jump";
      G.p.stateT = 0;
      SFX.jump();
    }
  }

  function bindCanvasPointer(cvs) {
    if (!cvs || G._ptrCvs === cvs) return;
    G._ptrCvs = cvs;
    cvs.addEventListener("pointerdown", (e) => {
      if (!G.host || !G.host.isActive()) return;
      SFX.init();
      const r = cvs.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * W;
      const my = ((e.clientY - r.top) / r.height) * H;
      if (G.phase === "vs_intro") {
        if (mx >= 520 && mx <= 765 && my >= 500 && my <= 540) exitStage(true);
        else startNewMatch(false);
      } else if (G.phase === "finish_him") {
        triggerFatalityStrike();
      } else if (G.phase === "victory_quote") {
        finishMatch(G.gWins >= 2);
      } else if (G.phase === "tally") {
        if (mx >= 140 && mx <= 468 && my >= 456 && my <= 504) startNewMatch(true);
        else if (mx >= 492 && mx <= 820 && my >= 456 && my <= 504) exitStage(false);
      } else if (G.phase === "fighting") {
        if (mx > W * 0.5) startGiuseppeLight();
        else startGiuseppeHeavyOrSpecial();
      }
    });
  }

  // =========================================================================
  // DAMAGE, PROP BREAKING, DEFLECTION & ROUND RESOLUTION
  // =========================================================================
  function checkCornerPropBreak(wx) {
    G.props.forEach(pr => {
      if (pr.broken) return;
      if (Math.abs(wx - pr.x) < 88) {
        pr.broken = true;
        SFX.crateSmash();
        G.shake = Math.max(G.shake, 6);
        spawnSpark(pr.x, pr.y - 42, 1.25);
        // Spawn power-up item!
        G.items.push({ kind: pr.drop, x: pr.x, y: pr.y - 34, vy: -340, vx: pr.kind === "coop" ? 85 : -85 });
        addPopup(pr.x, pr.y - 96, pr.drop === "cannoli" ? "CANNOLI!" : "HARD SALAMI!", "#fde047");
        if (pr.kind === "coop") {
          for (let i = 0; i < 4; i++) {
            G.pigeons.push({ x: pr.x - 24 + i * 16, y: pr.y - 44, vx: 85 + i * 42, vy: -175 - i * 32, t: Math.random() });
          }
        }
      }
    });
  }

  function damageFanucci(rawDmg, knockX, label = null, canStagger = true, pierceArmor = false) {
    const p = G.p, b = G.b;
    if (!b || b.invuln > 0 || G.phase !== "fighting") return;
    const mult = p.salamiT > 0 ? 1.28 : 1.0;
    const dmg = Math.max(2, Math.round(rawDmg * mult));
    b.hp = Math.max(0, b.hp - dmg);
    if (p.state !== "super") {
      p.ovenMeter = Math.min(100, p.ovenMeter + Math.max(3, Math.round(dmg * 1.25)));
    }
    G.comboCount = (G.comboTimer > 0 ? G.comboCount : 0) + 1;
    G.comboDisp = G.comboCount;
    G.comboTimer = 1.35;

    spawnSpark(b.x - b.facing * 46, b.y - 165, dmg >= 12 ? 1.35 : 1.0);
    if (label) addPopup(b.x, b.y - 285, label, "#fde047");

    if (b.hp <= 0) {
      SFX.koEcho();
      G.hitStop = 0.16;
      G.shake = 10;
      handleRoundEnd("giuseppe");
      return;
    }

    // Juggernaut / E. Honda Boss Armor & Anti-Mash Poise Counter!
    if ((b.poiseArmorT > 0 || (b.armor > 0 && !pierceArmor)) && canStagger && p.state !== "super") {
      if (b.armor > 0) b.armor--;
      SFX.block();
      addPopup(b.x, b.y - 255, b.poiseArmorT > 0 ? "UNSTOPPABLE!" : "JUGGERNAUT ARMOR!", "#cbd5e1");
      return;
    }

    SFX.hit(dmg >= 11);
    G.hitStop = dmg >= 11 ? 0.06 : 0.038;
    if (dmg >= 11) G.shake = 6;
    if (canStagger && b.state !== "sky_leap" && b.state !== "sky_slam") {
      b.poiseHits = (b.poiseWin > 0 ? b.poiseHits : 0) + 1;
      b.poiseWin = 1.65;
      // After 3 rapid staggers (outside Hyper Combo), Fanucci flexes Black Hand Poise and counters!
      if (b.poiseHits >= 3 && p.state !== "super") {
        b.poiseHits = 0;
        b.poiseArmorT = 1.15;
        b.armor = 1;
        b.state = b.costume >= 2 && Math.abs(b.x - p.x) < 210 ? "slap" : (Math.abs(b.x - p.x) < 230 ? "belch" : "charge");
        b.stateT = 0;
        b._fired = false;
        b.hitRegistered = false;
        b.vx = 0;
        SFX.quake();
        addPopup(b.x, b.y - 292, "BLACK HAND POISE!!", "#f87171");
        return;
      }
      b.state = "hurt";
      b.stateT = 0;
      b.vx = knockX;
      checkCornerPropBreak(b.x + Math.sign(knockX) * 38);
    }
  }

  function damageGiuseppe(rawDmg, knockX, unblockable = false, highProjectile = false) {
    const p = G.p;
    if (!p || p.invuln > 0 || G.phase !== "fighting") return;

    // Ducking cleanly under Fanucci's spinning White Fedora!
    if (highProjectile && (p.state === "crouch" || p.state === "sweep")) {
      addPopup(p.x, p.y - 142, "DUCKED!", "#38bdf8");
      return;
    }

    const canBlock = !unblockable && p.y >= GROUND_Y - 3 && p.dizzyT <= 0 &&
      (isHoldingBack() || p.state === "block") &&
      !["jab", "bat", "thrust", "sweep", "upper", "throw", "hurt", "ko"].includes(p.state);

    if (canBlock) {
      const chip = Math.max(1, Math.round(rawDmg * 0.18));
      p.hp = Math.max(1, p.hp - chip); // chip doesn't KO unless 1 HP
      p.ovenMeter = Math.min(100, p.ovenMeter + 8);
      p.state = "block";
      p.stateT = 0;
      p.vx = knockX * 0.55;
      SFX.block();
      spawnSpark(p.x + p.facing * 44, p.y - 134, 0.85);
      addPopup(p.x, p.y - 198, "PEEL GUARD!", "#38bdf8");
      return;
    }

    p.hp = Math.max(0, p.hp - rawDmg);
    p.ovenMeter = Math.min(100, p.ovenMeter + 12);
    spawnSpark(p.x, p.y - 125, 1.15);
    SFX.hit(rawDmg >= 14);
    G.hitStop = 0.06;
    G.shake = 7;

    if (p.hp <= 0) {
      p.state = "ko";
      p.stateT = 0;
      p.vx = knockX * 0.7;
      SFX.koEcho();
      handleRoundEnd("fanucci");
      return;
    }

    p.state = "hurt";
    p.stateT = 0;
    p.invuln = 0.42;
    p.vx = knockX;
    checkCornerPropBreak(p.x + Math.sign(knockX) * 34);

    // Friendly 1919 Baker Assist once per round if Giuseppe gets beat down below 45% HP!
    if (!G.midRoundDropSent && p.hp <= 45) {
      G.midRoundDropSent = true;
      const dropX = Math.max(STAGE_LEFT + 110, Math.min(STAGE_RIGHT - 110, p.x + p.facing * 125));
      G.items.push({ kind: "cannoli", x: dropX, y: GROUND_Y - 220, vx: 0, vy: -120 });
      setBanner("MULBERRY BAKER TOSSED UP A FRESH CANNOLI!", "#4ade80", 1.4);
    }
  }

  function handleRoundEnd(winner) {
    G.projectiles = [];
    if (winner === "giuseppe") {
      G.gWins++;
      const tb = Math.max(5, Math.round(G.roundClock * 0.5));
      G.timeBonusTotal += tb;
      if (G.p.hp >= G.p.maxHp) G.perfectRounds++;

      // MATCH POINT -> TRIGGER "FINISH HIM!!" PIZZA-PEEL DECAPITATION MOMENT!
      if (G.gWins >= 2) {
        G.phase = "finish_him";
        G.phaseT = 0;
        G.b.hp = 0;
        G.b.y = GROUND_Y;
        G.b.vy = 0;
        G.b.vx = 0;
        G.b.hatOut = true; // hat knocked off, shiny bald dome exposed!
        G.b.state = "dizzy_bald";
        G.p.state = "idle";
        SFX.finishHim();
        setBanner("PRESS [J / K / SPACE] TO SLICE HIS HEAD OFF!!", "#f87171", 4.2);
        showBubble("fanucci", "UGH... NOT DA BRICK-OVEN PEEL... MAMMA MIA...", 3.5);
        syncHUD();
        return;
      }

      G.b.state = "ko";
      G.b.stateT = 0;
      G.b.hatOut = true;
      G.p.state = "victory";
      G.phase = "round_over";
      G.phaseT = 0;
      G._roundWinner = "giuseppe";
    } else {
      G.fWins++;
      G.p.state = "ko";
      G.b.state = "idle";
      G.phase = "round_over";
      G.phaseT = 0;
      G._roundWinner = "fanucci";
    }
    syncHUD();
  }

  // =========================================================================
  // ZOMBIE DON FANUCCI AI & ATTACK EXECUTION
  // =========================================================================
  function updateFanucciAI(dt) {
    const p = G.p, b = G.b;
    const dist = Math.abs(b.x - p.x);
    b.facing = p.x <= b.x ? -1 : 1;

    if (b.poiseWin > 0) { b.poiseWin = Math.max(0, b.poiseWin - dt); if (b.poiseWin === 0) b.poiseHits = 0; }
    if (b.poiseArmorT > 0) b.poiseArmorT = Math.max(0, b.poiseArmorT - dt);

    // Round 3 Mid-Boss Enrage ("NOBODY ROBS DON FANUCCI!!")
    if (b.costume === 3 && !b.enraged && b.hp > 0 && b.hp <= b.maxHp * 0.50) {
      b.enraged = true;
      b.poiseArmorT = 1.25;
      SFX.quake();
      G.shake = 10;
      setBanner("FANUCCI ENRAGED!! WATCH HIS 2-HIT BOSS CHAINS!", "#ef4444", 2.0);
      showBubble("fanucci", "NOBODY TAKES A SLICE OFF DON FANUCCI!!", 2.2);
    }

    if (b.blindedT > 0 && b.y >= GROUND_Y - 2) {
      b.blindedT = Math.max(0, b.blindedT - dt);
      b.vx *= 0.85;
      if (b.state === "sky_leap" || b.state === "sky_slam") { b.state = "idle"; b.stateT = 0; }
      return;
    } else if (b.blindedT > 0) {
      b.blindedT = Math.max(0, b.blindedT - dt);
    }

    // Check olive-oil slick puddle slip!
    for (let i = G.puddles.length - 1; i >= 0; i--) {
      const pd = G.puddles[i];
      if (b.y >= GROUND_Y - 2 && Math.abs(b.x - pd.x) < 58 && (Math.abs(b.vx) > 35 || b.state === "charge" || b.state === "walk")) {
        G.puddles.splice(i, 1);
        b.state = "hurt";
        b.stateT = -0.22; // slightly longer slip recovery!
        b.armor = 0;
        b.vx = b.facing * 115;
        SFX.oilSlip();
        addPopup(b.x, b.y - 275, "SLIPPED ON OLIO!!", "#facc15");
        return;
      }
    }

    const baseCd = b.costume === 1 ? 0.48 : (b.costume === 2 ? 0.35 : (b.enraged ? 0.18 : 0.25));

    if (b.state === "hurt") {
      b.vx *= 0.88;
      if (b.stateT >= 0.30) { b.state = "idle"; b.stateT = 0; b.aiCd = 0.18; }
      return;
    }

    if (b.state === "hat_throw") {
      b.vx *= 0.85;
      if (b.stateT >= 0.36 && !b._fired) {
        b._fired = true;
        b.hatOut = true;
        SFX.hatWhir();
        G.projectiles.push({
          owner: "b", kind: "hat",
          x: b.x + b.facing * 86, y: b.y - 172,
          vx: b.facing * (b.costume === 1 ? 445 : 515),
          vy: 0,
          boomerang: b.costume >= 2,
          returning: false,
          traveled: 0,
          rot: 0
        });
        addPopup(b.x, b.y - 285, "RAZOR FEDORA!", "#f8fafc");
      }
      if (b.stateT >= 0.66) { b.state = "idle"; b.stateT = 0; b.aiCd = b.moveQueue.length ? 0.10 : baseCd; }
      return;
    }

    if (b.state === "cigar") {
      b.vx *= 0.85;
      if (b.stateT >= 0.30 && !b._fired) {
        b._fired = true;
        SFX.throwItem();
        const cnt = (b.costume === 3 || (b.costume === 2 && b.hp < b.maxHp * 0.55)) ? 2 : 1;
        for (let k = 0; k < cnt; k++) {
          G.projectiles.push({
            owner: "b", kind: "stogie",
            x: b.x + b.facing * 78, y: b.y - 198 + k * 18,
            vx: b.facing * (365 + k * 90),
            vy: -165 - k * 55,
            deflected: false,
            rot: 0
          });
        }
      }
      if (b.stateT >= 0.62) { b.state = "idle"; b.stateT = 0; b.aiCd = b.moveQueue.length ? 0.12 : baseCd; }
      return;
    }

    if (b.state === "belch") {
      b.vx *= 0.82;
      if (b.stateT >= 0.38 && b.stateT <= 1.04) {
        if (!b._fired) { b._fired = true; SFX.belch(); }
        b.belchTick -= dt;
        if (b.belchTick <= 0) {
          b.belchTick = 0.10;
          G.projectiles.push({
            owner: "b", kind: "gas",
            x: b.x + b.facing * 86, y: b.y - 196 + (Math.random() - 0.5) * 26,
            vx: b.facing * (265 + Math.random() * 80),
            vy: -16 + (Math.random() - 0.5) * 40,
            life: 0.78, maxLife: 0.78
          });
        }
      }
      if (b.stateT >= 1.16) { b.armor = 0; b.state = "idle"; b.stateT = 0; b.aiCd = baseCd; }
      return;
    }

    if (b.state === "charge") {
      const spd = b.costume === 1 ? 425 : (b.costume === 2 ? 470 : (b.enraged ? 535 : 500));
      if (b.stateT < 0.22) {
        b.vx = 0; // brief shoulder-drop windup read!
      } else if (b.stateT < 0.84) {
        b.vx = b.facing * spd;
        if (!b.hitRegistered && Math.abs(b.x - p.x) < 106 && Math.abs((b.y - 115) - (p.y - 95)) < 105) {
          b.hitRegistered = true;
          damageGiuseppe(b.costume === 3 ? 20 : 16, b.facing * 295, false, false);
        }
      } else {
        b.vx *= 0.82;
      }
      if (b.stateT >= 1.04) { b.armor = 0; b.state = "idle"; b.stateT = 0; b.aiCd = baseCd + 0.08; }
      return;
    }

    if (b.state === "slap") {
      b.vx *= 0.82;
      if (b.stateT >= 0.24 && b.stateT <= 0.46 && !b.hitRegistered) {
        if (Math.abs((b.x + b.facing * 92) - p.x) < 104 && Math.abs(b.y - p.y) < 98) {
          b.hitRegistered = true;
          damageGiuseppe(b.costume === 3 ? 19 : 15, b.facing * 275, false, false);
        }
      }
      if (b.stateT >= 0.64) { b.armor = 0; b.state = "idle"; b.stateT = 0; b.aiCd = baseCd; }
      return;
    }

    if (b.state === "sky_leap") {
      // Harkonnen floating high jump tracking partway toward Giuseppe!
      b.vx = Math.max(-360, Math.min(360, (b.targetX - b.x) * 2.5));
      if (b.vy >= -40 || b.stateT >= 0.65) {
        b.state = "sky_slam";
        b.stateT = 0;
        b._landedAt = null;
        b.vy = Math.max(230, b.vy);
        b.hitRegistered = false;
      }
      return;
    }

    if (b.state === "sky_slam") {
      b.vx *= 0.90;
      if (b.y < GROUND_Y - 1) {
        if (!b.hitRegistered && Math.abs(b.x - p.x) < 108 && Math.abs(b.y - p.y) < 92) {
          b.hitRegistered = true;
          damageGiuseppe(21, b.facing * 285, false, false);
          if (G.phase !== "fighting") return;
        }
      } else {
        b.y = GROUND_Y; b.vy = 0; b.vx = 0;
        if (!b._slammed) {
          b._slammed = true;
          b._landedAt = b.stateT;
          SFX.quake();
          G.shake = 12;
          spawnSpark(b.x - 62, GROUND_Y - 10, 1.15);
          spawnSpark(b.x + 62, GROUND_Y - 10, 1.15);
          // Rooftop tremor stagger if Giuseppe is standing flat-footed without blocking or jumping!
          if (p.y >= GROUND_Y - 2 && !isHoldingBack() && p.invuln <= 0 && p.dizzyT <= 0) {
            if (Math.abs(b.x - p.x) < 138 && !b.hitRegistered) {
              b.hitRegistered = true;
              damageGiuseppe(17, b.facing * 245, false, false);
              if (G.phase !== "fighting") return;
            } else {
              p.dizzyT = 0.55;
              p.state = "hurt"; p.stateT = 0;
              addPopup(p.x, p.y - 198, "ROOF TREMOR! JUMP [W / UP]!", "#fbbf24");
            }
          }
        }
        if (b.stateT - (b._landedAt || 0) >= 0.34) {
          b.state = "idle"; b.stateT = 0; b.aiCd = baseCd;
        }
      }
      return;
    }

    // Idle / Menacing Boss Walk & Variety-Driven Decision Engine
    b.aiCd -= dt;
    if (dist > 220) {
      b.state = "walk";
      b.vx = b.facing * (b.costume === 1 ? 128 : (b.costume === 2 ? 150 : (b.enraged ? 188 : 170)));
    } else if (dist < 118) {
      b.vx = -b.facing * 68;
      b.state = "walk";
    } else {
      b.vx *= 0.8;
      b.state = "idle";
    }

    if (b.aiCd <= 0) {
      let pick = b.moveQueue.length ? b.moveQueue.shift() : null;
      if (!pick) {
        const pool = [];
        if (!b.hatOut && dist > 180) pool.push("hat_throw", "hat_throw", "hat_throw");
        if (dist > 155) pool.push("cigar", "cigar");
        if (dist < 320) pool.push("belch", "belch");
        if (dist > 135 && dist < 590) pool.push("charge", "charge");
        if (dist < 225) pool.push(b.costume >= 2 ? "slap" : "charge", b.costume >= 2 ? "slap" : "belch");
        if (b.costume >= 2 && dist > 140) pool.push("sky_leap", "sky_leap");
        // Filter out the most recent move so Fanucci showcases his full animation repertoire!
        const last = b.lastMoves[b.lastMoves.length - 1];
        const varied = pool.filter(m => m !== last);
        const srcPool = varied.length ? varied : pool;
        pick = srcPool[Math.floor(Math.random() * srcPool.length)] || "cigar";

        // Queue 2-Move Signature Boss Chains in Round 2 (low HP) & Round 3!
        if ((b.costume === 3 || (b.costume === 2 && b.hp < b.maxHp * 0.65)) && !b.moveQueue.length) {
          if (pick === "hat_throw") b.moveQueue.push(Math.random() < 0.6 ? "charge" : "cigar");
          else if (pick === "cigar" && b.enraged) b.moveQueue.push("sky_leap");
        }
      }
      b.lastMoves.push(pick);
      if (b.lastMoves.length > 3) b.lastMoves.shift();

      b.state = pick;
      b.stateT = 0;
      b._fired = false;
      b._slammed = false;
      b.hitRegistered = false;
      b.vx = 0;
      if (pick === "charge") {
        b.armor = 1;
        addPopup(b.x, b.y - 285, "BELLY JUGGERNAUT!", "#fb923c");
      } else if (pick === "slap") {
        b.armor = b.costume >= 2 ? 1 : 0;
      } else if (pick === "belch") {
        b.armor = 1;
        b.belchTick = 0;
      } else if (pick === "sky_leap") {
        b.vy = -835;
        b.targetX = Math.max(STAGE_LEFT + 90, Math.min(STAGE_RIGHT - 90, p.x));
        SFX.jump();
        addPopup(b.x, b.y - 290, "HARKONNEN SLAM!", "#f87171");
      }
    }
  }

  // =========================================================================
  // MAIN SIMULATION STEP
  // =========================================================================
  function stepSim(dt) {
    G.time += dt;
    if (G.bannerT > 0) G.bannerT = Math.max(0, G.bannerT - dt);
    if (G.bubble) { G.bubble.t -= dt; if (G.bubble.t <= 0) G.bubble = null; }
    if (G.shake > 0) G.shake = Math.max(0, G.shake - dt * 26);

    G.bgEmbers.forEach(e => {
      e.x = (e.x + e.vx * dt + W) % W;
      e.y -= e.vy * dt;
      if (e.y < -6) { e.y = H + 6; e.x = Math.random() * W; }
    });

    for (let i = G.sparks.length - 1; i >= 0; i--) {
      G.sparks[i].t += dt;
      if (G.sparks[i].t >= G.sparks[i].dur) G.sparks.splice(i, 1);
    }
    for (let i = G.popups.length - 1; i >= 0; i--) {
      G.popups[i].t += dt;
      if (G.popups[i].t >= G.popups[i].dur) G.popups.splice(i, 1);
    }
    for (let i = G.pigeons.length - 1; i >= 0; i--) {
      const pg = G.pigeons[i];
      pg.x += pg.vx * dt; pg.y += pg.vy * dt; pg.t += dt * 10;
      if (pg.y < -80 || pg.x < -80 || pg.x > WORLD_W + 80) G.pigeons.splice(i, 1);
    }
    for (let i = G.porcelain.length - 1; i >= 0; i--) {
      const pc = G.porcelain[i];
      pc.x += pc.vx * dt; pc.y += pc.vy * dt; pc.vy += 980 * dt; pc.rot += pc.vr * dt;
      if (!pc.shattered && pc.y >= GROUND_Y - 4) {
        pc.shattered = true;
        pc.vy = -150 - Math.random() * 80;
        pc.vx *= 0.55;
        if (pc.playSfx) SFX.cupShatter();
      }
      pc.life -= dt;
      if (pc.life <= 0) G.porcelain.splice(i, 1);
    }

    if (G.p) G.p.dispHp += (G.p.hp - G.p.dispHp) * Math.min(1, dt * 8);
    if (G.b) G.b.dispHp += (G.b.hp - G.b.dispHp) * Math.min(1, dt * 8);

    if (G.hitStop > 0) { G.hitStop = Math.max(0, G.hitStop - dt); return; }
    if (G.superFreeze > 0) { G.superFreeze = Math.max(0, G.superFreeze - dt); return; }

    // Camera smoothly frames both fighters on the 1360px rooftop
    if (G.p && G.b) {
      const midX = (G.p.x + G.b.x) * 0.5;
      const targetCamX = Math.max(0, Math.min(WORLD_W - W, midX - W * 0.5));
      G.camX += (targetCamX - G.camX) * Math.min(1, dt * 8);
      const minY = Math.min(G.p.y, G.b.y);
      const targetCamY = Math.max(-28, Math.min(0, (minY - GROUND_Y) * 0.14));
      G.camY += (targetCamY - G.camY) * Math.min(1, dt * 7);
    }

    // --- PHASE: ROUND INTRO (FANUCCI DANTILY SIPS TEENY ESPRESSO & TOSSES CUP/SAUCER!) ---
    if (G.phase === "round_intro") {
      G.phaseT += dt;
      G.p.animT += dt * 6;
      if (G.phaseT >= 0.30 && !G._espSlurped) {
        G._espSlurped = true;
        SFX.slurp();
        addPopup(G.b.x - 54, G.b.y - 275, "*PINKY-OUT SLURP!*", "#fef08a");
      }
      if (G.phaseT >= 1.38 && !G._espTossed) {
        G._espTossed = true;
        G.b.state = "esp_toss";
        SFX.throwItem();
        // Spawn flying demitasse cup & saucer spinning off behind Fanucci!
        G.porcelain.push(
          { spr: "esp_cup",    x: G.b.x + 42, y: G.b.y - 218, vx: 175, vy: -315, rot: 0, vr: 11, life: 1.4, shattered: false, playSfx: true },
          { spr: "esp_saucer", x: G.b.x + 22, y: G.b.y - 182, vx: 235, vy: -255, rot: 0, vr: -9, life: 1.4, shattered: false, playSfx: false }
        );
        const ri = ROUND_INTROS[Math.min(2, G.roundNum - 1)];
        showBubble("giuseppe", ri.gReply, 1.35);
      }
      if (G.phaseT >= 2.05 && !G._fightCalled) {
        G._fightCalled = true;
        G.b.state = "idle";
        SFX.announcerFight();
      }
      if (G.phaseT >= 2.65) {
        G.phase = "fighting";
        G.b.state = "idle";
      }
      return;
    }

    // --- PHASE: ROUND OVER ---
    if (G.phase === "round_over") {
      G.phaseT += dt;
      G.p.animT += dt * 5;
      if (G.p.y < GROUND_Y) { G.p.vy += 1720 * dt; G.p.y = Math.min(GROUND_Y, G.p.y + G.p.vy * dt); }
      if (G.b.y < GROUND_Y) { G.b.vy += 1720 * dt; G.b.y = Math.min(GROUND_Y, G.b.y + G.b.vy * dt); }
      if (G.phaseT >= 2.35) {
        if (G.fWins >= 2) {
          G.phase = "victory_quote";
          G.phaseT = 0;
        } else {
          beginRound(G.roundNum + 1);
        }
      }
      return;
    }

    // --- PHASE: FINISH HIM! (DAZED BALDING FANUCCI AWAITS PEEL DECAPITATION!) ---
    if (G.phase === "finish_him") {
      G.phaseT += dt;
      const p = G.p, b = G.b;
      p.animT += dt * 7; b.animT += dt * 6;
      const mv = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
      if (mv !== 0) {
        p.x = Math.max(STAGE_LEFT, Math.min(STAGE_RIGHT, p.x + mv * 310 * dt));
        p.state = "walk";
      } else {
        p.state = "idle";
      }
      p.facing = b.x >= p.x ? 1 : -1;
      if (p.y < GROUND_Y) { p.vy += 1750 * dt; p.y = Math.min(GROUND_Y, p.y + p.vy * dt); }
      // Auto-deliver fatality if player walks right up or timer hits 4.2s so nobody ever misses the payoff!
      if (G.phaseT >= 4.2) triggerFatalityStrike();
      return;
    }

    // --- PHASE: PIZZA-PEEL DECAPITATION FATALITY ANIMATION! ---
    if (G.phase === "fatality_anim") {
      G.phaseT += dt;
      const p = G.p, b = G.b;
      p.stateT += dt;
      if (G.phaseT >= 0.18 && !G._fatalitySliced) {
        G._fatalitySliced = true;
        G.hitStop = 0.16;
        G.shake = 14;
        SFX.decapSlice();
        spawnSpark(b.x, b.y - 246, 1.75);
        b.state = "headless_stand";
        setBanner("CLEAN SLICE!! RIGHT INTO DA SAN GENNARO CROWD!!", "#facc15", 3.2);
        // Launch Fanucci's severed balding head in a dramatic shrinking 3D perspective arc over the parapet down into Mulberry St!
        const vistaCenterScreenX = 480;
        const headStartScreenX = b.x - G.camX;
        G.severedHead = {
          sx: headStartScreenX,
          sy: b.y - 258,
          tx: vistaCenterScreenX + (Math.random() - 0.5) * 85,
          ty: 350, // right down into the burning Mulberry Street zombie mob!
          t: 0,
          dur: 1.85,
          splashed: false
        };
      }
      if (G.severedHead) {
        const sh = G.severedHead;
        sh.t += dt;
        if (sh.t >= sh.dur && !sh.splashed) {
          sh.splashed = true;
          G.shake = 7;
          addPopup(G.camX + sh.tx, sh.ty - 14, "CROWD CATCHES FANUCCI!!", "#4ade80");
        }
      }
      if (G.phaseT >= 1.25 && !G._fatalityBodyFell) {
        G._fatalityBodyFell = true;
        b.state = "headless_ko";
        p.state = "victory";
        SFX.quake();
        G.shake = 10;
        G.lootDrops.push(
          { spr: "loot_watch", x: b.x - 52, y: b.y - 125, vx: -85, vy: -290 },
          { spr: "loot_chest", x: b.x + 48, y: b.y - 125, vx: 90, vy: -320 }
        );
      }
      G.lootDrops.forEach(ld => {
        if (ld.y < GROUND_Y - 24 || ld.vy < 0) {
          ld.x += ld.vx * dt; ld.y += ld.vy * dt; ld.vy += 920 * dt;
          if (ld.y >= GROUND_Y - 24) { ld.y = GROUND_Y - 24; ld.vx = 0; ld.vy = 0; }
        }
      });
      if (G.phaseT >= 3.45) {
        G.phase = "victory_quote";
        G.phaseT = 0;
      }
      return;
    }

    if (G.phase !== "fighting") return;

    // --- ACTIVE FIGHTING STEP ---
    const p = G.p, b = G.b;
    G.roundClock = Math.max(0, G.roundClock - dt);
    if (G.roundClock <= 0) {
      const pPct = p.hp / p.maxHp, bPct = b.hp / b.maxHp;
      handleRoundEnd(pPct >= bPct ? "giuseppe" : "fanucci");
      return;
    }

    p.stateT += dt; p.animT += dt * 8;
    b.stateT += dt; b.animT += dt * 6;
    if (G.comboTimer > 0) { G.comboTimer = Math.max(0, G.comboTimer - dt); if (G.comboTimer === 0) G.comboCount = 0; }
    if (p.comboWin > 0) { p.comboWin = Math.max(0, p.comboWin - dt); if (p.comboWin === 0) p.comboStep = 0; }
    if (p.throwCd > 0) p.throwCd = Math.max(0, p.throwCd - dt);
    if (p.invuln > 0) p.invuln = Math.max(0, p.invuln - dt);
    if (p.salamiT > 0) p.salamiT = Math.max(0, p.salamiT - dt);
    if (p.dizzyT > 0) p.dizzyT = Math.max(0, p.dizzyT - dt);
    if (b.invuln > 0) b.invuln = Math.max(0, b.invuln - dt);

    // Giuseppe State Machine
    if (p.y >= GROUND_Y - 2 && ["idle", "walk", "crouch", "block"].includes(p.state)) {
      p.facing = b.x >= p.x ? 1 : -1;
    }

    if (p.state === "hurt") {
      p.vx *= 0.86;
      if (p.dizzyT <= 0 && p.stateT >= 0.30) { p.state = "idle"; p.stateT = 0; }
    } else if (p.state === "block") {
      p.vx *= 0.84;
      if (p.stateT >= 0.22 && !isHoldingBack()) { p.state = "idle"; p.stateT = 0; }
    } else if (p.state === "jab") {
      p.vx *= 0.82;
      if (p.stateT >= 0.08 && p.stateT <= 0.22 && !p.hitRegistered) {
        const hx = p.x + p.facing * 102;
        checkCornerPropBreak(hx);
        if (Math.abs(hx - b.x) < 92 && Math.abs(p.y - b.y) < 125) {
          p.hitRegistered = true;
          damageFanucci(6, p.facing * 95);
        }
      }
      if (p.stateT >= 0.27) { p.state = "idle"; p.stateT = 0; }
    } else if (p.state === "bat") {
      p.vx *= 0.84;
      if (p.stateT >= 0.10 && p.stateT <= 0.28 && !p.hitRegistered) {
        const hx = p.x + p.facing * 116;
        checkCornerPropBreak(hx);
        if (Math.abs(hx - b.x) < 104 && Math.abs(p.y - b.y) < 132) {
          p.hitRegistered = true;
          damageFanucci(9, p.facing * 165);
        }
      }
      if (p.stateT >= 0.36) { p.state = "idle"; p.stateT = 0; }
    } else if (p.state === "thrust") {
      p.vx *= 0.88;
      if (p.stateT >= 0.08 && p.stateT <= 0.30 && !p.hitRegistered) {
        const hx = p.x + p.facing * 148;
        checkCornerPropBreak(hx);
        if (Math.abs(hx - b.x) < 114 && Math.abs(p.y - b.y) < 122) {
          p.hitRegistered = true;
          damageFanucci(12, p.facing * 240, "PEEL THRUST!", true, true);
        }
      }
      if (p.stateT >= 0.42) { p.state = "idle"; p.stateT = 0; }
    } else if (p.state === "sweep") {
      p.vx *= 0.88;
      if (p.stateT >= 0.07 && p.stateT <= 0.26 && !p.hitRegistered) {
        const hx = p.x + p.facing * 112;
        checkCornerPropBreak(hx);
        if (Math.abs(hx - b.x) < 98 && Math.abs(p.y - b.y) < 76) {
          p.hitRegistered = true;
          damageFanucci(9, p.facing * 185, "ANKLE SWEEP!", true, true);
        }
      }
      if (p.stateT >= 0.36) { p.state = keys.down ? "crouch" : "idle"; p.stateT = 0; }
    } else if (p.state === "upper") {
      p.vx *= 0.94;
      if (p.stateT >= 0.05 && p.stateT <= 0.34 && !p.hitRegistered) {
        const hx = p.x + p.facing * 82;
        if (Math.abs(hx - b.x) < 106 && Math.abs((p.y - 125) - (b.y - 135)) < 155) {
          p.hitRegistered = true;
          damageFanucci(13, p.facing * 220, "COAL SHORYUKEN!", true, true);
        }
      }
      if (p.y >= GROUND_Y && p.stateT > 0.25) { p.state = "idle"; p.stateT = 0; }
    } else if (p.state === "super") {
      // 5-STAGE MARVEL-VS-CAPCOM "LA FORNACE 1919" HYPER COMBO!
      // Stage 1 (Jab Rush) -> Stage 2 (Bat Smash) -> Stage 3 (Ash Peel Vault + Parlor Barrage) -> Stage 4 & 5 (Rising Coal Shoryuken!)
      const dir = p.facing;
      const closeEnough = Math.abs((p.x + dir * 104) - b.x) < 142;
      if (p.stateT < 0.62) {
        // Magnetic dash toward Fanucci so the multi-hit hyper combo connects dramatically!
        const gap = (b.x - dir * 105) - p.x;
        p.vx = Math.abs(gap) > 16 ? Math.sign(gap) * Math.min(480, Math.abs(gap) * 6.5) : 0;
      } else {
        p.vx *= 0.90;
      }
      if (p.superStage === 0 && p.stateT >= 0.06) {
        p.superStage = 1;
        SFX.swing(false);
        if (closeEnough) damageFanucci(7, dir * 55, null, true, true);
      } else if (p.superStage === 1 && p.stateT >= 0.22) {
        p.superStage = 2;
        SFX.swing(true);
        if (closeEnough) damageFanucci(8, dir * 65, "OVEN FLURRY!", true, true);
      } else if (p.superStage === 2 && p.stateT >= 0.40) {
        p.superStage = 3;
        SFX.swing(true);
        G.projectiles.push(
          { owner: "g", kind: "tomato", x: p.x + dir * 68, y: p.y - 138, vx: dir * 520, vy: -85, rot: 0 },
          { owner: "g", kind: "oil",    x: p.x + dir * 50, y: p.y - 162, vx: dir * 405, vy: -225, rot: 0 },
          { owner: "g", kind: "flour",  x: p.x + dir * 82, y: p.y - 118, vx: dir * 580, vy: -35, rot: 0 }
        );
        if (closeEnough) damageFanucci(9, dir * 80, "PARLOR BARRAGE!", true, true);
      } else if (p.superStage === 3 && p.stateT >= 0.62) {
        p.superStage = 4;
        p.vy = -705;
        p.vx = dir * 165;
        SFX.jump();
        SFX.swing(true);
        if (Math.abs((p.x + dir * 92) - b.x) < 150) {
          damageFanucci(12, dir * 285, "LA FORNACE FINISHER!!", true, true);
        }
      }
      if (p.stateT >= 1.12 && p.y >= GROUND_Y - 2) { p.state = "idle"; p.stateT = 0; }
    } else if (p.state === "throw") {
      p.vx *= 0.82;
      if (p.stateT >= 0.13 && !p._thrown) {
        p._thrown = true;
        const item = THROW_BAG[G.bagIdx % THROW_BAG.length];
        G.bagIdx = (G.bagIdx + 1) % THROW_BAG.length;
        const d = p.facing;
        G.projectiles.push({
          owner: "g",
          kind: item.kind,
          x: p.x + d * 64,
          y: p.y - 138,
          vx: d * (item.kind === "tomato" ? 505 : (item.kind === "oil" ? 395 : 455)),
          vy: item.kind === "oil" ? -265 : (item.kind === "tomato" ? -115 : -85),
          rot: 0
        });
      }
      if (p.stateT >= 0.32) { p.state = "idle"; p.stateT = 0; }
    } else if (p.y < GROUND_Y - 2) {
      // Airborne control + Jump Slash hitbox
      const mv = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
      p.vx = mv * 275;
      if (p.state === "jump_slash" && p.stateT >= 0.05 && p.stateT <= 0.36 && !p.hitRegistered) {
        const hx = p.x + p.facing * 88;
        if (Math.abs(hx - b.x) < 102 && Math.abs((p.y - 65) - (b.y - 155)) < 135) {
          p.hitRegistered = true;
          damageFanucci(12, p.facing * 180, "AERIAL SLICE!");
        }
      }
    } else {
      // Ground movement / crouch
      if (keys.down) {
        p.state = "crouch"; p.vx = 0;
      } else {
        const mv = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
        if (mv !== 0) {
          p.vx = mv * 295;
          p.state = "walk";
        } else {
          p.vx = 0;
          p.state = "idle";
        }
      }
    }

    // Apply Giuseppe physics
    p.x += p.vx * dt;
    if (p.y < GROUND_Y || p.vy < 0) {
      p.vy += 1780 * dt;
      p.y += p.vy * dt;
      if (p.y >= GROUND_Y) {
        p.y = GROUND_Y; p.vy = 0;
        if (p.state === "jump" || p.state === "jump_slash" || p.state === "upper") {
          p.state = "idle"; p.stateT = 0;
        }
      }
    }

    // Update Zombie Don Fanucci AI & unconditional vertical gravity (never locks up in midair!)
    updateFanucciAI(dt);
    if (G.phase !== "fighting") return;
    b.x += b.vx * dt;
    if (b.y < GROUND_Y || b.vy < 0) {
      const bGrav = b.state === "sky_slam" ? 2350 : 1640;
      b.vy += bGrav * dt;
      b.y += b.vy * dt;
      if (b.y >= GROUND_Y) {
        b.y = GROUND_Y;
        b.vy = 0;
      }
    }

    // Fighter body push-box separation (unless jumping high over Fanucci!)
    if (Math.abs(p.y - b.y) < 98 && Math.abs(p.x - b.x) < 92) {
      const push = (92 - Math.abs(p.x - b.x)) * 0.5;
      const dir = p.x <= b.x ? -1 : 1;
      p.x += dir * push;
      b.x -= dir * push;
    }
    p.x = Math.max(STAGE_LEFT, Math.min(STAGE_RIGHT, p.x));
    b.x = Math.max(STAGE_LEFT + 28, Math.min(STAGE_RIGHT - 28, b.x));

    // Update Projectiles (with Pizza-Peel Stogie Deflection & Non-Deflectable Boomerang Fedora!)
    const peelSwinging = ["jab", "bat", "thrust", "upper", "jump_slash", "super"].includes(p.state);
    const peelBoxX = p.x + p.facing * 98, peelBoxY = p.y - 126;

    for (let i = G.projectiles.length - 1; i >= 0; i--) {
      if (G.phase !== "fighting") return;
      const pr = G.projectiles[i];
      if (!pr) continue;
      pr.x += pr.vx * dt;
      pr.y += (pr.vy || 0) * dt;
      pr.rot = (pr.rot || 0) + dt * 11;

      if (pr.kind === "tomato" || pr.kind === "flour") pr.vy += 280 * dt;
      else if (pr.kind === "oil") pr.vy += 620 * dt;
      else if (pr.kind === "stogie" && !pr.deflected) pr.vy += 335 * dt;

      if (pr.owner === "g") {
        // Check prop break & Fanucci hit!
        checkCornerPropBreak(pr.x);
        if (Math.abs(pr.x - b.x) < 82 && pr.y >= b.y - 280 && pr.y <= b.y - 14) {
          G.projectiles.splice(i, 1);
          if (pr.kind === "tomato") {
            SFX.tinClang();
            damageFanucci(9, Math.sign(pr.vx) * 145, "SAN MARZANO!");
          } else if (pr.kind === "oil") {
            SFX.tinClang();
            G.puddles.push({ x: b.x, y: GROUND_Y - 5, life: 5.5 });
            damageFanucci(8, Math.sign(pr.vx) * 120, "OLIO CAN!");
          } else if (pr.kind === "flour") {
            SFX.flourPoof();
            b.blindedT = 0.85;
            G.sparks.push({ flour: true, x: pr.x, y: pr.y, t: 0, dur: 0.45, sc: 1.25 });
            damageFanucci(6, Math.sign(pr.vx) * 90, "FLOUR BLINDED!");
          } else if (pr.kind === "stogie") {
            damageFanucci(15, Math.sign(pr.vx) * 240, "RETURN TO SENDER!!", true, true);
          }
          if (G.phase !== "fighting") return;
          continue;
        }
        if (pr.y >= GROUND_Y - 6) {
          if (pr.kind === "oil") {
            SFX.oilSlip();
            G.puddles.push({ x: pr.x, y: GROUND_Y - 5, life: 5.5 });
          } else if (pr.kind === "flour") {
            SFX.flourPoof();
            G.sparks.push({ flour: true, x: pr.x, y: GROUND_Y - 28, t: 0, dur: 0.42, sc: 1.1 });
          }
          G.projectiles.splice(i, 1);
          continue;
        }
      } else {
        // Fanucci Projectile!
        // 1) Stogie CAN be batted back by Giuseppe's Pizza Peel!
        if (pr.kind === "stogie" && peelSwinging && Math.hypot(pr.x - peelBoxX, pr.y - peelBoxY) < 92) {
          pr.owner = "g";
          pr.deflected = true;
          pr.vx = p.facing * 590;
          pr.vy = -45;
          G.stogiesDeflected++;
          p.ovenMeter = Math.min(100, p.ovenMeter + 18);
          SFX.deflect();
          G.hitStop = 0.045;
          spawnSpark(pr.x, pr.y, 1.15);
          addPopup(pr.x, pr.y - 32, "STOGIE BATTED BACK!", "#4ade80");
          continue;
        }
        // 2) White Fedora CANNOT be deflected — warn player to duck/jump if they swing at it!
        if (pr.kind === "hat") {
          pr.traveled += Math.abs(pr.vx) * dt;
          if (peelSwinging && !pr._warned && Math.hypot(pr.x - peelBoxX, pr.y - peelBoxY) < 84) {
            pr._warned = true;
            SFX.block();
            addPopup(pr.x, pr.y - 38, "NO DEFLECT! DUCK [S / DOWN]!", "#f87171");
          }
          if (!pr.returning && pr.boomerang && (pr.traveled > 560 || pr.x < STAGE_LEFT + 40 || pr.x > STAGE_RIGHT - 40)) {
            pr.returning = true;
            SFX.hatWhir();
          }
          if (pr.returning) {
            const dirToB = Math.sign(b.x - pr.x) || 1;
            pr.vx += dirToB * 1120 * dt;
            pr.vx = Math.max(-495, Math.min(495, pr.vx));
            if (Math.abs(pr.x - b.x) < 62) {
              b.hatOut = false; // Caught his fedora!
              G.projectiles.splice(i, 1);
              continue;
            }
          } else if (pr.x < STAGE_LEFT - 140 || pr.x > STAGE_RIGHT + 140) {
            b.hatOut = false;
            G.projectiles.splice(i, 1);
            continue;
          }
          if (!pr._hitG && Math.abs(pr.x - p.x) < 58 && p.y >= pr.y - 24 && (p.y - 195) <= pr.y + 22) {
            pr._hitG = true;
            damageGiuseppe(13, Math.sign(pr.vx) * 210, false, true);
            if (G.phase !== "fighting") return;
          }
          continue;
        }

        if (pr.kind === "gas") {
          pr.life -= dt;
          if (Math.abs(pr.x - p.x) < 54 && Math.abs(pr.y - (p.y - 115)) < 84) {
            G.projectiles.splice(i, 1);
            damageGiuseppe(12, Math.sign(pr.vx) * 185, false, false);
            if (G.phase !== "fighting") return;
            continue;
          }
          if (pr.life <= 0) G.projectiles.splice(i, 1);
          continue;
        }

        if (pr.kind === "stogie") {
          if (Math.abs(pr.x - p.x) < 46 && Math.abs(pr.y - (p.y - 115)) < 82) {
            G.projectiles.splice(i, 1);
            damageGiuseppe(10, Math.sign(pr.vx) * 165, false, false);
            if (G.phase !== "fighting") return;
            continue;
          }
          if (pr.y >= GROUND_Y - 6) {
            G.embers.push({ x: pr.x, y: GROUND_Y - 2, life: 2.6, tick: 0.2 });
            G.projectiles.splice(i, 1);
            continue;
          }
        }
      }
      if (pr.x < -140 || pr.x > WORLD_W + 140) {
        if (pr.kind === "hat") b.hatOut = false;
        G.projectiles.splice(i, 1);
      }
    }

    // Ground Olive-Oil Puddles & Cigar Embers & Power-Up Pickups
    for (let i = G.puddles.length - 1; i >= 0; i--) {
      G.puddles[i].life -= dt;
      if (G.puddles[i].life <= 0) G.puddles.splice(i, 1);
    }
    for (let i = G.embers.length - 1; i >= 0; i--) {
      const em = G.embers[i];
      em.life -= dt; em.tick -= dt;
      if (em.tick <= 0 && p.y >= GROUND_Y - 4 && Math.abs(p.x - em.x) < 34) {
        em.tick = 0.55;
        damageGiuseppe(6, (p.x >= em.x ? 1 : -1) * 125, false, false);
      }
      if (em.life <= 0) G.embers.splice(i, 1);
    }
    for (let i = G.items.length - 1; i >= 0; i--) {
      const it = G.items[i];
      if (it.y < GROUND_Y - 8 || it.vy < 0) {
        it.x = Math.max(STAGE_LEFT + 28, Math.min(STAGE_RIGHT - 28, it.x + it.vx * dt));
        it.y += it.vy * dt; it.vy += 920 * dt;
        if (it.y >= GROUND_Y - 8) { it.y = GROUND_Y - 8; it.vx = 0; it.vy = 0; }
      }
      if (Math.abs(p.x - it.x) < 62 && Math.abs(p.y - it.y) < 88) {
        if (it.kind === "cannoli") {
          p.hp = Math.min(p.maxHp, p.hp + 28);
          SFX.powerup(true);
          addPopup(p.x, p.y - 198, "HOLY CANNOLI! +28 HP", "#4ade80");
        } else {
          p.salamiT = 8.5;
          p.ovenMeter = Math.min(100, p.ovenMeter + 40);
          SFX.powerup(false);
          addPopup(p.x, p.y - 198, "HARD SALAMI POWER! 1.4X DMG!", "#fb923c");
        }
        G.items.splice(i, 1);
      }
    }

    syncHUD();
  }

  // =========================================================================
  // SPRITE SELECTION & MULTI-PLANE RENDERER
  // =========================================================================
  function getGiuseppeSprite(p) {
    if (p.state === "ko") return "g_ko";
    if (p.state === "victory") return "g_victory";
    if (p.state === "hurt") return "g_hurt";
    if (p.state === "block") return "g_block";
    if (p.state === "crouch") return "g_crouch";
    if (p.state === "jab") return p.stateT < 0.08 ? "g_jab_0" : "g_jab_1";
    if (p.state === "bat") return p.stateT < 0.10 ? "g_bat_0" : "g_bat_1";
    if (p.state === "thrust") return "g_thrust";
    if (p.state === "sweep") return "g_sweep";
    if (p.state === "super") {
      if (p.stateT < 0.08) return "g_jab_0";
      if (p.stateT < 0.20) return "g_jab_1";
      if (p.stateT < 0.29) return "g_bat_0";
      if (p.stateT < 0.40) return "g_bat_1";
      if (p.stateT < 0.62) return "g_thrust";
      return p.stateT < 0.70 ? "g_upper_0" : "g_upper_1";
    }
    if (p.state === "upper") return p.stateT < 0.07 ? "g_upper_0" : "g_upper_1";
    if (p.state === "throw") return p.stateT < 0.12 ? "g_throw_0" : "g_throw_1";
    if (p.y < GROUND_Y - 4) return p.state === "jump_slash" ? "g_jump_slash" : "g_jump_rise";
    if (p.state === "walk") return `g_walk_${Math.floor(p.animT) % 4}`;
    return `g_idle_${Math.floor(p.animT * 0.7) % 3}`;
  }

  function getFanucciSprite(b) {
    if (b.state === "dizzy_bald") return "f_dizzy_bald";
    if (b.state === "headless_stand") return "f_headless_stand";
    if (b.state === "headless_ko") return "f_headless_ko";

    const c = b.costume;
    if (b.state === "esp_sip") return `f${c}_esp_sip`;
    if (b.state === "esp_toss") return `f${c}_esp_toss`;
    if (b.state === "ko") return `f${c}_ko_bald`;

    if (b.state === "hurt") {
      if (c === 1) return b.hatOut ? "f1_hat_throw_bald" : "f1_hurt";
      return `f${c}_hurt_bald`;
    }
    if (b.state === "hat_throw") {
      if (c === 1 && b.stateT < 0.26) return "f1_hat_wind_bald";
      return `f${c}_hat_throw_bald`;
    }

    // Whenever his White Fedora is flying in midair, keep his shiny BALDING zombie dome visible!
    if (b.hatOut) {
      if (c === 2 && b.state === "slap") return "f2_slap_bald";
      if (c === 3) {
        if (b.state === "charge") return "f3_charge_bald";
        if (b.state === "slap") return "f3_slap_bald";
        if (b.state === "walk") return Math.floor(b.animT) % 2 === 0 ? "f3_walk_1_bald" : "f3_hat_throw_bald";
        return "f3_hat_throw_bald";
      }
      return `f${c}_hat_throw_bald`;
    }

    if (b.state === "cigar") return c === 2 ? "f2_slap" : `f${c}_cigar`;
    if (b.state === "belch") return `f${c}_belch`;
    if (b.state === "charge") return `f${c}_charge`;
    if (b.state === "slap") return c === 1 ? "f1_charge" : `f${c}_slap`;
    if (b.state === "sky_leap") return c === 2 ? "f2_sky_leap" : "f3_sky_slam";
    if (b.state === "sky_slam") return c === 2 ? "f2_sky_slam" : "f3_sky_slam";
    if (b.state === "walk") {
      const n = c === 1 ? 3 : 2;
      return `f${c}_walk_${Math.floor(b.animT) % n}`;
    }
    return `f${c}_idle_${Math.floor(b.animT * 0.55) % 2}`;
  }

  function lineItems1919(total) {
    if (total <= 0) return [
      { c: "$0", t: "NICK FILMS THE 1919 FLASHBACK IN HIS BASEMENT WITH A BEDSHEET" },
      { c: "$0", t: "COUSIN SALVO PLAYS DON FANUCCI IN A THRIFT-STORE BATHROBE" }
    ];
    const out = [
      { c: "$95", t: "1919 SAN GENNARO PERIOD COSTUME RENTAL & NEWSBOY CAPS" },
      { c: "$85", t: "3-GALLON JUG OF STAGE BLOOD & PROSTHETIC LATEX ZOMBIE NECK" }
    ];
    if (total >= 220) out.push(
      { c: "$55", t: "ANTIQUE GOLD POCKET WATCH PROP & MULBERRY ST. PERMIT FEE" }
    );
    const rem = total - out.reduce((s, r) => s + (parseInt(r.c.slice(1), 10) || 0), 0);
    if (rem > 0) out.push({ c: `$${rem}`, t: "ESPRESSO CART & FRESH CANNOLI CRAFT SERVICES FOR CAST" });
    return out;
  }

  function render(dispCtx) {
    const dispCvs = dispCtx.canvas;
    if (dispCvs.width !== 1920 || dispCvs.height !== 1080) {
      dispCvs.width = 1920;
      dispCvs.height = 1080;
    }
    dispCtx.imageSmoothingEnabled = false;

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (G.shake > 0.2) {
      ctx.translate(Math.round((Math.random() - 0.5) * G.shake), Math.round((Math.random() - 0.5) * G.shake));
    }

    // --- 1. 1919 NEW YORK WHEAT-PASTED BOXING POSTER CLOSE-UP (32-BIT CUTSCENE ART) ---
    if (G.phase === "vs_intro") {
      if (IMG.poster._ready) {
        ctx.drawImage(IMG.poster, 0, 0, W, H);
      } else {
        ctx.fillStyle = "#19100e";
        ctx.fillRect(0, 0, W, H);
        drawTxt("GIUSEPPE MARZANO V. DON FANUCCI", W / 2, H / 2 - 12, { scale: 2, fill: "#dfd2b4", align: "center", bold: true });
      }

      // Subtle, unobtrusive arcade prompts tucked in the dark brick margin below the poster (y = 508..534)
      const pulse = Math.floor(G.time * 3) % 2 === 0;
      box(212, 509, 256, 24, pulse ? "rgba(127, 29, 29, 0.92)" : "rgba(69, 10, 10, 0.92)", "#d6c38e");
      drawTxt("[ENTER] RING THE BELL!", 340, 518, { fill: "#fef3c7", outline: "#1c100d", align: "center", bold: true });

      box(524, 509, 224, 24, "rgba(28, 22, 20, 0.90)", "#78716c");
      drawTxt("[ESC] SKIP STAGE \x03", 636, 518, { fill: "#d6d3d1", outline: "#0c0a09", align: "center", bold: true });

      ctx.restore();
      dispCtx.drawImage(offCvs, 0, 0, dispCvs.width, dispCvs.height);
      return;
    }

    // --- 2. 5-PLANE ANIMATED 1919 SAN GENNARO PARALLAX STAGE (CPS-2 / MARVEL VS CAPCOM DEPTH!) ---
    // Plane 1 (0.14x scroll): Apocalyptic 1919 NYC Sunset Sky, East River & Manhattan Bridge
    const skyScroll = Math.round(G.camX * 0.14);
    const skyY = Math.round(-G.camY * 0.08);
    ctx.fillStyle = "#1c0d1a";
    ctx.fillRect(0, 0, W, H);
    if (IMG.sky._ready) {
      ctx.drawImage(IMG.sky, -skyScroll, skyY, 1060, 300);
    }
    // Animated drifting crimson/amber apocalypse cloud wisps & distant East River horizon fires
    for (let c = 0; c < 4; c++) {
      const cx = ((c * 290 + G.time * (14 + c * 4)) % (W + 260)) - 130;
      const cy = 44 + c * 28 + Math.sin(G.time * 1.4 + c) * 4;
      ctx.fillStyle = c % 2 === 0 ? "rgba(251, 146, 60, 0.09)" : "rgba(127, 29, 29, 0.14)";
      ctx.beginPath(); ctx.ellipse(Math.round(cx), Math.round(cy), 88 + c * 16, 12 + c * 3, 0, 0, Math.PI * 2); ctx.fill();
    }

    // Plane 2 (0.32x scroll): Far Lower East Side Water-Tower Tenements, Clotheslines & Rising Smoke Columns
    const farScroll = Math.round(G.camX * 0.32);
    const farY = Math.round(92 - G.camY * 0.18);
    const smokeFrame = Math.floor(G.time * 5.5) % 3;
    drawProp(`bg_smoke_${smokeFrame}`, 265 - farScroll, farY + 92, { scale: 0.95, alpha: 0.78 });
    drawProp(`bg_smoke_${(smokeFrame + 1) % 3}`, 895 - farScroll, farY + 86, { scale: 1.05, alpha: 0.82, flipX: true });
    if (IMG.far._ready) {
      ctx.drawImage(IMG.far, -farScroll, farY, 1180, 290);
    }
    // Animated flickering distant apartment windows on Plane 2
    for (let wIdx = 0; wIdx < 5; wIdx++) {
      const wx = 175 + wIdx * 208 - farScroll;
      const wy = farY + 148 + (wIdx % 2) * 32;
      const flk = Math.sin(G.time * (8 + wIdx * 2.7) + wIdx * 1.9);
      if (flk > 0.25) {
        ctx.fillStyle = `rgba(253, 224, 71, ${(0.18 + flk * 0.22).toFixed(2)})`;
        ctx.fillRect(wx, wy, 14, 20);
      }
    }

    // Plane 3 (0.52x scroll): Mulberry Street San Gennaro Festival Canyon, Chasing Light Arches,
    // Toppling Virgin Mary Float, Roaring Fires, Swarming 1919 Zombie Hordes & Fleeing Festival Crowd!
    const midScroll = Math.round(G.camX * 0.52);
    const midY = Math.round(16 - G.camY * 0.34);
    const canyonCx = 660 - midScroll; // True perspective vanishing center of Mulberry St!
    if (IMG.vista._ready) {
      ctx.drawImage(IMG.vista, -midScroll, midY, 1320, 460);
    }

    // Animated chasing Italian Festa di San Gennaro arch bulbs & short-circuit electrical sparks!
    const chaseStep = Math.floor(G.time * 10);
    for (let bi = 0; bi < 19; bi++) {
      const u = (bi / 18) * 2 - 1; // -1 .. +1 across foreground festival arch
      const bx = canyonCx + u * 285;
      const by = midY + 132 + u * u * 78;
      const lit = (bi + chaseStep) % 3 === 0;
      ctx.fillStyle = lit ? "#fef9c3" : (bi % 3 === 0 ? "#4ade80" : (bi % 3 === 1 ? "#ffffff" : "#f87171"));
      ctx.fillRect(Math.round(bx) - 2, Math.round(by) - 2, lit ? 5 : 3, lit ? 5 : 3);
    }
    if (chaseStep % 14 === 0) {
      drawProp("vfx_spark", canyonCx + ((chaseStep % 2 === 0) ? -148 : 156), midY + 162, { scale: 0.28, alpha: 0.85 });
    }

    // Soft pulsing San Gennaro street-arch festival glow
    const pulse = 0.17 + Math.sin(G.time * 8.5) * 0.06;
    const rg = ctx.createRadialGradient(canyonCx, midY + 285, 14, canyonCx, midY + 285, 220);
    rg.addColorStop(0, `rgba(251, 191, 36, ${pulse.toFixed(3)})`);
    rg.addColorStop(1, "rgba(251, 191, 36, 0)");
    ctx.fillStyle = rg;
    ctx.fillRect(canyonCx - 225, midY + 65, 450, 420);

    // Billowing smoke & roaring fires on overturned Mulberry St vendor carts + Virgin Mary Processional Float!
    const floatRound = (G.phase === "finish_him" || G.phase === "fatality_anim" || G.roundNum >= 3) ? 3 : G.roundNum;
    const floatSpr = `float_r${Math.min(3, floatRound)}`;
    const floatRockX = Math.sin(G.time * (floatRound >= 2 ? 7.5 : 3.5)) * (floatRound >= 2 ? 4.5 : 1.5);
    const floatTilt = floatRound >= 2 ? Math.sin(G.time * 6.2) * 0.045 : 0;
    const floatSx = canyonCx + floatRockX;
    const floatSy = midY + 356; // Fully visible above the low MvC rooftop parapet (y=374)!
    const fi = Math.floor(G.time * 9) % 3;

    drawProp(`bg_smoke_${(smokeFrame + 2) % 3}`, floatSx - 8, floatSy - 76, { scale: 0.92, alpha: 0.76 });
    drawProp(`bg_fire_${fi}`, canyonCx - 152, floatSy + 10, { scale: 0.72 });
    drawProp(`bg_fire_${(fi + 1) % 3}`, canyonCx + 154, floatSy + 12, { scale: 0.76 });

    // Animated Panicked 1919 Festival Vendor & Woman scurrying across Mulberry Street!
    const crowdCycle = (G.time * 0.38) % 2; // 0..1 right, 1..2 left
    const crowdDir = crowdCycle < 1 ? 1 : -1;
    const crowdU = crowdCycle < 1 ? crowdCycle : (2 - crowdCycle);
    const crowdX = canyonCx - 118 + crowdU * 236;
    const crowdFr = Math.floor(G.time * 8.5) % 4;
    drawProp(`bg_crowd_${crowdFr}`, crowdX, floatSy - 8, { scale: 0.64, flipX: crowdDir < 0 });

    // Virgin Mary Statue Float being rocked & toppled in the center of Mulberry St!
    drawProp(floatSpr, floatSx, floatSy, { scale: 0.88, rot: floatTilt });
    if (floatRound >= 2) drawProp(`bg_fire_${(fi + 2) % 3}`, floatSx - 54, floatSy + 4, { scale: 0.74 });
    if (floatRound >= 3) drawProp(`bg_fire_${fi}`, floatSx + 48, floatSy - 6, { scale: 0.86 });

    // Animated 1919 Zombie Horde Clusters shambling & lunging inward from both sides of Mulberry Street!
    const zmSeq = [0, 1, 2, 1];
    const zmA = zmSeq[Math.floor(G.time * 6.2) % 4];
    const zmB = zmSeq[(Math.floor(G.time * 5.8) + 2) % 4];
    const surgeA = Math.sin(G.time * 1.5) * 22;
    const surgeB = Math.cos(G.time * 1.35) * 22;
    drawProp(`bg_zmob_${zmA}`, canyonCx - 106 + surgeA, floatSy + 16, { scale: 0.76 });
    drawProp(`bg_zmob_${zmB}`, canyonCx + 108 + surgeB, floatSy + 18, { scale: 0.76, flipX: true });

    // Distant splash spark when Fanucci's severed head lands in the Mulberry Street zombie crowd!
    if (G.severedHead && G.severedHead.splashed) {
      const spT = G.severedHead.t - G.severedHead.dur;
      if (spT < 0.65) drawProp("vfx_spark", G.severedHead.tx, G.severedHead.ty, { scale: 0.65 + spT * 0.9, alpha: 1 - spT / 0.65 });
    }

    // Plane 4 (0.76x scroll): Close-Midground Flanking Tenement Fire-Escape Wings + Climbing Zombies!
    const wingScroll = Math.round(G.camX * 0.76);
    const wingY = Math.round(14 - G.camY * 0.56);
    if (IMG.wings._ready) {
      ctx.drawImage(IMG.wings, -wingScroll, wingY, 1480, 390);
    }
    // Animated 1919 Ghouls climbing hand-over-hand up the Left & Right iron fire-escape ladders!
    const climbStepL = Math.floor(G.time * 4.8) % 4;
    const climbSprL = (climbStepL === 1 || climbStepL === 3) ? "bg_climber_1" : "bg_climber_0";
    const climbFlipL = climbStepL === 2;
    const climbYL = wingY + 335 - ((G.time * 24) % 195);
    drawProp(climbSprL, 242 - wingScroll, climbYL, { scale: 0.82, flipX: climbFlipL });

    const climbStepR = Math.floor(G.time * 5.2 + 2) % 4;
    const climbSprR = (climbStepR === 1 || climbStepR === 3) ? "bg_climber_1" : "bg_climber_0";
    const climbFlipR = climbStepR === 0;
    const climbYR = wingY + 340 - (((G.time * 21) + 95) % 195);
    drawProp(climbSprR, 1236 - wingScroll, climbYR, { scale: 0.82, flipX: climbFlipR });

    // Perched NYC Pigeons pecking/flapping on the iron fire-escape railings
    drawProp(Math.floor(G.time * 3.2) % 5 === 0 ? "pigeon_0" : "pigeon_1", 318 - wingScroll, wingY + 132, { scale: 0.62 });
    drawProp(Math.floor(G.time * 3.6 + 2) % 5 === 0 ? "pigeon_0" : "pigeon_1", 1162 - wingScroll, wingY + 132, { scale: 0.62, flipX: true });

    // Darken sky crimson during "FINISH HIM!!" & Super Freeze!
    if (G.phase === "finish_him" || G.phase === "fatality_anim" || G.superFreeze > 0) {
      ctx.fillStyle = G.superFreeze > 0 ? "rgba(124, 45, 18, 0.42)" : "rgba(69, 10, 10, 0.46)";
      ctx.fillRect(0, 0, W, H);
    }

    // Severed Head AFTER crossing behind the parapet (t >= 0.48 -> shrinking down into Mulberry St canyon!)
    if (G.severedHead && G.severedHead.t >= 0.48 && !G.severedHead.splashed) {
      const sh = G.severedHead, u = Math.min(1, sh.t / sh.dur);
      const hx = sh.sx + (sh.tx - sh.sx) * u;
      const hy = sh.sy + (sh.ty - sh.sy) * u - Math.sin(u * Math.PI) * 245;
      const sc = Math.max(0.16, 1.04 * (1 - u * 0.84));
      drawProp(Math.floor(sh.t * 14) % 2 === 0 ? "head_fly_0" : "head_fly_1", hx, hy, { scale: sc, rot: sh.t * 13 });
    }

    // Startled NYC Pigeons flying over the parapet
    G.pigeons.forEach(pg => {
      drawProp(Math.floor(pg.t) % 2 === 0 ? "pigeon_0" : "pigeon_1", pg.x - G.camX, pg.y - G.camY, { flipX: pg.vx < 0 });
    });

    // Plane 5 (1.00x scroll): Close-Up Marvel-vs-Capcom Scale 1640px Rooftop Arena + Low Brick Parapet!
    if (IMG.roof._ready) {
      ctx.drawImage(IMG.roof, Math.round(-G.camX), Math.round(288 - G.camY));
    } else {
      ctx.fillStyle = "#292524"; ctx.fillRect(0, 390, W, 150);
    }

    // Breakable SF2 Corner Props (Pigeon Coop Left, OLIO D'OLIVA Crates Right)
    G.props.forEach(pr => {
      const nm = pr.kind === "coop" ? (pr.broken ? "coop_smashed" : "coop_intact") : (pr.broken ? "crate_smashed" : "crate_intact");
      drawProp(nm, pr.x - G.camX, pr.y - G.camY);
    });

    // Olive-Oil Slick Puddles & Compact Cigar Ground Embers
    G.puddles.forEach(pd => {
      drawProp("proj_oil_puddle", pd.x - G.camX, pd.y - G.camY, { alpha: Math.min(1, pd.life) });
    });
    G.embers.forEach(em => {
      drawProp("proj_ember", em.x - G.camX, em.y - G.camY, { scale: 0.82 + Math.sin(G.time * 18) * 0.08 });
    });

    // Fighter Ground Shadows (MvC Juggernaut vs. Morrigan proportions!)
    const p = G.p, b = G.b;
    if (p && b) {
      ctx.fillStyle = "rgba(0,0,0,0.46)";
      ctx.beginPath(); ctx.ellipse(Math.round(p.x - G.camX), Math.round(GROUND_Y - G.camY + 3), 48, 12, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(Math.round(b.x - G.camX), Math.round(GROUND_Y - G.camY + 4), 78, 17, 0, 0, Math.PI * 2); ctx.fill();

      // Draw Fanucci & Giuseppe (attacker drawn on top!)
      const gOnTop = ["jab", "bat", "thrust", "sweep", "upper", "jump_slash", "super"].includes(p.state) || G.phase === "fatality_anim";
      const renderB = () => {
        if ((b.poiseArmorT > 0 || b.enraged) && Math.floor(G.time * 18) % 2 === 0) {
          ctx.fillStyle = b.poiseArmorT > 0 ? "rgba(250, 204, 21, 0.24)" : "rgba(220, 38, 38, 0.20)";
          ctx.beginPath(); ctx.ellipse(Math.round(b.x - G.camX), Math.round(b.y - G.camY - 148), 96, 146, 0, 0, Math.PI * 2); ctx.fill();
        }
        drawFighter(getFanucciSprite(b), b.x, b.y, b.facing);
        if (b.blindedT > 0) drawTxt("*FLOUR BLINDED!*", b.x - G.camX, b.y - G.camY - 304, { fill: "#ffffff", align: "center", bold: true });
        if (G.phase === "finish_him") {
          for (let s = 0; s < 3; s++) {
            const ang = G.time * 5.5 + s * 2.09;
            drawTxt("*", b.x - G.camX + Math.cos(ang) * 42, b.y - G.camY - 294 + Math.sin(ang) * 11, { scale: 2, fill: "#fde047", align: "center" });
          }
        }
        // Comic arcade neck-fountain droplets right after peel decapitation!
        if (b.state === "headless_stand") {
          for (let k = 0; k < 5; k++) {
            const dy = ((G.time * 150 + k * 24) % 54);
            ctx.fillStyle = k % 2 === 0 ? "#dc2626" : "#65a30d";
            ctx.fillRect(Math.round(b.x - G.camX - 14 + (k - 2) * 8), Math.round(b.y - G.camY - 252 - dy), 5, 6);
          }
        }
      };
      const renderP = () => {
        if ((p.salamiT > 0 || p.state === "super") && Math.floor(G.time * 18) % 2 === 0) {
          ctx.fillStyle = p.state === "super" ? "rgba(249, 115, 22, 0.36)" : "rgba(251, 146, 60, 0.24)";
          ctx.beginPath(); ctx.ellipse(Math.round(p.x - G.camX), Math.round(p.y - G.camY - 104), p.state === "super" ? 82 : 64, p.state === "super" ? 116 : 102, 0, 0, Math.PI * 2); ctx.fill();
        }
        const blink = p.invuln > 0 && p.state !== "upper" && p.state !== "super" && Math.floor(G.time * 20) % 2 === 0;
        if (!blink) drawFighter(getGiuseppeSprite(p), p.x, p.y, p.facing);
        if (p.state === "super") {
          drawProp(`bg_fire_${Math.floor(G.time * 16) % 3}`, p.x - G.camX + p.facing * 68, p.y - G.camY - 82, { scale: 0.92 });
        }
        if (p.dizzyT > 0) drawTxt("STAGGERED!", p.x - G.camX, p.y - G.camY - 218, { fill: "#fbbf24", align: "center", bold: true });
      };
      if (gOnTop) { renderB(); renderP(); } else { renderP(); renderB(); }
    }

    // Power-up Pickups (Compact Cannoli & Hard Salami!) & Post-Fatality Tribute Drops
    G.items.forEach(it => {
      const bob = Math.sin(G.time * 7) * 4;
      drawProp(it.kind === "cannoli" ? "item_cannoli" : "item_salami", it.x - G.camX, it.y - G.camY + bob);
      drawTxt(it.kind === "cannoli" ? "+HP CANNOLI" : "SALAMI 1.3X", it.x - G.camX, it.y - G.camY - 46 + bob, { fill: "#fde047", align: "center", bold: true });
    });
    G.lootDrops.forEach(ld => drawProp(ld.spr, ld.x - G.camX, ld.y - G.camY));

    // Flying Teeny Espresso Cup & Saucer!
    G.porcelain.forEach(pc => {
      drawProp(pc.spr, pc.x - G.camX, pc.y - G.camY, { rot: pc.rot, alpha: Math.min(1, pc.life * 2) });
    });

    // Severed Head BEFORE crossing the parapet (t < 0.48 -> foreground launch!)
    if (G.severedHead && G.severedHead.t < 0.48) {
      const sh = G.severedHead, u = sh.t / sh.dur;
      const hx = sh.sx + (sh.tx - sh.sx) * u;
      const hy = sh.sy + (sh.ty - sh.sy) * u - Math.sin(u * Math.PI) * 245;
      drawProp(Math.floor(sh.t * 14) % 2 === 0 ? "head_fly_0" : "head_fly_1", hx, hy, { scale: 1.04 * (1 - u * 0.84), rot: sh.t * 13 });
    }

    // Active Projectiles
    G.projectiles.forEach(pr => {
      const sx = pr.x - G.camX, sy = pr.y - G.camY;
      if (pr.kind === "tomato") {
        drawProp(Math.floor(G.time * 12) % 2 === 0 ? "proj_tomato_0" : "proj_tomato_1", sx, sy, { rot: pr.rot * 0.5 });
      } else if (pr.kind === "oil") {
        drawProp("proj_oil_can", sx, sy, { rot: pr.rot * 0.4 });
      } else if (pr.kind === "flour") {
        drawProp("proj_flour_scoop", sx, sy, { flipX: pr.vx < 0 });
      } else if (pr.kind === "hat") {
        drawProp(Math.floor(G.time * 18) % 2 === 0 ? "proj_hat_0" : "proj_hat_1", sx, sy);
      } else if (pr.kind === "stogie") {
        drawProp("proj_stogie", sx, sy, { flipX: pr.vx < 0, rot: pr.deflected ? pr.rot : 0 });
      } else if (pr.kind === "gas") {
        const u = 1 - pr.life / pr.maxLife, r = Math.round(20 + u * 26);
        ctx.fillStyle = "rgba(132, 204, 22, 0.72)";
        ctx.beginPath(); ctx.arc(Math.round(sx), Math.round(sy), r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(190, 242, 100, 0.65)";
        ctx.beginPath(); ctx.arc(Math.round(sx - 7), Math.round(sy - 6), Math.round(r * 0.62), 0, Math.PI * 2); ctx.fill();
      }
    });

    // Hit Sparks, Flour Clouds, Plane-6 (1.24x Foreground Parallax!) Rising Embers & Popups
    G.sparks.forEach(sp => {
      const u = sp.t / sp.dur;
      drawProp(sp.flour ? "proj_flour_cloud" : "vfx_spark", sp.x - G.camX, sp.y - G.camY, { scale: sp.sc * (0.75 + u * 0.55), alpha: 1 - u });
    });
    const fgScroll = G.camX * 1.24;
    G.bgEmbers.forEach((e, idx) => {
      const ex = ((e.x - fgScroll * (idx % 2 === 0 ? 1.0 : 0.65)) % W + W) % W;
      ctx.fillStyle = e.sz > 2 ? "#fb923c" : "#fde047";
      ctx.fillRect(Math.round(ex), Math.round(e.y), e.sz, e.sz);
    });
    G.popups.forEach(pp => {
      drawTxt(pp.text, pp.x - G.camX, pp.y - G.camY - (pp.t / pp.dur) * 26, { fill: pp.color, align: "center", bold: true });
    });

    // --- 3. STREET FIGHTER II ARCADE TOP HUD ---
    if (p && b && G.phase !== "victory_quote" && G.phase !== "tally") {
      // Portraits
      box(14, 12, 54, 58, "#1e293b", "#facc15");
      drawProp("port_giuseppe_vs", 41, 42, { scale: 0.42 });
      box(W - 68, 12, 54, 58, "#29141b", "#ef4444");
      drawProp(b.hp <= 0 && G.gWins >= 2 ? "port_fanucci_lose" : "port_fanucci_vs", W - 41, 42, { flipX: true, scale: 0.41 });

      // Lifebars (drain inward toward center KO / Clock badge, classic SF2!)
      const barW = 342, barH = 20;
      // Giuseppe Left Lifebar
      box(76, 18, barW, barH, "#450a0a", "#f8fafc");
      const gRedW = Math.round((barW - 4) * (p.dispHp / p.maxHp));
      const gYelW = Math.round((barW - 4) * (p.hp / p.maxHp));
      ctx.fillStyle = "#dc2626"; ctx.fillRect(78 + (barW - 4 - gRedW), 20, gRedW, barH - 4);
      ctx.fillStyle = p.salamiT > 0 ? "#fb923c" : "#facc15"; ctx.fillRect(78 + (barW - 4 - gYelW), 20, gYelW, barH - 4);
      ctx.fillStyle = "#fef08a"; ctx.fillRect(78 + (barW - 4 - gYelW), 20, gYelW, 4);
      drawTxt("GIUSEPPE", 78, 44, { fill: "#fde047", bold: true });

      // Round win markers (Giuseppe)
      for (let w = 0; w < 2; w++) {
        box(378 + w * 20, 42, 15, 13, w < G.gWins ? "#facc15" : "#1e293b", "#fef08a");
        if (w < G.gWins) drawTxt("V", 386 + w * 20, 45, { fill: "#090812", outline: "#fef08a", align: "center", bold: true });
      }

      // Fanucci Right Lifebar
      const fx = W - 76 - barW;
      box(fx, 18, barW, barH, "#450a0a", "#f8fafc");
      const fRedW = Math.round((barW - 4) * (b.dispHp / b.maxHp));
      const fYelW = Math.round((barW - 4) * (b.hp / b.maxHp));
      ctx.fillStyle = "#dc2626"; ctx.fillRect(fx + 2, 20, fRedW, barH - 4);
      ctx.fillStyle = "#facc15"; ctx.fillRect(fx + 2, 20, fYelW, barH - 4);
      ctx.fillStyle = "#fef08a"; ctx.fillRect(fx + 2, 20, fYelW, 4);
      const suitTag = b.costume === 1 ? "BLACK COAT" : (b.costume === 2 ? "WHITE SUIT" : "VEST & SHIRT");
      drawTxt(`DON FANUCCI (${suitTag})`, W - 78, 44, { fill: "#f87171", align: "right", bold: true });

      for (let w = 0; w < 2; w++) {
        box(fx + w * 20, 42, 15, 13, w < G.fWins ? "#ef4444" : "#1e293b", "#fca5a5");
        if (w < G.fWins) drawTxt("V", fx + 8 + w * 20, 45, { fill: "#ffffff", align: "center", bold: true });
      }

      // Center Arcade Timer
      box(W / 2 - 44, 10, 88, 44, "#0f172a", "#f59e0b");
      drawTxt(String(Math.ceil(G.roundClock)).padStart(2, "0"), W / 2, 20, { scale: 3, fill: G.roundClock <= 15 ? "#f87171" : "#fde047", align: "center", bold: true, hi: "#ffffff" });
      drawTxt(`ROUND ${G.roundNum}`, W / 2, 58, { fill: "#e2e8f0", align: "center", bold: true });

      // Bottom-Left Giuseppe Coal-Oven Super Bar & [K / SPACE] Next 1919 Throw Item Badge!
      const nextIt = THROW_BAG[G.bagIdx % THROW_BAG.length];
      box(16, H - 36, 236, 24, "rgba(15,23,42,0.92)", p.ovenMeter >= 100 ? "#facc15" : "#64748b");
      const mw = Math.round(230 * (p.ovenMeter / 100));
      ctx.fillStyle = p.ovenMeter >= 100 && Math.floor(G.time * 10) % 2 === 0 ? "#fde047" : "#ea580c";
      ctx.fillRect(19, H - 33, mw, 18);
      drawTxt(p.ovenMeter >= 100 ? "[L / E] SUPER READY!!" : `COAL OVEN: ${p.ovenMeter}%`, 134, H - 28, { fill: "#ffffff", align: "center", bold: true });

      box(260, H - 36, 256, 24, "rgba(15,23,42,0.92)", nextIt.color);
      drawTxt(`[K / SPACE] NEXT: ${nextIt.label}`, 388, H - 28, { fill: nextIt.color, align: "center", bold: true });

      // Live Arcade Combo Counter (MvC / Street Fighter Alpha style!)
      if (G.comboTimer > 0 && G.comboDisp >= 2) {
        const cCol = G.comboDisp >= 4 ? "#fb923c" : "#facc15";
        drawTxt(`${G.comboDisp} HITS!!`, 96, 134, { scale: 3, fill: cCol, hi: "#fef9c3", align: "center", bold: true });
        drawTxt(G.comboDisp >= 5 ? "LA FORNACE HYPER!!" : "PARLOR COMBO!", 96, 166, { fill: "#fde047", align: "center", bold: true });
      }
    }

    // Speech Bubble & Center Callouts
    if (G.bubble) {
      const isF = G.bubble.who === "fanucci";
      box(130, 78, 700, 32, isF ? "#29141b" : "#0f172a", isF ? "#f87171" : "#38bdf8");
      drawTxt(`${isF ? "FANUCCI" : "GIUSEPPE"}: "${G.bubble.text}"`, W / 2, 90, { fill: isF ? "#fecaca" : "#fef08a", align: "center", bold: true });
    } else if (G.bannerT > 0 && G.bannerMsg) {
      box(150, 80, 660, 28, "rgba(9,8,18,0.92)", G.bannerCol);
      drawTxt(G.bannerMsg, W / 2, 90, { fill: G.bannerCol, align: "center", bold: true });
    }

    // Giant Street Fighter II Center Announcer Banners!
    if (G.phase === "round_intro" && G.phaseT >= 1.55) {
      const call = G.phaseT < 2.08 ? (G.roundNum === 3 && G.gWins === 1 && G.fWins === 1 ? "FINAL ROUND" : `ROUND ${G.roundNum}`) : "FIGHT!!";
      drawTxt(call, W / 2, 210, { scale: 4, fill: call === "FIGHT!!" ? "#ef4444" : "#facc15", align: "center", bold: true, hi: "#fef08a" });
    } else if (G.phase === "round_over") {
      const koTxt = G.roundClock <= 0 ? "TIME OVER!" : (G._roundWinner === "giuseppe" && G.p.hp >= G.p.maxHp ? "PERFECT!!" : "K.O.!!");
      drawTxt(koTxt, W / 2, 192, { scale: 4, fill: "#ef4444", align: "center", bold: true, hi: "#fef08a" });
      drawTxt(G._roundWinner === "giuseppe" ? "GIUSEPPE WINS THE ROUND!" : "DON FANUCCI TAKES THE ROUND!", W / 2, 244, { scale: 2, fill: "#facc15", align: "center", bold: true });
    } else if (G.phase === "finish_him") {
      const flash = Math.floor(G.time * 9) % 2 === 0;
      drawTxt("FINISH HIM!!", W / 2, 148, { scale: 4, fill: flash ? "#ef4444" : "#facc15", align: "center", bold: true, hi: "#ffffff" });
      drawTxt("SWING PIZZA PEEL [J / K / SPACE] FOR ROOFTOP FATALITY!", W / 2, 196, { scale: 2, fill: "#fef08a", align: "center", bold: true });
    }

    // --- 4. CLASSIC STREET FIGHTER II POST-MATCH BRUISED PORTRAIT SCREEN ---
    if (G.phase === "victory_quote") {
      ctx.fillStyle = "rgba(9, 7, 15, 0.88)";
      ctx.fillRect(0, 0, W, H);
      box(90, 56, 780, 428, "#140f1d", G.gWins >= 2 ? "#facc15" : "#ef4444");
      drawTxt(G.gWins >= 2 ? "GIUSEPPE MARZANO WINS!!" : "ZOMBIE DON FANUCCI WINS!", W / 2, 82, { scale: 3, fill: G.gWins >= 2 ? "#facc15" : "#ef4444", align: "center", bold: true, hi: "#fef08a" });

      box(170, 138, 220, 210, "#1e293b", "#38bdf8");
      drawProp(G.gWins >= 2 ? "port_giuseppe_win" : "port_giuseppe_vs", 280, 232, { scale: 1.32 });
      drawTxt("GIUSEPPE", 280, 326, { fill: "#fde047", align: "center", bold: true });

      drawTxt(`${G.gWins} - ${G.fWins}`, W / 2, 232, { scale: 3, fill: "#ffffff", align: "center", bold: true });

      box(570, 138, 220, 210, "#29141b", "#ef4444");
      drawProp(G.gWins >= 2 ? "port_fanucci_lose" : "port_fanucci_vs", 680, 232, { flipX: true, scale: 1.28 });
      drawTxt(G.gWins >= 2 ? "FANUCCI (DECAPITATED)" : "DON FANUCCI", 680, 326, { fill: "#f87171", align: "center", bold: true });

      const q1 = G.gWins >= 2
        ? "\"TELL EVERY BLACK-HAND GHOUL ON MULBERRY STREET: MARZANO'S PIES AIN'T FREE!\""
        : "\"TOO SCRAWNY, KID! NEXT TIME BRING MORE CANNOLI FOR DON FANUCCI!\"";
      drawTxt(q1, W / 2, 378, { fill: "#fef08a", align: "center", bold: true });
      box(310, 418, 340, 40, "#f59e0b", "#fef08a");
      drawTxt("[ENTER / SPACE] SEE THE NUMBERS \x03", W / 2, 434, { fill: "#090812", outline: "#fef08a", align: "center", bold: true });
    }

    // --- 5. "THE NUMBERS" CAMPAIGN PAYOUT / REMATCH ($0 REWARD) TALLY ---
    if (G.phase === "tally") {
      const curFund = G.host && G.host.getAccountCash ? G.host.getAccountCash() : G.banked;
      ctx.fillStyle = "rgba(9, 7, 15, 0.92)";
      ctx.fillRect(0, 0, W, H);
      box(76, 26, 808, 488, "#0f172a", G.matchWon ? "#facc15" : "#ef4444");

      drawTxt("THE NUMBERS", W / 2, 46, { scale: 3, fill: G.matchWon ? "#facc15" : "#f87171", align: "center", bold: true, hi: "#fef08a" });
      drawTxt(
        G.matchWon
          ? (G.fatalityDone ? "FANUCCI'S HEAD SENT INTO MULBERRY ST. • 1919 HEIRLOOM SECURED!" : "FANUCCI DEFEATED ACROSS 3 ROUNDS ON MULBERRY ST.!")
          : "GIUSEPPE KNOCKED OFF THE ROOF — REMATCH ($0) OR HEAD TO STATEN ISLAND!",
        W / 2, 82, { fill: "#cbd5e1", align: "center", bold: true }
      );

      const rawTot = G.matchWon ? (185 + (G.fWins === 0 ? 45 : 0) + G.perfectRounds * 35 + (G.fatalityDone ? 40 : 0) + G.timeBonusTotal) : 0;
      box(108, 104, 744, 62, "#1e293b", G.isReplay ? "#f59e0b" : "#4ade80");
      drawProp("loot_watch", 148, 135, { scale: 0.72 });
      if (!G.matchWon) {
        drawTxt(`MATCH LOST (${G.gWins}-${G.fWins}) • HIT [R] OR [ENTER] FOR FREE REMATCH ($0 PAYOUT)`, 192, 118, { fill: "#fca5a5", bold: true });
        drawTxt(`CURRENT FILM FUND: $${curFund}`, 192, 140, { fill: "#94a3b8" });
      } else if (G.isReplay) {
        drawTxt(`REMATCH / REPLAY SCORE: $${rawTot} (${G.gWins}-${G.fWins} • STOGIES BATTED: ${G.stogiesDeflected})`, 192, 118, { fill: "#fde047", bold: true });
        drawTxt(`REMATCH AWARDS $0 TO ACCOUNT • FILM FUND: $${curFund}`, 192, 140, { fill: "#94a3b8" });
      } else {
        drawTxt(`HEIRLOOM WATCH: +$185 • SWEEP/FATALITY/TIME: +$${rawTot - 185}`, 192, 118, { fill: "#e2e8f0", bold: true });
        drawTxt(`BANKED TO NICK'S FILM FUND: +$${G.lastBanked} (TOTAL: $${curFund})`, 192, 140, { fill: "#4ade80", bold: true });
      }
      drawTxt(G.isReplay || !G.matchWon ? "+$0 BANKED" : `+$${G.lastBanked}`, 832, 128, { scale: 2, fill: G.isReplay || !G.matchWon ? "#fbbf24" : "#4ade80", align: "right", bold: true });

      drawTxt("1919 FLASHBACK LINE ITEMS UNLOCKED FOR 'MADONNA & CHILD':", 110, 184, { fill: "#fde047", bold: true });
      lineItems1919(rawTot).forEach((row, idx) => {
        const ry = 206 + idx * 54;
        box(108, ry, 744, 42, "rgba(30,41,59,0.88)", "#334155");
        drawTxt(row.c, 126, ry + 16, { scale: 2, fill: "#4ade80", bold: true });
        drawTxt(`* ${row.t}`, 212, ry + 18, { fill: "#f8fafc", bold: true });
      });

      box(140, 456, 328, 42, "#1e293b", "#f59e0b");
      drawTxt("[R] REMATCH ($0 REWARD)", 304, 473, { fill: "#fde047", align: "center", bold: true });
      box(492, 456, 328, 42, "#22c55e", "#bbf7d0");
      drawTxt("[ENTER] TO STATEN ISLAND \x03", 656, 473, { fill: "#090812", outline: "#bbf7d0", align: "center", bold: true });
    }

    ctx.restore();
    dispCtx.drawImage(offCvs, 0, 0, dispCvs.width, dispCvs.height);
  }

  window.addEventListener("keyup", (e) => {
    if (G.host && G.host.isActive()) setKeyState(e.code, false, false);
  });

  window.Stage3FanucciBrawl = {
    launch(host) {
      G.host = host;
      G._lastHud = "";
      keys.left = keys.right = keys.up = keys.down = false;
      const cvs = document.getElementById("minigame-canvas") || document.getElementById("rooftop-canvas");
      if (cvs) {
        cvs.width = 1920;
        cvs.height = 1080;
        bindCanvasPointer(cvs);
      }
      G.isReplay = G.officialBankedDone;
      G.phase = "vs_intro";
      G.time = 0;
      BGM.play(0.36);
      syncHUD();
    },
    setKeyState,
    handleKey(code) { setKeyState(code, true, false); },
    skip() {
      if (G.phase === "vs_intro") exitStage(true);
      else if (G.phase === "tally") exitStage(false);
      else finishMatch(false);
    },
    stopAudio() { BGM.stop(); },
    statusLabel,
    getBanked() { return G.banked; },
    updateAndDraw(dispCtx, dt) {
      stepSim(Math.min(0.05, Math.max(0.001, dt)));
      render(dispCtx);
    },
    // Playtest / Standalone Dev Helpers
    devJumpRound(r) {
      SFX.init();
      BGM.play(0.48);
      G.gWins = r === 3 ? 1 : (r === 2 ? 1 : 0);
      G.fWins = r === 3 ? 1 : 0;
      beginRound(Math.max(1, Math.min(3, r | 0)));
    },
    devTriggerFinishHim() {
      SFX.init();
      BGM.play(0.48);
      makeFightersForRound(3);
      G.roundNum = 3;
      G.gWins = 2;
      G.fWins = 1;
      G.b.hp = 0;
      G.b.dispHp = 0;
      G.b.hatOut = true;
      G.b.state = "dizzy_bald";
      G.phase = "finish_him";
      G.phaseT = 0;
      SFX.finishHim();
      setBanner("PRESS [J / K / SPACE] TO SLICE HIS HEAD OFF!!", "#f87171", 4.2);
    },
    previewTally() {
      G.gWins = 2; G.fWins = 0; G.perfectRounds = 1; G.timeBonusTotal = 42; G.stogiesDeflected = 3; G.fatalityDone = true;
      finishMatch(true);
    },
    resetOfficialForTest() {
      G.officialBankedDone = false; G.isReplay = false; G.banked = 0; G.lastBanked = 0;
      syncHUD();
    }
  };
})();
