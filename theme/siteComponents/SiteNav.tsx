import React from 'react'
import YgLogo from './YgLogo'
import { isFolder, isMdxFile, isIndex } from '../lib/pageMap'
import { useLayoutProps } from '../contexts'

export interface LinkSpec {
  id: string
  title: string
  href: string
}

export interface SiteNavProps {}

/**
 * The common nav block shown on every page including insignia, site
 * navigation, and external links.
 */
export function SiteNav({}: SiteNavProps): JSX.Element {
  const { pageOpts, themeConfig } = useLayoutProps()
  const indexPage = pageOpts.pageMap.filter(isMdxFile).find(isIndex)
  if (indexPage === undefined) {
    throw new Error('Cannot find index page')
  }

  const collectionPages = pageOpts.pageMap.filter(isFolder).map(page => {
    const collectionIndex = page.children.filter(isMdxFile).find(isIndex)

    if (collectionIndex === undefined) {
      throw new Error(
        `Failed to find index of collection folder '${page.route}'`,
      )
    }

    return collectionIndex
  })

  const internalPages = [indexPage, ...collectionPages]

  return (
    <nav id="site-navigation" className="site-block">
      <header id="site-navigation-header">
        <YgLogo />
        <h1>{themeConfig.title.postfix}</h1>
      </header>

      <section id="site-navigation-internal">
        <h2>Site navigation</h2>
        <ul>
          {internalPages.map(page => (
            <li key={page.route}>
              <a href={page.route}>{page?.frontMatter?.shortTitle}</a>
            </li>
          ))}
        </ul>
      </section>

      <section id="site-navigation-external">
        <h2>External links</h2>
        <ul>
          {themeConfig.externalLinks.map(({ id, title, href }) => (
            <li key={id}>
              <a rel="me" target="_blank" href={href}>
                {title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </nav>
  )
}

export default SiteNav
