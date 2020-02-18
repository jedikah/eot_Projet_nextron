import React, { useEffect, useState, createRef } from "react";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import { Link } from "../components";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import orange from "@material-ui/core/colors/orange";
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
import Facture from "../components/MainComponent/Facture";
import SettingCtn from "../redux/containers/SettingCtn";
import Setting from "../components/MainComponent/setting";

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
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    color: orange[500],
    height: "35px",
    padding: 0,
    marginLeft: "10px"
  },
  closeButton: {
    padding: 0,
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: orange[500]
  }
});
const DialogTitles = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <DialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

const Next = ({ actions, routeMenu, users, settings }) => {
  const classes = useStyles({});

  const [state, setState] = useState({
    width: 800
  });
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [open, setOpen] = React.useState(true);

  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);
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
    if (users[0]) {
      DB.selectSettings(db, users[0].IdUser, rows =>
        actions.initSetting({ settings: rows })
      );
    }
  }, [users[0]]);
  useEffect(() => {
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
    DB.selectFacture(db, rows => actions.initFacture({ factures: rows }));
  }, []);

  const handleClose = e => {
    e.preventDefault();
    DB.updateSetting(db, [0, users[0].IdUser, "FirstRun"]);
    actions.updateSetting({
      Value: 0,
      IdUser: users[0].IdUser,
      NameSetting: "FirstRun"
    });
    setOpen(false);
  };
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
                <Button>PARAMETTRE</Button>
                <Button>
                  <Link href="/home">Se déconnecter</Link>
                </Button>
              </ToolBar>
            </div>
            <div className={classes.contenue}>
              {routeMenu === ROUTE_MENU.NEWDOC && <NewWork />}
              {routeMenu === ROUTE_MENU.ELABORATION && <ElaborationTravaux />}
              {routeMenu === ROUTE_MENU.PLANING && <PlanningPan />}
              {routeMenu == ROUTE_MENU.FACTURE && <Facture />}
              {routeMenu == ROUTE_MENU.SETTING && <Setting />}
              {users[0] &&
                settings[0] &&
                settings.filter(
                  item =>
                    item.IdUser === users[0].IdUser &&
                    item.NameSetting === "FirstRun"
                )[0].Value === "1" && (
                  <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                  >
                    <DialogTitles id="customized-dialog-title">
                      PARAMETTRE
                    </DialogTitles>
                    <DialogContent dividers>
                      <SettingCtn />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        autoFocus
                        onClick={handleClose}
                        style={{ color: orange[500] }}
                      >
                        Fermer
                      </Button>
                    </DialogActions>
                  </Dialog>
                )}
              }
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default NextCtn(Next);
