import type { AnchorTarget } from 'lib/types'

import React from 'react'

import { getFlag } from 'lib/flag'

function linkTitle(href: string, lang?: string): string {
  const url = new URL(href)
  const domain = url.hostname
  let res = `External link to domain "${domain}"`

  if (lang !== undefined) {
    res = `${res} with expected locale "${lang}`
  }

  return res
}

export interface ExtLinkProps {
  children: React.ReactNode
  href: string
  lang?: string
  title?: string
  target?: AnchorTarget
}

export function ExtLink(props: ExtLinkProps): JSX.Element {
  const { href, lang, target, children } = {
    target: '_blank',
    ...props,
  }

  const flag = lang === undefined ? undefined : getFlag(lang)
  const title = linkTitle(href, lang)

  return (
    <a
      className="external-link"
      href={href}
      hrefLang={lang}
      target={target}
      title={title}
    >
      {children} 🔗 {flag}
    </a>
  )
}

export default ExtLink
