/* ================================================================
   MAIN.JS — Orchestrates all modules and builds the page
   ================================================================ */
'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // ── 1. Comando da Atividade ─────────────────────────────
  buildComandoCards();

  // ── 2. General timer ────────────────────────────────────
  TIMERS.initGeneral();

  // ── 3. General roteiro slides ───────────────────────────
  SLIDES.initGeneral();

  // ── 4. Member sections ──────────────────────────────────
  buildMemberSections();

  // ── 5. Laws map ─────────────────────────────────────────
  LAWSMAP.init();

  // ── 6. Reveal on scroll ──────────────────────────────────
  initReveal();

  // ── 7. Textarea auto-resize ──────────────────────────────
  initTextareas();

  // ── 8. General roteiro expand btn ───────────────────────
  initExpandBtn('gExpandBtn', 'gRoteiroText');
});

/* ================================================================
   BUILD COMANDO CARDS
   ================================================================ */
function buildComandoCards() {
  const container = document.getElementById('comandoCards');
  if (!container) return;
  container.classList.add('stagger');

  SEMINAR.comandoCards.forEach(card => {
    const el = document.createElement('div');
    el.className = 'cmd-card reveal' + (card.highlight ? ' highlight' : '');
    el.innerHTML = `
      <div class="card-icon${card.iconStyle ? ' ' + card.iconStyle : ''}">
        <i class="${card.icon}"></i>
      </div>
      <div class="card-title">${card.title}</div>
      <p class="card-text">${card.text}</p>
    `;
    container.appendChild(el);
  });
}

/* ================================================================
   BUILD MEMBER SECTIONS
   ================================================================ */
function buildMemberSections() {
  const container = document.getElementById('memberSections');
  if (!container) return;

  SEMINAR.members.forEach((member, idx) => {
    const section = buildMemberSection(member, idx);
    container.appendChild(section);
  });
}

