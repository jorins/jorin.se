import YgLogo from './YgLogo'

export interface LinkSpec {
  id: string
  title: string
  href: string
}

export interface NavProps {
  internal: LinkSpec[]
  external: LinkSpec[]
}

export default function Nav({internal, external}: NavProps): JSX.Element {
  return (
    <nav id="site-navigation" className="site-block">
      <header id="site-navigation-header">
        <YgLogo />
        <h1>Jorin's website</h1>
      </header>

      <div id="site-navigation-internal">
        <h1>Site navigation</h1>
        <ul>
          {internal.map(({id, title, href}) => (
            <li key={id}>
              <a href={href}>{title}</a>
            </li>
          ))}
        </ul>
      </div>

      <div id="site-navigation-external">
        <h1>External links</h1>
        <ul>
          {external.map(({id, title, href}) => (
            <li key={id}>
              <a rel="me" target="_blank" href={href}>{title}</a>
            </li>
          ))}
        </ul>
      </div>
   </nav>
 )
}
