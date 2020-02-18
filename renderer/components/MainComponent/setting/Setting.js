import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { Button, Typography } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";

import * as DB from "../../../models";

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

  const [state, setState] = React.useState({
    formInput: {
      Nom: users[0].Nom,
      PassWord: users[0].PassWord,
      Path: this_setting("Path").Value
    }
  });

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
          <Typography align={"center"} color="primary" variant="subtitle1">
            Utilisateur
          </Typography>
          <Divider />
          <Grid item xs={12} sm={12} md={12} lg={12}>
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
          <Grid item xs={12} sm={12} md={12} lg={12}>
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
          <Typography align={"center"} color="primary" variant="subtitle1">
            Dossier
          </Typography>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
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
        </Grid>
      </form>
    </div>
  );
};

export default Setting;
