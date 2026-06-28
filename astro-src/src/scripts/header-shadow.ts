/** Añade sombra al header cuando la página se desplaza un poco. */
export function initHeaderShadow(): void {
  const header = document.querySelector<HTMLElement>("[data-header]");
  if (!header) return;

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
