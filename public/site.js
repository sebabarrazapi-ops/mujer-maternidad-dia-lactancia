(() => {
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navLinks = document.querySelector('.nav-links');
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
  }

  const content = window.MYM_CONTENT || {};

  document.querySelectorAll('[data-content]').forEach((node) => {
    const path = node.dataset.content.split('.');
    let value = content;
    path.forEach((key) => { value = value?.[key]; });
    if (typeof value === 'string') node.textContent = value;
  });

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
    const testimonials = content.testimonials || [];
    if (!testimonials.length) {
      testimonialSection.hidden = true;
    } else {
      testimonialSection.hidden = false;
      testimonialRoot.innerHTML = testimonials.map((item) => `<article class="testimonial-card"><div class="testimonial-mark">“</div><p>${item.quote}</p><strong>${item.name || 'Testimonio verificado'}</strong>${item.context ? `<span>${item.context}</span>` : ''}</article>`).join('');
    }
  }

  document.querySelectorAll('[data-social]').forEach((link) => {
    const key = link.dataset.social;
    const url = content.contact?.[key];
    if (url) link.href = url;
  });

  const pixelId = '1060562626332842';
  if (!window.fbq) {
    const script = document.createElement('script');
    script.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`;
    document.head.appendChild(script);
  }
})();
