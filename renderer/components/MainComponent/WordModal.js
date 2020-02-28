import React, { useEffect, useState, createRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import orange from "@material-ui/core/colors/orange";
import htmlDocx from "html-docx-js/dist/html-docx";
import { saveAs } from "file-saver";
import ReactDOMServer from "react-dom/server";

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

const WordModal = ({ title, Content, open, onClick }) => {
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [zoom, setZoom] = React.useState(1280 * 100);
  const { remote } = require("electron");

  useEffect(() => {
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
  });

  const writeWord = () => {
    console.log(<Content />);
    const fs = require("fs");
    let html = "<!DOCTYPE html>";
    html +=
      "<html><head><meta charset='utf-8'><title>HTML-DOCX test</title><body>";
    html += ReactDOMServer.renderToString(Content); //<Content />;
    html += "</body></head></html>";

    var converted = htmlDocx.asBlob(html, {
      orientation: "portrait",
      margins: { top: 720 }
    });
    console.log(html);
    saveAs(converted, "Next HTML DOX.docx");
    fs.writeFile("Next HTML DOX.docx", converted, err => {
      if (err) return console.log(err);
      console.log("done");
    });
  };
  return (
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
      <DialogTitles id="customized-dialog-title">{title}</DialogTitles>
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
          {Content}
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={writeWord} style={{ color: orange[500] }}>
          Créer le fichier
        </Button>
        <Button autoFocus onClick={onClick} style={{ color: orange[500] }}>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WordModal;
