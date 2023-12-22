import type { Heading } from "nextra"

export interface TocProps {
  headings: Heading[]
}

export default function Toc({headings}: TocProps): JSX.Element {
  return (
    <nav id="toc" className="site-block">
      <h1>Table of Contents</h1>
      <ul>
        {headings.map(heading => {
          return <li key={heading.id}>
            <a href={heading.id}>{heading.value}</a>
          </li>
        })}
      </ul>
    </nav>
  )
}
