import { absoluteRoute } from './route'

describe('Route library', () => {
  describe('Absolute route function', () => {
    const current = '/categories/fish'

    it('Makes a relative route absolute', () => {
      const res = absoluteRoute(current, 'bird')
      expect(res).toEqual('/categories/bird')
    })

    it('Passes through an absolute route', () => {
      const absolute = '/bird'
      const res = absoluteRoute(current, absolute)
      expect(res).toEqual(absolute)
    })

    it('Passes through a URL', () => {
      const extUrl = 'https://en.wikipedia.org/wiki/Bird'
      const res = absoluteRoute(current, extUrl)
      expect(res).toEqual(extUrl)
    })

    it('Appends hashes to current URL', () => {
      const hash = '#cod'
      const res = absoluteRoute(current, hash)
      expect(res).toEqual(`${current}${hash}`)
    })

    it.failing("Resolves '..' notation", () => {
      const res = absoluteRoute(current, '../bird')
      expect(res).toEqual('/bird')
    })
  })
})
