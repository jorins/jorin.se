import type { Template } from '.'

import Head from 'next/head'

import { makeHierarchicalTitle } from '../lib/title'
import { PageHierarchyNav, PageMetadata, PageTitle } from '../siteComponents'

const Page: Template = ({ children, pageOpts, themeConfig }) => {
  const fullTitle = makeHierarchicalTitle(pageOpts, themeConfig)

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
      </Head>

      <PageHierarchyNav pageOpts={pageOpts} />
      <PageTitle>{pageOpts.title}</PageTitle>
      <PageMetadata />
      {children}
    </>
  )
}

export default Page
