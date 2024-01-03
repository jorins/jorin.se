import type { Template } from '.'

import Head from 'next/head'

import {
  CollectionContents,
  CollectionHeader,
  HierarchyNav,
  PageTitle,
} from '../siteComponents'
import { makeHierarchicalTitle } from '../lib/title'

const Collection: Template = ({ children, pageOpts, themeConfig }) => {
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
            <HierarchyNav pageOpts={pageOpts} />
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
