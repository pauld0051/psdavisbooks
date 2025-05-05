document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("sneakModal");
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");

  const modalImage = document.getElementById("modalImage");
  const prevBtn = document.getElementById("prevImage");
  const nextBtn = document.getElementById("nextImage");

  const images = [
    "images/books/the-seekers-wrath/Deyra-(1).png",
    "images/books/the-seekers-wrath/the-seekers-wrath(1).png",
    "images/books/the-seekers-wrath/beach4.png",
    "images/books/the-seekers-wrath/Paul Davis(Deyra1).jpg",
  ];
  let currentIndex = 0;

  function updateModalImage(index) {
    modalImage.src = images[index];
  }

  openBtn.addEventListener("click", () => {
    modal.style.display = "block";
    updateModalImage(currentIndex); // Always make sure first image shows
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
