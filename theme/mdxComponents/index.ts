import type { MDXProvider } from 'nextra/mdx'

import anchor from './Anchor'
import headings from './Heading'

type MDXComponents = Parameters<typeof MDXProvider>[0]['components']

export const mdxComponents: MDXComponents = {
  ...anchor,
  ...headings,
}

export default mdxComponents
