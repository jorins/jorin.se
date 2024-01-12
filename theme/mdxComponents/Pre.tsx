interface PreProps extends React.ComponentProps<'pre'> {
  filename?: string
}

export function Pre({
  children,
  filename,
  ...props
}: PreProps): React.ReactNode {
  return (
    <div className="mdx-code-block">
      {filename && <div className="mdx-code-block-filename">{filename}</div>}
      <pre {...props}>{children}</pre>
    </div>
  )
}

const exports = {
  pre: Pre,
}

export default exports
