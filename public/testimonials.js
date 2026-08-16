window.MYM_TESTIMONIALS = [
  {
    id: "TEST-001",
    quote: "Nos encantó nuestra sesión con Verónica. Nos sentimos escuchados en nuestras preocupaciones y Verónica se dio el tiempo de responder a todas nuestras preguntas. Después de la sesión pude implementar algunos de sus consejos de forma inmediata. Mi experiencia con la lactancia ha mejorado un montón. ¡Súper felices con nuestra experiencia!",
    publication_name: "Paciente de lactancia",
    service_context: "Acompañamiento de lactancia",
    source: "WhatsApp",
    rating: null,
    authorization_confirmed: true,
    photo_allowed: false,
    related_pages: ["home", "dia-de-lactancia"]
  },
  {
    id: "TEST-002",
    quote: "Tomamos el taller de lactancia con Verónica unos días después del nacimiento. En el taller aprendimos mucho sobre cómo extraer leche, usar el extractor adecuado, manejar y almacenar la leche. Todo ello me dio más seguridad para hacerlo en casa. Mi esposo también estuvo presente y ambos aprendimos mucho. Además recibimos material complementario al finalizar el taller. Gracias :) ",
    publication_name: "Participante de taller de lactancia",
    service_context: "Taller de lactancia",
    source: "WhatsApp",
    rating: 5,
    rating_label: "5 estrellas para ambos talleres",
    authorization_confirmed: true,
    photo_allowed: false,
    related_pages: ["home", "dia-de-lactancia"]
  }
];

(() => {
  const render = () => {
    const testimonials = (window.MYM_TESTIMONIALS || []).filter((item) => item.authorization_confirmed === true);
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

    const homeSection = document.querySelector('[data-testimonials-section]');
    const homeRoot = document.querySelector('[data-testimonials]');
    if (homeSection && homeRoot) {
      const homeTestimonials = testimonials.filter((item) => item.related_pages?.includes('home'));
      if (homeTestimonials.length) {
        homeRoot.innerHTML = homeTestimonials.map(cardHtml).join('');
        homeSection.hidden = false;
      }
    }

    const landingSection = document.querySelector('.testimonials-placeholder');
    if (landingSection) {
      const landingTestimonials = testimonials.filter((item) => item.related_pages?.includes('dia-de-lactancia'));
      if (landingTestimonials.length) {
        landingSection.hidden = false;
        landingSection.removeAttribute('aria-hidden');
        landingSection.classList.add('testimonials-section');
        landingSection.innerHTML = `
          <div class="container">
            <div class="section-heading centered">
              <span class="eyebrow">EXPERIENCIAS REALES</span>
              <h2>Lo que cuentan quienes han trabajado con Verónica</h2>
              <p>Experiencias individuales publicadas con autorización. Cada experiencia es personal y no garantiza resultados específicos.</p>
            </div>
            <div class="testimonial-grid">${landingTestimonials.map(cardHtml).join('')}</div>
          </div>`;
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render, { once: true });
  } else {
    render();
  }
})();
