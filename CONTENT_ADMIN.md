# Mujer y Maternidad — Administración editorial ligera v0.1

## Objetivo

Permitir cambios pequeños de textos, enlaces, recursos, servicios y productos sin depender de una conversación con IA y sin introducir todavía un CMS/backend completo.

## Fuente editorial principal

`public/content.js`

Ese archivo concentra el contenido que puede cambiar con frecuencia:

- identidad y textos de marca;
- biografía profesional;
- textos del Home;
- categorías de servicios;
- etapas de navegación;
- enlaces rápidos;
- recursos gratuitos;
- productos digitales;
- testimonios autorizados;
- enlaces de contacto;
- metadata comercial de páginas.

## Flujo recomendado para cambios pequeños

1. Entrar al repositorio en GitHub con una cuenta autorizada.
2. Abrir `public/content.js`.
3. Usar **Edit this file**.
4. Cambiar únicamente el texto, URL, precio o estado necesario.
5. Guardar mediante un commit con una descripción breve.
6. Esperar el deployment automático y revisar la página publicada.

GitHub conserva historial y permite revertir cambios, por lo que funciona como panel editorial básico sin almacenar credenciales nuevas dentro del sitio.

## Campos que NO deben completarse por inferencia

Mantener `null`, vacío u oculto hasta confirmación expresa:

- registro profesional;
- universidad;
- certificaciones;
- años de experiencia;
- ubicación;
- precios y duración de servicios;
- agenda/disponibilidad;
- testimonios sin autorización.

## Testimonios

Solo se publican testimonios con:

```js
authorization_confirmed: true
```

Modelo recomendado:

```js
{
  id: "...",
  quote: "...",
  publication_name: "...",
  service_context: "...",
  source: "...",
  authorization_confirmed: true,
  photo_allowed: false
}
```

## Contenido sensible

No guardar en `content.js`:

- datos de pacientes;
- antecedentes clínicos;
- diagnósticos;
- síntomas;
- RUT/teléfonos/emails de pacientes;
- conversaciones privadas.

## Siguiente nivel de administración

Cuando el volumen de cambios lo justifique, evolucionar a un panel `/administrar/` autenticado con Cloudflare Access y almacenamiento controlado. No implementarlo todavía solo para editar textos, porque agregaría backend, autenticación, permisos y superficie de seguridad antes de que sean necesarios.
