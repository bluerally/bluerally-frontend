import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta property="og:title" content={'Buooy'} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={'https://buooy.kr'} />
          <meta property="og:article:author" content="Buooy" />
          <meta property="og:image" content="/images/OG.png" />
          <meta
            property="og:description"
            content="물속에서 만나요, Buooy와 함께"
          />
          <meta property="og:site_name" content="Buooy" />
          <meta property="og:locale" content="en_US" />
          <Script
            type="text/javascript"
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
