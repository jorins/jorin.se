import type { Heading } from "nextra";

import React from "react";
import { nest, NestedHeadings } from "../lib/nestHeadings";

function TocEntry(heading: NestedHeadings[number]) {
  if (Array.isArray(heading)) {
    return <ol>{heading.map(TocEntry)}</ol>;
  }

  return (
    <li>
      <a href={`#${heading.id}`}>{heading.value}</a>
    </li>
  );
}

export interface TocProps {
  headings: Heading[];
}

export function Toc({ headings }: TocProps): JSX.Element {
  if (headings.length === 0) {
    return <></>;
  }

  const nested = nest(headings);

  return (
    <nav id="table-of-contents" className="site-block">
      <h1>Table of Contents</h1>
      <ol>{nested.map(TocEntry)}</ol>
    </nav>
  );
}

export default Toc;
