import React from "react";
import Head from "next/head";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "./components/layouts/Container";
import { Link } from "../components";

import NextCtn from "../redux/containers/NextCtn";
import SideNavPage from "./components/SideNavPage";
import ToolBar from "./components/ToolBar";
import RemoteWindow from "./components/RemoteWindow";
import NouveauDossierTravau from "./components/MainComponent/NouveauDossierTravau";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    main: {
      border: "1px solid green",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start"
    },
    innerMain: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    contenue: {
      width: "100%",
      height: "100%",
      display: "flex",
      border: "1px solid red"
    }
  })
);

const Next = () => {
  const classes = useStyles({});
  const [state, setState] = React.useState("azerty");
  return (
    <div className={classes.root}>
      <Container
        justify="left"
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          height: "100%"
        }}
      >
        <RemoteWindow bg="#1a237e">E.O.T MANAGER</RemoteWindow>
        <Container justify="toolBar" className={classes.main}>
          <SideNavPage />
          <div className={classes.innerMain}>
            <div>
              <ToolBar></ToolBar>
            </div>
            <div className={classes.contenue}>
              <NouveauDossierTravau />
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default NextCtn(Next);
