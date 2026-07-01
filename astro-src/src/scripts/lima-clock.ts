/** Reloj y fecha de Lima en el panel del hero (zona horaria America/Lima). */
export function initLimaClock(): void {
  const clockNode = document.querySelector<HTMLElement>("[data-clock]");
  const weekdayNode = document.querySelector<HTMLElement>("[data-weekday]");
  const dateNode = document.querySelector<HTMLElement>("[data-date]");
  if (!clockNode && !weekdayNode && !dateNode) return;

  const tz = "America/Lima";
  const update = () => {
    const now = new Date();
    if (clockNode) {
      clockNode.textContent = new Intl.DateTimeFormat("es-PE", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: tz,
      }).format(now);
    }
    if (weekdayNode) {
      weekdayNode.textContent = new Intl.DateTimeFormat("es-PE", {
        weekday: "long",
        timeZone: tz,
      }).format(now);
    }
    if (dateNode) {
      dateNode.textContent = new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: tz,
      }).format(now);
    }
  };

  update();
  window.setInterval(update, 30000);
}
