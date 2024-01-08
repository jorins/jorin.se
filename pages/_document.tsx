import type { Locale } from '../theme/lib/types'

import { Html, Head, Main, NextScript } from 'next/document'
import Background from '../theme/siteComponents/Background'

const lang: Locale = 'en-GB'

export default function Document() {
  const meta = {
    description: "Jorin's personal website",
  }

  return (
    <Html lang={lang}>
      <Head>
        <meta name="description" content={meta.description} />
        <link rel="icon" href="/images/emblem-256.png" sizes="256x256" />
        <link rel="icon" href="/images/emblem-64.png" sizes="64x64" />
        <link rel="icon" href="/images/emblem-32.png" sizes="32x32" />
      </Head>
      <body>
        <Background />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
