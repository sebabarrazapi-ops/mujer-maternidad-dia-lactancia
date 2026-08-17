(() => {
  const palettes = {
    coral: { bg:'#fffaf7', surface:'#fff', soft:'#f7eeea', sage:'#edf3ef', text:'#2e2826', muted:'#6f625e', brand:'#b86b63', brandDark:'#884d47', line:'#eadbd5' },
    terracota: { bg:'#fffaf8', surface:'#fff', soft:'#f6ece8', sage:'#eef2ed', text:'#302825', muted:'#71615b', brand:'#a95f50', brandDark:'#774138', line:'#ead8d1' },
    rosa: { bg:'#fff9fa', surface:'#fff', soft:'#f8ecef', sage:'#f0f3ef', text:'#30282b', muted:'#716269', brand:'#b96f7d', brandDark:'#844b59', line:'#ead9de' },
    salvia: { bg:'#fbfcf9', surface:'#fff', soft:'#f0f3ed', sage:'#e5eee7', text:'#29302c', muted:'#626d66', brand:'#718b79', brandDark:'#4f6556', line:'#dbe4dc' },
    ciruela: { bg:'#fffafb', surface:'#fff', soft:'#f4ecef', sage:'#eef1ed', text:'#30282d', muted:'#6e6167', brand:'#8c6174', brandDark:'#654453', line:'#e4d8dd' }
  };

  const pageKey = location.pathname.startsWith('/dia-de-lactancia') ? 'day' : (location.pathname === '/' ? 'home' : null);
  if (!pageKey) return;

  const closestSection = (selector) => document.querySelector(selector)?.closest('section') || document.querySelector(selector);
  const maps = {
    home: {
      text: {
        heroTitle: '.hero h1', heroLead: '.hero .hero-lead',
        journeyTitle: '.journey-section h2', journeyLead: '.journey-section .section-heading p',
        guidanceTitle: '.guidance-box h2', guidanceLead: '.guidance-box p',
        pillarsTitle: '.professional-pillars-section h2', pillarsLead: '.professional-pillars-section .section-heading p',
        eventTitle: '.event-card h2', eventLead: '.event-card p',
        testimonialsTitle: '[data-testimonials-section] h2', resourcesTitle: '[data-free-resources] ~ *',
        aboutTitle: '.split h2', contactTitle: '.contact-band h2'
      },
      sections: {
        trust: () => document.querySelector('.trust-strip-global'),
        journey: () => document.querySelector('.journey-section'),
        guidance: () => closestSection('.guidance-box'),
        pillars: () => document.querySelector('.professional-pillars-section'),
        event: () => closestSection('.event-card'),
        testimonials: () => document.querySelector('[data-testimonials-section]'),
        resources: () => closestSection('[data-free-resources]'),
        about: () => closestSection('.split'),
        contact: () => document.querySelector('.contact-band')
      }
    },
    day: {
      text: {
        heroTitle: '.hero h1', heroLead: '.hero .hero-lead', proofTitle: '[data-cro-proof-section] h2',
        fitTitle: '.fit-section h2', pricingTitle: '#elige h2', introTitle: '#introduccion h2', bankTitle: '#banco h2',
        profileTitle: '.section-profile h2', faqTitle: '.faq-section h2', finalTitle: '.final-cta-inner h2'
      },
      sections: {
        proof: () => document.querySelector('[data-cro-proof-section]'), fit: () => document.querySelector('.fit-section'),
        pricing: () => document.querySelector('#elige'), intro: () => document.querySelector('#introduccion'), bank: () => document.querySelector('#banco'),
        profile: () => document.querySelector('.section-profile'), faq: () => document.querySelector('.faq-section'), final: () => document.querySelector('.final-cta')
      }
    }
  };

  const applyTheme = (name) => {
    const p = palettes[name] || palettes.coral;
    const root = document.documentElement.style;
    root.setProperty('--bg', p.bg); root.setProperty('--surface', p.surface); root.setProperty('--soft', p.soft); root.setProperty('--sage', p.sage);
    root.setProperty('--text', p.text); root.setProperty('--muted', p.muted); root.setProperty('--brand', p.brand); root.setProperty('--brand-dark', p.brandDark); root.setProperty('--line', p.line);
  };

  const apply = (config) => {
    if (!config || !config.pages) return;
    applyTheme(config.theme);
    const page = config.pages[pageKey] || {};
    const map = maps[pageKey];
    Object.entries(page.texts || {}).forEach(([key, value]) => {
      const selector = map.text[key];
      if (!selector || typeof value !== 'string') return;
      const node = document.querySelector(selector);
      if (node) node.textContent = value;
    });
    if (pageKey === 'home' && page.texts?.resourcesTitle) {
      const section = closestSection('[data-free-resources]');
      const h2 = section?.querySelector('h2');
      if (h2) h2.textContent = page.texts.resourcesTitle;
    }
    Object.entries(page.sections || {}).forEach(([key, enabled]) => {
      const node = map.sections[key]?.();
      if (node) node.hidden = enabled === false;
    });
    const order = Array.isArray(page.order) ? page.order : [];
    if (order.length) {
      const nodes = order.map((key) => map.sections[key]?.()).filter(Boolean);
      if (nodes.length > 1) {
        const parent = nodes[0].parentElement;
        if (parent && nodes.every((n) => n.parentElement === parent)) nodes.forEach((n) => parent.appendChild(n));
      }
    }
  };

  window.addEventListener('message', (event) => {
    if (event.origin !== location.origin) return;
    const data = event.data;
    if (data?.type === 'mym-editorial-preview') apply(data.config);
  });

  const preview = new URLSearchParams(location.search).get('editorial_preview') === '1';
  fetch(`/api/content${preview ? '?preview=1' : ''}`, { credentials:'same-origin', cache:'no-store' })
    .then((r) => r.ok ? r.json() : null)
    .then(apply)
    .catch(() => {});
})();
