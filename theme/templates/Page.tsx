import type { Template } from '.'

import Head from 'next/head'

import { useLayoutProps } from 'contexts'
import { makeHierarchicalTitle } from 'lib/title'
import { Breadcrumbs, SeeAlso, PageTitle } from 'siteComponents'

const Page: Template = ({ children }) => {
  const { pageOpts, themeConfig } = useLayoutProps()
  const fullTitle = makeHierarchicalTitle(pageOpts, themeConfig)

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
      </Head>

      <Breadcrumbs />
      <PageTitle>{pageOpts.title}</PageTitle>
      {children}
      <SeeAlso />
    </>
  )
}

export default Page
