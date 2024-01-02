/**
 * @module
 * Functions for working with the page map in the theme.
 */
import type { Folder, PageMapItem, MdxFile, PageOpts } from './types'
/**
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

export function getTitle(page: MdxFile): string {
  /**
   * Get a page's title, prioritising its title as set in the front matter, its
   * short title set in the front matter, or the name property in that order.
   */
  return page.frontMatter?.title ?? page.frontMatter?.shortTitle ?? page.name
}
