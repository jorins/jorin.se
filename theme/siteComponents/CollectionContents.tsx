import type { PageOpts, MdxFile } from "nextra";
import type { FullThemeConfig } from "../lib/config";

import React from "react";
import { Tabs } from "nextra/components";

import {
  locateFolder,
  isMdxFile,
  isNotIndex,
  isNotHidden,
  getTitle,
} from "../lib/pageMap";

import alphabeticTabSpec from "./CollectionContents.alphabetic";
import dateTabSpec from "./CollectionContents.date";
import tagTabSpec from "./CollectionContents.tag";

export interface Page<SortKey> extends MdxFile {
  sortKey: SortKey;
}

export interface TabSpec<CategorySortKey, PageSortKey> {
  id: string;
  title: string;
  categorise: (pages: MdxFile[]) => Category<CategorySortKey, PageSortKey>[];
  sortCategories: (
    a: Category<CategorySortKey, PageSortKey>,
    b: Category<CategorySortKey, PageSortKey>,
  ) => number;
  sortPages: (a: Page<PageSortKey>, b: Page<PageSortKey>) => number;
}

export interface Category<CategorySortKey, PageSortKey> {
  heading: string;
  contents: Page<PageSortKey>[];
  sortKey: CategorySortKey;
}

/** Create a function that finds a Category by its heading */
export function findCategoryByHeading(
  name: string,
): (category: Category<any, any>) => boolean {
  return (category) => category.heading === name;
}

const tabSpecs = [alphabeticTabSpec, dateTabSpec, tagTabSpec];

function findDefaultTab(
  pageOpts: PageOpts,
): (tab: TabSpec<any, any>) => boolean {
  return (tab) => [tab.id, tab.title].includes(pageOpts.frontMatter.defaultTab);
}

export interface CollectionContentsProps {
  pageOpts: PageOpts;
  themeConfig: FullThemeConfig;
}

export function CollectionContents({
  pageOpts,
}: CollectionContentsProps): JSX.Element {
  const pages = locateFolder(pageOpts)
    .children.filter(isMdxFile)
    .filter(isNotHidden)
    .filter(isNotIndex);
  const defaultIndex = tabSpecs.findIndex(findDefaultTab(pageOpts)) ?? 0;
  const items = tabSpecs.map((tab) => tab.title);

  return (
    <div className="collection-tabs">
      <Tabs items={items} defaultIndex={defaultIndex}>
        {tabSpecs.map((tabSpec) => {
          const categories = tabSpec
            .categorise(pages)
            .map(({ heading, sortKey, contents }) => ({
              heading,
              sortKey,
              contents: contents.sort(tabSpec.sortPages),
            }))
            .sort(tabSpec.sortCategories);
          return <Tab categories={categories} />;
        })}
      </Tabs>
    </div>
  );
}

interface TabProps {
  categories: Category<unknown, unknown>[];
}

function Tab({ categories }: TabProps): JSX.Element {
  return (
    <div className="collection-tab">
      <Tabs.Tab>{categories.map(CategorySection)}</Tabs.Tab>
    </div>
  );
}

function CategorySection(category: Category<unknown, unknown>): JSX.Element {
  return (
    <section className="collection-category">
      <h1>{category.heading}</h1>
      <ul>
        {category.contents.map((page) => {
          const title = getTitle(page);
          return (
            <li key={page.route}>
              <a href={page.route}>{title}</a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CollectionContents;
