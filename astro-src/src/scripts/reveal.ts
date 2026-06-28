/**
 * Animaciones de aparición al hacer scroll y contadores numéricos animados.
 *
 * Robustez: si el usuario pidió "reducir movimiento", o si no hay soporte de
 * IntersectionObserver, se muestra todo el contenido de inmediato. Esta función
 * se inicializa la PRIMERA en el orquestador para que un fallo en otra
 * característica no deje el contenido oculto (las .reveal-card parten en
 * opacity:0 cuando html.is-enhanced).
 */
export function initReveal(): void {
  const revealNodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal-card"));
  if (!revealNodes.length) return;

  const showAll = () => revealNodes.forEach((node) => node.classList.add("is-visible"));

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || typeof IntersectionObserver === "undefined") {
    showAll();
    return;
  }

  const animateCounters = (root: HTMLElement) => {
    root.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
      if (node.dataset.animated === "true") return;
      node.dataset.animated = "true";
      const raw = node.getAttribute("data-count") || "";
      const numeric = Number(raw.replace(/\D/g, ""));
      const suffix = raw.replace(/[0-9]/g, "");
      if (!numeric) return;
      const duration = 900;
      const start = performance.now();
      const tick = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = `${Math.round(numeric * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target as HTMLElement;
        node.classList.add("is-visible");
        animateCounters(node);
        observer.unobserve(node);
      });
    },
    { threshold: 0.18 },
  );

  revealNodes.forEach((node) => observer.observe(node));

  // Red de seguridad: garantiza que el contenido nunca quede invisible.
  window.setTimeout(() => {
    const algunoVisible = revealNodes.some((node) => node.classList.contains("is-visible"));
    if (!algunoVisible) {
      // El observer no se activó en absoluto (entorno degenerado): muestra todo.
      showAll();
      return;
    }
    // El observer funciona: revela solo los rezagados ya cercanos al viewport,
    // preservando la animación de aparición para el contenido inferior.
    const vh = window.innerHeight || document.documentElement.clientHeight || 0;
    revealNodes
      .filter((node) => !node.classList.contains("is-visible"))
      .forEach((node) => {
        if (node.getBoundingClientRect().top < vh * 1.5) node.classList.add("is-visible");
      });
  }, 2500);
}
