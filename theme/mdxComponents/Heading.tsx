export interface HeadingProps extends React.HTMLProps<HTMLHeadingElement> {}

type HeadingLevel = `h${1 | 2 | 3 | 4 | 5 | 6}`
type HeadingComponent = (props: HeadingProps) => React.ReactNode

const plainHeadings: Record<HeadingLevel, HeadingComponent> = {
  h1: props => <h1 {...props} />,
  h2: props => <h2 {...props} />,
  h3: props => <h3 {...props} />,
  h4: props => <h4 {...props} />,
  h5: props => <h5 {...props} />,
  h6: props => <h6 {...props} />,
}

function WrapHeadingComponent(Heading: HeadingComponent): HeadingComponent {
  return function WrappedHeading(props: HeadingProps): React.ReactNode {
    return (
      <Heading {...props} className="mdx-heading">
        <a className="mdx-heading-link" href={`#${props.id}`}>
          {props.children}
          <span className="mdx-heading-link-indicator"> #</span>
        </a>
      </Heading>
    )
  }
}

export const H1 = WrapHeadingComponent(plainHeadings.h1)
export const H2 = WrapHeadingComponent(plainHeadings.h2)
export const H3 = WrapHeadingComponent(plainHeadings.h3)
export const H4 = WrapHeadingComponent(plainHeadings.h4)
export const H5 = WrapHeadingComponent(plainHeadings.h5)
export const H6 = WrapHeadingComponent(plainHeadings.h6)

const exports: Record<HeadingLevel, HeadingComponent> = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
}

export default exports
