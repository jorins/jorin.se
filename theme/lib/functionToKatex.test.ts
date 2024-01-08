import type { Case } from './functionToKatex.cases'

import functionToKatex from './functionToKatex'
import { succeeding, failing } from './functionToKatex.cases'

describe('Convert to KaTeX library', () => {
  describe('Convert function to KaTeX', () => {
    function testHandler({ fn, expected }: Case): void {
      expect(functionToKatex(fn)).toEqual(expected)
    }

    test.each(succeeding)('$name', testHandler)
    test.failing.each(failing)('$name', testHandler)
  })
})
