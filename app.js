const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const yearNode = document.getElementById("year");

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
