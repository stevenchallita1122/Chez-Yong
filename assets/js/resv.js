/* Chez Yong — booking flow (3 steps + confirmation)
   Demo only: nothing is sent. In production the final step POSTs to the
   booking provider and the restaurant's SMS confirmation fires from there. */

(function () {
  'use strict';

  var ANIM = typeof window.gsap !== 'undefined' &&
             !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var LUNCH = ['12:00', '12:30', '13:00', '13:30', '14:00'];
  var DINNER = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
  var BUSY = ['20:00', '13:00']; /* shown as taken, so the grid reads like a real book */

  var pick = { covers: 2, date: null, slot: null, first: '', last: '' };
  var step = 1;

  function dayLabel(d) {
    var loc = CY.lang === 'zh' ? 'zh-CN' : (CY.lang === 'en' ? 'en-GB' : 'fr-FR');
    return {
      dow: d.toLocaleDateString(loc, { weekday: 'short' }),
      day: d.getDate(),
      long: d.toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long' })
    };
  }

  /* ---------------------------------------------------------- */

  function buildCovers() {
    var host = document.getElementById('covers');
    if (!host) return;
    host.innerHTML = '';
    for (var i = 1; i <= 12; i++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = i;
      b.dataset.v = i;
      if (i === pick.covers) b.classList.add('on');
      host.appendChild(b);
    }
    if (host.dataset.bound) return;
    host.dataset.bound = '1';
    host.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      pick.covers = parseInt(b.dataset.v, 10);
      host.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      paintSum();
    });
  }

  function buildDates() {
    var host = document.getElementById('dates');
    if (!host) return;
    host.innerHTML = '';
    var now = new Date();
    for (var i = 0; i < 10; i++) {
      var d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      var l = dayLabel(d);
      var b = document.createElement('button');
      b.type = 'button';
      b.dataset.iso = d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
      b.innerHTML = '<small style="display:block;font-family:var(--sans);font-size:.56rem;letter-spacing:.16em;text-transform:uppercase;opacity:.6">' +
        l.dow + '</small>' + l.day;
      b.classList.toggle('on', b.dataset.iso === pick.date);
      host.appendChild(b);
    }
    if (host.dataset.bound) return;
    host.dataset.bound = '1';
    host.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      pick.date = b.dataset.iso;
      host.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      paintSum();
    });
  }

  function buildSlots() {
    var host = document.getElementById('slots');
    if (!host) return;
    host.innerHTML = '';
    LUNCH.concat(DINNER).forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = t;
      b.dataset.v = t;
      if (BUSY.indexOf(t) > -1) b.classList.add('full');
      host.appendChild(b);
    });
    if (host.dataset.bound) return;
    host.dataset.bound = '1';
    host.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b || b.classList.contains('full')) return;
      pick.slot = b.dataset.v;
      host.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      paintSum();
    });
  }

  /* ---------------------------------------------------------- */

  function paintSum() {
    var e = CY.t('resv.sum.empty');
    set('sum-covers', pick.covers ? pick.covers : e);
    set('sum-date', pick.date ? dayLabel(new Date(pick.date + 'T12:00:00')).long : e);
    set('sum-slot', pick.slot || e);
    set('sum-name', (pick.first + ' ' + pick.last).trim() || e);
  }

  function set(id, v) {
    var n = document.getElementById(id);
    if (n) n.textContent = v;
  }

  function go(n) {
    step = n;
    document.querySelectorAll('.step').forEach(function (s) {
      s.classList.toggle('on', parseInt(s.dataset.step, 10) === n);
    });
    document.querySelectorAll('.prog__s').forEach(function (p, i) {
      p.classList.toggle('on', i + 1 === n);
      p.classList.toggle('done', i + 1 < n);
    });
    var top = document.querySelector('.resv');
    if (top && n > 1) CY.scrollTo(top);
  }

  function nudge(el) {
    if (!el) return;
    if (ANIM) gsap.fromTo(el, { x: -7 }, { x: 0, duration: 0.5, ease: 'elastic.out(1,0.35)' });
    el.style.outline = '1px solid var(--red)';
    setTimeout(function () { el.style.outline = ''; }, 1200);
  }

  function confirm() {
    var done = document.getElementById('done');
    if (!done) return;
    document.querySelectorAll('.step').forEach(function (s) { s.classList.remove('on'); });
    document.querySelectorAll('.prog__s').forEach(function (p) { p.classList.add('done'); p.classList.remove('on'); });
    done.classList.add('on');
    done.style.display = 'block';

    set('done-covers', pick.covers);
    set('done-date', dayLabel(new Date(pick.date + 'T12:00:00')).long);
    set('done-slot', pick.slot);
    set('done-name', (pick.first + ' ' + pick.last).trim());

    if (ANIM) {
      gsap.from(done.querySelectorAll('h2, p, .recap'), {
        opacity: 0, y: 22, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.35
      });
    }
    CY.scrollTo(document.querySelector('.resv'));
  }

  /* ---------------------------------------------------------- */

  CY.initResv = function () {
    if (!document.getElementById('covers')) return;

    buildCovers();
    buildDates();
    buildSlots();

    var first = document.getElementById('f-first');
    var last = document.getElementById('f-last');
    var phone = document.getElementById('f-phone');

    if (first) first.addEventListener('input', function () { pick.first = first.value; paintSum(); });
    if (last) last.addEventListener('input', function () { pick.last = last.value; paintSum(); });

    document.querySelectorAll('[data-next]').forEach(function (b) {
      b.addEventListener('click', function () {
        var to = parseInt(b.dataset.next, 10);
        if (to === 3 && (!pick.date || !pick.slot)) {
          nudge(!pick.date ? document.getElementById('dates') : document.getElementById('slots'));
          return;
        }
        go(to);
      });
    });

    document.querySelectorAll('[data-back]').forEach(function (b) {
      b.addEventListener('click', function () { go(parseInt(b.dataset.back, 10)); });
    });

    var send = document.getElementById('f-send');
    if (send) {
      send.addEventListener('click', function (e) {
        e.preventDefault();
        if (!first.value.trim()) return nudge(first);
        if (!phone.value.trim()) return nudge(phone);
        confirm();
      });
    }

    var again = document.getElementById('again');
    if (again) {
      again.addEventListener('click', function () {
        var done = document.getElementById('done');
        done.classList.remove('on');
        done.style.display = 'none';
        pick = { covers: 2, date: null, slot: null, first: '', last: '' };
        buildCovers(); buildDates(); buildSlots();
        ['f-first', 'f-last', 'f-phone', 'f-mail', 'f-note'].forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.value = '';
        });
        paintSum();
        go(1);
      });
    }

    document.addEventListener('cy:lang', function () { buildDates(); paintSum(); });

    paintSum();
    go(1);
  };
})();
