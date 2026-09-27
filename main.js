(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var dialog = document.querySelector("#lightbox");
  var galleries = Array.prototype.slice.call(document.querySelectorAll(".gallery"));
  if (!dialog || !galleries.length) return;

  var dialogImg = dialog.querySelector("img");
  var dialogCap = dialog.querySelector("p");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var activeShots = [];
  var index = 0;
  var opener = null;

  function behavior() {
    return reduce ? "auto" : "smooth";
  }

  function show(i) {
    if (!activeShots.length) return;
    index = (i + activeShots.length) % activeShots.length;
    var button = activeShots[index];
    var image = button.querySelector("img");
    dialogImg.src = image.currentSrc || image.src;
    dialogImg.alt = image.alt;
    dialogCap.textContent = button.getAttribute("data-caption");
    if (!dialog.open) dialog.showModal();
  }

  galleries.forEach(function (gallery) {
    var scroller = gallery.querySelector("[data-scroller]");
    var prev = gallery.querySelector("[data-prev]");
    var next = gallery.querySelector("[data-next]");
    var counter = gallery.querySelector("[data-counter]");
    if (!scroller || !prev || !next || !counter) return;

    var slides = Array.prototype.slice.call(scroller.querySelectorAll(".shot"));
    var shots = Array.prototype.slice.call(scroller.querySelectorAll("[data-shot]"));

    function stepSize() {
      var shot = scroller.querySelector(".shot");
      if (!shot) return 280;
      var gap = parseFloat(window.getComputedStyle(scroller).columnGap || window.getComputedStyle(scroller).gap) || 16;
      return shot.getBoundingClientRect().width + gap;
    }

    function updateButtons() {
      var max = scroller.scrollWidth - scroller.clientWidth;
      prev.disabled = scroller.scrollLeft <= 4;
      next.disabled = scroller.scrollLeft >= max - 4;
    }

    function setCounter(i) {
      counter.textContent = i + 1 + " / " + slides.length;
    }

    prev.addEventListener("click", function () {
      scroller.scrollBy({ left: -stepSize(), behavior: behavior() });
    });

    next.addEventListener("click", function () {
      scroller.scrollBy({ left: stepSize(), behavior: behavior() });
    });

    scroller.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    updateButtons();
    setCounter(0);

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          var best = null;
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
          });
          if (!best) return;
          var i = slides.indexOf(best.target);
          if (i >= 0) setCounter(i);
        },
        { root: scroller, threshold: [0.55, 0.75] }
      );
      slides.forEach(function (slide) {
        observer.observe(slide);
      });
    }

    scroller.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next.click();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev.click();
      }
    });

    shots.forEach(function (button, i) {
      button.addEventListener("click", function () {
        activeShots = shots;
        opener = button;
        show(i);
      });
    });
  });

  dialog.querySelector("[data-close]").addEventListener("click", function () {
    dialog.close();
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", function () {
    if (opener) opener.focus();
  });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      show(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(index - 1);
    }
  });
})();
