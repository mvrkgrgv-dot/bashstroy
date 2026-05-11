const yearElement = document.querySelector("#current-year");
const headerElement = document.querySelector("[data-header]");
const heroElement = document.querySelector("[data-hero]");
const heroImageElement = document.querySelector(".hero__image");
const projectsGridElement = document.querySelector("[data-projects-grid]");
const projectsPrevButton = document.querySelector("[data-projects-prev]");
const projectsNextButton = document.querySelector("[data-projects-next]");
const portfolioFilters = document.querySelectorAll("[data-portfolio-filter]");
const portfolioItems = document.querySelectorAll("[data-portfolio-item]");
const portfolioLightbox = document.querySelector("[data-portfolio-lightbox]");
const portfolioLightboxImage = document.querySelector("[data-portfolio-lightbox-image]");
const portfolioLightboxPlaceholder = document.querySelector("[data-portfolio-lightbox-placeholder]");
const portfolioLightboxTitle = document.querySelector("[data-portfolio-lightbox-title]");
const portfolioLightboxCategory = document.querySelector("[data-portfolio-lightbox-category]");
const portfolioCloseButtons = document.querySelectorAll("[data-portfolio-close]");
const leadForm = document.querySelector("[data-lead-form]");
const revealSections = document.querySelectorAll("[data-reveal-section]");

const projects = [
  {
    title: "Бергамо 120",
    area: "120 м²",
    params: "3 спальни · 2 санузла",
    price: "от 7 650 000 ₽",
    description: "Компактный современный дом для семьи с продуманной планировкой.",
    image: "images/project-bergamo.jpg",
  },
  {
    title: "Ривьера 160",
    area: "160 м²",
    params: "4 спальни · 2 санузла",
    price: "от 9 980 000 ₽",
    description: "Просторный дом с большой гостиной и выразительной архитектурой.",
    image: "images/project-riviera.jpg",
  },
  {
    title: "Сохо 180",
    area: "180 м²",
    params: "4 спальни · 3 санузла",
    price: "от 11 500 000 ₽",
    description: "Лаконичный двухэтажный дом с панорамным остеклением.",
    image: "images/project-soho.jpg",
  },
  {
    title: "Шале 210",
    area: "210 м²",
    params: "5 спален · 3 санузла",
    price: "от 13 900 000 ₽",
    description: "Атмосферный загородный дом с тёплыми материалами и большим объёмом.",
    image: "images/project-shale.jpg",
  },
];

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (headerElement) {
  const updateHeaderState = () => {
    headerElement.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

if (heroElement) {
  window.requestAnimationFrame(() => {
    heroElement.classList.add("is-visible");
  });
}

if (heroImageElement) {
  const showHeroImage = () => {
    heroImageElement.classList.add("is-loaded");
  };

  if (heroImageElement.complete && heroImageElement.naturalWidth > 0) {
    showHeroImage();
  } else {
    heroImageElement.addEventListener("load", showHeroImage, { once: true });
  }

  heroImageElement.addEventListener("error", () => {
    heroImageElement.classList.add("is-hidden");
  });
}

if (projectsGridElement) {
  projectsGridElement.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-card" style="--project-index: ${index + 1}">
          <a class="project-card__media" href="#projects" aria-label="${project.title}">
            <img
              class="project-card__image"
              src="${project.image}"
              alt="${project.title}"
              loading="lazy"
            />
            <div class="project-card__placeholder" aria-hidden="true">
              <span class="project-card__sun"></span>
              <span class="project-card__house project-card__house--main"></span>
              <span class="project-card__house project-card__house--side"></span>
              <span class="project-card__roof"></span>
              <span class="project-card__window project-card__window--one"></span>
              <span class="project-card__window project-card__window--two"></span>
              <span class="project-card__landscape"></span>
            </div>
            <span class="project-card__badge liquid-glass">${project.area}</span>
          </a>

          <div class="project-card__body">
            <div class="project-card__content">
              <h3 class="project-card__title">${project.title}</h3>
              <p class="project-card__meta">${project.params}</p>
              <p class="project-card__description">${project.description}</p>
            </div>

            <div class="project-card__footer">
              <p class="project-card__price">${project.price}</p>
              <a class="project-card__arrow liquid-glass" href="#projects" aria-label="Подробнее о проекте ${project.title}">
                →
              </a>
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  projectsGridElement.querySelectorAll(".project-card__image").forEach((image) => {
    const showProjectImage = () => {
      image.classList.add("is-loaded");
    };

    if (image.complete && image.naturalWidth > 0) {
      showProjectImage();
    } else {
      image.addEventListener("load", showProjectImage, { once: true });
    }

    image.addEventListener("error", () => {
      image.classList.add("is-hidden");
    });
  });
}

if (projectsGridElement && projectsPrevButton && projectsNextButton) {
  let activeProjectIndex = 0;

  const scrollProjects = (direction) => {
    const cards = [...projectsGridElement.querySelectorAll(".project-card")];

    if (!cards.length) {
      return;
    }

    activeProjectIndex = (activeProjectIndex + direction + cards.length) % cards.length;

    cards[activeProjectIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };

  projectsPrevButton.addEventListener("click", () => scrollProjects(-1));
  projectsNextButton.addEventListener("click", () => scrollProjects(1));
}

if (portfolioItems.length) {
  portfolioItems.forEach((item) => {
    const image = item.querySelector(".portfolio-item__image");

    if (!image) {
      return;
    }

    const showPortfolioImage = () => {
      image.classList.add("is-loaded");
    };

    if (image.complete && image.naturalWidth > 0) {
      showPortfolioImage();
    } else {
      image.addEventListener("load", showPortfolioImage, { once: true });
    }

    image.addEventListener("error", () => {
      image.classList.add("is-hidden");
    });
  });
}

if (portfolioFilters.length && portfolioItems.length) {
  portfolioFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const activeCategory = filter.dataset.portfolioFilter;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      portfolioFilters.forEach((button) => {
        button.classList.toggle("is-active", button === filter);
      });

      portfolioItems.forEach((item) => {
        const shouldShow = activeCategory === "all" || item.dataset.category === activeCategory;

        item.classList.toggle("is-hidden", !shouldShow);

        if (shouldShow && item.animate && !prefersReducedMotion) {
          item.animate(
            [
              { opacity: 0, transform: "translateY(12px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 240,
              easing: "cubic-bezier(0.23, 1, 0.32, 1)",
            },
          );
        }
      });
    });
  });
}

