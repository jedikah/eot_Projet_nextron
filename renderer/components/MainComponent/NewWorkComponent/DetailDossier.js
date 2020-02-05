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

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    color: orange[500],
    height: "35px",
    padding: 0,
    marginLeft: "10px"
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
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    color: orange[800],
    height: "35px"
  }
}))(MuiDialogActions);

const DetailDossier = props => {
  const { Nom, TypeTrav, NomTer, Prix } = props.item;

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
            //defaultValue={fullYear()}
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
                <Grid item xs={12} sm={12} md={12} lg={4}>
                  <TextField
                    required
                    id="contact"
                    name="contact"
                    fullWidth
                    autoComplete="contact"
                    value={Prix}
                    //onChange={handleChange("Contact")}
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
                    //onChange={handleChange("Domicile")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <p>{TypeTrav}</p>
                </Grid>
                {state.formInput.TypeTrav === "Bornage" && titre()}
                <Grid item xs={12} sm={12} md={12} lg={4}>
                  <TextField
                    id="dateTrav"
                    name="dateTrav"
                    label="Date de debut de travaux:"
                    //defaultValue={state.formInput.DateTrav}
                    type="date"
                    //onChange={handleChange("DateTrav")}
                    fullWidth
                  />
                  <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue="2017-05-24"
                    InputLabelProps={{
                      shrink: true
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
              {state.letter && withLetter()}
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
