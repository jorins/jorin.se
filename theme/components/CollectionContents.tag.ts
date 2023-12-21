import type { TabSpec, Category } from './CollectionContents'

const tagTabSpec: TabSpec<string> = {
  id: 'tag',
  title: 'By tag',
  sortCategories: (a, b) => { return 0 },
  sortPages: (a, b) => { return 0 },
  categorise: (pages) => {
    const categorised: Category<string>[] = []

    for (const page of pages) {
      const tags: string[] = page.frontMatter.tags ?? []

      for (const tag of tags) {
        const preExisting = categorised.find(category => category.heading === tag)

        if (preExisting === undefined) {
          // Initiate with the current page
          categorised.push({
            heading: tag,
            sortKey: tag,
            contents: [page]
          })
        } else {
          // Add page to pre-existing entry
          preExisting.contents.push(page)
        }
      }
    }

    return categorised
  }
}

export default tagTabSpec
