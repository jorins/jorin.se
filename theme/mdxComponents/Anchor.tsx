import { useLayoutProps } from 'contexts'
import { getTitle } from 'lib/pageMap'
import { keyValuePair, uriProtocol, hash } from 'lib/regExp'
import { absoluteRoute } from 'lib/route'
import { ExtLink } from 'pageComponents'

const CLASSNAME_VALID = 'mdx-anchor-valid'
const CLASSNAME_INVALID = 'mdx-anchor-invalid'

type AnchorProps = React.ComponentProps<'a'>

export function Anchor(props: AnchorProps): React.ReactNode {
  const { pageOpts } = useLayoutProps()
  const { children } = props

  let className = 'mdx-anchor'

  // Make relative routes absolute
  const href =
    props.href === undefined
      ? undefined
      : absoluteRoute(pageOpts.route, props.href)

  // Parse markdown title as key-value pairs, if possible
  const override: Record<string, string> = {}
  if (props.title !== undefined) {
    props.title
      ?.split(';')
      .map(i => i.match(keyValuePair))
      .forEach(match => {
        if (match === null) {
          return
        }

        const [, key, value] = match
        override[key] = value
      })
  }

  // If we set override via the markdown title notation, we look for the title
  // in the parsed override object. Otherwise we fall back to the markdown
  // title.
  const title = Object.keys(override).length > 0 ? override.title : props.title

  // We can't match against the protocol regexp if there's no href, so we
  // return early
  if (href === undefined) {
    className = `${className} mdx-anchor-no-href`
    return (
      <a className={className} title={title} {...props} {...override}>
        {children}
      </a>
    )
  }

  if (href.match(uriProtocol)) {
    // External link
    return (
      <ExtLink href={href} title={title} {...override}>
        {children}
      </ExtLink>
    )
  } else if (href.startsWith(pageOpts.route) && href.includes('#')) {
    // Link in page
    // Check whether the target is an existing heading to validate
    const match = href.match(hash)
    if (match === null) {
      throw new Error(`Failed to match hash from route '${pageOpts.route}'`)
    }
    const hrefWithoutHash = match[1]

    const target = pageOpts.headings.find(
      heading => heading.id === hrefWithoutHash,
    )
    // Footnote-generated IDs start with 'user-content' but won't be found in headings
    const isValid =
      target !== undefined || hrefWithoutHash.startsWith('user-content')

    className = `${className} ${isValid ? CLASSNAME_VALID : CLASSNAME_INVALID}`
    const title = isValid ? undefined : 'Invalid heading link'

    return (
      <a className={className} title={title} {...props} {...override}>
        {children}
      </a>
    )
  } else {
    // Link to other page
    // Validate by checking that the page route exists
    const targetPage = pageOpts.pages.find(page => page.route === href)
    const isValid = targetPage !== undefined

    className = `${className} ${isValid ? CLASSNAME_VALID : CLASSNAME_INVALID}`
    const targetTitle = isValid ? getTitle(targetPage) : null
    const title = isValid
      ? `Link to page "${targetTitle}"`
      : 'Invalid page link'

    return (
      <a className={className} title={title} {...props} {...override}>
        {children}
      </a>
    )
  }
}

const exports = {
  a: Anchor,
}

export default exports
