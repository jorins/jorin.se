import type { MdxFile } from "nextra"
import type { TabSpec, Category } from './CollectionContents'

import { minimatch } from 'minimatch'
import { findCategory } from './CollectionContents'
import { getTitle } from "../lib/pageMap"

interface AlphabeticMatcher {
  heading: string
  matchPattern: string
}

const alphabeticCategories: AlphabeticMatcher[] = [
  {
    heading: '#',
    matchPattern: '[[:digit:]]*',
  }, 
  ...("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').map(letter => ({
    heading: letter,
    matchPattern: `[${letter}${letter.toUpperCase()}]*`,
  }))),
  {
    heading: '!@#$',
    matchPattern: '*',
  }
]

const alphabeticTabSpec: TabSpec<string> = {
  id: 'alphabetic',
  title: 'Alphabetic',
  sortCategories: (a, b) => a.sortKey.localeCompare(b.sortKey),
  sortPages: (a, b) => getTitle(a).localeCompare(getTitle(b)),
  categorise: (pages) => {
    function match(page: MdxFile, matcher: AlphabeticMatcher) {
      return minimatch(getTitle(page), matcher.matchPattern)
    }

    const categorised: Category<string>[] = []

    for (const page of pages) {
      // Find the heading of the first category that matches
      const { heading } = alphabeticCategories.find(category => match(page, category))

      // Find the pre-existing entry in categorised, if any
      const preExisting = categorised.find(findCategory(heading))

      if (preExisting === undefined) {
        // Initiate with the current page
        categorised.push({
          heading,
          sortKey: heading,
          contents: [page]
        })
      } else {
        // Add page to pre-existing entry
        preExisting.contents.push(page)
      }
    }

    return categorised
  }
}

export default alphabeticTabSpec
