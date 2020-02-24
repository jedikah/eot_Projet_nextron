import React, { useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import "./splash.css";

import * as DB from "../models";

let path = DB.homeDir("ECM");

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(150, 0, 0, 0)",
      opacity: 1,
      animation: "fadein 2s"
    },
    initial: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(150, 0, 0, 0)",
      opacity: 0,
      animation: "fadeout 2s"
    },
    img: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto"
    }
  })
);

const Splash = () => {
  const classes = useStyles();
  const [trans, setTrans] = React.useState(null);
  useEffect(() => {
    setTimeout(() => {
      setTrans(true);
    }, 100);
    setTimeout(() => {
      setTrans(false);
    }, 8500);
  });
  return (
    <div className={trans === true ? classes.root : classes.initial}>
      <img src="/images/eot.png" width="200" />
    </div>
  );
};

export default Splash;
