import type { Folder, PageMapItem, MdxFile, PageOpts } from 'nextra'

/** Filter to include only Folders from PageMapItems */
export function isFolder(page: PageMapItem): page is Folder {
  return page.kind === 'Folder'
}

/** Filter to include only MdxFiles from PageMapItems */
export function isMdxFile(page: PageMapItem): page is MdxFile {
  return page.kind === 'MdxPage'
}

/** Filter to include only MdxFiles with the name 'index' */
export function isIndex(page: MdxFile): boolean {
  return page.name === 'index'
}

/** Filter to include only MdxFiles whose names are not 'index' */
export function isNotIndex(page: MdxFile): boolean {
  return page.name !== 'index'
}

export function isNotHidden(page: MdxFile): boolean {
  return page.frontMatter?.hidden !== true
}

/** From a given page, locate its folder in the page map */
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
  return page.frontMatter?.title ?? page.frontMatter?.shortTitle ?? page.name
}
