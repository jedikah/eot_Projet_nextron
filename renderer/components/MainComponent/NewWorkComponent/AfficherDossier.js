import React from "react";
import AfficherDossierCtn from "../../../redux/containers/AfficherDossierCtn";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import DetailDossier from "./DetailDossier";

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

const AffiCherDossier = props => {
  console.log(props);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleClick() {
    handleClickOpen();
  }

  const classes = useStyles();
  console.log(props.travaux);
  return (
    <div className={classes.root}>
      <List className={classes.root}>
        {props.travaux.map((item, i) => (
          <div key={i}>
            <ListItem
              alignItems="flex-start"
              button
              onClick={() => handleClick()}
            >
              <ListItemText
                primary={item.Nom}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {item.Prix}
                    </Typography>
                    <br />
                    {item.TypeTrav}
                  </React.Fragment>
                }
              />
            </ListItem>

            <DetailDossier open={open} handleClose={handleClose} item={item} />
          </div>
        ))}
      </List>
    </div>
  );
};

export default AfficherDossierCtn(AffiCherDossier);
