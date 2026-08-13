# Asesores MyR — Sitio web (PLAN-CONTA)

> ## 🚫 REGLA OBLIGATORIA PARA AGENTES / IA
> **Este repositorio pertenece a su dueño (angelcp22). Cualquier agente o IA que trabaje aquí DEBE OBEDECER esta regla:**
>
> - ✅ **Revisar, leer, analizar y proponer** cambios: permitido.
> - ⛔ **Modificar, borrar, reescribir, rediseñar o eliminar** archivos, secciones o funcionalidades (por ejemplo el calendario del hero, el formulario, la navegación, etc.): **PROHIBIDO sin autorización previa y explícita del dueño.**
> - Antes de tocar código: **explica qué vas a cambiar y espera el "sí" del dueño.** No asumas permiso.
> - No elimines funcionalidades existentes "para simplificar" salvo que el dueño lo pida expresamente.
> - Los commits/push a `main` requieren aprobación del dueño.
>
> _Incumplir esto (p. ej. quitar el calendario o el formulario sin avisar) obliga a revertir el trabajo._

Landing page del estudio contable **Asesores MyR** (Chorrillos, Lima, Perú): gestión contable,
tributaria, laboral, drawback y contabilidad para exportadores. Capta consultas vía
WhatsApp (**+51 941 689 076**).

- **URL pública:** https://asesoresmyr.com/
- **Stack:** [Astro 7](https://astro.build/) (sitio estático), HTML/CSS/JS, sin backend.
- **Hosting:** Cloudflare Pages conectado a GitHub.

---

## 📁 Estructura del repositorio

| Carpeta / archivo | Qué es | Estado |
|---|---|---|
| **`astro-src/`** | **Código fuente oficial del sitio (Astro).** Aquí se edita TODO. | ✅ Canónico |
| `astro-preview/` | Espejo generado para conservar la URL histórica de GitHub. **No editar a mano.** | 🤖 Generado |
| `index.html` (raíz) | Redirección desde GitHub Pages al dominio oficial. | 🔁 Puente |
| `legacy/` | Versiones antiguas archivadas (HTML estáticos + plantilla). **No se publican.** | 🗄️ Archivo |
| `.github/workflows/` | Validación automática del build en cada cambio. | 🧩 CI |

> La carpeta `legacy/` conserva las versiones previas (la genérica "Estudio Contable",
> `mr-asociados.html`, su copia y `opcion-estrategica.html`). Se mantienen solo como
> referencia histórica; **no forman parte del sitio en producción** y pueden eliminarse
> cuando ya no se necesiten.

---

## 🚀 Desarrollo local

**Requisitos:** Node.js **≥ 22.12** (ver `astro-src/.nvmrc`) y npm ≥ 9.6.5.

```bash
cd astro-src
npm ci            # instala dependencias exactas del lockfile
npm run dev       # servidor local en http://127.0.0.1:4321/
```

## 🏗️ Compilar el sitio

```bash
cd astro-src
npm run build     # genera el sitio en ./dist/
```

El build de producción se escribe en `astro-src/dist/`. Cloudflare Pages ejecuta el build
automáticamente al recibir cambios en la rama `main`.

## ☁️ Despliegue

Cloudflare Pages publica la rama `main` con raíz `astro-src`, comando `npm run build`
y directorio de salida `dist`. Los dominios públicos son `asesoresmyr.com` y
`www.asesoresmyr.com`. Cloudflare Analytics mide solicitudes, rendimiento y visitantes
únicos desde el panel de tráfico de la zona. Cloudflare Web Analytics añade automáticamente
su beacon sin cookies publicitarias para medir visitas y rendimiento del navegador.

---

## ✏️ Cómo editar el contenido

- **Datos de contacto** (teléfono, WhatsApp, ciudad, mensaje): un solo archivo →
  [`astro-src/src/data/site.ts`](astro-src/src/data/site.ts).
- **Servicios, planes, resultados, métricas:** arreglos al inicio de
  [`astro-src/src/pages/index.astro`](astro-src/src/pages/index.astro).
- **Comportamiento (menú, scroll, animaciones):** módulos en
  `astro-src/src/scripts/` (uno por característica).
- **Estilos y tokens de marca:** [`astro-src/src/styles/global.css`](astro-src/src/styles/global.css).

## 🖼️ Imágenes

Las imágenes viven en `astro-src/public/assets/`. El hero se sirve en **WebP** (~28 KB)
con respaldo **JPG**, y hay una imagen social dedicada `og-image.jpg` (1200×630).
Para regenerarlas tras cambiar el origen, usa `sharp` (incluido como dependencia de Astro).

## 🔧 Notas de mantenimiento

- Los íconos se sirven como **SVG inline** (no se usa el CDN externo de Lucide).
- El JS está modularizado por característica e inicializado de forma defensiva: si una
  falla, las demás siguen y el contenido nunca queda oculto.
- Hay una **Content-Security-Policy** declarada por `<meta>` en `BaseLayout.astro`. Si
  agregas un script o recurso externo nuevo, recuerda permitirlo ahí.
- **Datos personales (Ley N° 29733):** los testimonios de "Resultados" están **anonimizados**
  (se describe el rubro, no el nombre del cliente). Si cuentas con consentimiento escrito,
  puedes poner la razón social real en el arreglo `results` de `index.astro`. Hay una
  **política de privacidad** en [`/privacidad`](astro-src/src/pages/privacidad.astro),
  enlazada desde el footer.
