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

import * as DB from "../../../models";
import * as PRC from "./formProcessing";
import ComboBox from "../ComboBox";

export default function FormNewDoc(props) {
  // DB.createDB(DB.connect(os.homedir + "/EotCM"));
  //DB.connect();
  //DB.testPath(os.homedir());
  // DB.testPath("../../../models/eotdb.sqlite");
  /*const sqlite3 = require("sqlite3").verbose();

  console.log(new sqlite3.Database("./eotdb.sqlit"));*/
  let [state, setState] = React.useState({
    letter: false,
    typeTrav: ""
  });
  let formInput = {};

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
  const handleChange = names => e => {
    if (names === "letter") setState({ ...state, [names]: e.target.checked });
    else if (names === "typeTrav")
      setState({ ...state, [names]: e.target.value });
  };

  const handleClick = e => {
    e.preventDefault();
    console.log(formInput);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleClick}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <TextField
              required
              id="Name"
              name="Name"
              label="Non Complet"
              fullWidth
              autoComplete="fname"
              onChange={e => (formInput = PRC.handleChange(e, "nom"))}
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
              onChange={e => (formInput = PRC.handleChange(e, "contact"))}
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
              onChange={e => (formInput = PRC.handleChange(e, "domicile"))}
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
              defaultValue={10}
              value={state.typeTrav}
              onChange={handleChange("typeTrav")}
            >
              <MenuItem value="">
                <em>Choisir un type de Travaux...</em>
              </MenuItem>
              <MenuItem value={10}>Travaux de délimitation</MenuItem>
              <MenuItem value={20}>Travaux de bornage</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <TextField
              id="dateTrav"
              name="dateTrav"
              label="Date de debut de travaux:"
              defaultValue={fullYear()}
              type="date"
              fullWidth
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
        {state.typeTrav === 20 && titre()}
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
