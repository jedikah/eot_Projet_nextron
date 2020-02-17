import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";

import ComboBox from "../ComboBox";
import ComboMulti from "../ComboMulti";
import * as DB from "../../../models";
import moment, { DATE_FORMAT } from "../../../module/moment";

const FormFacture = ({ clients, travaux, actions, selectedFacture }) => {
  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);
  const [state, setState] = React.useState({
    formInput: {
      DateFact: moment(),
      currentIdCli: null,
      travaux: [],
      NomCli: ""
    }
  });

  useEffect(() => {
    if (selectedFacture) {
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
          )[0].Nom
        }
      });
    } else {
      setState({
        ...state,
        formInput: {
          ...state.formInput,
          DateFact: moment(),
          currentIdCli: null,
          travaux: [],
          NomCli: ""
        }
      });
    }
  }, [selectedFacture]);

  const handleChange = (names, val) => e => {
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
        setState({
          ...state,
          formInput: {
            ...f,
            travaux: [],
            currentIdCli: currentIdCli,
            NomCli: val
          }
        });
    } else if (names === "changeComboMulti") {
      setState({
        ...state,
        formInput: { ...f, travaux: val }
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
    const trav = state.formInput.travaux;
    if (state.formInput.currentIdCli !== null && state.formInput.travaux[0]) {
      DB.addFacture(
        db,
        [
          state.formInput.currentIdCli,
          state.formInput.DateFact.format(DATE_FORMAT),
          state.formInput.travaux
        ],
        IdFact => {
          for (let i = 0; i < trav.length; i++) {
            const IdTrav = trav[i].IdTrav;
            actions.updateTravauFact({ IdTrav, IdFact });
          }
          let newFacture = {};
          newFacture.IdFact = IdFact;
          newFacture.IdCli = state.formInput.currentIdCli;
          newFacture.DateFact = state.formInput.DateFact.format(DATE_FORMAT);
          actions.addFacture({ newFacture });
        }
      );
      setState({
        ...state,
        formInput: { ...f, travaux: [] }
      });
    }
  };

  const handleEdit = e => {
    e.preventDefault;
  };

  const filterClientIdByName = name => {
    const client = clients;
    let filtredList = client.filter(client => client.Nom === name);
    if (filtredList.length === 1) return filtredList[0].IdCli;
    else return "";
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
        paddingRight: 40
      }}
    >
      <form>
        <Grid container spacing={3}>
          <Divider />
          {!selectedFacture && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <ComboBox
                val={state.formInput.NomCli}
                list={clients}
                idCli={state.formInput.currentIdCli}
                onInputChange={(e, v) => handleChange("changeCombobox", v)(e)}
              />
            </Grid>
          )}
          {selectedFacture && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                disabled={state.match}
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

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <ComboMulti
              values={state.formInput.travaux}
              disabled={state.formInput.currentIdCli === null && true}
              list={travaux.filter(item => item.IdFact === "")}
              currentIdCli={state.formInput.currentIdCli}
              onInputChange={(e, v) => handleChange("changeComboMulti", v)(e)}
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
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {!selectedFacture && (
              <Button
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
    </div>
  );
};

export default FormFacture;
