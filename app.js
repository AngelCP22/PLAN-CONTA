const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const yearNode = document.getElementById("year");

navToggle?.addEventListener("click", () => {
  siteNav?.classList.toggle("open");
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
  });
});

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
