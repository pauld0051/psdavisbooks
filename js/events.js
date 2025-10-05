function updateCountdown() {
  // Read target date and finished message from the DOM so the JS stays reusable
  const container = document.getElementById("countdown");
  if (!container) return;

  // Default to An Envious God release (CET, UTC+1). You can override via data-release on #countdown.
  const releaseISO =
    container.getAttribute("data-release") || "2025-11-30T00:00:00+01:00";
  const finishedText =
    container.getAttribute("data-finished-text") || "Release day has arrived!";

  const releaseDate = new Date(releaseISO); // fixed offset handles CET vs CEST automatically for this date
  const now = new Date();
  const timeDiff = releaseDate.getTime() - now.getTime();

  if (timeDiff <= 0) {
    container.innerHTML = `<p>${finishedText}</p>`;
    const aria = document.getElementById("countdown-aria");
    if (aria) aria.textContent = finishedText;
    return;
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0"
  );

  // Update an aria-live region for screen readers once per tick (optional, non-visual)
  const aria = document.getElementById("countdown-aria");
  if (aria) {
    aria.textContent = `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds until release.`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
