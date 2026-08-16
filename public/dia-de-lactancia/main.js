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
    brandLink.setAttribute('aria-label', 'Volver al inicio de Mujer y Maternidad');
    brandLink.innerHTML = `<img class="brand-logo compact" src="${BRAND_LOGO}" alt="Mujer y Maternidad · Verónica Valencia · Matrona" />`;
    const img = brandLink.querySelector('img');
    if (img) {
      img.addEventListener('error', () => {
        brandLink.innerHTML = '<span class="brand-fallback">Mujer y Maternidad</span>';
      }, { once: true });
    }
  }

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
      replacements.forEach(([from, to]) => {
        value = value.split(from).join(to);
      });
      node.nodeValue = value;
    });
  }

  replaceText(document.body, [
    ["$59.980", "US$66"],
    ["$49.990", "US$55"],
    ["$29.990", "US$33"],
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
      link.textContent = "Reservar Día Completo · US$55";
      link.href = carryTracking(combo.checkout);
      link.target = "_self";
    }
  });

  if (cfg.metaPixelId) {
    const s = document.createElement("script");
    const pagePath = window.location.pathname;
    s.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${cfg.metaPixelId}');fbq('track','PageView',{page_name:'Día de Lactancia',page_path:'${pagePath}',page_type:'WORKSHOP'});fbq('track','ViewContent',{content_name:'Día de Lactancia',content_category:'Taller online',content_ids:['dia_lactancia_2026'],content_type:'product',value:55,currency:'USD',page_path:'${pagePath}'});`;
    document.head.appendChild(s);
  }
})();
