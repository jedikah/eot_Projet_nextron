import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

import * as DB from "../../../models";
import * as PRC from "./formProcessing";
import ComboBox from "../ComboBox";

export default function FormNewDoc(props) {
  const fullYear = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    let date = new Date().getDate();

    let trais;
    if (month < 9) {
      trais = "-0";
    } else {
      trais = "-";
    }

    if (date < 10) date = "0" + date;

    return year + trais + (new Date().getMonth() + 1) + "-" + date;
  };
  let [state, setState] = React.useState({
    letter: false,
    formInput: {
      //table client
      Nom: "",
      Contact: "",
      Domicile: "",
      //table travaux
      DateTrav: fullYear(),
      TypeTrav: "Délimitation",
      Prix: "",
      NumTitre: "",
      NomTer: "",
      LocalisationTrav: "",
      Fokontany: "",
      //table lettre de charge
      Objet: "",
      NumRTX: "",
      DateL: "",
      VilleL: ""
    }
  });
  let formInput = { TypeTrav: "" };

  const withLetter = () => {
    return (
      <Grid container spacing={3}>
        <Divider />
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <TextField
            id="objet"
            name="objet"
            label="Objet"
            fullWidth
            autoComplete="billing country"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <TextField
            id="numRTX"
            name="numRTX"
            label="N° RTX"
            fullWidth
            autoComplete="numRTX"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <TextField
            id="dateL"
            name="dateL"
            label="Lettre de charge fait le : (Date)"
            defaultValue={fullYear()}
            type="date"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <TextField
            id="ville"
            name="ville"
            label="Lettre de charge fait à: (Ville)"
            fullWidth
            autoComplete="billing postal-code"
          />
        </Grid>
      </Grid>
    );
  };

  const titre = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={4}>
          <TextField
            id="numTitre"
            name="numTitre"
            label="N° titre"
            fullWidth
            autoComplete="dom"
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <TextField
            id="nmTerrain"
            name="nmTerrain"
            label="Nom du terrain"
            fullWidth
            autoComplete="dom"
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <TextField
            id="localisation"
            name="localisation"
            label="Localisation"
            fullWidth
            autoComplete="dom"
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <TextField
            id="fokontany"
            name="fokontany"
            label="Fokontany du terrain titré"
            fullWidth
            autoComplete="dom"
          />
        </Grid>
      </Grid>
    );
  };
  const handleChange = (names, val) => e => {
    if (names === "letter") setState({ ...state, [names]: e.target.checked });
    else {
      let f = state.formInput;
      let value;
      if (!val) value = e.target.value;
      if (val) value = val;
      console.log(val);
      setState({ ...state, formInput: { ...f, [names]: value } });
    }
  };

  const handleChangeDate = () => () => {};
  const handleClick = e => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleClick}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <ComboBox
              onChange={(e, v) => handleChange("Nom", v)(e)}
              onInputChange={handleChange("Nom")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <TextField
              required
              id="contact"
              name="contact"
              label="Contact"
              fullWidth
              autoComplete="contact"
              onChange={handleChange("Contact")}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <TextField
              required
              id="domicile"
              name="domicile"
              label="Domicile"
              fullWidth
              autoComplete="domicile"
              onChange={handleChange("Domicile")}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel shrink id="demo-simple-select-helper-labels">
              Type de Travaux
            </InputLabel>
            <Select
              displayEmpty
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              defaultValue={"Délimitation"}
              value={state.typeTrav}
              onChange={handleChange("TypeTrav")}
            >
              <MenuItem value="">
                <em>Choisir un type de Travaux...</em>
              </MenuItem>
              <MenuItem value={"Délimitation"}>
                Travaux de délimitation
              </MenuItem>
              <MenuItem value={"Bornage"}>Travaux de bornage</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <TextField
              id="dateTrav"
              name="dateTrav"
              label="Date de debut de travaux:"
              defaultValue={state.formInput.DateTrav}
              type="date"
              onChange={handleChange("DateTrav")}
              fullWidth
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={""}
              onChange={handleChange("DateTrav")}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <TextField
              id="prix"
              name="prix"
              label="Prix (Ar): (facultatif)"
              type="number"
              fullWidth
              autoComplete="dom"
            />
          </Grid>
        </Grid>
        {state.formInput.TypeTrav === "Bornage" && titre()}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.letter}
                  onChange={handleChange("letter")}
                  value="gilad"
                />
              }
              label="Avec lettre de charge"
            />
          </Grid>
        </Grid>
        {state.letter && withLetter()}
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
}
