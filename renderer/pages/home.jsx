import React, { useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import ParticleField from "react-particles-webgl";

import HomeCtn from "../redux/containers/HomeCtn";
import Container from "../components/layouts/Container";
import SignIn from "../components/SignIn";
import RemoteWindow from "../components/RemoteWindow";
import animConfig from "../components/animConfig";
import * as DB from "../models";

const config = animConfig;
//const a = window;

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
  useEffect(() => {
    let path = DB.homeDir("ECM");
    path += "EMC.sqlite";
    const db = DB.connect(path);
    DB.selectUsers(db, rows => actions.initUser({ users: rows }));
  }, []);
  console.log(users[0]);
  return (
    <div className={classes.root}>
      <RemoteWindow bg="#272727">AUTHENTIFICATION</RemoteWindow>
      <Container justify="center">
        <ParticleField config={config} />
        {users[0] && <SignIn></SignIn>}
      </Container>
    </div>
  );
};

export default HomeCtn(Home);
