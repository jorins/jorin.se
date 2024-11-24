import type { Template } from '.'

import Head from 'next/head'
import { useRouter } from 'nextra/hooks'

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
  const { route } = useRouter()

  const imgId = route.split('/')[1]
  const fullTitle = makeHierarchicalTitle(pageOpts.pages, route, themeConfig)

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
