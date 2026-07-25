(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }
})();

/* Language toggle (English / Hindi) */
(function () {
  const STORAGE_KEY = "sahyog-lang";
  const root = document.documentElement;

  function getStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "en";
    } catch (e) {
      return "en";
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function applyLang(lang) {
    document.querySelectorAll("[data-hi]").forEach((el) => {
      if (el.dataset.en === undefined) {
        el.dataset.en = el.textContent;
      }
      el.textContent = lang === "hi" ? el.dataset.hi : el.dataset.en;
    });
    document.querySelectorAll("[data-hi-placeholder]").forEach((el) => {
      if (el.dataset.enPlaceholder === undefined) {
        el.dataset.enPlaceholder = el.getAttribute("placeholder") || "";
      }
      el.setAttribute(
        "placeholder",
        lang === "hi" ? el.dataset.hiPlaceholder : el.dataset.enPlaceholder
      );
    });
    root.setAttribute("lang", lang === "hi" ? "hi" : "en");
    root.classList.toggle("lang-hi", lang === "hi");
    document.querySelectorAll(".lang-toggle").forEach((btn) => {
      btn.textContent = lang === "hi" ? "English" : "हिंदी";
    });
  }

  applyLang(getStoredLang());

  document.querySelectorAll(".lang-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = root.classList.contains("lang-hi") ? "en" : "hi";
      setStoredLang(next);
      applyLang(next);
    });
  });
})();

/* Slideshow Logic */
(function() {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 4000);
  }
})();
