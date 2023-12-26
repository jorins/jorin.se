import type * as Generic from "./CollectionContents";

import { minimatch } from "minimatch";
import { findCategoryByHeading } from "./CollectionContents";
import { getTitle } from "../lib/pageMap";

type TabSpec = Generic.TabSpec<string, string>;
type Category = Generic.Category<string, string>;
type Page = Generic.Page<string>;

interface AlphabeticMatcher {
  heading: string;
  matchPattern: string;
}

const alphabeticCategories: AlphabeticMatcher[] = [
  {
    heading: "#",
    matchPattern: "[[:digit:]]*",
  },
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => ({
    heading: letter,
    matchPattern: `[${letter}${letter.toUpperCase()}]*`,
  })),
  {
    heading: "!@#$",
    matchPattern: "*",
  },
];

const alphabeticTabSpec: TabSpec = {
  id: "alphabetic",
  title: "Alphabetic",
  sortCategories: (a, b) => a.sortKey.localeCompare(b.sortKey),
  sortPages: (a, b) => getTitle(a).localeCompare(getTitle(b)),
  categorise: (pages) => {
    function matchTitle(page: Page, matcher: AlphabeticMatcher) {
      return minimatch(getTitle(page), matcher.matchPattern);
    }

    const categorised: Category[] = [];

    for (const sourcePage of pages) {
      const title = getTitle(sourcePage);
      const page: Page = {
        ...sourcePage,
        sortKey: title.toLocaleLowerCase(),
      };

      // Find the heading of the first category that matches
      const { heading } = alphabeticCategories.find((category) =>
        matchTitle(page, category),
      );

      // Find the pre-existing entry in categorised, if any
      const preExisting = categorised.find(findCategoryByHeading(heading));

      if (preExisting === undefined) {
        // Initiate with the current page
        categorised.push({
          heading,
          sortKey: heading,
          contents: [page],
        });
      } else {
        // Add page to pre-existing entry
        preExisting.contents.push(page);
      }
    }

    return categorised;
  },
};

export default alphabeticTabSpec;
