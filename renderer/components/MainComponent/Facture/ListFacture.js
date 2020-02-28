import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import { fade, makeStyles } from "@material-ui/core/styles";
import DetailsIcon from "@material-ui/icons/Details";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";

import ComboBox from "../ComboBox";
import * as DB from "../../../models";
import WordModal from "../WordModal";
import Word from "./word";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  coralColor: {
    color: "coral"
  },
  nested: {
    paddingLeft: theme.spacing(6)
  },
  searchIcon: {
    pointerEvents: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    background: "coral",
    "&:hover": {
      background: "coral",
      color: "white"
    }
  },
  search: {
    "& div.MuiAutocomplete-popper": { background: "red" },
    display: "flex",
    flexDirection: "row",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  popper: { background: "red" }
}));

const ListFacture = ({
  clients,
  travaux,
  factures,
  actions,
  selectedFacture,
  facturesBySearchName,
  CountFactures,
  IdCliFromFacture
}) => {
  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);

  const classes = useStyles();

  const [state, setState] = React.useState({
    formInput: {
      Nom: ""
    },
    travaux: [],
    currentIdCli: "",
    match: false,
    factures: factures
  });

  useEffect(() => {
    DB.selectAllTravaux(db, rows => {
      setState({ ...state, travaux: rows });
    });
  }, []);
  const cli = idCli => {
    return clients.filter(item => item.IdCli === idCli)[0];
  };

  const travList = idFact => {
    return state.travaux.filter(travau => travau.IdFact === idFact);
  };

  const som = idFact => {
    const travs = state.travaux.filter(travau => travau.IdFact === idFact);
    let somme = 0;
    for (let i = 0; i < travs.length; i++) {
      somme += travs[i].Prix;
    }
    return somme;
  };

  const selectFacture = (facture, Nom, IdCli) => {
    DB.selectTravauBySearchName(db, IdCli, rows => {
      facture.Nom = Nom;
      if (!selectedFacture) {
        actions.setSelectedFacture({
          selectedFacture: facture,
          selectedTravauxByFacture: rows
        });
      } else if (selectedFacture && selectedFacture.IdFact !== facture.IdFact) {
        actions.setSelectedFacture({
          selectedFacture: facture,
          selectedTravauxByFacture: rows
        });
      } else
        actions.setSelectedFacture({
          selectedFacture: null,
          selectedTravauxByFacture: []
        });
    });
  };

  const filterClientIdByName = name => {
    let filtredList = clients.filter(client => client.Nom === name);
    if (filtredList.length === 1) return filtredList[0].IdCli;
    else return "";
  };

  const matchClient = Nom => {
    let match = false;
    clients.forEach(element => {
      if (element.Nom === Nom) match = true;
    });
    return match;
  };

  const handleChange = (val = state.formInput.Nom) => e => {
    let nom = val;
    let currentIdCli = filterClientIdByName(nom);
    let f = state.formInput;
    setState({
      ...state,
      formInput: { ...f, Nom: nom },
      currentIdCli: currentIdCli,
      match: matchClient(nom)
    });
    setState({
      ...state,
      formInput: { ...f, Nom: val }
    });

    if (matchClient(val)) handleSearch(currentIdCli);
    else
      DB.selectFacture(db, rows => {
        DB.selectCountFact(db, Count => {
          actions.initFacture({ factures: rows, CountFactures: Count });
        });
      });
  };

  const handleSearch = currentIdCli => {
    if (state.currentIdCli !== "" || currentIdCli !== "") {
      let cli = state.currentIdCli;
      if (currentIdCli !== "") {
        cli = currentIdCli;
        DB.selectFactureBySearchName(db, cli, factures => {
          actions.initFacture({
            factures,
            CountFactures
          });
          setState({
            ...state,
            currentIdCli: currentIdCli,
            factures: factures
          });
        });
      } else pageChange(1);
    }
  };

  const pageChange = num => e => {
    num *= 10;
    DB.selectTravauxPaging(db, num - 10, rows => {
      DB.selectCountTrav(db, Count => {
        actions.initTravau({ travaux: rows, CountTravaux: Count });
      });
    });
  };

  return (
    <div
      className={classes.root}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: "0px 0px 10px #888888",
        borderRadius: "10px 10px 10px 10px",
        padding: 10
      }}
    >
      <div
        style={{
          height: "100%",
          overflowY: "scroll"
        }}
      >
        <div
          style={{
            width: "100%",
            background: "white",
            position: "sticky",
            zIndex: 12,
            top: -15
          }}
        >
          <Grid item xs={10} className={classes.search}>
            <Button variant="contained" color="primary" onClick={handleChange}>
              <SearchIcon />
            </Button>
            <ComboBox
              style={{ width: "80%" }}
              val={state.formInput.Nom}
              list={clients}
              onInputChange={(e, v) => handleChange(v)(e)}
            />
          </Grid>
        </div>

        <Divider />
        <List className={classes.root}>
          {factures.map((facture, i) => {
            let isSelected = false,
              idFact;
            if (selectedFacture === null) idFact = "";
            else idFact = selectedFacture.IdFact;
            isSelected = facture.IdFact === idFact;

            return (
              <div key={i}>
                <ListItem
                  button
                  alignItems="flex-start"
                  selected={isSelected}
                  onClick={() =>
                    selectFacture(
                      facture,
                      cli(facture.IdCli).Nom,
                      facture.IdCli
                    )
                  }
                >
                  <ListItemIcon>
                    <ReceiptIcon
                      className={isSelected ? classes.coralColor : ""}
                    />
                  </ListItemIcon>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                      margin: 0,
                      lineHeight: 0
                    }}
                  >
                    <ListItemText primary={facture && cli(facture.IdCli).Nom} />
                    <br />
                    {(travList(facture.IdFact)[0] &&
                      travList(facture.IdFact).map((trav, i) => {
                        return (
                          <ListItemText
                            key={i}
                            primary={"type: " + trav.TypeTrav}
                            secondary={"Titre N°: " + trav.NumTitre}
                          />
                        );
                      })) || (
                      <ListItemText key={i} primary={"Travaux non facturé"} />
                    )}
                    <br />
                    {"Total: " + som(facture.IdFact) + " Ar"}
                  </div>
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<DetailsIcon />}
                    >
                      Word
                    </Button>
                    <WordModal
                      open={true}
                      title="Visualisation de facture"
                      Content={Word()}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>

      <div
        style={{
          width: "100%",
          background: "white"
        }}
      >
        <Divider />
        <Grid item xs={12}>
          <Pagination
            count={Math.ceil(CountFactures / 10)}
            shape="rounded"
            color="secondary"
            showFirstButton
            showLastButton
            onChange={(e, num) => pageChange(num)(e)}
          />
        </Grid>
      </div>
    </div>
  );
};
export default ListFacture;
