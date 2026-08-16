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

  const pixelId = '1060562626332842';
  if (!window.fbq) {
    const script = document.createElement('script');
    script.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`;
    document.head.appendChild(script);
  }
})();
