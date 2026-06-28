/** Menú móvil: abrir/cerrar con accesibilidad (aria-expanded, Escape, clic fuera). */
export function initMenu(): void {
  const button = document.querySelector<HTMLButtonElement>("[data-menu-button]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  if (!button || !menu) return;

  const setMenu = (open: boolean) => {
    menu.classList.toggle("open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    setMenu(!menu.classList.contains("open"));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("click", (event) => {
    if (!menu.classList.contains("open")) return;
    const target = event.target;
    if (target instanceof Node && !menu.contains(target) && target !== button) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
}
