import type * as Generic from "./CollectionContents";

import { getTitle } from "../lib/pageMap";
import { toTitle, toLower } from "../lib/case";

type CategorySortKey = string;

type TabSpec = Generic.TabSpec<CategorySortKey, string>;
type Category = Generic.Category<CategorySortKey, string>;
type Page = Generic.Page<string>;

/** For hard-coding untagged content handling */
const UNTAGGED = "Untagged";

const tagTabSpec: TabSpec = {
  id: "tag",
  title: "By tag",
  sortCategories: (a, b) => {
    if (a.sortKey === UNTAGGED) {
      return 1;
    }

    return a.sortKey.localeCompare(b.sortKey);
  },
  sortPages: (a, b) => a.sortKey.localeCompare(b.sortKey),
  categorise: (pages) => {
    const untaggedCategory = {
      heading: UNTAGGED,
      sortKey: UNTAGGED,
      contents: [],
    };

    const categorised: Category[] = [untaggedCategory];

    for (const sourcePage of pages) {
      const title = getTitle(sourcePage);
      const page: Page = {
        ...sourcePage,
        sortKey: title,
      };

      const tags: string[] =
        Array.isArray(page?.frontMatter?.tags) &&
        page.frontMatter.tags.length > 0
          ? page.frontMatter.tags
          : [UNTAGGED];

      for (const tag of tags) {
        const heading = toTitle(tag);
        const sortKey = toLower(tag);
        const preExisting = categorised.find(
          (category) => category.heading === heading,
        );

        if (preExisting === undefined) {
          // Initiate with the current page
          categorised.push({
            heading,
            sortKey,
            contents: [page],
          });
        } else {
          // Add page to pre-existing entry
          preExisting.contents.push(page);
        }
      }
    }

    // Filter out untagged category if it happens to be empty.
    return categorised.filter((category) => category.contents.length > 0);
  },
};

export default tagTabSpec;
