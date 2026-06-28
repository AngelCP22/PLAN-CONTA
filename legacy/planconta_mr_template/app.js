const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const yearNode = document.getElementById("year");
const contactForm = document.getElementById("contactForm");

navToggle?.addEventListener("click", () => {
  siteNav?.classList.toggle("open");
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav?.classList.remove("open");
  });
});

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const nombre = data.get("nombre") || "";
  const empresa = data.get("empresa") || "";
  const servicio = data.get("servicio") || "";
  const mensaje = data.get("mensaje") || "";

  const texto = `Hola M&R Asociados, quiero solicitar una asesoría.%0A%0A` +
    `Nombre: ${encodeURIComponent(nombre)}%0A` +
    `Empresa: ${encodeURIComponent(empresa)}%0A` +
    `Servicio: ${encodeURIComponent(servicio)}%0A` +
    `Mensaje: ${encodeURIComponent(mensaje)}`;

  window.open(`https://wa.me/51956308249?text=${texto}`, "_blank", "noopener,noreferrer");
});
