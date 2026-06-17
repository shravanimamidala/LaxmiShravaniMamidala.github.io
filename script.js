const typedPhrases = [
  "production-ready AI systems",
  "LLM agents and RAG pipelines",
  "FastAPI and cloud-native AI services",
  "data science dashboards",
  "explainable ML workflows",
  "automation frameworks and developer tooling"
];

const typedText = document.getElementById("typedText");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typedText) return;
  const phrase = typedPhrases[phraseIndex];
  const nextText = isDeleting
    ? phrase.slice(0, charIndex - 1)
    : phrase.slice(0, charIndex + 1);

  typedText.textContent = nextText;
  charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

  let delay = isDeleting ? 42 : 72;

  if (!isDeleting && charIndex === phrase.length) {
    delay = 1300;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typedPhrases.length;
    delay = 260;
  }

  window.setTimeout(typeLoop, delay);
}

typeLoop();

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !isVisible);
    });
  });
});

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
  let current = "home";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navAnchors.forEach((anchor) => {
    anchor.classList.toggle("active", anchor.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();
