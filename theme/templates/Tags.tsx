import type { Template } from '.'

import Head from 'next/head'

import { makeTitle } from '../lib/title'

const Tags: Template = ({ children, pageOpts, themeConfig }) => {
  const pageTitle = pageOpts.frontMatter.shortTitle ?? pageOpts.title
  const fullTitle = makeTitle([pageTitle], themeConfig)

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
      </Head>

      {children}
    </>
  )
}

export default Tags
