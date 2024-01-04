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

  function RelatedPages(): JSX.Element {
    if (relatedPages.length === 0) {
      return <></>
    }

    return (
      <>
        <h2>Related pages</h2>
        <ul>
          {relatedPages.map(relatedPage => {
            const title = getTitle(relatedPage)
            return (
              <li key={relatedPage.route}>
                <a href={relatedPage.route}>{title}</a>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  function TagLinks(): JSX.Element {
    if (tagLinks.length === 0) {
      return <></>
    }

    return (
      <>
        <h2>Tags</h2>
        <ul>
          {tagLinks.map(props => (
            <li key={props.href}>
              <a {...props} />
            </li>
          ))}
        </ul>
      </>
    )
  }

  function FurtherReading(): JSX.Element {
    if (furtherReading.length === 0) {
      return <></>
    }

    return (
      <>
        <h2>Further reading</h2>
        <ul>
          {furtherReading.map(props => (
            <li key={props.href}>
              <ExtLink {...props} />
            </li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <aside className="page-metadata">
      <RelatedPages />
      <TagLinks />
      <FurtherReading />
    </aside>
  )
}
