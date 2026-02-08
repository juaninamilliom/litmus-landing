/* Litmus — DeFi interactions */
(function () {
  'use strict';

  // Grid background
  const canvas = document.getElementById('bg');
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    const dpr = devicePixelRatio || 1;
    W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  addEventListener('resize', resize); resize();

  let mx = -999, my = -999;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mouseleave', () => { mx = -999; my = -999; });

  const GRID = 50, R = 160;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const cols = Math.ceil(W / GRID) + 1;
    const rows = Math.ceil(H / GRID) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * GRID, y = r * GRID;
        const d = Math.hypot(mx - x, my - y);
        const t = Math.max(0, 1 - d / R);
        const a = 0.06 + t * 0.4;
        const s = 0.8 + t * 2.5;
        ctx.beginPath();
        ctx.arc(x, y, s, 0, Math.PI * 2);
        ctx.fillStyle = t > 0.01
          ? `rgba(255,${Math.round(34 + t * 170)},${Math.round(t * 30)},${a})`
          : `rgba(100,100,130,${a})`;
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  // Reveal on scroll
  const els = document.querySelectorAll('.card, .stat, .flow-step, .tier-bar, .chain, .install-box');
  els.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => obs.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
})();
