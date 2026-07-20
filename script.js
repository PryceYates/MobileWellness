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
      ctaNote.textContent = "You're on the list, first reset lands Monday.";
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
  const today = new Date();
  el.textContent = today.toLocaleDateString('en-US', { month: 'long' }) + ' Challenge';
});

// ============================================
// DAILY CHALLENGE ROTATION
// 7 challenges, one selected per day. The selection is seeded by the
// calendar date (not random each page load), so every visitor sees the
// same challenge on the same day — but which of the 7 it is looks
// unpredictable day to day rather than cycling in a fixed 1-2-3-4 order.
// ============================================
const DAILY_CHALLENGES = [
  {
    id: 'two-minute-trigger',
    title: 'The Two-Minute Trigger',
    lead: "Pick one recurring cue today, and move for two minutes every single time it happens. Simple enough to start in the next five minutes.",
    steps: [
      "Agree on one shared cue for the day: every call that ends, every hour on the hour, every time someone posts in the team channel.",
      "Whenever the cue happens, stand up and move for at least two minutes. Stretch, walk the hallway, whatever's available.",
      "Log each one under your team: Marketing, Sales, Engineering, whichever team you're on.",
      "Your team's score for the day is the average number of triggers hit per person, so team size doesn't decide the outcome. Compare your team's average against the other teams running the challenge today."
    ],
    framework: { href: 'framework-two-minute-reset.html', label: 'the Elite Habits framework' }
  },
  {
    id: 'stair-case',
    title: 'The Stair Case',
    lead: "No elevator today. Every single time you'd normally take it, take the stairs instead, and log it under your team.",
    steps: [
      "For the whole day, treat the elevator as off-limits. Stairs only, every trip, no exceptions you don't have to make.",
      "Keep a rough tally as you go: a note on your phone works fine.",
      "Log your day's total under your team: Marketing, Sales, Engineering, whichever team you're on.",
      "Your team's score is the average number of stair trips per person, so a bigger team isn't automatically ahead. Compare against the other teams running it today."
    ],
    framework: { href: 'framework-friction-audit.html', label: 'the Friction Audit framework' }
  },
  {
    id: 'standing-call',
    title: 'The Standing Call',
    lead: "Every call you take today, phone or video, take it standing up.",
    steps: [
      "Commit to standing for every call today, start to finish. Sitting back down when it ends is fine.",
      "If a call runs long, treat that as more standing time, not a reason to sit.",
      "Log how many calls you stood for under your team name.",
      "Your team's score is the average number of standing calls per person. Compare your team's average against everyone else running it today."
    ],
    framework: { href: 'framework-default-setting.html', label: 'the Default Settings framework' }
  },
  {
    id: 'walk-and-talk',
    title: 'Walk & Talk',
    lead: "Turn at least one conversation today, a 1:1, a catch-up, a quick sync, into a walking conversation instead of a sit-down one.",
    steps: [
      "Pick one conversation on today's calendar that doesn't need a screen or notes.",
      "Take it as a walk instead: with a coworker in person, or on the phone solo.",
      "Log it under your team once it's done.",
      "Your team's score is the average number of walk-and-talks per person today. Compare against the other teams running the challenge."
    ],
    framework: { href: 'framework-team-pulse.html', label: 'the Team Pulse framework' }
  },
  {
    id: 'water-lap',
    title: 'The Water Lap',
    lead: "Every time you refill water or coffee today, take the longest reasonable route there and back.",
    steps: [
      "Every refill today, skip the closest option and walk to a farther one: a different floor's kitchen, the far end of the office, whatever adds a real lap.",
      "Keep a rough count of how many laps you get in.",
      "Log your total under your team name.",
      "Your team's score is the average number of laps per person. Compare your team's average against the others running it today."
    ],
    framework: { href: 'framework-friction-audit.html', label: 'the Friction Audit framework' }
  },
  {
    id: 'full-stretch',
    title: 'The Full Stretch',
    lead: "One full-body stretch, three minutes, before lunch today. That's the whole challenge.",
    steps: [
      "Set a reminder for right before your usual lunch break.",
      "When it goes off, take three full minutes for a full-body stretch: neck, shoulders, back, legs, whatever needs it.",
      "Log it under your team once it's done.",
      "Your team's score is the percentage of the team who completed theirs today. Compare against the other teams running it."
    ],
    framework: { href: 'framework-two-minute-reset.html', label: 'the Elite Habits framework' }
  },
  {
    id: 'desk-break',
    title: 'The Desk Break',
    lead: "Every 50 minutes today, stand up and move for 60 seconds before the next hour starts.",
    steps: [
      "Set a repeating timer for :50 past every hour during the workday.",
      "When it goes off, stand and move for sixty seconds, stretch, pace, whatever's available, before sitting back down.",
      "Log how many you hit under your team name.",
      "Your team's score is the average number of desk breaks per person today. Compare against the other teams running it."
    ],
    framework: { href: 'framework-two-minute-reset.html', label: 'the Elite Habits framework' }
  }
];

function todaysChallenge() {
  const now = new Date();
  // Pack today's local date into a single integer, then run it through a
  // strong integer hash (a "triple32" bit-mixer) so consecutive days land
  // on scattered, unpredictable-looking indices rather than stepping
  // through the list in order.
  const daynum = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  let a = daynum;
  a = Math.imul(a ^ (a >>> 16), 0x45d9f3b);
  a = Math.imul(a ^ (a >>> 16), 0x45d9f3b);
  a = (a ^ (a >>> 16)) >>> 0;
  const index = a % DAILY_CHALLENGES.length;
  return DAILY_CHALLENGES[index];
}

// Inject today's challenge into the Challenges listing card
const dailyCardTitle = document.getElementById('daily-card-title');
const dailyCardLead = document.getElementById('daily-card-lead');
if (dailyCardTitle && dailyCardLead) {
  const c = todaysChallenge();
  dailyCardTitle.textContent = c.title;
  dailyCardLead.textContent = c.lead;
}

// Inject today's challenge into the daily challenge detail page
const dailyTitleEl = document.getElementById('daily-title');
if (dailyTitleEl) {
  const c = todaysChallenge();
  dailyTitleEl.textContent = c.title;
  document.getElementById('daily-sub').textContent = c.lead;
  const stepsList = document.getElementById('daily-steps');
  stepsList.innerHTML = '';
  c.steps.forEach(step => {
    const li = document.createElement('li');
    li.textContent = step;
    stepsList.appendChild(li);
  });
  const frameworkLink = document.getElementById('daily-framework-link');
  frameworkLink.href = c.framework.href;
  frameworkLink.textContent = c.framework.label;
  document.title = c.title + ': Momentum';
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
