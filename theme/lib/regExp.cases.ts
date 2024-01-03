import * as regExp from './regExp'

interface Case {
  pattern: RegExp
  matches: Array<{
    testString: string
    expected: string[]
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
]

export default cases
