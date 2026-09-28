// @ts-nocheck
/* ═══════════════════════════════════════════════
   HERO — motif UI/UX qui se « défait » au scroll
   Motif redessiné en vecteurs depuis "Motif 1 - Interactive design.png"
   (coordonnées = px de cette image, tuile 1466 × 1594 posée en quinconce,
   trait = 32). L'ordre des éléments = ordre d'empilement.
   Chaque picto se dé-trace vers son point de départ, du nom vers les bords,
   puis le point restant se résorbe. Tracé inverse à l'ouverture.
   ═══════════════════════════════════════════════ */

const D = '#022858', L = '#114580', A = '#FDC787';
const TILE_W = 1466, TILE_H = 1594, ROW_SHIFT = 733, SW = 32;
const NAME_ANCHOR = [397, 473];     // point de la tuile placé au centre du hero (sous le nom)
const DUR = 0.3;                    // part de la progression globale consacrée à chaque picto
const INTRO_MS = 2200;
const NS = 'http://www.w3.org/2000/svg';

const line = (x1, y1, x2, y2, c) => ({ d: `M${x1},${y1} L${x2},${y2}`, c });
const path = (d, c, o = {}) => ({ d, c, ...o });
const dot = (cx, cy, r, c) => ({ dot: [cx, cy, r], c });
const rrect = (x, y, w, h, r, c) => ({
  d: `M${x + r},${y} H${x + w - r} A${r},${r} 0 0 1 ${x + w},${y + r} V${y + h - r} A${r},${r} 0 0 1 ${x + w - r},${y + h} H${x + r} A${r},${r} 0 0 1 ${x},${y + h - r} V${y + r} A${r},${r} 0 0 1 ${x + r},${y} Z`, c });
