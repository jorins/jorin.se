import type { TabSpec, Category } from './CollectionContents'

const dateTabSpec: TabSpec<number> = {
  id: 'date',
  title: 'By date',
  sortCategories: (a, b) => {
    return 0
  },
  sortPages: (a, b) => {
    return 0
  },
  categorise: (pages) => {
    const categorised: Category<number>[] = []

    for (const page of pages) {
      const timestamp = new Date(page.frontMatter.date)
      const timestampIsValid = !Number.isNaN(timestamp.getTime())
      const timestampNumber = timestampIsValid
        ? timestamp.getTime()
        : -Infinity
      const timestampString = timestampIsValid
        ? `${timestamp.getUTCFullYear()}-${timestamp.getUTCMonth()}`
        : 'No date'

      const preExisting = categorised.find(category => category.heading === timestampString)

      if (preExisting === undefined) {
        // Initiate with the current page
        categorised.push({
          heading: timestampString,
          sortKey: timestampNumber,
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

export default dateTabSpec
