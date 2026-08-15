(() => {
  const cfg = window.LANDING_CONFIG || {};
  const products = cfg.products || {};

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

  function trackCheckoutClick(productKey) {
    if (typeof window.fbq === "function") {
      window.fbq("track", "InitiateCheckout", {
        content_name: products[productKey]?.name || productKey,
        currency: cfg.currency || "CLP",
        value: products[productKey]?.price || 0
      });
    }
  }

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
    link.addEventListener("click", () => trackCheckoutClick(key));
  });

  const combo = products.combo || {};
  document.querySelectorAll(".combo-link").forEach((link) => {
    if (cfg.comboEnabled && combo.checkout) {
      link.classList.remove("is-disabled");
      link.removeAttribute("aria-disabled");
      link.textContent = "Reservar Día Completo · $49.990";
      link.href = carryTracking(combo.checkout);
      link.addEventListener("click", () => trackCheckoutClick("combo"));
    }
  });

  if (cfg.metaPixelId) {
    const s = document.createElement("script");
    s.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${cfg.metaPixelId}');fbq('track','PageView');`;
    document.head.appendChild(s);
  }
})();
