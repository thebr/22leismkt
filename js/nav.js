/* ================================================================
   NAV.JS — Navigation, member buttons, scroll spy
   ================================================================ */
'use strict';

(function () {
  const nav       = document.getElementById('siteNav');
  const navMembers = document.getElementById('navMembers');
  const heroTeam   = document.getElementById('heroTeam');
  const navMenuBtn = document.getElementById('navMenuBtn');

  if (!nav || !navMembers) return;

  // ── Build nav member buttons ──────────────────────────────
  const label = document.createElement('span');
  label.className = 'team-label';
  label.textContent = 'Equipe:';
  navMembers.appendChild(label);

  SEMINAR.members.forEach(m => {
    const btn = document.createElement('button');
    btn.className = 'nav-member-btn';
    btn.dataset.memberId = m.id;
    btn.style.borderColor = m.color + '40'; // 25% opacity border
    btn.innerHTML = `
      <span class="dot" style="background:${m.color}"></span>
      ${m.name}${m.id === 'daylan' ? ' <i class="fa-solid fa-crown" style="font-size:0.65rem;color:${m.color};margin-left:2px"></i>' : ''}
    `;
    btn.addEventListener('click', () => {
      scrollToMember(m.id);
      // Close mobile menu
      navMembers.classList.remove('open');
    });
    navMembers.appendChild(btn);
  });

  // ── Build hero team buttons ───────────────────────────────
  if (heroTeam) {
    const lbl = document.createElement('span');
    lbl.className = 'team-label';
    lbl.textContent = 'Equipe:';
    heroTeam.appendChild(lbl);

    SEMINAR.members.forEach(m => {
      const btn = document.createElement('button');
      btn.className = 'nav-member-btn';
      btn.style.cssText = `border-color:${m.color}; color:${m.color};`;
      btn.innerHTML = `<span class="dot" style="background:${m.color}"></span>${m.name}`;
      btn.addEventListener('click', () => scrollToMember(m.id));
      heroTeam.appendChild(btn);
    });
  }

  // ── Scroll to member section ──────────────────────────────
  function scrollToMember(id) {
    const section = document.getElementById('member-' + id);
    if (!section) return;
    const offset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 60;
    const top = section.getBoundingClientRect().top + window.scrollY - offset - 20;
    window.scrollTo({ top, behavior: 'smooth' });

    // Highlight on arrival
    setTimeout(() => {
      section.classList.add('active-section');
      const panel = section.querySelector('.panel-text');
      if (panel) {
        panel.classList.add('highlighted');
        setTimeout(() => panel.classList.remove('highlighted'), 2000);
      }
      setTimeout(() => section.classList.remove('active-section'), 3000);
    }, 600);

    // Mark active nav btn
    document.querySelectorAll('.nav-member-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.memberId === id);
    });
  }

  // ── Scroll spy ───────────────────────────────────────────
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      // Nav shadow
      nav.classList.toggle('scrolled', window.scrollY > 20);

      // Active member detection
      const navH = (parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h')) || 60) + 40;
      let current = '';
      SEMINAR.members.forEach(m => {
        const el = document.getElementById('member-' + m.id);
        if (!el) return;
        if (el.getBoundingClientRect().top <= navH) current = m.id;
      });
      document.querySelectorAll('.nav-member-btn').forEach(b => {
        b.classList.toggle('active', current && b.dataset.memberId === current);
      });
      ticking = false;
    });
  }, { passive: true });

  // ── Mobile menu toggle ────────────────────────────────────
  if (navMenuBtn) {
    navMenuBtn.addEventListener('click', () => {
      navMembers.classList.toggle('open');
    });
  }

  // Expose for other modules
  window.NAV = { scrollToMember };
})();
