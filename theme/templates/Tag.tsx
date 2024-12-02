import type { Template } from '.'
import type { MdxFile } from '../lib/types'
import type { GetStaticPaths, GetStaticProps } from 'next'

import { readdirSync } from 'fs'

import { capitalCase } from 'change-case'
import Head from 'next/head'
import { useData } from 'nextra/hooks'

import { useLayoutProps } from 'contexts'
import { getCollections, getFrontMatter } from 'lib/files'
import { getTitle } from 'lib/pageMap'
import { makeTitle } from 'lib/title'
import { Breadcrumbs, Main, PageTitle } from 'siteComponents'

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
  const { collection, tag } = useData()

  const collectionTitle = capitalCase(collection)
  const tagTitle = capitalCase(tag)

  const fullTitle = makeTitle([tagTitle, 'Tags', collectionTitle], themeConfig)

  const taggedPages = pageOpts.pages
    .filter(page => page.route.startsWith(`/${collection}`))
    .filter(page => page.frontMatter?.tags?.includes(tag))
    .sort((a, b) => getTitle(a).localeCompare(getTitle(b)))

  const index = pageOpts.pages.find(page => page.route === '/')
  if (index === undefined) {
    throw new Error('Failed to find index route')
  }

  const collectionPage = pageOpts.pages.find(
    page => page.route === `/${collection}`,
  )
  if (collectionPage === undefined) {
    throw new Error('Failed to find collection page')
  }

  const segments: MdxFile[] = [
    index,
    collectionPage,
    {
      name: `Pages tagged "${tagTitle}"`,
      route: `/${collection}/tags/${tag}`,
    },
  ]

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
      </Head>

      <Main>
        <Breadcrumbs segments={segments} />
        <PageTitle>
          Pages tagged &ldquo;{tagTitle}&rdquo; in {collectionTitle}
        </PageTitle>
        <ul>
          {taggedPages.map(page => {
            const title = getTitle(page)
            const id = page.route

            return (
              <li key={id}>
                <a href={page.route}>{title}</a>
              </li>
            )
          })}
        </ul>
      </Main>
    </>
  )
}

// This is the full template
const Tag: Template = ({ children }) => {
  return <>{children}</>
}

export default Tag
