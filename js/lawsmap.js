/* ================================================================
   LAWSMAP.JS — Interactive connection map between the 22 laws
   ================================================================ */
'use strict';

window.LAWSMAP = {};

LAWSMAP.init = function () {
  const canvas  = document.getElementById('lawsMapCanvas');
  const tooltip = document.getElementById('mapTooltip');
  const infoEl  = document.getElementById('mapInfo');
  const legendEl = document.getElementById('mapLegend');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // ── Colors ──────────────────────────────────────────────
  const COLORS = {
    focus:    '#e63946',
    direct:   '#7c6af7',
    indirect: '#4bc9f7',
    neutral:  '#2a2a36',
    text:     '#a0a0b0',
    textHl:   '#f0f0f2',
    bg:       '#1a1a22',
    nodeBg:   '#1e1e25',
    focusBg:  'rgba(230,57,70,0.12)',
    green:    '#39ff90',
  };

  // ── Build legend ─────────────────────────────────────────
  if (legendEl) {
    const items = [
      { color: COLORS.focus,    label: 'Leis apresentadas' },
      { color: COLORS.direct,   label: 'Conexão direta' },
      { color: COLORS.indirect, label: 'Conexão indireta' },
    ];
    items.forEach(item => {
      const li = document.createElement('div');
      li.className = 'legend-item';
      li.innerHTML = `<span class="legend-dot" style="background:${item.color}"></span><span>${item.label}</span>`;
      legendEl.appendChild(li);
    });
  }

  let nodes   = [];
  let hoverId = null;
  let W, H;
  let animFrame;

  function resize() {
    const wrapper = canvas.parentElement;
    W = wrapper.clientWidth;
    H = Math.max(500, Math.min(W * 0.65, 700));
    canvas.width  = W;
    canvas.height = H;
    computeLayout();
    drawFrame();
  }

  function computeLayout() {
    // Place focus nodes in center triangle, rest in outer ring
    const laws    = SEMINAR.laws;
    const focusIds = laws.filter(l => l.focus).map(l => l.n);
    const others   = laws.filter(l => !l.focus);

    const cx = W / 2;
    const cy = H / 2;
    const outerR  = Math.min(W, H) * 0.38;
    const innerR  = Math.min(W, H) * 0.16;

    nodes = [];

    // Focus laws — inner triangle
    const focusAngles = [-Math.PI/2, Math.PI/2 - Math.PI*2/3, Math.PI/2 + Math.PI*2/3];
    focusIds.forEach((n, i) => {
      const law = laws.find(l => l.n === n);
      if (!law) return;
      nodes.push({
        id:    n,
        x:     cx + innerR * Math.cos(focusAngles[i]),
        y:     cy + innerR * Math.sin(focusAngles[i]),
        r:     24,
        focus: true,
        law,
      });
    });

    // Other laws — outer ring
    const step = (Math.PI * 2) / others.length;
    others.forEach((law, i) => {
      const angle = -Math.PI/2 + step * i;
      nodes.push({
        id:    law.n,
        x:     cx + outerR * Math.cos(angle),
        y:     cy + outerR * Math.sin(angle),
        r:     15,
        focus: false,
        law,
      });
    });
  }

  function getConnectedIds(id) {
    const conns = SEMINAR.connections;
    const set = new Set();
    conns.forEach(c => {
      if (c.from === id) set.add(c.to);
      if (c.to   === id) set.add(c.from);
    });
    return set;
  }

  function getConnectionType(a, b) {
    const conn = SEMINAR.connections.find(
      c => (c.from === a && c.to === b) || (c.from === b && c.to === a)
    );
    return conn || null;
  }

  function drawEdges() {
    SEMINAR.connections.forEach(conn => {
      const na = nodes.find(n => n.id === conn.from);
      const nb = nodes.find(n => n.id === conn.to);
      if (!na || !nb) return;

      const isHighlighted =
        hoverId === conn.from || hoverId === conn.to;

      const color = conn.type === 'focus'    ? COLORS.focus   :
                    conn.type === 'direct'   ? COLORS.direct  :
                    conn.type === 'indirect' ? COLORS.indirect :
                    COLORS.neutral;

      ctx.beginPath();
      ctx.moveTo(na.x, na.y);
      ctx.lineTo(nb.x, nb.y);
      ctx.strokeStyle = isHighlighted
        ? color
        : color + (conn.type === 'focus' ? '60' : '30');
      ctx.lineWidth = isHighlighted ? (conn.type === 'focus' ? 2.5 : 1.8) : 1;
      ctx.stroke();
    });
  }

  function drawNodes() {
    nodes.forEach(node => {
      const isHover = node.id === hoverId;
      const connSet = hoverId ? getConnectedIds(hoverId) : new Set();
      const isConn  = connSet.has(node.id);
      const dim     = hoverId && !isHover && !isConn;

      ctx.save();

      // Glow for focus or hover
      if (node.focus || isHover) {
        ctx.shadowBlur  = isHover ? 24 : 14;
        ctx.shadowColor = node.focus ? COLORS.focus : '#fff';
      }

      // Node circle background
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fillStyle = node.focus
        ? (isHover ? 'rgba(230,57,70,0.35)' : 'rgba(230,57,70,0.15)')
        : (isHover ? 'rgba(255,255,255,0.15)' : COLORS.nodeBg);
      ctx.fill();

      // Node border
      ctx.strokeStyle = node.focus
        ? COLORS.focus
        : (isHover ? '#ffffff' : (isConn ? COLORS.direct : '#333340'));
      ctx.lineWidth = node.focus ? 2 : (isHover ? 2 : 1);
      ctx.globalAlpha = dim ? 0.25 : 1;
      ctx.stroke();

      // Number label
      ctx.shadowBlur = 0;
      ctx.fillStyle = node.focus
        ? (isHover ? '#fff' : COLORS.focus)
        : (isHover ? '#fff' : (isConn ? COLORS.textHl : COLORS.text));
      ctx.font = `${node.focus ? 700 : 600} ${node.focus ? 13 : 10}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.id, node.x, node.y);

      ctx.restore();

      // Law name label (outside node)
      ctx.save();
      ctx.globalAlpha = dim ? 0.2 : (isHover || (node.focus && !hoverId) ? 1 : 0.65);
      ctx.font = `${node.focus ? 600 : 500} ${node.focus ? 11 : 9}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = node.focus ? COLORS.focus : COLORS.text;

      const LABEL_OFFSET = node.r + 14;
      const cx2 = W / 2, cy2 = H / 2;
      const dx = node.x - cx2, dy = node.y - cy2;
      const angle = Math.atan2(dy, dx);
      const lx = node.x + LABEL_OFFSET * Math.cos(angle);
      const ly = node.y + LABEL_OFFSET * Math.sin(angle);

      // Short label (first word after "Lei da/do/de")
      const shortName = node.law.name.replace(/^Lei d[aeo]s?\s+/i, '');
      const words = shortName.split(' ');
      const line1 = words[0];
      const line2 = words.slice(1).join(' ');

      ctx.textBaseline = 'top';
      ctx.fillText(line1, lx, ly - (line2 ? 6 : 3));
      if (line2) ctx.fillText(line2, lx, ly + 6);
      ctx.restore();
    });
  }

  function drawFrame() {
    ctx.clearRect(0, 0, W, H);
    drawEdges();
    drawNodes();
  }

  // ── Hit testing ──────────────────────────────────────────
  function hitTest(mx, my) {
    for (const node of nodes) {
      const dx = mx - node.x, dy = my - node.y;
      if (Math.sqrt(dx*dx + dy*dy) <= node.r + 8) return node;
    }
    return null;
  }

  // ── Mouse interaction ─────────────────────────────────────
  function getRelativePos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top)  * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY
    };
  }

  canvas.addEventListener('mousemove', (e) => {
    const { x, y } = getRelativePos(e);
    const node = hitTest(x, y);
    hoverId = node ? node.id : null;
    canvas.style.cursor = node ? 'pointer' : 'default';

    // Tooltip
    if (node) {
      showTooltip(e, node);
    } else {
      hideTooltip();
    }

    cancelAnimationFrame(animFrame);
    animFrame = requestAnimationFrame(drawFrame);
  });

  canvas.addEventListener('mouseleave', () => {
    hoverId = null;
    hideTooltip();
    cancelAnimationFrame(animFrame);
    animFrame = requestAnimationFrame(drawFrame);
  });

  canvas.addEventListener('click', (e) => {
    const { x, y } = getRelativePos(e);
    const node = hitTest(x, y);
    if (!node || !infoEl) return;
    // Show connected laws info
    const conns = SEMINAR.connections.filter(c => c.from === node.id || c.to === node.id);
    if (conns.length === 0) {
      infoEl.innerHTML = `<p><strong style="color:var(--text)">Lei ${node.id}: ${node.law.name}</strong><br/><span style="color:var(--text3)">${node.law.desc}</span></p>`;
      return;
    }
    let html = `<p style="margin-bottom:10px"><strong style="color:var(--red)">Lei ${node.id}: ${node.law.name}</strong><br/><em style="color:var(--text2);font-size:0.83rem">${node.law.desc}</em></p>`;
    html += '<ul style="list-style:none;display:flex;flex-direction:column;gap:8px">';
    conns.forEach(c => {
      const otherId = c.from === node.id ? c.to : c.from;
      const other   = SEMINAR.laws.find(l => l.n === otherId);
      if (!other) return;
      const clr = c.type === 'focus' ? '#e63946' : c.type === 'direct' ? '#7c6af7' : '#4bc9f7';
      html += `<li style="font-size:0.8rem;color:var(--text2);padding:8px 12px;background:var(--surface2);border-radius:8px;border-left:3px solid ${clr}">
        <strong style="color:var(--text)">Lei ${otherId}: ${other.name}</strong><br/>${c.reason}
      </li>`;
    });
    html += '</ul>';
    infoEl.innerHTML = html;
  });

  // Touch support
  canvas.addEventListener('touchstart', (e) => {
    const { x, y } = getRelativePos(e);
    const node = hitTest(x, y);
    hoverId = node ? node.id : null;
    cancelAnimationFrame(animFrame);
    animFrame = requestAnimationFrame(drawFrame);
  }, { passive: true });

  function showTooltip(e, node) {
    if (!tooltip) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width  / canvas.width;
    const scaleY = rect.height / canvas.height;
    const tx = node.x * scaleX + rect.left;
    const ty = node.y * scaleY + rect.top;
    const wrapper = canvas.parentElement.getBoundingClientRect();

    tooltip.innerHTML = `<strong>Lei ${node.id}: ${node.law.name}</strong>${node.law.desc}`;
    tooltip.classList.add('visible');
    tooltip.style.left = (tx - wrapper.left + 12) + 'px';
    tooltip.style.top  = (ty - wrapper.top - 60) + 'px';
  }

  function hideTooltip() {
    if (tooltip) tooltip.classList.remove('visible');
  }

  // ── Init ──────────────────────────────────────────────────
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });

  resize();
};
