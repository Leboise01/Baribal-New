/* Menu mobile + année dans le pied de page */
document.getElementById("menu-btn")?.addEventListener("click", () => {
  document.getElementById("nav-mobile")?.classList.toggle("open");
});

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
