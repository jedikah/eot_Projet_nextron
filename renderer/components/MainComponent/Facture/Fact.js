import React, { useEffect } from "react";
import { SortablePane, Pane } from "react-sortable-pane";

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
  const panes = [1, 2].map((val, key) => (
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
