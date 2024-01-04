/**
 * @module
 * Functions for processing metadata in the front matter.
 */

import type { AnchorHTMLAttributes } from 'react'
import type { PageOpts, MdxFile } from './types'
import type { ExtLinkProps } from '../pageComponents/'

import { getAllPages } from './pageMap'
import { finalSegment } from './regExp'
import { toTitle } from './case'

type AnchorAttributes = AnchorHTMLAttributes<HTMLAnchorElement>

interface ResolvedMetadata {
  relatedPages: MdxFile[]
  tagLinks: AnchorHTMLAttributes<HTMLAnchorElement>[]
  furtherReading: ExtLinkProps[]
  empty: boolean
}

export function resolveMetadata(pageOpts: PageOpts): ResolvedMetadata {
  const relatedPages = resolveRelatedPages(pageOpts)
  const tagLinks = resolveTagLinks(pageOpts)
  const furtherReading = resolveFurtherReading(pageOpts)

  const empty = [...relatedPages, ...tagLinks, ...furtherReading].length === 0

  return {
    relatedPages,
    tagLinks,
    furtherReading,
    empty,
  }
}

function resolveRelatedPages(pageOpts: PageOpts): MdxFile[] {
  const allPages = getAllPages(pageOpts.pageMap)
  const rawRoutes = pageOpts.frontMatter?.related ?? []

  const absoluteRoutes = rawRoutes.map(route => {
    if (route.startsWith('/')) {
      return route
    }

    // Resolve relative route
    const prefix = pageOpts.route.replace(finalSegment, '')
    return `${prefix}/${route}`
  })

  return absoluteRoutes.map(route => {
    const found = allPages.find(page => page.route === route)

    if (found === undefined) {
      throw new Error(
        `Page '${pageOpts.route}' has a related page '${route}' but it could not be found.`,
      )
    }
    return found
  })
}

function resolveTagLinks(pageOpts: PageOpts): AnchorAttributes[] {
  const hrefBase = `${pageOpts.route.replace(finalSegment, '')}/tags`
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
