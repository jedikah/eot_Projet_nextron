import React, { useEffect } from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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
import SearchIcon from "@material-ui/icons/Search";

import AfficherDossierCtn from "../../../redux/containers/AfficherDossierCtn";
import DetailDossier from "../../../redux/containers/DetailDossierCtn";
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
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
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

const AffiCherDossier = ({
  actions,
  travaux,
  clients,
  selectedTravau,
  selectedConvocation,
  convocations,
  travauxBySearchName
}) => {
  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    width: 0,
    formInput: {
      Nom: ""
    },
    currentIdCli: "",
    match: false,
    travaux: travaux
  });
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth / 1922);
    });
  }, []);

  const handleClose = () => setOpen(false);

  const filterClients = IdCli =>
    clients.filter(client => client.IdCli === IdCli)[0];

  const filterConvocations = IdTrav =>
    convocations.filter(convocation => convocation.IdTrav === IdTrav);

  const selectTravau = travau => {
    if (!selectedTravau) {
      actions.setSelectedTravau({ selectedTravau: travau });
    } else if (selectedTravau && selectedTravau.IdTrav !== travau.IdTrav) {
      actions.setSelectedTravau({ selectedTravau: travau });
    } else actions.setSelectedTravau({ selectedTravau: null });
  };

  const collapseClick = convocation => {
    if (!selectedConvocation) {
      actions.setSelectedConvocations({ selectedConvocation: convocation });
    } else if (
      selectedConvocation &&
      selectedConvocation.NumRegistre !== convocation.NumRegistre
    ) {
      actions.setSelectedConvocations({ selectedConvocation: convocation });
    } else actions.setSelectedConvocations({ selectedConvocation: null });
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

  const handleClickOpen = travau => e => {
    actions.setSelectedTravau({ selectedTravau: travau });
    setOpen(true);
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
  };

  useEffect(() => {
    if (travaux[0]) setState({ ...state, travaux: travaux });
  }, [travaux[0]]);

  const handleSearch = () => {
    if (state.currentIdCli !== "") {
      DB.selectTravauBySearchName(db, state.currentIdCli, travaux => {
        actions.setSelectTravauBySearchName({ travaux });
        setState({ ...state, travaux: travaux });
      });
    }
  };

  return (
    <div
      className={classes.root}
      style={{ display: "flex", flexDirection: "column" }}
    >
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
      <List className={classes.root} style={{ width: "100%" }}>
        {state.travaux.map((travau, i) => {
          if (selectedTravau === null) selectedTravau = { IdTrav: null };
          const client = filterClients(travau.IdCli);
          const convocations = filterConvocations(travau.IdTrav);
          const isSelected = travau.IdTrav === selectedTravau.IdTrav;
          const isSelectedConvocation = selectedConvocation !== null;

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
                  {convocations.map((convocation, key) => (
                    <ListItem
                      key={convocation.NumRegistre}
                      button
                      className={classes.nested}
                      onClick={() => collapseClick(convocation)}
                    >
                      <ListItemIcon>
                        <ContactMailIcon
                          className={
                            isSelectedConvocation ? classes.coralColor : ""
                          }
                        />
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
