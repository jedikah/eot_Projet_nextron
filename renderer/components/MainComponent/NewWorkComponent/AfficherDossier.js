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
import Collapse from "@material-ui/core/Collapse";
import DetailsIcon from "@material-ui/icons/Details";
import FolderIcon from "@material-ui/icons/Folder";
import ContactMailIcon from "@material-ui/icons/ContactMail";

import AfficherDossierCtn from "../../../redux/containers/AfficherDossierCtn";
import DetailDossier from "../../../redux/containers/DetailDossierCtn";

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

const AffiCherDossier = ({
  actions,
  travaux,
  clients,
  selectedTravau,
  convocations
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const filterClients = IdCli =>
    clients.filter(client => client.IdCli === IdCli)[0];
  const filterConvocations = IdTrav =>
    convocations.filter(convocation => convocation.IdTrav === IdTrav);

  const selectTravau = travau => {
    if (!selectedTravau) actions.setSelectedTravau({ selectedTravau: travau });
    else if (selectedTravau && selectedTravau.IdTrav !== travau.IdTrav)
      actions.setSelectedTravau({ selectedTravau: travau });
    else actions.setSelectedTravau({ selectedTravau: null });
  };

  const handleClickOpen = travau => e => {
    actions.setSelectedTravau({ selectedTravau: travau });
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <List className={classes.root}>
        {travaux.map((travau, i) => {
          if (selectedTravau === null) selectedTravau = { IdTrav: null };
          const client = filterClients(travau.IdCli);
          const convocations = filterConvocations(travau.IdTrav);
          const isSelected = travau.IdTrav === selectedTravau.IdTrav;
          return (
            <div key={i}>
              <ListItem
                button
                alignItems="flex-start"
                selected={isSelected}
                onClick={() => selectTravau(travau)}
              >
                <ListItemIcon>
                  <FolderIcon
                    className={isSelected ? classes.coralColor : ""}
                  />
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

              <Collapse in={isSelected} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {convocations.map(convocation => (
                    <ListItem
                      key={convocation.NumRegistre}
                      button
                      className={classes.nested}
                    >
                      <ListItemIcon>
                        <ContactMailIcon />
                      </ListItemIcon>
                      <ListItemText primary={convocation.NomPersConv} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
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
