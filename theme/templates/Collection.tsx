import type { Template } from '../templates'

import { Tabs } from 'nextra/components'

import { PredefinedImage } from '../../lib/components'
import styles from './Collection.module.scss'

const Collection: Template = ({children, pageOpts}) => {
  const imgId = pageOpts.route.split('/')[1]

  return <>
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
