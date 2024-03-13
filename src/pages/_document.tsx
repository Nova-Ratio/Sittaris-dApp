import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
                font-family: "Fontspring";
                src: url("/fonts/demo-fonts/demo-termina-regular.otf");
            }
            @font-face {
                font-family: "FontspringBold";
                src: url("/fonts/demo-fonts/demo-termina-demi.otf");
            }
            @font-face {
                font-family: "FontspringLight";
                src: url("/fonts/demo-fonts/demo-termina-light.otf");
            }
            @font-face {
                font-family: "Satoshi";
                src: url("/fonts/Satoshi-Variable.ttf");
            }
            `,
          }}
        ></style>
        <link
          href="/fonts/demo-fonts/demo-termina-regular.otf"
          rel="stylesheet"
        />
        <link href="/fonts/Satoshi-Variable.ttf" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" />
        <meta name="msapplication-TileImage" content="/favicon.svg" />
        <meta name="description" content="Sittaris dApp" />
        <meta property="og:title" content="Sittaris dApp" />
        <meta property="og:url" content="https://example.io/" />
        <meta property="og:site_name" content="Sittaris dApp" />
        <meta
          property="og:image"
          content="https://example.io/images/1500x500.jpg"
        />
        <meta
          property="og:image:secure_url"
          content="https://example.io/images/1500x500.jpg"
        />
        <meta property="og:image:width" content="1500" />
        <meta property="og:image:height" content="500" />
        <meta property="og:image:alt" content="Sittaris dApp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sittaris dApp" />
        <meta name="twitter:description" content="Sittaris dApp" />
        <meta name="twitter:image" content="https://example.io/og-image.png" />
        <meta name="twitter:image:alt" content="Sittaris dApp" />
      </Head>
      <body className=" bgGradientLight  dark:bgGradient">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
