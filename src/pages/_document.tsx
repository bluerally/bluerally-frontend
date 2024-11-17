import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <Script
            type="text/javascript"
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services`}
          />
        </Head>
        <body className="bg-g-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
