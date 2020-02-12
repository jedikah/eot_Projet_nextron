import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import FormPvCtn from "../../../redux/containers/FormPvCtn";
import * as DB from "../../../models";

const FormPv = ({ convocation, travau, client, actions, pv }) => {
  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);

  const [state, setState] = React.useState({
    formConv: {
      PieceJust: pv.PieceJust,
      Commune: pv.Commune,
      District: pv.District,
      Region: pv.Region
    }
  });

  useEffect(() => {
    setState({
      ...state,
      formConv: {
        ...state.formConv,
        PieceJust: pv.PieceJust,
        Commune: pv.Commune,
        District: pv.District,
        Region: pv.Region
      }
    });
  }, [pv]);

  const handleChange = names => e => {
    setState({
      ...state,
      formConv: { ...state.formConv, [names]: e.target.value }
    });
  };

  const handleClick = e => {
    e.preventDefault();
    console.log(state.formConv.Commune);
    if (travau.IdTrav) {
      DB.addPV(
        db,
        [
          state.formConv.PieceJust,
          state.formConv.Commune,
          state.formConv.District,
          state.formConv.Region,
          travau.IdTrav
        ],
        pv => {
          actions.addPv({ pv });
        }
      );
    }
  };
  //console.log(travau);
  //console.log(convocation);
  return (
    <React.Fragment>
      <form onSubmit={handleClick}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="PieceJust"
              name="PieceJust"
              label="Pièce justificative: "
              fullWidth
              value={state.formConv.PieceJust}
              autoComplete="PieceJust"
              onChange={handleChange("PieceJust")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="commune"
              name="commune"
              label="Commune: "
              fullWidth
              value={state.formConv.Commune}
              autoComplete="commune"
              onChange={handleChange("Commune")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="District"
              name="District"
              label="District"
              fullWidth
              value={state.formConv.District}
              autoComplete="District"
              onChange={handleChange("District")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="region"
              name="region"
              label="Région"
              fullWidth
              value={state.formConv.Region}
              autoComplete="region"
              variant="outlined"
              onChange={handleChange("Region")}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Enregistrer
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default FormPvCtn(FormPv);
