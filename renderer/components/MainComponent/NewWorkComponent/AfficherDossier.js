import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DetailsIcon from "@material-ui/icons/Details";

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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = () => handleClickOpen();
  const filterClients = IdCli =>
    clients.filter(client => client.IdCli === IdCli)[0];

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List className={classes.root}>
        {travaux.map((travau, i) => {
          const client = filterClients(travau.IdCli);
          return (
            <div key={i}>
              <ListItem alignItems="flex-start">
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
                    onClick={() => {
                      handleClick();
                      actions.setSelectedTravau({ selectedTravau: travau });
                    }}
                  >
                    Detail
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </div>
          );
        })}
      </List>
      {open && <DetailDossier open={open} handleClose={handleClose} />}
    </div>
  );
};

export default AfficherDossierCtn(AffiCherDossier);
