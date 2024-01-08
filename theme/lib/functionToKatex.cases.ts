export interface Case {
  name: string
  fn: Function
  expected: string
}

export const succeeding: Case[] = [
  {
    name: 'Simple mathematical function',
    fn: function f(x: number) {
      return x + 1
    },
    expected: 'f(x) = x + 1',
  },
  {
    name: 'Product of identifier and literal',
    fn: function f(x: number) {
      return x * 3
    },
    expected: 'f(x) = 3x',
  },
  {
    name: 'Product of literal and identifier',
    fn: function f(x: number) {
      return 3 * x
    },
    expected: 'f(x) = 3x',
  },
  {
    name: 'Product of two single-character identifiers',
    fn: function f(x: number, y: number) {
      return x * y
    },
    expected: 'f(x,y) = xy',
  },
  {
    name: 'Product of two multi-character identifiers',
    fn: function f(one: number, two: number) {
      return one * two
    },
    expected: 'f(one,two) = one \\cdot two',
  },
  {
    name: 'Product of literal and Parenthesised multiplication',
    fn: function f(x: number) {
      return (x + 3) * 4
    },
    expected: 'f(x) = 4(x + 3)',
  },
  {
    name: 'Simple fraction',
    fn: function f(x: number) {
      return 3 / x
    },
    expected: 'f(x) = \\dfrac{3}{x}',
  },
  {
    name: 'Math.max',
    fn: function f(x: number) {
      return Math.max(x, 0)
    },
    expected: 'f(x) = max(x,0)',
  },
]

export const failing: Case[] = [
  {
    name: 'Complicated fraction',
    fn: function f(x: number) {
      return (3 * x) / (3.14 * 10 ** x)
    },
    expected: 'f(x) = \\dfrac{3x}{3.14 \\cdot 10^x}',
  },
  {
    name: 'Function with domain',
    fn: function f(x: number) {
      if (x != 0) return 1 / x
    },
    expected: 'f(x) = \\dfrac{1}{x}, x \\not = 0',
  },
]
