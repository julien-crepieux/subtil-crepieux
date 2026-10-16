// Filtre de la chronologie par époque
const buttons = document.querySelectorAll('.era-btn');
const events = document.querySelectorAll('.timeline li');

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const era = btn.dataset.era;
    buttons.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', String(active));
    });
    events.forEach((li) => {
      li.hidden = era !== 'all' && li.dataset.era !== era;
    });
  });
});

// Apparition progressive des dates au défilement
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        reveal.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  events.forEach((li) => {
    li.classList.add('reveal');
    reveal.observe(li);
  });
}

// Lien de navigation actif selon la section visible
const links = document.querySelectorAll('.site-nav a');
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));
}
