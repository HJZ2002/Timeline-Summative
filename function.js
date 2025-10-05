(function () {
  const timeline = document.querySelector('.timeline.alt');
  const items = document.querySelectorAll('.timeline.alt .t-item');
  const cards = document.querySelectorAll('.card');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  const sections = [...document.querySelectorAll('main section[id]')];

  // Enable reveal system 
  document.documentElement.classList.add('reveal-ready');

  // Grow the timeline center line when visible
  if (timeline) {
    const lineObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) timeline.classList.add('draw');
      });
    }, { threshold: 0.1 });
    lineObs.observe(timeline);
  }

  // Reveal cards and timeline items with stagger
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  // Add staggered delays
  [...cards].forEach((el, i) => {
    el.style.transitionDelay = (i * 60) + 'ms';
    revealObs.observe(el);
  });
  [...items].forEach((el, i) => {
    el.style.transitionDelay = (i * 90) + 'ms';
    revealObs.observe(el);
  });

  // Smooth scroll for focus action
  navLinks.forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      // allow default browser smooth behavior via CSS; just set focus later
      setTimeout(() => target.setAttribute('tabindex', '-1') || target.focus(), 400);
    });
  });

  // Scroll-spy: highlight nav link
  const spy = () => {
    const y = window.scrollY + window.innerHeight * 0.35;
    let current = sections[0]?.id || '';
    for (const s of sections) {
      const rect = s.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      if (top <= y) current = s.id;
    }
    navLinks.forEach(l => {
      const m = l.getAttribute('href') === ('#' + current);
      l.classList.toggle('active', m);
    });
  };
  window.addEventListener('scroll', spy, { passive: true });
  window.addEventListener('resize', spy);
  spy(); // initial
})();

