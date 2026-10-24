// Orderlya animated logo — the chairs arrange themselves around the table.
// Usage:
//   <svg id="mark" viewBox="0 0 100 100">
//     <circle cx="50" cy="50" r="24" fill="#A6713F"></circle>
//     <circle cx="50" cy="50" r="24" fill="none" stroke="#171512" stroke-width="7"></circle>
//     <g class="orderlya-chairs"></g>
//   </svg>
//   <script type="module">
//     import { animateOrderlyaMark } from './orderlya-logo.js';
//     animateOrderlyaMark(document.getElementById('mark'));
//   </script>
//
// The chairs gather at the top, rotate into their even places (deterministic — not
// random), then hold with a slow perpetual turn. Respects prefers-reduced-motion.
export function animateOrderlyaMark(svg, opts = {}) {
  const {
    n = 9, cx = 50, cy = 50, R = 35, r = 4.5,
    accent = '#E9A23A', ink = '#171512', amberEvery = 3,
    duration = 1700, stagger = 70, spinPerRev = 26000, // ms per idle revolution
    replayOnClick = true,
  } = opts;
  const TW = Math.PI * 2, ROT = TW * 1.15;
  const g = svg.querySelector('.orderlya-chairs') || svg;
  const dots = [];
  for (let i = 0; i < n; i++) {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('r', r);
    c.setAttribute('fill', i % amberEvery === 0 ? accent : ink);
    g.appendChild(c);
    dots.push({ el: c, fa: -Math.PI / 2 + (i - (n - 1) / 2) * TW / n, dl: Math.abs(i - (n - 1) / 2) * stagger });
  }
  const place = (el, x, y) => { el.setAttribute('cx', x.toFixed(2)); el.setAttribute('cy', y.toFixed(2)); };
  const ease = t => 1 - Math.pow(1 - t, 3);
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    dots.forEach(d => place(d.el, cx + R * Math.cos(d.fa), cy + R * Math.sin(d.fa)));
    return;
  }
  const IDLE = TW / spinPerRev;
  let raf, t0;
  function frame(ts) {
    if (!t0) t0 = ts; const el = ts - t0;
    dots.forEach((d, i) => {
      const q = ease(Math.max(0, Math.min(1, (el - d.dl) / duration)));
      let ang;
      if (el < duration + 300) {
        const base = -Math.PI / 2 + (i - (n - 1) / 2) * (TW / n) * (0.45 + 0.55 * q);
        ang = base - ROT * (1 - q);
      } else { ang = d.fa + IDLE * (el - duration); }
      place(d.el, cx + R * Math.cos(ang), cy + R * Math.sin(ang));
    });
    raf = requestAnimationFrame(frame);
  }
  const run = () => { cancelAnimationFrame(raf); t0 = 0; raf = requestAnimationFrame(frame); };
  if (replayOnClick) svg.addEventListener('click', run);
  run();
  return { replay: run };
}
