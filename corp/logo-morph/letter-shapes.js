/**
 * Helvetica Neue Bold S/Z in font units (y-up, origin = glyph origin).
 * Place with: x = textX + fx * (size/upem), y = baseline - fy * (size/upem).
 *
 * Z pieces: top/bottom rectangles + mid parallelogram.
 * S pieces: same outline, three y-bands (clip); mid is one piece.
 */
export const FONT_GLYPHS = {"upem":1000,"S":{"d":"M176.00 237.00L24.00 237.00L24.00 226.95L24.31 217.12L24.92 207.50L25.85 198.09L27.08 188.89L28.62 179.91L30.46 171.14L32.62 162.59L35.08 154.24L37.85 146.11L40.92 138.20L44.31 130.49L48.00 123.00L51.95 115.72L56.11 108.63L60.47 101.75L65.04 95.07L69.82 88.59L74.80 82.31L80.00 76.24L85.40 70.36L91.00 64.69L96.82 59.21L102.84 53.94L109.07 48.87L115.50 44.00L122.12 39.33L128.88 34.85L135.81 30.57L142.88 26.49L150.12 22.59L157.50 18.90L165.04 15.40L172.73 12.09L180.58 8.99L188.58 6.07L196.73 3.35L205.04 0.83L213.50 -1.50L222.06 -3.64L230.66 -5.62L239.30 -7.42L247.99 -9.05L256.71 -10.51L265.48 -11.80L274.28 -12.91L283.13 -13.86L292.02 -14.63L300.96 -15.23L309.93 -15.66L318.94 -15.91L328.00 -16.00L339.13 -15.90L350.05 -15.60L360.76 -15.09L371.27 -14.39L381.57 -13.49L391.66 -12.38L401.54 -11.07L411.22 -9.56L420.69 -7.85L429.95 -5.94L439.01 -3.83L447.86 -1.51L456.50 1.00L464.93 3.70L473.15 6.55L481.16 9.57L488.95 12.74L496.53 16.07L503.90 19.57L511.05 23.22L517.99 27.04L524.72 31.01L531.23 35.14L537.54 39.43L543.62 43.89L549.50 48.50L555.16 53.26L560.60 58.16L565.82 63.19L570.83 68.36L575.61 73.66L580.17 79.10L584.52 84.68L588.65 90.39L592.56 96.24L596.25 102.23L599.72 108.35L602.97 114.61L606.00 121.00L608.81 127.50L611.40 134.09L613.76 140.76L615.89 147.51L617.80 154.34L619.49 161.26L620.95 168.26L622.19 175.34L623.20 182.51L623.99 189.76L624.55 197.09L624.89 204.50L625.00 212.00L624.85 221.10L624.40 229.95L623.64 238.55L622.59 246.89L621.23 254.97L619.57 262.80L617.61 270.38L615.34 277.70L612.78 284.77L609.91 291.59L606.74 298.14L603.27 304.45L599.50 310.50L595.52 316.33L591.43 321.98L587.22 327.44L582.91 332.72L578.48 337.82L573.94 342.74L569.28 347.47L564.52 352.01L559.64 356.38L554.65 360.56L549.54 364.56L544.33 368.37L539.00 372.00L533.61 375.46L528.22 378.78L522.82 381.95L517.41 384.97L512.00 387.84L506.59 390.57L501.16 393.14L495.73 395.57L490.30 397.86L484.86 399.99L479.41 401.97L473.96 403.81L468.50 405.50L463.13 407.08L457.94 408.58L452.94 410.00L448.12 411.35L443.49 412.62L439.03 413.81L434.76 414.92L430.68 415.96L426.78 416.92L423.06 417.81L419.52 418.62L416.17 419.35L413.00 420.00L402.84 422.58L392.99 425.09L383.43 427.53L374.18 429.89L365.23 432.19L356.59 434.41L348.24 436.57L340.20 438.65L332.45 440.66L325.01 442.60L317.87 444.47L311.04 446.27L304.50 448.00L298.22 449.69L292.16 451.38L286.30 453.08L280.67 454.77L275.24 456.46L270.03 458.15L265.03 459.85L260.24 461.54L255.67 463.23L251.30 464.92L247.16 466.62L243.22 468.31L239.50 470.00L235.98 471.70L232.64 473.43L229.48 475.18L226.51 476.96L223.72 478.76L221.11 480.58L218.69 482.43L216.45 484.30L214.39 486.19L212.52 488.11L210.83 490.05L209.32 492.01L208.00 494.00L206.82 496.05L205.73 498.19L204.73 500.43L203.83 502.76L203.03 505.18L202.32 507.70L201.70 510.32L201.18 513.03L200.76 515.83L200.43 518.73L200.19 521.73L200.05 524.82L200.00 528.00L200.06 531.49L200.24 534.89L200.53 538.19L200.95 541.40L201.48 544.51L202.13 547.53L202.90 550.45L203.79 553.28L204.79 556.01L205.92 558.65L207.16 561.20L208.52 563.64L210.00 566.00L211.57 568.28L213.21 570.50L214.91 572.66L216.67 574.76L218.51 576.80L220.40 578.78L222.36 580.70L224.39 582.57L226.48 584.37L228.64 586.12L230.86 587.80L233.15 589.43L235.50 591.00L237.91 592.50L240.35 593.93L242.84 595.30L245.37 596.59L247.94 597.80L250.55 598.95L253.21 600.03L255.90 601.04L258.64 601.97L261.42 602.83L264.24 603.63L267.10 604.35L270.00 605.00L272.92 605.59L275.85 606.14L278.77 606.63L281.69 607.08L284.62 607.49L287.54 607.84L290.46 608.15L293.38 608.41L296.31 608.62L299.23 608.79L302.15 608.91L305.08 608.98L308.00 609.00L312.43 608.97L316.82 608.88L321.14 608.73L325.42 608.53L329.64 608.26L333.81 607.93L337.93 607.55L341.99 607.11L346.00 606.60L349.95 606.04L353.86 605.42L357.70 604.74L361.50 604.00L365.24 603.19L368.91 602.30L372.51 601.32L376.06 600.26L379.53 599.12L382.94 597.89L386.29 596.59L389.57 595.20L392.79 593.72L395.94 592.17L399.02 590.53L402.04 588.80L405.00 587.00L407.88 585.10L410.67 583.09L413.37 580.98L415.98 578.76L418.51 576.44L420.94 574.01L423.29 571.47L425.54 568.82L427.71 566.07L429.79 563.21L431.78 560.25L433.69 557.18L435.50 554.00L437.21 550.70L438.81 547.28L440.30 543.72L441.68 540.04L442.94 536.22L444.09 532.27L445.13 528.20L446.06 523.99L446.87 519.65L447.57 515.18L448.16 510.59L448.64 505.86L449.00 501.00L601.00 501.00L600.86 510.43L600.44 519.64L599.75 528.63L598.78 537.40L597.52 545.96L595.99 554.29L594.19 562.41L592.10 570.30L589.74 577.98L587.09 585.44L584.17 592.68L580.98 599.70L577.50 606.50L573.79 613.10L569.88 619.52L565.78 625.75L561.48 631.80L556.98 637.67L552.29 643.35L547.41 648.85L542.33 654.17L537.05 659.30L531.58 664.25L525.92 669.02L520.06 673.60L514.00 678.00L507.78 682.22L501.42 686.25L494.93 690.10L488.30 693.76L481.53 697.25L474.63 700.54L467.59 703.66L460.41 706.59L453.10 709.34L445.66 711.91L438.07 714.29L430.36 716.49L422.50 718.50L414.55 720.35L406.55 722.05L398.49 723.60L390.38 725.01L382.22 726.27L374.00 727.38L365.73 728.34L357.41 729.15L349.04 729.82L340.61 730.33L332.12 730.70L323.59 730.93L315.00 731.00L307.62 730.92L300.23 730.69L292.85 730.31L285.46 729.77L278.08 729.08L270.69 728.23L263.31 727.23L255.92 726.08L248.54 724.77L241.15 723.31L233.77 721.69L226.38 719.92L219.00 718.00L211.67 715.92L204.47 713.67L197.38 711.25L190.41 708.67L183.56 705.93L176.82 703.02L170.21 699.94L163.71 696.70L157.33 693.29L151.07 689.72L144.93 685.98L138.91 682.07L133.00 678.00L127.24 673.77L121.65 669.37L116.23 664.82L110.99 660.11L105.91 655.23L101.01 650.20L96.28 645.01L91.72 639.66L87.33 634.14L83.12 628.47L79.07 622.64L75.20 616.65L71.50 610.50L68.02 604.18L64.83 597.70L61.91 591.04L59.26 584.20L56.90 577.20L54.81 570.03L53.01 562.68L51.48 555.16L50.22 547.47L49.25 539.61L48.56 531.58L48.14 523.38L48.00 515.00L48.11 507.55L48.44 500.27L48.99 493.16L49.75 486.22L50.74 479.45L51.94 472.86L53.36 466.43L55.01 460.18L56.87 454.10L58.95 448.20L61.25 442.46L63.76 436.89L66.50 431.50L69.41 426.26L72.46 421.16L75.65 416.19L78.97 411.36L82.43 406.66L86.03 402.10L89.76 397.68L93.62 393.39L97.63 389.24L101.77 385.23L106.04 381.35L110.45 377.61L115.00 374.00L119.66 370.51L124.42 367.12L129.27 363.84L134.22 360.65L139.26 357.57L144.40 354.58L149.63 351.70L154.95 348.91L160.37 346.23L165.89 343.64L171.50 341.16L177.20 338.78L183.00 336.50L188.86 334.30L194.74 332.14L200.64 330.05L206.57 328.00L212.53 326.01L218.50 324.07L224.50 322.19L230.53 320.36L236.57 318.58L242.64 316.86L248.74 315.18L254.86 313.57L261.00 312.00L266.99 310.32L272.98 308.66L278.95 307.03L284.91 305.42L290.85 303.83L296.79 302.27L302.71 300.73L308.62 299.22L314.52 297.73L320.41 296.26L326.28 294.82L332.15 293.40L338.00 292.00L343.80 290.60L349.50 289.16L355.11 287.69L360.63 286.18L366.05 284.63L371.37 283.05L376.60 281.44L381.74 279.79L386.78 278.10L391.73 276.38L396.58 274.62L401.34 272.83L406.00 271.00L410.55 269.12L414.96 267.17L419.23 265.14L423.37 263.05L427.38 260.88L431.24 258.64L434.97 256.34L438.57 253.96L442.03 251.51L445.35 248.99L448.54 246.40L451.59 243.73L454.50 241.00L457.24 238.17L459.75 235.20L462.05 232.11L464.13 228.88L465.99 225.53L467.64 222.04L469.06 218.43L470.26 214.68L471.25 210.80L472.01 206.80L472.56 202.66L472.89 198.40L473.00 194.00L472.92 189.90L472.67 185.92L472.25 182.04L471.67 178.28L470.93 174.64L470.02 171.10L468.94 167.68L467.70 164.37L466.29 161.17L464.72 158.08L462.98 155.11L461.07 152.25L459.00 149.50L456.80 146.85L454.53 144.29L452.17 141.82L449.72 139.44L447.20 137.15L444.59 134.94L441.89 132.83L439.12 130.80L436.26 128.86L433.32 127.01L430.30 125.25L427.19 123.58L424.00 122.00L420.75 120.50L417.47 119.08L414.15 117.73L410.79 116.46L407.40 115.27L403.98 114.15L400.51 113.12L397.02 112.15L393.49 111.27L389.92 110.46L386.31 109.73L382.67 109.08L379.00 108.50L375.33 107.98L371.69 107.51L368.08 107.07L364.51 106.68L360.98 106.33L357.49 106.01L354.02 105.75L350.60 105.52L347.21 105.33L343.85 105.19L340.53 105.08L337.25 105.02L334.00 105.00L329.24 105.04L324.51 105.18L319.80 105.40L315.11 105.71L310.45 106.11L305.81 106.60L301.20 107.17L296.60 107.84L292.04 108.59L287.49 109.44L282.97 110.37L278.47 111.39L274.00 112.50L269.58 113.70L265.25 115.00L261.01 116.39L256.86 117.87L252.80 119.45L248.83 121.13L244.94 122.90L241.15 124.76L237.44 126.72L233.82 128.77L230.29 130.92L226.85 133.16L223.50 135.50L220.24 137.94L217.09 140.49L214.03 143.16L211.07 145.94L208.22 148.83L205.46 151.83L202.81 154.95L200.26 158.17L197.80 161.51L195.45 164.97L193.20 168.53L191.05 172.21L189.00 176.00L187.08 179.91L185.31 183.95L183.69 188.12L182.23 192.43L180.92 196.86L179.77 201.42L178.77 206.11L177.92 210.93L177.23 215.89L176.69 220.97L176.31 226.18L176.08 231.53Z","bounds":[23.96153846153846,-16,625,731],"advance":649,"seams":[491.96000000000004,223.03999999999996]},"Z":{"d":"M23.00 124.00L23.00 0.00L625.00 0.00L625.00 132.00L232.00 132.00L615.00 590.00L615.00 714.00L53.00 714.00L53.00 582.00L406.00 582.00Z","bounds":[23,0,625,714],"advance":648,"pieces":["M53.00 714.00L615.00 714.00L615.00 582.00L53.00 582.00Z","M232.00 132.00L615.00 590.00L406.00 582.00L23.00 124.00Z","M23.00 132.00L625.00 132.00L625.00 0.00L23.00 0.00Z"]}}


