'use strict';

/* Hamburger / Mobile Nav */
(function () {
  const toggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  if (!toggle || !navList) return;
  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    }
  });
})();

/* Active Nav Link */
(function () {
  const links = document.querySelectorAll('nav ul a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === current) link.classList.add('active');
  });
})();

/* Form Submission Toast */
(function () {
  const forms = document.querySelectorAll('form[data-submit]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast(form.dataset.submit);
    });
  });
})();

function showToast(id) {
  const toast = document.getElementById(id) || document.getElementById('toast-default');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3800);
}

/* Queue Token Checker */
(function () {
  const form   = document.getElementById('token-form');
  const result = document.getElementById('token-result');
  if (!form || !result) return;
  const queue = {
    'Q-061': { status: 'Serving Now', dept: 'General OPD',  wait: 'You are next!' },
    'Q-062': { status: 'Called',      dept: 'General OPD',  wait: '~5 min' },
    'Q-063': { status: 'Waiting',     dept: 'General OPD',  wait: '~15 min' },
    'Q-064': { status: 'Waiting',     dept: 'General OPD',  wait: '~20 min' },
    'Q-065': { status: 'Waiting',     dept: 'General OPD',  wait: '~25 min' },
    'Q-066': { status: 'Waiting',     dept: 'General OPD',  wait: '~30 min' },
    'P-012': { status: 'Serving Now', dept: 'Paediatrics',   wait: 'You are next!' },
    'D-007': { status: 'Called',      dept: 'Dental',        wait: '~5 min' },
    'M-018': { status: 'Serving Now', dept: 'Maternity',     wait: 'You are next!' },
    'PH-033':{ status: 'Serving Now', dept: 'Pharmacy',      wait: 'You are next!' },
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const token = document.getElementById('token-input').value.trim().toUpperCase();
    if (!token) return;
    const info = queue[token];
    result.style.background = '';
    result.style.borderColor = '';
    result.style.color = '';
    if (info) {
      result.innerHTML = `<strong>Token ${token}</strong> — ${info.dept}<br>
        Status: <span class="status ${statusClass(info.status)}">${info.status}</span>
        &nbsp;|&nbsp; Estimated wait: <strong>${info.wait}</strong>`;
    } else {
      result.innerHTML = `<strong>Token ${token}</strong> was not found. Please check your number or visit the reception desk.`;
      result.style.background = '#fce4e4';
      result.style.borderColor = 'var(--danger)';
      result.style.color = 'var(--danger)';
    }
    result.classList.add('show');
  });
  function statusClass(s) {
    if (s === 'Serving Now') return 'status-serving';
    if (s === 'Called')      return 'status-called';
    return 'status-waiting';
  }
})();

/* Live Clock */
(function () {
  const el = document.getElementById('live-clock');
  if (!el) return;
  const tick = () => {
    el.textContent = new Date().toLocaleTimeString('en-BW', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  tick();
  setInterval(tick, 1000);
})();

/* Date min = today */
(function () {
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"][data-min-today]').forEach(inp => {
    inp.setAttribute('min', today);
  });
})();

/* Scroll Fade-In */
(function () {
  const targets = document.querySelectorAll('.fade-in');
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(t => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(22px)';
    t.style.transition = 'opacity .5s ease, transform .5s ease';
    obs.observe(t);
  });
})();

/* Account edit toggle */
(function () {
  const editBtn = document.getElementById('edit-btn');
  const formSection = document.getElementById('edit-form');
  if (!editBtn || !formSection) return;
  editBtn.addEventListener('click', () => {
    const hidden = formSection.style.display === 'none' || formSection.style.display === '';
    formSection.style.display = hidden ? 'block' : 'none';
    editBtn.textContent = hidden ? '✕ Cancel Edit' : '✏️ Edit My Details';
  });
})();
