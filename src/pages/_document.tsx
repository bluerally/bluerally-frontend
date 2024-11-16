import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>
        <body className="bg-slate-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
