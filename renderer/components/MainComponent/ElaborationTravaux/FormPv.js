import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import FormPvCtn from "../../../redux/containers/FormPvCtn";
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

const FormPv = ({
  selectedIdTrav,
  convocation,
  selectedTravau,
  client,
  actions,
  pv
}) => {
  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);
  const classes = useStyles();

  const [openAlert, setOpenAlert] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const [state, setState] = React.useState({
    formConv: {
      PieceJust: pv.PieceJust,
      Commune: pv.Commune,
      District: pv.District,
      Region: pv.Region
    }
  });

  useEffect(() => {
    setState({
      ...state,
      formConv: {
        ...state.formConv,
        PieceJust: pv.PieceJust,
        Commune: pv.Commune,
        District: pv.District,
        Region: pv.Region
      }
    });
  }, [pv]);

  const handleChange = names => e => {
    setState({
      ...state,
      formConv: { ...state.formConv, [names]: e.target.value }
    });
  };
  console.log(pv);
  const handleClick = e => {
    e.preventDefault();

    if (selectedIdTrav) {
      setOpenAlert(true);
      DB.addPV(
        db,
        [
          state.formConv.PieceJust,
          state.formConv.Commune,
          state.formConv.District,
          state.formConv.Region,
          selectedTravau.IdTrav
        ],
        pv => {
          actions.updatePv({ pv });
        }
      );
    } else {
      setOpenError(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  //console.log(convocation);
  return (
    <React.Fragment>
      <form
        onSubmit={handleClick}
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
              id="PieceJust"
              name="PieceJust"
              label="Pièce justificative: "
              fullWidth
              value={state.formConv.PieceJust}
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
              value={state.formConv.Commune}
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
              value={state.formConv.District}
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
              value={state.formConv.Region}
              autoComplete="region"
              variant="outlined"
              onChange={handleChange("Region")}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button
              disabled={(!selectedIdTrav && true) || (selectedIdTrav && false)}
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
      <div className={classes.root}>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            PV confirmé
          </Alert>
        </Snackbar>
      </div>
      <div className={classes.root}>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert onClose={handleCloseError} severity="error">
            Choississez un dossier de travail
          </Alert>
        </Snackbar>
      </div>
    </React.Fragment>
  );
};

export default FormPvCtn(FormPv);
