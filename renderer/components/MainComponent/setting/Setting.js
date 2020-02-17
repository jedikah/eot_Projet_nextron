import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { Button, Typography } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";

import * as DB from "../../../models";

const Setting = () => {
  const [state, setState] = React.useState({
    formInput: {
      User: "",
      PassWord: ""
    }
  });
  const handleChange = val => {};

  const handleEdit = () => {};

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
              value={state.formInput.User}
              autoComplete="Nom"
              onChange={handleChange("User")}
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
