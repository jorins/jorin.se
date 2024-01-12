interface CodeProps extends React.ComponentProps<'code'> {}

export function Code({ children, ...props }: CodeProps): React.ReactNode {
  let className = 'mdx-code'

  const hasLineNumbers = 'data-line-numbers' in props
  if (hasLineNumbers) {
    className = `${className} mdx-code-line-numbers`
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

const exports = {
  code: Code,
}

export default exports
