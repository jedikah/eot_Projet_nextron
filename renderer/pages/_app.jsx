import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../lib";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";

import store from "../redux/store";

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <React.Fragment>
          <Head>
            <title>with-javascript-material-ui</title>
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </React.Fragment>
      </Provider>
    );
  }
}

export default withRedux(store)(MyApp);
