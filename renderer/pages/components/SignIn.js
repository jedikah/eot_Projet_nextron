import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import MyLink from "./MyLink";
import SignInCtn from "../../redux/containers/SignICtn";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Application for E.O.T Entreprise
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
let input = { id: "", passWd: "" };
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignIn = props => {
  const classes = useStyles();

  const chageInputId = e => {
    input.id = e.target.value;
  };

  const chageInputPassWd = e => {
    input.passWd = e.target.value;
  };

  useEffect(() => {
    console.log("SIGNIN props store: ", props);
  });
  return (
    <div style={{ position: "fixed" }}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ backgroundColor: "white" }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Authentification
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Identifiant"
              label="Identifiant"
              name="Identifiant"
              autoComplete="Identifiant"
              autoFocus
              onChange={chageInputId}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={chageInputPassWd}
            />
            {props.children}
            <MyLink
              href="/next"
              prefetch={false}
              values={{
                signId: props.signIns[0].id,
                signPassWd: props.signIns[0].passWd,
                input
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => {
                  e.preventDefault;
                }}
              >
                S'authentifier
              </Button>
            </MyLink>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default SignInCtn(SignIn);
