import React, { useEffect } from "react";
import { SortablePane, Pane } from "react-sortable-pane";

import AfficherDossier from "../NewWorkComponent/AfficherDossier";
import FormConvocation from "../../../redux/containers/FormConvocationCtn";
import FormPv from "./FormPv";

const formulairePV = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
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
        Modifier un PV
      </div>
      <div
        style={{
          width: "100%",
          height: "95%",
          padding: 15,
          marginTop: 5
        }}
      >
        <FormPv />
      </div>
    </div>
  );
};

const formulaireConvocation = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        boxShadow: "0px 0px 10px #888888"
      }}
    >
      <div
        style={{
          width: "99.3%",
          background: "grey",
          color: "white",
          padding: 5,
          margin: 0,
          textAlign: "center",
          height: "3.5%"
        }}
      >
        Créer /Modifier une convocation
      </div>
      <div
        style={{
          width: "100%",
          height: "95%",
          padding: 15,
          marginTop: 5
        }}
      >
        <FormConvocation />
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
          marginTop: 5
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
      <Pane key={key} size={{ width: state.panes[key].width, height: "100%" }}>
        {val}
      </Pane>
    )
  );

  return (
    <div style={{ width: "100%" }}>
      <SortablePane
        isSortable={false}
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
