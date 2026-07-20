// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// Timeline draw-in animation when scrolled into view (homepage only)
const timeline = document.getElementById('timeline');
if (timeline) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timeline.classList.add('in-view');
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(timeline);
  } else {
    timeline.classList.add('in-view');
  }
}

// Email form — front-end only placeholder (no backend wired up yet)
const ctaForm = document.getElementById('cta-form');
const ctaNote = document.getElementById('cta-note');

if (ctaForm) {
  ctaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    if (email) {
      ctaNote.textContent = "You're on the list — first reset lands Monday.";
      ctaForm.reset();
    }
  });
}

// Dynamic challenge date labels (today's date / this week / this month)
document.querySelectorAll('[data-challenge-tag="daily"]').forEach(el => {
  const today = new Date();
  el.textContent = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) + ' Challenge';
});
document.querySelectorAll('[data-challenge-tag="weekly"]').forEach(el => {
  el.textContent = "This Week's Challenge";
});
document.querySelectorAll('[data-challenge-tag="monthly"]').forEach(el => {
  el.textContent = "This Month's Challenge";
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
