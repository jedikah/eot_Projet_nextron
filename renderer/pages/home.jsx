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
      right: 0,
      backgroundImage: "url(/images/home.jpg)",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    },
    signin: {
      boxShadow: "0px 0px 5px #888888",
      backgroundColor: "#fffcfcab"
    },
    div: {
      position: "absolute",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      flexDirection: "row"
    }
  })
);

const Home = ({ actions, users, maxs }) => {
  const classes = useStyles({});
  const [zoom, setZoom] = React.useState(1280 * 100);
  const { remote } = require("electron");

  useEffect(() => {
    let width;
    let min = 1280;
    if (remote.getCurrentWindow().getMaximumSize()[0] >= 1920) min = 1600;
    if (window.innerWidth >= min) width = window.innerWidth * 100;
    else width = min * 100;
    setZoom(width);
    window.addEventListener("resize", () => {
      if (window.innerWidth >= min) width = window.innerWidth * 100;
      else width = min * 100;
      setZoom(width);
    });
  }, []);

  useEffect(() => {
    let path = DB.homeDir("ECM");
    path += "EMC.sqlite";
    const db = DB.connect(path);
    DB.selectUsers(db, rows => actions.initUser({ users: rows }));
  }, []);

  const setMax = rm => {
    actions.setMax({ maxs: rm });
  };
  return (
    <div className={classes.root} style={{ zoom: zoom / 1922 + "%" }}>
      <RemoteWindow bg="#272727" setMax={setMax} getMax={maxs}>
        AUTHENTIFICATION
      </RemoteWindow>
      <Container justify="center">
        <ParticleField config={config} />
        <div style={{ backgroundColor: "white" }}></div>
        {users[0] && (
          <div className={classes.div}>
            <SignIn
              authentification
              className={classes.signin}
              style={{ zIndex: 2, boxShadow: "0px 0px 20px #000" }}
            ></SignIn>
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: 480,
                zIndex: 1,
                filter: "blur(2px)",
                backgroundColor: "#f5f3f352"
              }}
            ></div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default HomeCtn(Home);