function round(n) {
  return Math.round(n * 100) / 100
}

/** Font-unit (y-up) → SVG (y-down) at text origin. */
export function placeFontPt(fx, fy, textX, baseline, size, upem = FONT_GLYPHS.upem) {
  const s = size / upem
  return [round(textX + fx * s), round(baseline - fy * s)]
}

/** Map font-unit path (y-up) → SVG (y-down) at text position. */
export function placeFontPath(d, textX, baseline, size, upem = FONT_GLYPHS.upem) {
  const s = size / upem
  return d.replace(/([ML])(-?[\d.]+)[ ,]*(-?[\d.]+)/g, (_, cmd, x, y) => {
    return `${cmd}${round(textX + +x * s)} ${round(baseline - +y * s)}`
  })
}

/** Parse simple M/L/Z path into point rings (SVG coords). */
export function pathToRings(d) {
  const rings = []
  let cur = []
  const re = /([MLZ])\s*(-?[\d.]+)?\s*(-?[\d.]+)?/gi
  let m
  while ((m = re.exec(d))) {
    const cmd = m[1].toUpperCase()
    if (cmd === 'Z') {
      if (cur.length) rings.push(cur)
      cur = []
    } else if (cmd === 'M' || cmd === 'L') {
      if (cmd === 'M' && cur.length) {
        rings.push(cur)
        cur = []
      }
      cur.push([+m[2], +m[3]])
    }
  }
  if (cur.length) rings.push(cur)
  return rings
}

