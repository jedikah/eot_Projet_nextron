import React, { useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { SortablePane, Pane } from "react-sortable-pane";

import FormNewDoc from "../../../redux/containers/FormNewDocCtn";
import AfficherDossier from "./AfficherDossier";

const useStyles = makeStyles(theme =>
  createStyles({
    grid: {
      border: "1px solid green",
      width: "100%"
    },
    root: {
      border: "1px solid red",
      display: "flex",
      padding: 5
    }
  })
);

const formulaire = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: 6,
        boxShadow: "0px 0px 10px #888888"
      }}
    >
      <div
        style={{
          width: "100%",
          background: "grey",
          color: "white",
          padding: 2,
          margin: 0,
          textAlign: "center",
          height: "3.5%"
        }}
      >
        Créer un nouveau dossier de travaux
      </div>
      <div
        style={{
          width: "99%",
          height: "95%",
          padding: 15,
          margin: 5
        }}
      >
        <FormNewDoc />
      </div>
    </div>
  );
};

const afficher = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: 7,
        boxShadow: "0px 0px 10px #888888"
      }}
    >
      <div
        style={{
          width: "100%",
          background: "grey",
          color: "white",
          padding: 2,
          margin: 0,
          textAlign: "center",
          height: "3.5%"
        }}
      >
        Liste des dossier
      </div>
      <div
        style={{
          width: "96.5%",
          height: "95%",
          minHeight: 400,
          padding: 15,
          marginTop: 5,
          overflowY: "scroll"
        }}
      >
        <AfficherDossier />
      </div>
    </div>
  );
};

const NewWork = props => {
  const classes = useStyles({});
  const [state, setState] = React.useState({
    order: ["0", "1"],
    panes: {
      "0": { width: "30%" },
      "1": { width: "69.8%" }
    }
  });

  useEffect(() => {});
  const orderChange = order => {
    setState({
      ...state,
      order
    });
  };
  const panes = [afficher(), formulaire()].map((val, key) => (
    <Pane
      key={key}
      size={{ width: state.panes[key].width, height: "100%" }}
      style={{ boxShadow: "0px 0px 30px #888888", miWidth: 300 }}
    >
      {val}
    </Pane>
  ));

  return (
    <div style={{ width: "100%" }}>
      <SortablePane
        resizable={false}
        isSortable={false}
        direction="horizontal"
        style={{ position: "relative", zIndex: 1 }}
        margin={10}
        order={state.order}
        onOrderChange={order => orderChange(order)}
        onResizeStop={(e, key, dir, ref, d) => {
          setState({
            panes: {
              ...state.panes,
              [key]: { width: state.panes[key].width + d.width }
            }
          });
        }}
      >
        {panes}
      </SortablePane>
    </div>
  );
};

export default NewWork;
