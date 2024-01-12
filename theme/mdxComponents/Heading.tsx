import { useHeadingCounter } from '../contexts'

type HeadingProps = React.ComponentProps<'h1'>
type HeadingComponent = (props: HeadingProps) => React.ReactNode

const plainHeadings: HeadingComponent[] = [
  props => <h1 {...props} />,
  props => <h2 {...props} />,
  props => <h3 {...props} />,
  props => <h4 {...props} />,
  props => <h5 {...props} />,
  props => <h6 {...props} />,
]

function WrapHeadingComponent(level: number): HeadingComponent {
  return function WrappedHeading(props: HeadingProps): React.ReactNode {
    const Heading = plainHeadings[level - 1]
    const countHeading = useHeadingCounter()
    const headingCount = countHeading(level)

    return (
      <Heading {...props} className="mdx-heading">
        <a className="mdx-heading-link" href={`#${props.id}`}>
          <span className="mdx-heading-counter">{headingCount} </span>
          {props.children}
          <span className="mdx-heading-link-indicator"> 🔗</span>
        </a>
      </Heading>
    )
  }
}

export const H1 = WrapHeadingComponent(1)
export const H2 = WrapHeadingComponent(2)
export const H3 = WrapHeadingComponent(3)
export const H4 = WrapHeadingComponent(4)
export const H5 = WrapHeadingComponent(5)
export const H6 = WrapHeadingComponent(6)

const exports = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
} satisfies Record<string, HeadingComponent>

export default exports
