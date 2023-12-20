import type { Locale } from '../lib/types'

import { Html, Head, Main, NextScript } from 'next/document'

const lang: Locale = 'en-GB'

export default function Document() {
  const meta = {
    description: 'Jorin\'s personal website',
  }

  return (
    <Html lang={lang}>
      <Head>
        <meta name="description" content={meta.description} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
