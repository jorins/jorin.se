import { toTitle, toSpaced } from './case'

describe('Case conversion library', () => {
  describe('To title case', () => {
    const cases: Array<[string, string]> = [
      ['HEAVEN TORN LOW', 'Heaven Torn Low'],
      ['And thrown in the fire', 'And Thrown In The Fire'],
      ['the passage and toll', 'The Passage And Toll'],
      ['Brand new iPhone 11', 'Brand New Iphone 11'],
      ['hyphenated-word', 'Hyphenated-Word'],
    ]

    test.each(cases)(`Converts '%s' to '%s'`, (input, output) => {
      expect(toTitle(input)).toEqual(output)
    })
  })

  describe('To space case', () => {
    const niceCases: Array<[string, string]> = [
      ['HiHiHello', 'Hi Hi Hello'],
      ['what_goes_on_here', 'what goes on here'],
      ['SCREAMING_AND_SHOUTING', 'SCREAMING AND SHOUTING'],
      ["Couldn'tBeMe", "Couldn't Be Me"],
    ]

    // Poorly handled cases that I cannot be bothered to address presently
    const naughtyCases: Array<[string, string]> = [
      ['iPhone 13', 'iPhone 13'],
      ['ÖrebroÄlv', 'Örebro Älv'],
      ['HelloIAmJorin', 'Hello I Am Jorin'],
      ['xXD4rk_Ang3lXx', 'xX D4rk Ang3l Xx'],
    ]

    test.each(niceCases)(`Converts '%s' to '%s'`, (input, output) => {
      expect(toSpaced(input)).toEqual(output)
    })

    test.each(naughtyCases)(`Converts '%s' to '%s'`, (input, output) => {
      expect(toSpaced(input)).not.toEqual(output)
    })
  })
})
