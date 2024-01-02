import cases from './regExp.cases'

describe('Regexp library', () => {
  describe.each(cases)('Pattern $pattern', ({ pattern, matches }) => {
    test.each(matches)(
      'Test string $testString',
      ({ testString, expected }) => {
        expect(testString.match(pattern)).toEqual(expected)
      },
    )
  })
})
