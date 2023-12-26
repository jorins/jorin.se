import type { Template } from ".";

import Head from "next/head";

import PredefinedImage from "../pageComponents/PredefinedImage";
import CollectionContents from "../siteComponents/CollectionContents";
import { makeTitle } from "../lib/title";

import styles from "./Collection.module.scss";

const Collection: Template = ({ children, pageOpts, themeConfig }) => {
  const imgId = pageOpts.route.split("/")[1];
  const pageTitle = pageOpts.frontMatter.shortTitle ?? pageOpts.title;
  const fullTitle = makeTitle([pageTitle], themeConfig);

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
      </Head>

      <header className="collection-header">
        <PredefinedImage
          imgId={imgId}
          asFigure={false}
          override={{ id: styles.headerImage }}
        />
        <h1 id={styles.title}>{pageOpts.title}</h1>
        <div class-name="collection-description">{children}</div>
      </header>

      <CollectionContents pageOpts={pageOpts} themeConfig={themeConfig} />
    </>
  );
};

export default Collection;
