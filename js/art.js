/* Hand-drawn style illustrations as SVG strings.
   Colors come from CSS classes (.f-rose, .ink …) so the palette lives in style.css. */
(function () {
  const sparkle = (x, y, s, cls = "f-ink") =>
    `<path class="${cls}" d="M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s}Z"/>`;

  const heartPath = "M12 21s-7.5-4.6-9.6-9.2C.8 8.3 2.9 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.2 1.8-2 3.3-3.2 5.4-3.2 3.7 0 5.8 3.8 4.2 7.3C19.5 16.4 12 21 12 21z";

  // wavy frosting edge from x0 to x1
  function scallops(x0, x1, y, n, d) {
    const w = (x1 - x0) / n;
    let p = `M${x0} ${y}`;
    for (let i = 0; i < n; i++) p += ` Q${x0 + w * i + w / 2} ${y + d} ${x0 + w * (i + 1)} ${y}`;
    return p;
  }

  const tulipHead = (cx, cy) =>
    `M${cx - 9} ${cy + 6} C${cx - 11} ${cy - 6} ${cx - 7} ${cy - 12} ${cx - 4} ${cy - 8} L${cx} ${cy - 14} L${cx + 4} ${cy - 8} C${cx + 7} ${cy - 12} ${cx + 11} ${cy - 6} ${cx + 9} ${cy + 6} Q${cx} ${cy + 12} ${cx - 9} ${cy + 6}Z`;

  const berry = (x, y, sc = 1, r = 0) =>
    `<g transform="translate(${x} ${y}) rotate(${r}) scale(${sc})">
      <path class="f-berry ink thin" d="M0 10C-9 6-10-4-6-7C-3-9 3-9 6-7C10-4 9 6 0 10Z"/>
      <g class="f-seed"><ellipse cx="-3" cy="-2" rx=".9" ry="1.2"/><ellipse cx="2.5" cy="-3" rx=".9" ry="1.2"/><ellipse cx="0" cy="2" rx=".9" ry="1.2"/><ellipse cx="-4" cy="3" rx=".9" ry="1.2"/><ellipse cx="4" cy="2" rx=".9" ry="1.2"/><ellipse cx="0" cy="6" rx=".9" ry="1.2"/></g>
      <path class="f-sage ink thin" d="M-6-7L-4-11L-1-8L0-12L1-8L4-11L6-7Q0-4-6-7Z"/>
    </g>`;

  // ruffled circle for peony petals
  function ruffle(cx, cy, r, n, amp, rot = 0) {
    const pt = (a, rr) => `${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`;
    let d = `M${pt(rot, r)}`;
    for (let i = 0; i < n; i++) {
      const a0 = rot + (2 * Math.PI * i) / n, a1 = rot + (2 * Math.PI * (i + 1)) / n;
      d += ` Q${pt((a0 + a1) / 2, r + amp)} ${pt(a1, r)}`;
    }
    return d + "Z";
  }
  const peony = (cx, cy, r, rot = 0) => `
    <path class="f-frost" style="stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round" d="${ruffle(cx, cy, r, 9, r * .32, rot)}"/>
    <path class="f-blush" d="${ruffle(cx, cy - r * .06, r * .7, 8, r * .26, rot + .3)}"/>
    <path style="fill:var(--rose)" d="${ruffle(cx, cy - r * .1, r * .4, 6, r * .2, rot + .6)}"/>
    <path class="redline" style="stroke-width:1.4" d="M${cx - r * .45} ${cy + r * .05} Q${cx} ${cy - r * .55} ${cx + r * .45} ${cy + r * .05} M${cx - r * .3} ${cy + r * .35} Q${cx} ${cy + r * .05} ${cx + r * .3} ${cy + r * .35} M${cx - r * .62} ${cy + r * .5} Q${cx} ${cy + r * .9} ${cx + r * .62} ${cy + r * .5}"/>
    <circle class="f-butter" cx="${cx}" cy="${cy - r * .12}" r="${r * .13}"/>`;
  const bud = (cx, cy, r) => `
    <path class="f-frost" style="stroke:var(--ink);stroke-width:1.5" d="M${cx} ${cy - r} C${cx + r} ${cy - r} ${cx + r * 1.1} ${cy + r * .6} ${cx} ${cy + r} C${cx - r * 1.1} ${cy + r * .6} ${cx - r} ${cy - r} ${cx} ${cy - r}Z"/>
    <path class="f-sage" d="M${cx - r * .9} ${cy + r * .2} Q${cx} ${cy + r * 1.6} ${cx + r * .9} ${cy + r * .2} Q${cx} ${cy + r * .9} ${cx - r * .9} ${cy + r * .2}Z"/>`;

  const ART = {
    heart: (cls = "f-rose ink thin") =>
      `<svg class="art" viewBox="0 0 24 24" aria-hidden="true"><path class="${cls}" d="${heartPath}"/></svg>`,

    back: () =>
      `<svg class="art sketch" viewBox="0 0 34 22" aria-hidden="true"><path class="ink" d="M32 11 H4 M11 3 L3 11 L11 19"/></svg>`,

    gift: () => `
<svg class="art sketch" viewBox="0 0 200 210" aria-hidden="true">
  ${sparkle(34, 44, 10)}${sparkle(170, 58, 8)}${sparkle(182, 152, 6)}${sparkle(20, 150, 5)}
  <rect class="f-paper ink" x="30" y="96" width="140" height="102" rx="6"/>
  <rect class="f-blush" x="32" y="98" width="136" height="12"/>
  <rect class="f-rose ink thin" x="88" y="96" width="24" height="102"/>
  <path class="f-rose ink thin" transform="translate(132 150) scale(1.2)" d="${heartPath}"/>
  <g class="lid">
    <rect class="f-paper ink" x="22" y="72" width="156" height="28" rx="6"/>
    <rect class="f-rose ink thin" x="86" y="72" width="28" height="28"/>
    <path class="f-rose ink" d="M100 70 C70 36 46 58 68 72 C80 79 92 75 100 70Z"/>
    <path class="f-rose ink" d="M100 70 C130 36 154 58 132 72 C120 79 108 75 100 70Z"/>
    <path class="ink thin" d="M76 60 Q86 64 96 68 M124 60 Q114 64 104 68"/>
    <circle class="f-rose ink" cx="100" cy="70" r="8"/>
  </g>
</svg>`,

    tilePhoto: () => `
<svg class="art sketch" viewBox="0 0 100 100" aria-hidden="true">
  <g transform="rotate(-8 50 52)">
    <rect class="f-paper ink" x="17" y="18" width="66" height="70" rx="3"/>
    <rect class="f-blush" x="24" y="25" width="52" height="42"/>
    <circle class="f-butter ink thin" cx="64" cy="36" r="5"/>
    <path class="f-sage ink thin" d="M24 67 L40 46 L52 58 L60 50 L76 67Z"/>
    <rect class="ink thin" x="24" y="25" width="52" height="42"/>
  </g>
  <rect class="f-rose" x="9" y="12" width="28" height="9" transform="rotate(-38 23 16)"/>
  <rect class="f-rose" x="66" y="80" width="28" height="9" transform="rotate(-30 80 84)"/>
</svg>`,

    tileMusic: () => `
<svg class="art sketch" viewBox="0 0 100 100" aria-hidden="true">
  ${sparkle(18, 28, 7)}${sparkle(84, 30, 6)}${sparkle(56, 90, 5)}
  <path class="f-ink" d="M38 26 L72 17 L72 28 L38 37Z"/>
  <path class="ink" d="M38 30 V70 M72 22 V62"/>
  <ellipse class="f-ink" cx="30" cy="71" rx="9" ry="7" transform="rotate(-20 30 71)"/>
  <ellipse class="f-ink" cx="64" cy="63" rx="9" ry="7" transform="rotate(-20 64 63)"/>
  <path class="ink" d="M88 82 V56 Q96 60 94 70"/>
  <ellipse class="f-ink" cx="83" cy="83" rx="6" ry="5" transform="rotate(-20 83 83)"/>
</svg>`,

    tulips: (tag = false) => `
<svg class="art" viewBox="0 0 100 104" aria-hidden="true">
  ${sparkle(10, 18, 5)}${sparkle(92, 14, 4)}${sparkle(94, 52, 3)}
  <path class="leaf" d="M46 86 Q38 62 30 44 M50 86 V40 M54 86 Q62 62 70 46 M48 86 Q34 50 20 30"/>
  <path class="f-sage" style="stroke:var(--ink);stroke-width:1.3" d="M42 66 Q20 62 14 46 Q32 48 44 60Z"/>
  <path class="f-sage" style="stroke:var(--ink);stroke-width:1.3" d="M58 64 Q80 60 88 44 Q68 46 56 58Z"/>
  <path class="f-sage" style="stroke:var(--ink);stroke-width:1.3" d="M40 52 Q26 40 28 26 Q40 36 42 48Z"/>
  ${bud(20, 28, 5)}${bud(82, 26, 4.5)}
  ${peony(30, 44, 13, .2)}${peony(70, 46, 12.5, .5)}${peony(50, 30, 15.5, 0)}
  <path class="f-paper" style="stroke:var(--ink);stroke-width:2;stroke-linejoin:round" d="M26 60 L50 100 L74 60 Q50 72 26 60Z"/>
  <path class="redline" style="stroke-width:1.4;stroke:var(--rose)" d="M36 66 L50 92 M64 66 L50 92"/>
  <g transform="translate(50 79)"><path class="redline" d="M0 0C-5-8-15-7-13 0C-11 4-4 3 0 0ZM0 0C5-8 15-7 13 0C11 4 4 3 0 0ZM-1 1Q-5 9-9 15M1 1Q4 9 8 14"/><circle class="f-ink" cx="0" cy="0" r="2"/></g>
  ${tag ? `<g transform="rotate(10 84 82)"><rect class="f-paper" style="stroke:var(--ink);stroke-width:1.5" x="72" y="74" width="26" height="16" rx="2"/><path class="redline" style="stroke-width:1.2" d="M72 78 L62 74"/><path class="f-ink" transform="translate(79 76) scale(.5)" d="${heartPath}"/></g>` : ""}
</svg>`,

    tileCake: () => `
<svg class="art sketch" viewBox="0 0 100 100" aria-hidden="true">
  ${sparkle(14, 30, 6)}${sparkle(88, 26, 7)}${sparkle(90, 66, 4)}
  <ellipse class="f-blush ink thin" cx="50" cy="85" rx="38" ry="7"/>
  <rect class="f-paper ink" x="22" y="50" width="56" height="32" rx="4"/>
  <path class="f-rose ink thin" d="${scallops(22, 78, 56, 4, 9)} L78 54 Q78 50 74 50 L26 50 Q22 50 22 54Z"/>
  ${[38, 50, 62].map(x => `
  <rect class="f-paper ink thin" x="${x - 2.5}" y="32" width="5" height="18" rx="1"/>
  <path class="f-gold ink thin" d="M${x} 20 C${x + 5} 26 ${x + 3} 30 ${x} 30 C${x - 3} 30 ${x - 5} 26 ${x} 20Z"/>`).join("")}
  ${berry(28, 48, .55, -12)}${berry(44, 47, .5, 6)}${berry(56, 47, .5, -6)}${berry(72, 48, .55, 12)}
</svg>`,

    cake: () => {
      // strawberry cake in 3/4 view, after the coquette poster style
      const cx = 150, topY = 150, rx = 112, ry = 34, baseY = 246;
      const edge = x => topY + ry * Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2));
      let drip = `M${cx - rx} ${topY}`;
      const n = 14;
      for (let i = 0; i <= n; i++) {
        const x = cx - rx + (2 * rx * i) / n;
        const len = [14, 34, 18, 42, 22, 30, 16, 38, 20, 44, 18, 30, 24, 36, 14][i];
        const y = edge(x) + len;
        drip += i === 0 ? ` L${x} ${y}` : ` Q${x - rx / n} ${y + 10} ${x} ${y}`;
      }
      drip += ` L${cx + rx} ${topY} Z`;
      const pipes = Array.from({ length: 19 }, (_, i) => {
        const a = Math.PI * (i / 18);
        return `<circle class="f-cream" style="stroke:var(--frost);stroke-width:1.6" cx="${(cx - Math.cos(a) * (rx + 2)).toFixed(1)}" cy="${(baseY + Math.sin(a) * 18).toFixed(1)}" r="9"/>`;
      }).join("");
      const dollops = [[-86, -6], [86, -6], [-50, -24], [50, -24], [0, -30], [-60, 18], [60, 18], [0, 26]]
        .map(([dx, dy]) => `<circle class="f-cream" cx="${cx + dx}" cy="${topY + dy + 6}" r="11"/>`).join("");
      const bigBerry = (x, y, sc = 1) => `
        <g transform="translate(${x} ${y}) scale(${sc})">
          <path style="fill:var(--berry)" d="M0 16C-14 10-16-6-11-12C-6-17 6-17 11-12C16-6 14 10 0 16Z"/>
          <path class="f-paper" opacity=".35" d="M-7-9C-9-5-9 0-7 3C-6-2-5-6-3-9Z"/>
          <g class="f-paper"><ellipse cx="-5" cy="-3" rx="1.2" ry="1.7"/><ellipse cx="4" cy="-5" rx="1.2" ry="1.7"/><ellipse cx="0" cy="3" rx="1.2" ry="1.7"/><ellipse cx="-6" cy="6" rx="1.2" ry="1.7"/><ellipse cx="6" cy="4" rx="1.2" ry="1.7"/><ellipse cx="0" cy="10" rx="1.2" ry="1.7"/></g>
        </g>`;
      const bow = (x, y, sc = 1, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${sc})"><path class="redline" d="M0 0C-8-12-22-10-18 0C-15 6-6 4 0 0ZM0 0C8-12 22-10 18 0C15 6 6 4 0 0ZM-1 1Q-8 12-12 20M1 1Q6 12 12 19"/><circle class="f-ink" cx="0" cy="0" r="2.4"/></g>`;
      const heart = (x, y, sc) => `<path class="f-ink" transform="translate(${x} ${y}) scale(${sc})" d="${heartPath}"/>`;
      const candle = (x, i) => `
  <g class="candle" data-i="${i}" role="button" tabindex="0" aria-label="Blow out candle ${i + 1}">
    <rect class="f-hit" x="${x - 20}" y="40" width="40" height="100"/>
    <circle class="f-butter glow" cx="${x}" cy="66" r="22" opacity=".6"/>
    <rect class="f-paper" style="stroke:var(--rose);stroke-width:2" x="${x - 5.5}" y="84" width="11" height="58" rx="3"/>
    <path class="redline" style="stroke:var(--rose)" d="M${x - 5} 98 L${x + 5} 91 M${x - 5} 112 L${x + 5} 105 M${x - 5} 126 L${x + 5} 119"/>
    <path class="flame" style="fill:var(--gold)" d="M${x} 52 C${x + 10} 64 ${x + 7} 78 ${x} 78 C${x - 7} 78 ${x - 10} 64 ${x} 52Z"/>
    <path class="flame f-butter" d="M${x} 62 C${x + 4} 68 ${x + 3} 75 ${x} 75 C${x - 3} 75 ${x - 4} 68 ${x} 62Z"/>
    <circle class="smoke f-blush" cx="${x}" cy="72" r="6"/>
  </g>`;
      return `
<svg class="art" viewBox="0 0 300 290">
  ${sparkle(26, 70, 11)}${sparkle(276, 96, 9)}${sparkle(262, 34, 6)}${sparkle(34, 196, 7)}${sparkle(282, 210, 5)}
  <ellipse class="f-paper" cx="150" cy="262" rx="134" ry="20" style="stroke:var(--frost);stroke-width:2"/>
  <path class="f-cream" d="M${cx - rx} ${topY} L${cx - rx} ${baseY} A${rx} 18 0 0 0 ${cx + rx} ${baseY} L${cx + rx} ${topY}Z"/>
  <path class="f-frost" d="${drip}"/>
  ${heart(70, 206, .5)}${heart(118, 218, .45)}${heart(172, 220, .45)}${heart(222, 206, .5)}
  ${bow(cx - rx + 4, 180, 1.05, -8)}${bow(cx + rx - 4, 180, 1.05, 8)}${bow(110, 200, .9)}${bow(190, 200, .9)}
  ${pipes}
  <ellipse class="f-frost" cx="${cx}" cy="${topY}" rx="${rx}" ry="${ry}"/>
  <ellipse class="f-blush" cx="${cx}" cy="${topY - 2}" rx="${rx - 18}" ry="${ry - 10}" opacity=".6"/>
  ${dollops}
  ${bigBerry(cx - 86, topY - 14, .95)}${bigBerry(cx + 86, topY - 14, .95)}${bigBerry(cx - 50, topY - 32, .9)}${bigBerry(cx + 50, topY - 32, .9)}
  ${[115, 150, 185].map(candle).join("")}
  ${bigBerry(cx - 60, topY + 10, 1.05)}${bigBerry(cx + 60, topY + 10, 1.05)}${bigBerry(cx, topY + 18, 1.1)}
</svg>`;
    },

    bow: () => `<svg class="art" viewBox="-30 -16 60 44" aria-hidden="true"><path class="redline" style="stroke-width:3" d="M0 0C-8-12-24-11-20 0C-17 7-7 5 0 0ZM0 0C8-12 24-11 20 0C17 7 7 5 0 0ZM-1 1Q-8 13-13 22M1 1Q7 13 13 21"/><circle class="f-ink" cx="0" cy="0" r="3"/></svg>`,

    ribbon: () => `<svg viewBox="0 0 260 260" aria-hidden="true"><path d="M-6 236 C30 214 12 170 44 150 C70 134 92 160 78 178 C64 196 40 170 58 140 C80 104 50 70 86 50 C120 30 150 60 190 30 C210 14 232 22 250 -6"/><path d="M40 40 C30 24 12 32 18 48 C22 58 40 66 40 66 C40 66 58 58 62 48 C68 32 50 24 40 40Z" style="stroke-width:3.5"/><path d="M128 92 a6 6 0 1 0 0.1 0" style="stroke-width:3"/><path d="M150 108 a4 4 0 1 0 0.1 0" style="stroke-width:3"/></svg>`,

    bunting: () => {
      const flags = [20, 60, 100, 140, 180, 220, 260].map((x, i) => {
        const t = x / 300, y = 8 + 64 * t * (1 - t);
        const c = ["f-rose", "f-paper", "f-blush"][i % 3];
        return `<path class="${c} ink thin" d="M${x - 14} ${y} L${x + 14} ${y + 1} L${x} ${y + 26}Z"/>`;
      }).join("");
      return `<svg class="art sketch" viewBox="0 0 300 64" aria-hidden="true"><path class="ink thin" d="M0 8 Q150 40 300 8"/>${flags}</svg>`;
    },

    balloons: () => `
<svg class="art sketch" viewBox="0 0 70 140" aria-hidden="true">
  <path class="ink thin" d="M24 54 Q30 90 36 130 M46 62 Q40 96 36 130"/>
  <ellipse class="f-rose ink" cx="24" cy="30" rx="18" ry="22"/>
  <ellipse class="f-blush ink" cx="46" cy="40" rx="17" ry="21"/>
  <path class="ink thin" d="M16 20 Q18 14 24 12"/>
  <path class="f-rose ink thin" d="M36 128 C28 120 26 132 34 132Z M36 128 C44 120 46 132 38 132Z"/>
</svg>`,

    hat: () => `
<svg class="art sketch" viewBox="0 0 50 62" aria-hidden="true">
  <path class="f-paper ink" d="M25 8 L44 54 Q25 60 6 54Z"/>
  <path class="ink thin" style="stroke:var(--rose)" d="M18 26 L33 22 M13 40 L38 34 M9 51 L42 46"/>
  <circle class="f-rose ink thin" cx="25" cy="7" r="5"/>
</svg>`,

    // soft watercolor landscape used where no photo is set yet
    scene: (i = 0) => {
      const skies = [["#fbe1e3", "#fdf1ea"], ["#f7e6ee", "#fdf4ec"], ["#fde9df", "#fef6ee"], ["#efeee2", "#fbf5ec"]];
      const [a, b] = skies[i % skies.length];
      const id = "sky" + i + Math.random().toString(36).slice(2, 6);
      return `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
  <rect width="100" height="100" fill="url(#${id})"/>
  <g fill="#fffaf5" opacity=".9"><ellipse cx="${26 + i * 9 % 40}" cy="26" rx="14" ry="6"/><ellipse cx="${34 + i * 9 % 40}" cy="22" rx="9" ry="6"/><ellipse cx="${74 - i * 7 % 30}" cy="38" rx="11" ry="4.5"/></g>
  <path d="M0 70 Q30 52 60 64 T100 58 V100 H0Z" fill="#d6e4c4"/>
  <path d="M0 80 Q40 66 70 76 T100 74 V100 H0Z" fill="#b5cd9c"/>
</svg>`;
    }
  };

  window.ART = ART;
})();
