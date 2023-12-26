import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/main.scss";

export default function App(appProps: AppProps) {
  const { Component, pageProps } = appProps;
  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
