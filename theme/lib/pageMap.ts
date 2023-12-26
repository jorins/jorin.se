import type { Folder, PageMapItem, MdxFile, PageOpts } from "nextra";

/** Filter to include only Folders from PageMapItems */
export function isFolder(page: PageMapItem): page is Folder {
  return page.kind === "Folder";
}

/** Filter to include only MdxFiles from PageMapItems */
export function isMdxFile(page: PageMapItem): page is MdxFile {
  return page.kind === "MdxPage";
}

/** Find a page with the name 'index' */
export function findIndex(page: MdxFile): boolean {
  return page.name === "index";
}

/** Filter out index page */
export function isNotIndex(page: MdxFile): boolean {
  return page.name !== "index";
}

export function isNotHidden(page: MdxFile): boolean {
  return page.frontMatter?.hidden !== true;
}

/** From a given page, locate its folder in the page map */
export function locateFolder(pageOpts: PageOpts): Folder {
  const path = pageOpts.route.split("/").filter((s) => s !== "");

  // Construct a fake index folder to simplify the reduce procedure
  const rootFolder: Folder = {
    kind: "Folder",
    route: "/",
    name: "index",
    children: pageOpts.pageMap,
  };

  function r(current: Folder, fragment: string): Folder {
    return current.children.filter(isFolder).find((f) => f.name === fragment);
  }

  return path.reduce(r, rootFolder);
}

export function getTitle(page: MdxFile): string {
  return page.frontMatter?.title ?? page.frontMatter?.shortTitle ?? page.name;
}
