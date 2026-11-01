
document.addEventListener("DOMContentLoaded", () => {

  // MENÚ PARA CELULARES
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );

      document.body.classList.toggle("menu-open", isOpen);
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        document.body.classList.remove("menu-open");
      });
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    });
  }

  // BUSCADOR Y FILTROS DEL BLOG
  const searchInput = document.getElementById("searchInput");
  const filterButtons = [
    ...document.querySelectorAll(".filter-button")
  ];

  const storyCards = [
    ...document.querySelectorAll(".story-card")
  ];

  const noResults = document.getElementById("noResults");
  let activeFilter = "todos";

  function filterStories() {
    const query = (searchInput?.value || "")
      .trim()
      .toLocaleLowerCase("es");

    let visibleCount = 0;

    storyCards.forEach(card => {
      const categoryMatches =
        activeFilter === "todos" ||
        card.dataset.category === activeFilter;

      const searchableText = (
        `${card.dataset.search || ""} ${card.textContent}`
      ).toLocaleLowerCase("es");

      const searchMatches =
        !query || searchableText.includes(query);

      const visible = categoryMatches && searchMatches;

      card.hidden = !visible;

      if (visible) {
        visibleCount++;
      }
    });

    if (noResults) {
      noResults.hidden = visibleCount !== 0;
    }
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "todos";

      filterButtons.forEach(item => {
        const selected = item === button;

        item.classList.toggle("active", selected);
        item.setAttribute(
          "aria-pressed",
          String(selected)
        );
      });

      filterStories();
    });
  });

  searchInput?.addEventListener("input", filterStories);

  // GALERÍA DE FOTOGRAFÍAS
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll(".gallery-item").forEach(button => {
    button.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;

      const thumbnail = button.querySelector("img");

      lightboxImage.src =
        button.dataset.full || thumbnail?.src || "";

      lightboxImage.alt =
        thumbnail?.alt || "Fotografía de Amazonas";

      if (typeof lightbox.showModal === "function") {
        lightbox.showModal();
      }
    });
  });

  lightboxClose?.addEventListener("click", () => {
    lightbox?.close();
  });

  lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });

  // BOTÓN PARA COPIAR EL CORREO
  const copyEmail = document.getElementById("copyEmail");
  const copyStatus = document.getElementById("copyStatus");

  copyEmail?.addEventListener("click", async () => {
    const email = "amazonasvocesyraices@gmail.com";

    try {
      await navigator.clipboard.writeText(email);

      if (copyStatus) {
        copyStatus.textContent = "¡Correo copiado!";
      }
    } catch {
      if (copyStatus) {
        copyStatus.textContent =
          "Selecciona y copia: " + email;
      }
    }
  });

  // AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

});
