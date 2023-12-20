import type { Folder, PageMapItem, MdxFile } from 'nextra'

/** Filter out Folders from PageMapItems */
export function isFolder(page: PageMapItem): page is Folder {
  return page.kind === 'Folder'
}

/** Filter out MdxFiles from PageMapItems */
export function isMdxFile(page: PageMapItem): page is MdxFile {
  return page.kind === 'MdxPage'
}

/** Find a page with the name 'index' */
export function findIndex(page: MdxFile): boolean {
  return page.name === 'index'
}
