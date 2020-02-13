import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import moment, { DATE_FORMAT } from "../../../module/moment";
import * as DB from "../../../models";

const useStyles = makeStyles(theme => ({
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

const FormConvocation = ({ IdTrav, selectedConvocation, client, actions }) => {
  const classes = useStyles();

  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);

  const [openAlert, setOpenAlert] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const [state, setState] = React.useState({
    formConv: {
      NumRegistre: "",
      IdTrav: IdTrav,
      NumPv: "",
      NomPersConv: "",
      DateConv: moment(),
      VilleConv: "",
      HeureConv: moment(),
      NumReq: ""
    }
  });

  const handleChange = names => e => {
    const formConv = state.formConv;
    setState({ ...state, formConv: { ...formConv, [names]: e.target.value } });
  };

  useEffect(() => {
    if (selectedConvocation)
      setState({
        ...state,
        formConv: {
          ...state.formConv,
          NumRegistre: selectedConvocation.NumRegistre,
          IdTrav: selectedConvocation.IdTrav,
          NumPv: selectedConvocation.NumPv,
          NomPersConv: selectedConvocation.NomPersConv,
          DateConv: moment(selectedConvocation.DateConv, DATE_FORMAT),
          VilleConv: selectedConvocation.VilleConv,
          HeureConv: moment(selectedConvocation.HeureConv, "LT"),
          NumReq: selectedConvocation.NumReq
        }
      });
    else
      setState({
        ...state,
        formConv: {
          NumRegistre: "",
          IdTrav: IdTrav,
          NumPv: "",
          NomPersConv: "",
          DateConv: moment(),
          VilleConv: "",
          HeureConv: moment(),
          NumReq: ""
        }
      });
  }, [selectedConvocation]);

  const handleClick = e => {
    e.preventDefault();

    if (IdTrav) {
      setOpenSuccess(true);
      DB.addConvoction(
        db,
        [
          state.formConv.NumRegistre,
          IdTrav,
          IdTrav,
          state.formConv.NomPersConv,
          state.formConv.DateConv.format(DATE_FORMAT),
          state.formConv.VilleConv,
          state.formConv.HeureConv.format("LT")
        ],
        newConvocation => {
          actions.addConvocations({ newConvocation });
        }
      );
    } else {
      setOpenAlert(true);
    }
  };

  const handleClickUpDate = e => {
    e.preventDefault();
    console.log("okok");
    if (selectedConvocation) {
      setOpenSuccess(true);
      DB.upDateConvocation(
        db,
        [
          state.formConv.NumRegistre,
          selectedConvocation.IdTrav,
          selectedConvocation.NumPv,
          state.formConv.NomPersConv,
          state.formConv.DateConv.format(DATE_FORMAT),
          state.formConv.VilleConv,
          state.formConv.HeureConv.format("LT"),
          selectedConvocation.IdTrav,
          selectedConvocation.NumRegistre
        ],
        (updateConvocation, lastNumRegistre) => {
          actions.updateConvocation({ updateConvocation, lastNumRegistre });
          const selected = state.formConv;
          actions.setSelectedConvocations({ selectedConvocation: selected });
        }
      );
    } else {
      setOpenAlert(true);
    }
  };

  const handleChangeDate = (names, date) => {
    setState({ ...state, formConv: { ...state.formConv, [names]: date } });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleCloseConvSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  return (
    <React.Fragment>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              required
              id="numRegistre"
              name="numRegistre"
              label="Numero de registre: "
              fullWidth
              autoComplete="numRegistre"
              value={state.formConv.NumRegistre}
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
              value={state.formConv.NomPersConv}
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
              value={state.formConv.DateConv}
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
              value={state.formConv.VilleConv}
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
            value={state.formConv.HeureConv}
            onChange={date => handleChangeDate("HeureConv", date)}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
          />
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            {!selectedConvocation && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                Ajouter une Convocation
              </Button>
            )}
            {selectedConvocation && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClickUpDate}
              >
                Modifier la convocation
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
      <div className={classes.root}>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity="error">
            Choississez un dossier travau
          </Alert>
        </Snackbar>
      </div>
      <div className={classes.root}>
        <Snackbar
          open={openSuccess}
          autoHideDuration={6000}
          onClose={handleCloseConvSuccess}
        >
          <Alert onClose={handleCloseConvSuccess} severity="success">
            Convocation ajouté
          </Alert>
        </Snackbar>
      </div>
    </React.Fragment>
  );
};

export default FormConvocation;
