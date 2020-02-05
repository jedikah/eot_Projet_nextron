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
import moment, { currentMoment } from "../../../module/moment";

export default function FormNewDoc(props) {
  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);

  let [state, setState] = React.useState({
    letter: false,
    match: false,
    formInput: {
      //table client
      Nom: "",
      Contact: "",
      Domicile: "",
      //table travaux
      DateTrav: moment(),
      TypeTrav: "Délimitation",
      Prix: "",
      NumTitre: "",
      NomTer: "",
      LocalisationTrav: "",
      Fokontany: "",
      //table lettre de charge
      Objet: "",
      NumRTX: "",
      DateL: moment(),
      VilleL: ""
    }
  });
  let formInput = { TypeTrav: "" };

  const withLetter = () => {
    return (
      <Grid container spacing={3}>
        <Divider />
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            variant="outlined"
            id="objet"
            name="objet"
            label="Objet"
            fullWidth
            autoComplete="billing country"
            onChange={handleChange("Objet")}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            variant="outlined"
            id="numRTX"
            name="numRTX"
            label="N° RTX"
            fullWidth
            autoComplete="numRTX"
            onChange={handleChange("NumRTX")}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="LL"
            margin="normal"
            id="date-picker-inline"
            label="Lettre de charge fait le:"
            value={state.formInput.DateL}
            onChange={date => handleChangeDate("DateL", date)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            variant="outlined"
            id="ville"
            name="ville"
            label="Lettre de charge fait à: (Ville)"
            fullWidth
            autoComplete="billing postal-code"
            onChange={handleChange("VilleL")}
          />
        </Grid>
      </Grid>
    );
  };

  const titre = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={6} md={4} lg={4}>
          <TextField
            id="numTitre"
            name="numTitre"
            label="N° titre"
            fullWidth
            autoComplete="dom"
            onChange={handleChange("NumTitre")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} md={4} lg={4}>
          <TextField
            id="nmTerrain"
            name="nmTerrain"
            label="Nom du terrain"
            fullWidth
            autoComplete="dom"
            onChange={handleChange("NomTer")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} md={4} lg={4}>
          <TextField
            id="localisation"
            name="localisation"
            label="Localisation"
            fullWidth
            autoComplete="dom"
            onChange={handleChange("LocalisationTrav")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} md={4} lg={4}>
          <TextField
            id="fokontany"
            name="fokontany"
            label="Fokontany du terrain titré"
            fullWidth
            autoComplete="dom"
            onChange={handleChange("Fokontany")}
            variant="outlined"
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
      if (!val) {
        value = e.target.value;
        setState({ ...state, formInput: { ...f, [names]: value } });
      }
      if (val) {
        value = val;
        setState({
          ...state,
          formInput: { ...f, [names]: value },
          match: true
        });
      }
    }
  };

  const handleChangeDate = (name, date) => e => {
    setState({ ...state, formInput: { ...f, [name]: date } });
  };

  const matchClient = () => {
    props.clients.forEach(element => {
      if (element.Nom === state.formInput.Nom) {
        setState({ ...state, match: true });
      }
      /*DB.addClient(db, params => {
        console.log(params);
      });*/
    });
  };
  const handleClick = e => {
    e.preventDefault();
    matchClient();
  };

  return (
    <React.Fragment>
      <form onSubmit={handleClick}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <ComboBox
              list={props.clients}
              onChange={(e, v) => {
                handleChange("Nom", v)(e);
              }}
              onInputChange={handleChange("Nom")}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
              required={!state.match}
              disabled={state.match}
              id="contact"
              name="contact"
              label="Contact"
              fullWidth
              autoComplete="contact"
              onChange={handleChange("Contact")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} md={4} lg={4}>
            <TextField
              required={!state.match}
              disabled={state.match}
              id="domicile"
              name="domicile"
              label="Domicile"
              fullWidth
              autoComplete="domicile"
              onChange={handleChange("Domicile")}
              variant="outlined"
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
              variant="outlined"
            >
              <MenuItem value={"Délimitation"}>
                Travaux de délimitation
              </MenuItem>
              <MenuItem value={"Bornage"}>Travaux de bornage</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="LL"
              margin="normal"
              id="dateTrav: "
              label="Date des travaux: "
              value={state.formInput.DateTrav}
              onChange={date => handleChangeDate("DateTrav", date)}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={4}>
            <TextField
              id="prix"
              name="prix"
              label="Prix (Ar): (facultatif)"
              type="number"
              fullWidth
              autoComplete="dom"
              variant="outlined"
              onChange={handleChange("Prix")}
            />
          </Grid>
        </Grid>
        {state.formInput.TypeTrav === "Bornage" && titre()}
        <Grid container spacing={3}>
          <Grid item xs={6}>
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
