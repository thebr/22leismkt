/* ================================================================
   TIMERS.JS — Individual countdown timers with border progress
   ================================================================ */
'use strict';

window.TIMERS = {};

/* ── Generic timer factory ───────────────────────────────────── */
function createTimer(config) {
  /*
    config = {
      displayEl:    Element  — shows MM:SS
      phaseEl:      Element  — shows phase label (optional)
      playBtn:      Element
      resetBtn:     Element
      borderRect:   SVGRectElement (bp-rect class)
      timings:      [{ label, seconds }, ...]  — phases
      onDone:       fn() callback
      barFill:      Element (optional, for general timer bar)
    }
  */
  const state = {
    phaseIndex:  0,
    elapsed:     0,         // seconds elapsed in current phase
    running:     false,
    finished:    false,
    interval:    null,
  };

  function totalCurrentPhase() {
    return config.timings[state.phaseIndex].seconds;
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  function updateDisplay() {
    const rem = totalCurrentPhase() - state.elapsed;
    const remClamped = Math.max(0, rem);
    if (config.displayEl) {
      config.displayEl.textContent = formatTime(remClamped);
      config.displayEl.classList.toggle('running', state.running && !state.finished);
      config.displayEl.classList.toggle('done',    state.finished);
    }
    if (config.phaseEl) {
      config.phaseEl.textContent = config.timings[state.phaseIndex].label;
    }
  }

  function updateBorder() {
    if (!config.borderRect) return;
    const total   = totalCurrentPhase();
    const progress = Math.min(state.elapsed / total, 1);
    const perimeter = config.borderRect.getTotalLength
      ? config.borderRect.getTotalLength()
      : 400; // fallback

    const dashOffset = perimeter * (1 - progress);
    config.borderRect.style.strokeDasharray  = perimeter;
    config.borderRect.style.strokeDashoffset = dashOffset;
    config.borderRect.classList.toggle('done', state.finished);
  }

  function updateBarFill() {
    if (!config.barFill) return;
    // For general timer bar: fill as time passes
    const total = config.timings.reduce((a,t) => a + t.seconds, 0);
    // calc total elapsed across all phases
    let totalElapsed = 0;
    for (let i = 0; i < state.phaseIndex; i++) totalElapsed += config.timings[i].seconds;
    totalElapsed += state.elapsed;
    const pct = Math.min((totalElapsed / total) * 100, 100);
    config.barFill.style.width = pct + '%';
    config.barFill.classList.toggle('done', state.finished);
  }

  function tick() {
    if (!state.running || state.finished) return;
    state.elapsed++;
    const total = totalCurrentPhase();

    if (state.elapsed >= total) {
      state.elapsed = total;
      updateDisplay();
      updateBorder();
      updateBarFill();

      // Check if more phases
      if (state.phaseIndex < config.timings.length - 1) {
        // Phase done — auto-pause, wait for play to continue
        pause();
        state.finished = false; // not fully done yet
        if (config.phaseEl) config.phaseEl.textContent = '✓ ' + config.timings[state.phaseIndex].label + ' — pressione ▶ para continuar';
        // Visual: keep green on border momentarily
        if (config.borderRect) config.borderRect.classList.add('done');
        if (config.displayEl)  config.displayEl.classList.add('done');
        // Store that we finished this phase
        state._phaseDone = true;
      } else {
        // All phases done
        state.finished = true;
        pause();
        if (config.onDone) config.onDone();
        if (config.displayEl) config.displayEl.classList.add('done');
      }
      return;
    }

    updateDisplay();
    updateBorder();
    updateBarFill();
  }

  function play() {
    if (state.finished) return;

    // If last phase was just completed, advance to next
    if (state._phaseDone && state.phaseIndex < config.timings.length - 1) {
      state.phaseIndex++;
      state.elapsed = 0;
      state._phaseDone = false;
      // Reset border for new phase
      if (config.borderRect) {
        config.borderRect.classList.remove('done');
        config.borderRect.style.strokeDashoffset = 400;
      }
      if (config.displayEl) config.displayEl.classList.remove('done');
    }

    state.running = true;
    if (config.playBtn) {
      config.playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      config.playBtn.classList.add('play-active');
    }
    state.interval = setInterval(tick, 1000);
    updateDisplay();
    updateBorder();
    updateBarFill();
  }

  function pause() {
    state.running = false;
    clearInterval(state.interval);
    if (config.playBtn) {
      config.playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      config.playBtn.classList.remove('play-active');
    }
  }

  function reset() {
    pause();
    state.finished  = false;
    state._phaseDone = false;
    state.elapsed   = 0;

    // Multi-phase timers: reset to start of current phase
    // (already at start of current phase since we only advance on play)
    if (config.borderRect) {
      config.borderRect.classList.remove('done');
      const perimeter = 392;
      config.borderRect.style.strokeDasharray  = perimeter;
      config.borderRect.style.strokeDashoffset = perimeter;
    }
    if (config.displayEl) config.displayEl.classList.remove('done', 'running');
    if (config.barFill) {
      config.barFill.style.width = '0%';
      config.barFill.classList.remove('done');
    }
    updateDisplay();
  }

  function toggle() {
    if (state.running) pause();
    else play();
  }

  // Wire up buttons
  if (config.playBtn)  config.playBtn.addEventListener('click', toggle);
  if (config.resetBtn) config.resetBtn.addEventListener('click', reset);

  // Init border perimeter after render
  requestAnimationFrame(() => {
    if (config.borderRect) {
      const len = 392; // 2*(98+98) based on SVG rect 98x98
      config.borderRect.style.strokeDasharray  = len;
      config.borderRect.style.strokeDashoffset = len;
    }
    updateDisplay();
  });

  return { play, pause, reset, toggle, state };
}

/* ── General timer (10:00) ───────────────────────────────────── */
TIMERS.initGeneral = function () {
  const displayEl = document.getElementById('gTimerDisplay');
  const playBtn   = document.getElementById('gPlayBtn');
  const resetBtn  = document.getElementById('gResetBtn');
  const barFill   = document.getElementById('gTimerFill');

  if (!displayEl) return;

  const t = createTimer({
    displayEl,
    playBtn,
    resetBtn,
    barFill,
    timings: [{ label: 'Apresentação', seconds: 600 }],
    onDone: () => {
      displayEl.textContent = '00:00';
      displayEl.style.color = 'var(--green-neon)';
      if (barFill) barFill.style.background = 'var(--green-neon)';
    }
  });

  TIMERS.general = t;
};

/* ── Member timers ───────────────────────────────────────────── */
TIMERS.initMember = function (memberId, opts) {
  /*
    opts = {
      displayEl, phaseEl, playBtn, resetBtn, borderRect
    }
  */
  const member = SEMINAR.members.find(m => m.id === memberId);
  if (!member) return null;

  return createTimer({
    ...opts,
    timings: member.timings,
    onDone: () => {
      if (opts.displayEl) opts.displayEl.textContent = '00:00';
    }
  });
};
