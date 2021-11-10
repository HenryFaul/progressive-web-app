import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/layout/layout";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    background: {
      default: "#e4f0e2"
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <Layout>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />

          <meta name='mobile-web-app-capable' content='yes' />

          <title>HonestApp</title>

          <link rel="manifest" href="/manifest.json" />
          <link
            href="/icons/icon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/icons/icon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
          <meta name="theme-color" content="#317EFB" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>



        <Container >
          <Component bgcolor="primary.main" {...pageProps} />
        </Container>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
