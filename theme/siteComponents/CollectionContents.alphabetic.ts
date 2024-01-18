import type * as Generic from './CollectionContents'

import { minimatch } from 'minimatch'

import { getTitle } from 'lib/pageMap'

import { findCategoryByHeading } from './CollectionContents'

type CategorySortKey = string
type PageSortKey = string

type TabSpec = Generic.TabSpec<CategorySortKey, PageSortKey>
type Category = Generic.Category<CategorySortKey, PageSortKey>
type Page = Generic.Page<PageSortKey>

interface AlphabeticMatcher {
  heading: string
  matchPattern: string
}

const alphabeticCategories: AlphabeticMatcher[] = [
  {
    heading: '#',
    matchPattern: '[[:digit:]]*',
  },
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
    heading: letter,
    matchPattern: `[${letter}${letter.toUpperCase()}]*`,
  })),
  {
    heading: '!@#$',
    matchPattern: '*',
  },
]

const alphabeticTabSpec: TabSpec = {
  id: 'alphabetic',
  title: 'Alphabetic',
  sortCategories: (a, b) => a.sortKey.localeCompare(b.sortKey),
  sortPages: (a, b) => getTitle(a).localeCompare(getTitle(b)),
  categorise: pages => {
    const categorised: Category[] = []
    for (const sourcePage of pages) {
      const title = getTitle(sourcePage)
      const page: Page = {
        ...sourcePage,
        sortKey: title.toLocaleLowerCase(),
      }

      // Find the first category that matches
      function matchTitle(matcher: AlphabeticMatcher) {
        return minimatch(getTitle(page), matcher.matchPattern)
      }

      const category = alphabeticCategories.find(matchTitle)
      if (category === undefined) {
        throw new Error(
          `Page ${page.route} does not match any alphabetic categories.`,
        )
      }

      const { heading } = category

      // Find the pre-existing entry in categorised, if any
      const preExisting = categorised.find(findCategoryByHeading(heading))

      if (preExisting === undefined) {
        // Initiate with the current page
        categorised.push({
          heading,
          sortKey: heading,
          contents: [page],
        })
      } else {
        // Add page to pre-existing entry
        preExisting.contents.push(page)
      }
    }

    return categorised
  },
}

export default alphabeticTabSpec
