import * as regExp from './regExp'

interface Case {
  pattern: RegExp
  matches: Array<{
    testString: string
    expected: null | string[]
  }>
}

const cases: Case[] = [
  {
    pattern: regExp.routeSegments,
    matches: [
      {
        testString: '/',
        expected: ['/'],
      },
      {
        testString: '/a',
        expected: ['/a'],
      },
      {
        testString: '/a/b/c',
        expected: ['/a', '/b', '/c'],
      },
      {
        testString: '/a/b/',
        expected: ['/a', '/b', '/'],
      },
      {
        testString: '/dashed-segment/underscored_segment',
        expected: ['/dashed-segment', '/underscored_segment'],
      },
    ],
  },

  {
    pattern: regExp.finalSegment,
    matches: [
      {
        testString: '/a',
        expected: ['/a'],
      },
      {
        testString: '/a/b',
        expected: ['/b'],
      },
    ],
  },

  {
    pattern: regExp.uriProtocol,
    matches: [
      {
        testString: 'https://website.website',
        expected: ['https://website.website', 'https', 'website.website'],
      },
      {
        testString: 'website.website',
        expected: null,
      },
    ],
  },

  {
    pattern: regExp.keyValuePair,
    matches: [
      {
        testString: 'key=value',
        expected: ['key=value', 'key', 'value'],
      },
    ],
  },

  {
    pattern: regExp.hash,
    matches: [
      {
        testString: 'https://en.wikipedia.org/wiki/Bird#Ecology',
        expected: ['https://en.wikipedia.org/wiki/Bird#Ecology', 'Ecology'],
      },
    ],
  },
]

export default cases
