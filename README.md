# M&R Asociados — Sitio web (PLAN-CONTA)

Landing page del estudio contable **M&R Asociados** (Lima, Perú): gestión contable,
tributaria, laboral, drawback y contabilidad para exportadores. Capta consultas vía
WhatsApp (**+51 956-308-249**).

- **URL pública:** https://angelcp22.github.io/PLAN-CONTA/
- **Stack:** [Astro 5](https://astro.build/) (sitio estático), HTML/CSS/JS, sin backend.
- **Hosting:** GitHub Pages.

---

## 📁 Estructura del repositorio

| Carpeta / archivo | Qué es | Estado |
|---|---|---|
| **`astro-src/`** | **Código fuente oficial del sitio (Astro).** Aquí se edita TODO. | ✅ Canónico |
| `astro-preview/` | Build generado que publica GitHub Pages. **No editar a mano.** | 🤖 Generado |
| `index.html` (raíz) | Redirección a `astro-preview/` (evita servir contenido viejo en la home). | 🔁 Puente |
| `legacy/` | Versiones antiguas archivadas (HTML estáticos + plantilla). **No se publican.** | 🗄️ Archivo |
| `.github/workflows/` | CI/CD opcional para desplegar con GitHub Actions. | 🧩 Opcional |

> La carpeta `legacy/` conserva las versiones previas (la genérica "Estudio Contable",
> `mr-asociados.html`, su copia y `opcion-estrategica.html`). Se mantienen solo como
> referencia histórica; **no forman parte del sitio en producción** y pueden eliminarse
> cuando ya no se necesiten.

---

## 🚀 Desarrollo local

**Requisitos:** Node.js **≥ 20.3** (ver `astro-src/.nvmrc`) y npm ≥ 9.

```bash
cd astro-src
npm ci            # instala dependencias exactas del lockfile
npm run dev       # servidor local en http://127.0.0.1:4321/PLAN-CONTA/astro-preview/
```

## 🏗️ Compilar el sitio

```bash
cd astro-src
npm run build     # genera el sitio en ../astro-preview/
```

El build se escribe en `astro-preview/`. Si publicas desde la rama (modo actual de Pages),
**hay que commitear `astro-preview/` después de cada build** para que los cambios salgan al aire.

## ☁️ Despliegue

Hoy GitHub Pages publica **desde la rama `main`, carpeta raíz**. La home (`index.html`)
redirige al sitio Astro en `astro-preview/`.

### Recomendado: automatizar con GitHub Actions (URL limpia)

1. GitHub → **Settings → Pages → Source = "GitHub Actions"**.
2. En `astro-src/astro.config.mjs` cambia `base` a `"/PLAN-CONTA"` y `outDir` a `"./dist"`.
3. Activa el workflow `.github/workflows/deploy.yml` (quita el comentario del trigger `push`).
4. Una vez funcionando, puedes **borrar `astro-preview/` y el `index.html` de redirección**;
   el sitio quedará directo en `https://angelcp22.github.io/PLAN-CONTA/`.

---

## ✏️ Cómo editar el contenido

- **Datos de contacto** (teléfono, WhatsApp, ciudad, mensaje): un solo archivo →
  [`astro-src/src/data/site.ts`](astro-src/src/data/site.ts).
- **Servicios, planes, resultados, métricas:** arreglos al inicio de
  [`astro-src/src/pages/index.astro`](astro-src/src/pages/index.astro).
- **Comportamiento (menú, formulario, reloj, animaciones):** módulos en
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
