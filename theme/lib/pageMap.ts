/**
 * @module
 * Functions for working with the page map in the theme.
 */
import type { Folder, PageMapItem, MdxFile, PageOpts } from './types'
/**

import * as regExp from './regExp'

 * Filter to include only Folders from PageMapItems
 */
export function isFolder(page: PageMapItem): page is Folder {
  return page.kind === 'Folder'
}

/**
 * Filter to include only MdxFiles from PageMapItems
 */
export function isMdxFile(page: PageMapItem): page is MdxFile {
  return page.kind === 'MdxPage'
}

/**
 * Filter to include only MdxFiles with the name 'index'. May be the index
 * under a folder, not necessarily the the page at route '/'.
 */
export function isIndex(page: MdxFile): boolean {
  return page.name === 'index'
}

/**
 * Filter to include only MdxFiles whose names are not 'index'
 */
export function isNotIndex(page: MdxFile): boolean {
  return page.name !== 'index'
}

export function isNotHidden(page: MdxFile): boolean {
  /**
   * Filter to include only MdxFiles that do not have `hidden: true` in their
   * FrontMatter.
   */
  return page.frontMatter?.hidden !== true
}

/**
 * Retrieve all pages in the page map.
 */
export function getAllPages(pageMap: PageMapItem[]): MdxFile[] {
  function isNotUndefined<T>(i: T | undefined): i is T {
    return i !== undefined
  }

  return pageMap
    .map(item => {
      switch (item.kind) {
        case 'MdxPage':
          return item
        case 'Meta':
          return undefined
        case 'Folder':
          return getAllPages(item.children)
      }
    })
    .flat()
    .filter(isNotUndefined)
}

/**
 * From a given page, locate its folder in the page map
 */
export function locateFolder(pageOpts: PageOpts): Folder {
  const path = pageOpts.route.split('/').filter(s => s !== '')

  // Construct a fake index folder to simplify the reduce procedure
  const rootFolder: Folder = {
    kind: 'Folder',
    route: '/',
    name: 'index',
    children: pageOpts.pageMap,
  }

  function r(current: Folder, fragment: string): Folder {
    const found = current.children
      .filter(isFolder)
      .find(f => f.name === fragment)

    if (found === undefined) {
      throw new Error(`Cannot find fragment '${fragment}' in folder ${current}`)
    }
    return found
  }

  return path.reduce(r, rootFolder)
}

/**
 * Get the index page of any given Folder. This is useful for when you have a
 * mixed list of page map items and need everything as `MdxFile`s
 */
export function asMdxFile(pageMapItem: MdxFile | Folder): MdxFile {
  if (pageMapItem.kind === 'MdxPage') {
    return pageMapItem
  }

  // pageMapItem is a folder
  const res = pageMapItem.children.filter(isMdxFile).find(isIndex)

  if (res === undefined) {
    throw new Error(`No index file found in folder ${pageMapItem.route}`)
  }

  return res
}

type PathList = Array<MdxFile | Folder>

/**
 * Gets each page from the page map from index to current page per `pageOpts`.
 */
export function pagesInHierarchy(pageOpts: PageOpts): PathList {
  const allPages = getAllPages(pageOpts.pageMap)
  const index = allPages.filter(page => page.route === '/')

  // Index page is a bit of a special case with the route splitting method, so
  // we hard-check for it first
  if (pageOpts.route === '/') {
    return index
  }

  const segments = pageOpts.route.match(regExp.routeSegments)
  if (segments === null) {
    throw new Error('Segments failed to match.')
  }

  // Re-construct each full route along the way
  const subRoutes = segments.map((_fragment, index, segment) =>
    segment.slice(0, index + 1).join(''),
  )

  // Add the index
  const routes = ['/', ...subRoutes]

  return routes.map(targetPath => {
    const found = allPages.find(page => page.route === targetPath)

    if (found === undefined) {
      throw new Error(`No MdxFile matches path ${targetPath}`)
    }

    return found
  })
}

/**
 * Get a page's title, prioritising its title as set in the front matter, its
 * short title set in the front matter, or the name property in that order.
 */
export function getTitle(page: MdxFile): string {
  return page.frontMatter?.title ?? page.frontMatter?.shortTitle ?? page.name
}

/**
 * Get a page's short title or failing that, its title, or its name.
 */
export function getShortTitle(page: MdxFile): string {
  return page.frontMatter?.shortTitle ?? page.frontMatter?.title ?? page.name
}
