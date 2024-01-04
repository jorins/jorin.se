import type { PageOpts } from '../lib/types'

import { resolveMetadata } from '../lib/metadata'
import { getTitle } from '../lib/pageMap'
import { ExtLink } from '../pageComponents'

export interface PageMetadataProps {
  pageOpts: PageOpts
}

export function PageMetadata({ pageOpts }: PageMetadataProps): JSX.Element {
  const { relatedPages, tagLinks, furtherReading, empty } =
    resolveMetadata(pageOpts)

  if (empty) {
    return <></>
  }

  function RelatedPages(): React.ReactNode {
    if (relatedPages.length === 0) {
      return <></>
    }

    return relatedPages.map(relatedPage => {
      const title = getTitle(relatedPage)
      return (
        <li key={relatedPage.route}>
          <a href={relatedPage.route}>{title}</a>
        </li>
      )
    })
  }

  function TagLinks(): React.ReactNode {
    if (tagLinks.length === 0) {
      return <></>
    }

    return tagLinks.map(props => (
      <li key={props.href}>
        <a {...props}>Pages with tag {props.children}</a>
      </li>
    ))
  }

  function FurtherReading(): React.ReactNode {
    if (furtherReading.length === 0) {
      return <></>
    }

    return furtherReading.map(props => (
      <li key={props.href}>
        <ExtLink {...props} />
      </li>
    ))
  }

  return (
    <section className="page-metadata">
      <h2 id="metadata-label">See also</h2>
      <ul>
        <RelatedPages />
        <TagLinks />
        <FurtherReading />
      </ul>
    </section>
  )
}
