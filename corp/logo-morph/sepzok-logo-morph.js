/**
 * Sepzok wordmark → product icon morph.
 * Letter quads 1S–12S / 1Z–12Z → logo tris 1L–9L / 1R–9R (see VERTICES.md).
 */
import {
  VIEW,
  LOGO_ORIGIN,
  TYPE,
  QUAD_IDS,
  QUAD_TO_LOGO,
  LOGO_FILLS,
  INK,
  SECONDARY_IDS,
  S_FALLBACK_ORIGIN,
  Z_FALLBACK_X,
  LETTER_S_LOCAL,
  LETTER_Z_LOCAL,
  endVertsCanvas,
  letterVertsAbsolute,
  letterQuadVerts,
  logoQuadVerts,
  pointsAttr,
  lerpPts,
  cloneVerts,
  applyEndLinks,
  applyLetterSeamLinks,
  localFromAbsolute,
  vertsToFav,
  favToCanvas,
  packEditDoc,
} from './geometry.js'
import { arcPath, layoutSMorph, layoutStraightS, layoutZMorph, sArcModel } from './letter-shapes.js'

const DEFAULTS = {
  duration: 2,
  hold: 0.22,
  loop: false,
  autoplay: true,
  theme: 'light',
  showIds: false,
  /**
   * Where the favicon end pose sits in the view.
   * `center` — default studio / preview.
   * `left` — keep the end icon on the approached S+Z cluster (no slide to mid).
   * @type {'center' | 'left'}
   */
  logoPlacement: 'center',
  /** @type {null | (() => void)} */
  onComplete: null,
}

/**
 * Playback:
 * epok fade, S unbend, and Z slide run together.
 * The logo morph starts before that finishes, then holds the favicon.
 */
const SEG = {
  fadeEnd: 0.48,
  straightenStart: 0,
  straightenEnd: 0.5,
  morphStart: 0.28,
  morphEnd: 0.86,
}

function prefersReducedMotion() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

function clamp01(t) {
  return t < 0 ? 0 : t > 1 ? 1 : t
}

