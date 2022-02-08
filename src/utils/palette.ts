import { Ref, watch } from 'vue'
import { getRgb, toRgb, toxicBlue } from '@/utils/color'

type RGB = [number, number, number]

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
    r = Math.round(r)
    g = Math.round(g)
    b = Math.round(b)
  }
  return [r, g, b]
}

function getColorBarValue(x: RGB): number {
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

export default class Palette {
  constructor(
    private bar: Ref<number>,
    private board: Ref<number>,
    private elBoard: HTMLElement
  ) {
    watch(bar, (o) => (elBoard.style.color = toRgb(getColorBarColor(o))))
  }

  get color(): string {
    // const basic = 
    let [r, g, b] = getRgb(this.elBoard.value)
    const brightness = (this.board.value >> 8) / 256
    const saturation = (this.board.value & 0xff) / 256
    r = Math.round(saturation * (r + (255 - r) * brightness))
    g = Math.round(saturation * (g + (255 - g) * brightness))
    b = Math.round(saturation * (b + (255 - b) * brightness))
    return toRgb([r, g, b])
  }

  private static _setColor(col: RGB): {
    sat: number
    g: number
    bri: number
  } {
    const [r, g, b] = col

    // assume r <= g <= b
    if (b === 0) {
      // #000000 is black
      return { sat: 0, g: 0, bri: 0 }
    } else if (b === r) {
      // ## xxxxxx is black/white, this may be any color
      // return toxic blue :)
      return { sat: b / 255, g: Palette._setColor(getRgb(toxicBlue)).g, bri: 1 }
    } else {
      return { sat: b / 255, g: (255 * (g - r)) / (b - r), bri: r / b }
    }
  }

  set color(value: string) {
    const [r, g, b] = getRgb(value)
    let sat, bri, baseR, baseG, baseB
    if (r <= g && g <= b) {
      const res = Palette._setColor([r, g, b])
      sat = res.sat
      bri = res.bri
      baseR = 0
      baseG = Math.floor(res.g)
      baseB = 255
    } else if (r <= b && b <= g) {
      const res = Palette._setColor([r, b, g])
      sat = res.sat
      bri = res.bri
      baseR = 0
      baseB = Math.floor(res.g)
      baseG = 255
    } else if (g <= r && r <= b) {
      const res = Palette._setColor([g, r, b])
      sat = res.sat
      bri = res.bri
      baseG = 0
      baseR = Math.floor(res.g)
      baseB = 255
    } else if (g <= b && b <= r) {
      const res = Palette._setColor([g, b, r])
      sat = res.sat
      bri = res.bri
      baseG = 0
      baseB = Math.floor(res.g)
      baseR = 255
    } else if (b <= r && r <= g) {
      const res = Palette._setColor([b, r, g])
      sat = res.sat
      bri = res.bri
      baseB = 0
      baseR = Math.floor(res.g)
      baseG = 255
    } else {
      // b <= g && g <= r
      const res = Palette._setColor([b, g, r])
      sat = res.sat
      bri = res.bri
      baseB = 0
      baseG = Math.floor(res.g)
      baseR = 255
    }

    sat = Math.floor(sat * 256)
    bri = Math.floor(bri * 256)
    this.bar.value = getColorBarValue([baseR, baseG, baseB])
    this.board.value = (bri << 8) | sat
  }
}
