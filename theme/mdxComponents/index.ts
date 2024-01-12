import type { MDXProvider } from 'nextra/mdx'

import anchor from './Anchor'
import headings from './Heading'
import pre from './Pre'
import code from './Code'

type MDXComponents = Parameters<typeof MDXProvider>[0]['components']

export const mdxComponents: MDXComponents = {
  ...anchor,
  ...headings,
  ...pre,
  ...code,
}

export default mdxComponents
