import React, { useState, useEffect } from "react";
import Head from "next/head";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { Link } from "../components";

import HomeCtn from "../redux/containers/HomeCtn";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      border: "1px solid blue"
    }
  })
);

const Home = props => {
  const classes = useStyles({});

  useEffect(() => {
    console.log("base props: ", props);

    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(":memory:");
  });

  return (
    <div className={classes.root}>
      <HomeCtn>
        je suis un component
        <Typography gutterBottom>
          <Link href="/next">Go to the next page</Link>
        </Typography>
      </HomeCtn>
    </div>
  );
};

export default Home;
