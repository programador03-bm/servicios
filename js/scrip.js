document.addEventListener("DOMContentLoaded", function () {
  // ✅ Carrusel principal (banner)
  const swiperBanner = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // ✅ Botón de modo oscuro
  const btn = document.getElementById("toggle-dark");
  const body = document.body;
  const icon = btn.querySelector("i");

  if (btn) {
    btn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      icon.classList.toggle("fa-moon");
      icon.classList.toggle("fa-sun");
    });
  }







  // ✅ Efecto scroll en header
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // ✅ Coverflow personalizado
  const slider = document.querySelector(".slider");
  const items = document.querySelectorAll(".slider .item");
  let active = 2;
  let startX = 0;
  let isDragging = false;

  function loadShow() {
    items.forEach((item, i) => {
      item.classList.remove("activo");
      const offset = i - active;
      item.style.zIndex = -Math.abs(offset);

      if (offset === 0) {
        item.classList.add("activo"); // central
        item.style.transform = `scale(1.15) translateY(-12px)`;
        item.style.filter = "none";
        item.style.opacity = 1;
        item.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
        item.style.cursor = "pointer";
      } else {
        item.style.transform = `translateX(${offset * 120}px) scale(${1 - 0.15 * Math.abs(offset)}) rotateY(${offset * 6}deg)`;
        item.style.filter = "blur(4px)";
        item.style.opacity = Math.abs(offset) > 2 ? 0 : 0.6;
        item.style.boxShadow = "none";
        item.style.cursor = "default";
      }
    });
  }

  if (slider && items.length > 0) {
    loadShow();

    // Mouse events
    slider.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
      slider.style.cursor = "grabbing";
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const diff = e.clientX - startX;
      if (Math.abs(diff) > 40) {
        if (diff < 0 && active < items.length - 1) active++;
        else if (diff > 0 && active > 0) active--;
        loadShow();
        isDragging = false;
      }
    });

    slider.addEventListener("mouseup", () => {
      isDragging = false;
      slider.style.cursor = "grab";
    });

    slider.addEventListener("mouseleave", () => {
      isDragging = false;
      slider.style.cursor = "grab";
    });

    // Touch events
    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    slider.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const diff = e.touches[0].clientX - startX;
      if (Math.abs(diff) > 40) {
        if (diff < 0 && active < items.length - 1) active++;
        else if (diff > 0 && active > 0) active--;
        loadShow();
        isDragging = false;
      }
    });

    slider.addEventListener("touchend", () => {
      isDragging = false;
    });

    // ✅ Movimiento automático cada 4 segundos
    setInterval(() => {
      active = (active + 1) % items.length;
      loadShow();
    }, 4000);
  }

// ✅ Menú hamburguesa con animación
const toggleBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (toggleBtn && nav) {
  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("active");
    nav.classList.toggle("show");
  });
}



// Animación al hacer scroll
const valorCards = document.querySelectorAll(".valor-card");

const mostrarCards = () => {
  valorCards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    const visible = window.innerHeight - 100;
    if (top < visible) {
      card.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", mostrarCards);
window.addEventListener("load", mostrarCards);



// Animación para beneficios tipo lista
const beneficiosLi = document.querySelectorAll('.texto-beneficios li');
const observerLi = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observerLi.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

beneficiosLi.forEach(li => observerLi.observe(li));


// Animaciones al hacer scroll
function revealOnScroll() {
  const elementos = document.querySelectorAll('.anim-fade-up, .anim-flip, .anim-zoom');

  elementos.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.85;

    if (top < triggerPoint) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

});




