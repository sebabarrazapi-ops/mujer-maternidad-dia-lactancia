(() => {
  const BRAND_LOGO = '/assets/brand-logo.svg';
  const BRAND_MARK = '/assets/brand-mark.svg';

  const ensureStylesheet = (href, marker) => {
    if (document.querySelector(`link[${marker}]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute(marker, 'true');
    document.head.appendChild(link);
  };

  ensureStylesheet('/brand.css', 'data-brand-styles');
  ensureStylesheet('/phase-a.css', 'data-phase-a-styles');

  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  favicon.type = 'image/svg+xml';
  favicon.href = BRAND_MARK;

  document.querySelectorAll('.site-header .brand').forEach((brand) => {
    brand.href = '/';
    brand.classList.add('brand-logo-link');
    brand.setAttribute('aria-label', 'Ir al inicio de Mujer y Maternidad');
    brand.innerHTML = `<img class="brand-logo compact" src="${BRAND_LOGO}" alt="Mujer y Maternidad · Verónica Valencia · Matrona" />`;
  });

  const menuButton = document.querySelector('[data-menu-toggle]');
  const navLinks = document.querySelector('.nav-links');
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
  }

  const content = window.MYM_CONTENT || {};
  const readContentPath = (pathString) => {
    let value = content;
    pathString.split('.').forEach((key) => { value = value?.[key]; });
    return value;
  };

  document.querySelectorAll('[data-content]').forEach((node) => {
    const value = readContentPath(node.dataset.content);
    if (typeof value === 'string') node.textContent = value;
  });

  const journeyRoot = document.querySelector('[data-journey-stages]');
  if (journeyRoot) {
    const stages = (content.journeyStages || []).filter((item) => item.status === 'active');
    journeyRoot.innerHTML = stages.map((item) => {
      const attrs = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a class="journey-card" href="${item.url}"${attrs}><small>${item.eyebrow || ''}</small><strong>${item.title}</strong><p>${item.description}</p><span class="journey-cta">Ver opciones →</span></a>`;
    }).join('');
  }

  const trustRoot = document.querySelector('[data-trust-signals]');
  if (trustRoot) trustRoot.innerHTML = (content.trustSignals || []).map((signal) => `<span class="trust-signal">${signal}</span>`).join('');

  const pillarsRoot = document.querySelector('[data-professional-pillars]');
  if (pillarsRoot) {
    pillarsRoot.innerHTML = (content.professional?.pillars || []).map((item) => `<article class="card"><span class="card-tag">MUJER Y MATERNIDAD</span><h3>${item.title}</h3><p>${item.description}</p></article>`).join('');
  }

  const servicesRoot = document.querySelector('[data-service-categories]');
  if (servicesRoot) {
    servicesRoot.innerHTML = (content.servicesPage?.categories || []).map((item) => {
      const attrs = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      const topics = (item.topics || []).map((topic) => `<li>${topic}</li>`).join('');
      return `<article class="service-detail-card"><span class="eyebrow">${item.eyebrow || ''}</span><h2>${item.title}</h2><p>${item.description}</p>${topics ? `<ul class="service-topic-list">${topics}</ul>` : ''}<a class="btn btn-secondary" href="${item.ctaUrl}"${attrs}>${item.ctaLabel}</a></article>`;
    }).join('');
  }

  const quickRoot = document.querySelector('[data-quick-links]');
  if (quickRoot) {
    const links = content.quickLinks || [];
    quickRoot.innerHTML = links.map((item) => {
      const attrs = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a class="quick-link" href="${item.url}"${attrs}><span class="quick-link-copy"><small>${item.eyebrow || ''}</small><strong>${item.title}</strong></span><span class="quick-link-arrow" aria-hidden="true">→</span></a>`;
    }).join('');
  }

  const freeRoot = document.querySelector('[data-free-resources]');
  if (freeRoot) {
    freeRoot.innerHTML = (content.freeResources || []).map((item) => `<article class="card resource-card"><span class="card-tag">${item.type === 'pdf' ? 'LECTURA' : 'RECURSO GRATUITO'}</span><h3>${item.title}</h3><p>${item.description}</p><a class="btn btn-secondary" href="${item.url}" target="_blank" rel="noopener noreferrer">Abrir recurso</a></article>`).join('');
  }

  const productRoot = document.querySelector('[data-digital-products]');
  if (productRoot) {
    const products = content.catalogs?.digitalProducts || [];
    productRoot.innerHTML = products.map((product) => {
      const active = product.status === 'active' && product.url;
      const cta = active ? `<a class="btn btn-secondary" href="${product.url}">Ver producto${product.price ? ` · ${product.price}` : ''}</a>` : `<span class="catalog-status">Próximamente</span>`;
      return `<article class="card product-card"><span class="card-tag">${product.type === 'ebook' ? 'EBOOK' : 'RECURSO DIGITAL'}</span><h3>${product.title}</h3><p>${product.description}</p>${cta}</article>`;
    }).join('');
  }

  document.querySelectorAll('[data-social]').forEach((link) => {
    const url = content.contact?.[link.dataset.social];
    if (url) link.href = url;
  });

  const pageKey = document.body.dataset.analyticsPage || '';

  if (pageKey === 'home') {
    const h1 = document.querySelector('.hero h1');
    const lead = document.querySelector('.hero .hero-lead');
    if (h1) h1.textContent = 'Información clara y acompañamiento profesional para embarazo, parto, postparto y lactancia';
    if (lead) lead.textContent = 'Soy Verónica Andrea Valencia Yáñez, Matrona. Aquí puedes encontrar consultas, talleres y recursos prácticos para comprender mejor cada etapa y elegir el apoyo que necesitas.';
    document.querySelector('.phase-a-note')?.remove();

    // Evita que la Home se convierta en un catálogo repetitivo. Conserva ruta, oferta, prueba y autoridad.
    document.querySelector('.hub-section')?.remove();
    document.querySelector('#areas')?.remove();
    document.querySelector('#recursos')?.remove();

    const eventSection = Array.from(document.querySelectorAll('section')).find((s) => s.querySelector('.event-card'));
    const testimonialsSection = document.querySelector('[data-testimonials-section]');
    if (eventSection && testimonialsSection) eventSection.insertAdjacentElement('afterend', testimonialsSection);
  }

  document.querySelectorAll('footer p').forEach((paragraph) => {
    const text = paragraph.textContent.trim().toLowerCase();
    if (text.includes('información educativa') || text.includes('fines educativos') || text.includes('no reemplaza una evaluación')) paragraph.remove();
  });

  document.querySelectorAll('footer').forEach((footer) => {
    if (footer.querySelector('[data-edin-credit]')) return;
    const credit = document.createElement('div');
    credit.dataset.edinCredit = 'true';
    credit.textContent = 'Sitio web creado por Servicio de Gestión EDIN';
    credit.style.cssText = 'max-width:1180px;margin:18px auto 0;padding:14px 24px 0;border-top:1px solid rgba(255,255,255,.16);font-size:.82rem;line-height:1.4;opacity:.72;text-align:center';
    footer.appendChild(credit);
  });

  const pageMeta = content.analytics?.[pageKey] || { pageId: pageKey || 'unknown', pageType: 'GENERAL', pageName: document.title };
  const pixelId = '1060562626332842';
  if (!window.__MYM_GLOBAL_META_SENT__) {
    window.__MYM_GLOBAL_META_SENT__ = true;
    const script = document.createElement('script');
    const safeMeta = JSON.stringify({ page_id: pageMeta.pageId, page_type: pageMeta.pageType, page_name: pageMeta.pageName, page_path: window.location.pathname });
    script.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView',${safeMeta});`;
    document.head.appendChild(script);
  }
})();
