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

  furtherReadingLinks: [
    {
      href: 'https://en.wikipedia.org/wiki/Capacitor',
      hrefLang: 'en',
      name: 'Wikipedia (en) - Capacitor',
      lang: 'en',
    },

    {
      href: 'https://sv.wikipedia.org/wiki/Kondensator',
      hrefLang: 'sv-SE',
      name: 'Wikipedia (sv) - Kondensator',
      lang: 'sv-SE',
    },

    {
      href: 'https://vocademy.net/textbooks/dcelectronics/Part5/PageSetup.php?CourseDirectory=dcelectronics&Page=44&FileName=Capacitors',
      hrefLang: 'en-US',
      name: 'Vocademy - Capacitors',
      lang: 'en-US',
    },

    {
      href: 'https://vocademy.net/textbooks/acelectronics/Part2/PageSetup.php?CourseDirectory=acelectronics&Page=13&FileName=CapacitorsInACCircuits',
      hrefLang: 'en-US',
      name: 'Vocademy - Capacitors in AC Circuits',
      lang: 'en-US',
    },

    {
      href: 'https://www.mattmillman.com/info/crimpconnectors/common-jst-connector-types',
      hrefLang: 'en-US',
      name: "Matt's Tech Pages - Common JST Connector Types",
      lang: 'en-US',
    },

    {
      href: 'https://www.mattmillman.com/info/crimpconnectors/dupont-and-dupont-connectors/',
      hrefLang: 'en-US',
      name: `Matt's Tech Pages - DuPont and “DuPont” connectors, and how to crimp them properly`,
      lang: 'en-US',
    },
    {
      href: 'https://en.wikipedia.org/wiki/Diode',
      hrefLang: 'en',
      name: 'Wikipedia (en) - Diode',
      lang: 'en',
    },
    {
      href: 'https://sv.wikipedia.org/wiki/Diod',
      hrefLang: 'sv-SE',
      name: 'Wikipedia (sv) - Diod',
      lang: 'sv-SE',
    },
    {
      href: 'https://en.wikipedia.org/wiki/Equalization_(audio)',
      hrefLang: 'en',
      name: 'Wikipedia (en) - Equalization (audio)',
      lang: 'en',
    },
    {
      href: 'https://en.wikipedia.org/wiki/Filter_(signal_processing)',
      hrefLang: 'en',
      name: 'Wikipedia (en) - Filter (signal processing)',
      lang: 'en',
    },
    {
      href: 'https://sv.wikipedia.org/wiki/Filter_(signalbehandling)',
      hrefLang: 'sv-SE',
      name: 'Wikipedia (sv) - Filter (signalbehandling)',
      lang: 'sv-SE',
    },
    {
      href: 'https://en.wikipedia.org/wiki/Inductor',
      hrefLang: 'en',
      name: 'Wikipedia (en) - Inductor',
      lang: 'en',
    },
    {
      href: 'https://sv.wikipedia.org/wiki/Induktor',
      hrefLang: 'sv-SE',
      name: 'Wikipedia (sv) - Induktor',
      lang: 'sv-SE',
    },
    {
      href: 'https://vocademy.net/textbooks/dcelectronics/Part5/PageSetup.php?CourseDirectory=dcelectronics&Page=57&FileName=Inductors',
      hrefLang: 'en-US',
      name: 'Vocademy - Inductors',
      lang: 'en-US',
    },
    {
      href: 'https://vocademy.net/textbooks/acelectronics/Part2/PageSetup.php?CourseDirectory=acelectronics&Page=14&FileName=InductorsInACCircuits',
      hrefLang: 'en-US',
      name: 'Vocademy - Inductors in AC circuits',
      lang: 'en-US',
    },
    {
      href: 'https://minimidi.world',
      hrefLang: 'en',
      name: 'minimidi.world - A simplified guide to MIDI over TRS minijacks',
      lang: 'en',
    },
    {
      href: 'https://en.wikipedia.org/wiki/ISO_metric_screw_thread',
      hrefLang: 'en',
      name: 'Wikipedia (en) - ISO metric screw thread',
      lang: 'en',
    },
    {
      href: 'https://en.wikipedia.org/wiki/List_of_screw_drives',
      hrefLang: 'en',
      name: 'Wikipedia (en) - List of screw drives',
      lang: 'en',
    },
    {
      href: 'https://en.wikipedia.org/wiki/Unit_of_measurement',
      hrefLang: 'en',
      name: 'Wikipedia (en) - Unit of measurement',
      lang: 'en',
    },
    {
      href: 'https://sv.wikipedia.org/wiki/M%C3%A5ttenhet',
      hrefLang: 'sv-SE',
      name: 'Wikipedia (sv) - Måttenhet',
      lang: 'sv-SE',
    },
    {
      href: 'https://en.wikipedia.org/wiki/Harmonic_series_(music)',
      hrefLang: 'en',
      name: 'Wikipedia (en) - Harmonic series',
      lang: 'en',
    },

    //{
    //  href: '',
    //  hrefLang: '',
    //  name: '',
    //  lang: '',
    //},
  ],
}

export default config
