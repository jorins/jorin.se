import functionToKatex from './functionToKatex'

import cases from './functionToKatex.cases'

describe('Convert to KaTeX library', () => {
  describe('Convert function to KaTeX', () => {
    test.each(cases)(
      '$name',
      ({fn, expected}) => {
        expect(functionToKatex(fn)).toEqual(expected)
      }
    )
  })
})
