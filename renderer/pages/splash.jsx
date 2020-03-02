import React, { useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import "./splash.css";

import * as DB from "../models";

let path = DB.homeDir("ECM");

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      opacity: 1,
      animation: "fadein 2s"
    },
    initial: {
      opacity: 0,
      animation: "fadeout 3s"
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
  const [trans, setTrans] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setTrans(false);
    }, 8500);
  });
  return (
    <div
      className={trans === true ? classes.root : classes.initial}
      style={{
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
        backgroundColor: "rgba(150, 0, 0, 0)"
      }}
    >
      <img src="/images/splash.png" width="400" height="300" />
    </div>
  );
};

export default Splash;
