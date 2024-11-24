import type { Heading } from 'nextra'

interface WrapperProps {
  children: React.ReactNode[]
  toc: Heading[]
}

function Wrapper({ children }: WrapperProps): React.ReactNode {
  return <>{children}</>
}

const exports = {
  wrapper: Wrapper,
}

export default exports
