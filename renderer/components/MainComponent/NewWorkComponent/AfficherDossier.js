import React from "react";
import AfficherDossierCtn from "../../../redux/containers/AfficherDossierCtn";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import DetailDossier from "../../../redux/containers/DetailDossierCtn";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
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
              <ListItem
                alignItems="flex-start"
                button
                onClick={() => {
                  handleClick();
                  actions.setSelectedTravau({ selectedTravau: travau });
                }}
              >
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
                    </React.Fragment>
                  }
                />
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
