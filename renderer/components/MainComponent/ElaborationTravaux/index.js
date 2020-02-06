import React, { useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { SortablePane, Pane } from "react-sortable-pane";

import AfficherDossier from "../NewWorkComponent/AfficherDossier";
import FormConvocation from "./FromConvocation";
import FormPv from "./FormPv";

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

const formulairePV = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "99.3%",
          background: "grey",
          color: "white",
          padding: 2,
          margin: 0,
          textAlign: "center",
          height: "3.5%"
        }}
      >
        Créer un PV
      </div>
      <div
        style={{
          width: "99%",
          height: "95%",
          padding: 15,
          margin: 5,
          border: "1px groove grey"
        }}
      >
        <FormPv />
      </div>
    </div>
  );
};

const formulaireConvocation = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "99.3%",
          background: "grey",
          color: "white",
          padding: 2,
          margin: 0,
          textAlign: "center",
          height: "3.5%"
        }}
      >
        Créer /Modifier une convocation
      </div>
      <div
        style={{
          width: "99%",
          height: "95%",
          padding: 15,
          margin: 5,
          border: "1px groove grey"
        }}
      >
        <FormConvocation />
      </div>
    </div>
  );
};

const afficher = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "99.3%",
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
          padding: 15,
          margin: 5,
          border: "1px groove grey"
        }}
      >
        <AfficherDossier />
      </div>
    </div>
  );
};

const ElaborationTravaux = () => {
  const [state, setState] = React.useState({
    order: ["0", "1", "2"],
    panes: {
      "0": { width: "30%" },
      "1": { width: "40%" },
      "2": { width: "30%" }
    }
  });

  useEffect(() => {});
  const orderChange = order => {
    setState({
      ...state,
      order
    });
  };
  const panes = [afficher(), formulaireConvocation(), formulairePV()].map(
    (val, key) => (
      <Pane
        key={key}
        size={{ width: state.panes[key].width, height: "100%" }}
        style={{ border: "1px solid blue" }}
      >
        {val}
      </Pane>
    )
  );

  return (
    <div style={{ border: "1px solid red", width: "100%" }}>
      <SortablePane
        isSortable={false}
        style={{ border: "1px solid green" }}
        direction="horizontal"
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

export default ElaborationTravaux;
