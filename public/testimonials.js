window.MYM_TESTIMONIALS = [
  {
    id: 'TEST-001',
    quote: 'Nos encantó nuestra sesión con Verónica. Nos sentimos escuchados en nuestras preocupaciones y Verónica se dio el tiempo de responder a todas nuestras preguntas. Después de la sesión pude implementar algunos de sus consejos de forma inmediata. Mi experiencia con la lactancia ha mejorado un montón. ¡Súper felices con nuestra experiencia!',
    publication_name: 'Paciente de lactancia',
    service_context: 'Acompañamiento de lactancia',
    authorization_confirmed: true,
    publication_ready: true,
    rating: null,
    rating_label: '',
    related_pages: ['home', 'dia-de-lactancia']
  },
  {
    id: 'TEST-002',
    quote: 'Tomamos el taller de lactancia con Verónica unos días después del nacimiento. En el taller aprendimos mucho sobre cómo extraer leche, usar el extractor adecuado, manejar y almacenar la leche. Todo ello me dio más seguridad para hacerlo en casa. Mi esposo también estuvo presente y ambos aprendimos mucho.',
    publication_name: 'Participante de taller de lactancia',
    service_context: 'Taller de lactancia',
    authorization_confirmed: true,
    publication_ready: true,
    rating: 5,
    rating_label: '5 estrellas para ambos talleres',
    related_pages: ['home', 'dia-de-lactancia']
  },
  {
    id: 'TEST-003',
    quote: 'Me acuerdo que después de tu asesoría, mi hija subió medio kilo en una semana a puro pecho. ¡El pediatra no se la creía jaja!',
    publication_name: 'Paciente de lactancia',
    service_context: 'Acompañamiento de lactancia',
    authorization_confirmed: true,
    publication_ready: false,
    publication_hold_reason: 'Resultado específico de peso infantil; no se publica en la web comercial.',
    rating: null,
    rating_label: '',
    related_pages: []
  },
  {
    id: 'TEST-006',
    quote: 'Me gusta mucho tu calma al momento de hacer la asesoría. Me sirvió mucho que ayudaras con las posiciones para poder darle pechuga a mi guagua. Obvio te recomendé a mis amigas que están a punto de ser mamás. 💗',
    publication_name: 'Paciente de lactancia',
    service_context: 'Asesoría de lactancia',
    authorization_confirmed: true,
    publication_ready: true,
    rating: null,
    rating_label: '',
    related_pages: ['home']
  }
];

(() => {
  const page = location.pathname.startsWith('/dia-de-lactancia') ? 'day' : 'home';
  const pageId = page === 'day' ? 'dia-de-lactancia' : 'home';
  const canonicalById = new Map((window.MYM_TESTIMONIALS || []).map((item) => [item.id, item]));

  const fallback = () => (window.MYM_TESTIMONIALS || []).filter((item) =>
    item.authorization_confirmed === true &&
    item.publication_ready !== false &&
    item.related_pages?.includes(pageId)
  );

  const normalize = (list) => (list || [])
    .filter((item) =>
      item.authorizationConfirmed === true &&
      item.publicationReady !== false &&
      ((page === 'home' && item.showHome !== false) || (page === 'day' && item.showDay !== false))
    )
    .map((item) => {
      const canonical = canonicalById.get(item.id) || {};
      return {
        id: item.id,
        quote: item.quote,
        publication_name: item.publicationName,
        service_context: item.serviceContext,
        rating: canonical.rating || null,
        rating_label: canonical.rating_label || ''
      };
    });

  const card = (item) => `<article class="testimonial-card">
    <div class="testimonial-mark">“</div>
    ${item.rating ? `<div class="testimonial-rating" aria-label="${item.rating} de 5 estrellas">${'★'.repeat(item.rating)}</div>` : ''}
    <p>${item.quote || ''}</p>
    <strong>${item.publication_name || 'Testimonio'}</strong>
    ${item.service_context ? `<span>${item.service_context}</span>` : ''}
    ${item.rating_label ? `<small>${item.rating_label}</small>` : ''}
  </article>`;

  const render = (list) => {
    if (page === 'home') {
      const section = document.querySelector('[data-testimonials-section]');
      const root = document.querySelector('[data-testimonials]');
      if (section && root) {
        root.innerHTML = list.map(card).join('');
        section.hidden = !list.length;
      }
      return;
    }

    const section = document.querySelector('[data-cro-proof-section]');
    const root = document.querySelector('[data-cro-proof-root]');
    if (section && root) {
      root.innerHTML = list.slice(0, 3).map(card).join('');
      section.hidden = !list.length;
    }
  };

  const run = async () => {
    try {
      const preview = new URLSearchParams(location.search).get('editorial_preview') === '1';
      const response = await fetch(`/api/content${preview ? '?preview=1' : ''}`, {
        credentials: 'same-origin',
        cache: 'no-store'
      });
      if (response.ok) {
        const config = await response.json();
        if (Array.isArray(config.testimonials)) {
          render(normalize(config.testimonials));
          return;
        }
      }
    } catch {}
    render(fallback());
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
})();
