/* ================================================================
   SLIDES.JS — Slide panel with drag/swipe navigation
   ================================================================ */
'use strict';

window.SLIDES = {};

function createSlidePanel(config) {
  /*
    config = {
      trackEl:    Element  — .slides-track
      counterEl:  Element  — shows "N / total"
      dotsEl:     Element  — dots container
      prevBtn:    Element
      nextBtn:    Element
      addBtn:     Element
      maxSlides:  number
      prefix:     string  — unique id prefix
    }
  */
  let slides     = [];
  let current    = 0;
  let isDragging = false;
  let startX     = 0;
  let dragDelta  = 0;
  const THRESHOLD = 60; // px to trigger slide change

  function makeSlot(index) {
    const slot = document.createElement('div');
    slot.className = 'slide-slot';
    slot.dataset.index = index;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.id = config.prefix + '-file-' + index;

    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'slide-empty';
    emptyDiv.innerHTML = `
      <i class="fa-solid fa-image"></i>
      <span>Clique para adicionar<br/>imagem do slide</span>
    `;
    emptyDiv.addEventListener('click', () => fileInput.click());

    const delBtn = document.createElement('button');
    delBtn.className = 'slide-delete';
    delBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    delBtn.title = 'Remover imagem';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearSlot(index);
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => setSlotImage(index, ev.target.result);
      reader.readAsDataURL(file);
    });

    slot.appendChild(fileInput);
    slot.appendChild(emptyDiv);
    slot.appendChild(delBtn);

    // Fullscreen on img click
    slot.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') openModal(e.target.src);
    });

    return slot;
  }

  function setSlotImage(index, src) {
    const slot = slides[index];
    if (!slot) return;
    // Remove empty state
    const empty = slot.querySelector('.slide-empty');
    if (empty) empty.style.display = 'none';
    // Remove existing img
    const oldImg = slot.querySelector('img');
    if (oldImg) oldImg.remove();
    // Add new img
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Slide ' + (index + 1);
    slot.insertBefore(img, slot.querySelector('.slide-delete'));
    slot.querySelector('.slide-delete').style.opacity = '';
  }

  function clearSlot(index) {
    const slot = slides[index];
    if (!slot) return;
    const img   = slot.querySelector('img');
    const empty = slot.querySelector('.slide-empty');
    if (img) img.remove();
    if (empty) empty.style.display = '';
    const fi = slot.querySelector('input[type="file"]');
    if (fi) fi.value = '';
  }

  function buildSlides(count) {
    config.trackEl.innerHTML = '';
    slides = [];
    for (let i = 0; i < count; i++) {
      const slot = makeSlot(i);
      config.trackEl.appendChild(slot);
      slides.push(slot);
    }
    current = 0;
    render();
  }

  function addSlide() {
    if (slides.length >= (config.maxSlides || 20)) return;
    const i    = slides.length;
    const slot = makeSlot(i);
    config.trackEl.appendChild(slot);
    slides.push(slot);
    goTo(i);
    render();
  }

  function goTo(i) {
    current = Math.max(0, Math.min(i, slides.length - 1));
    render();
  }

  function render() {
    // Move track
    config.trackEl.style.transform = `translateX(-${current * 100}%)`;

    // Counter
    if (config.counterEl) {
      config.counterEl.textContent = `${current + 1} / ${slides.length}`;
    }

    // Dots
    if (config.dotsEl) {
      config.dotsEl.innerHTML = '';
      slides.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'slide-dot' + (i === current ? ' active' : '');
        d.addEventListener('click', () => goTo(i));
        config.dotsEl.appendChild(d);
      });
    }

    // Buttons
    if (config.prevBtn) config.prevBtn.disabled = current === 0;
    if (config.nextBtn) config.nextBtn.disabled = current === slides.length - 1;
  }

  // ── Navigation buttons ──────────────────────────────────
  if (config.prevBtn) config.prevBtn.addEventListener('click', () => goTo(current - 1));
  if (config.nextBtn) config.nextBtn.addEventListener('click', () => goTo(current + 1));
  if (config.addBtn)  config.addBtn.addEventListener('click', addSlide);

  // ── Touch / drag support ─────────────────────────────────
  const vp = config.trackEl.parentElement; // .slides-viewport
  if (vp) {
    vp.addEventListener('mousedown', dragStart, { passive: false });
    vp.addEventListener('touchstart', dragStart, { passive: true });
    window.addEventListener('mousemove', dragMove, { passive: false });
    window.addEventListener('touchmove', dragMove, { passive: false });
    window.addEventListener('mouseup', dragEnd);
    window.addEventListener('touchend', dragEnd);
  }

  function getClientX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
  }

  function dragStart(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
    isDragging = true;
    startX = getClientX(e);
    dragDelta = 0;
    config.trackEl.style.transition = 'none';
  }

  function dragMove(e) {
    if (!isDragging) return;
    dragDelta = getClientX(e) - startX;
    const offset = -(current * 100) + (dragDelta / vp.offsetWidth) * 100;
    config.trackEl.style.transform = `translateX(${offset}%)`;
    if (Math.abs(dragDelta) > 5 && e.cancelable) e.preventDefault();
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    config.trackEl.style.transition = '';
    if (dragDelta < -THRESHOLD)       goTo(current + 1);
    else if (dragDelta > THRESHOLD)   goTo(current - 1);
    else                              render();
    dragDelta = 0;
  }

  // ── Modal helper ─────────────────────────────────────────
  function openModal(src) {
    const overlay = document.getElementById('imgModal');
    const img     = document.getElementById('imgModalImg');
    if (!overlay || !img) return;
    img.src = src;
    overlay.classList.add('open');
  }

  return { buildSlides, addSlide, goTo, setSlotImage };
}

/* ── Init general roteiro slides ────────────────────────────── */
SLIDES.initGeneral = function () {
  const panel = createSlidePanel({
    trackEl:   document.getElementById('gSlidesTrack'),
    counterEl: document.getElementById('gSlideCounter'),
    dotsEl:    document.getElementById('gSlideDots'),
    prevBtn:   document.getElementById('gPrevSlide'),
    nextBtn:   document.getElementById('gNextSlide'),
    addBtn:    document.getElementById('gAddSlideBtn'),
    maxSlides: 20,
    prefix:    'g'
  });
  panel.buildSlides(3); // Start with 3 slots (capa + slides iniciais)
  SLIDES.general = panel;
};

/* ── Init member slides ──────────────────────────────────────── */
SLIDES.initMember = function (memberId, slideCount) {
  const prefix = memberId;
  const panel  = createSlidePanel({
    trackEl:   document.getElementById(prefix + '-slides-track'),
    counterEl: document.getElementById(prefix + '-slide-counter'),
    dotsEl:    document.getElementById(prefix + '-slide-dots'),
    prevBtn:   document.getElementById(prefix + '-prev-slide'),
    nextBtn:   document.getElementById(prefix + '-next-slide'),
    addBtn:    document.getElementById(prefix + '-add-slide'),
    maxSlides: 5,
    prefix:    prefix
  });
  panel.buildSlides(Math.max(1, slideCount));
  return panel;
};

/* ── Modal close ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('imgModal');
  const closeBtn = document.getElementById('imgModalClose');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', () => {
    document.getElementById('imgModal').classList.remove('open');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const m = document.getElementById('imgModal');
      if (m) m.classList.remove('open');
    }
  });
});
