import type { Template } from '.'

import Head from 'next/head'

import {
  CollectionContents,
  CollectionHeader,
  HierarchyNav,
  PageTitle,
} from '../siteComponents'
import { makeHierarchicalTitle } from '../lib/title'
import { useLayoutProps } from '../contexts'

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
            <HierarchyNav />
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
