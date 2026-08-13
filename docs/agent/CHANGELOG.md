# Engineering log

## 2026-08-13 — Preparación de producción de Asesores MyR

- Agent: Codex
- Objective: consolidar identidad, contacto, SEO, analíticas y despliegue en `asesoresmyr.com`.
- Changes and files: datos centralizados en `site.ts`; identidad Asesores MyR; WhatsApp +51 941 689 076; dirección de Chorrillos; SEO local y política de privacidad; configuración Astro raíz; workflow de validación; espejo histórico sin indexación.
- Decisions: Cloudflare Pages como producción; Cloudflare Web Analytics por ser liviano y no publicitario; GitHub Actions valida el build y no compite con el despliegue.
- Tests and results: build de producción y espejo exitosos con Astro 7; `npm audit --omit=dev` con 0 vulnerabilidades; inspección visual en escritorio y móvil; comprobación de metadatos, enlaces y eliminación del calendario.
- Problems found/fixed: CSP ampliada solo para el beacon oficial; overflow móvil corregido; dependencias vulnerables actualizadas desde Astro 5.
- Pending work: push, crear proyecto Pages, enlazar dominios, activar Analytics y verificar producción.
