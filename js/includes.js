document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll("[data-include]");
  let includeCount = elements.length;

  elements.forEach((el) => {
    const file = el.getAttribute("data-include");

    fetch(file)
      .then((res) => res.text())
      .then((data) => {
        el.innerHTML = data;
        includeCount--;

        // ✅ If this was the footer, update the year
        if (file.includes("footer")) {
          const yearSpan = el.querySelector("#copyright-year");
          if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
          }
        }

        // ✅ After all includes are done, run setup
        if (includeCount === 0) {
          finalizeSetup();
        }
      });
  });

  function finalizeSetup() {
    // FontAwesome fix
    if (typeof FontAwesome !== "undefined") {
      FontAwesome.dom.i2svg();
    }

    // Nav toggle setup
    const navToggle = document.getElementById("navToggle");
    const mainNav = document.getElementById("mainNav");

    if (navToggle && mainNav) {
      navToggle.addEventListener("click", function () {
        mainNav.classList.toggle("active");
      });
    }

    // ✅ Email setup (after includes)
    const user = "psdavisbooks";
    const domain = "gmail.com";
    const email = `${user}@${domain}`;

    // Text-based obfuscated email
    const emailText = document.getElementById("email");
    if (emailText) {
      emailText.innerHTML = `<a href="mailto:${email}">${user}(at)${domain.replace(
        ".",
        "(dot)"
      )}</a>`;
    }

    // Icon version
    const emailIcon = document.getElementById("email-icon-wrapper");
    if (emailIcon) {
      emailIcon.innerHTML = `<i class="fa-solid fa-envelope"></i>`;
      emailIcon.href = `mailto:${email}`;
      emailIcon.setAttribute("aria-label", "Email P. S. Davis");
      emailIcon.setAttribute("title", "Email P. S. Davis");
      emailIcon.setAttribute("rel", "noopener noreferrer");
      emailIcon.setAttribute("target", "_blank");
    }
  }

});
