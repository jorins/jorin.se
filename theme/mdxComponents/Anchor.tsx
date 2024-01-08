import { keyValuePair, uriProtocol } from '../lib/regExp'
import { ExtLink } from '../pageComponents'

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export function Anchor(props: AnchorProps): React.ReactNode {
  const { children, href } = props

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

  // If we set override via the markdown title, we look for the title in the
  // override. Otherwise we fall back to the markdown title.
  const title = Object.keys(override).length > 0 ? override.title : props.title

  // We can't match against the protocol regexp if there's no href, so we
  // return early
  if (href === undefined) {
    return (
      <a {...props} {...override}>
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
  } else {
    // Internal link
    return (
      <a {...props} {...override}>
        {children}
      </a>
    )
  }
}

const exports = {
  a: Anchor,
}

export default exports
