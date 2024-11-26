import type { Heading } from 'nextra'

import { useHeadings } from 'contexts'

interface WrapperProps {
  children: React.ReactNode[]
  toc: Heading[]
}

function Wrapper({ children, toc }: WrapperProps): React.ReactNode {
  const { registerHeadings } = useHeadings()
  registerHeadings(toc)
  return children
}

const exports = {
  wrapper: Wrapper,
}

export default exports
