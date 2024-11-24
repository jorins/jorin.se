import type { FullThemeConfig } from 'lib/config'
import type { PageOpts, MdxFile } from 'lib/types'

import { Tabs } from 'nextra/components'
import { useRouter } from 'nextra/hooks'
import React from 'react'

import { useLayoutProps } from 'contexts'
import {
  locateFolder,
  isMdxFile,
  isNotIndex,
  isNotHidden,
  getTitle,
} from 'lib/pageMap'

import alphabeticTabSpec from './CollectionContents.alphabetic'
import dateTabSpec from './CollectionContents.date'
import tagTabSpec from './CollectionContents.tag'

export interface Page<SortKey> extends MdxFile {
  sortKey: SortKey
}

type CategorySorter<CategorySortKey, PageSortKey> = (
  a: Category<CategorySortKey, PageSortKey>,
  b: typeof a,
) => number

type PageSorter<PageSortKey> = (a: Page<PageSortKey>, b: typeof a) => number

export interface TabSpec<CategorySortKey, PageSortKey> {
  id: string
  title: string
  categorise: (pages: MdxFile[]) => Category<CategorySortKey, PageSortKey>[]
  sortCategories: CategorySorter<CategorySortKey, PageSortKey>
  sortPages: PageSorter<PageSortKey>
}

export interface Category<CategorySortKey, PageSortKey> {
  heading: string
  contents: Page<PageSortKey>[]
  sortKey: CategorySortKey
}

/** Create a function that finds a Category by its heading */
export function findCategoryByHeading(
  name: string,
): (category: Category<any, any>) => boolean {
  return category => category.heading === name
}

const tabSpecs: Array<TabSpec<any, any>> = [
  alphabeticTabSpec,
  dateTabSpec,
  tagTabSpec,
]

function findDefaultTab(
  pageOpts: PageOpts,
): (tab: TabSpec<any, any>) => boolean {
  const defaultTab = pageOpts.frontMatter.defaultTab

  if (defaultTab === undefined) {
    return () => false
  }

  return tab => [tab.id, tab.title].includes(defaultTab)
}

export interface CollectionContentsProps {
  pageOpts: PageOpts
  themeConfig: FullThemeConfig
}

export function CollectionContents({}: CollectionContentsProps): JSX.Element {
  const { pageOpts } = useLayoutProps()
  const { route } = useRouter()

  const pages = locateFolder(pageOpts, route)
    .children.filter(isMdxFile)
    .filter(isNotHidden)
    .filter(isNotIndex)

  // Use Math.max to set default index to 0 if the find fails and returns -1
  const defaultIndex = Math.max(0, tabSpecs.findIndex(findDefaultTab(pageOpts)))
  const items = tabSpecs.map(tab => tab.title)

  // Create categories from a tab spec, grabbing pages from this outside scope.
  function buildCategories<CSK, PSK>(
    tabSpec: TabSpec<CSK, PSK>,
  ): Array<Category<CSK, PSK>> {
    return tabSpec
      .categorise(pages)
      .map(({ heading, sortKey, contents }) => ({
        heading,
        sortKey,
        contents: contents.sort(tabSpec.sortPages),
      }))
      .sort(tabSpec.sortCategories)
  }

  return (
    <div className="collection-tabs">
      <Tabs items={items} defaultIndex={defaultIndex}>
        {tabSpecs.map(tabSpec => {
          const categories = buildCategories(tabSpec)
          return <Tab key={tabSpec.id} categories={categories} />
        })}
      </Tabs>
    </div>
  )
}

interface TabProps {
  categories: Category<unknown, unknown>[]
}

function Tab({ categories }: TabProps): JSX.Element {
  return (
    <div className="collection-tab">
      <Tabs.Tab>
        {categories.map(category => (
          <CategorySection key={category.heading} category={category} />
        ))}
      </Tabs.Tab>
    </div>
  )
}

interface CategoryProps {
  category: Category<unknown, unknown>
}

function CategorySection({ category }: CategoryProps): JSX.Element {
  return (
    <section className="collection-category">
      <h2>{category.heading}</h2>
      <ul>
        {category.contents.map(page => {
          const title = getTitle(page)
          return (
            <li key={page.route}>
              <a href={page.route}>{title}</a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default CollectionContents
