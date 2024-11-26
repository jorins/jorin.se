import type { ThemeConfig } from './theme/lib/config'

const config: ThemeConfig = {
  lang: 'en-GB',
  title: {
    postfix: "Jorin's website",
    separator: ' · ',
  },
  images: {
    grimoire: {
      alt: 'A grimoire floating above a glowing purple pentagram',
      src: '/images/grimoire.png',
      width: 500,
      height: 500,
    },
    machination: {
      alt: 'On a printed circuit board, a blue glowing orb is suspended in a brass icosahedron. Above, two gears surrounded purple neon parentheses float.',
      src: '/images/machination.png',
      width: 500,
      height: 500,
    },
    ramble: {
      alt: 'A megaphone spits fire and feces.',
      src: '/images/ramble.png',
      width: 500,
      height: 500,
    },
  },
  navLinks: [
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
    },
  ],
}

export default config
