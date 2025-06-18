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

        // ✅ Update footer year
        if (file.includes("footer")) {
          const yearSpan = el.querySelector("#copyright-year");
          if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
          }
        }

        // ✅ When all includes are done
        if (includeCount === 0) {
          finalizeSetup();
        }
      });
  });

  function finalizeSetup() {
    
    // ✅ Nav toggle
    const navToggle = document.getElementById("navToggle");
    const mainNav = document.getElementById("mainNav");
    if (navToggle && mainNav) {
      navToggle.addEventListener("click", function () {
        mainNav.classList.toggle("active");
      });
    }

    // ✅ FontAwesome fix
    if (typeof FontAwesome !== "undefined") {
      FontAwesome.dom.i2svg();
    }

    // ✅ Email injection
    const user = "psdavisbooks";
    const domain = "gmail.com";
    const email = `${user}@${domain}`;

    const emailText = document.getElementById("email");
    if (emailText) {
      emailText.innerHTML = `<a href="mailto:${email}">${user}(at)${domain.replace(
        ".",
        "(dot)"
      )}</a>`;
    }

    const emailIcon = document.getElementById("email-icon-wrapper");
    if (emailIcon) {
      emailIcon.innerHTML = `<i class="fa-solid fa-envelope"></i>`;
      emailIcon.href = `mailto:${email}`;
      emailIcon.setAttribute("aria-label", "Email P. S. Davis");
      emailIcon.setAttribute("title", "Email P. S. Davis");
      emailIcon.setAttribute("rel", "noopener noreferrer");
      emailIcon.setAttribute("target", "_blank");
    }

    // ✅ Newsletter modal setup
    const openBtn = document.getElementById("open-newsletter-modal");
    const closeBtn = document.getElementById("close-newsletter-modal");
    const modal = document.getElementById("newsletter-modal");

    if (openBtn && closeBtn && modal) {
      openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        modal.classList.remove("hidden");
      });

      closeBtn.addEventListener("click", function () {
        modal.classList.add("hidden");
      });

      window.addEventListener("click", function (e) {
        if (e.target === modal) {
          modal.classList.add("hidden");
        }
      });
    }

    // ✅ Newsletter form validation and redirect
    document.querySelectorAll(".newsletter-form").forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const consentCheckbox = form.querySelector('input[name="consent"]');
        const email = emailInput.value.trim();
        const consentGiven = consentCheckbox.checked;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
          alert("Please enter a valid email address.");
          return;
        }

        if (!consentGiven) {
          alert("You must agree to the privacy policy before subscribing.");
          return;
        }

        const formData = new FormData(form);

        const modalSpinner = document.querySelector("#newsletter-spinner");
        if (modalSpinner) {
          modalSpinner.classList.remove("hidden");
        }

        const text = form.querySelector(".button-text");
        const buttonSpinner = form.querySelector(".spinner-small");

        if (text) text.style.opacity = "0";
        if (buttonSpinner) buttonSpinner.classList.remove("hidden");

        fetch(form.action, {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }).then(() => {
          setTimeout(() => {
            window.location.href = "thank-you.html";
          }, 500);
        });
      });
    });
  } // Close finalizeSetup
}); // Close DOMContentLoaded
// End of Newsletter Modal Script
