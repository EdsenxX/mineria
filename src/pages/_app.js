// Dependencies
import Head from "next/head";
// Styles
import "@styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Eduardo Serrano | Mineria de datos</title>
        <meta name="description" content="09 Conexión SdDD BdDD | Mineria de datos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
