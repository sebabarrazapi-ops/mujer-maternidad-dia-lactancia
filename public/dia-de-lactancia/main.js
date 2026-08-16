(() => {
  const cfg = window.LANDING_CONFIG || {};
  const products = cfg.products || {};
  const BRAND_LOGO = '/assets/brand-logo.svg';
  const BRAND_MARK = '/assets/brand-mark.svg';

  const ensureStylesheet = (href, dataKey) => {
    if (!document.querySelector(`link[${dataKey}]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.setAttribute(dataKey, 'true');
      document.head.appendChild(link);
    }
  };

  ensureStylesheet('/brand.css', 'data-brand-styles');
  ensureStylesheet('/dia-de-lactancia/phase-a.css', 'data-landing-phase-a-styles');
  ensureStylesheet('/dia-de-lactancia/cro-v2.css', 'data-cro-v2-styles');

  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  favicon.type = 'image/svg+xml';
  favicon.href = BRAND_MARK;

  const brandLink = document.querySelector('.site-header .brand');
  if (brandLink) {
    brandLink.href = '#inicio';
    brandLink.classList.add('brand-logo-link');
    brandLink.setAttribute('aria-label', 'Volver al inicio de Día de Lactancia');
    brandLink.innerHTML = `<img class="brand-logo compact" src="${BRAND_LOGO}" alt="Mujer y Maternidad · Verónica Valencia · Matrona" />`;
    const img = brandLink.querySelector('img');
    if (img) {
      img.addEventListener('error', () => {
        brandLink.innerHTML = '<span class="brand-fallback">Mujer y Maternidad</span>';
      }, { once: true });
    }
  }

  const headerCta = document.querySelector('.header-cta');
  if (headerCta) headerCta.textContent = 'Reservar';

  const hero = document.querySelector('.hero');
  if (hero) {
    const eyebrow = hero.querySelector('.eyebrow');
    const title = hero.querySelector('h1');
    const lead = hero.querySelector('.hero-lead');
    const subcopy = hero.querySelector('.hero-subcopy');
    const microcopy = hero.querySelector('.microcopy');

    if (eyebrow) eyebrow.textContent = 'DÍA DE LACTANCIA · 29 DE AGOSTO · ONLINE EN VIVO';
    if (title) title.textContent = 'Prepárate para la lactancia antes de tener que improvisar';
    if (lead) lead.textContent = 'Comprende qué observar en los primeros días y aprende a organizar extracción y banco de leche con información clara, práctica y guiada.';
    if (subcopy) subcopy.innerHTML = 'Una jornada con <strong>dos talleres en vivo</strong>, junto a <strong>Verónica Andrea Valencia Yáñez, Matrona</strong>.';
    if (microcopy) microcopy.innerHTML = '<strong>Pago seguro a través de Hotmart.</strong> También puedes reservar cada taller por separado por US$33.';

    const heroCopy = hero.querySelector('.hero-copy');
    if (heroCopy && !heroCopy.querySelector('[data-cro-benefits]')) {
      const benefits = document.createElement('div');
      benefits.className = 'cro-hero-benefits';
      benefits.setAttribute('data-cro-benefits', 'true');
      benefits.innerHTML = '<span>✓ En vivo</span><span>✓ Grabación disponible</span><span>✓ Espacio de preguntas</span>';
      const schedule = heroCopy.querySelector('.schedule');
      if (schedule) heroCopy.insertBefore(benefits, schedule);
    }
  }

  const trustStrip = document.querySelector('.trust-strip');
  if (trustStrip && !document.querySelector('[data-cro-proof-section]')) {
    const proof = document.createElement('section');
    proof.className = 'cro-proof-section';
    proof.setAttribute('data-cro-proof-section', 'true');
    proof.hidden = true;
    proof.innerHTML = `
      <div class="container">
        <div class="cro-proof-heading">
          <span class="eyebrow">EXPERIENCIAS REALES</span>
          <h2>Más claridad y confianza para vivir la lactancia</h2>
          <p>Experiencias compartidas por personas que ya participaron en espacios de lactancia con Verónica.</p>
        </div>
        <div class="cro-proof-grid" data-cro-proof-root></div>
      </div>`;
    trustStrip.insertAdjacentElement('afterend', proof);
  }

  const featuredCard = document.querySelector('#elige .card-featured');
  if (featuredCard && !featuredCard.querySelector('[data-cro-payment-note]')) {
    const primaryButton = featuredCard.querySelector('.combo-link');
    if (primaryButton) {
      const note = document.createElement('p');
      note.className = 'cro-payment-note';
      note.setAttribute('data-cro-payment-note', 'true');
      note.textContent = 'Compra procesada de forma segura por Hotmart.';
      primaryButton.insertAdjacentElement('afterend', note);
    }
  }

  const nextStepBox = document.querySelector('.next-step-section .next-step-box');
  if (nextStepBox) {
    nextStepBox.innerHTML = `
      <div>
        <span class="eyebrow">ANTES DE RESERVAR</span>
        <h2 id="next-step-title">Todo lo importante antes de elegir</h2>
        <p>La jornada se realiza el 29 de agosto, es online y en vivo, y puedes participar en un solo taller o elegir el Día de Lactancia completo.</p>
        <div class="cro-closing-facts">
          <span><strong>US$55</strong>Día completo</span>
          <span><strong>US$33</strong>Cada taller</span>
          <span><strong>Grabación</strong>Disponible después</span>
        </div>
      </div>
      <div class="next-step-actions cro-closing-actions">
        <a class="btn btn-primary combo-link" data-product="combo" href="#">Reservar Día Completo · US$55</a>
        <a class="btn btn-secondary" href="#elige">Comparar las 3 opciones</a>
        <small>El pago se completa en el checkout seguro de Hotmart.</small>
      </div>`;
  }

  if (!document.querySelector('[data-cro-mobile-sticky]')) {
    const sticky = document.createElement('div');
    sticky.className = 'cro-mobile-sticky';
    sticky.setAttribute('data-cro-mobile-sticky', 'true');
    sticky.innerHTML = `
      <div class="cro-mobile-sticky-copy"><small>29 de agosto</small><strong>Día completo · US$55</strong></div>
      <a class="btn btn-primary combo-link" data-product="combo" href="#">Reservar</a>`;
    document.body.appendChild(sticky);
  }

  const testimonialsPlaceholder = document.querySelector('.testimonials-placeholder');
  if (testimonialsPlaceholder && !testimonialsPlaceholder.id) testimonialsPlaceholder.id = 'testimonios';

  const testimonialScript = document.createElement('script');
  testimonialScript.src = '/testimonials.js';
  testimonialScript.defer = true;
  testimonialScript.addEventListener('load', () => {
    const authorizedTestimonials = (window.MYM_TESTIMONIALS || []).filter((item) => item.authorization_confirmed === true && item.publication_ready !== false);
    if (!authorizedTestimonials.length && testimonialsPlaceholder) {
      testimonialsPlaceholder.hidden = true;
      testimonialsPlaceholder.setAttribute('aria-hidden', 'true');
    }
  });
  document.head.appendChild(testimonialScript);

  function carryTracking(targetUrl) {
    try {
      const target = new URL(targetUrl);
      const current = new URL(window.location.href);
      const keys = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","fbclid"];
      keys.forEach((key) => {
        const value = current.searchParams.get(key);
        if (value && !target.searchParams.has(key)) target.searchParams.set(key, value);
      });
      return target.toString();
    } catch {
      return targetUrl;
    }
  }

  function replaceText(root, replacements) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      let value = node.nodeValue;
      replacements.forEach(([from, to]) => { value = value.split(from).join(to); });
      node.nodeValue = value;
    });
  }

  replaceText(document.body, [
    ["$59.980", "US$66"], ["$49.990", "US$55"], ["$29.990", "US$33"],
    ["Ahorras $9.990", "Ahorras US$11"],
    ["Verónica Valencia Yáñez", "Verónica Andrea Valencia Yáñez"],
    ["El enlace del Día Completo se habilitará apenas esté disponible en Hotmart.", "También puedes elegir el Día de Lactancia completo por US$55."],
    ["Combo disponible próximamente", "Reservar Día Completo · US$55"],
    ["Enlace del combo pendiente", "Reservar Día Completo · US$55"]
  ]);

  document.querySelectorAll(".checkout-link").forEach((link) => {
    const key = link.dataset.product;
    const checkout = products[key]?.checkout;
    if (!checkout) {
      link.classList.add("is-disabled");
      link.setAttribute("aria-disabled", "true");
      return;
    }
    link.href = carryTracking(checkout);
    link.target = "_self";
  });

  const combo = products.combo || {};
  document.querySelectorAll(".combo-link").forEach((link) => {
    if (cfg.comboEnabled && combo.checkout) {
      link.classList.remove("is-disabled");
      link.removeAttribute("aria-disabled");
      if (!link.closest('[data-cro-mobile-sticky]')) link.textContent = "Reservar Día Completo · US$55";
      link.href = carryTracking(combo.checkout);
      link.target = "_self";
    }
  });

  document.querySelectorAll('footer p').forEach((paragraph) => {
    const text = paragraph.textContent.trim().toLowerCase();
    const isGenericDisclaimer = text.includes('fines educativos') || text.includes('no reemplaza una evaluación') || text.includes('información entregada no reemplaza');
    if (isGenericDisclaimer) paragraph.remove();
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

  if (cfg.metaPixelId) {
    const s = document.createElement("script");
    const pagePath = window.location.pathname;
    s.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${cfg.metaPixelId}');fbq('track','PageView',{page_name:'Día de Lactancia',page_path:'${pagePath}',page_type:'WORKSHOP'});fbq('track','ViewContent',{content_name:'Día de Lactancia',content_category:'Taller online',content_ids:['dia_lactancia_2026'],content_type:'product',value:55,currency:'USD',page_path:'${pagePath}'});`;
    document.head.appendChild(s);
  }
})();
