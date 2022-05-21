import type { DocumentContext, DocumentInitialProps } from "next/document";
import Document, { Html, Main, Head, NextScript } from "next/document";

import { extractCritical, EMOTION_CACHE_KEY } from "lib/cache/emotion";

export default class PortfolioDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const { html, ids, css } = extractCritical(initialProps.html);

    const emotionStyles: unknown = (
      <>
        {initialProps.styles}
        <style
          data-emotion={`${EMOTION_CACHE_KEY} ${ids.join(" ")}`}
          dangerouslySetInnerHTML={{ __html: css }}
        />
      </>
    );

    return {
      ...initialProps,
      html,
      styles: emotionStyles as DocumentInitialProps["styles"],
    };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
