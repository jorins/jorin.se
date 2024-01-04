import type { Template } from '.'

import Head from 'next/head'

import { makeHierarchicalTitle } from '../lib/title'
import { HierarchyNav, PageMetadata, PageTitle } from '../siteComponents'

const Page: Template = ({ children, pageOpts, themeConfig }) => {
  const fullTitle = makeHierarchicalTitle(pageOpts, themeConfig)

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
      </Head>

      <HierarchyNav pageOpts={pageOpts} />
      <PageTitle>{pageOpts.title}</PageTitle>
      {children}
      <PageMetadata pageOpts={pageOpts} />
    </>
  )
}

export default Page
