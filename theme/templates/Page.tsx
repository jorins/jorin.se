import type { Template } from '.'

import Head from 'next/head'

import { makeHierarchicalTitle } from '../lib/title'
import { HierarchyNav, SeeAlso, PageTitle } from '../siteComponents'
import { useLayoutProps } from '../contexts'

const Page: Template = ({ children }) => {
  const { pageOpts, themeConfig } = useLayoutProps()
  const fullTitle = makeHierarchicalTitle(pageOpts, themeConfig)

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
      </Head>

      <HierarchyNav />
      <PageTitle>{pageOpts.title}</PageTitle>
      {children}
      <SeeAlso />
    </>
  )
}

export default Page