export function superPt(cx, cy, rx, ry, theta, n = 2.45) {
  const c = Math.cos(theta)
  const s = Math.sin(theta)
  const ax = Math.abs(c)
  const ay = Math.abs(s)
  const px = ax < 1e-12 ? 0 : rx * Math.sign(c) * ax ** (2 / n)
  const py = ay < 1e-12 ? 0 : ry * Math.sign(s) * ay ** (2 / n)
  return [cx + px, cy + py]
}

/**
 * Build Z pieces at a text anchor.
 * @returns pieces in SVG coords
 */
export function buildZAt(textX, baseline, size = 96) {
  const g = FONT_GLYPHS.Z
  const ids = ['Z1', 'Z2', 'Z3']
  const pieces = g.pieces.map((d, i) => ({
    id: ids[i],
    d: placeFontPath(d, textX, baseline, size),
  }))
  return {
    pieces,
    full: placeFontPath(g.d, textX, baseline, size),
    advance: (g.advance * size) / FONT_GLYPHS.upem,
  }
}

/**
 * Build S as three clipped bands of the real outline (mid = one piece).
 */
export function buildSAt(textX, baseline, size = 96) {
  const g = FONT_GLYPHS.S
  const s = size / FONT_GLYPHS.upem
  const full = placeFontPath(g.d, textX, baseline, size)
  const [seam1, seam2] = g.seams // font y-up
  // SVG y of seams (higher font y → smaller SVG y)
  const yTop = baseline - g.bounds[3] * s
  const y1 = baseline - seam1 * s
  const y2 = baseline - seam2 * s
  const yBot = baseline - g.bounds[1] * s
  const x0 = textX + g.bounds[0] * s
  const w = (g.bounds[2] - g.bounds[0]) * s
  const pieces = [
    { id: 'S1', d: full, clip: { x: x0, y: yTop, w, h: y1 - yTop } },
    { id: 'S2', d: full, clip: { x: x0, y: y1, w, h: y2 - y1 } },
    { id: 'S3', d: full, clip: { x: x0, y: y2, w, h: yBot - y2 } },
  ]
  return {
    pieces,
    full,
    advance: (g.advance * size) / FONT_GLYPHS.upem,
  }
}

