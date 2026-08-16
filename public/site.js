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

  const applyLogo = () => {
    document.querySelectorAll('.site-header .brand').forEach((brand) => {
      brand.href = '/';
      brand.classList.add('brand-logo-link');
      brand.setAttribute('aria-label', 'Ir al inicio de Mujer y Maternidad');
      brand.innerHTML = `<img class="brand-logo compact" src="${BRAND_LOGO}" alt="Mujer y Maternidad · Verónica Valencia · Matrona" />`;
      const img = brand.querySelector('img');
      if (img) {
        img.addEventListener('error', () => {
          brand.innerHTML = '<span class="brand-fallback">Mujer y Maternidad</span>';
        }, { once: true });
      }
    });
  };

  applyLogo();

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
    const path = pathString.split('.');
    let value = content;
    path.forEach((key) => { value = value?.[key]; });
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
  if (trustRoot) {
    trustRoot.innerHTML = (content.trustSignals || []).map((signal) => `<span class="trust-signal">${signal}</span>`).join('');
  }

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
    const resources = content.freeResources || [];
    freeRoot.innerHTML = resources.map((item) => `<article class="card resource-card"><span class="card-tag">${item.type === 'pdf' ? 'LECTURA' : 'RECURSO GRATUITO'}</span><h3>${item.title}</h3><p>${item.description}</p><a class="btn btn-secondary" href="${item.url}" target="_blank" rel="noopener noreferrer">Abrir recurso</a></article>`).join('');
  }

  const productRoot = document.querySelector('[data-digital-products]');
  if (productRoot) {
    const products = content.catalogs?.digitalProducts || [];
    productRoot.innerHTML = products.map((product) => {
      const active = product.status === 'active' && product.url;
      const cta = active
        ? `<a class="btn btn-secondary" href="${product.url}">Ver producto${product.price ? ` · ${product.price}` : ''}</a>`
        : `<span class="catalog-status">Próximamente</span>`;
      return `<article class="card product-card"><span class="card-tag">${product.type === 'ebook' ? 'EBOOK' : 'RECURSO DIGITAL'}</span><h3>${product.title}</h3><p>${product.description}</p>${cta}</article>`;
    }).join('');
  }

  const testimonialSection = document.querySelector('[data-testimonials-section]');
  const testimonialRoot = document.querySelector('[data-testimonials]');
  if (testimonialSection && testimonialRoot) {
    const testimonials = (content.testimonials || []).filter((item) => item.authorization_confirmed === true);
    if (!testimonials.length) {
      testimonialSection.hidden = true;
    } else {
      testimonialSection.hidden = false;
      testimonialRoot.innerHTML = testimonials.map((item) => `<article class="testimonial-card"><div class="testimonial-mark">“</div><p>${item.quote}</p><strong>${item.publication_name || item.name || 'Testimonio verificado'}</strong>${item.service_context ? `<span>${item.service_context}</span>` : ''}</article>`).join('');
    }
  }

  document.querySelectorAll('[data-social]').forEach((link) => {
    const key = link.dataset.social;
    const url = content.contact?.[key];
    if (url) link.href = url;
  });

  document.querySelectorAll('footer').forEach((footer) => {
    if (footer.querySelector('[data-edin-credit]')) return;
    const credit = document.createElement('div');
    credit.setAttribute('data-edin-credit', 'true');
    credit.textContent = 'Sitio web creado por Servicio de Gestión EDIN';
    credit.style.maxWidth = '1180px';
    credit.style.margin = '18px auto 0';
    credit.style.padding = '14px 24px 0';
    credit.style.borderTop = '1px solid rgba(255,255,255,.16)';
    credit.style.fontSize = '.82rem';
    credit.style.lineHeight = '1.4';
    credit.style.opacity = '.72';
    credit.style.textAlign = 'center';
    footer.appendChild(credit);
  });

  const pageKey = document.body.dataset.analyticsPage || '';
  const pageMeta = content.analytics?.[pageKey] || {
    pageId: pageKey || 'unknown',
    pageType: 'GENERAL',
    pageName: document.title
  };

  const pixelId = '1060562626332842';
  if (!window.fbq) {
    const script = document.createElement('script');
    const safeMeta = JSON.stringify({
      page_id: pageMeta.pageId,
      page_type: pageMeta.pageType,
      page_name: pageMeta.pageName,
      page_path: window.location.pathname
    });
    script.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView',${safeMeta});`;
    document.head.appendChild(script);
  }
})();
