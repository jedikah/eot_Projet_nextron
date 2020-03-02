import React, { useEffect, Suspense } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
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
import Pagination from "@material-ui/lab/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    marginBottom: 10,
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
  travauxBySearchName,
  CountTravaux
}) => {
  const { remote } = require("electron");
  let path = DB.homeDir("ECM");
  path += "EMC.sqlite";
  const db = DB.connect(path);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [zoom, setZoom] = React.useState(1280 * 100);
  const [state, setState] = React.useState({
    formInput: {
      Nom: ""
    },
    currentIdCli: "",
    match: false,
    travaux: travaux,
    pages: CountTravaux % 10,
    selectPage: 1
  });
  const [convReady, setConvReady] = React.useState(false);
  useEffect(() => {
    let width = 0;
    let min = 1280;
    if (remote.getCurrentWindow().getMaximumSize()[0] >= 1920) min = 1600;
    if (window.innerWidth >= min) width = window.innerWidth * 100;
    else width = min * 100;
    setZoom(width);
    window.addEventListener("resize", () => {
      if (window.innerWidth >= min) width = window.innerWidth * 100;
      else width = min * 100;
      setZoom(width);
    });
  });

  useEffect(() => {
    if (travaux[0]) {
      setConvReady(false);
      let newConvocations = [];
      travaux.forEach((item, index) => {
        DB.selectConvocations(db, item.IdTrav, rows => {
          rows.forEach((elem, i) => {
            newConvocations.push(elem);
            //actions.addConvocations({ newConvocation: elem });
            if (index === travaux.length - 1 && i === rows.length - 1) {
              actions.initConvocation({
                convocations: newConvocations,
                convReady: val =>
                  setTimeout(() => {
                    setConvReady(val);
                  }, 1000)
              });
            }
          });
        });
      });
    }
  }, [travaux]);

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
    } else {
      actions.setSelectedTravau({ selectedTravau: null });
      actions.setSelectedConvocations({ selectedConvocation: null });
    }
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

  const handleChange = (val = state.formInput.Nom) => e => {
    let currentIdCli = filterClientIdByName(val);
    let f = state.formInput;

    setState({
      ...state,
      formInput: { ...f, Nom: val }
    });

    if (matchClient(val)) handleSearch(currentIdCli);
    else
      DB.selectTravaux(db, rows => {
        DB.selectCountTrav(db, Count => {
          actions.initTravau({ travaux: rows, CountTravaux: Count });
        });
      });
  };

  const handleSearch = currentIdCli => {
    if (state.currentIdCli !== "" || currentIdCli !== "") {
      let cli = state.currentIdCli;
      if (currentIdCli !== "") {
        cli = currentIdCli;
        DB.selectTravauBySearchName(db, cli, travaux => {
          //actions.setSelectTravauBySearchName({ travaux });
          actions.initTravau({ travaux: travaux, CountTravaux: CountTravaux });
          setState({
            ...state,
            formInput: { ...state.formInput },
            currentIdCli: currentIdCli,
            travaux: travaux
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

        {(convReady === false && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        )) ||
          (convReady === true && (
            <List className={classes.root} style={{ width: "100%" }}>
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
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <div
                        style={{
                          width: "70%",
                          display: "flex",
                          flexDirection: "row"
                        }}
                      >
                        <div>
                          <ListItemIcon>
                            <FolderIcon
                              className={isSelected ? classes.coralColor : ""}
                            />
                          </ListItemIcon>
                        </div>
                        <div>
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
                        </div>
                      </div>
                      <ListItemSecondaryAction style={{ width: "30%" }}>
                        <Button
                          style={{ overflow: "hidden", width: "100%" }}
                          variant="outlined"
                          color="primary"
                          startIcon={<DetailsIcon />}
                          onClick={handleClickOpen(travau)}
                        >
                          {remote.getCurrentWindow().getMaximumSize()[0] >=
                            1600 &&
                            zoom / 100 >= 1000 && <div>Detail</div>}
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Collapse in={isSelected} timeout="auto" unmountOnExit>
                      {convReady === true && (
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
                                    selectedConvocation &&
                                    selectedConvocation.NumRegistre ===
                                      convocation.NumRegistre
                                      ? classes.coralColor
                                      : ""
                                  }
                                />
                              </ListItemIcon>
                              <ListItemText primary={convocation.NomPersConv} />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </Collapse>
                    <Divider />
                  </div>
                );
              })}
            </List>
          ))}
        {open && <DetailDossier open={open} handleClose={handleClose} />}
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
            count={Math.ceil(CountTravaux / 10)}
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

export default AfficherDossierCtn(AffiCherDossier);
