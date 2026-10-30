/* Playlist player
   - Songs with an mp3 `src` play through an <audio> element.
   - A song with an empty `src` plays a synthesized music-box "Happy Birthday"
     (public-domain melody) through the Web Audio API.
   Browsers only allow sound after a tap, so play() is always called from a click. */
(function () {
  const songs = (window.CONFIG && CONFIG.songs && CONFIG.songs.length)
    ? CONFIG.songs
    : [{ title: "Happy Birthday", artist: "a little music box, for you", src: "" }];

  let idx = 0, playing = false, listeners = [];
  let ctx = null, boxOut = null, boxStart = 0, boxPausedAt = 0, raf = null;
  const audio = new Audio();
  audio.preload = "auto";

  /* ---------- music box ---------- */
  const N = { G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 };
  const tune = [
    ["G4",.75],["G4",.25],["A4",1],["G4",1],["C5",1],["B4",2],
    ["G4",.75],["G4",.25],["A4",1],["G4",1],["D5",1],["C5",2],
    ["G4",.75],["G4",.25],["G5",1],["E5",1],["C5",1],["B4",1],["A4",2],
    ["F5",.75],["F5",.25],["E5",1],["C5",1],["D5",1],["C5",3]
  ];
  const BEAT = 0.46;
  const BOX_LEN = tune.reduce((a, [, b]) => a + b, 0) * BEAT * 2 + 1.5; // melody twice

  function getCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function scheduleBox() {
    const c = getCtx(); if (!c) return;
    boxOut = c.createGain(); boxOut.gain.value = 0.45; boxOut.connect(c.destination);
    let t = c.currentTime + 0.1;
    boxStart = t;
    for (let rep = 0; rep < 2; rep++) {
      tune.forEach(([n, b]) => {
        [1, 2, 3.01].forEach((m, k) => {
          const o = c.createOscillator(), g = c.createGain();
          o.type = k ? "triangle" : "sine";
          o.frequency.value = N[n] * m;
          const peak = [0.32, 0.07, 0.03][k];
          g.gain.setValueAtTime(0.0001, t);
          g.gain.exponentialRampToValueAtTime(peak, t + 0.01);
          g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(b * BEAT, 0.6) + 0.6);
          o.connect(g).connect(boxOut);
          o.start(t); o.stop(t + b * BEAT + 1.3);
        });
        t += b * BEAT;
      });
      t += 0.6;
    }
  }
  function killBox() {
    if (boxOut) { try { boxOut.disconnect(); } catch (e) {} boxOut = null; }
  }

  /* ---------- state ---------- */
  const isBox = () => !songs[idx].src;
  function time() {
    if (isBox()) {
      if (!boxOut) return { cur: boxPausedAt, dur: BOX_LEN };
      return { cur: Math.min(BOX_LEN, Math.max(0, ctx.currentTime - boxStart)), dur: BOX_LEN };
    }
    return { cur: audio.currentTime || 0, dur: isFinite(audio.duration) ? audio.duration : 0 };
  }
  function emit() {
    const s = { idx, playing, song: songs[idx], songs, ...time() };
    listeners.forEach(fn => fn(s));
  }
  // 4 updates per second is plenty for a progress bar and keeps the phone free to play audio smoothly
  function tick() {
    if (!playing) { clearInterval(raf); raf = null; return; }
    emit();
    if (isBox() && time().cur >= BOX_LEN - 0.05) next();
  }
  function startTick() { if (!raf) raf = setInterval(tick, 250); }

  function play() {
    if (isBox()) {
      const c = getCtx(); if (!c) return;
      if (!boxOut) scheduleBox();
      else c.resume();
    } else {
      audio.play().catch(() => {});
    }
    playing = true;
    startTick();
    emit();
  }
  function pause() {
    if (isBox()) { if (ctx) ctx.suspend(); }
    else audio.pause();
    playing = false;
    emit();
  }
  function load(i) {
    const wasPlaying = playing;
    audio.pause();
    killBox();
    if (ctx && ctx.state === "suspended") ctx.resume();
    boxPausedAt = 0;
    idx = (i + songs.length) % songs.length;
    if (!isBox()) { audio.src = songs[idx].src; audio.load(); }
    playing = false;
    if (wasPlaying) play(); else emit();
  }
  function next() { playing = true; load(idx + 1); }
  function prev() {
    if (time().cur > 3 && !isBox()) { audio.currentTime = 0; emit(); return; }
    playing = true; load(idx - 1);
  }
  function seek(f) { if (!isBox() && audio.duration) { audio.currentTime = f * audio.duration; emit(); } }

  audio.addEventListener("ended", next);
  audio.addEventListener("pause", () => { if (playing && !audio.ended && !isBox()) { playing = false; emit(); } });
  audio.addEventListener("play", () => { if (!playing) { playing = true; startTick(); emit(); } });
  audio.addEventListener("loadedmetadata", emit);
  audio.addEventListener("error", () => { console.warn("Could not load", songs[idx].src); });

  if (!isBox()) audio.src = songs[0].src;

  /* candle-blow whoosh */
  let fxCtx = null; // separate context so pausing music never mutes the whoosh
  function blow() {
    // iPhone can stutter an mp3 when a second sound engine starts, so stay quiet while a song plays
    if (playing && !isBox()) return;
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    const c = fxCtx || (fxCtx = new AC());
    if (c.state === "suspended") c.resume();
    const len = c.sampleRate * 0.35, buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) * 0.5;
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    f.type = "bandpass"; f.frequency.value = 900; g.gain.value = 0.5;
    s.buffer = buf; s.connect(f).connect(g).connect(c.destination); s.start();
  }

  window.Player = {
    songs, play, pause, next, prev, seek, blow,
    select(i) { playing = true; load(i); },
    toggle() { playing ? pause() : play(); },
    isPlaying: () => playing,
    onChange(fn) { listeners.push(fn); fn({ idx, playing, song: songs[idx], songs, ...time() }); }
  };
})();
