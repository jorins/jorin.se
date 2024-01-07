import type { PageOpts } from '../lib/types'

import { H2 } from '../mdxComponents/Heading'
import { resolveMetadata } from '../lib/metadata'
import { getTitle } from '../lib/pageMap'
import { ExtLink } from '../pageComponents'

export const SEE_ALSO_ID = 'see-also-label'

export interface SeeAlsoProps {
  pageOpts: PageOpts
}

export function SeeAlso({ pageOpts }: SeeAlsoProps): JSX.Element {
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
      <H2 id={SEE_ALSO_ID}>See also</H2>
      <ul>
        <RelatedPages />
        <TagLinks />
        <FurtherReading />
      </ul>
    </section>
  )
}
