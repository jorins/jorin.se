import type { LanguageCode, Locale, AnchorTarget } from '../types'

import { getFlag } from '../flag'

function linkTitle(href: string, lang: LanguageCode | Locale): string {
  const url = new URL(href)
  const domain = url.hostname
  return `External link to domain "${domain}" with expected locale "${lang}"`
}

export interface ExtLinkProps {
  children: React.ReactNode
  href: string
  lang: Locale
  target: AnchorTarget
}

export function ExtLink(props: ExtLinkProps): JSX.Element {
  const {href, lang, target, children} = {
    target: "_blank",
    ...props,
  }

  const flag = getFlag(lang)
  const title = linkTitle(href, lang)
  
  return (
      <a
        className='external-link'
        href={href}
        hrefLang={lang}
        target={target}
        title={title}
      >
        🔗 {flag} {children}
      </a>
  )
}
