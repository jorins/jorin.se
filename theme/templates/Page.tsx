import type { Template } from '.'

import Head from 'next/head'
import { useRouter } from 'nextra/hooks'

import { useLayoutProps } from 'contexts'
import { makeHierarchicalTitle } from 'lib/title'
import { Breadcrumbs, Main, SeeAlso, PageTitle } from 'siteComponents'

const Page: Template = ({ children }) => {
  const { pageOpts, themeConfig } = useLayoutProps()
  const { route } = useRouter()
  const fullTitle = makeHierarchicalTitle(pageOpts.pages, route, themeConfig)

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
      </Head>

      <Main>
        <Breadcrumbs />
        <PageTitle>{pageOpts.title}</PageTitle>
        {children}
        <SeeAlso />
      </Main>
    </>
  )
}

export default Page
