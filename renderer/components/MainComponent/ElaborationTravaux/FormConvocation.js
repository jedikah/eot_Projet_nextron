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

const FormConvocation = ({ IdTrav }) => {
  console.log(IdTrav);
  const [state, setState] = React.useState({
    formConv: {
      NumRegistre: "",
      IdTrav: "",
      NumPv: "",
      NomPersConv: "",
      DateConv: "",
      VilleConv: "",
      HeureConv: moment(),
      NumReq: ""
    }
  });
  const handleChange = names => {};

  const handleClick = e => {
    e.preventDefault();
  };

  const handleChangeDate = (names, date) => {
    setState({ ...state, formConv: { ...setState.formConv, [names]: date } });
  };
  console.log(state.formConv.DateConv);
  return (
    <React.Fragment>
      <form onSubmit={handleClick}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              required
              id="numRegistre"
              name="numRegistre"
              label="Numero de registre: "
              fullWidth
              autoComplete="numRegistre"
              onChange={handleChange("NumRegistre")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              required
              id="nomPersConv"
              name="nomPersConv"
              label="Nom de la personne à convoquer"
              fullWidth
              autoComplete="nomPersConv"
              onChange={handleChange("NomPersConv")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="LL"
              margin="normal"
              id="dateConv"
              label="Convoqué (e) à la date: "
              value={state.DateConv}
              mask="__/__/____"
              onChange={date => handleChangeDate("DateConv", date)}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              required
              id="villeConv"
              name="villeConv"
              label="Convoqué (e) à: (ville)"
              fullWidth
              autoComplete="villeConv"
              variant="outlined"
              onChange={handleChange("VilleConv")}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <KeyboardTimePicker
            variant="dialog"
            format="LT"
            margin="normal"
            id="time-picker"
            label="Convoqué à l'heure suivante:"
            value={state.HeureConv}
            mask="__/__/____"
            onChange={date => handleChangeDate("HeureConv", date)}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
          />
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4}>
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
