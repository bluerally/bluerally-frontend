import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { Theme } from '@radix-ui/themes';

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <Script
            type="text/javascript"
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2977085f32ebc3202864858d3de8d37f&libraries=services"
          />
        </Head>
        <body className="bg-slate-200">
          <Theme>
            <Main />
            <NextScript />
          </Theme>
        </body>
      </Html>
    );
  }
}
