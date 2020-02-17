import React, { useEffect } from "react";
import { SortablePane, Pane } from "react-sortable-pane";

import SettingCtn from "../../../redux/containers/SettingCtn";

const planning = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
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
        Parametre
      </div>
      <div
        style={{
          width: "100%",
          height: "95%",
          padding: 15,
          marginTop: 5,
          overflow: "auto"
        }}
      >
        <SettingCtn />
      </div>
    </div>
  );
};

const SettingPan = () => {
  const [state, setState] = React.useState({
    order: ["0"],
    panes: {
      "0": { width: "100%" }
    }
  });

  useEffect(() => {});
  const orderChange = order => {
    setState({
      ...state,
      order
    });
  };
  const panes = [planning()].map((val, key) => (
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

export default SettingPan;
