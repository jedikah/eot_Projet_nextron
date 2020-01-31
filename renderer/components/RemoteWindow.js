import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import CropDinIcon from "@material-ui/icons/CropDin";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AllOutTwoToneIcon from "@material-ui/icons/AllOutTwoTone";

const RemoteWindow = props => {
  const useStyles = makeStyles(theme =>
    createStyles({
      content: {
        padding: 0,
        margin: 0,
        display: "flex",
        width: "100vw",
        height: "25px",
        flexDirection: "column",
        background: props.bg
      },
      header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignSelf: "stretch",
        WebkitAppRegion: "drag"
      },
      option: {
        paddingRight: 5,
        paddingLeft: 5,
        height: "25px",
        color: "white",
        WebkitAppRegion: "no-drag",
        background: props.bg,
        "&:hover": {
          background: "#ff5722"
        }
      }
    })
  );
  const classes = useStyles({});
  const { remote } = require("electron");

  const close = () => {
    let win = remote.getCurrentWindow();
    win.close();
  };
  const minimize = () => {
    let win = remote.getCurrentWindow();
    win.minimize();
  };

  const maximize = () => {
    let win = remote.getCurrentWindow();
    win.isMaximized() ? win.unmaximize() : win.maximize();
  };

  return (
    <div className={classes.content}>
      <div style={{ position: "absolute" }}>
        <AllOutTwoToneIcon />
      </div>
      <div
        style={{
          color: "white",
          marginLeft: 25,
          marginTop: 3,
          position: "absolute"
        }}
      >
        {props.children}
      </div>
      <header className={classes.header}>
        <div className={classes.option}>
          <RemoveCircleOutlineIcon onClick={minimize} />
        </div>
        <div className={classes.option} onClick={maximize}>
          <CropDinIcon />
        </div>
        <div className={classes.option} onClick={close}>
          <CancelIcon />
        </div>
      </header>
    </div>
  );
};

export default RemoteWindow;
