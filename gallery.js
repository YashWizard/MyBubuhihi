(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function spawnAmbience() {
    var host = document.getElementById("ambience");
    if (!host) return;

    var heartCount = reduceMotion ? 5 : 10;

    for (var i = 0; i < heartCount; i++) {
      var heart = document.createElement("span");
      heart.className = "floaty heart" + (i % 2 === 0 ? " burgundy" : "");
      heart.textContent = "\u2665";
      heart.style.left = Math.random() * 96 + "%";
      heart.style.fontSize = 0.8 + Math.random() * 0.9 + "rem";

      if (reduceMotion) {
        heart.style.bottom = Math.random() * 90 + "vh";
        heart.style.opacity = String(0.18 + Math.random() * 0.2);
      } else {
        heart.style.animationDuration = 10 + Math.random() * 8 + "s";
        heart.style.animationDelay = Math.random() * -18 + "s";
      }
      host.appendChild(heart);
    }
  }

  function revealPolaroids() {
    var cards = document.querySelectorAll(".polaroid");
    cards.forEach(function (el, i) {
      el.style.transitionDelay = i * 130 + "ms";
    });
    window.setTimeout(function () {
      cards.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }, 60);
  }

  function initLightbox() {
    var lightbox = document.getElementById("lightbox");
    var content = document.getElementById("lightboxContent");
    var closeBtn = document.getElementById("lightboxClose");
    var frames = document.querySelectorAll(".photo-frame");
    if (!lightbox || !content || !frames.length) return;

    function open(frame) {
      var polaroid = frame.closest(".polaroid");
      var captionEl = polaroid ? polaroid.querySelector("figcaption") : null;
      var img = frame.querySelector("img");

      content.innerHTML = "";

      var big = document.createElement("div");
      big.className = "lightbox-photo";

      if (img) {
        big.appendChild(img.cloneNode(true));
      } else {
        var icon = document.createElement("span");
        icon.className = "lightbox-icon";
        icon.textContent = "\uD83D\uDCF7";
        big.appendChild(icon);

        var txt = document.createElement("p");
        txt.className = "lightbox-placeholder-text";
        txt.textContent = "Add your favorite photo here";
        big.appendChild(txt);
      }
      content.appendChild(big);

      if (captionEl) {
        var cap = document.createElement("p");
        cap.className = "lightbox-caption";
        cap.textContent = captionEl.textContent;
        content.appendChild(cap);
      }

      lightbox.classList.add("open");
    }

    frames.forEach(function (frame) {
      frame.setAttribute("tabindex", "0");
      frame.setAttribute("role", "button");
      frame.setAttribute("aria-label", "View photo larger");

      frame.addEventListener("click", function () {
        open(frame);
      });
      frame.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(frame);
        }
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("open");
    }

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    spawnAmbience();
    revealPolaroids();
    initLightbox();
  });
})();