/**
 * 12 morph verts + cut ink for Z (rect + parallelogram + rect).
 * Ids match QUAD_IDS.R / LETTER_SEAM_LINKS.Z.
 */
export function layoutZMorph(textX, baseline, size = 96) {
  const P = (fx, fy) => placeFontPt(fx, fy, textX, baseline, size)
  // Top bar TL TR BR BL. The diagonal's outer corner is this same
  // bottom-right point, so the cap lies on the bar edge instead of
  // crossing into the bar.
  const TL = P(53, 714)
  const TR = P(615, 714)
  const BR = P(615, 582)
  const BL = P(53, 582)
  // Diagonal (parallelogram). Cap sits on the bar's bottom edge.
  const DTR = BR
  const DTL = P(406, 582)
  const DBL = P(23, 124)
  const DBR = P(232, 132)
  // Bottom bar — full rectangle. Not the diagonal foot (that made a triangle).
  const BTL = P(23, 132)
  const BTR = P(625, 132)
  const BBR = P(625, 0)
  const BBL = P(23, 0)

  /** @type {Record<number, [number, number]>} */
  const verts = {
    1: TL,
    2: BL,
    3: TR,
    4: BR,
    // Mid parallelogram: horizontal cap along the bar bottom (outer
    // corner shared with the bar), horizontal foot on the bottom bar.
    5: DTR,
    6: DTL,
    7: DBR,
    8: DBL,
    // Bottom rectangle, walk TL → BL → BR → TR
    9: BTL,
    10: BBL,
    11: BBR,
    12: BTR,
  }

  const built = buildZAt(textX, baseline, size)
  // Morph start quads in QUAD_IDS.R winding (matches cut ink).
  const morphPts = [
    [verts[1], verts[3], verts[4], verts[2]],
    [verts[5], verts[6], verts[8], verts[7]],
    [verts[9], verts[10], verts[11], verts[12]],
  ]
  return {
    verts,
    morphPts,
    pieces: built.pieces.map((p, i) => {
      const ring = pathToRings(p.d)[0] || []
      return { ...p, points: ring }
    }),
    full: built.full,
    advance: built.advance,
  }
}

/**
 * Straight S = horizontal mirror of Z's three quads.
 * Top and bottom bars are the full rectangles. The diagonal is Z's
 * parallelogram mirrored: horizontal cap on the left, horizontal foot
 * on the bottom-right. Same thickness, not a vertical stub.
 */
export function layoutStraightS(textX, baseline, size = 96) {
  const P = (fx, fy) => placeFontPt(fx, fy, textX, baseline, size)
  const mx = (x) => 23 + 625 - x

  // Top bar is the mirror of Z's. Copying Z's x range left the diagonal's
  // outer corner (mirror of x=615) 20 units left of the bar.
  const TL = P(mx(615), 714)
  const TR = P(mx(53), 714)
  const BR = P(mx(53), 582)
  const BL = P(mx(615), 582)

  // Mirror of Z diagonal. Cap is the bar's bottom edge; outer corner is BL.
  const capL = BL
  const capR = P(mx(406), 582)
  const footR = P(mx(23), 124)
  const footL = P(mx(232), 132)

  /** @type {Record<number, [number, number]>} */
  const verts = {
    // Top rectangle. Outer feet rise: 3→TL, 1→TR; inner feet drop: 4→BL, 2→BR
    2: BR,
    1: TR,
    3: TL,
    4: BL,
    // Diagonal, walk capL → capR → footR → footL (mirror of Z's 5→6→8→7).
    // 5 shares the bar's bottom-left. 7 is the right end of the foot.
    5: capL,
    6: capR,
    7: footR,
    8: footL,
    // Full bottom rectangle. Arc walk 12→11→9→10 = RB → RT → LT → LB
    12: P(625, 0),
    11: P(625, 132),
    9: P(23, 132),
    10: P(23, 0),
  }

  return {
    verts,
    morphPts: [
      [verts[2], verts[1], verts[3], verts[4]],
      [verts[5], verts[6], verts[7], verts[8]],
      [verts[12], verts[11], verts[9], verts[10]],
    ],
  }
}

