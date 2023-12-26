import type * as Generic from './CollectionContents'

import { getTitle } from '../lib/pageMap'

type TabSpec = Generic.TabSpec<number, PageSortKey>
type Category = Generic.Category<number, PageSortKey>
type Page = Generic.Page<PageSortKey>

interface PageSortKey {
  timestamp: number
  title: string
}

const dateTabSpec: TabSpec = {
  id: 'date',
  title: 'By date',
  sortCategories: (a, b) => {
    return b.sortKey - a.sortKey
  },
  sortPages: (a, b) => {
    if (a.sortKey.timestamp > b.sortKey.timestamp) {
      return -1
    }
    if (a.sortKey.timestamp < b.sortKey.timestamp) {
      return 1
    }
    return a.sortKey.title.localeCompare(b.sortKey.title)
  },
  categorise: pages => {
    const categorised: Category[] = []

    for (const sourcePage of pages) {
      const timestamp = new Date(sourcePage?.frontMatter?.date)
      const timestampIsValid = !Number.isNaN(timestamp.getTime())
      const timestampNumber = timestampIsValid ? timestamp.getTime() : 0
      const timestampString = timestampIsValid
        ? `${timestamp.getUTCFullYear()}-${String(
            timestamp.getUTCMonth() + 1,
          ).padStart(2, '0')}`
        : 'No date'

      const title = getTitle(sourcePage)

      const page: Page = {
        ...sourcePage,
        sortKey: {
          timestamp: timestampNumber,
          title: title,
        },
      }

      const preExisting = categorised.find(
        category => category.heading === timestampString,
      )

      if (preExisting === undefined) {
        // Initiate with the current page
        categorised.push({
          heading: timestampString,
          sortKey: timestampNumber,
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

export default dateTabSpec
