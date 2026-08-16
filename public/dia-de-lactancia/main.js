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

  const purchaseSteps = document.querySelector('.purchase-steps-section');
  if (purchaseSteps) {
    const heading = purchaseSteps.querySelector('.section-heading');
    const steps = purchaseSteps.querySelector('.steps-grid');
    if (heading) {
      heading.innerHTML = `
        <span class="eyebrow">RESERVA SIN COMPLICACIONES</span>
        <h2 id="purchase-steps-title">De la elección a tu inscripción</h2>
        <p>El proceso de compra se completa en Hotmart y queda separado de la navegación del sitio.</p>`;
    }
    if (steps) {
      steps.innerHTML = `
        <article class="step-card"><span>1</span><strong>Elige cómo participar</strong><p>Reserva Introducción, Banco de Leche o el Día de Lactancia completo.</p></article>
        <article class="step-card"><span>2</span><strong>Paga de forma segura</strong><p>El botón de tu opción abre el checkout de Hotmart para completar la compra.</p></article>
        <article class="step-card"><span>3</span><strong>Conserva tu confirmación</strong><p>Guarda la confirmación de compra y revisa las indicaciones asociadas a tu inscripción y acceso al evento.</p></article>`;
    }
  }

  const introSection = document.querySelector('#introduccion');
  if (introSection && !document.querySelector('[data-cro-outcomes]')) {
    const outcomes = document.createElement('section');
    outcomes.className = 'section cro-outcomes-section';
    outcomes.setAttribute('data-cro-outcomes', 'true');
    outcomes.innerHTML = `
      <div class="container">
        <div class="section-heading centered">
          <span class="eyebrow">LO QUE VAS A TRABAJAR</span>
          <h2>Una jornada para ordenar lo esencial y llevarlo a la práctica</h2>
          <p>Los dos talleres se complementan: primero comprendes bases de lactancia y luego aprendes a organizar extracción, conservación y banco de leche.</p>
        </div>
        <div class="cro-outcomes-grid">
          <article><strong>Comprender la producción y el agarre</strong><span>Qué observar y cómo interpretar situaciones frecuentes.</span></article>
          <article><strong>Ordenar mitos, dudas y crisis</strong><span>Información clara para reconocer conceptos importantes.</span></article>
          <article><strong>Organizar extracción y conservación</strong><span>Recipientes, rotulado, tiempos y temperaturas.</span></article>
          <article><strong>Planificar tu banco de leche</strong><span>Un sistema práctico pensando también en la vuelta al trabajo.</span></article>
        </div>
      </div>`;
    introSection.insertAdjacentElement('beforebegin', outcomes);
  }

  const profile = document.querySelector('.section-profile');
  if (profile) {
    const copy = profile.querySelector('.profile-grid > div:last-child');
    if (copy) {
      copy.innerHTML = `
        <span class="eyebrow">QUIÉN TE ACOMPAÑA</span>
        <h2>Verónica Andrea Valencia Yáñez</h2>
        <p class="role">Matrona · Mujer y Maternidad</p>
        <p><strong>Soy Vero, matrona de profesión y vocación.</strong> Mi propósito es acompañar a las mujeres a través de la educación, el bienestar y espacios seguros donde puedan comprender sus procesos con mayor confianza.</p>
        <p>A lo largo de mi camino he complementado mi experiencia clínica con formación en salud hormonal femenina y bienestar integral. En mis talleres busco transformar información que puede sentirse abrumadora en herramientas claras, prácticas y aplicables.</p>
        <p>Preparé este Día de Lactancia para que puedas ordenar dudas frecuentes, comprender mejor el proceso y llegar con más herramientas a las decisiones del día a día.</p>
        <div class="cro-authority-points">
          <span>Matrona</span>
          <span>Educación y herramientas prácticas</span>
          <span>Acompañamiento cercano y sin juicios</span>
        </div>`;
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

  const faq = document.querySelector('.faq-section .container');
  if (faq) {
    faq.innerHTML = `
      <div class="section-heading centered">
        <span class="eyebrow">PREGUNTAS FRECUENTES</span>
        <h2>Resuelve tus dudas antes de reservar</h2>
        <p>Lo esencial sobre formato, compra, grabación y formas de participar.</p>
      </div>
      <details><summary>¿Puedo comprar solamente uno de los talleres?</summary><p>Sí. Introducción a la Lactancia y Banco de Leche Materna pueden reservarse individualmente por US$33 cada uno.</p></details>
      <details><summary>¿Qué ventaja tiene elegir el Día de Lactancia completo?</summary><p>Incluye los dos talleres de la jornada por US$55. Comprados por separado suman US$66, por lo que el día completo tiene un ahorro de US$11.</p></details>
      <details><summary>¿El evento es online y en vivo?</summary><p>Sí. Introducción a la Lactancia se realiza de 10:00 a 12:00 hrs Chile y Banco de Leche Materna de 16:00 a 18:00 hrs Chile.</p></details>
      <details><summary>¿Qué pasa si después quiero volver a revisar el contenido?</summary><p>La inscripción contempla acceso posterior a la grabación de los talleres.</p></details>
      <details><summary>¿Puedo hacer preguntas durante el taller?</summary><p>Sí. La jornada contempla un espacio de preguntas y respuestas en directo.</p></details>
      <details><summary>¿Cómo se realiza el pago?</summary><p>La compra se completa a través del checkout seguro de Hotmart. Allí verás las opciones de pago disponibles para tu ubicación.</p></details>
      <details><summary>¿Puedo comprar desde fuera de Chile?</summary><p>Sí. La página incluye horarios de referencia para Argentina, Colombia y Ciudad de México, y los precios se muestran en USD.</p></details>
      <details><summary>¿Qué debo hacer después de comprar?</summary><p>Conserva la confirmación de Hotmart y revisa las indicaciones asociadas a tu inscripción y acceso al evento.</p></details>`;
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
      </div>
      <p class="cro-final-trust">Compra procesada de forma segura por Hotmart.</p>`;
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
