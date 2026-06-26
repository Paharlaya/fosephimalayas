/* ============================================================
   main.js — nav, header state, scroll reveal, ridgeline parallax
   Vanilla, dependency-free. Respects prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Mobile nav toggle ---- */
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    // Close on link click / Escape
    nav.querySelectorAll(".nav__link, .nav__actions a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ---- Sticky header shadow on scroll ---- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Scroll reveal via IntersectionObserver ---- */
  const reveals = document.querySelectorAll("[data-reveal]");
  if (reveals.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---- Ridgeline parallax (scroll + subtle pointer) ---- */
  const ridges = Array.prototype.slice.call(document.querySelectorAll(".ridge"));
  const hero = document.querySelector(".hero");
  if (ridges.length && hero && !reduceMotion) {
    const depths = [0.04, 0.10, 0.18, 0.28]; // back layers move more
    let pointerX = 0;
    let ticking = false;

    const apply = function () {
      const y = window.scrollY;
      ridges.forEach(function (r, i) {
        const d = depths[i] || 0.05;
        const ty = y * d;
        const tx = pointerX * (d * 60);
        r.style.transform = "translate3d(" + tx.toFixed(1) + "px," + ty.toFixed(1) + "px,0)";
      });
      ticking = false;
    };
    const request = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(apply); }
    };
    window.addEventListener("scroll", request, { passive: true });

    // pointer drift only on devices with a fine pointer
    if (window.matchMedia("(pointer:fine)").matches) {
      hero.addEventListener("pointermove", function (e) {
        const rect = hero.getBoundingClientRect();
        pointerX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
        request();
      });
    }
    apply();
  }

  /* ---- Footer year ---- */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
