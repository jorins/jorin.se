import { getShortTitle, pagesInHierarchy } from '../lib/pageMap'
import type { PageOpts } from '../lib/types'

export interface PageHierarchyNav {
  pageOpts: PageOpts
}

/**
 * A nav for ascending the site hierarchy.
 */
export function PageHierarchyNav({ pageOpts }: PageHierarchyNav): JSX.Element {
  const segments = pagesInHierarchy(pageOpts)
  return (
    <nav className="page-hierarchy-nav">
      {segments.map((segment, index, segments) => {
        const title = getShortTitle(segment)
        return (
          <>
            /&nbsp;
            {index === segments.length - 1 ? (
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
