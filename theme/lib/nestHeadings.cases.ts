import type { Heading } from 'nextra'
import type { NestedHeadings } from './nestHeadings'

interface Case {
  name: string
  headings: Heading[]
  expected: NestedHeadings
}

export const succeeding: Case[] = [
  {
    name: 'Keeps a flat structure intact',
    headings: [
      { id: '1', depth: 2, value: '1' },
      { id: '2', depth: 2, value: '2' },
      { id: '3', depth: 2, value: '3' },
    ],
    expected: [
      { id: '1', depth: 2, value: '1' },
      { id: '2', depth: 2, value: '2' },
      { id: '3', depth: 2, value: '3' },
    ],
  },

  {
    name: 'Nests a 3-depth array',
    headings: [
      { id: '1', depth: 2, value: '1' },
      { id: '2', depth: 2, value: '2' },
      { id: '3', depth: 3, value: '3' },
      { id: '4', depth: 3, value: '4' },
      { id: '5', depth: 2, value: '5' },
    ],
    expected: [
      { id: '1', depth: 2, value: '1' },
      { id: '2', depth: 2, value: '2' },
      [
        { id: '3', depth: 3, value: '3' },
        { id: '4', depth: 3, value: '4' },
      ],
      { id: '5', depth: 2, value: '5' },
    ],
  },

  {
    name: 'Keeps chunks of same depth at different positions separate',
    headings: [
      { id: '1', depth: 2, value: '1' },
      { id: '2', depth: 3, value: '2' },
      { id: '3', depth: 3, value: '3' },
      { id: '4', depth: 2, value: '4' },
      { id: '5', depth: 3, value: '5' },
      { id: '6', depth: 3, value: '6' },
      { id: '7', depth: 2, value: '7' },
    ],
    expected: [
      { id: '1', depth: 2, value: '1' },
      [
        { id: '2', depth: 3, value: '2' },
        { id: '3', depth: 3, value: '3' },
      ],
      { id: '4', depth: 2, value: '4' },
      [
        { id: '5', depth: 3, value: '5' },
        { id: '6', depth: 3, value: '6' },
      ],
      { id: '7', depth: 2, value: '7' },
    ],
  },

  {
    name: 'Nests a 5-depth array',
    headings: [
      { id: '1', depth: 2, value: '1' },
      { id: '2', depth: 3, value: '2' },
      { id: '3', depth: 3, value: '3' },
      { id: '4', depth: 4, value: '4' },
      { id: '5', depth: 3, value: '5' },
      { id: '6', depth: 4, value: '6' },
      { id: '7', depth: 5, value: '7' },
      { id: '8', depth: 5, value: '8' },
      { id: '9', depth: 4, value: '9' },
      { id: '10', depth: 5, value: '10' },
      { id: '11', depth: 3, value: '11' },
      { id: '12', depth: 2, value: '12' },
    ],
    expected: [
      { id: '1', depth: 2, value: '1' },
      [
        { id: '2', depth: 3, value: '2' },
        { id: '3', depth: 3, value: '3' },
        [{ id: '4', depth: 4, value: '4' }],
        { id: '5', depth: 3, value: '5' },
        [
          { id: '6', depth: 4, value: '6' },
          [
            { id: '7', depth: 5, value: '7' },
            { id: '8', depth: 5, value: '8' },
          ],
          { id: '9', depth: 4, value: '9' },
          [{ id: '10', depth: 5, value: '10' }],
        ],
        { id: '11', depth: 3, value: '11' },
      ],
      { id: '12', depth: 2, value: '12' },
    ],
  },
]

export const failing: Case[] = [
  {
    name: 'Passes through an empty list',
    headings: [],
    expected: [],
  },
]
