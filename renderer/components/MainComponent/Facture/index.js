import React, { useEffect } from "react";
import { SortablePane, Pane } from "react-sortable-pane";

import FormFacture from "../../../redux/containers/FormFactureCtn";
import ListFacture from "../../../redux/containers/ListFactureCtn";

const facture = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        boxShadow: "0px 0px 15px #888888"
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
        Facturer Travaux
      </div>
      <div
        style={{
          width: "100%",
          height: "95%",
          padding: 15,
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <FormFacture />
      </div>
    </div>
  );
};

const listeFacture = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        boxShadow: "0px 0px 15px #888888"
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
        Liste des factures
      </div>
      <div
        style={{
          width: "100%",
          height: "95%",
          padding: 5,
          marginTop: 5,
          alignItems: "center"
        }}
      >
        <ListFacture />
      </div>
    </div>
  );
};

const Facture = () => {
  const [state, setState] = React.useState({
    order: ["0", "1"],
    panes: {
      "0": { width: "30%" },
      "1": { width: "70%" }
    }
  });

  useEffect(() => {});
  const orderChange = order => {
    setState({
      ...state,
      order
    });
  };
  const panes = [listeFacture(), facture()].map((val, key) => (
    <Pane key={key} size={{ width: state.panes[key].width, height: "100%" }}>
      {val}
    </Pane>
  ));

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

export default Facture;
