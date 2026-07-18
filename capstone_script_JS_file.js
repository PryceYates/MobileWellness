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

// Timeline draw-in animation when scrolled into view
const timeline = document.getElementById('timeline');
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

// Email form — front-end only placeholder (no backend wired up yet)
const ctaForm = document.getElementById('cta-form');
const ctaNote = document.getElementById('cta-note');

ctaForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  if (email) {
    ctaNote.textContent = "You're on the list — first reset lands Monday.";
    ctaForm.reset();
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
