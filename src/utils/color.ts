export const toxicBlack = '#10151c'
export const toxicBlue = '#52a8dd'

export type RGB = [number, number, number]

export function round(a: number) {
  return Math.max(0, Math.min(255, Math.round(a)))
}

export function toRgb(col: RGB) {
  const [r, g, b] = col
  function pz(v: number) {
    if (v < 0 || v >= 256) throw Error('invalid range: ' + v)
    const ret = v.toString(16)
    return ret.length === 1 ? '0' + ret : ret
  }
  return '#' + pz(r) + pz(g) + pz(b)
}

export function getRgb(col: string): RGB {
  if (col[0] === '#') {
    return [
      parseInt(col.substring(1, 3), 16),
      parseInt(col.substring(3, 5), 16),
      parseInt(col.substring(5, 7), 16)
    ]
  }
  if (col.startsWith('rgb(')) {
    return col
      .substring(4, col.length - 1)
      .split(',')
      .map((a) => parseInt(a.trim())) as RGB
  }
  throw Error('invalid color: ' + col)
}
