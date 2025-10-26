// Luxurious interactive behavior — script.js
document.addEventListener('DOMContentLoaded', () => {
  // set year
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  // smooth internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', href);
      }
    });
  });

  // active nav on scroll
  const links = Array.from(document.querySelectorAll('.topnav-link'));
  const sections = links.map(l => document.querySelector(l.getAttribute('href')));

  function setActive() {
    const offset = window.scrollY + window.innerHeight * 0.35;
    sections.forEach((sec, i) => {
      if (!sec) return;
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (offset >= top && offset < bottom) {
        links.forEach(x => x.classList.remove('active'));
        links[i].classList.add('active');
      }
    });
  }
  setActive();
  window.addEventListener('scroll', setActive, { passive: true });

  // progress animations (skills)
  const fills = document.querySelectorAll('.bar-fill');
  fills.forEach(f => {
    const w = f.style.width || '0';
    f.style.width = '0';
    setTimeout(() => { f.style.width = w; }, 200);
  });

  // CTA interactions
  const scheduleBtn = document.getElementById('scheduleBtn');
  if (scheduleBtn) scheduleBtn.addEventListener('click', () => {
    window.open('https://calendly.com/', '_blank'); // placeholder link
  });

  const hireBtns = document.querySelectorAll('#hireBtn, #hireBtn2');
  hireBtns.forEach(b => b.addEventListener('click', () => {
    location.href = '#contact';
    // simple highlight
    const c = document.querySelector('#contact');
    if (c) c.style.boxShadow = '0 0 30px rgba(138,77,255,0.18)';
    setTimeout(() => { if (c) c.style.boxShadow = ''; }, 2000);
  }));

  // Download CV buttons (dummy)
  const dl = document.getElementById('downloadCv');
  const dl2 = document.getElementById('downloadCv2');
  [dl, dl2].forEach(el => {
    if (!el) return;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const blob = new Blob([`Ap4k — CV\n\nExperience:\n- Go: 2 years\n- HTML/CSS/JS: 4 years\n\nProjects: https://github.com/Ap4kk`], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'Ap4k_CV.txt';
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    });
  });

  // minimal reveal animations
  const reveal = document.querySelectorAll('.panel, .project, .profile-card, .fcard');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('visible');
        obs.unobserve(ent.target);
      }
    });
  }, { threshold: 0.15 });

  reveal.forEach(r => obs.observe(r));
});
