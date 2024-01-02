import type { Template } from '.'

import Head from 'next/head'

import { PageTitle } from '../siteComponents'
import { makeHierarchicalTitle } from '../lib/title'

const Page: Template = ({ children, pageOpts, themeConfig }) => {
  const fullTitle = makeHierarchicalTitle(pageOpts, themeConfig)

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
      </Head>

      <PageTitle>{pageOpts.title}</PageTitle>
      {children}
    </>
  )
}

export default Page
