function updateCountdown() {
  // Use Central European Time (Sweden)
  const releaseDate = new Date("2025-06-30T00:00:00+02:00"); // Adjusted to Swedish summer time (CEST)
  const now = new Date();

  const timeDiff = releaseDate - now;

  if (timeDiff <= 0) {
    document.getElementById("countdown").innerHTML =
      "<p>Release day has arrived!</p>";
    return;
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

document.addEventListener("DOMContentLoaded", function () {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
