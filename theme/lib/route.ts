/**
 * @module
 * Utilities for processing routes
 */

import { uriProtocol, finalSegment } from './regExp'

/**
 * Turn a route on the site into an absolute route based on the current route.
 * Passes through absolute and external links as is. Does not process '..'.
 *
 * @example `route` is relative:
 * ```typescript
 * absoluteRoute('/category/fish', 'birds') // => '/category/birds'
 * ```
 *
 * @example `route` is absolute:
 * ```typescript
 * absoluteRoute('/category/fish', '/birds') // => '/birds'
 * ```
 *
 * @example `route` is external:
 * ```typescript
 * absoluteRoute('/category/fish', 'https://en.wikipedia.org/Bird') // => 'https://en.wikipedia.org/Bird'
 * ```
 */
export function absoluteRoute(current: string, route: string) {
  if (route.startsWith('/') || route.match(uriProtocol)) {
    return route
  }

  if (route.startsWith('#')) {
    return `${current}${route}`
  }

  return current.replace(finalSegment, `/${route}`)
}
