/**
 * Geometry for Sepzok wordmark → product icon morph.
 *
 * Letter mesh: 1S–12S / 1Z–12Z (two cuts → three quads). See VERTICES.md.
 * Logo: 1L–9L / 1R–9R (favicon). Quads morph to triangles (4th point collapses).
 */

export const VIEW = { w: 520, h: 140 }

export const LOGO_ORIGIN = { x: (VIEW.w - 120) / 2, y: (VIEW.h - 120) / 2 }

export const Y_BAKE = -8.5

function bake([x, y]) {
  return [x, y + Y_BAKE]
}

function place(pt) {
  const [x, y] = bake(pt)
  return [x + LOGO_ORIGIN.x, y + LOGO_ORIGIN.y]
}

export function unplace([x, y]) {
  return [x - LOGO_ORIGIN.x, y - LOGO_ORIGIN.y - Y_BAKE]
}

export const TYPE = {
  fontFamily: 'Helvetica Neue, Helvetica, Arial, ui-sans-serif, sans-serif',
  weight: 700,
  capSize: 64,
  bodySize: 52,
  base: 100,
  textX: 118,
}

/**
 * Three ink pieces per letter (hand cut diagram). S and Z use different
 * boundary windings so morphs do not flip (mirrored logo ends).
 */
export const QUAD_IDS = {
  L: [
    [2, 1, 3, 4], // S top hook
    [5, 6, 7, 8], // S spine
    [9, 10, 11, 12], // S bottom hook
  ],
  R: [
    [1, 3, 4, 2], // Z top bar
    [5, 6, 8, 7], // Z diagonal
    [9, 10, 11, 12], // Z bottom bar
  ],
}

/** Corner → logo id. Peak and spine match on both wings.
 *  The outer end of each bottom bar collapses onto that wing's tip:
 *  Z's right (11, 12), S's left (9, 10) — the mirror, not the same ids.
 */
export const QUAD_TO_LOGO = {
  L: [
    [1, 1, 2, 3],
    [4, 5, 6, 6],
    [9, 9, 8, 7],
  ],
  R: [
    [1, 2, 3, 1],
    [4, 5, 6, 6],
    [8, 7, 9, 9],
  ],
}

/** Favicon polygon fills, one per wing quad. The morph ends on these solids. */
/** Light from upper-right: R top lightest, L mid darkest; R bot brighter than L bot. */
export const LOGO_FILLS = {
  L: ['#3b82f6', '#1e40af', '#3b82f6'],
  R: ['#93c5fd', '#60a5fa', '#4f8ff7'],
}

/** Coincident pairs at letter cut seams (start pose), per letter. */
export const LETTER_SEAM_LINKS = {
  S: [
    [3, 5],
    [4, 6],
    [7, 12],
    [8, 11],
  ],
  Z: [],
}

/** Logo shared corners when editing end (flush shipping icon). */
export const END_LINKS = [
  [2, 4],
  [3, 5],
  [6, 7],
]

export const EDIT_VERSION = 2

/**
 * Shipping favicon corners (flush shared edges). Source:
 * `intl-site/favicon.svg`. Gapped spare: `END_*_FAV_GAPPED` /
 * `intl-site/favicon-gapped.svg`.
 */
export const END_L_FAV = {
  1: [60, 20],
  2: [25, 70],
  3: [55, 65],
  4: [25, 70],
  5: [55, 65],
  6: [60, 100],
  7: [60, 100],
  8: [36.9, 80.2],
  9: [0, 115],
}

export const END_R_FAV = {
  1: [60, 20],
  2: [95, 70],
  3: [65, 65],
  4: [95, 70],
  5: [65, 65],
  6: [60, 100],
  7: [60, 100],
  8: [83.1, 80.2],
  9: [120, 115],
}

/** Spare: equal gutters (~1.6 fav inset). Not used by the morph. */
export const END_L_FAV_GAPPED = {
  1: [57.72, 26.05],
  2: [28.5, 67.8],
  3: [53.54, 63.62],
  4: [28.64, 71.01],
  5: [53.65, 66.85],
  6: [57.82, 96.02],
  7: [56.61, 99.2],
  8: [36.95, 82.35],
  9: [5.55, 111.96],
}

export const END_R_FAV_GAPPED = {
  1: [62.28, 26.05],
  2: [91.5, 67.8],
  3: [66.46, 63.62],
  4: [91.36, 71.01],
  5: [66.35, 66.85],
  6: [62.18, 96.02],
  7: [63.39, 99.2],
  8: [83.05, 82.35],
  9: [114.45, 111.96],
}

/**
 * S cut fallbacks (local, origin ≈ ink TL). Runtime prefers layoutSMorph().
 * Top bowl | mid spine (one piece) | bottom bowl — seam ids 3↔5, 4↔6, 7↔9, 8↔10.
 */
export const LETTER_S_LOCAL = {
  1: [58, 22],
  2: [29, 0],
  3: [2.5, 23],
  4: [18.5, 23],
  5: [2.5, 23],
  6: [18.5, 23],
  7: [15.5, 49],
  8: [0, 49],
  9: [15.5, 49],
  10: [0, 49],
  11: [0, 50],
  12: [30, 72],
}

/**
 * Z cut: top/bottom rectangles + mid parallelogram (Helvetica Bold verts).
 * Runtime prefers layoutZMorph(). Seams 4↔5, 7↔9, 8↔10.
 */
