import { toTitle } from './case'

describe('Case conversion library', () => {
  describe('To title case', () => {
    const cases: Array<[string, string]> = [
      ['HEAVEN TORN LOW', 'Heaven Torn Low'],
      ['And thrown in the fire', 'And Thrown In The Fire'],
      ['the passage and toll', 'The Passage And Toll'],
      ['Brand new iPhone 11', 'Brand New Iphone 11'],
      ['hyphenated-word', 'Hyphenated-Word']
    ]

    test.each(cases)(`Converts '%s' to '%s'`, (input, output) => {
      expect(toTitle(input)).toEqual(output)
    })
  })
})
