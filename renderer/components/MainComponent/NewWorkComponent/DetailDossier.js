import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import orange from "@material-ui/core/colors/orange";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { KeyboardDatePicker } from "@material-ui/pickers";
import * as DB from "../../../models";

import moment, { DATE_FORMAT } from "../../../module/moment";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing(1)
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

const DialogTitles = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <DialogTitle disableTypography className={classes.root} {...other}>
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
    </DialogTitle>
  );
});

const DetailDossier = props => {
  const { travau, lettreCharge, client } = props;

  let object = null;
  let numrtx = null;
  let datel = null;
  let ville = null;
  let datertx = null;

  if (lettreCharge.length) {
    (object = lettreCharge[0].Objet),
      (numrtx = lettreCharge[0].NumRTX),
      (datel = lettreCharge[0].DateL),
      (ville = lettreCharge[0].VilleL);
    datertx = lettreCharge[0].DateRTX;
  }

  const classes = useStyles();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [open, setOpen] = React.useState(false);

  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);

  let [state, setState] = React.useState({
    letter: false,
    formInput: {
      //table client
      Nom: client.Nom,
      Contact: client.Contact,
      Domicile: client.Domicile,
      //table travaux
      DateTrav: moment(travau.DateTrav, DATE_FORMAT),
      TypeTrav: travau.TypeTrav,
      Prix: travau.Prix,
      NumReq: travau.NumReq,
      DateReq: moment(travau.DateReq, DATE_FORMAT),
      NumTitre: travau.NumTitre,
      NomTer: travau.NomTer,
      LocalisationTrav: travau.LocalisationTrav,
      Fokontany: travau.Fokontany,
      //table lettre de charge
      Objet: object,
      NumRTX: numrtx,
      DateL: moment(datel, DATE_FORMAT),
      VilleL: ville,
      DateRTX: moment(datertx, DATE_FORMAT)
    }
  });
  const [zoom, setZoom] = React.useState(1280 * 100);
  useEffect(() => {
    let width;
    if (window.innerWidth >= 1280) width = window.innerWidth * 100;
    else width = 1280 * 100;
    setZoom(width);
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1280) width = window.innerWidth * 100;
      else width = 1280 * 100;
      setZoom(width);
    });
  }, []);
  const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    "@global": {
      // You should target [class*="MuiButton-root"] instead if you nest themes.
      ".MuiPopover-root, .MuiDialog-root": {
        zoom: zoom / 1922 + "% !important"
      }
    }
  })(() => null);
  const handlePicker = () => {
    let width;
    if (window.innerWidth >= 1280) width = window.innerWidth * 100;
    else width = 1280 * 100;
    setZoom(width);
  };
  const handleChange = (names, val) => e => {
    let f = state.formInput;
    let value;
    if (!val) {
      value = e.target.value;
      setState({
        ...state,
        formInput: { ...f, [names]: value }
      });
    }
  };

  const handleChangeDate = (name, date) => {
    const f = state.formInput;
    setState({ ...state, formInput: { ...f, [name]: date } });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const titre = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            id="numReq"
            name="numReq"
            label="N° de Requisition"
            fullWidth
            autoComplete="dom"
            defaultValue={state.formInput.NumReq}
            onChange={handleChange("NumReq")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            id="numTitre"
            name="numTitre"
            label="N° titre"
            fullWidth
            autoComplete="dom"
            defaultValue={state.formInput.NumTitre}
            variant="outlined"
            onChange={handleChange("NumTitre")}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            id="nmTerrain"
            name="nmTerrain"
            label="Nom du terrain"
            fullWidth
            autoComplete="dom"
            defaultValue={state.formInput.NomTer}
            variant="outlined"
            onChange={handleChange("NomTer")}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            id="localisation"
            name="localisation"
            label="Localisation"
            fullWidth
            autoComplete="dom"
            defaultValue={state.formInput.LocalisationTrav}
            variant="outlined"
            onChange={handleChange("LocalisationTrav")}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            id="fokontany"
            name="fokontany"
            label="Fokontany du terrain titré"
            fullWidth
            autoComplete="dom"
            defaultValue={state.formInput.Fokontany}
            variant="outlined"
            onChange={handleChange("Fokontany")}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="LL"
            margin="normal"
            id="dateReq: "
            label="Date de requisition: "
            value={state.formInput.DateReq}
            onChange={date => handleChangeDate("DateReq", date)}
            onOpen={handlePicker}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
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
            defaultValue={state.formInput.Objet}
            variant="outlined"
            onChange={handleChange("Objet")}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <TextField
            id="numRTX"
            name="numRTX"
            label="N° RTX"
            fullWidth
            autoComplete="numRTX"
            defaultValue={state.formInput.NumRTX}
            variant="outlined"
            onChange={handleChange("NumRTX")}
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
            value={state.formInput.DateL}
            onChange={date => handleChangeDate("DateL", date)}
            onOpen={handlePicker}
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
            defaultValue={state.formInput.VilleL}
            fullWidth
            autoComplete="billing postal-code"
            variant="outlined"
            onChange={handleChange("VilleL")}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="LL"
            margin="normal"
            id="datertx"
            label="Date RTX"
            value={state.formInput.DateRTX}
            onChange={date => handleChangeDate("DateRTX", date)}
            onOpen={handlePicker}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
      </Grid>
    );
  };

  const handleClick = e => {
    e.preventDefault();

    setOpen(true);

    DB.updateTravaux(
      db,
      [
        state.formInput.NumReq,
        state.formInput.DateReq.format(DATE_FORMAT),
        state.formInput.NumTitre,
        state.formInput.NomTer,
        state.formInput.LocalisationTrav,
        state.formInput.Fokontany,
        state.formInput.DateTrav.format(DATE_FORMAT),
        state.formInput.TypeTrav,
        state.formInput.Prix,
        props.travau.IdCli,
        props.travau.IdFact,
        props.travau.IdTrav
      ],
      updateTrav => {
        props.actions.travau.updateTravau({ updateTrav });
      }
    );

    DB.updateClient(
      db,
      [
        props.client.IdPersonne,
        state.formInput.Domicile,
        state.formInput.Contact,
        props.travau.IdCli,
        state.formInput.Nom
      ],
      updateClient => {
        props.actions.client.updateClients({ updateClient });
      }
    );
  };

  DB.updatePersonne(db, [state.formInput.Nom, props.client.IdPersonne]);

  DB.updateLettreCharge(
    db,
    [
      state.formInput.NumRTX,
      state.formInput.DateRTX.format(DATE_FORMAT),
      state.formInput.VilleL,
      state.formInput.DateL.format(DATE_FORMAT),
      state.formInput.Objet,
      props.travau.IdTrav
    ],
    updateLettreCharge => {
      props.actions.lettreCharge.updateLettreCharge({ updateLettreCharge });
    }
  );

  return (
    <div>
      <GlobalCss />
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitles id="customized-dialog-title">
          Détails du dossier
        </DialogTitles>
        <DialogContent dividers>
          <React.Fragment>
            <form className={classes.form} onSubmit={handleClick}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6} md={4} lg={4}>
                  <TextField
                    required
                    id="Nom Client"
                    name="nom"
                    label="Nom client"
                    fullWidth
                    autoComplete="Nom Client"
                    defaultValue={state.formInput.Nom}
                    variant="outlined"
                    onChange={handleChange("Nom")}
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
                    defaultValue={state.formInput.Contact}
                    variant="outlined"
                    onChange={handleChange("Contact")}
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
                    defaultValue={state.formInput.Domicile}
                    variant="outlined"
                    onChange={handleChange("Domicile")}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4}>
                  <p>Type travaux : {state.formInput.TypeTrav}</p>
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
                    value={state.formInput.DateTrav}
                    onChange={date => handleChangeDate("DateTrav", date)}
                    onOpen={handlePicker}
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
                    defaultValue={state.formInput.Prix}
                    variant="outlined"
                    onChange={handleChange("Prix")}
                  />
                </Grid>
              </Grid>
              {lettreCharge.length ? (
                withLetter()
              ) : (
                <p>Pas de lettre de charge</p>
              )}
              <br />
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
            Fermer
          </Button>
        </DialogActions>
        <div className={classes.root}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Dossier travaux mise à jour
            </Alert>
          </Snackbar>
        </div>
      </Dialog>
    </div>
  );
};

export default DetailDossier;
