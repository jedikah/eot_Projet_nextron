import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import { withStyles } from "@material-ui/core/styles";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import moment, { DATE_FORMAT } from "../../../module/moment";
import * as DB from "../../../models";
import { selectTravaux } from "../../../models";

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

const FormConvocation = ({
  selectedIdTrav,
  selectedConvocation,
  client,
  actions,
  convocations,
  travaux,
  clients
}) => {
  const classes = useStyles();

  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);

  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertConv, setOpenAlertConv] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = React.useState(false);
  const [zoom, setZoom] = React.useState(1280 * 100);
  const [registre, setRegistre] = React.useState([]);
  const [match, setMatch] = React.useState(false);
  const [state, setState] = React.useState({
    registreError: [],
    formConv: {
      NumRegistre: null,
      IdTrav: selectedIdTrav,
      NumPv: "",
      NomPersConv: "",
      DateConv: moment(),
      VilleConv: "",
      HeureConv: moment()
    }
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      let width;
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
    setState({ ...state, zoom: width });
  };

  const handleChange = names => e => {
    const formConv = state.formConv;
    setState({ ...state, formConv: { ...formConv, [names]: e.target.value } });
    if (
      convocations.filter(
        item => item.NumRegistre === parseInt(e.target.value)
      )[0]
    )
      matchDetail(e.target.value);
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
          NumRegistre: null,
          IdTrav: selectedIdTrav,
          NumPv: "",
          NomPersConv: "",
          DateConv: moment(),
          VilleConv: "",
          HeureConv: moment(),
          NumReq: ""
        }
      });
  }, [selectedConvocation]);

  useEffect(() => {
    if (
      convocations.filter(
        item => item.NumRegistre === parseInt(state.formConv.NumRegistre)
      )[0]
    ) {
      setMatch(true);
    } else setMatch(false);
  }, [state.formConv.NumRegistre]);

  const matchDetail = num => {
    const trav = convocations.filter(
      item => item.NumRegistre === parseInt(num)
    )[0].IdTrav;

    if (trav) {
      DB.selectOneTravau(db, trav, travau => {
        const TypeTrav = travau.TypeTrav;
        const DateTrav = travau.DateTrav;
        const idCli = travau.IdCli;
        const Nom = clients.filter(item => parseInt(item.IdCli) === idCli)[0]
          .Nom;
        setRegistre({ TypeTrav, Nom, DateTrav });
      });
    }
  };

  const handleClick = e => {
    e.preventDefault();

    if (
      selectedIdTrav &&
      state.formConv.NomPersConv !== "" &&
      state.formConv.VilleConv !== ""
    ) {
      if (match === true) return setOpenAlertConv(false);
      else {
        setOpenSuccess(true);
        DB.addConvocation(
          db,
          [
            parseInt(state.formConv.NumRegistre),
            selectedIdTrav,
            selectedIdTrav,
            state.formConv.NomPersConv,
            state.formConv.DateConv.format(DATE_FORMAT),
            state.formConv.VilleConv,
            state.formConv.HeureConv.format("LT")
          ],
          newConvocation => {
            actions.addConvocations({ newConvocation });
            setState({
              ...state,
              formConv: {
                ...state.formConv,
                NumRegistre: null,
                IdTrav: selectedIdTrav,
                NumPv: "",
                NomPersConv: "",
                DateConv: moment(),
                VilleConv: "",
                HeureConv: moment(),
                NumReq: ""
              }
            });
          }
        );
      }
    } else {
      setOpenAlert(true);
    }
  };

  const handleClickUpDate = e => {
    e.preventDefault();
    if (selectedConvocation) {
      setOpenUpdateSuccess(true);
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

  const handleCloseAlertConv = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertConv(false);
  };

  const handleCloseConvSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const handleCloseUpdateSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenUpdateSuccess(false);
  };

  return (
    <React.Fragment>
      <GlobalCss />
      <form
        style={{
          height: "100%",
          boxShadow: "0px 0px 10px #888888",
          borderRadius: "10px 10px 10px 10px",
          padding: 10
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              required
              type="number"
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
          {match === true && (
            <div style={{ paddingLeft: 30 }}>
              <p style={{ color: "red" }}>
                {state.formConv.NumRegistre} est déja assigé à au travaux de{" "}
                {registre.TypeTrav} de {registre.Nom} du {registre.DateTrav}
              </p>
            </div>
          )}
          {match === false && state.formConv.NumRegistre && (
            <div style={{ paddingLeft: 30 }}>
              <p style={{ color: "green" }}>
                le numéro {state.formConv.NumRegistre} est libre
              </p>
            </div>
          )}
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
              onOpen={handlePicker}
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
            onOpen={handlePicker}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
          />
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            {!selectedConvocation && (
              <Button
                disabled={
                  ((!selectedIdTrav || match === true) &&
                    state.formConv.NomPersConv === "" &&
                    state.formConv.VilleConv === "" &&
                    true) ||
                  ((selectedIdTrav || match === true) &&
                    (state.formConv.NomPersConv === "" ||
                      state.formConv.VilleConv === "") &&
                    true) ||
                  ((selectedIdTrav || match === false) &&
                    (state.formConv.NomPersConv !== "" ||
                      state.formConv.VilleConv !== "") &&
                    false)
                }
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
            Choississez un dossier dans la liste des travaux
          </Alert>
        </Snackbar>
      </div>
      <div className={classes.root}>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlertConv}
        >
          <Alert onClose={handleCloseAlertConv} severity="error">
            Ce numero de registre est déja signé
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
      <div className={classes.root}>
        <Snackbar
          open={openUpdateSuccess}
          autoHideDuration={6000}
          onClose={handleCloseUpdateSuccess}
        >
          <Alert onClose={handleCloseUpdateSuccess} severity="success">
            Convocation modifié
          </Alert>
        </Snackbar>
      </div>
    </React.Fragment>
  );
};

export default FormConvocation;
