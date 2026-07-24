(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function spawnAmbience() {
    var host = document.getElementById("ambience");
    if (!host) return;

    var heartCount = reduceMotion ? 6 : 16;
    var sparkCount = reduceMotion ? 0 : 10;

    for (var i = 0; i < heartCount; i++) {
      var heart = document.createElement("span");
      heart.className = "floaty heart" + (i % 3 === 0 ? " burgundy" : "");
      heart.textContent = "\u2665";
      heart.style.left = Math.random() * 96 + "%";
      heart.style.fontSize = 0.9 + Math.random() * 1.1 + "rem";

      if (reduceMotion) {
        heart.style.bottom = Math.random() * 90 + "vh";
        heart.style.opacity = String(0.22 + Math.random() * 0.22);
      } else {
        heart.style.animationDuration = 9 + Math.random() * 9 + "s";
        heart.style.animationDelay = Math.random() * -20 + "s";
      }
      host.appendChild(heart);
    }

    for (var j = 0; j < sparkCount; j++) {
      var spark = document.createElement("span");
      spark.className = "floaty spark";
      spark.style.left = Math.random() * 96 + "%";
      spark.style.animationDuration = 7 + Math.random() * 8 + "s";
      spark.style.animationDelay = Math.random() * -16 + "s";
      host.appendChild(spark);
    }
  }

  function prepareReveal(root) {
    var els = root.querySelectorAll("[data-reveal]");
    els.forEach(function (el, i) {
      el.style.setProperty("--delay", i * 110 + "ms");
    });
  }

  function initSeal() {
    var overlay = document.getElementById("sealOverlay");
    var seal = document.getElementById("waxSeal");
    var hero = document.getElementById("hero");
    var footer = document.querySelector(".site-footer");
    if (!overlay || !seal || !hero) return;

    prepareReveal(hero);
    if (footer) footer.style.setProperty("--delay", "550ms");

    function openSurprise() {
      overlay.classList.add("opening");
      hero.classList.add("revealed");
      if (footer) footer.classList.add("revealed");

      window.setTimeout(function () {
        overlay.classList.add("is-hidden");
      }, 650);

      seal.removeEventListener("click", openSurprise);
    }

    seal.addEventListener("click", openSurprise);
  }

  document.addEventListener("DOMContentLoaded", function () {
    spawnAmbience();
    initSeal();
  });
})();
