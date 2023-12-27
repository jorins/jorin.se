import type { Template } from '.'

import Head from 'next/head'

import { makeTitle } from '../lib/title'
import { PageTitle } from '../siteComponents'

const Page: Template = ({ children, pageOpts, themeConfig }) => {
  const pageTitle = pageOpts.frontMatter.shortTitle ?? pageOpts.title
  const fullTitle = makeTitle([pageTitle], themeConfig)

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