function buildMemberSection(member, idx) {
  const section = document.createElement('section');
  section.className = 'member-section section reveal';
  section.id = 'member-' + member.id;

  // Total time for this member
  const totalSec = member.timings.reduce((a, t) => a + t.seconds, 0);
  const totalMin = Math.floor(totalSec / 60);
  const totalS   = totalSec % 60;
  const timeStr  = totalMin > 0
    ? `${totalMin}min${totalS > 0 ? totalS + 's' : ''}`
    : `${totalSec}s`;

  // Phase tags
  const phaseTags = member.timings
    .map(t => `<span class="time-tag"><i class="fa-solid fa-stopwatch"></i>${t.label}: ${formatSeconds(t.seconds)}</span>`)
    .join('');

  const leaderBadge = member.id === 'daylan'
    ? `<span class="time-tag" style="background:rgba(230,57,70,0.15);border-color:rgba(230,57,70,0.4)">
         <i class="fa-solid fa-crown"></i>Líder
       </span>`
    : '';

  section.innerHTML = `
<div class="container">
  <!-- Member Header -->
  <div class="member-header">
    <div class="member-avatar" style="background:${member.color}20;color:${member.color};border-color:${member.color}">
      ${member.initial}
    </div>
    <div class="member-info">
      <h2 class="member-name" style="color:${member.color}">${member.name}</h2>
      <div class="member-role">${member.role}</div>
      <div class="member-time-info">
        ${leaderBadge}
        ${phaseTags}
        <span class="time-tag" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);color:var(--text2)">
          <i class="fa-solid fa-clock"></i>Total: ${timeStr}
        </span>
      </div>
    </div>

    <!-- Timer block -->
    <div class="member-timer-block">
      <div>
        <div class="timer-display" id="${member.id}-timer-display">
          ${formatMSS(member.timings[0].seconds)}
        </div>
        <div class="timer-phase" id="${member.id}-timer-phase">${member.timings[0].label}</div>
      </div>
      <div class="timer-controls">
        <button class="timer-btn" id="${member.id}-play-btn" aria-label="Play/Pause">
          <i class="fa-solid fa-play"></i>
        </button>
        <button class="timer-btn" id="${member.id}-reset-btn" aria-label="Reset">
          <i class="fa-solid fa-rotate-left"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- Dual Panel -->
  <div class="dual-panel">
    <!-- Roteiro -->
    <div class="panel panel-text" id="${member.id}-roteiro-panel">
      <div class="panel-header">
        <span class="panel-title">
          <i class="fa-solid fa-scroll"></i> Roteiro
        </span>
        <div class="panel-actions">
          <span style="font-size:0.7rem;color:var(--text3);font-weight:600">${member.emoji}</span>
          <button class="icon-btn" id="${member.id}-expand-btn" aria-label="Expandir">
            <i class="fa-solid fa-expand"></i>
          </button>
        </div>
      </div>
      <!-- Border progress overlay -->
      <div class="border-progress" id="${member.id}-border-progress">
        <svg class="bp-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect class="bp-rect" id="${member.id}-bp-rect" x="1" y="1" width="98" height="98" rx="8" ry="8"/>
        </svg>
      </div>
      <textarea class="roteiro-input" id="${member.id}-roteiro"
        placeholder="Digite o roteiro de ${member.name}…"
      >${member.roteiro || ''}</textarea>
    </div>

    <!-- Slides -->
    <div class="panel panel-slides" id="${member.id}-slides-panel">
      <div class="panel-header">
        <span class="panel-title">
          <i class="fa-solid fa-images"></i> Slides
        </span>
        <div class="panel-actions">
          <span class="slide-counter" id="${member.id}-slide-counter">1 / 1</span>
          <button class="icon-btn" id="${member.id}-add-slide" aria-label="Adicionar slide">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <div class="slides-viewport" id="${member.id}-slides-viewport">
        <div class="slides-track" id="${member.id}-slides-track"></div>
      </div>
      <div class="slides-nav">
        <button class="slide-nav-btn" id="${member.id}-prev-slide" aria-label="Slide anterior">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <div class="slide-dots" id="${member.id}-slide-dots"></div>
        <button class="slide-nav-btn" id="${member.id}-next-slide" aria-label="Próximo slide">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- References container -->
  <div id="${member.id}-refs-container"></div>
</div>
  `;

  // Initialize sub-modules after appending (need DOM)
  requestAnimationFrame(() => {
    // Timer
    const bpRect = document.getElementById(member.id + '-bp-rect');
    TIMERS.initMember(member.id, {
      displayEl:  document.getElementById(member.id + '-timer-display'),
      phaseEl:    document.getElementById(member.id + '-timer-phase'),
      playBtn:    document.getElementById(member.id + '-play-btn'),
      resetBtn:   document.getElementById(member.id + '-reset-btn'),
      borderRect: bpRect,
    });

    // Slides
    SLIDES.initMember(member.id, member.slideCount || 2);

    // References
    const refsContainer = document.getElementById(member.id + '-refs-container');
    REFS.init(member.id, refsContainer);

    // Expand btn
    initExpandBtn(member.id + '-expand-btn', member.id + '-roteiro');
  });

  return section;
}

/* ================================================================
   HELPERS
   ================================================================ */
function formatSeconds(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}min`;
  return `${m}min${s}s`;
}

function formatMSS(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function initExpandBtn(btnId, textareaId) {
  const btn = document.getElementById(btnId);
  const ta  = document.getElementById(textareaId);
  if (!btn || !ta) return;
  let expanded = false;
  btn.addEventListener('click', () => {
    expanded = !expanded;
    ta.style.maxHeight = expanded ? '1200px' : '600px';
    btn.innerHTML = expanded
      ? '<i class="fa-solid fa-compress"></i>'
      : '<i class="fa-solid fa-expand"></i>';
    btn.title = expanded ? 'Comprimir' : 'Expandir';
  });
}

function initTextareas() {
  // Auto-resize all .roteiro-input textareas
  document.querySelectorAll('.roteiro-input').forEach(ta => {
    function resize() {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 600) + 'px';
    }
    ta.addEventListener('input', resize);
    resize();
  });
}

function initReveal() {
  const els = document.querySelectorAll('.reveal, .stagger');
  const io  = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
}
