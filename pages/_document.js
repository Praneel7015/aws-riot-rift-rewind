import { Html, Head, Main, NextScript } from 'next/document';

const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const umamiScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;

export default function Document() {
  return (
    <Html>
      <Head>
        {umamiWebsiteId && umamiScriptUrl && (
          <script
            defer
            src={umamiScriptUrl}
            data-website-id={umamiWebsiteId}
          />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
