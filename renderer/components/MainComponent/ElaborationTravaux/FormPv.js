import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import FormPvCtn from "../../../redux/containers/FormPvCtn";
import moment, { currentMoment } from "../../../module/moment";

const FormPv = ({ convocation, travaux, client }) => {
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

export default FormPvCtn(FormPv);
