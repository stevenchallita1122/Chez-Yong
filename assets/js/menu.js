/* Chez Yong — menu page
   Renders the whole card from CY_CATEGORIES / CY_DISHES / CY_FORMULES.
   Nothing is hard-coded in menu.html, so one data edit updates the page. */

(function () {
  'use strict';

  var ANIM = typeof window.gsap !== 'undefined' &&
             typeof window.ScrollTrigger !== 'undefined' &&
             !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var state = { q: '', tags: [] };

  function norm(s) {
    return (s || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/['’\-·,.]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }

  function haystack(d) {
    if (!d._hay) {
      d._hay = norm([d.fr, d.en, d.zh, d.py, d.sub ? d.sub.fr : '', d.sub ? d.sub.en : ''].join(' ')) + ' ' + (d.zh || '');
    }
    return d._hay;
  }

  function matches(d) {
    if (state.q) {
      var q = norm(state.q);
      var terms = q.split(' ');
      var hay = haystack(d);
      for (var i = 0; i < terms.length; i++) {
        if (hay.indexOf(terms[i]) < 0 && (d.zh || '').indexOf(state.q.trim()) < 0) return false;
      }
    }
    for (var j = 0; j < state.tags.length; j++) {
      var t = state.tags[j];
      if (t === 'spice') { if (d.spice < 2) return false; }
      else if (d.tags.indexOf(t) < 0) return false;
    }
    return true;
  }

  /* ---------------------------------------------------------- */

  function badges(d) {
    var h = CY.pips(d.spice) + ' ';
    if (d.tags.indexOf('signature') > -1) h += '<span class="bdg bdg--sig">' + CY.t('menu.b.sig') + '</span>';
    if (d.tags.indexOf('vege') > -1) h += '<span class="bdg bdg--vege">' + CY.t('menu.b.vege') + '</span>';
    if (d.tags.indexOf('maison') > -1) h += '<span class="bdg bdg--maison">' + CY.t('menu.b.maison') + '</span>';
    if (d.tags.indexOf('commande') > -1) h += '<span class="bdg bdg--cmd">' + CY.t('menu.b.cmd') + '</span>';
    return h;
  }

  function dishNode(d) {
    var li = document.createElement('li');
    li.className = 'dish';
    if (d.img) li.setAttribute('data-img', d.img);

    var price = CY.price(d.p);
    li.innerHTML =
      '<div class="dish__n">' +
        '<b></b>' +
        '<span class="zh cjk">' + d.zh + '</span>' +
        '<span class="dish__badges">' + badges(d) + '</span>' +
      '</div>' +
      '<div class="dish__p' + (price ? '' : ' ask') + '">' + (price || CY.t('menu.ask')) + '</div>' +
      (d.sub ? '<div class="dish__sub"></div>' : '');

    li.querySelector('b').textContent = CY.pick(d);
    if (d.sub) li.querySelector('.dish__sub').textContent = CY.pick(d.sub);
    return li;
  }

  function renderMenu() {
    var host = document.getElementById('cats');
    var rail = document.getElementById('rail');
    if (!host || !window.CY_DISHES) return;

    host.innerHTML = '';
    if (rail) rail.innerHTML = '';
    var shown = 0;

    CY_CATEGORIES.forEach(function (cat) {
      var hits = CY_DISHES.filter(function (d) { return d.c === cat.id && matches(d); });
      if (!hits.length) return;
      shown += hits.length;

      var sec = document.createElement('section');
      sec.className = 'cat';
      sec.id = 'cat-' + cat.id;
      sec.innerHTML =
        '<header class="cat__h"><h2></h2><span class="zh cjk">' + cat.zh + '</span></header>' +
        '<p class="cat__note"></p><ul class="dishes"></ul>';
      sec.querySelector('h2').textContent = CY.pick(cat);
      sec.querySelector('.cat__note').textContent = CY.pick(cat.note);

      var ul = sec.querySelector('.dishes');
      hits.forEach(function (d) { ul.appendChild(dishNode(d)); });
      host.appendChild(sec);

      if (rail) {
        var li = document.createElement('li');
        li.innerHTML = '<a href="#cat-' + cat.id + '"><span></span><span class="zh cjk">' + cat.zh + '</span></a>';
        li.querySelector('a span').textContent = CY.pick(cat);
        li.querySelector('a').addEventListener('click', function (e) {
          e.preventDefault();
          CY.scrollTo('#cat-' + cat.id);
        });
        rail.appendChild(li);
      }
    });

    if (!shown) {
      host.innerHTML = '<div class="nores"><b></b><span></span></div>';
      host.querySelector('b').textContent = CY.t('menu.none.t');
      host.querySelector('span').textContent = CY.t('menu.none.p');
    }

    var cnt = document.getElementById('mcount');
    if (cnt) cnt.textContent = shown + ' ' + CY.t(shown > 1 ? 'menu.count' : 'menu.count1');

    if (ANIM) {
      gsap.from(host.querySelectorAll('.cat'), {
        opacity: 0, y: 18, duration: 0.6, stagger: 0.05, ease: 'power2.out', overwrite: true
      });
      ScrollTrigger.refresh();
    }
  }

  /* ---------- formules ---------- */
  function renderFormules() {
    var host = document.getElementById('formules');
    if (!host || !window.CY_FORMULES) return;
    host.innerHTML = '';

    CY_FORMULES.forEach(function (f) {
      var price = CY.price(f.price);
      var art = document.createElement('article');
      art.className = 'fcard';
      art.innerHTML =
        '<h3></h3><span class="zh cjk">' + f.name.zh + '</span>' +
        '<div class="pr' + (price ? '' : ' ask') + '">' + (price || CY.t('form.ask')) + '</div>' +
        '<p class="nt"></p><div class="courses"></div>';
      art.querySelector('h3').textContent = CY.lang === 'zh' ? f.name.zh : CY.pick(f.name);
      art.querySelector('.nt').textContent = CY.pick(f.note);

      var c = art.querySelector('.courses');
      f.courses.forEach(function (co) {
        var d = document.createElement('div');
        d.innerHTML = '<h4></h4><p></p>';
        d.querySelector('h4').textContent = CY.pick(co.t);
        d.querySelector('p').textContent = CY.pick(co.items);
        c.appendChild(d);
      });
      host.appendChild(art);
    });
  }

  /* ---------- hover preview ---------- */
  function initPeek() {
    var peek = document.getElementById('peek');
    if (!peek || window.matchMedia('(hover: none)').matches) return;
    var img = peek.querySelector('img');
    var cur = '';

    document.addEventListener('mousemove', function (e) {
      var row = e.target.closest ? e.target.closest('.dish[data-img]') : null;
      if (!row) {
        peek.classList.remove('on');
        cur = '';
        return;
      }
      var src = row.getAttribute('data-img');
      if (src !== cur) {
        cur = src;
        img.src = 'assets/img/' + src + '.jpg';
      }
      var x = Math.min(e.clientX + 26, window.innerWidth - 240);
      var y = Math.min(Math.max(e.clientY - 80, 14), window.innerHeight - 190);
      peek.style.left = x + 'px';
      peek.style.top = y + 'px';
      peek.classList.add('on');
    });
  }

  /* ---------- scroll spy ---------- */
  function initSpy() {
    var rail = document.getElementById('rail');
    if (!rail) return;
    var queued = false;

    function run() {
      queued = false;
      var cats = document.querySelectorAll('.cat');
      var best = null, bestD = Infinity;
      for (var i = 0; i < cats.length; i++) {
        var d = Math.abs(cats[i].getBoundingClientRect().top - 150);
        if (d < bestD) { bestD = d; best = cats[i]; }
      }
      rail.querySelectorAll('a').forEach(function (a) {
        a.classList.toggle('on', !!best && a.getAttribute('href') === '#' + best.id);
      });
    }

    window.addEventListener('scroll', function () {
      if (!queued) { queued = true; requestAnimationFrame(run); }
    }, { passive: true });
    run();
  }

  /* ---------- tools ---------- */
  function initTools() {
    var search = document.getElementById('msearch');
    if (search) {
      var tmr;
      search.addEventListener('input', function () {
        clearTimeout(tmr);
        tmr = setTimeout(function () { state.q = search.value; renderMenu(); }, 140);
      });
    }

    document.querySelectorAll('.fchip').forEach(function (b) {
      b.addEventListener('click', function () {
        var tag = b.dataset.tag;
        if (!tag) {
          state.tags = [];
          document.querySelectorAll('.fchip').forEach(function (x) { x.classList.toggle('on', !x.dataset.tag); });
        } else {
          var i = state.tags.indexOf(tag);
          if (i > -1) state.tags.splice(i, 1); else state.tags.push(tag);
          b.classList.toggle('on', state.tags.indexOf(tag) > -1);
          var all = document.querySelector('.fchip:not([data-tag])');
          if (all) all.classList.toggle('on', state.tags.length === 0);
        }
        renderMenu();
      });
    });
  }

  CY.initMenu = function () {
    if (!document.getElementById('cats')) return;
    renderMenu();
    renderFormules();
    initTools();
    initPeek();
    initSpy();
    document.addEventListener('cy:lang', function () { renderMenu(); renderFormules(); });
  };
})();
