import type { MDXComponents } from 'nextra/mdx'

import anchor from './Anchor'
import code from './Code'
import headings from './Heading'
import pre from './Pre'
import svg from './Svg'
import wrapper from './Wrapper'

export const mdxComponents: MDXComponents = {
  ...anchor,
  ...headings,
  ...pre,
  ...code,
  ...svg,
  ...wrapper,
}

export default mdxComponents
