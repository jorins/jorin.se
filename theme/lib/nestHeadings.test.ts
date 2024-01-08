import type { Case } from './nestHeadings.cases'

import { nest } from './nestHeadings'
import { succeeding, failing } from './nestHeadings.cases'

describe('Heading nesting library', () => {
  describe('Nesting', () => {
    function testHandler({ headings, expected }: Case): void {
      expect(nest(headings)).toEqual(expected)
    }

    test.each(succeeding)(`$name`, testHandler)
    test.failing.each(failing)('$name', testHandler)
  })
})
