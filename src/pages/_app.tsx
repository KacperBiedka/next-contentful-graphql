import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import apolloClient from "../lib/apolloClient";
import "../styles/globals.css";
import DefaultLayout from "../layouts/defaultLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </ApolloProvider>
  );
}

export default MyApp;
