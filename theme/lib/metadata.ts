/**
 * @module
 * Functions for processing metadata in the front matter.
 */

import type { PageOpts } from './types'
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
  pageOpts: PageOpts,
  currentRoute: string,
): ResolvedMetadata {
  const relatedPages = resolveRelatedPages(pageOpts, currentRoute)
  const tagLinks = resolveTagLinks(pageOpts, currentRoute)
  const furtherReading = resolveFurtherReading(pageOpts)

  const empty = [...relatedPages, ...tagLinks, ...furtherReading].length === 0

  return {
    relatedPages,
    tagLinks,
    furtherReading,
    empty,
  }
}

function resolveRelatedPages(
  pageOpts: PageOpts,
  currentRoute: string,
): MdxFile[] {
  const rawRoutes = pageOpts.frontMatter?.related ?? []

  const absoluteRoutes = rawRoutes.map(rawRoute =>
    absoluteRoute(currentRoute, rawRoute),
  )

  return absoluteRoutes.map(route => {
    const found = pageOpts.pages.find(page => page.route === currentRoute)

    if (found === undefined) {
      throw new Error(
        `Page '${currentRoute}' has a related page '${route}' but it could not be found.`,
      )
    }
    return found
  })
}

function resolveTagLinks(
  pageOpts: PageOpts,
  currentRoute: string,
): AnchorAttributes[] {
  const hrefBase = `${currentRoute.replace(finalSegment, '')}/tags`
  const tags = pageOpts?.frontMatter?.tags ?? []
  return tags.map(tag => {
    const children = toTitle(tag)
    const href = `${hrefBase}/${tag}`

    return {
      children,
      href,
    }
  })
}

function resolveFurtherReading(pageOpts: PageOpts): ExtLinkProps[] {
  const links = pageOpts?.frontMatter?.furtherReading ?? []
  return links.map(link => ({
    ...link,
    children: link.name,
  }))
}
