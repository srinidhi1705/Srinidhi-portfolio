document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = document.querySelectorAll("section[id]");
  const scrollProgress = document.getElementById("scrollProgress");
  const particlesContainer = document.getElementById("particles");
  const typeTarget = document.getElementById("typeText");
  const logo = document.querySelector(".font-marker");

  if (loadingScreen) {
    window.setTimeout(() => {
      loadingScreen.classList.add("hidden");
      window.setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 1200);
  }

  const closeMobileMenu = () => {
    if (!mobileMenu || mobileMenu.classList.contains("hidden")) {
      return;
    }

    mobileMenu.classList.remove("mobile-menu-enter");
    mobileMenu.classList.add("mobile-menu-exit");

    window.setTimeout(() => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("mobile-menu-exit");
    }, 300);
  };

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      if (mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.remove("hidden", "mobile-menu-exit");
        mobileMenu.classList.add("mobile-menu-enter");
        return;
      }

      closeMobileMenu();
    });

    mobileMenu.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    document.addEventListener("click", closeMobileMenu);
  }

  const updateActiveState = (targetHref) => {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute("href") === targetHref;
      const indicator = link.querySelector("span");

      link.classList.toggle("active", isMatch);
      link.classList.toggle("text-white", isMatch);
      link.classList.toggle("text-ash", !isMatch);

      if (indicator) {
        indicator.classList.toggle("bg-ember", isMatch);
        indicator.classList.toggle("bg-transparent", !isMatch);
      }
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      const target = href ? document.querySelector(href) : null;

      if (!target) {
        return;
      }

      event.preventDefault();
      updateActiveState(href);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMobileMenu();
    });
  });

  if (sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateActiveState(`#${entry.target.id}`);
          }
        });
      },
      { root: null, threshold: 0.45 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const revealElements = document.querySelectorAll(".reveal-hidden");
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  if (scrollProgress) {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = `${scrollPercent}%`;
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
  }

  if (particlesContainer) {
    for (let index = 0; index < 36; index += 1) {
      const particle = document.createElement("div");
      const isBrightParticle = Math.random() > 0.76;

      particle.className = index % 2 === 0 ? "particle particle-2" : "particle";
      if (isBrightParticle) {
        particle.classList.add("particle-bright");
      }

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 6}s`;
      particle.style.animationDuration = `${4 + Math.random() * 4}s`;
      particle.style.width = isBrightParticle ? "5px" : `${2 + Math.random() * 2.5}px`;
      particle.style.height = particle.style.width;
      particle.style.opacity = isBrightParticle ? `${0.65 + Math.random() * 0.25}` : `${0.18 + Math.random() * 0.35}`;
      particlesContainer.appendChild(particle);
    }
  }

  if (typeTarget) {
    const phrases = [
      "Learning ML & AI",
      "Practicing DSA Daily",
      "Building with Java",
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentPhrase = phrases[phraseIndex];
      const nextText = isDeleting
        ? currentPhrase.substring(0, charIndex - 1)
        : currentPhrase.substring(0, charIndex + 1);

      typeTarget.textContent = nextText;
      charIndex += isDeleting ? -1 : 1;

      let delay = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        delay = 1400;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 350;
      }

      window.setTimeout(typeEffect, delay);
    };

    window.setTimeout(typeEffect, 600);
  }

  if (logo) {
    logo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const tiltCard = document.getElementById("tilt-card");
  const tiltFrame = tiltCard ? tiltCard.querySelector(".photo-frame") : null;

  if (tiltCard && tiltFrame) {
    tiltCard.addEventListener("mousemove", (event) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -12;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;

      tiltFrame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    tiltCard.addEventListener("mouseleave", () => {
      tiltFrame.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }

  document.querySelectorAll(".project-tilt-container").forEach((container) => {
    const card = container.querySelector(".project-card");
    if (!card) {
      return;
    }

    container.addEventListener("mousemove", (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    container.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const galleryItems = document.querySelectorAll(".cursor-zoom-in");

  if (lightbox && lightboxImg && galleryItems.length > 0) {
    const openLightbox = (src) => {
      lightboxImg.src = src;
      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");

      window.setTimeout(() => {
        lightbox.classList.add("opacity-100");
      }, 10);

      document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
      lightbox.classList.remove("opacity-100");

      window.setTimeout(() => {
        lightbox.classList.remove("flex");
        lightbox.classList.add("hidden");
      }, 300);

      document.body.style.overflow = "";
    };

    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const image = item.querySelector("img");
        if (image) {
          openLightbox(image.src);
        }
      });
    });

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox || event.target.closest("button")) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !lightbox.classList.contains("hidden")) {
        closeLightbox();
      }
    });
  }
});
