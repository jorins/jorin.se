import type { Locale } from "../theme/lib/types";

import { Html, Head, Main, NextScript } from "next/document";
import Background from "../theme/siteComponents/Background";

const lang: Locale = "en-GB";

export default function Document() {
  const meta = {
    description: "Jorin's personal website",
  };

  return (
    <Html lang={lang}>
      <Head>
        <meta name="description" content={meta.description} />
      </Head>
      <body>
        <Background />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
