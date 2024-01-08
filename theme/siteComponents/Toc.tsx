import type { Heading } from 'nextra'

import React from 'react'
import { nest, NestedHeadings } from '../lib/nestHeadings'

let nestedOlIndex = 0
/**
 * Entry in the ToC.
 */
function TocEntry(heading: NestedHeadings[number]) {
  if (Array.isArray(heading)) {
    return <ol key={`nested-ol-${nestedOlIndex++}`}>{heading.map(TocEntry)}</ol>
  }

  return (
    <li key={heading.id}>
      <a href={`#${heading.id}`}>{heading.value}</a>
    </li>
  )
}

export interface TocProps {
  headings: Heading[]
}

/**
 * A page's table of contents
 */
export function Toc({ headings }: TocProps): JSX.Element {
  nestedOlIndex = 0
  if (headings.length === 0) {
    return <></>
  }

  const nested = nest(headings)

  return (
    <nav id="table-of-contents" className="site-block">
      <h1>Table of Contents</h1>
      <ol>
        <a href="#__next" key="top">
          (Top)
        </a>
        {nested.map(TocEntry)}
      </ol>
    </nav>
  )
}

export default Toc
