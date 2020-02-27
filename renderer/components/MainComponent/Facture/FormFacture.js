import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import ComboBox from "../ComboBox";
import ComboMulti from "../ComboMulti";
import * as DB from "../../../models";
import moment, { DATE_FORMAT } from "../../../module/moment";

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

const FormFacture = ({
  clients,
  travaux,
  actions,
  selectedFacture,
  selectedTravauxByFacture
}) => {
  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);

  const classes = useStyles();

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const [state, setState] = React.useState({
    formInput: {
      DateFact: moment(),
      currentIdCli: null,
      travNotFactuered: [],
      travaux: [],
      NomCli: "",
      oldTravaux: []
    }
  });

  const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    "@global": {
      // You should target [class*="MuiButton-root"] instead if you nest themes.
      ".MuiPopover-root": {
        zoom: (window.innerWidth * 100) / 1922 + "% !important"
      }
    }
  })(() => null);

  const handlePicker = () => {
    let width;
    if (window.innerWidth >= 1280) width = window.innerWidth * 100;
    else width = 1280 * 100;
    setState({ ...state, zoom: width });
  };

  useEffect(() => {
    if (selectedFacture !== null) {
      setState({
        ...state,
        formInput: {
          ...state.formInput,
          DateFact: moment(selectedFacture.DateFact, DATE_FORMAT),
          currentIdCli: selectedFacture.IdCli,
          travaux: selectedTravauxByFacture.filter(
            item => item.IdFact === selectedFacture.IdFact
          ),
          travNotFactuered:
            selectedTravauxByFacture.filter(item => item.IdFact === "") || [],
          oldTravaux: selectedTravauxByFacture.filter(
            item => item.IdFact !== ""
          ),
          NomCli: clients.filter(
            item => item.IdCli === selectedFacture.IdCli
          )[0].Nom
        }
      });
    } else if (selectedFacture === null && selectedTravauxByFacture[0]) {
      setState({
        ...state,
        formInput: {
          ...state.formInput,
          currentIdCli: selectedTravauxByFacture[0].IdCli,
          travaux: selectedTravauxByFacture.filter(item => item.IdFact !== ""),
          travNotFactuered:
            selectedTravauxByFacture.filter(item => item.IdFact === "") || [],
          oldTravaux: selectedTravauxByFacture.filter(
            item => item.IdFact !== ""
          ),
          NomCli: clients.filter(
            item => item.IdCli === selectedTravauxByFacture[0].IdCli
          )[0].Nom
        }
      });
    }
  }, [selectedTravauxByFacture]);

  const handleChange = (names, val, reason) => e => {
    let name = names;
    let f = state.formInput;

    if (names === "changeCombobox") {
      let nom = val;
      let currentIdCli = filterClientIdByName(val);
      let filter = clients.filter(item => item.Nom === nom)[0];
      if (!filter)
        setState({
          ...state,
          formInput: { ...f, travaux: [], currentIdCli: null }
        });
      else
        DB.selectTravauBySearchName(db, currentIdCli, rows => {
          actions.setSelectedFacture({
            selectedFacture: null,
            selectedTravauxByFacture: rows.filter(item => item.IdFact === "")
          });
        });
    } else if (names === "changeComboMulti") {
      DB.selectCountFact(db, count => {
        let selectedFact = null,
          IdFact;
        if (selectedFacture !== null) {
          selectedFact = selectedFacture;
          IdFact = selectedFacture.IdFact;
        } else IdFact = count;
        actions.updateSelectedFacture({
          selectedTravauxII: findDeletedTravau(val, selectedTravauxByFacture),
          selectedTravauxI: val,
          IdFact: IdFact + 1,
          selectedFact
        });
      });
    } else {
      setState({
        ...state,
        formInput: { ...f, [name]: e.target.value }
      });
    }
  };

  const handleSave = e => {
    e.preventDefault();
    let f = state.formInput;
    if (selectedFacture === null) {
      setOpenAdd(true);

      console.log(state.formInput.currentIdCli);

      DB.addFacture(db, [
        state.formInput.currentIdCli,
        state.formInput.DateFact.format(DATE_FORMAT),
        selectedTravauxByFacture
      ]);
      DB.selectFacture(db, rows => {
        DB.selectCountFact(db, Count => {
          let IdCli = [],
            i = 0;

          rows.forEach(element => {
            IdCli[i++] = element.IdCli;
          });
          let removeDuplicatesIdCli = [...new Set(IdCli)];
          actions.initFacture({
            factures: rows,
            CountFactures: Count,
            IdCliFromFacture: removeDuplicatesIdCli
          });
        });
      });
      setState({
        ...state,
        formInput: { ...f, travaux: [] }
      });
    }
  };

  const findDeletedTravau = (first, second) => {
    let array1, array2;
    if (first.length <= second.length) {
      array1 = second;
      array2 = first;
    } else {
      array1 = first;
      array2 = second;
    }
    const save = array1;
    for (let i = 0; i < array2.length; i++) {
      array1 = array1.filter(item => item !== array2[i]);
    }

    for (let i = 0; i < save.length; i++) {
      array2 = array2.filter(item => item !== save[i]);
    }
    array2.forEach(item => array1.push(item));
    return array1;
  };

  const match = () => {
    let newTrav = [],
      oldTrav = [];
    state.formInput.oldTravaux.forEach(item => oldTrav.push(item.IdTrav));
    state.formInput.travaux.forEach(item => newTrav.push(item.IdTrav));
    return findDeletedTravau(newTrav, oldTrav);
  };

  const handleEdit = e => {
    e.preventDefault();
    let newTrav = [],
      oldTrav = [],
      val = [];
    state.formInput.oldTravaux.forEach(item => oldTrav.push(item.IdTrav));
    state.formInput.travaux.forEach(item => newTrav.push(item.IdTrav));
    val = findDeletedTravau(newTrav, oldTrav);

    val.forEach(IdTrav => {
      DB.checkFacture(db, IdTrav, id => {
        setOpenUpdate(true);
        if (id === "") {
          DB.updateFactureTrav(db, [selectedFacture.IdFact, IdTrav]);
          actions.updateTravauFact({
            IdFact: selectedFacture.IdFact,
            IdTrav: IdTrav
          });
        } else {
          DB.updateFactureTrav(db, ["", IdTrav]);
          actions.updateTravauFact({ IdFact: "", IdTrav: IdTrav });
        }
        setState({
          ...state,
          formInput: {
            ...state.formInput,
            DateFact: moment(selectedFacture.DateFact, DATE_FORMAT),
            currentIdCli: selectedFacture.IdCli,
            travaux: travaux.filter(
              item => item.IdFact === selectedFacture.IdFact
            ),
            NomCli: clients.filter(
              item => item.IdCli === selectedFacture.IdCli
            )[0].Nom,
            oldTravaux: travaux.filter(
              item => item.IdFact === selectedFacture.IdFact
            )
          }
        });
      });
    });
  };

  const filterClientIdByName = name => {
    const client = clients;
    let filtredList = client.filter(client => client.Nom === name);
    if (filtredList.length === 1) return filtredList[0].IdCli;
    else return "";
  };

  const handleCloseAdd = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAdd(false);
  };

  const handleCloseUpdate = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenUpdate(false);
  };

  return (
    <div
      style={{
        minWidth: "60%",
        maxWidth: "70%",
        height: "95%",
        boxShadow: "0px 0px 15px #888888",
        borderRadius: 20,
        padding: 25,
        paddingLeft: 25,
        paddingRight: 40,
        justifyContent: "center"
      }}
    >
      <GlobalCss />
      <form>
        <Grid container spacing={3}>
          <Divider />
          {!selectedFacture && (
            <Grid item xs={6}>
              <ComboBox
                val={state.formInput.NomCli}
                list={clients}
                idCli={state.formInput.currentIdCli}
                onInputChange={(e, v) => handleChange("changeCombobox", v)(e)}
              />
            </Grid>
          )}
          {selectedFacture && (
            <Grid item xs={6}>
              <TextField
                InputProps={{
                  readOnly: true
                }}
                id="Nom"
                name="Nom"
                label="Nom"
                fullWidth
                value={state.formInput.NomCli}
                autoComplete="Nom"
                onChange={handleChange("NomCli")}
                variant="outlined"
              />
            </Grid>
          )}

          <Grid item xs={6}>
            <ComboMulti
              values={
                (selectedTravauxByFacture[0] && state.formInput.travaux) || ""
              }
              disabled={!selectedTravauxByFacture[0]}
              list={state.formInput.travNotFactuered}
              currentIdCli={state.formInput.currentIdCli}
              onInputChange={(e, v, r) =>
                handleChange("changeComboMulti", v, r)(e)
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="LL"
              margin="normal"
              id="dateFacture: "
              label="Date de facturation: "
              value={state.formInput.DateTrav}
              onChange={date => handleChange("DateFact", date)}
              onOpen={handlePicker}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {!selectedFacture && (
              <Button
                disabled={
                  !selectedTravauxByFacture[0] || !state.formInput.travaux[0]
                }
                type="submit"
                onClick={handleSave}
                fullWidth
                variant="contained"
                color="primary"
              >
                Enregistrer
              </Button>
            )}
            {selectedFacture && (
              <Button
                disabled={!match()[0]}
                type="submit"
                onClick={handleEdit}
                fullWidth
                variant="contained"
                color="primary"
              >
                Modifier
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
      <div className={classes.root}>
        <Snackbar
          open={openAdd}
          autoHideDuration={6000}
          onClose={handleCloseAdd}
        >
          <Alert onClose={handleCloseAdd} severity="success">
            Facture enregistré
          </Alert>
        </Snackbar>
      </div>
      <div className={classes.root}>
        <Snackbar
          open={openUpdate}
          autoHideDuration={6000}
          onClose={handleCloseUpdate}
        >
          <Alert onClose={handleCloseUpdate} severity="success">
            Facture modifié
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default FormFacture;
