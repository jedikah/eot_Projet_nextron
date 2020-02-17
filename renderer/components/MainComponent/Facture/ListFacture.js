import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DetailsIcon from "@material-ui/icons/Details";
import ReceiptIcon from "@material-ui/icons/Receipt";

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
  }
}));

const ListFacture = ({
  clients,
  travaux,
  factures,
  actions,
  selectedFacture
}) => {
  const classes = useStyles();

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

  return (
    <div className={classes.root}>
      <List className={classes.root}>
        {factures.map((facture, i) => {
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
