import type { Template } from '.'

import Head from 'next/head'

import { PredefinedImage } from '../../lib/components'

import CollectionContents from '../components/CollectionContents'
import { makeTitle } from '../lib/title'

import styles from './Collection.module.scss'

const Collection: Template = ({children, pageOpts, themeConfig}) => {
  const imgId = pageOpts.route.split('/')[1]
  const pageTitle = pageOpts.frontMatter.shortTitle ?? pageOpts.title
  const fullTitle = makeTitle([pageTitle], themeConfig)

  return <>
    <Head>
      <title>{fullTitle}</title>
    </Head>

    <PredefinedImage imgId={imgId} asFigure={false} override={{id: styles.headerImage}} />
    <h1 id={styles.title}>{pageOpts.title}</h1>
    {children}
    <CollectionContents pageOpts={pageOpts} themeConfig={themeConfig} />
  </>
}

export default Collection
