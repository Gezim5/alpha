document.addEventListener("DOMContentLoaded", () => {
  handleImageSliders();
  handleHeroCarAnimation();
  setupMobileNavToggle();
});

// === IMAGE SLIDER HANDLING ===
function handleImageSliders() {
  document.querySelectorAll(".image-slider").forEach((slider) => {
    const images = slider.querySelectorAll(".slider-image");
    const prev = slider.querySelector(".prev-btn");
    const next = slider.querySelector(".next-btn");
    let index = 0;

    const updateSlider = () => {
      images.forEach((img, i) => img.classList.toggle("active", i === index));
    };

    prev?.addEventListener("click", () => {
      index = (index - 1 + images.length) % images.length;
      updateSlider();
    });

    next?.addEventListener("click", () => {
      index = (index + 1) % images.length;
      updateSlider();
    });

    updateSlider(); // Initialize
  });
}

// === HERO CAR ANIMATION ===
function handleHeroCarAnimation() {
  const car = document.querySelector(".hero-car");
  if (car) {
    car.addEventListener("animationend", () => {
      car.classList.add("parked");
    });
  }
}

// === MOBILE NAVIGATION TOGGLE ===
function setupMobileNavToggle() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("navbar");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
}

// === PAGE LOAD FIXES (LAYOUT & AOS INIT) ===
window.addEventListener("load", () => {
  ensureAboutSectionVisible();
  initializeAOS();
});

// === ABOUT SECTION MOBILE DISPLAY FIX ===
function ensureAboutSectionVisible() {
  const about = document.querySelector(".about-section");
  if (about) {
    about.style.display = "block";
    about.offsetHeight; // Trigger reflow
  }
}

// === AOS INITIALIZATION WITH FALLBACK ===
function initializeAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      delay: 100,
      easing: 'ease-in-out'
    });

    // Fix potential mobile viewport bugs
    setTimeout(() => AOS.refreshHard(), 200);
    window.addEventListener("resize", () => setTimeout(() => AOS.refreshHard(), 300));
    window.addEventListener("orientationchange", () => setTimeout(() => AOS.refreshHard(), 300));
  }
}
