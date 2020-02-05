import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import orange from "@material-ui/core/colors/orange";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { KeyboardDatePicker } from "@material-ui/pickers";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    color: orange[500],
    height: "35px",
    padding: 0,
    marginLeft: "10px",
    width: "1000px"
  },
  closeButton: {
    padding: 0,
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: orange[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(5),
    width: "1000px"
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    color: orange[800],
    height: "35px",
    width: "1000px"
  }
}))(MuiDialogActions);

const DetailDossier = props => {
  const { travau, lettreCharge, client } = props;

  let [state, setState] = React.useState({
    letter: false,
    formInput: {
      //table client
      Nom: "",
      Contact: "",
      Domicile: "",
      //table travaux
      DateTrav: /*fullYear()*/ "",
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

  const titre = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            id="numTitre"
            name="numTitre"
            label="N° titre"
            fullWidth
            autoComplete="dom"
            defaultValue={travau.NumTitre}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            id="nmTerrain"
            name="nmTerrain"
            label="Nom du terrain"
            fullWidth
            autoComplete="dom"
            defaultValue={travau.NomTer}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            id="localisation"
            name="localisation"
            label="Localisation"
            fullWidth
            autoComplete="dom"
            defaultValue={travau.LocalisationTrav}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            id="fokontany"
            name="fokontany"
            label="Fokontany du terrain titré"
            fullWidth
            autoComplete="dom"
            defaultValue={travau.Fokontany}
            variant="outlined"
          />
        </Grid>
      </Grid>
    );
  };

  const withLetter = () => {
    return (
      <Grid container spacing={3}>
        <Divider />
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            id="objet"
            name="objet"
            label="Objet"
            fullWidth
            autoComplete="billing country"
            defaultValue={lettreCharge[0].Objet}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            id="numRTX"
            name="numRTX"
            label="N° RTX"
            fullWidth
            autoComplete="numRTX"
            defaultValue={lettreCharge[0].NumRTX}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={6} sm={6} md={4} lg={4}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="LL"
            margin="normal"
            id="dateL"
            label="Lettre de charge fait le : (Date)"
            value={lettreCharge[0].DateL}
            //onChange={date => handleChangeDate("DateTrav", date)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            id="ville"
            name="ville"
            label="Lettre de charge fait à: (Ville)"
            defaultValue={lettreCharge[0].VilleL}
            fullWidth
            autoComplete="billing postal-code"
            variant="outlined"
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title">
          Détails du dossier
        </DialogTitle>
        <DialogContent dividers>
          <React.Fragment>
            <form /*onSubmit={}*/>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6} md={4} lg={4}>
                  <TextField
                    required
                    id="Nom Client"
                    name="Nom Client"
                    label="Nom client"
                    fullWidth
                    autoComplete="Nom Client"
                    defaultValue={client.Nom}
                    variant="outlined"
                    //onChange={handleChange("Contact")}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4}>
                  <TextField
                    required
                    id="contact"
                    name="contact"
                    label="contact"
                    fullWidth
                    autoComplete="contact"
                    defaultValue={client.Contact}
                    variant="outlined"
                    //onChange={handleChange("Contact")}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4}>
                  <TextField
                    required
                    id="domicile"
                    name="domicile"
                    label="domicile"
                    fullWidth
                    autoComplete="domicile"
                    defaultValue={client.Domicile}
                    variant="outlined"
                    //onChange={handleChange("Domicile")}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4}>
                  <p>Type travaux : {travau.TypeTrav}</p>
                </Grid>
                {travau.TypeTrav === "Bornage" && titre()}
                <Grid item xs={6} sm={6} md={4} lg={4}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="LL"
                    margin="normal"
                    id="dateTrav: "
                    label="Date des travaux: "
                    value={travau.DateTrav}
                    //onChange={date => handleChangeDate("DateTrav", date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4}>
                  <TextField
                    id="prix"
                    name="prix"
                    label="Prix (Ar): (facultatif)"
                    type="number"
                    fullWidth
                    autoComplete="dom"
                    defaultValue={travau.Prix}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              {lettreCharge.length ? (
                withLetter()
              ) : (
                <p>Pas de lettre de charge</p>
              )}
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Enregistrer
                  </Button>
                </Grid>
              </Grid>
            </form>
          </React.Fragment>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={props.handleClose}
            style={{ color: orange[500] }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DetailDossier;