const pt = (cx, cy, r, deg) => { const a = deg * Math.PI / 180; return [+(cx + r * Math.cos(a)).toFixed(2), +(cy + r * Math.sin(a)).toFixed(2)]; };
// arc de a0 à a1 (degrés ; a1 > a0 = sens horaire à l'écran)
const arcD = (cx, cy, r, a0, a1) => {
  const [x0, y0] = pt(cx, cy, r, a0), [x1, y1] = pt(cx, cy, r, a1);
  const sweep = a1 > a0 ? 1 : 0, large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${x0},${y0} A${r},${r} 0 ${large} ${sweep} ${x1},${y1}`;
};
const arc = (cx, cy, r, a0, a1, c) => ({ d: arcD(cx, cy, r, a0, a1), c });
const ring = (cx, cy, r, c, a0 = -90) => ({ d: arcD(cx, cy, r, a0, a0 + 180) + ' ' + arcD(cx, cy, r, a0 + 180, a0 + 359.9).replace(/^M[^A]+/, ''), c });
const star = (cx, cy, c) => {
  let d = '';
  for (let i = 0; i < 10; i++) {
    const [x, y] = pt(cx, cy, i % 2 ? 19 : 41, -90 + i * 36);
    d += (i ? 'L' : 'M') + x + ',' + y + ' ';
  }
  return { d: d + 'Z', c, fill: true, w: 12 };
};
// arc terminé par une pointe de flèche (icône refresh)
const arcArrow = (cx, cy, r, a0, a1, c) => {
  const [x, y] = pt(cx, cy, r, a1);
  const back = (a1 + (a1 > a0 ? 90 : -90)) * Math.PI / 180 + Math.PI;
  const s = 30;
  const p1 = [x + s * Math.cos(back + 0.8), y + s * Math.sin(back + 0.8)];
  const p2 = [x + s * Math.cos(back - 0.8), y + s * Math.sin(back - 0.8)];
  return { d: `${arcD(cx, cy, r, a0, a1)} M${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${x},${y} L${p2[0].toFixed(1)},${p2[1].toFixed(1)}`, c };
};

const ICONS = [
  // ── haut gauche : toggles, cases, curseur ──
  [rrect(34, 36, 207, 103, 51.5, L), dot(188, 88, 34, A)],                                  // toggle on
  [rrect(34, 194, 207, 103, 51.5, D), dot(84, 245, 34, L)],                                 // toggle off
  [rrect(299, 36, 113, 113, 14, D)],                                                        // case vide
  [rrect(481, 36, 113, 113, 14, D), dot(537, 93, 25, A)],                                   // case + point crème
  [rrect(664, 36, 113, 113, 14, D), dot(719, 93, 25, L)],                                   // case + point
  [path('M342,216 L309,249 L342,282', D), path('M405,216 L437,249 L405,282', D)],           // < >
  [line(508, 223, 775, 223, D), dot(719, 223, 27, A)],                                      // slider
  [path('M578,128 L645,163 L614,172 L597,207 Z', L, { fill: true, w: 28 })],                // curseur (au-dessus du slider)
  [path('M523,407 L610,347 L665,370 L763,297', L), path('M507,295 V435 H775', D)],          // graphique : courbe sous les axes

  // ── haut droite : étoiles, abc, flèches ──
  [star(880, 90, L)], [star(990, 90, L)], [star(1100, 90, L)], [star(1212, 90, A)], [star(1322, 90, D)],
  [rrect(851, 194, 393, 233, 14, D),                                                        // abc
    { d: arcD(945, 333, 31, 0, 359.9), c: L, w: 34 }, { ...line(978, 305, 978, 362, L), w: 34 },
    { ...line(1026, 256, 1026, 362, L), w: 34 }, { d: arcD(1057, 333, 31, 180, 539.9), c: L, w: 34 },
    { ...arc(1162, 333, 31, -38, -322, L), w: 34 }],
  [line(1415, 52, 1415, 383, D), dot(1415, 303, 37, A)],                                   // barre verticale + point
  [path('M1320,196 V440 Q1320,485 1365,485 H1415', D), path('M1380,440 L1425,485 L1380,530', D)], // ↳

  // ── sous le nom (retirés dans la tuile centrale) ──
  [rrect(56, 396, 388, 103, 51.5, D), rrect(34, 371, 388, 103, 51.5, L),                   // curseur de réglage
    line(95, 420, 150, 420, L), line(205, 420, 220, 420, L), dot(363, 370, 45, D), line(363, 356, 363, 384, L)],
  [line(37, 572, 440, 572, L), line(37, 572, 238, 572, A)],                                 // progression
  [line(518, 503, 609, 594, D), line(609, 503, 518, 594, D)],                               // ×
  [path('M673,552 L700,580 L763,516', A)],                                                  // ✓

  // ── milieu ──
  [line(838, 528, 945, 528, D), line(838, 586, 968, 586, D), line(838, 645, 912, 645, D)],
  [line(1078, 498, 1128, 498, L), line(1018, 527, 1188, 527, L), path('M1045,540 V685 H1162 V540', L), line(1103, 586, 1103, 632, A)], // poubelle
  [path('M1293,523 H1254 V563', D)],                                                        // coin
  [arc(1335, 715, 104, 180, 272, D), arc(1335, 715, 104, -88, 180, L), dot(1229, 715, 17, A), // %
    line(1301, 747, 1366, 683, D), dot(1305, 688, 19, D), dot(1362, 743, 19, D)],
  [line(42, 657, 42, 792, D)],                                                               // 1
  [path('M117,664 A42,42 0 1 1 152,733 A42,42 0 0 0 110,775 V792 H190', L)],                 // 2
  [path('M252,650 H322 L282,712 A40,40 0 1 1 246,778', D)],                                  // 3
  [dot(42, 851, 20, D)], [dot(150, 851, 20, A)], [dot(285, 851, 20, D)],
  [dot(397, 670, 20, D), dot(460, 670, 20, D), dot(522, 670, 20, D)],
  [line(397, 737, 522, 737, D), line(397, 795, 522, 795, L), line(397, 852, 522, 852, D)],   // ≡
  [ring(690, 760, 96, D), dot(690, 722, 20, L), line(690, 772, 690, 804, L)],               // (i)
  [line(905, 715, 905, 835, D), line(848, 773, 965, 773, D)],                               // +
  [line(1045, 773, 1162, 773, D)],                                                          // −

  // ── bas ──
  [line(1063, 898, 1063, 1040, D), line(1125, 863, 1125, 1040, A), line(1188, 858, 1188, 1040, D),
    line(1250, 921, 1250, 1040, D), line(1312, 951, 1312, 1040, D), line(1375, 898, 1375, 1040, D),
    line(1437, 921, 1437, 1040, D), line(1063, 1052, 1437, 1052, L)],                        // barres (base au-dessus)
  [dot(60, 975, 37, L), line(152, 970, 222, 970, D), line(152, 1027, 185, 1027, D), line(60, 1050, 60, 1078, D)],
  [dot(60, 1153, 37, L), line(152, 1152, 222, 1152, D), line(152, 1208, 200, 1208, D), line(60, 1228, 60, 1258, D)],
  [dot(60, 1331, 37, A)], [line(152, 1336, 205, 1336, D)],
  [ring(421, 1064, 133, L, -60), line(421, 958, 421, 972, D), line(314, 1064, 328, 1064, D), line(421, 1156, 421, 1170, D),
    line(420, 1065, 470, 1036, L), dot(478, 1032, 29, A)],                                   // chrono
  [path('M626,933 H774 V1085 C774,1118 740,1139 700,1139 C660,1139 626,1118 626,1085 Z', D), line(700, 1000, 700, 1043, L)], // bouclier
  [arcArrow(921, 988, 62, 165, 283, L), arcArrow(921, 988, 62, 345, 463, L)],               // refresh
  [line(1063, 1150, 1095, 1150, L), line(1155, 1150, 1185, 1150, L), line(1063, 1208, 1095, 1208, L), line(1155, 1208, 1185, 1208, L)],
  [ring(1285, 1168, 36, D, 45), line(1318, 1201, 1350, 1233, D)],                           // loupe
  [line(1062, 1292, 1350, 1292, D)],
  [dot(1425, 1148, 29, L)], [dot(1425, 1236, 29, L)], [dot(1425, 1323, 29, L)],
  [path('M815,1362 C815,1282 940,1282 940,1362 Z', L, { fill: true, w: 10 }), dot(877, 1240, 36, L), ring(877, 1265, 121, D, 90)], // avatar
  [line(467, 1272, 683, 1272, D), path('M630,1220 L683,1272 L630,1325', D)],                 // →
  [dot(288, 1268, 37, D), dot(313, 1240, 23, L)],
  [path('M369,1302 V1400', L), path('M337,1369 L369,1401 L401,1369', L), path('M298,1415 V1456 H442 V1415', D)], // download
  [path('M540,1408 L593,1437 L540,1468 Z', L, { fill: true })],                             // play
  [line(653, 1402, 653, 1472, D), line(705, 1402, 705, 1472, D)],                           // pause
  [path('M132,1445 C115,1415 43,1405 43,1462 C43,1502 95,1535 132,1568 C169,1535 221,1502 221,1462 C221,1405 149,1415 132,1445 Z', D)], // cœur
  [line(265, 1557, 330, 1557, D)], [line(390, 1557, 455, 1557, A)], [line(515, 1557, 580, 1557, D)], [line(640, 1557, 705, 1557, D)],
  [path('M790,1457 L825,1502 L790,1546', L)],                                               // chevron
  [path('M890,1444 H957 L923,1502 L960,1558 H887 L923,1502 Z', D, { fill: true, w: 28 }), dot(970, 1437, 29, A)], // sablier
  [rrect(1098, 1418, 81, 81, 12, L), path('M1182,1365 H1232 V1415', L), path('M1042,1507 V1555 H1092', L)], // agrandir
  [dot(1248, 1545, 25, D)],
  [path('M1338,1435 Q1274,1497 1338,1560', D), path('M1397,1435 Q1461,1497 1397,1560', D)], // ( )
];

function makeEl(e) {
  if (e.dot) {
    const n = document.createElementNS(NS, 'circle');
    n.setAttribute('cx', e.dot[0]); n.setAttribute('cy', e.dot[1]); n.setAttribute('r', e.dot[2]);
    n.setAttribute('fill', e.c);
    return { node: n, kind: 'dot', r: e.dot[2] };
  }
  const n = document.createElementNS(NS, 'path');
  n.setAttribute('d', e.d);
  n.setAttribute('pathLength', '1');
  n.setAttribute('stroke', e.c);
  n.setAttribute('stroke-width', e.w || SW);
  n.setAttribute('fill', e.fill ? e.c : 'none');
  return { node: n, kind: 'stroke', w: e.w || SW, fill: !!e.fill };
}

const clamp = v => v < 0 ? 0 : v > 1 ? 1 : v;
const easeInOut = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const easeIn = x => x * x;
const easeInBack = x => 2.70158 * x * x * x - 1.70158 * x * x;

// t = 0 : élément entier — t = 1 : disparu
function applyPart(p, t) {
  if (p.kind === 'dot') {
    const s = t <= 0 ? 1 : Math.max(0, 1 - easeInBack(t));
    p.node.setAttribute('r', (p.r * s).toFixed(2));
    return;
  }
  const RET = 0.78;                                   // part du temps consacrée au « dé-tracé »
  const f = 1 - easeInOut(clamp(t / RET));            // longueur de tracé restante
  const w = p.w * (1 - easeIn(clamp((t - RET) / (1 - RET))));
  if (f >= 1) p.node.removeAttribute('stroke-dasharray');
  else p.node.setAttribute('stroke-dasharray', `${f.toFixed(4)} 2`);
  p.node.setAttribute('stroke-width', w.toFixed(2));
  if (p.fill) p.node.setAttribute('fill-opacity', (1 - clamp(t / 0.3)).toFixed(3));
  p.node.style.visibility = w < 0.3 ? 'hidden' : '';
}

function applyInstance(it, t) {
  const n = it.parts.length;
  const step = n > 1 ? Math.min(0.18, 0.5 / (n - 1)) : 0;   // les éléments d'un picto partent en léger décalé
  const len = 1 - step * (n - 1);
  for (let j = 0; j < n; j++) applyPart(it.parts[j], clamp((t - (n - 1 - j) * step) / len));
}

// PRNG déterministe : le léger aléa de l'ordre reste stable d'une visite à l'autre
function rng(seed) { return () => ((seed = Math.imul(seed ^ (seed >>> 15), 0x2c1b3c6d) + 0x6d2b79f5 | 0) >>> 0) / 4294967296; }

export function initHeroMotif(hero) {
  if (!hero || hero.dataset.motifReady) return;
  hero.dataset.motifReady = 'true';
  const svg = hero.querySelector('.hero__motif');
  const layer = hero.querySelector('.hero__layer');
  const nameEl = hero.querySelector('.hero__name');

  // bbox de chaque icône dans la tuile (trait inclus)
  const measure = document.createElementNS(NS, 'svg');
  measure.setAttribute('style', 'position:absolute;visibility:hidden;width:0;height:0');
  document.body.appendChild(measure);
  const bboxes = ICONS.map(els => {
    const g = document.createElementNS(NS, 'g');
    els.forEach(e => g.appendChild(makeEl(e).node));
    measure.appendChild(g);
    const b = g.getBBox();
    return { x: b.x - SW / 2, y: b.y - SW / 2, w: b.width + SW, h: b.height + SW };
  });
  measure.remove();

  let instances = [];
  let heroH = 686, builtWidth = 0, progress = 0, intro = 0;

  function build() {
    svg.textContent = '';
    instances = [];
    const W = svg.clientWidth, H = svg.clientHeight;
    heroH = H; builtWidth = W;
    const scale = (W <= 768 ? 0.311 : 0.444) * 1350 / TILE_W;   // même échelle que l'ancien motif-hero.png
    nameEl.style.setProperty('--name-size', (140 * scale) + 'px');

    const ox = W / 2 - NAME_ANCHOR[0] * scale;
    const oy = H / 2 - NAME_ANCHOR[1] * scale;
    const root = document.createElementNS(NS, 'g');
    root.setAttribute('transform', `translate(${ox.toFixed(2)} ${oy.toFixed(2)}) scale(${scale})`);
    svg.appendChild(root);

    // zones du nom (une par ligne) en coordonnées tuile : aucun picto dessous
    const sr = svg.getBoundingClientRect(), PAD = 2;
    const nameBoxes = [...nameEl.children].map(el => {
      const r = el.getBoundingClientRect();
      return [(r.left - sr.left - PAD - ox) / scale, (r.top - sr.top - PAD - oy) / scale,
              (r.right - sr.left + PAD - ox) / scale, (r.bottom - sr.top + PAD - oy) / scale];
    });

    // zone visible en coordonnées tuile (+ marge au-dessus pour le parallax)
    const vx0 = -ox / scale - 40, vx1 = (W - ox) / scale + 40;
    const vy0 = (-oy - H * 0.6) / scale - 40, vy1 = (H - oy) / scale + 40;
    const rand = rng(26);
    const maxDist = Math.hypot(W / 2, H / 2) / scale;

    for (let r = Math.floor(vy0 / TILE_H) - 1; r <= Math.ceil(vy1 / TILE_H); r++) {
      const shift = ((r * ROW_SHIFT) % TILE_W + TILE_W) % TILE_W;
      for (let c = Math.floor((vx0 - shift) / TILE_W) - 1; c <= Math.ceil((vx1 - shift) / TILE_W); c++) {
        const tx = c * TILE_W + shift, ty = r * TILE_H;
        ICONS.forEach((els, i) => {
          const b = bboxes[i];
          const bx = b.x + tx, by = b.y + ty;
          if (bx + b.w < vx0 || bx > vx1 || by + b.h < vy0 || by > vy1) return;
          if (nameBoxes.some(n => bx < n[2] && bx + b.w > n[0] && by < n[3] && by + b.h > n[1])) return;
          const g = document.createElementNS(NS, 'g');
          if (tx || ty) g.setAttribute('transform', `translate(${tx} ${ty})`);
          const parts = els.map(makeEl);
          parts.forEach(p => g.appendChild(p.node));
          root.appendChild(g);
          const cx = bx + b.w / 2, cy = by + b.h / 2;
          // ordre : du nom vers les bords, avec un peu d'aléa
          const dist = Math.min(1, Math.hypot(cx - NAME_ANCHOR[0], cy - NAME_ANCHOR[1]) / maxDist);
          instances.push({ parts, start: (0.8 * dist + 0.2 * rand()) * (1 - DUR), lastT: -1 });
        });
      }
    }
    for (const it of instances) { applyInstance(it, 0); it.lastT = 0; }
  }

  function render() {
    for (const it of instances) {
      const t = clamp((progress - it.start) / DUR);
      if (t === it.lastT) continue;
      applyInstance(it, t);
      it.lastT = t;
    }
  }

  function update() {
    const y = window.scrollY;
    const sp = clamp(y / (heroH * 0.75));
    progress = Math.max(sp, intro);
    layer.style.transform = `translateY(${(y * 0.5).toFixed(1)}px)`;   // parallax
    nameEl.style.opacity = (1 - clamp((sp - 0.55) / 0.4)).toFixed(3);
    render();
  }

  // ouverture : le motif se trace (même animation, jouée à l'envers)
  function playIntro() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { intro = 0; update(); return; }
    const t0 = performance.now();
    intro = 1;
    const tick = now => {
      intro = 1 - clamp((now - t0) / INTRO_MS);
      update();
      if (intro > 0) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; update(); });
  }, { passive: true });

  // on ne reconstruit que si la largeur change (la barre d'adresse mobile déclenche des resize en hauteur)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (svg.clientWidth !== builtWidth) { build(); update(); } }, 150);
  });

  if (window.scrollY < 10) intro = 1;          // cache le motif avant le premier tracé
  build();
  update();
  // la zone du nom dépend de la police : on attend SUSE avant de lancer l'ouverture
  document.fonts.ready.then(() => {
    build();
    update();
    if (intro === 1) playIntro();
  });
}
