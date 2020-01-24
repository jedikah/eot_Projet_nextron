import React, { useState, useEffect } from "react";
import Head from "next/head";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Link } from "../components";

import HomeCtn from "../redux/containers/HomeCtn";
import Container from "./components/layouts/Container";
import SignIn from "./components/SignIn";
import ParticleField from "react-particles-webgl";
import RemoteWindow from "./components/RemoteWindow";

import animConfig from "./components/animConfig";
import { yellow } from "@material-ui/core/colors";

const config = animConfig;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  })
);

const Home = props => {
  const classes = useStyles({});

  useEffect(() => {
    console.log("HOME base props: ", props);

    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(":memory:");
  });

  return (
    <div className={classes.root}>
      <RemoteWindow bg="#fb8c00">AUTHENTIFICATION</RemoteWindow>
      <Container justify="center">
        <ParticleField config={config} />><SignIn></SignIn>
      </Container>
    </div>
  );
};

export default HomeCtn(Home);
