import type { Template } from '.'

import Head from 'next/head'
import { Tabs } from 'nextra/components'

import { PredefinedImage } from '../../lib/components'
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
    <Tabs items={['a', 'b', 'c']}>
      <Tabs.Tab>
        Tab A
      </Tabs.Tab>

      <Tabs.Tab>
        Tab B
      </Tabs.Tab>

      <Tabs.Tab>
        Tab 3
      </Tabs.Tab>
    </Tabs>
  </>
}

export default Collection
