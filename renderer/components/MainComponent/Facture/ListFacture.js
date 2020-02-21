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

import ComboBox from "../ComboBox";
import * as DB from "../../../models";

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
  facturesBySearchName
}) => {
  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);

  const classes = useStyles();

  const [state, setState] = React.useState({
    formInput: {
      Nom: ""
    },
    currentIdCli: "",
    match: false,
    factures: factures
  });

  const cli = idCli => {
    return clients.filter(item => item.IdCli === idCli)[0];
  };

  const travList = idFact => {
    return travaux.filter(travau => travau.IdFact === idFact);
  };

  const som = idFact => {
    const travs = travaux.filter(travau => travau.IdFact === idFact);
    let somme = 0;
    for (let i = 0; i < travs.length; i++) {
      somme += travs[i].Prix;
    }
    return somme;
  };

  const selectFacture = facture => {
    if (!selectedFacture) {
      actions.setSelectedFacture({ selectedFacture: facture });
    } else if (selectedFacture && selectedFacture.IdFact !== facture.IdFact) {
      actions.setSelectedFacture({ selectedFacture: facture });
    } else actions.setSelectedFacture({ selectedFacture: null });
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
  const handleChange = (names, val) => e => {
    let nom = val;
    let currentIdCli = filterClientIdByName(nom);
    let f = state.formInput;
    setState({
      ...state,
      formInput: { ...f, Nom: nom },
      currentIdCli: currentIdCli,
      match: matchClient(nom)
    });
    if (!matchClient(nom)) setState({ ...state, factures: factures });
    else handleSearch(currentIdCli);
  };

  useEffect(() => {
    if (factures[0]) setState({ ...state, factures: factures });
  }, [factures[0]]);

  const handleSearch = currentIdCli => {
    if (state.currentIdCli !== "" || currentIdCli !== "") {
      let cli = state.currentIdCli;
      if (currentIdCli !== "") cli = currentIdCli;
      DB.selectFactureBySearchName(db, cli, factures => {
        actions.setSelectFactureBySearchName({ factures });
        setState({ ...state, factures: factures });
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid item xs={10} className={classes.search}>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          <SearchIcon />
        </Button>
        <ComboBox
          style={{ width: "80%" }}
          val={state.formInput.Nom}
          list={clients}
          onInputChange={(e, v) => handleChange("changeCombobox", v)(e)}
        />
      </Grid>

      <Divider />
      <List className={classes.root}>
        {state.factures.map((facture, i) => {
          if (selectedFacture === null) selectedFacture = { IdFact: null };
          const isSelected = facture.IdFact === selectedFacture.IdFact;

          return (
            <div key={i}>
              <ListItem
                button
                alignItems="flex-start"
                selected={isSelected}
                onClick={() => selectFacture(facture)}
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
                  {travList(facture.IdFact).map((trav, i) => {
                    return (
                      <ListItemText
                        key={i}
                        primary={trav.TypeTrav}
                        secondary={"Titre N°: " + trav.NumTitre}
                      />
                    );
                  })}
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
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </div>
  );
};
export default ListFacture;
