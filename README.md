# Mujer y Maternidad — Día de Lactancia

Landing page estática del lanzamiento del **Día de Lactancia · 29 de agosto de 2026**.

## Estado

- Landing base: creada
- Checkout Introducción a la Lactancia: conectado
- Checkout Banco de Leche Materna: conectado
- Checkout Día Completo: pendiente de enlace Hotmart
- Meta Pixel: pendiente de ID
- Fotografías/logo: pendientes
- GitHub Pages: pendiente de activar

## Archivos

- `index.html` — estructura de la landing
- `styles.css` — diseño responsive mobile-first
- `config.js` — configuración de marca, productos, precios, enlaces y Pixel
- `main.js` — enlaces Hotmart, conservación de UTMs y eventos de checkout

## Regla de mantenimiento

Los datos variables del lanzamiento deben modificarse primero en `config.js`. No guardar tokens privados, contraseñas ni credenciales en este repositorio público.

## Pendientes antes de pauta

1. Agregar enlace Hotmart del combo por $49.990.
2. Incorporar fotografía real de Verónica y logo de Mujer y Maternidad.
3. Agregar el ID de Meta Pixel.
4. Activar GitHub Pages desde `main` / root.
5. Ejecutar QA móvil y comprobar los tres checkouts.
6. Validar `PageView`, `InitiateCheckout` y `Purchase` antes de encender Meta Ads.
