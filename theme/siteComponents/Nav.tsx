import type { PageOpts } from 'nextra'
import type { FullThemeConfig } from '../lib/config'

import React from 'react'
import YgLogo from './YgLogo'
import { isFolder, isMdxFile, findIndex } from '../lib/pageMap'

export interface LinkSpec {
  id: string
  title: string
  href: string
}

export interface NavProps {
  pageOpts: PageOpts
  themeConfig: FullThemeConfig
}

export interface MoreNavProps {}

export function Nav({ pageOpts, themeConfig }: NavProps): JSX.Element {
  const indexPage = pageOpts.pageMap.filter(isMdxFile).find(findIndex)
  if (indexPage === undefined) {
    throw new Error('Cannot find index page')
  }

  const collectionPages = pageOpts.pageMap
    .filter(isFolder)
    .map(page => {
      const collectionIndex = page.children
        .filter(isMdxFile)
        .find(findIndex)

      if (collectionIndex === undefined) {
        throw new Error(`Failed to find index of collection folder '${page.route}'`)
      }

      return collectionIndex
    })

  const internalPages = [indexPage, ...collectionPages]

  return (
    <nav id="site-navigation" className="site-block">
      <header id="site-navigation-header">
        <YgLogo />
        <h1>Jorin&apos;s website</h1>
      </header>

      <div id="site-navigation-internal">
        <h1>Site navigation</h1>
        <ul>
          {internalPages.map(page => (
            <li key={page.route}>
              <a href={page.route}>{page?.frontMatter?.shortTitle}</a>
            </li>
          ))}
        </ul>
      </div>

      <div id="site-navigation-external">
        <h1>External links</h1>
        <ul>
          {themeConfig.externalLinks.map(({ id, title, href }) => (
            <li key={id}>
              <a rel="me" target="_blank" href={href}>
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Nav
