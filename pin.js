(function () {
  "use strict";

  var CORRECT_PIN = "2426";

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

  function initPin() {
    var boxes = Array.prototype.slice.call(document.querySelectorAll(".pin-box"));
    var boxesWrap = document.getElementById("pinBoxes");
    var form = document.getElementById("pinForm");
    var error = document.getElementById("pinError");
    var card = document.getElementById("pinCard");
    if (!boxes.length || !form) return;

    boxes.forEach(function (box, i) {
      box.addEventListener("input", function () {
        box.value = box.value.replace(/[^0-9]/g, "").slice(0, 1);
        if (box.value && boxes[i + 1]) {
          boxes[i + 1].focus();
        }
      });

      box.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && !box.value && boxes[i - 1]) {
          boxes[i - 1].focus();
        }
      });
    });

    function currentValue() {
      return boxes
        .map(function (b) {
          return b.value;
        })
        .join("");
    }

    function clearBoxes() {
      boxes.forEach(function (b) {
        b.value = "";
      });
      boxes[0].focus();
    }

    function showError() {
      error.classList.add("visible");
      if (boxesWrap) {
        boxesWrap.classList.remove("shake");
        void boxesWrap.offsetWidth; // restart the shake animation
        boxesWrap.classList.add("shake");
      }
      clearBoxes();
    }

    function unlock() {
      error.classList.remove("visible");
      card.classList.add("unlocking");
      window.setTimeout(function () {
        window.location.href = "bouquet.html";
      }, 600);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (currentValue() === CORRECT_PIN) {
        unlock();
      } else {
        showError();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    spawnAmbience();
    initPin();
    var first = document.querySelector(".pin-box");
    if (first) first.focus();
  });
})();
