/**
 * Matches all segments in a route. Should not be a full URI.
 */
export const routeSegments = /\/([^\/]*)/g

/**
 * Match the final segment of a route.
 */
export const finalSegment = /\/[^\/]*$/

/**
 * Match a URI's protocol, if any.
 */
export const uriProtocol = /^(\w+):\/{0,2}(.*)$/

/**
 * Match a single key-value pair separated by an equals sign or a colon
 *
 * @example
 * ```typescript
 * 'length=4;unit=minutes'
 *   .split(';')
 *   .map(i => i.match(keyValuePair))
 * ```
 *
 * gives
 *
 * ```typescript
 * [
 *   ['length=4', 'length', '4'],
 *   ['unit=minutes', 'unit', 'minutes']
 * ]
 * ```
 */
export const keyValuePair = /([^;=]*)[=:]([^;=]*)/

/**
 * Match the hash of a route or URL
 *
 * @example
 * ```typescript
 * 'https://en.wikipedia.org/wiki/Bird#Ecology'
 *   .match(hash)
 * ```
 *
 * gives
 *
 * ```typescript
 * [
 *   'https://en.wikipedia.org/wiki/Bird#Ecology',
 *   'Ecology'
 * ]
 * ```
 */
export const hash = /.*#([^#]*)$/

/**
 * Matches the front-matter of a markdown file. Fences must be `---`
 */
export const frontMatter = /^---\n((?:.|\n)*)^---\n/m
