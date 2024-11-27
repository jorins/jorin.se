/**
 * @module
 * Functions for processing metadata in the front matter.
 */

import type { ThemeLayoutProps } from './types'
import type { MdxFile } from 'nextra'
import type { ExtLinkProps } from 'pageComponents'
import type { AnchorHTMLAttributes } from 'react'

import { toTitle } from './case'
import { finalSegment } from './regExp'
import { absoluteRoute } from './route'

type AnchorAttributes = AnchorHTMLAttributes<HTMLAnchorElement>

interface ResolvedMetadata {
  relatedPages: MdxFile[]
  tagLinks: AnchorHTMLAttributes<HTMLAnchorElement>[]
  furtherReading: ExtLinkProps[]
  empty: boolean
}

export function resolveMetadata(
  layoutProps: ThemeLayoutProps,
  currentRoute: string,
): ResolvedMetadata {
  const relatedPages = resolveRelatedPages(layoutProps, currentRoute)
  const tagLinks = resolveTagLinks(layoutProps, currentRoute)
  const furtherReading = resolveFurtherReading(layoutProps)

  const empty = [...relatedPages, ...tagLinks, ...furtherReading].length === 0

  return {
    relatedPages,
    tagLinks,
    furtherReading,
    empty,
  }
}

function resolveRelatedPages(
  layoutProps: ThemeLayoutProps,
  currentRoute: string,
): MdxFile[] {
  const rawRoutes = layoutProps.pageOpts.frontMatter?.related ?? []

  const absoluteRoutes = rawRoutes
    .map(wikilink => wikilink.replaceAll(/(?:^\[\[|\]\]$)/g, ''))
    .map(rawRoute => absoluteRoute(currentRoute, rawRoute))

  return absoluteRoutes.map(route => {
    const found = layoutProps.pageOpts.pages.find(page => page.route === route)
    console.log('Route:', route, found)

    if (found === undefined) {
      throw new Error(
        `Page '${currentRoute}' has a related page '${route}' but it could not be found.`,
      )
    }
    return found
  })
}

function resolveTagLinks(
  layoutProps: ThemeLayoutProps,
  currentRoute: string,
): AnchorAttributes[] {
  const hrefBase = `${currentRoute.replace(finalSegment, '')}/tags`
  const tags = layoutProps.pageOpts?.frontMatter?.tags ?? []
  return tags.map(tag => {
    const children = toTitle(tag)
    const href = `${hrefBase}/${tag}`

    return {
      children,
      href,
    }
  })
}

function resolveFurtherReading(layoutProps: ThemeLayoutProps): ExtLinkProps[] {
  const links = layoutProps.pageOpts?.frontMatter?.furtherReading ?? []
  return links.map(href => {
    const match = layoutProps.themeConfig.furtherReadingLinks.find(
      i => i.href === href,
    )
    if (match === undefined) {
      return {
        href,
        children: href,
      }
    }

    return {
      href: href,
      hrefLang: match.hrefLang,
      lang: match.lang,
      children: match.name,
    }
  })
}
