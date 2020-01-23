import React from "react";
import Head from "next/head";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "./components/layouts/Container";
import { Link } from "../components";

import NextCtn from "../redux/containers/NextCtn";
import SideNavPage from "./components/SideNavPage";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  })
);

const Next = () => {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <Head>
        <title>EOT Manager</title>
      </Head>
      <Container justify="center" style={{ border: "1px solid red" }}>
        <SideNavPage />
      </Container>
    </div>
  );
};

export default NextCtn(Next);