function segment(t, a, b) {
  if (t <= a) return 0
  if (t >= b) return 1
  return (t - a) / (b - a)
}

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function mixHex(a, b, t) {
  if (t <= 0) return a
  if (t >= 1) return b
  const A = hexToRgb(a)
  const B = hexToRgb(b)
  const c = A.map((v, i) => Math.round(v + (B[i] - v) * t))
  return `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

function buildQuads(half, letter12, ink) {
  return QUAD_IDS[half].map((ids, i) => {
    const pts = ids.map((id) => letter12[id])
    const label = ids.map((id) => `${id}${half === 'L' ? 'S' : 'Z'}`).join(' ')
    // Morph layer: letter-pose quads → logo tris (color follows shapeT).
    if (half === 'L') {
      return (
        `<path data-half="${half}" data-quad="Q${i + 1}" data-verts="${label}" ` +
        `fill="${ink}" stroke="#f3f6fa" stroke-width="1.5" ` +
        `stroke-linejoin="round" opacity="0" d=""/>`
      )
    }
    return (
      `<polygon data-half="${half}" data-quad="Q${i + 1}" data-verts="${label}" ` +
      `fill="${ink}" stroke="#f3f6fa" stroke-width="1.5" ` +
      `stroke-linejoin="round" opacity="0" points="${pointsAttr(pts)}"/>`
    )
  }).join('')
}

/** Cut ink: S = outline × 3 y-clips; Z = rect + parallelogram + rect. */
function buildCutPieces(sLayout, zLayout, ink) {
  const clips = []
  const sPaths = []
  const zPaths = []
  sLayout.pieces.forEach((p) => {
    if (p.clip) {
      clips.push(
        `<clipPath id="sz-cut-${p.id}"><rect x="${p.clip.x}" y="${p.clip.y}" width="${p.clip.w}" height="${p.clip.h}"/></clipPath>`,
      )
      sPaths.push(
        `<path data-cut="${p.id}" d="${p.d}" fill="${ink}" clip-path="url(#sz-cut-${p.id})" ` +
          `stroke="#f3f6fa" stroke-width="1.2" stroke-linejoin="round" opacity="0"/>`,
      )
    }
  })
  zLayout.pieces.forEach((p) => {
    zPaths.push(
      `<path data-cut="${p.id}" d="${p.d}" fill="${ink}" ` +
        `stroke="#f3f6fa" stroke-width="1.2" stroke-linejoin="round" opacity="0"/>`,
    )
  })
  return (
    `<defs>${clips.join('')}</defs>` +
    `<g data-cut-s>${sPaths.join('')}</g>` +
    `<g data-cut-z>${zPaths.join('')}</g>`
  )
}

function lerp2(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

/** Logo point for a letter id (coincident seams may split later). */
function logoCorner(half, id, end9) {
  const ids = QUAD_IDS[half]
  const to = QUAD_TO_LOGO[half]
  for (let q = 0; q < ids.length; q++) {
    const k = ids[q].indexOf(id)
    if (k >= 0) return end9[to[q][k]]
  }
  return end9[1]
}

/**
 * One cubic per edge. Handles fall to 0 while corners move,
 * so each piece straightens into a quad — not a point cloud.
 */
function poseArc(piece, straightVerts, half, end9, straightenT, shapeT) {
  const corners = piece.ids.map((id, i) => {
    const straight = lerp2(piece.src[i], straightVerts[id], straightenT)
    return lerp2(straight, logoCorner(half, id, end9), shapeT)
  })
  return arcPath(corners, piece.edges, 1 - straightenT)
}

function lerpVertMap(a, b, t) {
  /** @type {Record<number, [number, number]>} */
  const out = {}
  for (let i = 1; i <= 12; i++) {
    const pa = a[i]
    const pb = b[i]
    out[i] = [pa[0] + (pb[0] - pa[0]) * t, pa[1] + (pb[1] - pa[1]) * t]
  }
  return out
}

function shiftVertMap(verts, dx, dy = 0, n = 12) {
  /** @type {Record<number, [number, number]>} */
  const out = {}
  for (let i = 1; i <= n; i++) {
    if (!verts[i]) continue
    out[i] = [verts[i][0] + dx, verts[i][1] + dy]
  }
  return out
}

/** Axis-aligned extent of 1…n verts across one or more maps. */
function vertsExtent(maps, n) {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (const m of maps) {
    for (let i = 1; i <= n; i++) {
      const p = m[i]
      if (!p) continue
      if (p[0] < minX) minX = p[0]
      if (p[0] > maxX) maxX = p[0]
      if (p[1] < minY) minY = p[1]
      if (p[1] > maxY) maxY = p[1]
    }
  }
  return {
    minX,
    maxX,
    minY,
    maxY,
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2,
  }
}

function glyphOriginX(el, fallbackX) {
  try {
    if (el && typeof el.getStartPositionOfChar === 'function') {
      return el.getStartPositionOfChar(0).x
    }
  } catch {
    /* */
  }
  return fallbackX
}

/**
 * Fixed screen-size HTML chips; coincident verts share one chip (no overlap).
 * @param {{ id: string, x: number, y: number }[]} anchors SVG user-space
 */
function dedupeAnchors(anchors, eps = 4) {
  /** @type {{ ids: string[], x: number, y: number }[]} */
  const groups = []
  for (const a of anchors) {
    const hit = groups.find((g) => Math.hypot(g.x - a.x, g.y - a.y) < eps)
    if (hit) {
      if (!hit.ids.includes(a.id)) hit.ids.push(a.id)
    } else groups.push({ ids: [a.id], x: a.x, y: a.y })
  }
  return groups
}

/**
 * Map SVG user coords → overlay % (accounts for viewBox meet letterboxing).
 * @param {SVGSVGElement} svg
 * @param {HTMLElement} overlay
 * @param {number} x
 * @param {number} y
 */
function svgToOverlayPct(svg, overlay, x, y) {
  const ctm = svg.getScreenCTM()
  const box = overlay.getBoundingClientRect()
  if (!ctm || !box.width || !box.height) {
    return { left: (x / VIEW.w) * 100, top: (y / VIEW.h) * 100 }
  }
  const pt = svg.createSVGPoint()
  pt.x = x
  pt.y = y
  const sp = pt.matrixTransform(ctm)
  return {
    left: ((sp.x - box.left) / box.width) * 100,
    top: ((sp.y - box.top) / box.height) * 100,
  }
}

function renderIdOverlay(svg, overlay, anchors, dark) {
  if (!overlay) return
  const groups = dedupeAnchors(anchors)
  overlay.innerHTML = groups
    .map((g) => {
      const text = g.ids.join('/')
      const { left, top } = svgToOverlayPct(svg, overlay, g.x, g.y)
      return `<span class="sz-vid${dark ? ' dark' : ''}" style="left:${left}%;top:${top}%">${text}</span>`
    })
    .join('')
}

function buildHandles(suffix, verts, n) {
  const nodes = []
  for (let i = 1; i <= n; i++) {
    const [x, y] = verts[i]
    nodes.push(
      `<circle data-handle="${i}${suffix}" data-suffix="${suffix}" data-id="${i}" cx="${x}" cy="${y}" r="10" fill="#fff" stroke="#b45309" stroke-width="2.5" style="cursor:grab;touch-action:none"/>`,
    )
  }
  return nodes.join('')
}

function buildSvg(theme) {
  const ink = theme === 'dark' ? '#e8eef6' : '#1c2430'
  // Placeholder layouts until mount measures glyph origins.
  const sLayout0 = layoutSMorph(TYPE.textX, TYPE.base, TYPE.capSize)
  const zLayout0 = layoutZMorph(Z_FALLBACK_X, TYPE.base, TYPE.capSize)
  const s0 = sLayout0.verts
  const z0 = zLayout0.verts

  const wordmark = `
    <text data-wordmark="1" x="${TYPE.textX}" y="${TYPE.base}"
          fill="${ink}" font-size="${TYPE.bodySize}"
          dominant-baseline="alphabetic" text-rendering="geometricPrecision">
      <tspan data-glyph="S" font-size="${TYPE.capSize}">S</tspan><tspan data-letter="e">e</tspan><tspan data-letter="p">p</tspan><tspan data-glyph="Z" font-size="${TYPE.capSize}">Z</tspan><tspan data-letter="o">o</tspan><tspan data-letter="k">k</tspan>
    </text>`

  return `<svg class="sz-logo-morph" viewBox="0 0 ${VIEW.w} ${VIEW.h}" width="100%" height="100%" role="img" aria-label="Sepzok">
  <style>
    .sz-logo-morph text, .sz-logo-morph tspan {
      font-family: ${TYPE.fontFamily};
      font-weight: ${TYPE.weight};
      font-style: normal;
    }
    .sz-logo-morph [data-layer="handles"] { display: none; }
    .sz-logo-morph.is-editing [data-layer="handles"] { display: block; }
    .sz-logo-morph [data-layer="wings"] polygon,
    .sz-logo-morph [data-layer="wings"] path,
    .sz-logo-morph [data-layer="cut"] path { paint-order: stroke fill; }
  </style>
  <g data-layer="wordmark">${wordmark}</g>
  <g data-layer="cut">${buildCutPieces(sLayout0, zLayout0, ink)}</g>
  <g data-layer="wings">
    <g data-layer="s">${buildQuads('L', s0, ink)}</g>
    <g data-layer="z">${buildQuads('R', z0, ink)}</g>
  </g>
  <g data-layer="handles">${buildHandles('S', s0, 12)}${buildHandles('Z', z0, 12)}</g>
</svg>`
}

function clientToSvg(svg, clientX, clientY) {
  const pt = svg.createSVGPoint()
  pt.x = clientX
  pt.y = clientY
  const ctm = svg.getScreenCTM()
  if (!ctm) return [0, 0]
  const sp = pt.matrixTransform(ctm.inverse())
  return [sp.x, sp.y]
}

function ensureOverlayCss() {
  if (document.getElementById('sz-logo-morph-overlay-css')) return
  const style = document.createElement('style')
  style.id = 'sz-logo-morph-overlay-css'
  style.textContent = `
    .sz-logo-morph-host { position: relative; }
    .sz-logo-morph-host > .sz-logo-morph { display: block; width: 100%; height: 100%; }
    .sz-id-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: visible;
    }
    .sz-id-overlay .sz-vid {
      position: absolute;
      transform: translate(-50%, calc(-100% - 6px));
      font: 700 11px/1.1 ui-monospace, Menlo, Consolas, monospace;
      color: #9a3412;
      background: color-mix(in srgb, #fff 88%, transparent);
      border: 1px solid color-mix(in srgb, #b45309 45%, transparent);
      border-radius: 4px;
      padding: 2px 4px;
      white-space: nowrap;
      box-shadow: 0 1px 2px rgb(0 0 0 / 12%);
    }
    .sz-id-overlay .sz-vid.dark {
      color: #fde68a;
      background: color-mix(in srgb, #0f141c 75%, transparent);
      border-color: color-mix(in srgb, #fbbf24 40%, transparent);
    }
  `
  document.head.appendChild(style)
}

/**
 * @param {HTMLElement} el
 * @param {Partial<typeof DEFAULTS>} [opts]
 */
export function mount(el, opts = {}) {
  const options = { ...DEFAULTS, ...opts }
  ensureOverlayCss()
  el.innerHTML = `${buildSvg(options.theme)}<div class="sz-id-overlay" aria-hidden="true"></div>`
  el.classList.add('sz-logo-morph-host')
  if (!el.style.display) el.style.display = 'block'
  // Keep host CSS positioning (e.g. absolute overlay). Only lift static.
  if (!el.style.position) {
    const pos = typeof getComputedStyle === 'function' ? getComputedStyle(el).position : 'static'
    if (!pos || pos === 'static') el.style.position = 'relative'
  }
  el.style.lineHeight = '0'

  const svg = /** @type {SVGSVGElement} */ (el.querySelector('svg'))
  const idOverlay = /** @type {HTMLElement} */ (el.querySelector('.sz-id-overlay'))
  const wings = svg.querySelector('[data-layer="wings"]')
  const cutLayer = svg.querySelector('[data-layer="cut"]')
  const handlesLayer = svg.querySelector('[data-layer="handles"]')
  let sQuads = [...svg.querySelectorAll('[data-layer="s"] path')]
  let zQuads = [...svg.querySelectorAll('[data-layer="z"] polygon')]
  let cutPaths = [...svg.querySelectorAll('[data-layer="cut"] path')]
  const sGlyph = svg.querySelector('[data-glyph="S"]')
  const zGlyph = svg.querySelector('[data-glyph="Z"]')
  const secondary = SECONDARY_IDS.map((id) => svg.querySelector(`[data-letter="${id}"]`)).filter(
    Boolean,
  )
  const darkTheme = options.theme === 'dark'
  const ink = darkTheme ? INK.dark : INK.light

  let endL = cloneVerts(endVertsCanvas('L'), 9)
  let endR = cloneVerts(endVertsCanvas('R'), 9)

  const sOriginX = glyphOriginX(sGlyph, TYPE.textX)
  const zOriginX = glyphOriginX(zGlyph, Z_FALLBACK_X)
  let sOrigin = { x: sOriginX, y: TYPE.base - TYPE.capSize }
  let zOrigin = { x: zOriginX, y: TYPE.base - TYPE.capSize }

  let sLayout = layoutSMorph(sOriginX, TYPE.base, TYPE.capSize)
  let zLayout = layoutZMorph(zOriginX, TYPE.base, TYPE.capSize)
  let straightS = layoutStraightS(sOriginX, TYPE.base, TYPE.capSize)
  /** S as three cubic pieces. Handles fall away as the corners straighten. */
  let ribbon = sArcModel(sOriginX, TYPE.base, TYPE.capSize)
  /** Curved cut pose (editable). */
  let letterS = { ...sLayout.verts }
  let letterZ = { ...zLayout.verts }
  /** How far Z slides left toward S while S straightens (close most of the gap). */
  const zApproachDx = (() => {
    const gap = zOriginX - (sOriginX + sLayout.advance)
    return gap > 0 ? -gap * 0.88 : (sOriginX - zOriginX) * 0.45
  })()

  // Pin favicon end pose on the approached S+Z cluster so shape morph
  // does not slide the pair toward the canvas mid.
  if (options.logoPlacement === 'left') {
    const approachedZ = shiftVertMap(letterZ, zApproachDx)
    const approach = vertsExtent([straightS.verts, approachedZ], 12)
    const logo = vertsExtent([endL, endR], 9)
    const dx = approach.cx - logo.cx
    const dy = approach.cy - logo.cy
    endL = shiftVertMap(endL, dx, dy, 9)
    endR = shiftVertMap(endR, dx, dy, 9)
  }

  // Rebuild cut + morph quads aligned to measured glyph origins.
  if (cutLayer) {
    cutLayer.innerHTML = buildCutPieces(sLayout, zLayout, ink)
    cutPaths = [...cutLayer.querySelectorAll('path')]
  }
  const cutZGroup = svg.querySelector('[data-cut-z]')
  const sGroup = svg.querySelector('[data-layer="s"]')
  const zGroup = svg.querySelector('[data-layer="z"]')
  if (sGroup) sGroup.innerHTML = buildQuads('L', letterS, ink)
  if (zGroup) zGroup.innerHTML = buildQuads('R', letterZ, ink)
  sQuads = [...svg.querySelectorAll('[data-layer="s"] path')]
  zQuads = [...svg.querySelectorAll('[data-layer="z"] polygon')]
  if (handlesLayer) {
    handlesLayer.innerHTML = buildHandles('S', letterS, 12) + buildHandles('Z', letterZ, 12)
  }

  let showIds = options.showIds
  /** @type {'off'|'start'|'end'} */
  let editMode = 'off'
  let raf = 0
  let startTs = 0
  let playing = false
  let loopTimer = 0
  let lastT = 0
  let lastU = 0
  let lastShapeT = 0
  let lastStraightenT = 0
  /** @type {null | { suffix: string, id: number, el: SVGCircleElement }} */
  let drag = null

  function applyQuads(sPts, zPts) {
    for (let i = 0; i < 3; i++) {
      sQuads[i].setAttribute('d', sPts[i])
      zQuads[i].setAttribute('points', pointsAttr(zPts[i]))
    }
  }

  /** S: cubic sides. Z: three quads, bars stay rectangles. */
  function shapePoints(straightenT, shapeT) {
    const s = ribbon.pieces.map((piece) =>
      poseArc(piece, straightS.verts, 'L', endL, straightenT, shapeT),
    )
    const { z, zDx } = quadsAt(straightenT, shapeT)
    return { s, z, zDx }
  }

  /** Translate cut-Z ink only (morph Z points bake the approach into coordinates). */
  function setCutZShift(dx) {
    if (!cutZGroup) return
    if (!dx) cutZGroup.removeAttribute('transform')
    else cutZGroup.setAttribute('transform', `translate(${dx.toFixed(2)} 0)`)
  }

  /**
   * @param {number} straightenT 0 curved S / Z home → 1 straight S / Z approached
   * @param {number} shapeT 0 letter-pair pose → 1 logo
   */
  function quadsAt(straightenT, shapeT) {
    const sPose = lerpVertMap(letterS, straightS.verts, straightenT)
    const zHome = letterZ
    const zShifted = shiftVertMap(zHome, zApproachDx * straightenT)
    const s = []
    const z = []
    for (let i = 0; i < 3; i++) {
      const aS = letterQuadVerts(sPose, i, 'L')
      const bS = logoQuadVerts(endL, i, 'L')
      const aZ = letterQuadVerts(zShifted, i, 'R')
      const bZ = logoQuadVerts(endR, i, 'R')
      s.push(lerpPts(aS, bS, shapeT))
      z.push(lerpPts(aZ, bZ, shapeT))
    }
    return { s, z, zDx: zApproachDx * straightenT, sPose, zShifted }
  }

  function letterAnchors() {
    /** @type {{ id: string, x: number, y: number }[]} */
    const a = []
    for (let i = 1; i <= 12; i++) {
      a.push({ id: `${i}S`, x: letterS[i][0], y: letterS[i][1] })
      a.push({ id: `${i}Z`, x: letterZ[i][0], y: letterZ[i][1] })
    }
    return a
  }

  function logoAnchors() {
    /** @type {{ id: string, x: number, y: number }[]} */
    const a = []
    for (let i = 1; i <= 9; i++) {
      a.push({ id: `${i}L`, x: endL[i][0], y: endL[i][1] })
      a.push({ id: `${i}R`, x: endR[i][0], y: endR[i][1] })
    }
    return a
  }

  /** Label current morph corner positions (letter ids early, logo ids late). */
  function morphAnchors(straightenT, shapeT) {
    /** @type {{ id: string, x: number, y: number }[]} */
    const a = []
    const useLogo = shapeT >= 0.55
    const { s: ptsSAll, z: ptsZAll } = quadsAt(straightenT, shapeT)
    for (let qi = 0; qi < 3; qi++) {
      const ptsS = ptsSAll[qi]
      const ptsZ = ptsZAll[qi]
      for (let c = 0; c < 4; c++) {
        const lid = QUAD_IDS.L[qi][c]
        const gid = QUAD_TO_LOGO.L[qi][c]
        const lidZ = QUAD_IDS.R[qi][c]
        const gidZ = QUAD_TO_LOGO.R[qi][c]
        a.push({
          id: useLogo ? `${gid}L` : `${lid}S`,
          x: ptsS[c][0],
          y: ptsS[c][1],
        })
        a.push({
          id: useLogo ? `${gidZ}R` : `${lidZ}Z`,
          x: ptsZ[c][0],
          y: ptsZ[c][1],
        })
      }
    }
    return a
  }

  function syncLabelsForMode(shapeT = lastShapeT, straightenT = lastStraightenT) {
    if (!showIds) {
      renderIdOverlay(svg, idOverlay, [], darkTheme)
      return
    }
    const st = typeof shapeT === 'number' ? shapeT : lastShapeT
    const str = typeof straightenT === 'number' ? straightenT : lastStraightenT
    lastShapeT = st
    lastStraightenT = str
    let anchors
    if (editMode === 'end') anchors = logoAnchors()
    else if (editMode === 'start') anchors = letterAnchors()
    else anchors = morphAnchors(str, st)
    renderIdOverlay(svg, idOverlay, anchors, darkTheme)
  }

  const onHostResize = () => syncLabelsForMode(lastShapeT)
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onHostResize) : null
  if (ro) ro.observe(el)
  else window.addEventListener('resize', onHostResize)

  function syncHandles() {
    if (!handlesLayer || editMode === 'off') return
    if (editMode === 'start') {
      for (let i = 1; i <= 12; i++) {
        const s = handlesLayer.querySelector(`[data-handle="${i}S"]`)
        const z = handlesLayer.querySelector(`[data-handle="${i}Z"]`)
        if (s) {
          s.setAttribute('cx', String(letterS[i][0]))
          s.setAttribute('cy', String(letterS[i][1]))
        }
        if (z) {
          z.setAttribute('cx', String(letterZ[i][0]))
          z.setAttribute('cy', String(letterZ[i][1]))
        }
      }
    } else if (editMode === 'end') {
      for (let i = 1; i <= 9; i++) {
        const l = handlesLayer.querySelector(`[data-handle="${i}L"]`)
        const r = handlesLayer.querySelector(`[data-handle="${i}R"]`)
        if (l) {
          l.setAttribute('cx', String(endL[i][0]))
          l.setAttribute('cy', String(endL[i][1]))
        }
        if (r) {
          r.setAttribute('cx', String(endR[i][0]))
          r.setAttribute('cy', String(endR[i][1]))
        }
      }
    }
  }

  function applyFrame(u) {
    lastU = clamp01(u)
    if (editMode === 'start') {
      paintEditLetter()
      return
    }
    if (editMode === 'end') {
      paintEditLogo()
      return
    }
    const holdFrac = options.hold / options.duration
    if (lastU <= holdFrac) {
      paint(0)
      return
    }
    paint(clamp01((lastU - holdFrac) / (1 - holdFrac)))
  }

  const seamStroke = darkTheme ? '#0f141c' : '#f3f6fa'

  /** shapeT 0 = ink; 1 = favicon solids, no seam stroke. */
  function applyPieceFills(shapeT) {
    const tint = clamp01(shapeT)
    const seam = tint >= 1 ? 'none' : seamStroke
    const width = tint >= 1 ? '0' : (1.5 * (1 - tint)).toFixed(2)
    for (let i = 0; i < 3; i++) {
      sQuads[i].setAttribute('fill', mixHex(ink, LOGO_FILLS.L[i], tint))
      zQuads[i].setAttribute('fill', mixHex(ink, LOGO_FILLS.R[i], tint))
      sQuads[i].setAttribute('stroke', seam)
      zQuads[i].setAttribute('stroke', seam)
      sQuads[i].setAttribute('stroke-width', width)
      zQuads[i].setAttribute('stroke-width', width)
    }
  }

  function setCutOpacity(op) {
    for (const p of cutPaths) p.setAttribute('opacity', String(op))
  }

  function setMorphOpacity(op) {
    for (const p of sQuads) p.setAttribute('opacity', String(op))
    for (const p of zQuads) p.setAttribute('opacity', String(op))
  }

  function paintEditLetter() {
    lastT = 0
    lastStraightenT = 0
    secondary.forEach((n) => {
      n.style.opacity = '0.2'
    })
    sGlyph.setAttribute('opacity', '0')
    zGlyph.setAttribute('opacity', '0')
    setCutOpacity(0)
    setMorphOpacity(1)
    setCutZShift(0)
    applyPieceFills(0)
    const { s, z } = shapePoints(0, 0)
    applyQuads(s, z)
    syncLabelsForMode(0, 0)
    syncHandles()
    wings.removeAttribute('transform')
  }

  function paintEditLogo() {
    lastT = 1
    lastStraightenT = 1
    secondary.forEach((n) => {
      n.style.opacity = '0.08'
    })
    sGlyph.setAttribute('opacity', '0')
    zGlyph.setAttribute('opacity', '0')
    setCutOpacity(0)
    setMorphOpacity(1)
    setCutZShift(0)
    applyPieceFills(1)
    const { s, z } = shapePoints(1, 1)
    applyQuads(s, z)
    syncLabelsForMode(1, 1)
    syncHandles()
    wings.removeAttribute('transform')
  }

  function paint(t) {
    lastT = t
    const fadeT = easeOutCubic(segment(t, 0, SEG.fadeEnd))
    secondary.forEach((node, i) => {
      const local = clamp01(fadeT * 1.35 - i * 0.13)
      node.style.opacity = String(1 - easeOutCubic(local))
    })

    const straightenT = easeInOutCubic(segment(t, SEG.straightenStart, SEG.straightenEnd))
    const shapeT = easeInOutCubic(segment(t, SEG.morphStart, SEG.morphEnd))
    lastStraightenT = straightenT

    // One polygon per piece for the whole clip. S arcs unbend in place;
    // Z keeps its bars and only slides. No second shape fading in.
    sGlyph.setAttribute('opacity', '0')
    zGlyph.setAttribute('opacity', '0')
    setCutOpacity(0)
    setMorphOpacity(1)
    setCutZShift(0)

    applyPieceFills(shapeT)
    const { s, z } = shapePoints(straightenT, shapeT)
    applyQuads(s, z)
    syncLabelsForMode(shapeT, straightenT)

    wings.removeAttribute('transform')
    if (cutLayer) cutLayer.removeAttribute('transform')
  }

  function tick(now) {
    if (!playing) return
    const u = clamp01((now - startTs) / 1000 / options.duration)
    applyFrame(u)
    if (u >= 1) {
      playing = false
      if (editMode === 'off') paint(1)
      if (typeof options.onComplete === 'function') {
        try {
          options.onComplete()
        } catch {
          /* host callback */
        }
      }
      if (options.loop) loopTimer = window.setTimeout(() => play(), 700)
      return
    }
    raf = requestAnimationFrame(tick)
  }

  function play() {
    if (editMode !== 'off') return
    cancelAnimationFrame(raf)
    window.clearTimeout(loopTimer)
    if (prefersReducedMotion()) {
      secondary.forEach((n) => {
        n.style.opacity = '0'
      })
      paint(1)
      if (typeof options.onComplete === 'function') {
        try {
          options.onComplete()
        } catch {
          /* host callback */
        }
      }
      return
    }
    startTs = performance.now()
    playing = true
    paint(0)
    raf = requestAnimationFrame(tick)
  }

  function pause() {
    playing = false
    cancelAnimationFrame(raf)
    window.clearTimeout(loopTimer)
  }

  function destroy() {
    pause()
    if (ro) ro.disconnect()
    else window.removeEventListener('resize', onHostResize)
    handlesLayer.removeEventListener('pointerdown', onPointerDown)
    svg.removeEventListener('pointermove', onPointerMove)
    svg.removeEventListener('pointerup', onPointerUp)
    svg.removeEventListener('pointercancel', onPointerUp)
    el.innerHTML = ''
    el.classList.remove('sz-logo-morph-host')
  }

  function seek(u) {
    pause()
    applyFrame(clamp01(u))
  }

  function getProgress() {
    return lastU
  }

  function getDuration() {
    return options.duration
  }

  function step(deltaU) {
    seek(lastU + deltaU)
  }

  function setShowIds(on) {
    showIds = !!on
    applyFrame(lastU)
  }

  /** @param {'off'|'start'|'end'} mode */
  function setEditMode(mode) {
    pause()
    editMode = mode
    svg.classList.toggle('is-editing', mode !== 'off')
    if (mode === 'start') {
      handlesLayer.innerHTML = buildHandles('S', letterS, 12) + buildHandles('Z', letterZ, 12)
    } else if (mode === 'end') {
      handlesLayer.innerHTML = buildHandles('L', endL, 9) + buildHandles('R', endR, 9)
    }
    applyFrame(mode === 'end' ? 1 : mode === 'start' ? 0 : lastU)
  }

  function moveVertex(suffix, id, x, y) {
    if (editMode === 'start') {
      if (suffix === 'S') letterS = applyLetterSeamLinks(letterS, id, [x, y], 'S')
      else if (suffix === 'Z') letterZ = applyLetterSeamLinks(letterZ, id, [x, y], 'Z')
    } else if (editMode === 'end') {
      if (suffix === 'L') endL = applyEndLinks(endL, id, [x, y])
      else if (suffix === 'R') endR = applyEndLinks(endR, id, [x, y])
    } else return
    applyFrame(lastU)
  }

  function onPointerDown(e) {
    if (editMode === 'off') return
    const t = e.target
    if (!(t instanceof SVGCircleElement) || !t.hasAttribute('data-handle')) return
    e.preventDefault()
    const suffix = /** @type {string} */ (t.getAttribute('data-suffix'))
    const id = Number(t.getAttribute('data-id'))
    t.setPointerCapture(e.pointerId)
    t.style.cursor = 'grabbing'
    drag = { suffix, id, el: t }
  }

  function onPointerMove(e) {
    if (!drag) return
    e.preventDefault()
    const [x, y] = clientToSvg(svg, e.clientX, e.clientY)
    moveVertex(drag.suffix, drag.id, x, y)
  }

  function onPointerUp(e) {
    if (!drag) return
    drag.el.style.cursor = 'grab'
    try {
      drag.el.releasePointerCapture(e.pointerId)
    } catch {
      /* */
    }
    drag = null
  }

  handlesLayer.addEventListener('pointerdown', onPointerDown)
  svg.addEventListener('pointermove', onPointerMove)
  svg.addEventListener('pointerup', onPointerUp)
  svg.addEventListener('pointercancel', onPointerUp)

  function getEditDocument() {
    return packEditDoc({
      letterSLocal: localFromAbsolute(letterS, sOrigin, 12),
      letterZLocal: localFromAbsolute(letterZ, zOrigin, 12),
      endLFav: vertsToFav(endL),
      endRFav: vertsToFav(endR),
      sOrigin,
      zOrigin,
    })
  }

  function loadEditDocument(doc) {
    if (!doc || typeof doc !== 'object') throw new Error('invalid edit document')
    if (doc.sOrigin) sOrigin = { x: doc.sOrigin.x, y: doc.sOrigin.y }
    if (doc.zOrigin) zOrigin = { x: doc.zOrigin.x, y: doc.zOrigin.y }
    const sLocal = doc.letterSLocal || doc.startSLocal
    const zLocal = doc.letterZLocal || doc.startZLocal
    if (sLocal) letterS = letterVertsAbsolute(sLocal, sOrigin)
    if (zLocal) letterZ = letterVertsAbsolute(zLocal, zOrigin)
    if (doc.endLFav) endL = favToCanvas(doc.endLFav)
    if (doc.endRFav) endR = favToCanvas(doc.endRFav)
    if (editMode !== 'off') setEditMode(editMode)
    else applyFrame(lastU)
  }

  if (prefersReducedMotion()) {
    secondary.forEach((n) => {
      n.style.opacity = '0'
    })
    applyFrame(1)
  } else if (options.autoplay) {
    play()
  } else {
    applyFrame(0)
  }

  return {
    play,
    pause,
    destroy,
    seek,
    step,
    getProgress,
    getDuration,
    setShowIds,
    setEditMode,
    getEditDocument,
    loadEditDocument,
    el: svg,
  }
}

export default { mount }
