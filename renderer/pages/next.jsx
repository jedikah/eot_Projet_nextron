import React, { useEffect, useState, createRef } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Link } from "../components";
import { Scale } from "react-scaling";

import * as DB from "../models";
import { ROUTE_MENU } from "../redux/reducers/menu";
import NextCtn from "../redux/containers/NextCtn";
import Container from "../components/layouts/Container";
import SideNavPage from "../redux/containers/SideNavPageCtn";
import ToolBar from "../components/ToolBar";
import RemoteWindow from "../components/RemoteWindow";
import NewWork from "../components/MainComponent/NewWorkComponent/NewWork";
import ElaborationTravaux from "../components/MainComponent/ElaborationTravaux";
import PlanningPan from "../components/MainComponent/Planning";
import { Button } from "@material-ui/core";

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
      display: "flex"
    }
  })
);

const Next = ({ actions, routeMenu }) => {
  const classes = useStyles({});
  const [state, setState] = useState({
    width: 800
  });
  useEffect(() => {
    setState({
      ...state,
      width: window.innerWidth
    });
    window.addEventListener("resize", () => {
      setState({
        ...state,
        width: window.innerWidth
      });
    });
  }, []);
  useEffect(() => {
    let path = DB.homeDir("ECM");
    path += "EMC.sqlite";
    const db = DB.connect(path);
    DB.selectUsers(db, rows => actions.initUser({ users: rows }));
    DB.selectClients(db, rows => actions.initClient({ clients: rows }));
    DB.selectTravaux(db, rows => actions.initTravau({ travaux: rows }));
    DB.selectLetreCharges(db, rows =>
      actions.initLettreCharge({ lettreCharges: rows })
    );
    DB.selectConvocations(db, rows =>
      actions.initConvocation({ convocations: rows })
    );
    DB.selectPV(db, rows => actions.initPv({ pvs: rows }));
  }, []);

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
        <RemoteWindow bg="#272727">E.O.T MANAGER</RemoteWindow>
        <Container justify="toolBar" className={classes.main}>
          <SideNavPage />
          <div className={classes.innerMain}>
            <div>
              <ToolBar>
                <Link href="/home">Se déconnecter</Link>
              </ToolBar>
            </div>
            <div className={classes.contenue}>
              {routeMenu === ROUTE_MENU.NEWDOC && <NewWork />}
              {routeMenu === ROUTE_MENU.ELABORATION && <ElaborationTravaux />}
              {routeMenu === ROUTE_MENU.PLANING && <PlanningPan />}
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default NextCtn(Next);
