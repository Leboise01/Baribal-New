/* Page photos : albums déroulants + lightbox — données dans data/photos-raw.json */

const TYPE_LABEL_PHOTOS = {
  camp: "Camp",
  "weekend-troupe": "Weekend troupe",
  "weekend-patrouille": "Weekend patrouille",
  sortie: "Sortie",
  rentree: "Rentrée",
  pelerinage: "Pèlerinage",
  autre: "Activité",
};

function slug(titre) {
  return titre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function inferType(titre) {
  const t = titre.toLowerCase();
  if (t.includes("camp")) return "camp";
  if ((t.includes("week-end") || t.includes("weekend")) && t.includes("troupe")) return "weekend-troupe";
  if ((t.includes("week-end") || t.includes("weekend")) && t.includes("patrouille")) return "weekend-patrouille";
  if (t.includes("sortie")) return "sortie";
  if (t.includes("rentr")) return "rentree";
  if (t.includes("pelerinage") || t.includes("pèlerinage")) return "pelerinage";
  return "autre";
}

const chevron = '<svg class="photo-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>';

let albums = [];
let albumOuvert = null;

function ouvrirLightbox(src, titre) {
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox-title").textContent = titre;
  document.getElementById("lightbox-download").href = src;
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}

function fermerLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

function afficherAlbums() {
  const el = document.getElementById("photo-list");
  if (!el) return;

  el.innerHTML = albums.map((a) => {
    const ouvert = albumOuvert === a.id;
    return `
      <article class="photo-item${ouvert ? " open" : ""}" id="${a.id}">
        <button class="photo-toggle" type="button" data-id="${a.id}" aria-expanded="${ouvert}">
          <div class="photo-thumb"><img src="${a.cover}" alt="" loading="lazy" /></div>
          <div class="photo-info">
            <div class="type">${TYPE_LABEL_PHOTOS[a.type]} · ${a.images.length} photos</div>
            <h2>${a.title}</h2>
          </div>
          ${chevron}
        </button>
        ${ouvert ? `
          <div class="photo-grid-wrap">
            <div class="photo-grid">
              ${a.images.map((src, i) => `
                <button type="button" class="btn-photo" data-src="${src}" data-titre="${a.title}">
                  <img src="${src}" alt="${a.title} — photo ${i + 1}" loading="lazy" />
                </button>
              `).join("")}
            </div>
          </div>
        ` : ""}
      </article>
    `;
  }).join("");

  el.querySelectorAll(".photo-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      albumOuvert = albumOuvert === id ? null : id;
      afficherAlbums();
    });
  });

  el.querySelectorAll(".btn-photo").forEach((btn) => {
    btn.addEventListener("click", () => ouvrirLightbox(btn.dataset.src, btn.dataset.titre));
  });
}

async function init() {
  const raw = window.BARIBAL_PHOTOS_RAW || (await fetch("data/photos-raw.json").then((r) => r.json()));
  albums = raw
    .filter((c) => c.images.length > 0)
    .map((c) => ({
      id: slug(c.title),
      title: c.title,
      type: inferType(c.title),
      cover: c.images[0],
      images: c.images,
    }));

  const hash = location.hash.replace("#", "");
  albumOuvert = albums.find((a) => a.id === hash)?.id ?? albums[0]?.id ?? null;

  afficherAlbums();

  if (hash) {
    setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  document.getElementById("lightbox")?.addEventListener("click", (e) => {
    if (e.target.id === "lightbox") fermerLightbox();
  });
  document.getElementById("lightbox-close")?.addEventListener("click", fermerLightbox);
  document.querySelector(".lightbox-body")?.addEventListener("click", (e) => e.stopPropagation());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fermerLightbox();
  });
}

document.addEventListener("DOMContentLoaded", init);
