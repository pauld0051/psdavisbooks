function openFullscreen(image) {
  const mapWindow = window.open("", "_blank");
  mapWindow.document.write(`
        <html>
        <head>
            <title>Map of Teloshka</title>
            <style>
                body {
                    margin: 0;
                    background: #000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            </style>
        </head>
        <body>
            <img src="${image.src}" alt="Map of Teloshka">
        </body>
        </html>
    `);
}

// Create fullscreen overlay dynamically
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.createElement("div");
  overlay.id = "map-overlay";
  overlay.innerHTML = '<img id="map-overlay-img" alt="Map of Teloshka">';
  document.body.appendChild(overlay);

  overlay.addEventListener("click", closeMapOverlay);
  document.addEventListener("keydown", closeMapOverlay);
});

function openFullscreen(image) {
  const overlay = document.getElementById("map-overlay");
  const img = document.getElementById("map-overlay-img");
  img.src = image.src;
  overlay.style.display = "flex";
}

function closeMapOverlay() {
  const overlay = document.getElementById("map-overlay");
  overlay.style.display = "none";
}
