/**
 * @module
 * Module for directly interacting with the filesystem where Nextra doesn't do
 * it for us such as in `getStaticPaths`
 */

import type { FrontMatter } from './types'

import { realpathSync, readdirSync, lstatSync, readFileSync } from 'fs'
import YAML from 'yaml'
import { frontMatter } from './regExp'

/**
 * Get a list of collections in the site.
 */
export async function getCollections(): Promise<string[]> {
  return readdirSync('pages').filter(item => {
    return !item.includes('[') && lstatSync(`pages/${item}`).isDirectory()
  })
}

/**
 * Get a list of .md and .mdx files in a collection.
 */
export async function filesInCollection(): Promise<string[]> {
  return []
}

/**
 * Parse the front matter of a file.
 */
export async function getFrontMatter(path: string): Promise<FrontMatter> {
  const fullPath = realpathSync(path)
  const content = readFileSync(fullPath)

  const frontMatterMatch = content.toString().match(frontMatter)

  if (frontMatterMatch === null) {
    throw new Error(`Failed to match frontMatter in file ${fullPath}`)
  }

  const [, matched] = frontMatterMatch
  return YAML.parse(matched)
}
