import cases from './regExp.cases'

describe('Regexp library', () => {
  describe.each(cases)('Pattern $pattern', ({ pattern, matches }) => {
    test.each(matches)(
      'Test string $testString',
      ({ testString, expected }) => {
        const res = testString.match(pattern)
        if (Array.isArray(res)) {
          // Re-pack to avoid equality assertion issues stemming from spicy
          // array objects
          expect([...res]).toEqual(expected)
        } else {
          expect(res).toEqual(expected)
        }
      },
    )
  })
})
