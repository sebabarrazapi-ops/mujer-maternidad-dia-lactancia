window.MYM_CONTENT = {
  brand: {
    name: "Mujer y Maternidad",
    professionalName: "Verónica Andrea Valencia Yáñez",
    role: "Matrona"
  },
  contact: {
    whatsapp: "https://api.whatsapp.com/send/?phone=56964047477&text&type=phone_number&app_absent=0",
    instagram: "https://www.instagram.com/mujerymaternidad_cl/",
    facebook: "https://www.facebook.com/mujerymaternidad.cl"
  },
  analytics: {
    home: { pageId: "home", pageType: "HOME", pageName: "Mujer y Maternidad" },
    services: { pageId: "services_index", pageType: "SERVICE_INDEX", pageName: "Servicios" },
    workshops: { pageId: "workshops_index", pageType: "WORKSHOP_INDEX", pageName: "Talleres" },
    resources: { pageId: "resources_index", pageType: "RESOURCE_INDEX", pageName: "eBooks y recursos" },
    about: { pageId: "about_veronica", pageType: "ABOUT", pageName: "Sobre Verónica" },
    contact: { pageId: "contact", pageType: "CONTACT", pageName: "Contacto" }
  },
  home: {
    heroEyebrow: "MUJER Y MATERNIDAD",
    heroTitle: "Acompañamiento e información para cada etapa de tu maternidad",
    heroLead: "Un espacio creado por Verónica Andrea Valencia Yáñez, Matrona, para orientarte con información clara, recursos prácticos y distintas formas de acompañamiento según lo que estés viviendo hoy.",
    journeyEyebrow: "EMPIEZA POR TU MOMENTO ACTUAL",
    journeyTitle: "¿En qué etapa estás?",
    journeyLead: "No necesitas conocer el nombre exacto de un servicio. Empieza por la etapa o necesidad que más se parece a lo que estás viviendo y te mostraremos las opciones disponibles.",
    guidanceEyebrow: "¿NO SABES QUÉ NECESITAS?",
    guidanceTitle: "Podemos ayudarte a encontrar el punto de partida",
    guidanceLead: "Si todavía no sabes si necesitas un taller, una consulta o simplemente información, escríbenos y cuéntanos de forma general en qué etapa estás. No envíes antecedentes clínicos sensibles por este canal.",
    quickTitle: "Todo Mujer y Maternidad en un solo lugar",
    quickLead: "Talleres, recursos gratuitos, consulta individual y próximos espacios de acompañamiento.",
    resourcesEyebrow: "RECURSOS Y PRODUCTOS DIGITALES",
    resourcesTitle: "Aprende a tu ritmo con recursos prácticos",
    resourcesLead: "Aquí iremos reuniendo eBooks, guías, descargables y otros productos digitales de Mujer y Maternidad. Solo publicaremos productos con contenido, precio y checkout confirmados."
  },
  trustSignals: [
    "Verónica Andrea Valencia Yáñez",
    "Matrona",
    "Educación y orientación profesional",
    "Atención y actividades de Mujer y Maternidad"
  ],
  journeyStages: [
    {
      id: "embarazo",
      eyebrow: "EMBARAZO",
      title: "Quiero prepararme con más información",
      description: "Recursos y espacios educativos relacionados con preparación para el parto, lactancia y decisiones informadas.",
      url: "/servicios/",
      status: "active"
    },
    {
      id: "parto-postparto",
      eyebrow: "PARTO Y POSTPARTO",
      title: "Quiero llegar más preparada a esta etapa",
      description: "Explora acompañamiento y recursos para ordenar información antes y después del nacimiento.",
      url: "/servicios/",
      status: "active"
    },
    {
      id: "lactancia",
      eyebrow: "LACTANCIA",
      title: "Necesito comprender mejor la lactancia",
      description: "Encuentra educación en lactancia, el Día de Lactancia y opciones de acompañamiento profesional.",
      url: "/dia-de-lactancia/",
      status: "active"
    },
    {
      id: "banco-leche",
      eyebrow: "BANCO DE LECHE",
      title: "Quiero organizar extracción y conservación",
      description: "Contenido práctico sobre extracción, almacenamiento, conservación y preparación para la vuelta al trabajo.",
      url: "/dia-de-lactancia/#banco",
      status: "active"
    },
    {
      id: "salud-mujer",
      eyebrow: "SALUD DE LA MUJER",
      title: "Busco orientación sobre mi salud y fertilidad",
      description: "Conoce las áreas de acompañamiento disponibles, incluido el método sintotérmico cuando corresponda.",
      url: "/servicios/",
      status: "active"
    },
    {
      id: "no-se",
      eyebrow: "ORIENTACIÓN",
      title: "No sé qué necesito todavía",
      description: "Puedes revisar los servicios o escribir por WhatsApp para identificar un punto de partida sin compartir información clínica sensible.",
      url: "https://api.whatsapp.com/send/?phone=56964047477&text=Hola%2C%20llego%20desde%20mujerymaternidad.cl%20y%20no%20tengo%20claro%20qu%C3%A9%20servicio%20o%20recurso%20necesito.%20Me%20gustar%C3%ADa%20orientaci%C3%B3n%20general.&type=phone_number&app_absent=0",
      external: true,
      status: "active"
    }
  ],
  quickLinks: [
    {
      id: "dia-lactancia",
      title: "Inscripción Día de Lactancia · 29 de agosto",
      eyebrow: "EVENTO ONLINE",
      url: "/dia-de-lactancia/",
      external: false
    },
    {
      id: "placer-dolor",
      title: "El placer y el dolor en el parto",
      eyebrow: "LECTURA RECOMENDADA",
      url: "https://www.elpartoesnuestro.es/sites/default/files/public/documentos/parto/dolor/placer_dolor.pdf",
      external: true
    },
    {
      id: "plan-parto",
      title: "Plan de parto gratuito",
      eyebrow: "RECURSO GRATUITO",
      url: "https://drive.google.com/file/d/1EUQNAI9dojBQPU9gOwa5KdbJuXuAz9tz/view",
      external: true
    },
    {
      id: "consulta",
      title: "Consultar por acompañamiento individual",
      eyebrow: "WHATSAPP",
      url: "https://api.whatsapp.com/send/?phone=56964047477&text&type=phone_number&app_absent=0",
      external: true
    },
    {
      id: "proximos-talleres",
      title: "Consultar próximos talleres grupales",
      eyebrow: "TALLERES",
      url: "/talleres/",
      external: false
    }
  ],
  freeResources: [
    {
      id: "placer-dolor",
      type: "pdf",
      title: "El placer y el dolor en el parto",
      description: "Lectura externa recomendada para ampliar información sobre la experiencia del parto.",
      status: "active",
      url: "https://www.elpartoesnuestro.es/sites/default/files/public/documentos/parto/dolor/placer_dolor.pdf"
    },
    {
      id: "plan-parto",
      type: "download",
      title: "Plan de parto gratuito",
      description: "Recurso gratuito disponible desde el enlace compartido por Mujer y Maternidad.",
      status: "active",
      url: "https://drive.google.com/file/d/1EUQNAI9dojBQPU9gOwa5KdbJuXuAz9tz/view"
    }
  ],
  testimonials: [],
  catalogs: {
    services: [
      { id: "lactancia", type: "service", title: "Asesoría de lactancia", status: "active", url: "/servicios/" },
      { id: "parto-postparto", type: "service", title: "Preparación para el parto y postparto", status: "active", url: "/servicios/" },
      { id: "metodo-sintotermico", type: "service", title: "Método sintotérmico", status: "active", url: "/servicios/" }
    ],
    workshops: [
      {
        id: "dia_lactancia_2026",
        type: "workshop",
        title: "Día de Lactancia",
        description: "Dos talleres online y en vivo: Introducción a la Lactancia y Banco de Leche Materna.",
        status: "active",
        price: "US$55",
        url: "/dia-de-lactancia/"
      }
    ],
    digitalProducts: [
      {
        id: "ebook-proximo",
        type: "ebook",
        title: "Próximo eBook de Mujer y Maternidad",
        description: "Espacio reservado para el próximo recurso digital que Verónica decida comercializar.",
        status: "coming_soon",
        price: "",
        url: ""
      },
      {
        id: "guia-proxima",
        type: "guide",
        title: "Próxima guía descargable",
        description: "Aquí podremos publicar guías prácticas, checklists y materiales complementarios.",
        status: "coming_soon",
        price: "",
        url: ""
      }
    ]
  }
};
