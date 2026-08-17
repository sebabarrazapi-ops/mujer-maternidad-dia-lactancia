# Mujer y Maternidad — Administrador MVP v1

## Objetivo
Permitir cambios editoriales frecuentes desde `/administrar/` sin editar código y sin exponer secretos en el navegador.

## Alcance de v1
- Home y Día de Lactancia.
- Editar textos editoriales seleccionados.
- Elegir una paleta de marca predefinida.
- Mostrar/ocultar bloques.
- Reordenar bloques permitidos.
- Guardar borrador.
- Vista previa privada del borrador.
- Publicar sin redesplegar el sitio.
- Rollback a la versión publicada anterior.

## Protecciones
El panel NO permite editar:
- ID del Pixel de Meta;
- eventos PageView/ViewContent/InitiateCheckout/Purchase;
- URLs o IDs de producto Hotmart;
- reglas UTM/fbclid;
- código JavaScript;
- datos de pacientes o antecedentes clínicos.

## Arquitectura
`/administrar/` → login servidor → API del Worker → Durable Object `EDITORIAL` → `/api/content` → cliente editorial del sitio.

La contraseña se configura como secreto de Cloudflare `ADMIN_PASSWORD`; nunca se incluye en HTML o JavaScript público. La sesión usa cookie `HttpOnly`, `Secure` y `SameSite=Strict` con firma HMAC y vencimiento de 8 horas.

## Configuración única antes de activar el panel
Después de fusionar/desplegar esta versión se debe crear el secreto del Worker:

```bash
npx wrangler secret put ADMIN_PASSWORD
```

También puede configurarse desde Cloudflare Dashboard → Workers & Pages → `mujer-maternidad-dia-lactancia` → Settings → Variables and Secrets.

## Estados
- `draft`: cambios guardados y visibles solo en preview autenticado.
- `published`: configuración que consume el sitio público.
- `previous`: última versión publicada, disponible para rollback.

## Criterio de cierre
MVP v1 se considera cerrado cuando una persona autorizada puede entrar, editar, previsualizar, guardar, publicar y restaurar una versión anterior sin tocar GitHub ni exponer credenciales.
