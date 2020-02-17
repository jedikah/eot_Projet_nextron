import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default function ToolBar(props) {
  return (
    <AppBar position="relative" style={{ background: "#333333" }}>
      <Toolbar
        variant="dense"
        style={{ display: "flex", flexDirection: "row", height: 50 }}
      >
        <Typography style={{ minWidth: "230px" }} variant="h6">
          GESTION DES DOSSIERS
        </Typography>
        <div
          style={{
            marginLeft: "20px",
            width: "100%",
            height: "50px",
            textAlign: "right",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end"
          }}
        >
          {props.children}
        </div>
      </Toolbar>
    </AppBar>
  );
}
