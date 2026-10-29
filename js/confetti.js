/* Confetti + little hearts drawn on a full-screen canvas */
(function () {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cv = document.getElementById("confetti");
  const cx = cv.getContext("2d");
  const colors = ["#efc3cb", "#a24f66", "#f7dde1", "#d6ad62", "#bcd2a6", "#fffaf5"];
  let parts = [];
  let raf = null;

  function size() {
    const dpr = window.devicePixelRatio || 1;
    cv.width = innerWidth * dpr;
    cv.height = innerHeight * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size();
  addEventListener("resize", size);

  function add(x, y, vx, vy) {
    parts.push({
      x, y, vx, vy,
      rot: Math.random() * 6,
      vr: (Math.random() - 0.5) * 0.3,
      s: 6 + Math.random() * 7,
      c: colors[(Math.random() * colors.length) | 0],
      heart: Math.random() < 0.35,
      life: 0
    });
  }

  function heart(s) {
    cx.beginPath();
    cx.moveTo(0, s * 0.3);
    cx.bezierCurveTo(-s, -s * 0.4, -s * 0.4, -s, 0, -s * 0.35);
    cx.bezierCurveTo(s * 0.4, -s, s, -s * 0.4, 0, s * 0.3);
    cx.fill();
  }

  function loop() {
    if (raf) return;
    const step = () => {
      cx.clearRect(0, 0, innerWidth, innerHeight);
      parts.forEach(p => {
        p.vy += 0.12; p.vx *= 0.99;
        p.x += p.vx; p.y += p.vy;
        p.rot += p.vr; p.life++;
        cx.save();
        cx.translate(p.x, p.y);
        cx.rotate(p.rot);
        cx.fillStyle = p.c;
        if (p.heart) heart(p.s); else cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        cx.restore();
      });
      parts = parts.filter(p => p.y < innerHeight + 40 && p.life < 600);
      if (parts.length) raf = requestAnimationFrame(step);
      else { cx.clearRect(0, 0, innerWidth, innerHeight); raf = null; }
    };
    raf = requestAnimationFrame(step);
  }

  window.Confetti = {
    burst(x, y, n = 70) {
      if (reduceMotion) return;
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, v = 3 + Math.random() * 7;
        add(x, y, Math.cos(a) * v, Math.sin(a) * v - 4);
      }
      loop();
    },
    rain(n = 150) {
      if (reduceMotion) return;
      for (let i = 0; i < n; i++) {
        add(Math.random() * innerWidth, -20 - Math.random() * innerHeight * 0.6,
            (Math.random() - 0.5) * 2, 2 + Math.random() * 3);
      }
      loop();
    }
  };
})();
