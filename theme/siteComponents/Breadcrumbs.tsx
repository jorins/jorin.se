import { useRouter } from 'nextra/hooks'
import { Fragment } from 'react'

import { useLayoutProps } from 'contexts'
import { asMdxFile, getShortTitle, pagesInHierarchy } from 'lib/pageMap'
import { MdxFile } from 'lib/types'

export interface BreadcrumbsProps {
  segments?: MdxFile[]
}

/**
 * A nav for ascending the site hierarchy.
 */
export function Breadcrumbs({ segments }: BreadcrumbsProps): JSX.Element {
  const { pageOpts } = useLayoutProps()
  const { route } = useRouter()

  if (segments === undefined) {
    segments = pagesInHierarchy(pageOpts.pages, route).map(asMdxFile)
  }

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
