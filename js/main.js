/* Page flow: home (gift) → hub (4 tiles) → photos / music / letter / cake */
(function () {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- fill in art + name ---------- */
  ART.tulipsTag = () => ART.tulips(true);
  $$("[data-art]").forEach(el => { el.innerHTML = ART[el.dataset.art](); });
  $$("[data-name]").forEach(el => { el.textContent = CONFIG.name; });

  /* ---------- router ---------- */
  const pages = ["home", "hub", "photos", "music", "letter", "cake"];
  const visited = new Set();
  function go(id) {
    pages.forEach(p => { document.getElementById(p).hidden = p !== id; });
    if (id !== "home" && id !== "hub") visited.add(id);
    $$(".tile").forEach(t => t.classList.toggle("visited", visited.has(t.dataset.go)));
    window.scrollTo({ top: 0, behavior: "auto" });
    if (id === "letter") resetLetter();
    if (id === "cake") resetCake();
    // back on the hub after seeing everything → a little celebration
    if (id === "hub" && visited.size === 4 && !go.celebrated) { go.celebrated = true; setTimeout(() => Confetti.rain(140), 300); }
  }
  $$("[data-go]").forEach(b => b.addEventListener("click", () => go(b.dataset.go)));

  /* ---------- home: open the gift ---------- */
  $("#gift").addEventListener("click", e => {
    const g = e.currentTarget;
    if (g.classList.contains("open")) return;
    g.classList.add("open");
    const start = Number(CONFIG.startSong) || 0;
    if (start > 0 && start < Player.songs.length) Player.select(start); else Player.play();
    $("#mini").hidden = false;
    const r = g.getBoundingClientRect();
    Confetti.burst(r.left + r.width / 2, r.top + r.height * 0.35, 80);
    setTimeout(() => go("hub"), reduceMotion ? 200 : 1100);
  });

  /* ---------- photos ---------- */
  const tilts = ["-3deg", "2.5deg", "-1.5deg", "3deg", "-2.5deg", "1.5deg", "-2deg", "2deg"];
  const lifts = ["0px", "14px", "-6px", "8px", "-2px", "12px", "4px", "-8px"];
  function polaroidInner(p, i) {
    const img = p.src ? `<img src="${esc(p.src)}" alt="${esc(p.caption || "")}" loading="lazy">` : ART.scene(i);
    return `<div class="photo">${img}</div><p class="cap">${esc(p.caption || "")}</p>`;
  }
  CONFIG.photos.forEach((p, i) => {
    const b = document.createElement("button");
    b.className = "polaroid";
    b.style.setProperty("--r", tilts[i % tilts.length]);
    b.style.setProperty("--y", lifts[i % lifts.length]);
    b.style.setProperty("--t", (i % 2 ? 4 : -5) + "deg");
    b.setAttribute("aria-label", "Open photo " + (p.caption || i + 1));
    b.innerHTML = polaroidInner(p, i);
    b.addEventListener("click", () => openPhoto(p, i));
    $("#polaroids").appendChild(b);
  });
  function openPhoto(p, i) {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `<div class="polaroid" role="dialog" aria-label="${esc(p.caption || "photo")}">${polaroidInner(p, i)}</div>`;
    const close = () => { lb.remove(); document.removeEventListener("keydown", onKey); };
    const onKey = ev => { if (ev.key === "Escape") close(); };
    lb.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    document.body.appendChild(lb);
  }

  /* ---------- music ---------- */
  const fmt = s => { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
  const PLAY = '<path d="M8 5v14l11-7z"/>', PAUSE = '<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>';
  const favs = new Set();
  let shownIdx = -1;

  Player.songs.forEach((s, i) => {
    const c = document.createElement("button");
    c.className = "chip";
    c.textContent = s.title;
    c.addEventListener("click", () => Player.select(i));
    $("#playlist").appendChild(c);
  });
  if (Player.songs.length < 2) $("#playlist").hidden = true;

  Player.onChange(s => {
    if (s.idx !== shownIdx) {
      shownIdx = s.idx;
      $("#songTitle").textContent = s.song.title || "";
      $("#songArtist").textContent = s.song.artist || "";
      $("#cover").innerHTML = s.song.cover ? `<img src="${esc(s.song.cover)}" alt="">` : ART.scene(s.idx + 1);
      $$(".chip").forEach((c, i) => c.classList.toggle("on", i === s.idx));
      $("#fav").classList.toggle("on", favs.has(s.idx));
    }
    const pct = s.dur ? (s.cur / s.dur) * 100 : 0;
    $("#barFill").style.width = pct + "%";
    $("#bar").setAttribute("aria-valuenow", Math.round(pct));
    $("#tCur").textContent = fmt(s.cur);
    $("#tDur").textContent = fmt(s.dur);
    $("#playIcon").innerHTML = s.playing ? PAUSE : PLAY;
    $("#play").setAttribute("aria-label", s.playing ? "Pause" : "Play");
    $("#vinyl").classList.toggle("spin", s.playing);
    $("#mini").classList.toggle("on", s.playing);
    $("#mini").setAttribute("aria-label", s.playing ? "Pause music" : "Play music");
  });

  $("#play").addEventListener("click", () => Player.toggle());
  $("#next").addEventListener("click", () => Player.next());
  $("#prev").addEventListener("click", () => Player.prev());
  $("#mini").addEventListener("click", () => Player.toggle());
  $("#bar").addEventListener("click", e => {
    const r = e.currentTarget.getBoundingClientRect();
    Player.seek((e.clientX - r.left) / r.width);
  });
  $("#fav").addEventListener("click", e => {
    const i = shownIdx;
    favs.has(i) ? favs.delete(i) : favs.add(i);
    e.currentTarget.classList.toggle("on", favs.has(i));
    if (favs.has(i)) { const r = e.currentTarget.getBoundingClientRect(); Confetti.burst(r.left + r.width / 2, r.top, 24); }
  });

  /* ---------- flowers + letter ---------- */
  function resetLetter() {
    $("#bouquet").classList.remove("given");
    $("#bouquetHint").hidden = false;
    $("#letterBody").hidden = true;
  }
  $("#bouquet").addEventListener("click", e => {
    const b = e.currentTarget;
    if (b.classList.contains("given")) return;
    b.classList.add("given");
    $("#bouquetHint").hidden = true;
    const L = CONFIG.letter, el = $("#letterBody");
    el.innerHTML = `<p class="dear">${esc(L.greeting)}</p>` +
      L.paragraphs.map((t, i) => `<p style="--i:${i}">${esc(t)}</p>`).join("") +
      `<p class="sign" style="--i:${L.paragraphs.length}">${esc(L.signature)}</p>`;
    setTimeout(() => {
      el.hidden = false;
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }, 500);
  });

  /* ---------- cake ---------- */
  const candles = () => $$("#cakeArt .candle");
  function resetCake() {
    candles().forEach(c => c.classList.remove("out"));
    $("#wish").textContent = "close your eyes, then blow out each candle";
  }
  const steps = ["two more…", "one last candle…"];
  function blowOut(c) {
    if (c.classList.contains("out")) return;
    c.classList.add("out");
    Player.blow();
    const left = candles().filter(x => !x.classList.contains("out")).length;
    if (left) { $("#wish").textContent = steps[3 - left - 1] || "…"; return; }
    $("#wish").textContent = CONFIG.wishText;
    Confetti.rain(180);
  }
  candles().forEach(c => {
    c.addEventListener("click", () => blowOut(c));
    c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); blowOut(c); } });
  });

  go("home");
})();
