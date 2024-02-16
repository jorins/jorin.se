import type { Components } from 'nextra/mdx'

import anchor from './Anchor'
import code from './Code'
import headings from './Heading'
import pre from './Pre'
import svg from './Svg'

export const mdxComponents: Components = {
  ...anchor,
  ...headings,
  ...pre,
  ...code,
  ...svg,
}

export default mdxComponents
