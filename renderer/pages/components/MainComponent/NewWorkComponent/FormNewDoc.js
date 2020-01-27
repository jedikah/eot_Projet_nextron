import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

export default function FormNewDoc() {
  //new Date().getFullYear() +"-" + new Date().getMonth()+ "-" + new Date().getDate()
  const fullYear = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = new Date().getDate();

    let trais;
    if (month < 9) {
      trais = "-0";
    } else {
      trais = "-";
    }

    return year + trais + (new Date().getMonth() + 1) + "-" + date;
  };
  return (
    <React.Fragment>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="Non Complet"
              fullWidth
              autoComplete="fname"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              required
              id="contact"
              name="contact"
              label="Contact"
              fullWidth
              autoComplete="cont"
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              required
              id="domicile"
              name="domicile"
              label="Domicile"
              fullWidth
              autoComplete="dom"
            />
          </Grid>
          <Grid item xs={12} color>
            <Typography variant="h6" gutterBottom>
              Avec letre de charge
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="objet"
              name="objet"
              label="Objet"
              fullWidth
              autoComplete="billing country"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="numRTX"
              name="numRTX"
              label="N° RTX"
              fullWidth
              autoComplete="numRTX"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="dateL"
              name="dateL"
              label="Lettre de charge fait le : (Date)"
              defaultValue={fullYear()}
              type="date"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              id="ville"
              name="ville"
              label="Lettre de charge fait à: (Ville)"
              fullWidth
              autoComplete="billing postal-code"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={e => {
                e.preventDefault;
              }}
            >
              Enregistrer
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
