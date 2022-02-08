import { getRgb, RGB, round } from '@/utils/color'

export function getColorBarColor(x: number): RGB {
  if (x < 256) return [255, x, 0]
  x -= 256
  if (x < 256) return [255 - x, 255, 0]
  x -= 256
  if (x < 256) return [0, 255, x]
  x -= 256
  if (x < 256) return [0, 255 - x, 255]
  x -= 256
  if (x < 256) return [x, 0, 255]
  x -= 256
  // assert(x < 256)
  return [255, 0, 255 - x]
}

export function getColorBoardColor(
  basicColor: RGB, // [0 - 255] * 3
  brightness: number, // [0 - 1]
  saturation: number, // [0 - 1]
  rounded = true
): RGB {
  let [r, g, b] = basicColor
  r = saturation * (r + (255 - r) * brightness)
  g = saturation * (g + (255 - g) * brightness)
  b = saturation * (b + (255 - b) * brightness)
  if (rounded) {
    r = round(r)
    g = round(g)
    b = round(b)
  }
  return [r, g, b]
}

export function getColorBarValue(x: RGB): number {
  let base = 0
  const [r, g, b] = x
  if (r === 255 && b === 0) return base + g
  base += 256
  if (g === 255 && b === 0) return base + (255 - r)
  base += 256
  if (r === 0 && g === 255) return base + b
  base += 256
  if (r === 0 && b === 255) return base + (255 - g)
  base += 256
  if (g === 0 && b === 255) return base + r
  base += 256
  // r === 255 && g === 0
  return base + (255 - b)
}

export function getSourceValue(col: string): {
  bar: number
  board: number
} {
  const [r, g, b] = getRgb(col)
  let sat, bri, baseR, baseG, baseB

  function solveEquations(col: RGB): {
    sat: number
    g: number
    bri: number
  } {
    const [col1, col2, col3] = col
    // assume col1 <= col2 <= col3
    if (col3 === 0) {
      // #000000 is black
      return { sat: 0, g: 0, bri: 0 }
    } else if (col3 === col1) {
      // ## xxxxxx is black/white, this may be any color
      return { sat: col3 / 255, g: 255, bri: 1 }
    } else {
      return {
        sat: col3 / 255,
        g: (255 * (col2 - col1)) / (col3 - col1),
        bri: col1 / col3
      }
    }
  }

  if (r <= g && g <= b) {
    const res = solveEquations([r, g, b])
    sat = res.sat
    bri = res.bri
    baseR = 0
    baseG = round(res.g)
    baseB = 255
  } else if (r <= b && b <= g) {
    const res = solveEquations([r, b, g])
    sat = res.sat
    bri = res.bri
    baseR = 0
    baseB = round(res.g)
    baseG = 255
  } else if (g <= r && r <= b) {
    const res = solveEquations([g, r, b])
    sat = res.sat
    bri = res.bri
    baseG = 0
    baseR = round(res.g)
    baseB = 255
  } else if (g <= b && b <= r) {
    const res = solveEquations([g, b, r])
    sat = res.sat
    bri = res.bri
    baseG = 0
    baseB = round(res.g)
    baseR = 255
  } else if (b <= r && r <= g) {
    const res = solveEquations([b, r, g])
    sat = res.sat
    bri = res.bri
    baseB = 0
    baseR = round(res.g)
    baseG = 255
  } else {
    // b <= g && g <= r
    const res = solveEquations([b, g, r])
    sat = res.sat
    bri = res.bri
    baseB = 0
    baseG = round(res.g)
    baseR = 255
  }

  sat = round(sat * 255)
  bri = round(bri * 255)
  const bar = getColorBarValue([baseR, baseG, baseB])
  const board = (bri << 8) | sat
  return { bar, board }
}

export function getDestColor(barVal: number, boardVal: number): RGB {
  let [r, g, b] = getColorBarColor(barVal)
  const brightness = (boardVal >> 8) / 255
  const saturation = (boardVal & 0xff) / 255
  r = round(saturation * (r + (255 - r) * brightness))
  g = round(saturation * (g + (255 - g) * brightness))
  b = round(saturation * (b + (255 - b) * brightness))
  return [r, g, b]
}
