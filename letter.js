(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function spawnAmbience() {
    var host = document.getElementById("ambience");
    if (!host) return;

    var heartCount = reduceMotion ? 5 : 10;
    var sparkCount = reduceMotion ? 0 : 6;

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

    for (var j = 0; j < sparkCount; j++) {
      var spark = document.createElement("span");
      spark.className = "floaty spark";
      spark.style.left = Math.random() * 96 + "%";
      spark.style.animationDuration = 8 + Math.random() * 7 + "s";
      spark.style.animationDelay = Math.random() * -14 + "s";
      host.appendChild(spark);
    }
  }

  function revealLetter() {
    var body = document.getElementById("letterBody");
    if (!body) return;

    var lines = body.querySelectorAll("[data-line]");
    lines.forEach(function (el, i) {
      el.setAttribute("data-reveal", "");
      el.style.setProperty("--delay", 500 + i * 260 + "ms");
    });

    window.setTimeout(function () {
      body.classList.add("revealed");
    }, 50);
  }

  document.addEventListener("DOMContentLoaded", function () {
    spawnAmbience();
    revealLetter();
  });
})();