export const LETTER_Z_LOCAL = {
  1: [3, 0],
  2: [3, 13],
  3: [59, 0],
  4: [59, 13],
  5: [59, 13],
  6: [38, 13],
  7: [21, 58],
  8: [0, 59],
  9: [21, 58],
  10: [0, 59],
  11: [60, 71],
  12: [60, 58],
}

/** Ink of the wordmark — cut pieces stay this color until verts morph. */
export const INK = {
  light: '#1c2430',
  dark: '#e8eef6',
}

/** @deprecated old 9-point names — aliases for apply script / docs */
export const START_S_LOCAL = LETTER_S_LOCAL
export const START_Z_LOCAL = LETTER_Z_LOCAL

export const Z_FALLBACK_X = 250
export const S_FALLBACK_ORIGIN = { x: 118, y: 28 }

export const SECONDARY_IDS = ['e', 'p', 'o', 'k']

export function endVertsCanvas(half) {
  const src = half === 'L' ? END_L_FAV : END_R_FAV
  /** @type {Record<number, [number, number]>} */
  const out = {}
  for (let i = 1; i <= 9; i++) out[i] = place(src[i])
  return out
}

export function letterVertsAbsolute(local, origin) {
  /** @type {Record<number, [number, number]>} */
  const out = {}
  for (let i = 1; i <= 12; i++) {
    const p = local[i] ?? local[String(i)]
    out[i] = [p[0] + origin.x, p[1] + origin.y]
  }
  return out
}

/** @deprecated */
export function startVertsAbsolute(local, origin) {
  return letterVertsAbsolute(local, origin)
}

export function logoQuadVerts(end9, quadIndex, half = 'L') {
  return QUAD_TO_LOGO[half][quadIndex].map((id) => end9[id])
}

export function letterQuadVerts(letter12, quadIndex, half = 'L') {
  return QUAD_IDS[half][quadIndex].map((id) => letter12[id])
}

export function cloneVerts(verts, n = 12) {
  /** @type {Record<number, [number, number]>} */
  const out = {}
  for (let i = 1; i <= n; i++) {
    if (verts[i] || verts[String(i)]) {
      const p = verts[i] ?? verts[String(i)]
      out[i] = [p[0], p[1]]
    }
  }
  return out
}

export function favToCanvas(favVerts) {
  /** @type {Record<number, [number, number]>} */
  const out = {}
  for (let i = 1; i <= 9; i++) {
    const p = favVerts[i] ?? favVerts[String(i)]
    out[i] = place(p)
  }
  return out
}

export function vertsToFav(canvasVerts) {
  /** @type {Record<number, [number, number]>} */
  const out = {}
  for (let i = 1; i <= 9; i++) {
    const [x, y] = unplace(canvasVerts[i])
    out[i] = [round(x), round(y)]
  }
  return out
}

export function localFromAbsolute(abs, origin, n = 12) {
  /** @type {Record<number, [number, number]>} */
  const out = {}
  for (let i = 1; i <= n; i++) {
    out[i] = [round(abs[i][0] - origin.x), round(abs[i][1] - origin.y)]
  }
  return out
}

export function applyLinks(verts, id, xy, links) {
  const n = Math.max(...Object.keys(verts).map(Number))
  const next = cloneVerts(verts, n)
  next[id] = [xy[0], xy[1]]
  for (const [a, b] of links) {
    if (id === a) next[b] = [xy[0], xy[1]]
    if (id === b) next[a] = [xy[0], xy[1]]
  }
  return next
}

export function applyEndLinks(verts, id, xy) {
  return applyLinks(verts, id, xy, END_LINKS)
}

export function applyLetterSeamLinks(verts, id, xy, letter = 'S') {
  return applyLinks(verts, id, xy, LETTER_SEAM_LINKS[letter] || LETTER_SEAM_LINKS.S)
}

export function packEditDoc({
  letterSLocal,
  letterZLocal,
  endLFav,
  endRFav,
  sOrigin,
  zOrigin,
}) {
  return {
    version: EDIT_VERSION,
    updated: new Date().toISOString(),
    note: 'Drop into promo/logo-morph/vertices.edit.json then ask agent to apply.',
    sOrigin,
    zOrigin,
    letterSLocal,
    letterZLocal,
    // aliases for older apply path
    startSLocal: letterSLocal,
    startZLocal: letterZLocal,
    endLFav,
    endRFav,
  }
}

export function pointsAttr(pts) {
  return pts.map(([x, y]) => `${round(x)},${round(y)}`).join(' ')
}

export function round(n) {
  return Math.round(n * 100) / 100
}

export function lerpPts(a, b, t) {
  return a.map((pa, i) => {
    const pb = b[i]
    return [pa[0] + (pb[0] - pa[0]) * t, pa[1] + (pb[1] - pa[1]) * t]
  })
}

export function lerpVerts(a, b, t, n = 9) {
  /** @type {Record<number, [number, number]>} */
  const out = {}
  for (let i = 1; i <= n; i++) {
    out[i] = [
      a[i][0] + (b[i][0] - a[i][0]) * t,
      a[i][1] + (b[i][1] - a[i][1]) * t,
    ]
  }
  return out
}

/** @deprecated old triangle id list */
export const TRI_IDS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

export function facetsFromVerts(verts, fills) {
  return TRI_IDS.map((ids, i) => ({
    id: `T${i + 1}`,
    fill: fills[i],
    points: ids.map((id) => verts[id]),
    vertexIds: ids,
  }))
}
