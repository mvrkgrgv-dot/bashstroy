(() => {
const menuToggleButton = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const mobileMenuBreakpoint = window.matchMedia("(max-width: 1160px)");
const closedMenuLabel = "\u041c\u0435\u043d\u044e";
const openMenuLabel = "\u0417\u0430\u043a\u0440\u044b\u0442\u044c";
const openMenuAriaLabel = "\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e";
const closedMenuAriaLabel = "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e";

if (menuToggleButton && mobileMenu) {
  const setMobileMenuState = (isOpen) => {
    menuToggleButton.setAttribute("aria-expanded", String(isOpen));
    menuToggleButton.setAttribute("aria-label", isOpen ? openMenuAriaLabel : closedMenuAriaLabel);
    menuToggleButton.textContent = isOpen ? openMenuLabel : closedMenuLabel;
    mobileMenu.classList.toggle("is-open", isOpen);
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  };

  const isMobileMenuOpen = () => mobileMenu.classList.contains("is-open");

  setMobileMenuState(false);

  menuToggleButton.addEventListener("click", (event) => {
    event.stopPropagation();
    setMobileMenuState(!isMobileMenuOpen());
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMobileMenuState(false);
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (
      !isMobileMenuOpen() ||
      mobileMenu.contains(event.target) ||
      menuToggleButton.contains(event.target)
    ) {
      return;
    }

    setMobileMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMobileMenuOpen()) {
      setMobileMenuState(false);
      menuToggleButton.focus();
    }
  });

  const closeMenuOnDesktop = (event) => {
    if (!event.matches) {
      setMobileMenuState(false);
    }
  };

  if (mobileMenuBreakpoint.addEventListener) {
    mobileMenuBreakpoint.addEventListener("change", closeMenuOnDesktop);
  } else {
    mobileMenuBreakpoint.addListener(closeMenuOnDesktop);
  }
}

const packageOptionsElement = document.querySelector(".package-options");
const packageDots = [...document.querySelectorAll("[data-package-dot]")];

if (packageOptionsElement && packageDots.length) {
  const getPackageCards = () => [...packageOptionsElement.querySelectorAll(".package-option")];

  const setActivePackageDot = (activeIndex) => {
    packageDots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
    });
  };

  const updateActivePackageDot = () => {
    const cards = getPackageCards();

    if (!cards.length) {
      return;
    }

    const containerLeft = packageOptionsElement.getBoundingClientRect().left;
    const activeIndex = cards.reduce(
      (closestIndex, card, index) => {
        const currentDistance = Math.abs(card.getBoundingClientRect().left - containerLeft);
        const closestDistance = Math.abs(cards[closestIndex].getBoundingClientRect().left - containerLeft);

        return currentDistance < closestDistance ? index : closestIndex;
      },
      0,
    );

    setActivePackageDot(activeIndex);
  };

  let packageScrollFrame = 0;

  packageOptionsElement.addEventListener(
    "scroll",
    () => {
      window.cancelAnimationFrame(packageScrollFrame);
      packageScrollFrame = window.requestAnimationFrame(updateActivePackageDot);
    },
    { passive: true },
  );

  packageDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const targetCard = getPackageCards()[index];

      if (!targetCard) {
        return;
      }

      const paddingLeft = Number.parseFloat(getComputedStyle(packageOptionsElement).paddingLeft) || 0;

      packageOptionsElement.scrollTo({
        left: targetCard.offsetLeft - paddingLeft,
        behavior: "smooth",
      });
    });
  });

  updateActivePackageDot();
}

const experimentProjectImages = [
  {
    src: "images/project-bergamo.jpg",
    position: "50% 50%",
  },
  {
    src: "images/project-riviera.jpg",
    position: "50% 50%",
  },
  {
    src: "images/project-soho.jpg",
    position: "53% 50%",
  },
  {
    src: "images/project-shale.jpg",
    position: "50% 50%",
  },
];

const experimentPortfolioItems = [
  {
    src: "images/portfolio-facade-1.jpg",
    category: "facades",
    categoryLabel: "Фасады",
    title: "Фасад современного дома",
    fit: "cover",
    position: "center",
  },
  {
    src: "images/portfolio-facade-2.jpg",
    category: "facades",
    categoryLabel: "Фасады",
    title: "Фасад с архитектурными деталями",
    fit: "cover",
    position: "center",
  },
  {
    src: "images/portfolio-plan-1.jpg",
    category: "plans",
    categoryLabel: "Планировки",
    title: "Планировочное решение",
    fit: "contain",
    position: "center",
  },
  {
    src: "images/portfolio-plan-3d.jpg",
    category: "plans",
    categoryLabel: "Планировки",
    title: "3D-планировка дома",
    fit: "contain",
    position: "center",
    cropEdges: true,
  },
];

const markImageLoaded = (image) => {
  image.classList.remove("is-hidden");

  const showImage = () => {
    image.classList.add("is-loaded");
  };

  if (image.complete && image.naturalWidth > 0) {
    showImage();
  } else {
    image.addEventListener("load", showImage, { once: true });
  }
};

