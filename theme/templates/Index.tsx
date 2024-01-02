import type { Template } from '.'

import Head from 'next/head'

import { isFolder, isIndex, isMdxFile } from '../lib/pageMap'
import { CollectionHeader, PageTitle } from '../siteComponents'

const Index: Template = ({ children, pageOpts, themeConfig }) => {
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
                title={collection?.frontMatter?.title}
                imgId={imgId}
                imgOverride={{
                  width: 350,
                  height: 350,
                }}
              >
                {collection?.frontMatter?.description}
              </CollectionHeader>
            </a>
          )
        })}
      </div>
    </>
  )
}

export default Index
