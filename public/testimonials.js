window.MYM_TESTIMONIALS = [
  {
    id: "TEST-001",
    quote: "Nos encantó nuestra sesión con Verónica. Nos sentimos escuchados en nuestras preocupaciones y Verónica se dio el tiempo de responder a todas nuestras preguntas. Después de la sesión pude implementar algunos de sus consejos de forma inmediata. Mi experiencia con la lactancia ha mejorado un montón. ¡Súper felices con nuestra experiencia!",
    publication_name: "Paciente de lactancia",
    service_context: "Acompañamiento de lactancia",
    source: "WhatsApp",
    rating: null,
    authorization_confirmed: true,
    publication_ready: true,
    photo_allowed: false,
    related_pages: ["home", "dia-de-lactancia"],
    page_order: { home: 10, "dia-de-lactancia": 10 }
  },
  {
    id: "TEST-002",
    quote: "Tomamos el taller de lactancia con Verónica unos días después del nacimiento. En el taller aprendimos mucho sobre cómo extraer leche, usar el extractor adecuado, manejar y almacenar la leche. Todo ello me dio más seguridad para hacerlo en casa. Mi esposo también estuvo presente y ambos aprendimos mucho. Además recibimos material complementario al finalizar el taller.",
    publication_name: "Participante de taller de lactancia",
    service_context: "Taller de lactancia",
    source: "WhatsApp",
    rating: 5,
    rating_label: "5 estrellas para ambos talleres",
    authorization_confirmed: true,
    publication_ready: true,
    photo_allowed: false,
    related_pages: ["home", "dia-de-lactancia"],
    page_order: { home: 20, "dia-de-lactancia": 20 }
  },
  {
    id: "TEST-003",
    quote: "Me acuerdo que después de tu asesoría, mi hija subió medio kilo en una semana a puro pecho. ¡El pediatra no se la creía jaja!",
    publication_name: "Paciente de lactancia",
    service_context: "Acompañamiento de lactancia",
    source: "Comentario entregado por Sebastián",
    rating: null,
    authorization_confirmed: true,
    publication_ready: false,
    publication_hold_reason: "Resultado específico de peso infantil; no se publica en la landing comercial.",
    photo_allowed: false,
    related_pages: [],
    page_order: {}
  },
  {
    id: "TEST-006",
    quote: "Me gusta mucho tu calma al momento de hacer la asesoría. Me sirvió mucho que ayudaras con las posiciones para poder darle pechuga a mi guagua. Obvio te recomendé a mis amigas que están a punto de ser mamás. 💗",
    publication_name: "Paciente de lactancia",
    service_context: "Asesoría de lactancia",
    source: "Captura entregada por Sebastián",
    rating: null,
    authorization_confirmed: true,
    publication_ready: true,
    photo_allowed: false,
    related_pages: ["home", "dia-de-lactancia"],
    page_order: { home: 30, "dia-de-lactancia": 30 }
  }
];

(() => {
  const render = () => {
    const testimonials = (window.MYM_TESTIMONIALS || []).filter((item) => item.authorization_confirmed === true && item.publication_ready !== false);
    if (!testimonials.length) return;

    const cardHtml = (item) => `
      <article class="testimonial-card">
        <div class="testimonial-mark">“</div>
        ${item.rating ? `<div class="testimonial-rating" aria-label="${item.rating} de 5 estrellas">${'★'.repeat(item.rating)}</div>` : ''}
        <p>${item.quote}</p>
        <strong>${item.publication_name}</strong>
        <span>${item.service_context}</span>
        ${item.rating_label ? `<small>${item.rating_label}</small>` : ''}
      </article>`;

    const byPage = (pageId) => testimonials
      .filter((item) => item.related_pages?.includes(pageId))
      .sort((a, b) => (a.page_order?.[pageId] ?? 999) - (b.page_order?.[pageId] ?? 999));

    const homeSection = document.querySelector('[data-testimonials-section]');
    const homeRoot = document.querySelector('[data-testimonials]');
    if (homeSection && homeRoot) {
      const homeTestimonials = byPage('home');
      if (homeTestimonials.length) {
        homeRoot.innerHTML = homeTestimonials.map(cardHtml).join('');
        homeSection.hidden = false;
      }
    }

    const landingTestimonials = byPage('dia-de-lactancia');
    const proofSection = document.querySelector('[data-cro-proof-section]');
    const proofRoot = document.querySelector('[data-cro-proof-root]');
    if (proofSection && proofRoot && landingTestimonials.length) {
      proofRoot.innerHTML = landingTestimonials.slice(0, 2).map(cardHtml).join('');
      proofSection.hidden = false;
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
  else render();
})();
