/* =============================================
   CLASSIS / WeddingMusic – JavaScript
   ============================================= */

// ---- Navbar scroll effect ----
// Only pages with a video hero (currently just the homepage) should
// toggle the light-on-video vs. scrolled look. Inner pages render
// pre-scrolled and must stay that way at every scroll position.
const navbar = document.getElementById('navbar');
const hasHero = !!document.getElementById('hero');
if (hasHero) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(6px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});

// ---- Intersection Observer – fade-in ----
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.fade-in'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// ---- Animated counter ----
function animateCount(el, target, duration = 1800) {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    // ease out expo
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const statsSection = document.getElementById('stats');
if (statsSection) {
  let countStarted = false;
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countStarted) {
      countStarted = true;
      document.querySelectorAll('.stat-number').forEach(el => {
        animateCount(el, parseInt(el.dataset.target, 10));
      });
    }
  }, { threshold: 0.4 });
  statsObserver.observe(statsSection);
}

// ---- Smooth active nav highlight ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}, { passive: true });

// ---- Contact form – sends via FormSubmit, result shown in a popup ----
const form = document.getElementById('contactForm');
if (form) {
  const lang = (document.documentElement.lang || 'ro').slice(0, 2);
  const T = {
    ro: {
      sendingTitle: 'Se trimite mesajul…',
      sendingText: 'Vă rugăm așteptați câteva secunde, nu închideți pagina.',
      okTitle: 'Mulțumim! Mesajul a fost trimis.',
      okText: 'Am primit solicitarea dumneavoastră și vă răspundem în maximum 24 de ore.',
      errTitle: 'Mesajul nu a putut fi trimis',
      errText: 'Vă rugăm încercați din nou peste câteva minute sau scrieți-ne direct la',
      close: 'Închide',
      sendingBtn: 'Se trimite…',
    },
    en: {
      sendingTitle: 'Sending your message…',
      sendingText: 'Please wait a few seconds and keep this page open.',
      okTitle: 'Thank you! Your message has been sent.',
      okText: 'We have received your request and will reply within 24 hours.',
      errTitle: 'Your message could not be sent',
      errText: 'Please try again in a few minutes or email us directly at',
      close: 'Close',
      sendingBtn: 'Sending…',
    },
    hu: {
      sendingTitle: 'Üzenet küldése…',
      sendingText: 'Kérjük, várjon néhány másodpercet, és ne zárja be az oldalt.',
      okTitle: 'Köszönjük! Üzenetét elküldtük.',
      okText: 'Megkaptuk megkeresését, és legkésőbb 24 órán belül válaszolunk.',
      errTitle: 'Az üzenetet nem sikerült elküldeni',
      errText: 'Kérjük, próbálja újra néhány perc múlva, vagy írjon nekünk közvetlenül:',
      close: 'Bezárás',
      sendingBtn: 'Küldés…',
    },
  };
  const txt = T[lang] || T.ro;
  const CONTACT_EMAIL = 'info@classis.ro';

  // Popup markup (built once)
  const modal = document.createElement('div');
  modal.className = 'form-modal';
  modal.hidden = true;
  modal.innerHTML =
    '<div class="form-modal-card" role="dialog" aria-modal="true" aria-labelledby="formModalTitle" aria-live="polite">' +
      '<div class="form-modal-icon" aria-hidden="true"></div>' +
      '<h3 id="formModalTitle" class="form-modal-title"></h3>' +
      '<p class="form-modal-text"></p>' +
      '<button type="button" class="btn btn-primary form-modal-close"></button>' +
    '</div>';
  document.body.appendChild(modal);
  const mIcon = modal.querySelector('.form-modal-icon');
  const mTitle = modal.querySelector('.form-modal-title');
  const mText = modal.querySelector('.form-modal-text');
  const mClose = modal.querySelector('.form-modal-close');
  mClose.textContent = txt.close;

  const ICONS = {
    sending: '<span class="form-modal-spinner"></span>',
    ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="7" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>',
  };
  let busy = false;

  function showModal(state) {
    modal.dataset.state = state;
    mIcon.innerHTML = ICONS[state];
    mClose.hidden = state === 'sending';
    if (state === 'sending') {
      mTitle.textContent = txt.sendingTitle;
      mText.textContent = txt.sendingText;
    } else if (state === 'ok') {
      mTitle.textContent = txt.okTitle;
      mText.textContent = txt.okText;
    } else {
      mTitle.textContent = txt.errTitle;
      mText.textContent = txt.errText + ' ';
      const a = document.createElement('a');
      a.href = 'mailto:' + CONTACT_EMAIL;
      a.textContent = CONTACT_EMAIL;
      mText.appendChild(a);
    }
    modal.hidden = false;
    document.body.classList.add('modal-open');
    if (state !== 'sending') mClose.focus();
  }
  function hideModal() {
    if (busy) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
  }
  mClose.addEventListener('click', hideModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) hideModal(); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (busy) return;
    busy = true;
    const btn = form.querySelector('.btn-submit');
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = txt.sendingBtn;
    showModal('sending');

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 30000);

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' },
      signal: ctrl.signal,
    })
      .then((res) => res.json().catch(() => ({})).then((data) => {
        // FormSubmit answers 200 with success:"false" e.g. while the form is not activated
        if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'send failed');
      }))
      .then(() => {
        form.reset();
        busy = false;
        showModal('ok');
      })
      .catch(() => {
        busy = false;
        showModal('error');
      })
      .finally(() => {
        clearTimeout(timer);
        btn.innerHTML = original;
        btn.disabled = false;
      });
  });
}

// (the rest of stats observer code below was already conditional)
