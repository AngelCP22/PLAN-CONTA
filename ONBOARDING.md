# ONBOARDING / Traspaso — PLAN-CONTA (Asesores M&R)

> ## 🚫 REGLA OBLIGATORIA PARA AGENTES / IA
> Puedes **revisar y proponer**, pero **NO modificar, borrar ni rediseñar nada sin autorización previa y explícita del dueño (angelcp22)**. No elimines funcionalidades existentes (calendario, formulario, secciones, navegación) "para simplificar". Explica el cambio y espera el "sí" antes de tocar código. Commits/push a `main` requieren su aprobación. Ver la regla completa en `README.md`.

> Estado al **2026-08-13**. Sitio de Asesores M&R (Chorrillos, Lima). Léelo antes de tocar nada.

## Rediseño 2026-07-01 (última sesión)

Cambios de diseño pedidos por Ed, todos sobre `astro-src/` y verificados en el dev server + `npm run build`:

- **Hero:** el título ahora es **todo blanco** (se quitó el `<span class="accent">` dorado). El **panel de "Calendario tributario"** se eliminó del hero → hero a una sola columna. Se borró el script `scripts/lima-clock.ts` (ya no se usa).
- **Menú:** reducido a **4 ítems** → Nosotros · Servicios · Planes · Contacto (en `components/Header.astro`). Las secciones `#proceso` y `#exportacion` **siguen existiendo** en la página (se llega por scroll), solo salieron del nav. La sección `#resultados` se eliminó por solicitud del propietario.
- **Servicios:** ahora **4 tarjetas con foto** (antes 6 sin imagen): Gestión contable, Gestión laboral, Gestión tributaria, Comercio exterior. Las fotos son stock de Unsplash (licencia libre, uso comercial sin atribución) **guardadas localmente** en `public/assets/servicios/{contable,laboral,tributaria,comercio}.jpg` — no se cargan de terceros. Se pueden reemplazar por fotos reales del cliente sin tocar código (mismos nombres). Estilos nuevos: `.service-card`/`.service-media`/`.service-body` en `global.css`.
- **Contacto:** se **quitó el formulario** (nombre/teléfono/servicio/mensaje) y quedó **solo un botón centrado "Enviar por WhatsApp"** (`.contact-cta`, usa `waLink()`). Se borró el script `scripts/whatsapp-form.ts`.
- **Chatbot de IA (ChatSimple / Expertise AI):** integración **cableada pero DESACTIVADA** a la espera de la cuenta de Ed. Config en `data/site.ts` → `export const chat`. Mientras `enabled:false` **no se inyecta ningún script de terceros** y el CSP queda estricto (verificado). Para activarlo: crear cuenta en chatsimple.ai (hoy expertise.ai), pegar `coId` + `chatbotId` del panel y poner `enabled:true`. El `BaseLayout` **construye el CSP dinámicamente**: al activar el chat añade solo los dominios del proveedor (`https://*.chatsimple.ai`, `https://*.expertise.ai` + `wss:`) a script/img/frame/connect. Camino de activación **probado** con IDs de prueba y revertido.
- **Privacidad:** `pages/privacidad.astro` actualizada (fecha 2026-07-01): la sección de datos ya no habla de "formulario" sino de contacto por WhatsApp/teléfono/chat, y se añadió la cláusula del chatbot de IA como encargado externo.

## Qué pasó el 2026-06-26 (consolidación)

Se **auditó** el proyecto (9 dimensiones, informe como Artifact) y se **consolidó en la versión Astro** como única oficial. Antes había 3 sitios paralelos; eso causaba la mayor parte de la deuda.

### Decisiones aplicadas
- ✅ **Canónico = `astro-src/`** (Astro 5). Es lo único que se edita.
- ✅ Versiones viejas movidas a **`legacy/`** (no se publican): index genérico, `mr-asociados.html` + copia, `opcion-estrategica.html`, plantilla.
- ✅ `index.html` raíz → **redirección** al dominio oficial `https://asesoresmyr.com/`.
- ✅ Datos de marca, contacto y dirección centralizados en **`astro-src/src/data/site.ts`** (WhatsApp +51 941 689 076). No volver a hardcodearlos.
- ✅ JS modularizado en **`astro-src/src/scripts/`** (menu, scrollspy, reveal, to-top y header-shadow), orquestado con try/catch en `BaseLayout.astro`.
- ✅ Bugs corregidos: scrollspy ("Nosotros" no se activaba), validación de teléfono peruano (9 dígitos) + `aria-live`/`aria-invalid`, overflow horizontal en móvil (`overflow-x: clip`), contraste del eyebrow (`--gold-text`), skip-link.
- ✅ Imágenes: hero **632KB→28KB WebP** (+ JPG fallback), `og-image.jpg` 1200×630, `about.jpg` recomprimido.
- ✅ Añadidos: `README.md`, `LICENSE`, `robots.txt`, `.nvmrc`, `engines` en package.json, workflow CI/CD opcional (`.github/workflows/deploy.yml`, manual).
- ✅ **Legal (Ley 29733):** testimonios de la sección "Resultados" **anonimizados** (rubro en vez de nombre; "Cayotopa Cuba Sergio" → "Profesional independiente"). Nueva página **`/privacidad/`** ([`privacidad.astro`](astro-src/src/pages/privacidad.astro)) enlazada en el footer.
- ✅ **CSP** por `<meta>` en `BaseLayout` (verificada: no rompe fuentes ni scripts).

## Cómo correr
```bash
cd astro-src && npm ci && npm run dev   # http://127.0.0.1:4321/
npm run build                           # genera ./dist para Cloudflare Pages
```
Node ≥ 22.12. Cloudflare Pages publica `astro-src/dist` desde la rama `main`.

## Producción
El dominio canónico es `https://asesoresmyr.com/`. Cloudflare Pages usa la rama `main`,
la raíz `astro-src`, el comando `npm run build` y el directorio de salida `dist`.
Cloudflare Analytics mide desde la red las solicitudes, el rendimiento y los visitantes
únicos del dominio. Cloudflare Web Analytics añade automáticamente su beacon para medir
visitas y rendimiento del navegador sin añadir cookies publicitarias.

### Mejoras opcionales menores (no urgentes)
- Self-host de fuentes Google (quitar la IP del visitante hacia Google). Mientras tanto está **declarado en `/privacidad/`**.

Detalle completo en `README.md`. `astro-preview/` se conserva solo como espejo histórico generado.
