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
import SignIn from "../components/SignIn";

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
    marginLeft: "10px",
    transform: "scale(0.5)"
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
    <DialogTitle
      className={classes.root}
      {...other}
      style={{
        width: "100%",
        height: 60,
        boxShadow: "0px 0px 10px #888888",
        borderRadius: "10px 10px 10px 10px",
        textAlign: "center"
      }}
    >
      <Typography variant="button" style={{ fontSize: "2em" }}>
        {children}
      </Typography>
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

const Next = ({ actions, routeMenu, users, settings, maxs }) => {
  const classes = useStyles({});
  const { remote } = require("electron");

  const [zoom, setZoom] = React.useState(1280 * 100);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [open, setOpen] = React.useState(true);
  const [openSingIn, setOpenSingIn] = React.useState(true);
  const [state, setState] = React.useState({
    user: "",
    password: "",
    match: false,
    saveRouter: ""
  });
  const [show, setShow] = React.useState(false);

  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);
  const eventListener = () => {
    let width = 0;
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
  };

  useEffect(() => {
    if (users[0]) {
      DB.selectSettings(db, users[0].IdUser, rows =>
        actions.initSetting({ settings: rows })
      );
    }
  }, [users[0]]);

  useEffect(() => {
    setShow(false);
    DB.selectUsers(db, rows => actions.initUser({ users: rows }));
    DB.selectClients(db, rows => actions.initClient({ clients: rows }));
    DB.selectTravaux(db, rows => {
      DB.selectCountTrav(db, Count => {
        actions.initTravau({ travaux: rows, CountTravaux: Count });
      });
    });

    DB.selectLetreCharges(db, rows =>
      actions.initLettreCharge({ lettreCharges: rows })
    );

    DB.selectPV(db, rows => actions.initPv({ pvs: rows }));
    DB.selectFacture(db, rows => {
      DB.selectCountFact(db, Count => {
        let IdCli = [],
          i = 0;

        rows.forEach(element => {
          IdCli[i++] = element.IdCli;
        });
        let removeDuplicatesIdCli = [...new Set(IdCli)];
        actions.initFacture({
          factures: rows,
          CountFactures: Count,
          IdCliFromFacture: removeDuplicatesIdCli
        });
      });
    });

    eventListener();
    setTimeout(() => {
      setShow(true);
    }, 3000);
  }, []);

  const handleClose = e => {
    e.preventDefault();
    DB.updateSetting(db, [0, users[0].IdUser, "FirstRun"]);
    actions.updateSetting({
      Value: 0,
      IdUser: users[0].IdUser,
      NameSetting: "FirstRun"
    });
    actions.changeRouteMenu({ routeMenu: state.saveRouter });
    setOpen(false);
    setOpenSingIn(false);
  };

  const setMax = rm => {
    actions.setMax({ maxs: rm });
  };

  const Loader = () => {
    const loaderStyles = makeStyles(theme =>
      createStyles({
        root: {
          backgroundColor: "white",
          height: "100%"
        },
        svg: {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(45deg) scale(1)"
        },
        strokeStill: {
          stroke: "#232323"
        },
        strokeAnimation: {
          animation: "$stroke-spacing 1.2s ease-in, $stroke-color 4.8s linear",
          animationIterationCount: "infinite",
          animationDelay: 0,
          animationDirection: "normal",
          animationFillMode: "forwards",
          animationPlayState: "running",
          transformOrigin: "center center"
        },
        "@keyframes stroke-spacing": {
          "0%": {
            strokeDasharray: "0 200"
          },
          "45%": {
            strokeDashoffset: "0",
            strokeDasharray: "200 200"
          },
          "90%": {
            strokeDashoffset: "-200",
            strokeDasharray: "200 200"
          },
          "100%": {
            strokeDashoffset: "-200",
            strokeDasharray: "200 200"
          }
        },
        "@keyframes stroke-color": {
          "0% ": { stroke: "#3498DB" },
          "24%": { stroke: "#643232" },
          "25%": { stroke: "#327864" },
          "49%": { stroke: "#327864" },
          "50%": { stroke: "#32326e" },
          "74%": { stroke: "#32326e" },
          "75%": { stroke: "#78325a" },
          "99%": { stroke: "#78325a" }
        }
      })
    );
    const loaderClasses = loaderStyles({});

    return (
      <Container
        justify="left"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          background: "#282828"
        }}
      >
        <svg
          className={loaderClasses.svg}
          width="200"
          height="200"
          viewBox="0 0 100 100"
        >
          <polyline
            className={loaderClasses.strokeStill}
            points="0,0 100,0 100,100"
            stroke-width="10"
            fill="none"
          ></polyline>
          <polyline
            className={loaderClasses.strokeStill}
            points="0,0 0,100 100,100"
            stroke-width="10"
            fill="none"
          ></polyline>
          <polyline
            className={loaderClasses.strokeAnimation}
            points="0,0 100,0 100,100"
            stroke-width="10"
            fill="none"
          ></polyline>
          <polyline
            className={loaderClasses.strokeAnimation}
            points="0,0 0,100 100,100"
            stroke-width="10"
            fill="none"
          ></polyline>
        </svg>
      </Container>
    );
  };

  return (
    <div
      className={classes.root}
      style={{ zoom: "" + zoom / 1922 + "%", background: "#28282882" }}
    >
      {(show === false && <Loader />) ||
        (show === true && (
          <Container
            justify="left"
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              height: "100%"
            }}
          >
            <RemoteWindow bg="#272727" setMax={setMax} getMax={maxs}>
              E.O.T MANAGER
            </RemoteWindow>
            <Container justify="toolBar" className={classes.main}>
              <SideNavPage />
              <div className={classes.innerMain}>
                <div>
                  <ToolBar>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ margin: 0, lineHeight: 0, height: "100%" }}
                    >
                      <Link
                        href="/home"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Retour à la page d'authentification
                      </Link>
                    </Button>
                  </ToolBar>
                </div>
                <div
                  className={classes.contenue}
                  style={{ backgroundColor: "white" }}
                >
                  {routeMenu === ROUTE_MENU.NEWDOC && <NewWork />}
                  {routeMenu === ROUTE_MENU.ELABORATION && (
                    <ElaborationTravaux />
                  )}
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
                        style={{
                          zoom: "" + zoom / 1922 + "%",
                          boxShadow: "0px 0px 10px #888888",
                          borderRadius: "10px 10px 10px 10px"
                        }}
                        maxWidth={maxWidth}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                      >
                        <DialogTitles id="customized-dialog-title">
                          PARAMETTRE
                        </DialogTitles>
                        <DialogContent
                          dividers
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center"
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center"
                            }}
                          >
                            <SettingCtn />
                          </div>
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
                </div>
              </div>
            </Container>
          </Container>
        ))}
    </div>
  );
};

export default NextCtn(Next);