function clipHalfPlane(poly, inside, cut) {
  if (!poly.length) return []
  const out = []
  const n = poly.length
  for (let i = 0; i < n; i++) {
    const a = poly[i]
    const b = poly[(i + 1) % n]
    const ain = inside(a)
    const bin = inside(b)
    if (ain && bin) out.push(b)
    else if (ain && !bin) out.push(cut(a, b))
    else if (!ain && bin) {
      out.push(cut(a, b))
      out.push(b)
    }
  }
  return out
}

function cutAtY(a, b, y) {
  const dy = b[1] - a[1]
  const t = Math.abs(dy) < 1e-12 ? 0 : (y - a[1]) / dy
  return [a[0] + (b[0] - a[0]) * t, y]
}

function dedupeRing(poly, eps = 0.08) {
  const out = []
  for (const p of poly) {
    const q = out[out.length - 1]
    if (!q || Math.hypot(q[0] - p[0], q[1] - p[1]) > eps) out.push(p)
  }
  if (out.length > 2 && Math.hypot(out[0][0] - out[out.length - 1][0], out[0][1] - out[out.length - 1][1]) < eps) {
    out.pop()
  }
  return out
}

/** Closed ring clipped to SVG y band [yLo, yHi]. */
export function clipRingToBand(ring, yLo, yHi) {
  let poly = clipHalfPlane(ring, (p) => p[1] >= yLo - 1e-4, (a, b) => cutAtY(a, b, yLo))
  poly = clipHalfPlane(poly, (p) => p[1] <= yHi + 1e-4, (a, b) => cutAtY(a, b, yHi))
  return dedupeRing(poly)
}

/** Even-odd test. Used to tell an ink cut from a chord across the counter. */
function ringContains(ring, pt) {
  let c = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0]
    const yi = ring[i][1]
    const xj = ring[j][0]
    const yj = ring[j][1]
    if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c
  }
  return c
}

function nearestIndex(poly, pt) {
  let bi = 0
  let bd = Infinity
  for (let i = 0; i < poly.length; i++) {
    const d = Math.hypot(poly[i][0] - pt[0], poly[i][1] - pt[1])
    if (d < bd) {
      bd = d
      bi = i
    }
  }
  return bi
}

function walkChain(poly, i0, i1, step) {
  const n = poly.length
  const pts = []
  const idxs = []
  let i = i0
  for (;;) {
    pts.push(poly[i])
    idxs.push(i)
    if (i === i1) break
    i = (i + step + n) % n
    if (pts.length > n) break
  }
  return { pts, idxs }
}

function pointAtArcLength(pts, acc, target) {
  let i = 1
  while (i < pts.length - 1 && acc[i] < target) i++
  const span = acc[i] - acc[i - 1] || 1
  const u = Math.min(1, Math.max(0, (target - acc[i - 1]) / span))
  const a = pts[i - 1]
  const b = pts[i]
  return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]
}

function arcLengths(pts) {
  const acc = [0]
  for (let i = 1; i < pts.length; i++) {
    acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]))
  }
  return acc
}

/** Cubic controls for a chain, as chord-frame offsets of the 1/3 and 2/3 handles. */
function cubicHandles(pts) {
  if (pts.length < 3) return [0, 0, 0, 0]
  const acc = arcLengths(pts)
  const total = acc[acc.length - 1]
  if (total < 0.5) return [0, 0, 0, 0]
  const P0 = pts[0]
  const P3 = pts[pts.length - 1]
  const Q1 = pointAtArcLength(pts, acc, total / 3)
  const Q2 = pointAtArcLength(pts, acc, (2 * total) / 3)
  const Ru = [
    Q1[0] - (8 / 27) * P0[0] - (1 / 27) * P3[0],
    Q1[1] - (8 / 27) * P0[1] - (1 / 27) * P3[1],
  ]
  const Rv = [
    Q2[0] - (1 / 27) * P0[0] - (8 / 27) * P3[0],
    Q2[1] - (1 / 27) * P0[1] - (8 / 27) * P3[1],
  ]
  const C1 = [3 * Ru[0] - 1.5 * Rv[0], 3 * Ru[1] - 1.5 * Rv[1]]
  const C2 = [-1.5 * Ru[0] + 3 * Rv[0], -1.5 * Ru[1] + 3 * Rv[1]]
  const dx = P3[0] - P0[0]
  const dy = P3[1] - P0[1]
  const len = Math.hypot(dx, dy) || 1
  const tx = dx / len
  const ty = dy / len
  const nx = -dy / len
  const ny = dx / len
  const frame = (C, u) => {
    const ox = C[0] - (P0[0] + dx * u)
    const oy = C[1] - (P0[1] + dy * u)
    return [ox * tx + oy * ty, ox * nx + oy * ny]
  }
  const h1 = frame(C1, 1 / 3)
  const h2 = frame(C2, 2 / 3)
  const mag = Math.hypot(h1[0], h1[1]) + Math.hypot(h2[0], h2[1])
  if (mag < 0.4) return [0, 0, 0, 0]
  return [h1[0], h1[1], h2[0], h2[1]].map((n) => Math.round(n * 100) / 100)
}

