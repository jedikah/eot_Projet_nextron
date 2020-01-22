import React from "react";
import Head from "next/head";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "../components";

import NextCtn from "../redux/containers/NextCtn";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      textAlign: "center",
      paddingTop: theme.spacing(4)
    }
  })
);

const Next = () => {
  const classes = useStyles({});

  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron (with-javascript-material-ui)</title>
      </Head>
      <NextCtn>next component</NextCtn>
    </React.Fragment>
  );
};

export default Next;
