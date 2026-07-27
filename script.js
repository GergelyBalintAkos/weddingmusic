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

// ---- Contact form – sends via FormSubmit ----
const form = document.getElementById('contactForm');
if (form) form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.btn-submit');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = 'Se trimite...';

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' },
  })
    .then((res) => {
      if (!res.ok) throw new Error('Trimiterea a eșuat');
      btn.innerHTML = 'Mesaj trimis ✓';
      btn.style.background = '#4a7c59';
      form.reset();
    })
    .catch(() => {
      btn.innerHTML = 'Eroare — încearcă din nou';
      btn.style.background = '#a83232';
    })
    .finally(() => {
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    });
});

// (the rest of stats observer code below was already conditional)
