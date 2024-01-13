import type { Template } from '.'

import Head from 'next/head'

import { isFolder, isIndex, isMdxFile } from '../lib/pageMap'
import { CollectionHeader, PageTitle, HierarchyNav } from '../siteComponents'
import { useLayoutProps } from '../contexts'

const Index: Template = ({ children }) => {
  const { pageOpts, themeConfig } = useLayoutProps()
  const pageTitle = pageOpts.title

  const collections = pageOpts.pageMap
    .filter(isFolder)
    .map(folder => folder.children)
    .flat()
    .filter(isMdxFile)
    .filter(isIndex)

  return (
    <>
      <Head>
        <title>{themeConfig.title.postfix}</title>
      </Head>

      <HierarchyNav />
      <PageTitle>{pageTitle}</PageTitle>

      {children}

      <div className="collection-listing">
        {collections.map(collection => {
          const imgId = collection.route.split('/')[1]

          return (
            <a
              className="collection-header-wrapper"
              href={collection.route}
              key={collection.route}
            >
              <CollectionHeader
                title={<h1>{collection?.frontMatter?.title}</h1>}
                description={collection?.frontMatter?.description}
                imgId={imgId}
                imgOverride={{
                  width: 350,
                  height: 350,
                }}
              />
            </a>
          )
        })}
      </div>
    </>
  )
}

export default Index
