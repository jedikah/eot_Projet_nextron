import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import DetailsIcon from "@material-ui/icons/Details";
import FolderIcon from "@material-ui/icons/Folder";

import AfficherDossierCtn from "../../../redux/containers/AfficherDossierCtn";
import DetailDossier from "../../../redux/containers/DetailDossierCtn";

const useStyles = makeStyles(theme => ({
  root: {
    //width: "100%",
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

const AffiCherDossier = ({ actions, travaux, clients, selectedTravau }) => {
  if (selectedTravau === null) selectedTravau = { IdTrav: null };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const selectTravau = travau =>
    actions.setSelectedTravau({ selectedTravau: travau });
  const handleClose = () => setOpen(false);
  const filterClients = IdCli =>
    clients.filter(client => client.IdCli === IdCli)[0];

  const handleClickOpen = travau => e => {
    selectTravau(travau);
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <List className={classes.root}>
        {travaux.map((travau, i) => {
          const client = filterClients(travau.IdCli);
          return (
            <div key={i}>
              <ListItem
                button
                alignItems="flex-start"
                selected={travau.IdTrav === selectedTravau.IdTrav}
                onClick={() => selectTravau(travau)}
              >
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary={client && client.Nom}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {travau.Prix}
                      </Typography>
                      <br />
                      {travau.TypeTrav}
                      <br />
                      {travau.DateTrav}
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<DetailsIcon />}
                    onClick={handleClickOpen(travau)}
                  >
                    Detail
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
      {open && <DetailDossier open={open} handleClose={handleClose} />}
    </div>
  );
};

export default AfficherDossierCtn(AffiCherDossier);
