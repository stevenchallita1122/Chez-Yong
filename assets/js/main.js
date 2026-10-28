/* Chez Yong — shared behaviour
   Runs on every page. Homepage-only blocks bail out quietly when their
   markup is absent, so the same file serves index / menu / reserver. */

(function () {
  'use strict';

  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var HAS_GSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var ANIM = HAS_GSAP && !RM;
  var TOUCH = window.matchMedia('(hover: none)').matches;

  if (ANIM) gsap.registerPlugin(ScrollTrigger);

  /* ============================================================
     SMOOTH SCROLL
     ============================================================ */
  var lenis = null;

  function initLenis() {
    if (RM || TOUCH || typeof window.Lenis === 'undefined') return;

    lenis = new Lenis({
      duration: 1.1,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      touchMultiplier: 1.6
    });

    if (ANIM) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
  }

  function scrollTo(target) {
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -76 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 76, behavior: RM ? 'auto' : 'smooth' });
  }
  CY.scrollTo = scrollTo;

  /* ============================================================
     PRELOADER
     ============================================================ */
  function boot() {
    var pct = document.querySelector('#preload .pct');
    var n = 0;
    var tick = setInterval(function () {
      n = Math.min(99, n + Math.random() * 13);
      if (pct) pct.textContent = String(Math.floor(n)).padStart(3, '0');
    }, 90);

    function finish() {
      clearInterval(tick);
      if (pct) pct.textContent = '100';
      setTimeout(function () {
        document.body.classList.add('loaded');
        setTimeout(function () {
          document.body.classList.add('is-ready');
          heroIn();
          if (ANIM) ScrollTrigger.refresh();
        }, 120);
      }, RM ? 0 : 320);
    }

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish);
    setTimeout(finish, 3500); // never trap the user behind a slow image
  }

  /* ============================================================
     CURSOR
     ============================================================ */
  function initCursor() {
    var c = document.getElementById('cursor');
    if (!c || TOUCH) return;

    var x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y;

    window.addEventListener('mousemove', function (e) { x = e.clientX; y = e.clientY; });

    (function loop() {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      c.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
      requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseover', function (e) {
      var hit = e.target.closest('[data-cursor]');
      if (hit) {
        c.querySelector('span').textContent = hit.getAttribute('data-cursor');
        c.classList.add('grow');
        return;
      }
      if (e.target.closest('a,button,input,select,textarea,label')) c.classList.add('dot');
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('[data-cursor]')) c.classList.remove('grow');
      if (e.target.closest('a,button,input,select,textarea,label')) c.classList.remove('dot');
    });
  }

  /* ============================================================
     HEADER · DRAWER · PAGE TRANSITION
     ============================================================ */
  function initChrome() {
    var hdr = document.querySelector('.hdr');
    var last = 0;

    function onScroll() {
      var y = window.pageYOffset;
      if (hdr) hdr.classList.toggle('stuck', y > 40);
      last = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var burger = document.querySelector('.burger');
    if (burger) {
      burger.addEventListener('click', function () {
        document.body.classList.toggle('menu-open');
        if (lenis) document.body.classList.contains('menu-open') ? lenis.stop() : lenis.start();
      });
    }
    document.querySelectorAll('.drawer a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('menu-open');
        if (lenis) lenis.start();
      });
    });

    /* in-page anchors */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        scrollTo(t);
      });
    });

    /* curtain between pages */
    var curtain = document.getElementById('curtain');
    if (curtain && ANIM) {
      document.querySelectorAll('a[href$=".html"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
          var href = a.getAttribute('href');
          if (!href || href.indexOf('http') === 0) return;
          e.preventDefault();
          gsap.to(curtain, {
            y: '0%', duration: 0.6, ease: 'power3.inOut',
            onComplete: function () { window.location.href = href; }
          });
        });
      });
    }
  }

  /* ============================================================
     MAGNETIC BUTTONS
     ============================================================ */
  function initMagnet() {
    if (TOUCH || RM) return;
    document.querySelectorAll('[data-magnet]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var mx = (e.clientX - r.left - r.width / 2) / r.width;
        var my = (e.clientY - r.top - r.height / 2) / r.height;
        el.style.transform = 'translate(' + (mx * 14).toFixed(2) + 'px,' + (my * 10).toFixed(2) + 'px)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
        el.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
        setTimeout(function () { el.style.transition = ''; }, 620);
      });
    });
  }

  /* ============================================================
     OPEN / CLOSED BADGE
     ============================================================ */
  var SERVICE = [[12, 15], [19, 23]];

  function openState() {
    var d = new Date();
    var h = d.getHours() + d.getMinutes() / 60;
    for (var i = 0; i < SERVICE.length; i++) {
      if (h >= SERVICE[i][0] && h < SERVICE[i][1]) {
        return { open: true, soon: SERVICE[i][1] - h <= 0.5, edge: SERVICE[i][1] };
      }
    }
    var next = null;
    for (var j = 0; j < SERVICE.length; j++) {
      if (h < SERVICE[j][0]) { next = SERVICE[j][0]; break; }
    }
    return { open: false, edge: next === null ? SERVICE[0][0] : next };
  }

  function fmtHour(h) {
    return CY.lang === 'en' ? (h > 12 ? (h - 12) + ' pm' : h + ' pm') : h + ' h';
  }

  function paintBadges() {
    var s = openState();
    document.querySelectorAll('.openbadge').forEach(function (b) {
      b.classList.toggle('is-open', s.open);
      b.classList.toggle('is-closed', !s.open);
      var txt = b.querySelector('.txt');
      if (!txt) return;
      if (s.open) {
        txt.textContent = (s.soon ? CY.t('badge.soon') : CY.t('badge.open')) + ' · ' + CY.t('badge.until') + ' ' + fmtHour(s.edge);
      } else {
        txt.textContent = CY.t('badge.closed') + ' · ' + CY.t('badge.at') + ' ' + fmtHour(s.edge);
      }
    });
  }

  /* ============================================================
     DATA-DRIVEN BLOCKS
     ============================================================ */
  /* the duck gets its own section, so it is deliberately absent here */
  var SIG_ORDER = ['鼎香水煮鱼', '鼎香酸菜鱼', '鼎香脆嫩鸡', '口水鸡', '鼎香香辣牛肉面', '拔丝地瓜'];

  function sigDishes() {
    if (!window.CY_DISHES) return [];
    return SIG_ORDER.map(function (zh) {
      return CY_DISHES.filter(function (d) { return d.zh === zh; })[0];
    }).filter(Boolean);
  }

  function pips(n) {
    var h = '<span class="pips" aria-label="' + n + '/3">';
    for (var i = 0; i < 3; i++) h += '<i class="' + (i < n ? 'on' : '') + '"></i>';
    return h + '</span>';
  }
  CY.pips = pips;

  function renderSigs() {
    var track = document.querySelector('.sigs__track');
    if (!track) return;
    var holder = track.querySelector('.sigs__cards') || track;
    var list = sigDishes();

    holder.querySelectorAll('.card').forEach(function (n) { n.remove(); });

    list.forEach(function (d, i) {
      var a = document.createElement('a');
      a.className = 'card';
      a.href = 'menu.html';
      a.setAttribute('data-cursor', 'VOIR');
      a.innerHTML =
        '<div class="card__ph">' +
          '<img src="assets/img/' + d.img + '.jpg" alt="" loading="lazy">' +
          '<span class="card__no">' + String(i + 1).padStart(2, '0') + ' / ' + String(list.length).padStart(2, '0') + '</span>' +
          '<span class="card__zh cjk">' + d.zh + '</span>' +
          '<div class="card__cap">' +
            '<h3></h3>' +
            '<div class="px">' + pips(d.spice) + '<b></b></div>' +
          '</div>' +
        '</div>';
      a.querySelector('h3').textContent = CY.pick(d);
      a.querySelector('.px b').textContent = CY.price(d.p) || CY.t('menu.ask');
      holder.appendChild(a);
    });
  }

  function renderReviewChips() {
    var box = document.querySelector('[data-review-chips]');
    if (!box || !window.CY_REVIEW_TAGS) return;
    box.innerHTML = '';
    CY_REVIEW_TAGS.forEach(function (t) {
      var s = document.createElement('span');
      s.className = 'chip';
      s.innerHTML = '<em style="font-style:normal"></em><b>' + t.n + '</b>';
      s.querySelector('em').textContent = CY.pick(t);
      box.appendChild(s);
    });
  }

  function renderMentions() {
    var box = document.querySelector('[data-mentions]');
    if (!box || !window.CY_REVIEW_TAGS) return;
    box.innerHTML = '';
    CY_REVIEW_TAGS.slice(0, 3).forEach(function (t) {
      var d = document.createElement('div');
      d.className = 'quote';
      d.innerHTML = '<p></p><footer><b>' + t.n + '</b> ' + CY.t('avis.mentions') + '</footer>';
      d.querySelector('p').textContent = '« ' + CY.pick(t) + ' »';
      box.appendChild(d);
    });
  }

  /* ---------- spice meter ---------- */
  function initSpice() {
    var sl = document.getElementById('spicerange');
    if (!sl || !window.CY_DISHES) return;

    var out = document.querySelector('.spice__out ul');
    var cnt = document.querySelector('.spice__count');
    var lab = document.querySelector('.sl__row .v .lv');

    function paint() {
      var lvl = parseInt(sl.value, 10);
      var hits = CY_DISHES.filter(function (d) { return d.spice === lvl; });

      if (lab) lab.textContent = CY.t('spice.s' + lvl);
      if (cnt) cnt.textContent = hits.length + ' ' + CY.t('spice.count') + ' · ' + CY_DISHES.length + ' ' + CY.t('spice.of');

      if (!out) return;
      out.innerHTML = '';
      hits.slice(0, 6).forEach(function (d) {
        var li = document.createElement('li');
        li.innerHTML = '<span class="n"><b></b><i class="cjk">' + d.zh + '</i></span><span class="p"></span>';
        li.querySelector('b').textContent = CY.pick(d);
        li.querySelector('.p').textContent = CY.price(d.p) || CY.t('menu.ask');
        out.appendChild(li);
      });
      if (ANIM) gsap.from(out.children, { opacity: 0, y: 14, duration: 0.5, stagger: 0.045, ease: 'power2.out' });
    }

    sl.addEventListener('input', paint);
    document.addEventListener('cy:lang', paint);
    paint();
  }

  /* ============================================================
     CANVAS STEAM
     ============================================================ */
  function initSteam() {
    var cv = document.getElementById('steam');
    if (!cv || RM) return;

    var ctx = cv.getContext('2d');
    var w, h, puffs = [], dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    function size() {
      w = cv.offsetWidth; h = cv.offsetHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    window.addEventListener('resize', size);

    function spawn() {
      return {
        x: w * (0.25 + Math.random() * 0.5),
        y: h * (0.75 + Math.random() * 0.25),
        r: 50 + Math.random() * 130,
        a: 0,
        max: 0.045 + Math.random() * 0.07,
        vy: 0.22 + Math.random() * 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        life: 0,
        span: 280 + Math.random() * 320
      };
    }
    for (var i = 0; i < 16; i++) { var p = spawn(); p.life = Math.random() * p.span; puffs.push(p); }

    var run = true;
    document.addEventListener('visibilitychange', function () { run = !document.hidden; });

    (function frame() {
      requestAnimationFrame(frame);
      if (!run) return;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < puffs.length; i++) {
        var p = puffs[i];
        p.life++;
        p.y -= p.vy;
        p.x += p.vx + Math.sin(p.life / 60) * 0.25;
        p.r += 0.22;
        var t = p.life / p.span;
        p.a = t < 0.3 ? (t / 0.3) * p.max : (1 - (t - 0.3) / 0.7) * p.max;
        if (p.life > p.span) { puffs[i] = spawn(); continue; }
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, 'rgba(255,248,236,' + Math.max(0, p.a) + ')');
        g.addColorStop(1, 'rgba(255,248,236,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    })();
  }

  /* ============================================================
     HERO ENTRANCE
     ============================================================ */
  function heroIn() {
    var hero = document.querySelector('.hero');
    if (!hero || !ANIM) return;

    var lines = hero.querySelectorAll('.ln > i');
    gsap.timeline()
      .to(lines, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.09 }, 0)
      .fromTo(hero.querySelector('.hero__bg img'),
        { scale: 1.24 }, { scale: 1.1, duration: 2.6, ease: 'power2.out' }, 0);
  }

  /* ============================================================
     SCROLL ANIMATIONS
     ============================================================ */
  function initScrollFx() {
    if (!ANIM) {
      document.querySelectorAll('.rv').forEach(function (e) { e.classList.add('in'); });
      return;
    }

    /* line masks outside the hero */
    document.querySelectorAll('[data-lines]').forEach(function (sec) {
      var lines = sec.querySelectorAll('.ln > i');
      if (!lines.length) return;
      gsap.to(lines, {
        yPercent: 0, duration: 1.15, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: sec, start: 'top 82%' }
      });
    });

    /* generic reveals */
    ScrollTrigger.batch('.rv', {
      start: 'top 88%',
      onEnter: function (els) {
        gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.09, overwrite: 'auto' });
      }
    });

    /* hero parallax + fade */
    var hb = document.querySelector('.hero__bg');
    if (hb) {
      gsap.to(hb, {
        yPercent: 14, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to('.hero__in', {
        yPercent: -18, opacity: 0.1, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }

    /* clip-path wipes */
    document.querySelectorAll('[data-wipe]').forEach(function (el) {
      var img = el.querySelector('img');
      gsap.set(el, { clipPath: 'inset(0 0 100% 0)' });
      if (img) gsap.set(img, { scale: 1.2 });
      ScrollTrigger.create({
        trigger: el, start: 'top 84%', once: true,
        onEnter: function () {
          gsap.to(el, { clipPath: 'inset(0 0 0% 0)', duration: 1.5, ease: 'power3.inOut' });
          if (img) gsap.to(img, { scale: 1, duration: 1.8, ease: 'power3.out' });
        }
      });
    });

    /* soft parallax on collage tiles */
    document.querySelectorAll('[data-par]').forEach(function (el) {
      gsap.to(el, {
        yPercent: parseFloat(el.getAttribute('data-par')), ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    /* avis counter */
    var score = document.querySelector('[data-count]');
    if (score) {
      var target = parseFloat(score.getAttribute('data-count'));
      var o = { v: 0 };
      ScrollTrigger.create({
        trigger: score, start: 'top 85%', once: true,
        onEnter: function () {
          gsap.to(o, {
            v: target, duration: 1.8, ease: 'power3.out',
            onUpdate: function () {
              score.innerHTML = o.v.toFixed(1).replace('.', ',').replace(',', '<em>,</em>');
            }
          });
        }
      });
    }
  }

  /* ---------- marquee ---------- */
  function initMarquee() {
    var t = document.querySelector('.marq__t');
    if (!t) return;
    var inner = t.innerHTML;
    t.innerHTML = inner + inner + inner;
    if (!ANIM) return;
    gsap.to(t, { xPercent: -33.333, duration: 34, ease: 'none', repeat: -1 });
  }

  /* ---------- pinned horizontal signatures ---------- */
  function initSigScroll() {
    var pin = document.querySelector('.sigs__pin');
    var track = document.querySelector('.sigs__track');
    if (!pin || !track || !ANIM || window.innerWidth <= 980) return;

    var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth + 40); };
    if (dist() <= 0) return;

    gsap.to(track, {
      x: function () { return -dist(); },
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: function () { return '+=' + dist() * 1.15; },
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    var ghost = document.querySelector('.sigs__ghost');
    if (ghost) {
      gsap.to(ghost, {
        x: function () { return dist() * 0.25; },
        ease: 'none',
        scrollTrigger: {
          trigger: pin, start: 'top top',
          end: function () { return '+=' + dist() * 1.15; },
          scrub: 1, invalidateOnRefresh: true
        }
      });
    }
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    CY.initLang();
    initLenis();
    initCursor();
    initChrome();
    initMagnet();

    renderSigs();
    renderReviewChips();
    renderMentions();
    paintBadges();
    initSpice();
    initSteam();

    if (ANIM) gsap.set('.ln > i', { yPercent: 105 });

    initMarquee();
    initScrollFx();
    initSigScroll();

    if (typeof CY.initMenu === 'function') CY.initMenu();
    if (typeof CY.initResv === 'function') CY.initResv();

    document.addEventListener('cy:lang', function () {
      renderSigs();
      renderReviewChips();
      renderMentions();
      paintBadges();
      if (ANIM) ScrollTrigger.refresh();
    });

    setInterval(paintBadges, 60000);
    boot();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.addEventListener('resize', function () {
    if (ANIM) ScrollTrigger.refresh();
  });
})();
