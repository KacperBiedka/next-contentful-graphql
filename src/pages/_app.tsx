import type { AppProps } from "next/app";

import "../styles/globals.css";
import DefaultLayout from "../layouts/defaultLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default MyApp;