function cubicLeave(pts, handles) {
  if (pts.length < 3) return 0
  const P0 = pts[0]
  const P3 = pts[pts.length - 1]
  const dx = P3[0] - P0[0]
  const dy = P3[1] - P0[1]
  const len = Math.hypot(dx, dy) || 1
  const tx = dx / len
  const ty = dy / len
  const nx = -dy / len
  const ny = dx / len
  const ctrl = (u, a, n) => [
    P0[0] + dx * u + a * tx + n * nx,
    P0[1] + dy * u + a * ty + n * ny,
  ]
  const C1 = ctrl(1 / 3, handles[0], handles[1])
  const C2 = ctrl(2 / 3, handles[2], handles[3])
  let worst = 0
  for (let i = 0; i <= 48; i++) {
    const t = i / 48
    const u = 1 - t
    const x = u ** 3 * P0[0] + 3 * u * u * t * C1[0] + 3 * u * t * t * C2[0] + t ** 3 * P3[0]
    const y = u ** 3 * P0[1] + 3 * u * u * t * C1[1] + 3 * u * t * t * C2[1] + t ** 3 * P3[1]
    let md = Infinity
    for (const p of pts) md = Math.min(md, Math.hypot(p[0] - x, p[1] - y))
    if (md > worst) worst = md
  }
  return worst
}

/**
 * One cubic, or two/three where a single cubic leaves the outline
 * (an S-bend). Each piece is still a handful of curves, not a polyline.
 * @returns {{ f1: number, src1: [number, number], handles: number[] }[]}
 */
function fitEdge(pts, tol) {
  const total = arcLengths(pts).at(-1) || 1
  /** @type {{ pts: [number, number][], f1: number }[]} */
  const parts = []
  const split = (chain, depth) => {
    const handles = cubicHandles(chain)
    const leave = cubicLeave(chain, handles)
    if (leave <= tol || depth >= 2 || chain.length < 8) {
      parts.push({ pts: chain, f1: 0 })
      return
    }
    let worst = 0
    let wi = 1
    const P0 = chain[0]
    const P3 = chain[chain.length - 1]
    const dx = P3[0] - P0[0]
    const dy = P3[1] - P0[1]
    const len = Math.hypot(dx, dy) || 1
    const h = handles
    const tx = dx / len
    const ty = dy / len
    const nx = -dy / len
    const ny = dx / len
    const C1 = [P0[0] + dx / 3 + h[0] * tx + h[1] * nx, P0[1] + dy / 3 + h[0] * ty + h[1] * ny]
    const C2 = [P0[0] + (2 * dx) / 3 + h[2] * tx + h[3] * nx, P0[1] + (2 * dy) / 3 + h[2] * ty + h[3] * ny]
    for (let i = 2; i < chain.length - 2; i++) {
      let md = Infinity
      for (let s = 0; s <= 24; s++) {
        const t = s / 24
        const u = 1 - t
        const x = u ** 3 * P0[0] + 3 * u * u * t * C1[0] + 3 * u * t * t * C2[0] + t ** 3 * P3[0]
        const y = u ** 3 * P0[1] + 3 * u * u * t * C1[1] + 3 * u * t * t * C2[1] + t ** 3 * P3[1]
        md = Math.min(md, Math.hypot(chain[i][0] - x, chain[i][1] - y))
      }
      if (md > worst) {
        worst = md
        wi = i
      }
    }
    split(chain.slice(0, wi + 1), depth + 1)
    split(chain.slice(wi), depth + 1)
  }
  split(pts, 0)
  const acc = arcLengths(pts)
  return parts.map((part) => {
    const end = part.pts[part.pts.length - 1]
    let bi = 0
    let bd = Infinity
    for (let i = 0; i < pts.length; i++) {
      const d = Math.hypot(pts[i][0] - end[0], pts[i][1] - end[1])
      if (d < bd) {
        bd = d
        bi = i
      }
    }
    return {
      f1: Math.round((acc[bi] / total) * 1000) / 1000,
      src1: [Math.round(end[0] * 100) / 100, Math.round(end[1] * 100) / 100],
      handles: cubicHandles(part.pts),
    }
  })
}

/**
 * A horizontal run that lies on a band edge and stays inside the stroke
 * is the straight cut across that stroke (7–8 on the lower seam).
 * Fit it as one line. Cubic-fit only the curved remainder, so the cut
 * is not pulled into the bowl's curve.
 */
function fitEdgeKeepingCuts(chain, tol, yLo, yHi, ring, size, seamYs) {
  const yTol = Math.max(0.4, size * 0.012)
  const acc = arcLengths(chain)
  const total = acc[acc.length - 1] || 1
  const seam = (y) => seamYs.some((s) => Math.abs(s - y) < 0.01)
  const tagAt = (p) => {
    if (seam(yLo) && Math.abs(p[1] - yLo) < yTol) return 'lo'
    if (seam(yHi) && Math.abs(p[1] - yHi) < yTol) return 'hi'
    return ''
  }
  /** @type {[number, number][]} */
  const cuts = []
  let i = 0
  while (i < chain.length) {
    const tag = tagAt(chain[i])
    if (!tag) {
      i++
      continue
    }
    let j = i
    while (j + 1 < chain.length && tagAt(chain[j + 1]) === tag) j++
    if (j > i) {
      const A = chain[i]
      const B = chain[j]
      const dx = Math.abs(B[0] - A[0])
      const dy = Math.abs(B[1] - A[1])
      const nudge = tag === 'lo' ? yTol : -yTol
      const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + nudge]
      if (dx > size * 0.04 && dy < dx * 0.25 && ringContains(ring, mid)) cuts.push([i, j])
    }
    i = j + 1
  }
  if (!cuts.length) return fitEdge(chain, tol)

  /** @type {[number, number, boolean][]} */
  const ranges = []
  let cursor = 0
  for (const [a, b] of cuts) {
    if (a > cursor) ranges.push([cursor, a, false])
    ranges.push([a, b, true])
    cursor = b
  }
  if (cursor < chain.length - 1) ranges.push([cursor, chain.length - 1, false])

  const rnd = (n) => Math.round(n * 100) / 100
  const segs = []
  for (const [a, b, straight] of ranges) {
    if (b <= a) continue
    const endF = Math.min(1, acc[b] / total)
    if (straight) {
      segs.push({
        f1: Math.round(endF * 1000) / 1000,
        src1: [rnd(chain[b][0]), rnd(chain[b][1])],
        handles: [0, 0, 0, 0],
      })
      continue
    }
    const sub = chain.slice(a, b + 1)
    const fitted = fitEdge(sub, tol)
    const subTotal = arcLengths(sub).at(-1) || 1
    const base = acc[a]
    fitted.forEach((seg, si) => {
      const full = si === fitted.length - 1 ? endF : (base + seg.f1 * subTotal) / total
      segs.push({
        f1: Math.round(Math.min(1, full) * 1000) / 1000,
        src1: seg.src1,
        handles: seg.handles,
      })
    })
  }
  if (segs.length) segs[segs.length - 1].f1 = 1
  return segs.length ? segs : fitEdge(chain, tol)
}

