(() => {
  const cfg = window.LANDING_CONFIG || {};
  const products = cfg.products || {};
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
    brandLink.href = '/';
    brandLink.classList.add('brand-logo-link');
    brandLink.setAttribute('aria-label', 'Ir a la página principal de Mujer y Maternidad');
    brandLink.innerHTML = `<img class="brand-logo compact" src="${BRAND_LOGO}" alt="Mujer y Maternidad · Verónica Valencia · Matrona" />`;
  }

  const headerCta = document.querySelector('.header-cta');
  if (headerCta) {
    headerCta.textContent = 'Reservar';
    headerCta.href = '#elige';
  }

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

  document.querySelector('.trust-strip')?.remove();
  document.querySelector('.purchase-steps-section')?.remove();
  document.querySelector('.international-section')?.remove();
  document.querySelector('.combo-section')?.remove();
  document.querySelector('.next-step-section')?.remove();
  document.querySelector('.testimonials-placeholder')?.remove();
  document.querySelectorAll('.section-soft').forEach((section) => {
    if ((section.textContent || '').includes('Lo que incluye tu inscripción')) section.remove();
  });

  if (hero && !document.querySelector('[data-cro-proof-section]')) {
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
    hero.insertAdjacentElement('afterend', proof);
  }

  const featuredCard = document.querySelector('#elige .card-featured');
  if (featuredCard && !featuredCard.querySelector('[data-cro-payment-note]')) {
    const button = featuredCard.querySelector('.combo-link');
    if (button) {
      const note = document.createElement('p');
      note.className = 'cro-payment-note';
      note.setAttribute('data-cro-payment-note', 'true');
      note.textContent = 'Compra procesada de forma segura por Hotmart.';
      button.insertAdjacentElement('afterend', note);
    }
  }

  const profile = document.querySelector('.section-profile .profile-grid > div:last-child');
  if (profile) {
    profile.innerHTML = `
      <span class="eyebrow">QUIÉN TE ACOMPAÑA</span>
      <h2>Verónica Andrea Valencia Yáñez</h2>
      <p class="role">Matrona · Mujer y Maternidad</p>
      <p><strong>Soy Vero, matrona de profesión y vocación.</strong> Acompaño a mujeres a través de educación clara, herramientas prácticas y espacios cercanos para comprender mejor embarazo, postparto y lactancia.</p>
      <p>En este Día de Lactancia mi objetivo es ayudarte a ordenar dudas frecuentes y llegar con más herramientas para tomar decisiones informadas en el día a día.</p>
      <div class="cro-authority-points"><span>Matrona</span><span>Educación práctica</span><span>Acompañamiento cercano</span></div>`;
  }

  const faq = document.querySelector('.faq-section .container');
  if (faq) {
    faq.innerHTML = `
      <div class="section-heading centered"><span class="eyebrow">PREGUNTAS FRECUENTES</span><h2>Resuelve tus dudas antes de reservar</h2></div>
      <details><summary>¿Puedo comprar solamente uno de los talleres?</summary><p>Sí. Cada taller puede reservarse individualmente por US$33.</p></details>
      <details><summary>¿Qué ventaja tiene elegir el Día completo?</summary><p>Incluye los dos talleres por US$55. Por separado suman US$66, por lo que ahorras US$11.</p></details>
      <details><summary>¿El evento es online y en vivo?</summary><p>Sí. Introducción a la Lactancia es de 10:00 a 12:00 hrs Chile y Banco de Leche Materna de 16:00 a 18:00 hrs Chile.</p></details>
      <details><summary>¿Puedo conectarme desde otro país?</summary><p>Sí. Como referencia: Argentina 11:00/17:00, Colombia 09:00/15:00 y Ciudad de México 08:00/14:00.</p></details>
      <details><summary>¿Quedará grabado?</summary><p>Sí. La inscripción contempla acceso posterior a la grabación.</p></details>
      <details><summary>¿Puedo hacer preguntas?</summary><p>Sí. Habrá espacio para preguntas y respuestas durante la jornada.</p></details>
      <details><summary>¿Cómo se realiza el pago?</summary><p>La compra se completa en Hotmart, que mostrará las opciones de pago disponibles según tu ubicación.</p></details>`;
  }

  const finalCta = document.querySelector('.final-cta-inner');
  if (finalCta) {
    finalCta.innerHTML = `
      <span class="eyebrow light">29 DE AGOSTO · ONLINE EN VIVO</span>
      <h2>Llega a la lactancia con más información y menos improvisación</h2>
      <p>Elige la jornada completa o reserva únicamente el taller que necesitas.</p>
      <div class="final-offer">Día Completo · <strong>US$55</strong> · Ahorras US$11</div>
      <div class="final-actions">
        <a class="btn btn-light combo-link" data-product="combo" href="#">Reservar Día Completo · US$55</a>
        <a class="btn btn-outline-light checkout-link" data-product="introduction" href="#">Introducción · US$33</a>
        <a class="btn btn-outline-light checkout-link" data-product="milkBank" href="#">Banco de Leche · US$33</a>
      </div>`;
  }

  if (!document.querySelector('[data-cro-mobile-sticky]')) {
    const sticky = document.createElement('div');
    sticky.className = 'cro-mobile-sticky';
    sticky.setAttribute('data-cro-mobile-sticky', 'true');
    sticky.innerHTML = '<div class="cro-mobile-sticky-copy"><small>29 de agosto</small><strong>Día completo · US$55</strong></div><a class="btn btn-primary combo-link" data-product="combo" href="#">Reservar</a>';
    document.body.appendChild(sticky);
  }

  const testimonialScript = document.createElement('script');
  testimonialScript.src = '/testimonials.js';
  testimonialScript.defer = true;
  document.head.appendChild(testimonialScript);

  const carryTracking = (targetUrl) => {
    try {
      const target = new URL(targetUrl);
      const current = new URL(window.location.href);
      ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'].forEach((key) => {
        const value = current.searchParams.get(key);
        if (value && !target.searchParams.has(key)) target.searchParams.set(key, value);
      });
      return target.toString();
    } catch { return targetUrl; }
  };

  document.querySelectorAll('.checkout-link').forEach((link) => {
    const checkout = products[link.dataset.product]?.checkout;
    if (!checkout) return;
    link.href = carryTracking(checkout);
    link.target = '_self';
  });

  const combo = products.combo || {};
  document.querySelectorAll('.combo-link').forEach((link) => {
    if (!cfg.comboEnabled || !combo.checkout) return;
    link.classList.remove('is-disabled');
    link.removeAttribute('aria-disabled');
    link.href = carryTracking(combo.checkout);
    link.target = '_self';
  });

  document.querySelectorAll('footer p').forEach((p) => {
    const text = p.textContent.toLowerCase();
    if (text.includes('fines educativos') || text.includes('no reemplaza una evaluación')) p.remove();
  });

  document.querySelectorAll('footer').forEach((footer) => {
    if (footer.querySelector('[data-edin-credit]')) return;
    const credit = document.createElement('div');
    credit.dataset.edinCredit = 'true';
    credit.textContent = 'Sitio web creado por Servicio de Gestión EDIN';
    credit.style.cssText = 'max-width:1180px;margin:18px auto 0;padding:14px 24px 0;border-top:1px solid rgba(255,255,255,.16);font-size:.82rem;line-height:1.4;opacity:.72;text-align:center';
    footer.appendChild(credit);
  });

  const hostname = window.location.hostname.toLowerCase();
  const metaTrackingAllowed = hostname === 'mujerymaternidad.cl' || hostname === 'www.mujerymaternidad.cl' || hostname === 'localhost' || hostname === '127.0.0.1';

  // Un solo PageView/ViewContent por carga y nunca desde dominios técnicos como *.workers.dev.
  if (metaTrackingAllowed && cfg.metaPixelId && !window.__MYM_LANDING_META_SENT__) {
    window.__MYM_LANDING_META_SENT__ = true;
    const script = document.createElement('script');
    const pagePath = window.location.pathname;
    script.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${cfg.metaPixelId}');fbq('track','PageView',{page_name:'Día de Lactancia',page_path:'${pagePath}',page_type:'WORKSHOP'});fbq('track','ViewContent',{content_name:'Día de Lactancia',content_category:'Taller online',content_ids:['dia_lactancia_2026'],content_type:'product',value:55,currency:'USD',page_path:'${pagePath}'});`;
    document.head.appendChild(script);
  }
})();
