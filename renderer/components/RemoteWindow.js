import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import CropDinIcon from "@material-ui/icons/CropDin";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AllOutTwoToneIcon from "@material-ui/icons/AllOutTwoTone";
import FilterNoneIcon from "@material-ui/icons/FilterNone";

const RemoteWindow = props => {
  const useStyles = makeStyles(theme =>
    createStyles({
      content: {
        padding: 0,
        margin: 0,
        display: "flex",
        width: "100%",
        height: "30px",
        flexDirection: "column",
        background: props.bg,
        position: "relative",
        zIndex: 9999999
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
  const [max, setMax] = React.useState(false);
  const [zoom, setZoom] = React.useState(1600 * 100);
  const { remote } = require("electron");

  useEffect(() => {
    let width;
    if (window.innerWidth >= 1600) width = window.innerWidth * 100;
    else width = 1600 * 100;
    setZoom(width);
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1600) width = window.innerWidth * 100;
      else width = 1600 * 100;
      setZoom(width);
    });
  }, []);

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
    if (props.getMax === true) {
      props.setMax(false);
      win.unmaximize();
    } else {
      props.setMax(true);
      win.maximize();
    }
  };

  return (
    <div
      className={classes.content}
      style={{ zoom: zoom / 1922 + "% !important" }}
    >
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
        {props.getMax === false && (
          <div className={classes.option} onClick={maximize}>
            <CropDinIcon />
          </div>
        )}
        {props.getMax === true && (
          <div className={classes.option} onClick={maximize}>
            <FilterNoneIcon style={{ transform: "rotate(180deg)" }} />
          </div>
        )}
        <div className={classes.option} onClick={close}>
          <CancelIcon />
        </div>
      </header>
    </div>
  );
};

export default RemoteWindow;
