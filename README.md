# Chez Yong — 鼎鼎香

Demonstration website for Chez Yong, Sichuan restaurant, 72 rue de la Colonie, Paris 13ᵉ.

**This is a pitch mock-up, not a finished site.** It is built to show the restaurant what their
site could look like. Everything marked below needs to be confirmed with the owners before it
could go live.

---

## Running it

No build step, no dependencies, no install. Open `index.html` in a browser.

For a local server (needed only if you want clean URLs or to test caching):

```sh
python3 -m http.server 4173
```

Then visit <http://localhost:4173>.

Everything is vendored — GSAP, ScrollTrigger, Lenis and the Latin webfonts all live under
`assets/`. The site works offline and from `file://`.

---

## What's in here

```
index.html          home
menu.html           the full card
reserver.html       3-step booking flow

assets/css/style.css    all styling, hand-written
assets/js/main.js       nav, scroll, animations, cursor, open/closed badge
assets/js/menu-data.js  ← the only file to edit when the card changes
assets/js/menu.js       renders menu.html from menu-data.js
assets/js/resv.js       booking flow
assets/js/i18n.js       FR / EN / 中文 dictionaries
assets/vendor/          GSAP 3.12.5, ScrollTrigger, Lenis 1.1.14
assets/fonts/           Cormorant Garamond + Jost (woff2)
assets/img/             30 images
```

The menu page is fully data-driven: nothing is hard-coded in `menu.html`. Change a dish in
`menu-data.js` and the category, the search index, the filters and the count all update.

---

## Needs real data before launch

### 1. Opening days

`assets/js/main.js` has the live open/closed badge:

```js
var SERVICE = [[12, 15], [19, 23]];
```

That is lunch 12–15 h and dinner 19–23 h, **every day**. The real weekly closing day (most
Paris restaurants have one) is not in there, so the badge will say "ouvert" on a day the
restaurant is shut. Ask for the actual weekly schedule, including any August closure.

### 2. Hours

The service times above were read off the Google listing. The site currently shows
*"Horaires à confirmer avec le restaurant"* under them (`infos.hours.sub` in `i18n.js`).
Confirm and remove that line.

### 3. Prices

79 dishes, prices transcribed from photographs of the paper menu. They need a pass against the
current card — paper menus go out of date and photos are easy to misread.

Two items deliberately show **"NOUS CONSULTER"** rather than a number:

- *Turbot à la vapeur* (Fruits de mer) — priced by weight
- *Menu Rapide* (formules) — no price was visible

### 4. Photography

**None of the images are of Chez Yong.** They are licensed stock, chosen to match the dishes
and the mood. This is the single biggest thing to fix, and the strongest argument for a real
shoot — a half-day with a food photographer would transform the site.

The two dining-room shots (`salle-interior.jpg`, `salle-table.jpg`) and the detail shot in the
"Nous trouver" section (`ambience-dark.jpg`) are of other Chinese restaurants. They set the
right tone but they are not this room.

23 of the 79 dishes have a photo attached (these are the ones that show a hover preview on the
menu page). The rest have none.

### 5. Booking

`reserver.html` is a working interface but it **sends nothing**. The final step just shows a
confirmation screen. Two slots are hard-coded as unavailable (`BUSY` in `resv.js`) so the grid
reads like a real book.

To make it live, pick one:

- plug into whatever the restaurant already uses (TheFork, Zenchef, Guestonline…)
- or POST to a small endpoint that emails/SMSes the restaurant

### 6. Reviews

The "avis" section on the home page shows the real tag chips from the Google listing
("portions généreuses", "abordable", "aubergines frites") with their real counts. No review
text is quoted and no rating is invented. If the restaurant wants star ratings, that should
come from the Google Places API rather than being typed in.

---

## Translations

FR / EN / 中文, three dictionaries in `i18n.js`, same keys in each. The toggle re-renders the
menu, the formules, the booking date strip and the open/closed badge.

The French is the source. The English is mine. **The Chinese should be read by the owners**
before this ships — dish names especially, since several are regional Sichuan terms where a
literal translation would be wrong.

Adding a language means copying one dictionary block and adding a button to the toggle.

---

## Notes on the build

- **No framework, no build step.** Three HTML files, one stylesheet, five scripts. It can be
  dropped on any host — OVH, Netlify, a folder on a shared server. Nothing to compile, nothing
  to keep up to date, no `node_modules`.
- **Hand-written CSS**, not Tailwind. A utility framework would have meant either a build step
  or a CDN script that flashes unstyled content on load — both bad for a site whose whole point
  is that it feels expensive the second it opens.
- **Animations respect `prefers-reduced-motion`**, handled in CSS as well as in JS, so a visitor
  who has motion reduced at the OS level gets the static version.
- **JavaScript is required.** The menu page and the translations are rendered from data at
  runtime, so with JS disabled `menu.html` is empty. That is the trade-off for one-file menu
  edits. If it matters, the menu can be pre-rendered to static HTML later.
- **Total weight is about 6.5 MB**, almost all of it images. Those should be re-exported as WebP
  once the real photos arrive — probably a 60–70% saving.
