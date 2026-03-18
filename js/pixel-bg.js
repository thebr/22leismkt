/* ================================================================
   PIXEL-BG.JS — Animated pixel texture background
   ================================================================ */
'use strict';

(function () {
  const canvas = document.getElementById('pixelCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const PIXEL_SIZE = 4;
  const BASE_ALPHA  = 0.18;
  const HOVER_ALPHA = 0.55;
  const DECAY       = 0.03;
  const GLOW_RADIUS = 80;

  let W, H, cols, rows;
  let pixels = [];
  let mouse  = { x: -999, y: -999 };
  let raf;

  function resize() {
    W = window.innerWidth;
    H = document.body.scrollHeight || window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
    canvas.style.width  = W  + 'px';
    canvas.style.height = H  + 'px';
    cols = Math.ceil(W  / PIXEL_SIZE);
    rows = Math.ceil(H  / PIXEL_SIZE);
    buildPixels();
  }

  function buildPixels() {
    pixels = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // sparse: ~35% of pixels visible
        pixels.push({
          x:    c * PIXEL_SIZE,
          y:    r * PIXEL_SIZE,
          base: Math.random() < 0.35 ? BASE_ALPHA * (0.3 + Math.random() * 0.7) : 0,
          alpha: 0,
          target: 0,
          r: Math.random() < 0.04 ? 230 : 255,  // occasional red tint
          g: Math.random() < 0.04 ? 57  : 255,
          b: Math.random() < 0.04 ? 70  : 255,
        });
      }
    }
    // Set initial alphas
    pixels.forEach(p => { p.alpha = p.base; p.target = p.base; });
  }

  function onMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY + window.scrollY;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Reactivate pixels near mouse
    const mr = Math.ceil(GLOW_RADIUS / PIXEL_SIZE);
    const mc = Math.floor(mouse.x / PIXEL_SIZE);
    const mrow = Math.floor(mouse.y / PIXEL_SIZE);

    pixels.forEach((p, i) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      const dc = c - mc;
      const dr = r - mrow;
      const dist = Math.sqrt(dc*dc + dr*dr) * PIXEL_SIZE;
      if (dist < GLOW_RADIUS) {
        const factor = 1 - dist / GLOW_RADIUS;
        p.target = Math.max(p.base, HOVER_ALPHA * factor * factor);
      } else {
        p.target = p.base;
      }

      // Smooth interpolation
      p.alpha += (p.target - p.alpha) * DECAY;

      if (p.alpha < 0.005) return;

      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha})`;
      ctx.fillRect(p.x, p.y, PIXEL_SIZE - 1, PIXEL_SIZE - 1);
    });

    raf = requestAnimationFrame(draw);
  }

  // Throttle resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });

  // Also resize on scroll end (page height may change)
  window.addEventListener('scroll', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 400);
  }, { passive: true });

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  resize();
  draw();
})();
