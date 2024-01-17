import type { GetStaticPaths, GetStaticProps } from 'next'
import type { Template } from '.'

import Head from 'next/head'
import { useSSG } from 'nextra/data'
import { readdirSync } from 'fs'

import { makeTitle } from '../lib/title'
import { useLayoutProps } from '../contexts'
import { toTitle } from '../lib/case'
import { HierarchyNav, PageTitle } from '../siteComponents'
import { getTitle } from '../lib/pageMap'
import { getCollections, getFrontMatter } from '../lib/files'

interface Path {
  collection: string
  tag: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const collections = await getCollections()
  const tagsByCollection: Array<[string, string[]]> = await Promise.all(
    collections.map(async collection => {
      const tags = readdirSync(`pages/${collection}`)
        .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
        .map(async file => {
          const frontMatter = await getFrontMatter(
            `pages/${collection}/${file}`,
          )
          return frontMatter.tags ?? []
        })

      return [collection, (await Promise.all(tags)).flat()]
    }),
  )

  const pairings: Array<{
    collection: string
    tag: string
  }> = tagsByCollection
    .map(([collection, tags]) => tags.map(tag => ({ collection, tag })))
    .flat()

  return {
    paths: pairings.map(pairing => ({
      params: pairing,
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ ssg: Path }> = async context => {
  const params = context.params
  if (params === undefined) {
    throw new Error('Params is undefined')
  }

  const { collection, tag } = params
  if (typeof collection !== 'string') {
    throw new Error('URL segment collection is not a string')
  }

  if (typeof tag !== 'string') {
    throw new Error('URL segment tag is not a string')
  }

  return {
    props: {
      ssg: {
        collection,
        tag,
      },
    },
  }
}

// This component is called from /pages/[collection]/tags/[tag].mdx
export function MDXTag(): React.ReactNode {
  const { pageOpts, themeConfig } = useLayoutProps()
  const { collection, tag } = useSSG()
  const collectionTitle = toTitle(collection)
  const tagTitle = toTitle(tag)

  const fullTitle = makeTitle([tagTitle, 'Tags', collectionTitle], themeConfig)

  const pages = pageOpts.pages
    .filter(page => page.route.startsWith(`/${collection}`))
    .filter(page => page.frontMatter?.tags?.includes(tag))
    .sort((a, b) => getTitle(a).localeCompare(getTitle(b)))

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
      </Head>

      {
        // FIXME: hierarchy nav cannot be built without a route in pageOpts.
        // Disregard for now.
        // <HierarchyNav />
      }

      <PageTitle>
        Pages tagged &ldquo;{tagTitle}&rdquo; in {collectionTitle}
      </PageTitle>
      <ul>
        {pages.map(page => {
          const title = getTitle(page)
          const id = page.route

          return (
            <li key={id}>
              <a href={page.route}>{title}</a>
            </li>
          )
        })}
      </ul>
    </>
  )
}

// This is the full template
const Tag: Template = ({ children }) => {
  return <>{children}</>
}

export default Tag
