/* ===========================================================
   AdiBot case study (v2) — interaction & motion
   =========================================================== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- duplicate ticker for a seamless loop ---- */
  document.querySelectorAll('.ticker__track').forEach(function (t) {
    t.innerHTML = t.innerHTML + t.innerHTML;
  });

  /* ---- scroll progress bar + sticky nav ---- */
  var progress = document.getElementById('progress');
  var nav = document.getElementById('nav');
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var p = max > 0 ? (h.scrollTop || document.body.scrollTop) / max : 0;
    if (progress) progress.style.width = (p * 100) + '%';
    if (nav) nav.classList.toggle('stuck', (window.scrollY || h.scrollTop) > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- reveal on scroll ---- */
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    if (reduce) { el.classList.add('in'); } else { revealIO.observe(el); }
  });

  /* ---- animated stat bars ---- */
  var statIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.width = e.target.getAttribute('data-pct') + '%';
        statIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat__fill').forEach(function (f) { statIO.observe(f); });

  /* ---- count-up numbers ---- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || (el.hasAttribute('data-count') && el.classList.contains('stat__pct') ? '%' : '');
    var dur = 1400, start = null;
    function frame(ts) {
      if (!start) start = ts;
      var t = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      var val = (target * eased).toFixed(decimals);
      el.textContent = prefix + val + suffix;
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
    if (reduce) { el.textContent = prefix + target.toFixed(decimals) + suffix; return; }
    requestAnimationFrame(frame);
  }
  var countIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { animateCount(e.target); countIO.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(function (el) { countIO.observe(el); });

  if (reduce) return; /* skip pointer-driven motion for reduced-motion users */

  /* ---- hero parallax (mascot + screen drift on mouse) ---- */
  var stage = document.getElementById('heroStage');
  var mascot = document.querySelector('.hero__mascot');
  var screen = document.querySelector('.hero .hero__screen');
  if (stage) {
    var hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', function (ev) {
      var r = hero.getBoundingClientRect();
      var x = (ev.clientX - r.left) / r.width - 0.5;
      var y = (ev.clientY - r.top) / r.height - 0.5;
      if (mascot) mascot.style.transform = 'translate(' + (x * 30) + 'px,' + (y * 26) + 'px)';
      if (screen) screen.style.transform = 'perspective(1500px) rotateY(' + (-14 + x * 8) + 'deg) rotateX(' + (6 - y * 8) + 'deg)';
    });
    hero.addEventListener('mouseleave', function () {
      if (mascot) mascot.style.transform = '';
      if (screen) screen.style.transform = '';
    });
  }

  /* ---- 3D tilt on product screenshots ---- */
  document.querySelectorAll('.shot.tilt').forEach(function (card) {
    var wrap = card.parentElement;
    wrap.addEventListener('mousemove', function (ev) {
      var r = card.getBoundingClientRect();
      var x = (ev.clientX - r.left) / r.width - 0.5;
      var y = (ev.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'rotateY(' + (x * 9) + 'deg) rotateX(' + (-y * 9) + 'deg) translateY(-6px) scale(1.02)';
    });
    wrap.addEventListener('mouseleave', function () { card.style.transform = ''; });
  });

  /* ---- magnetic buttons ---- */
  document.querySelectorAll('.magnetic').forEach(function (btn) {
    btn.addEventListener('mousemove', function (ev) {
      var r = btn.getBoundingClientRect();
      var x = ev.clientX - r.left - r.width / 2;
      var y = ev.clientY - r.top - r.height / 2;
      btn.style.transform = 'translate(' + (x * 0.3) + 'px,' + (y * 0.4) + 'px)';
    });
    btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
  });
})();