/**
 * S as three quads. Each side is one cubic taken from the outline;
 * the handles fall to 0, so the piece straightens into the mirrored Z.
 * Not a resampled polyline.
 */
export function sArcModel(textX, baseline, size = 96) {
  const curved = layoutSMorph(textX, baseline, size)
  const ring = pathToRings(curved.full)[0]
  const g = FONT_GLYPHS.S
  const sc = size / FONT_GLYPHS.upem
  const yTop = baseline - g.bounds[3] * sc
  const y1 = baseline - g.seams[0] * sc
  const y2 = baseline - g.seams[1] * sc
  const yBot = baseline - g.bounds[1] * sc
  const bands = [
    clipRingToBand(ring, yTop, y1),
    clipRingToBand(ring, y1, y2),
    clipRingToBand(ring, y2, yBot),
  ]
  // Boundary order of each band, which is also the straight quad (no bowtie).
  const orders = [
    [4, 2, 1, 3],
    [8, 7, 6, 5],
    [12, 11, 9, 10],
  ]
  const yLo = [yTop, y1, y2]
  const yHi = [y1, y2, yBot]
  const pieces = bands.map((poly, bi) => {
    const ids = orders[bi]
    /** @type {Record<number, number>} */
    const indexOf = {}
    for (const id of ids) indexOf[id] = nearestIndex(poly, curved.verts[id])
    const src = []
    const edges = []
    const tol = size / 70
    for (let k = 0; k < ids.length; k++) {
      const idA = ids[k]
      const idB = ids[(k + 1) % ids.length]
      const A = poly[indexOf[idA]]
      const B = poly[indexOf[idB]]
      // A straight seam cut only if the span between the two corners is ink.
      // The clipped ring also has chords across the counter; those must not
      // pull a spine corner over to the bottom bar.
      const onLo = Math.abs(A[1] - yLo[bi]) < 0.8 && Math.abs(B[1] - yLo[bi]) < 0.8
      const onHi = Math.abs(A[1] - yHi[bi]) < 0.8 && Math.abs(B[1] - yHi[bi]) < 0.8
      const nudge = onLo ? 0.8 : -0.8
      const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2 + nudge]
      if ((onLo || onHi) && ringContains(ring, mid)) {
        src.push([A[0], A[1]])
        edges.push(fitEdge([A, B], tol))
        continue
      }
      const blocked = new Set(
        ids.filter((id) => id !== idA && id !== idB).map((id) => indexOf[id]),
      )
      const fwd = walkChain(poly, indexOf[idA], indexOf[idB], 1)
      const back = walkChain(poly, indexOf[idA], indexOf[idB], -1)
      const hits = (w) => w.idxs.some((ix, n) => n > 0 && n < w.idxs.length - 1 && blocked.has(ix))
      const chain = hits(fwd) && !hits(back) ? back.pts : fwd.pts
      src.push([chain[0][0], chain[0][1]])
      edges.push(fitEdgeKeepingCuts(chain, tol, yLo[bi], yHi[bi], ring, size, [y1, y2]))
    }
    return { ids, src, edges }
  })
  return { pieces }
}

function cubicCommand(A, B, h, k, r) {
  const mag = (Math.hypot(h[0], h[1]) + Math.hypot(h[2], h[3])) * Math.abs(k)
  if (mag < 0.35) return `L${r(B[0])} ${r(B[1])}`
  const dx = B[0] - A[0]
  const dy = B[1] - A[1]
  const len = Math.hypot(dx, dy) || 1
  const tx = dx / len
  const ty = dy / len
  const nx = -dy / len
  const ny = dx / len
  const c1x = A[0] + dx / 3 + (h[0] * tx + h[1] * nx) * k
  const c1y = A[1] + dy / 3 + (h[0] * ty + h[1] * ny) * k
  const c2x = A[0] + (2 * dx) / 3 + (h[2] * tx + h[3] * nx) * k
  const c2y = A[1] + (2 * dy) / 3 + (h[2] * ty + h[3] * ny) * k
  return `C${r(c1x)} ${r(c1y)} ${r(c2x)} ${r(c2y)} ${r(B[0])} ${r(B[1])}`
}

