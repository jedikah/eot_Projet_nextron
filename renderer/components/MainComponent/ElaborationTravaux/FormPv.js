import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

import moment, { currentMoment } from "../../../module/moment";

const FormConvocation = () => {
  const [state, setState] = React.useState({
    formConv: {
      PieceJust: "",
      Commune: "",
      District: "",
      region: ""
    }
  });
  const handleChange = names => e => {
    setState({
      ...state,
      formConv: { ...setState.formConv, [names]: e.target.value }
    });
  };

  const handleClick = e => {
    e.preventDefault();
  };

  console.log(state.formConv.DateConv);
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

export default FormConvocation;
