# Engineering log

## 2026-08-13 — Corrección de marca a Asesores M&R

- Agent: Codex
- Objective: corregir la presentación pública de “MyR” a “M&R” sin cambiar el dominio.
- Changes and files: nombre visible, SEO, datos estructurados, mensajes de WhatsApp, registro técnico y documentación.
- Decisions: se conserva `asesoresmyr.com` y el identificador técnico `asesores-myr-web`; solo cambia la marca mostrada.
- Tests and results: build de Astro completado; `npm audit --omit=dev` con 0 vulnerabilidades; marca, SEO, datos estructurados y WhatsApp verificados en el HTML generado.

## 2026-08-13 — Retiro de resultados obtenidos

- Agent: Codex
- Objective: eliminar por completo la sección pública “Resultados obtenidos”.
- Changes and files: se retiraron contenido, datos y estilos exclusivos de resultados; se actualizaron README, onboarding y espejo histórico.
- Decisions: se conservaron intactas las métricas de confianza solicitadas para el final del sitio.
- Tests and results: build de Astro completado; `npm audit --omit=dev` con 0 vulnerabilidades; barrido textual y revisión responsive completados antes del despliegue.

## 2026-08-13 — Preparación de producción de Asesores M&R

- Agent: Codex
- Objective: consolidar identidad, contacto, SEO, analíticas y despliegue en `asesoresmyr.com`.
- Changes and files: datos centralizados en `site.ts`; identidad Asesores M&R; WhatsApp +51 941 689 076; dirección de Chorrillos; SEO local y política de privacidad; configuración Astro raíz; workflow de validación; espejo histórico sin indexación.
- Decisions: Cloudflare Pages como producción; Analytics de tráfico de zona y Web Analytics para contar visitas, visitantes únicos y rendimiento sin cookies publicitarias; GitHub Actions valida el build y no compite con el despliegue.
- Tests and results: build de producción y espejo exitosos con Astro 7; `npm audit --omit=dev` con 0 vulnerabilidades; inspección visual en escritorio y móvil; comprobación de metadatos, enlaces y eliminación del calendario.
- Problems found/fixed: CSP ampliada solo para el beacon oficial; overflow móvil corregido; dependencias vulnerables actualizadas desde Astro 5.
- Pending work: ninguno para la publicación; seguimiento futuro en `TECH_DEBT.md`.
