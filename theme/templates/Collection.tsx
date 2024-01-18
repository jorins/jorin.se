import type { Template } from '.'

import Head from 'next/head'

import { useLayoutProps } from 'contexts'
import { makeHierarchicalTitle } from 'lib/title'
import {
  CollectionContents,
  CollectionHeader,
  Breadcrumbs,
  PageTitle,
} from 'siteComponents'

const Collection: Template = ({ children }) => {
  const { pageOpts, themeConfig } = useLayoutProps()
  const imgId = pageOpts.route.split('/')[1]
  const fullTitle = makeHierarchicalTitle(pageOpts, themeConfig)

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
      </Head>

      <CollectionHeader
        title={
          <>
            <Breadcrumbs />
            <PageTitle>{pageOpts.title}</PageTitle>
          </>
        }
        description={children}
        imgId={imgId}
      />

      <CollectionContents pageOpts={pageOpts} themeConfig={themeConfig} />
    </>
  )
}

export default Collection
