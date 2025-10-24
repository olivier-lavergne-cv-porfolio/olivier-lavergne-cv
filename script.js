/* ==============================
   Olivier Lavergne | script.js
   Optimized 2025 version
   ============================== */

// === LANGUAGE & THEME STORAGE ===
const storage = {
  getTheme: () => localStorage.getItem("theme") || "dark",
  setTheme: (theme) => localStorage.setItem("theme", theme),
  getLang: () => localStorage.getItem("lang") || "fr",
  setLang: (lang) => localStorage.setItem("lang", lang),
};

// === THEME SWITCHER ===
function initTheme() {
  const theme = storage.getTheme();
  document.body.classList.toggle("light-mode", theme === "light");
  document.querySelectorAll(".theme-btn").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.theme === theme)
  );
}
document.querySelectorAll(".theme-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const selected = btn.dataset.theme;
    storage.setTheme(selected);
    initTheme();
  });
});

// === LANGUAGE SWITCHER ===
function initLanguage() {
  const lang = storage.getLang();
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang-btn").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.lang === lang)
  );

  // Text translation (lightweight dictionary)
  const dict = {
    en: {
      title: "Videographer & Motion Designer",
      subtitle: "Transform your marketing challenges into measurable success with a creative, AI-driven approach.",
      discover: "Discover my approach",
      about: "Creative Videographer & Marketing Strategist",
      contact: "Let's create something extraordinary together 🚀",
    },
    fr: {
      title: "Vidéaste & Motion Designer",
      subtitle: "Transformez vos défis marketing en succès mesurables grâce à une approche créative data-driven boostée par l’IA générative.",
      discover: "Découvrir mon approche",
      about: "Vidéaste créatif & stratège marketing",
      contact: "Créons l'extraordinaire ensemble 🚀",
    },
  };

  // Update visible text if selectors exist
  const t = dict[lang];
  document.querySelector("[data-i18n='title']")?.textContent = t.title;
  document.querySelector("[data-i18n='subtitle']")?.textContent = t.subtitle;
  document.querySelector("[data-i18n='discover']")?.textContent = t.discover;
  document.querySelector("[data-i18n='about']")?.textContent = t.about;
  document.querySelector("[data-i18n='contact']")?.textContent = t.contact;
}
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const selected = btn.dataset.lang;
    storage.setLang(selected);
    initLanguage();
  });
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// === HEADER EFFECT ON SCROLL ===
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// === INIT EVERYTHING ===
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLanguage();
});