document.querySelectorAll(".project-card").forEach((card, index) => {
  const imageSettings = experimentProjectImages[index];
  const image = card.querySelector(".project-card__image");

  if (!imageSettings || !image) {
    return;
  }

  image.classList.remove("is-loaded", "is-hidden");
  image.src = imageSettings.src;
  image.style.objectPosition = imageSettings.position;
  markImageLoaded(image);
});

document.querySelectorAll("[data-portfolio-item]").forEach((item, index) => {
  const itemSettings = experimentPortfolioItems[index];
  const image = item.querySelector(".portfolio-item__image");
  const categoryElement = item.querySelector(".portfolio-item__category");
  const titleElement = item.querySelector(".portfolio-item__title");

  if (!itemSettings || !image) {
    return;
  }

  item.dataset.category = itemSettings.category;
  item.dataset.categoryLabel = itemSettings.categoryLabel;
  item.dataset.title = itemSettings.title;
  item.dataset.image = itemSettings.src;
  item.dataset.fit = itemSettings.fit;

  image.classList.remove("is-loaded", "is-hidden");
  image.src = itemSettings.src;
  image.alt = itemSettings.title;
  image.style.objectFit = itemSettings.fit;
  image.style.objectPosition = itemSettings.position;

  item.classList.toggle("portfolio-item--plan", itemSettings.fit === "contain");
  item.classList.toggle("portfolio-item--edge-crop", Boolean(itemSettings.cropEdges));

  if (categoryElement) {
    categoryElement.textContent = itemSettings.categoryLabel;
  }

  if (titleElement) {
    titleElement.textContent = itemSettings.title;
  }

  markImageLoaded(image);

  item.addEventListener("click", () => {
    const lightboxImage = document.querySelector("[data-portfolio-lightbox-image]");
    const lightboxMedia = document.querySelector(".portfolio-lightbox__media");

    if (!lightboxImage || !lightboxMedia) {
      return;
    }

    lightboxImage.style.objectFit = itemSettings.fit;
    lightboxImage.style.objectPosition = itemSettings.position;
    lightboxMedia.classList.toggle("portfolio-lightbox__media--plan", itemSettings.fit === "contain");
    lightboxMedia.classList.toggle("portfolio-lightbox__media--edge-crop", Boolean(itemSettings.cropEdges));
  });
});

document.querySelectorAll("[data-portfolio-filter='interiors'], [data-portfolio-filter='build']").forEach((button) => {
  button.hidden = true;
});

const projectsGrid = document.querySelector("[data-projects-grid]");
const projectsPrevButton = document.querySelector("[data-projects-prev]");
const projectsNextButton = document.querySelector("[data-projects-next]");
const projectsProgress = document.querySelector("[data-projects-progress]");
const projectsCounter = document.querySelector("[data-projects-counter]");

const scrollMobileProjects = (direction) => {
  if (!projectsGrid || !window.matchMedia("(max-width: 768px)").matches) {
    return false;
  }

  const card = projectsGrid.querySelector(".project-card");

  if (!card) {
    return false;
  }

  const gap = Number.parseFloat(getComputedStyle(projectsGrid).columnGap) || 16;
  projectsGrid.scrollBy({
    left: direction * (card.getBoundingClientRect().width + gap),
    behavior: "smooth",
  });

  return true;
};

projectsPrevButton?.addEventListener(
  "click",
  (event) => {
    if (!scrollMobileProjects(-1)) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
  },
  true,
);

projectsNextButton?.addEventListener(
  "click",
  (event) => {
    if (!scrollMobileProjects(1)) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
  },
  true,
);

if (projectsGrid && projectsProgress && projectsCounter) {
  const getProjectCards = () => [...projectsGrid.querySelectorAll(".project-card")];

  const updateProjectsIndicator = () => {
    const cards = getProjectCards();

    if (!cards.length) {
      return;
    }

    const containerLeft = projectsGrid.getBoundingClientRect().left;
    const activeIndex = cards.reduce(
      (closestIndex, card, index) => {
        const currentDistance = Math.abs(card.getBoundingClientRect().left - containerLeft);
        const closestDistance = Math.abs(cards[closestIndex].getBoundingClientRect().left - containerLeft);

        return currentDistance < closestDistance ? index : closestIndex;
      },
      0,
    );

    projectsProgress.style.width = `${((activeIndex + 1) / cards.length) * 100}%`;
    projectsCounter.textContent = `${activeIndex + 1} / ${cards.length}`;
  };

  let projectsIndicatorFrame = 0;

  projectsGrid.addEventListener(
    "scroll",
    () => {
      window.cancelAnimationFrame(projectsIndicatorFrame);
      projectsIndicatorFrame = window.requestAnimationFrame(updateProjectsIndicator);
    },
    { passive: true },
  );

  window.addEventListener("resize", updateProjectsIndicator);
  updateProjectsIndicator();
}
})();
