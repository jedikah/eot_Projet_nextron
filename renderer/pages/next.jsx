import React, { useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import * as DB from "../models";
import { ROUTE_MENU } from "../redux/reducers/menu";
import NextCtn from "../redux/containers/NextCtn";
import Container from "../components/layouts/Container";
import SideNavPage from "../redux/containers/SideNavPageCtn";
import ToolBar from "../components/ToolBar";
import RemoteWindow from "../components/RemoteWindow";
import NewWork from "../components/MainComponent/NewWorkComponent/NewWork";
import ElaborationTravaux from "../components/MainComponent/ElaborationTravaux";

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
      border: "2px solid yellow"
    }
  })
);

const Next = ({ actions, routeMenu }) => {
  const classes = useStyles({});
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
              <ToolBar />
            </div>
            <div className={classes.contenue}>
              {routeMenu === ROUTE_MENU.NEWDOC && <NewWork />}
              {routeMenu === ROUTE_MENU.ELABORATION && <ElaborationTravaux />}
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default NextCtn(Next);
