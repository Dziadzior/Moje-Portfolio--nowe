AOS.init();

// Typing Effect in Hero Section
const typingEffect = document.querySelector(".typing-effect");
const words = [
  "Witaj w moim portfolio!",
  "Tworzę nowoczesne strony internetowe.",
  "Zaufaj moim umiejętnościom!",
];
let wordIndex = 0;
let letterIndex = 0;

function type() {
  if (letterIndex < words[wordIndex].length) {
    typingEffect.textContent += words[wordIndex][letterIndex];
    letterIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (letterIndex > 0) {
    typingEffect.textContent = words[wordIndex].substring(0, letterIndex - 1);
    letterIndex--;
    setTimeout(erase, 100);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 500);
  }
}

type();

// Paralaksa w sekcji Hero
window.addEventListener("scroll", () => {
  const layers = document.querySelectorAll(".parallax-layer");
  const scrollTop = window.pageYOffset;

  layers.forEach((layer, index) => {
    const depth = (index + 1) * 0.2;
    const translateY = scrollTop * depth;
    layer.style.transform = `translateY(${translateY}px)`;
  });
});

// Dynamic counters
function animateCounters() {
  const counters = document.querySelectorAll(".counter h3");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute("data-target");
        let current = 0;

        const increment = target / 200;
        const updateCount = () => {
          current += increment;
          if (current >= target) {
            counter.innerText = target;
          } else {
            counter.innerText = Math.ceil(current);
            requestAnimationFrame(updateCount);
          }
        };
        updateCount();
        observer.unobserve(counter);
      }
    });
  });

  counters.forEach((counter) => observer.observe(counter));
}

animateCounters();

// Animacja pasków procentowych
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progress = entry.target;
        const target = progress.dataset.progress;
        progress.style.width = `${target}%`;
        observer.unobserve(progress);
      }
    });
  });

  skillBars.forEach((bar) => observer.observe(bar));
}

animateSkillBars();

// Animacje fade-in dla usług
const serviceItems = document.querySelectorAll(".service-item");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.5 }
);

serviceItems.forEach((item) => {
  item.style.opacity = 0;
  item.style.transform = "translateY(50px)";
  observer.observe(item);
});

// Portfolio filter functionality
function filterPortfolio(category) {
  const items = document.querySelectorAll(".portfolio-item");
  const buttons = document.querySelectorAll(".filter-buttons button");

  buttons.forEach((button) => button.classList.remove("active"));

  items.forEach((item) => {
    if (category === "all" || item.classList.contains(category)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Wybieranie kart portfolio
const portfolioItems = document.querySelectorAll(".portfolio-item");

// Funkcja otwierająca modal
function openModal(modalId) {
  const modal = document.querySelector(modalId);
  if (modal) {
    modal.classList.add("show"); // Dodanie klasy Bootstrap 'show'
    modal.style.display = "block"; // Wyświetlenie modala
    document.body.classList.add("modal-open"); // Blokowanie przewijania strony
    document.body.style.overflow = "hidden";
  }
}

// Funkcja zamykająca modal
function closeModal(modal) {
  if (modal) {
    modal.classList.remove("show"); // Usunięcie klasy 'show'
    modal.style.display = "none"; // Ukrycie modala
    document.body.classList.remove("modal-open"); // Przywrócenie przewijania
    document.body.style.overflow = ""; // Resetowanie stylów
  }
}

// Dodanie obsługi kliknięcia na kartę portfolio
portfolioItems.forEach((item) => {
  item.addEventListener("click", () => {
    const modalId = item.getAttribute("data-bs-target");
    openModal(modalId);
  });
});

// Dodanie obsługi zamykania modalów
document.querySelectorAll(".modal").forEach((modal) => {
  // Zamykanie przyciskiem 'x'
  const closeButton = modal.querySelector(".btn-close");
  if (closeButton) {
    closeButton.addEventListener("click", () => closeModal(modal));
  }

  // Zamykanie poprzez kliknięcie poza modalem
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

const slider = document.querySelector(".testimonial-slider");
const items = document.querySelectorAll(".testimonial-item");
const prevBtn = document.querySelector(".prev-slide");
const nextBtn = document.querySelector(".next-slide");
const dotsContainer = document.querySelector(".dots-container");

let currentIndex = 0; // Index aktywnej opinii

// Funkcja inicjalizacji slidera
function initSlider() {
  // Wyświetl pierwszą opinię
  updateSlider();

  // Dynamiczne generowanie kropek nawigacyjnych
  items.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  });
}

// Funkcja aktualizująca slider
function updateSlider() {
  items.forEach((item, i) => {
    item.style.display = i === currentIndex ? "block" : "none";
  });

  // Aktualizacja kropek
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

// Obsługa przycisków "Poprzedni" i "Następny"
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateSlider();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % items.length;
  updateSlider();
});

// Automatyczne przesuwanie slidera
let autoSlide = setInterval(() => {
  currentIndex = (currentIndex + 1) % items.length;
  updateSlider();
}, 5000);

// Pauza na hover
slider.addEventListener("mouseover", () => clearInterval(autoSlide));
slider.addEventListener("mouseout", () => {
  autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    updateSlider();
  }, 5000);
});

// Inicjalizacja slidera na starcie
initSlider();

const postsPerPage = 2; // Liczba wpisów na stronę
let currentPage = 1;
const posts = document.querySelectorAll(".blog-post");
const prevPageBtn = document.querySelector(".prev-page");
const nextPageBtn = document.querySelector(".next-page");

// Funkcja aktualizująca widoczność postów
function updatePagination() {
  // Ukryj wszystkie posty
  posts.forEach((post) => {
    post.style.display = "none";
  });

  // Pokaż posty na aktualnej stronie
  let startIndex = (currentPage - 1) * postsPerPage;
  let endIndex = startIndex + postsPerPage;
  for (let i = startIndex; i < endIndex && i < posts.length; i++) {
    posts[i].style.display = "block";
  }

  // Ukrywanie i pokazywanie przycisków nawigacyjnych
  prevPageBtn.style.display = currentPage === 1 ? "none" : "inline-block";
  nextPageBtn.style.display =
    endIndex >= posts.length ? "none" : "inline-block";
}

// Obsługa przycisku "Poprzednia strona"
prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updatePagination();
  }
});

// Obsługa przycisku "Następna strona"
nextPageBtn.addEventListener("click", () => {
  if (currentPage * postsPerPage < posts.length) {
    currentPage++;
    updatePagination();
  }
});

// Inicjalizacja paginacji
updatePagination();

const form = document.getElementById("contactForm");
const statusDiv = document.querySelector(".form-status");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  statusDiv.textContent = "Wysyłanie...";

  // Prosta walidacja
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    statusDiv.textContent = "Proszę wypełnić wszystkie pola.";
    statusDiv.style.color = "red";
    return;
  }

  // Symulacja sukcesu
  setTimeout(() => {
    statusDiv.textContent = "Twoja wiadomość została wysłana!";
    statusDiv.style.color = "green";
    form.reset();
  }, 2000);
});

document.getElementById("year").textContent = new Date().getFullYear();

const backToTopButton = document.getElementById("backToTop");

// Funkcja wyświetlająca lub ukrywająca przycisk po przewinięciu
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

// Płynne przewijanie do góry
backToTopButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
