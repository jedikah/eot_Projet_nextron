import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default function ToolBar(props) {
  return (
    <AppBar position="relative" style={{ background: "#283593" }}>
      <Toolbar style={{ display: "flex", flexDirection: "row" }}>
        <Typography style={{ minWidth: "230px" }} variant="h6">
          GESTION DES DOSSIERS
        </Typography>
        <div
          style={{
            marginLeft: "20px",
            width: "100%",
            height: "50px"
          }}
        >
          {props.children}
        </div>
      </Toolbar>
    </AppBar>
  );
}
