export const toxicBlack = '#10151c'
export const toxicBlue = '#52a8dd'

export function toRgb(col: [number, number, number]) {
  const [r, g, b] = col
  function pz(v: number) {
    if (v < 0 || v >= 256) throw Error('invalid range: ' + v)
    const ret = v.toString(16)
    return ret.length === 1 ? '0' + ret : ret
  }
  return '#' + pz(r) + pz(g) + pz(b)
}

export function getRgb(col: string): [number, number, number] {
  if (col[0] === '#') {
    return [+col.substring(1, 3), +col.substring(3, 5), +col.substring(5, 7)]
  }
  if (col.startsWith('rgb(')) {
    col = col.substring(4, col.length - 1)
    return col.split(',').map((x) => +x.trim()) as [number, number, number]
  }
  throw Error('invalid color: ' + col)
}
