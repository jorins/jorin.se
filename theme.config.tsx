import type { ThemeConfig } from './theme/config'

const config: ThemeConfig = {
  lang: 'en-GB',
  templates: [
    {
      pattern: '/',
      template: 'page',
    },
    {
      pattern: '/*',
      template: 'collection',
    },
    {
      pattern: '/*/tags',
      template: 'tags',
    },
    {
      pattern: '/*/tags/*',
      template: 'tag',
    },
    {
      pattern: '/*/*',
      template: 'page',
    },
  ],
  nav: {
    internal: [
      {
        id: 'index',
        title: 'Site index',
        href: '/',
      },
      {
        id: 'grimoire',
        title: 'Grimoire',
        href: '/grimoire/',
      },
      {
        id: 'machinations',
        title: 'Machinations',
        href: '/machination/',
      },
      {
        id: 'rambles',
        title: 'Rambles',
        href: '/ramble/',
      },
    ],

    external: [
      {
        id: 'soundcloud',
        title: 'SoundCloud',
        href: 'https://soundcloud.com/yawninggirl',
      },
      {
        id: 'bandcamp',
        title: 'Bandcamp',
        href: 'https://yawninggirl.bandcamp.com',
      },
      {
        id: 'github',
        title: 'GitHub',
        href: 'https://github.com/jorins',
      }
    ],
  }
}

export default config
