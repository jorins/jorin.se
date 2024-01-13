import { Fragment } from 'react'
import { asMdxFile, getShortTitle, pagesInHierarchy } from '../lib/pageMap'
import { useLayoutProps } from '../contexts'

export interface HierarchyNavProps {}

/**
 * A nav for ascending the site hierarchy.
 */
export function HierarchyNav({}: HierarchyNavProps): JSX.Element {
  const { pageOpts } = useLayoutProps()
  const segments = pagesInHierarchy(pageOpts).map(asMdxFile)
  return (
    <nav className="page-hierarchy-nav">
      {segments.map((segment, index, segments) => {
        const title = getShortTitle(segment)
        return (
          <Fragment key={index}>
            /&nbsp;
            {index === segments.length - 1 ? (
              // Don't use a link for current page
              <span className="page-hierarchy-nav-current">{title}</span>
            ) : (
              <a href={segment.route}>{title}</a>
            )}
            &nbsp;
          </Fragment>
        )
      })}
    </nav>
  )
}
