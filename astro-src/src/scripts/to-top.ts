/** Botón "volver arriba": aparece tras desplazar y vuelve al inicio suavemente. */
export function initToTop(): void {
  const toTop = document.querySelector<HTMLButtonElement>("[data-to-top]");
  if (!toTop) return;

  const onScroll = () => toTop.classList.toggle("show", window.scrollY > 600);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
