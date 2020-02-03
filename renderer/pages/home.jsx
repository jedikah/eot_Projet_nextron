import React, { useState, useEffect } from "react";
import Head from "next/head";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Link } from "../components";
import ParticleField from "react-particles-webgl";

import HomeCtn from "../redux/containers/HomeCtn";
import Container from "../components/layouts/Container";
import SignIn from "../components/SignIn";
import RemoteWindow from "../components/RemoteWindow";
import animConfig from "../components/animConfig";
import * as DB from "../models";

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

const Home = ({ actions, users }) => {
  const classes = useStyles({});
  console.log("stores ", users);
  useEffect(() => {
    //async () => {
    let path = DB.homeDir("ECM");
    path += "EMC.sqlite";
    const db = DB.connect(path);
    DB.selectUsers(db, rows => {
      console.log("home", rows);
      actions.initUser({ users: rows });
    });
    //};
  }, []);

  return (
    <div className={classes.root}>
      <RemoteWindow bg="#272727">AUTHENTIFICATION</RemoteWindow>
      <Container justify="center">
        <ParticleField config={config} />
        <SignIn></SignIn>
      </Container>
    </div>
  );
};

export default HomeCtn(Home);
