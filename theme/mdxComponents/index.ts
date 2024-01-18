import type { MDXProvider } from 'nextra/mdx'

import anchor from './Anchor'
import code from './Code'
import headings from './Heading'
import pre from './Pre'

type MDXComponents = Parameters<typeof MDXProvider>[0]['components']

export const mdxComponents: MDXComponents = {
  ...anchor,
  ...headings,
  ...pre,
  ...code,
}

export default mdxComponents