if (
  portfolioItems.length &&
  portfolioLightbox &&
  portfolioLightboxImage &&
  portfolioLightboxPlaceholder &&
  portfolioLightboxTitle &&
  portfolioLightboxCategory
) {
  let lastFocusedPortfolioItem = null;

  const closePortfolioLightbox = () => {
    portfolioLightbox.classList.remove("is-open");
    portfolioLightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-lightbox-open");

    if (lastFocusedPortfolioItem) {
      lastFocusedPortfolioItem.focus();
    }
  };

  const openPortfolioLightbox = (item) => {
    lastFocusedPortfolioItem = item;

    const title = item.dataset.title || "";
    const category = item.dataset.categoryLabel || "";
    const imageSrc = item.dataset.image || "";

    portfolioLightboxTitle.textContent = title;
    portfolioLightboxCategory.textContent = category;
    portfolioLightboxImage.alt = title;
    portfolioLightboxImage.classList.remove("is-loaded", "is-hidden");
    portfolioLightboxImage.src = imageSrc;
    portfolioLightboxPlaceholder.className = "portfolio-lightbox__placeholder portfolio-placeholder";
    portfolioLightboxPlaceholder.classList.add(`portfolio-placeholder--${item.dataset.category || "facade"}`);

    portfolioLightbox.classList.add("is-open");
    portfolioLightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-lightbox-open");

    const closeButton = portfolioLightbox.querySelector(".portfolio-lightbox__close");
    closeButton?.focus();
  };

  portfolioLightboxImage.addEventListener("load", () => {
    portfolioLightboxImage.classList.add("is-loaded");
  });

  portfolioLightboxImage.addEventListener("error", () => {
    portfolioLightboxImage.classList.add("is-hidden");
  });

  portfolioItems.forEach((item) => {
    item.addEventListener("click", () => openPortfolioLightbox(item));
  });

  portfolioCloseButtons.forEach((button) => {
    button.addEventListener("click", closePortfolioLightbox);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && portfolioLightbox.classList.contains("is-open")) {
      closePortfolioLightbox();
    }
  });
}

if (leadForm) {
  const leadMessage = leadForm.querySelector("[data-lead-message]");
  const requiredFields = leadForm.querySelectorAll("[required]");

  const clearLeadState = () => {
    requiredFields.forEach((field) => {
      field.classList.remove("is-invalid");
      field.closest(".lead-consent")?.classList.remove("is-invalid");
    });

    if (leadMessage) {
      leadMessage.textContent = "";
      leadMessage.classList.remove("is-success", "is-error");
    }
  };

  requiredFields.forEach((field) => {
    field.addEventListener("input", clearLeadState);
    field.addEventListener("change", clearLeadState);
  });

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearLeadState();

    const invalidFields = [...requiredFields].filter((field) => {
      if (field.type === "checkbox") {
        return !field.checked;
      }

      return !field.value.trim();
    });

    if (invalidFields.length) {
      invalidFields.forEach((field) => {
        field.classList.add("is-invalid");
        field.closest(".lead-consent")?.classList.add("is-invalid");
      });

      leadMessage.textContent = "Пожалуйста, заполните имя, телефон и подтвердите согласие.";
      leadMessage.classList.add("is-error");
      invalidFields[0].focus();
      return;
    }

    const formData = Object.fromEntries(new FormData(leadForm).entries());
    formData.consent = leadForm.elements.consent.checked;

    console.log("Lead form submit:", formData);

    leadForm.reset();
    leadMessage.textContent = "Заявка отправлена. Мы свяжемся с вами в ближайшее рабочее время.";
    leadMessage.classList.add("is-success");
  });
}

if (revealSections.length) {
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 },
    );

    revealSections.forEach((section) => revealObserver.observe(section));
  } else {
    revealSections.forEach((section) => section.classList.add("is-visible"));
  }
}
