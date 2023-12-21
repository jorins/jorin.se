import type { PageOpts, MdxFile } from "nextra"
import type { FullThemeConfig } from "../lib/config"

import { Tabs } from 'nextra/components'

import { locateFolder, isMdxFile, isNotIndex, getTitle } from "../lib/pageMap"

import alphabeticTabSpec from './CollectionContents.alphabetic'
import dateTabSpec from "./CollectionContents.date"
import tagTabSpec from "./CollectionContents.tag"

export interface TabSpec<SortKey> {
  id: string
  title: string
  categorise: (pages: MdxFile[]) => Category<SortKey>[]
  sortCategories: (a: Category<SortKey>, b: Category<SortKey>) => number
  sortPages: (a: MdxFile, b: MdxFile) => number
}

export interface Category<SortKey> {
  heading: string
  contents: MdxFile[]
  sortKey: SortKey
}

/** Sort categories alphabetically by their heading */
function sortCategories(a: Category<any>, b: Category<any>): number {
  return a.heading.localeCompare(b.heading)
}

/** Sort alphabetically by title */
function sortPages(a: MdxFile, b: MdxFile): number {
  return getTitle(a).localeCompare(getTitle(b))
}

/** Create a function that finds a Category by name */
export function findCategory(name: string): (category: Category<any>) => boolean {
  return category => category.heading === name 
}

const tabSpecs = [
  alphabeticTabSpec,
  dateTabSpec,
  tagTabSpec,
]

function findDefaultTab<SortKey>(pageOpts: PageOpts): (tab: TabSpec<SortKey>) => boolean {
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
  const defaultIndex = tabSpecs.findIndex(findDefaultTab(pageOpts)) ?? 0
  const items = tabSpecs.map(tab => tab.title)

  return <div className="collection-tabs">
    <Tabs items={items} defaultIndex={defaultIndex}>
      {tabSpecs.map(tabSpec => {
        const categories = tabSpec
          .categorise(pages)
          .map(({heading, sortKey, contents}) => ({
            heading,
            sortKey,
            contents: contents.sort(tabSpec.sortPages),
          }))
          .sort(tabSpec.sortCategories)
        return <Tab categories={categories}/>
      })}
    </Tabs>
  </div>
}

interface TabProps {
  categories: Category<unknown>[]
}

function Tab({categories}: TabProps): JSX.Element {
  return <div className="collection-tab">
    <Tabs.Tab>
      {categories.map(CategorySection)}
    </Tabs.Tab>
  </div>
}

function CategorySection(category: Category<unknown>): JSX.Element {
  console.log(category.heading, category.contents)
  return <section className="collection-category">
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
