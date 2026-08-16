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
    quote: "Tomamos el taller de lactancia con Verónica unos días después del nacimiento. En el taller aprendimos mucho sobre cómo extraer leche, usar el extractor adecuado, manejar y almacenar la leche. Todo ello me dio más seguridad para hacerlo en casa. Mi esposo también estuvo presente y ambos aprendimos mucho. Además recibimos material complementario al finalizar el taller. Gracias :) ",
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
    publication_hold_reason: "Contiene un resultado específico de peso infantil. Se conserva como testimonio autorizado, pero no se muestra en la web comercial ni en una landing usada por Meta sin revisión editorial adicional.",
    photo_allowed: false,
    related_pages: [],
    page_order: {}
  },
  {
    id: "TEST-004",
    quote: "Muchas gracias a ti 😁 te pasaste, muy bueno el taller. Nos encantó mucho, es muy entretenido, didáctico y se va aprendiendo mucho. Me hacía falta informarme y quitar esos miedos que uno tiene respecto al parto y cómo va cambiando tu cuerpo. Muchas gracias por todo, quedé feliz y se los recomiendo mucho a las mamás primerizas.",
    publication_name: "Participante de taller de parto",
    service_context: "Taller de preparación al parto",
    source: "Captura entregada por Sebastián",
    rating: null,
    authorization_confirmed: true,
    publication_ready: true,
    photo_allowed: false,
    related_pages: ["home"],
    page_order: { home: 30 }
  },
  {
    id: "TEST-005",
    quote: "Hola Vero. Nos encantó el curso que nos hiciste, ayudó mucho a aclarar varias dudas e ideas pre hechas de este proceso. Sin duda estamos mucho más tranquilos luego de haberlo realizado. Lo recomendamos 100%. Muchas gracias.",
    publication_name: "Participantes de taller",
    service_context: "Taller educativo",
    source: "Captura entregada por Sebastián",
    rating: null,
    authorization_confirmed: true,
    publication_ready: true,
    photo_allowed: false,
    related_pages: ["home"],
    page_order: { home: 40 }
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
    page_order: { home: 50, "dia-de-lactancia": 30 }
  },
  {
    id: "TEST-007",
    quote: "Asistimos al taller de parto con Verónica en formato privado. Pudimos practicar posturas para el parto, masajes, respiraciones y diversas técnicas para estar preparados. Esto me dio tranquilidad de saber que tanto mi esposo como yo estábamos en sincronía y sabíamos qué debíamos hacer al momento del parto. Verónica siempre ha estado muy atenta y al pendiente de nosotros después del taller. Es muy cercana. La recomiendo 100%.",
    publication_name: "Participante de taller de parto",
    service_context: "Taller privado de preparación al parto",
    source: "Captura entregada por Sebastián",
    rating: null,
    authorization_confirmed: true,
    publication_ready: true,
    photo_allowed: false,
    related_pages: ["home"],
    page_order: { home: 60 }
  },
  {
    id: "TEST-008",
    quote: "La consulta preconcepcional la tuvimos en pareja porque no teníamos idea de cómo prepararnos para cuando fuera el momento y nos quedó todo súper claro. La Vero nos dio confianza, nos sentimos escuchados y nos quedamos tranquilos. La recomendamos al 200% por su disposición, amabilidad, conocimiento y mucho más. 🫶🏻",
    publication_name: "Paciente de consulta preconcepcional",
    service_context: "Consulta preconcepcional",
    source: "Captura entregada por Sebastián",
    rating: null,
    authorization_confirmed: true,
    publication_ready: true,
    photo_allowed: false,
    related_pages: ["home"],
    page_order: { home: 70 }
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

    const landingSection = document.querySelector('.testimonials-placeholder');
    if (landingSection) {
      const landingTestimonials = byPage('dia-de-lactancia');
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
