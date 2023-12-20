import type { PageOpts, MdxFile } from "nextra"
import type { FullThemeConfig } from "../lib/config"

import { Tabs } from 'nextra/components'
import { minimatch } from 'minimatch'

import { locateFolder, isMdxFile, isNotIndex, getTitle } from "../lib/pageMap"

interface AlphabeticCategory {
  heading: string
  matchPattern: string
}

const alphabeticCategories: AlphabeticCategory[] = [
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

interface Category {
  heading: string
  contents: MdxFile[]
}

/** Filter out empty Categories */
function filterEmptyCategory({contents}: Category): boolean {
  return contents.length > 0
}

/** Sort categories alphabetically */
function sortCategories(a: Category, b: Category): number {
  return a.heading.localeCompare(b.heading)
}

/** Create a function that finds a Category by name */
function findCategory(name: string): (category: Category) => boolean {
  return category => category.heading === name 
}

/** Sort alphabetically by title */
function sortPages(a: MdxFile, b: MdxFile): number {
  return getTitle(a).localeCompare(getTitle(b))
}

interface TabSpec {
  id: string
  title: string
  categorise: (pages: MdxFile[]) => Category[]
}

const tabs: TabSpec[] = [
  {
    id: 'alphabetic',
    title: 'Alphabetic',
    categorise: (pages) => {
      function matchCategory(page: MdxFile, category: AlphabeticCategory) {
        return minimatch(getTitle(page), category.matchPattern)
      }

      const categorised: Category[] = []

      for (const page of pages) {
        // Find the heading of the first category that matches
        const { heading } = alphabeticCategories.find(category => matchCategory(page, category))

        // Find the pre-existing entry in categorised, if any
        const preExisting: Category | undefined = categorised.find(findCategory(heading))

        if (preExisting === undefined) {
          // Initiate with the current page
          categorised.push({
            heading,
            contents: [page]
          })
        } else {
          // Add page to pre-existing entry
          preExisting.contents.push(page)
        }
      }

      return categorised
        .map(({heading, contents}) => ({
          heading,
          contents: contents.sort(sortPages)
        }))
        .sort(sortCategories)
    }
  },
  /*{
    id: 'date',
    title: 'By date',
    categorise: (pages) => {
      const categorised: Category[] = []
      for (const category of alphabeticCategories) {
        categorised.push({
          heading: 'uh',
          contents: []
        })
      }

      return categorised
    }
  },
  {
    id: 'tag',
    title: 'By tag',
    categorise: (pages) => {
      const categorised: Category[] = []
      for (const category of alphabeticCategories) {
        categorised.push({
          heading: 'uh',
          contents: []
        })
      }

      return categorised
    }
  },*/
]

function findDefaultTab(pageOpts: PageOpts): (tab: TabSpec) => boolean {
  return tab => [
    tab.id,
    tab.title
  ].includes(pageOpts.frontMatter.defaultTab)
}

export interface CollectionContentsProps {
  pageOpts: PageOpts
  themeConfig: FullThemeConfig
}

export default function CollectionContents({ pageOpts }: CollectionContentsProps): JSX.Element {
  const pages = locateFolder(pageOpts).children.filter(isMdxFile).filter(isNotIndex)
  const defaultTab = tabs.findIndex(findDefaultTab(pageOpts)) ?? 0
  const items = tabs.map(tab => tab.title)

  return <Tabs items={items} defaultIndex={defaultTab}>
    {tabs.map(tab => {
      const categories = tab.categorise(pages).filter(filterEmptyCategory)
      return <Tab categories={categories}/>
    })}
  </Tabs>
}

interface TabProps {
  categories: Category[]
}

function Tab({categories}: TabProps): JSX.Element {
  return <Tabs.Tab>
    {categories.map(CategorySection)}
  </Tabs.Tab>
}

function CategorySection(category: Category): JSX.Element {
  console.log(category.heading, category.contents)
  return <section>
    <h1>{category.heading}</h1>
    <ul>
      {category.contents.map(page => {
        const title = getTitle(page)
        return <li id={page.route}>
          <a href={page.route}>{title}</a>
        </li>
      })}
    </ul>
  </section>
}
