import { Montserrat } from "next/font/google";
import "../styles/globals.scss"
import React from "react";
import ErrorBoundary from "components/ErrorBoundary ";

export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment >
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </React.Fragment>);
}
