// Mobile nav toggle
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector("[data-nav-links]");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close menu after clicking a link (mobile)
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Reveal on scroll
const revealEls = Array.from(document.querySelectorAll(".reveal"));
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

// Footer year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// Frontend-only form behavior: opens email client with prefilled message
function mailtoFromForm(form, subjectPrefix) {
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();

  const lines = [];
  data.forEach((v, k) => {
    const val = (v || "").toString().trim();
    if (!val) return;
    lines.push(`${k}: ${val}`);
  });

  const subject = encodeURIComponent(`${subjectPrefix} — ${name || "New request"}`);
  const body = encodeURIComponent(lines.join("\n"));

  // TODO: set a real destination email
  const DESTINATION_EMAIL = "info@example.com";
  window.location.href = `mailto:${DESTINATION_EMAIL}?subject=${subject}&body=${body}`;
}

const tourForm = document.getElementById("tourForm");
if (tourForm) {
  tourForm.addEventListener("submit", (e) => {
    e.preventDefault();
    mailtoFromForm(tourForm, "Tour Request");
  });
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    mailtoFromForm(contactForm, "Center Inquiry");
  });
}
