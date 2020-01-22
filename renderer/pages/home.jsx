import React, { useState, useEffect } from "react";
import Head from "next/head";
import { makeStyles, createStyles } from "@material-ui/core/styles";
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
      right: 0
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
        <Typography gutterBottom>
          <Link href="/next">Go to the next page</Link>
        </Typography>
      </HomeCtn>
    </div>
  );
};

export default Home;
