import { asMdxFile, getShortTitle, pagesInHierarchy } from '../lib/pageMap'
import type { PageOpts } from '../lib/types'

export interface HierarchyNav {
  pageOpts: PageOpts
}

/**
 * A nav for ascending the site hierarchy.
 */
export function HierarchyNav({ pageOpts }: HierarchyNav): JSX.Element {
  const segments = pagesInHierarchy(pageOpts).map(asMdxFile)
  return (
    <nav className="page-hierarchy-nav">
      {segments.map((segment, index, segments) => {
        const title = getShortTitle(segment)
        return (
          <>
            /&nbsp;
            {index === segments.length - 1 ? (
              // Don't use a link for current page
              <span className="page-hierarchy-nav-current">{title}</span>
            ) : (
              <a href={segment.route}>{title}</a>
            )}
            &nbsp;
          </>
        )
      })}
    </nav>
  )
}
