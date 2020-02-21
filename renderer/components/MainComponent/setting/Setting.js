import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { Button, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";

import SignIn from "../../SignIn";
import * as DB from "../../../models";

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

const Setting = ({ users, settings, actions }) => {
  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);
  const currentSettings = () => {
    return settings.filter(item => item.IdUser === users[0].IdUser);
  };

  const this_setting = nameSetting => {
    return currentSettings().filter(
      item => item.NameSetting === nameSetting
    )[0];
  };

  const [openSingIn, setOpenSingIn] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [zoom, setZoom] = React.useState(1280 * 100);
  const [state, setState] = React.useState({
    user: "",
    password: "",
    match: false,
    formInput: {
      Nom: users[0].Nom,
      PassWord: users[0].PassWord,
      Path: this_setting("Path").Value
    }
  });

  useEffect(() => {
    let width;
    if (window.innerWidth >= 1280) width = window.innerWidth * 100;
    else width = 1280 * 100;
    setZoom(width);
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1280) width = window.innerWidth * 100;
      else width = 1280 * 100;
      setZoom(width);
    });
  }, []);

  const handleChange = name => e => {
    setState({
      ...state,
      formInput: {
        ...state.formInput,
        [name]: e.target.value
      }
    });
  };

  const handleEdit = e => {
    e.preventDefault();
    setOpenSingIn(true);
  };
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

  const handleClose = () => {
    setOpenSingIn(false);
  };

  const dialogue = () => {
    const verification = e => {
      e.preventDefault();
      if (state.user === users[0].Nom && state.password === users[0].PassWord) {
        DB.updateUser(db, [
          state.formInput.PassWord,
          users[0].IdUser,
          state.formInput.Nom,
          users[0].IdPersonne
        ]);
        DB.updateSetting(db, [state.formInput.Path, users[0].IdUser, "Path"]);
        actions.updateUser({
          IdUser: users[0].IdUser,
          PassWord: state.formInput.PassWord,
          Nom: state.formInput.Nom
        });
        actions.updateSetting({
          Value: state.formInput.Path,
          IdUser: users[0].IdUser,
          NameSetting: "Path"
        });
        setOpenSingIn(false);
      }
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
        open={openSingIn}
      >
        <DialogTitles id="customized-dialog-title">Verification</DialogTitles>
        <DialogContent
          style={{
            justifyContent: "center"
          }}
        >
          <SignIn
            user={user => {
              setState({ ...state, user });
            }}
            password={password => {
              setState({ ...state, password });
            }}
            verification
            style={{
              background: "inherit !important",
              boxShadow: "0px 0px 10px #888888",
              borderRadius: "10px 10px 10px 10px"
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={verification}
            >
              Verification
            </Button>
          </SignIn>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            style={{ color: orange[500] }}
          >
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const selectDirectory = e => {
    const { dialog } = require("electron").remote;
    const dir = dialog.showOpenDialogSync({ properties: ["openDirectory"] });
    if (dir) {
      setState({ ...state, formInput: { ...state.formInput, Path: dir[0] } });
    }
  };
  return (
    <div
      style={{
        minWidth: "60%",
        maxWidth: "70%",
        height: "95%",
        boxShadow: "0px 0px 15px #888888",
        borderRadius: 20,
        padding: 25,
        paddingLeft: 25,
        paddingRight: 40
      }}
    >
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography align={"center"} color="primary" variant="subtitle1">
              Utilisateur
            </Typography>
          </Grid>

          <Divider />
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              disabled={state.match}
              id="Nom"
              name="Nom"
              label="Nom"
              fullWidth
              value={state.formInput.Nom}
              autoComplete="Nom"
              onChange={handleChange("Nom")}
              variant="filled"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <TextField
              id="password"
              name="password"
              label="Mot de passe"
              fullWidth
              value={state.formInput.PassWord}
              autoComplete="password"
              onChange={handleChange("PassWord")}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography align={"center"} color="primary" variant="subtitle1">
              Dossier
            </Typography>
          </Grid>
          <Grid item xs={9} sm={9} md={9} lg={9}>
            <TextField
              InputProps={{
                readOnly: true
              }}
              id="path"
              name="path"
              label="Emplacement des dossier de travaux"
              fullWidth
              value={state.formInput.Path}
              autoComplete="path"
              onChange={handleChange("Path")}
              variant="filled"
            />
          </Grid>
          <Grid item xs={3} xs={3} sm={3} md={3} lg={3}>
            <Button
              fullWidth
              onClick={selectDirectory}
              variant="contained"
              color="primary"
              style={{ height: 55 }}
            >
              Répertoire
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button
              type="submit"
              onClick={handleEdit}
              fullWidth
              variant="contained"
              color="primary"
            >
              Enregistrer
            </Button>
          </Grid>
          {dialogue()}
        </Grid>
      </form>
    </div>
  );
};

export default Setting;
