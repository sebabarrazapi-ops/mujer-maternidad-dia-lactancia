# Mujer y Maternidad — Administración MVP v1

## Objetivo

Permitir que Verónica o EDIN puedan hacer cambios editoriales frecuentes sin editar código directamente y sin depender de ChatGPT para cada modificación.

## Alcance autorizado de MVP v1

### 1. Editar textos

- Home: título, subtítulo, textos de orientación y textos de secciones.
- Servicios: títulos, descripciones y temas.
- Sobre Verónica: biografía, propósito, enfoque y textos de presentación.
- Talleres/recursos: textos editoriales cuando estén centralizados.
- Día de Lactancia: textos de presentación no críticos para checkout/tracking.

### 2. Mostrar u ocultar bloques

El panel permitirá activar/desactivar bloques completos sin eliminarlos del código.

Home:
- Hero
- Señales de confianza
- ¿En qué etapa estás?
- Orientación general
- Formas de acompañarte
- Accesos rápidos
- Áreas de acompañamiento
- Próximo evento
- Recursos gratuitos
- Productos digitales
- Testimonios
- Sobre Verónica
- Contacto

Día de Lactancia:
- Hero
- Barra de confianza
- ¿Es para ti?
- Opciones de compra
- Cómo reservar
- Horarios internacionales
- Incluye tu inscripción
- Introducción a la Lactancia
- Banco de Leche Materna
- Combo Día Completo
- Testimonios
- FAQ / siguiente paso

### 3. Orden de bloques

MVP v1 permitirá definir un orden editorial para bloques configurables de Home. El orden no debe modificar checkout ni tracking.

### 4. Vista previa

Antes de publicar:
- mostrar cambios en una vista previa;
- indicar claramente qué bloques están ocultos;
- permitir descartar cambios.

### 5. Estados

- `draft`: modificación aún no publicada;
- `published`: versión vigente;
- conservar una copia de la versión anterior para rollback.

## Fuera de alcance de MVP v1

- datos de pacientes;
- antecedentes clínicos;
- agenda clínica;
- diagnósticos/síntomas;
- autenticación hecha solo con JavaScript del navegador;
- guardar tokens de GitHub en frontend;
- modificar Meta Pixel desde el panel;
- modificar IDs de producto Hotmart desde un editor de texto genérico;
- modificar reglas de tracking/UTM;
- eliminar archivos o código de producción desde el panel.

## Seguridad

La versión pública del panel deberá estar protegida por autenticación real. Arquitectura objetivo:

`/administrar/` → autenticación → API protegida → almacenamiento editorial → sitio público.

No se publicará un panel de administración abierto ni una contraseña hardcodeada en JavaScript.

## Modelo editorial inicial

```js
{
  pages: {
    home: {
      sections: {
        hero: { enabled: true, order: 10 },
        trust: { enabled: true, order: 20 },
        journey: { enabled: true, order: 30 },
        guidance: { enabled: true, order: 40 },
        pillars: { enabled: true, order: 50 },
        quickLinks: { enabled: true, order: 60 },
        areas: { enabled: true, order: 70 },
        event: { enabled: true, order: 80 },
        freeResources: { enabled: true, order: 90 },
        digitalProducts: { enabled: true, order: 100 },
        testimonials: { enabled: true, order: 110 },
        about: { enabled: true, order: 120 },
        contact: { enabled: true, order: 130 }
      }
    }
  }
}
```

## Criterio de cierre de MVP v1

El MVP se considera terminado cuando una persona autorizada puede:

1. entrar al panel privado;
2. seleccionar una página;
3. editar textos permitidos;
4. ocultar/mostrar bloques;
5. cambiar orden de bloques permitidos;
6. previsualizar;
7. guardar borrador;
8. publicar;
9. volver a una versión anterior;
10. hacerlo sin tocar código ni exponer secretos en el navegador.