/**
 * Closed outline. `edges[i]` is the cubics along that side.
 * `k` scales the bend (1 = letter, 0 = straight). A bend that needed
 * two cubics pulls its joint onto the straight edge as k falls.
 */
export function arcPath(corners, edges, k = 1) {
  const r = (n) => Math.round(n * 100) / 100
  const straighten = 1 - k
  let d = `M${r(corners[0][0])} ${r(corners[0][1])}`
  for (let i = 0; i < corners.length; i++) {
    const A = corners[i]
    const B = corners[(i + 1) % corners.length]
    const segs = edges[i] || []
    let cursor = A
    for (let s = 0; s < segs.length; s++) {
      const seg = segs[s]
      const last = s === segs.length - 1
      const onChord = [
        A[0] + (B[0] - A[0]) * seg.f1,
        A[1] + (B[1] - A[1]) * seg.f1,
      ]
      const end = last
        ? B
        : [
            seg.src1[0] + (onChord[0] - seg.src1[0]) * straighten,
            seg.src1[1] + (onChord[1] - seg.src1[1]) * straighten,
          ]
      d += cubicCommand(cursor, end, seg.handles, k, r)
      cursor = end
    }
  }
  return `${d}Z`
}

/**
 * 12 morph verts + cut ink for S (outline × 3 y-bands; mid = one piece).
 * Seam crossings from Helvetica Bold; ids match QUAD_IDS.L.
 */
export function layoutSMorph(textX, baseline, size = 96) {
  const P = (fx, fy) => placeFontPt(fx, fy, textX, baseline, size)
  const g = FONT_GLYPHS.S
  const [seam1, seam2] = g.seams
  // Top arch feet (matches straighten: outer→bar top, inner→bar bottom)
  // 1 outer-right tip · 2 inner-right of opening · 3 outer-left · 4 inner-left
  const tipT = P(601, 501) // outer right of top opening
  const tipTInner = P(449, 501) // inner right (counter flat)
  const cut1O = P(49.12, seam1)
  const cut1I = P(209.37, seam1)
  // Lower seam, same arrangement as the top arch:
  // left pair is the free end (10 outer, 9 inner), right pair is the
  // end that meets the spine (12 outer with 7, 11 inner with 8).
  // The heel stays on the outer curve; it is not a corner.
  const cut2O = P(24.11, seam2)
  const cut2I = P(176.52, seam2)
  const midFootL = P(467.17, seam2)
  const midFootR = P(624.75, seam2)

  /** @type {Record<number, [number, number]>} */
  const verts = {
    1: tipT,
    2: tipTInner,
    3: cut1O,
    4: cut1I,
    5: cut1O,
    6: cut1I,
    7: midFootR,
    8: midFootL,
    9: cut2I,
    10: cut2O,
    11: midFootL,
    12: midFootR,
  }
  verts[5] = [...verts[3]]
  verts[6] = [...verts[4]]
  verts[11] = [...verts[8]]
  verts[12] = [...verts[7]]

  const built = buildSAt(textX, baseline, size)
  const morphPts = [
    [verts[2], verts[1], verts[3], verts[4]],
    [verts[5], verts[6], verts[7], verts[8]],
    [verts[12], verts[11], verts[9], verts[10]],
  ]
  return {
    verts,
    morphPts,
    pieces: built.pieces,
    full: built.full,
    advance: built.advance,
  }
}

/** Legacy API: build in local bbox then placePieces — prefer buildSAt/buildZAt. */
export function buildS(W, H) {
  // Approximate: treat as if size chosen so ink height ≈ H
  const g = FONT_GLYPHS.S
  const inkH = g.bounds[3] - g.bounds[1]
  const size = (H * FONT_GLYPHS.upem) / inkH
  const textX = (-g.bounds[0] * size) / FONT_GLYPHS.upem
  const baseline = (g.bounds[3] * size) / FONT_GLYPHS.upem
  const built = buildSAt(textX, baseline, size)
  return {
    size: { w: W, h: H },
    pieces: built.pieces,
    full: built.full,
    verts: {},
  }
}

export function buildZ(W, H) {
  const g = FONT_GLYPHS.Z
  const inkH = g.bounds[3] - g.bounds[1]
  const size = (H * FONT_GLYPHS.upem) / inkH
  const textX = (-g.bounds[0] * size) / FONT_GLYPHS.upem
  const baseline = (g.bounds[3] * size) / FONT_GLYPHS.upem
  const built = buildZAt(textX, baseline, size)
  return {
    size: { w: W, h: H },
    pieces: built.pieces,
    full: built.full,
    verts: {},
  }
}

export function placePieces(built, origin) {
  // buildS/buildZ already local; origin shifts
  const { x, y } = origin
  const mapD = (d) =>
    d.replace(/([ML])(-?[\d.]+)[ ,]+(-?[\d.]+)/g, (_, cmd, px, py) => {
      return `${cmd}${round(+px + x)} ${round(+py + y)}`
    })
  return {
    size: built.size,
    full: built.full ? mapD(built.full) : undefined,
    pieces: built.pieces.map((p) => ({
      ...p,
      d: mapD(p.d),
      clip: p.clip
        ? { x: p.clip.x + x, y: p.clip.y + y, w: p.clip.w, h: p.clip.h }
        : undefined,
    })),
    verts: built.verts || {},
  }
}
