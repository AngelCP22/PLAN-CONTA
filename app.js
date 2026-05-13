const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const yearNode = document.getElementById("year");
const contactForm = document.getElementById("contactForm");

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav?.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (window.lucide) {
  window.lucide.createIcons();
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const nombre = encodeURIComponent(data.get("nombre") || "");
  const empresa = encodeURIComponent(data.get("empresa") || "");
  const servicio = encodeURIComponent(data.get("servicio") || "");
  const mensaje = encodeURIComponent(data.get("mensaje") || "");
  const texto = `Hola M&R Asociados, quiero solicitar una asesoria.%0A%0ANombre: ${nombre}%0AEmpresa: ${empresa}%0AServicio: ${servicio}%0AMensaje: ${mensaje}`;

  window.open(`https://wa.me/51956308249?text=${texto}`, "_blank", "noopener,noreferrer");
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const cards = Array.from(carousel.querySelectorAll(".plan-card"));
  const previousButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dotsWrap = carousel.querySelector("[data-carousel-dots]");
  let activeIndex = cards.findIndex((card) => card.classList.contains("is-active"));

  if (!cards.length || !dotsWrap) return;
  if (activeIndex < 0) activeIndex = 0;

  const dots = cards.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver plan ${index + 1}`);
    dot.addEventListener("click", () => showPlan(index));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function showPlan(index) {
    activeIndex = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeIndex);
    });
  }

  previousButton?.addEventListener("click", () => showPlan(activeIndex - 1));
  nextButton?.addEventListener("click", () => showPlan(activeIndex + 1));
  showPlan(activeIndex);
});
