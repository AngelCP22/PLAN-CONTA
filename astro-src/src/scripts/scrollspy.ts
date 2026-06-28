/**
 * Resalta el enlace de navegación de la sección visible.
 *
 * Bug corregido: la versión anterior mapeaba cada enlace por
 * `target.closest("section")`, así que "Nosotros" (#nosotros) y "Propósitos"
 * (#propositos) resolvían al MISMO <section> y el segundo sobrescribía al primero,
 * dejando "Nosotros" sin activarse nunca. Ahora se observa el elemento destino
 * real de cada enlace (cada id es un elemento distinto), de modo que ambos
 * pueden marcarse de forma independiente.
 */
export function initScrollspy(): void {
  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
  if (!navLinks.length) return;

  const linkByTarget = new Map<Element, HTMLAnchorElement>();
  navLinks.forEach((link) => {
    const id = (link.getAttribute("href") || "").slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target) linkByTarget.set(target, link);
  });
  if (!linkByTarget.size) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const link = linkByTarget.get(entry.target);
        if (!link) return;
        navLinks.forEach((other) => other.classList.remove("active"));
        link.classList.add("active");
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );

  linkByTarget.forEach((_link, target) => observer.observe(target));
}
