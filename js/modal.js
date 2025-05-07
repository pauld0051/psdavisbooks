document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("sneakModal");
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const modalImage = document.getElementById("modalImage");
  const prevBtn = document.getElementById("prevImage");
  const nextBtn = document.getElementById("nextImage");

  // Detect WebP support
  function supportsWebP(callback) {
    const img = new Image();
    img.onload = () => callback(img.width > 0 && img.height > 0);
    img.onerror = () => callback(false);
    img.src =
      "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEALkA0YAAA/v8=";
  }

  supportsWebP(function (isSupported) {
    const ext1 = isSupported ? "webp" : "png";
    const ext2 = isSupported ? "webp" : "jpg";

    const images = [
      `images/books/the-seekers-wrath/Deyra-(1).${ext1}`,
      `images/books/the-seekers-wrath/the-seekers-wrath(1).${ext1}`,
      `images/books/the-seekers-wrath/beach4.${ext1}`,
      `images/books/the-seekers-wrath/Paul Davis(Deyra1).${ext2}`,
    ];

    let currentIndex = 0;

    function updateModalImage(index) {
      modalImage.src = images[index];
    }

    openBtn.addEventListener("click", () => {
      modal.style.display = "block";
      updateModalImage(currentIndex);
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modal.style.display = "none";
      }
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateModalImage(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateModalImage(currentIndex);
    });
  });
});
