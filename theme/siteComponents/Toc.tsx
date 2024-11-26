import React from 'react'

import { useHeadings, useLayoutProps } from 'contexts'
import { nest, NestedHeadings } from 'lib/nestHeadings'
import { SEE_ALSO_ID } from 'siteComponents'

let nestedOlIndex = 0
/**
 * Entry in the ToC.
 */
function TocEntry(heading: NestedHeadings[number]) {
  if (Array.isArray(heading)) {
    return <ol key={`nested-ol-${nestedOlIndex++}`}>{heading.map(TocEntry)}</ol>
  }

  return (
    <a key={heading.id} href={`#${heading.id}`}>
      <li>{heading.value}</li>
    </a>
  )
}

export interface TocProps {}

/**
 * A page's table of contents
 */
export function Toc({}: TocProps): JSX.Element {
  const { headings, registerHeadings } = useHeadings()
  const layoutProps = useLayoutProps()

  const hasFootnotes = layoutProps.pageOpts?.frontMatter?.footnotes === true
  const hasMetadata =
    layoutProps.pageOpts?.frontMatter?.related !== undefined ||
    layoutProps.pageOpts?.frontMatter?.tags !== undefined ||
    layoutProps.pageOpts?.frontMatter?.furtherReading

  const headingsToRegister = []

  if (hasFootnotes) {
    headingsToRegister.push({
      value: 'Footnotes',
      depth: 2 as const,
      id: 'footnote-label',
    })
  }

  if (hasMetadata) {
    headingsToRegister.push({
      value: 'See also',
      depth: 2 as const,
      id: SEE_ALSO_ID,
    })
  }

  registerHeadings(headingsToRegister)

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
