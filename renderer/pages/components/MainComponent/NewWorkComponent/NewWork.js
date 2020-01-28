import React, { useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "../../../../../node_modules/react-grid-layout/css/styles.css";
import "../../../../../node_modules/react-resizable/css/styles.css";
import { makeStyles, createStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import FormNewDoc from "./FormNewDoc";

const ResponsiveGridLayout = WidthProvider(Responsive);

const layoutLarge = [
  { i: "1", x: 0, y: 0, w: 6, h: 10, maxH: 10, maxW: 6, minH: 4, minW: 2 },
  { i: "2", x: 4, y: 0, w: 6, h: 10, maxH: 10, maxW: 10, minH: 7, minW: 4 },
  { i: "3", x: 14, y: 0, w: 4, h: 10, maxH: 10, maxW: 10, minH: 7, minW: 4 }
];
const layoutMedium = [
  { i: "1", x: 0, y: 0, w: 6, h: 8.1, maxH: 8.1, maxW: 6, minH: 4, minW: 2 },
  { i: "2", x: 4, y: 0, w: 6, h: 8.1, maxH: 8.1, maxW: 10, minH: 4, minW: 4 },
  { i: "3", x: 14, y: 0, w: 4, h: 8.1, maxH: 8.1, maxW: 10, minH: 4, minW: 4 }
];
const layoutSm = [
  { i: "1", x: 0, y: 0, w: 6, h: 6.75, maxH: 6.75, maxW: 6, minH: 4, minW: 2 },
  { i: "2", x: 4, y: 0, w: 6, h: 6.75, maxH: 6.75, maxW: 10, minH: 2, minW: 4 },
  { i: "3", x: 14, y: 0, w: 4, h: 6.75, maxH: 6.75, maxW: 10, minH: 2, minW: 4 }
];
const layoutXs = [
  { i: "1", x: 0, y: 0, w: 6, h: 6.25, maxH: 6.25, maxW: 6, minH: 4, minW: 2 },
  { i: "2", x: 4, y: 0, w: 6, h: 6.25, maxH: 6.25, maxW: 10, minH: 1, minW: 4 },
  { i: "3", x: 14, y: 0, w: 4, h: 6.25, maxH: 6.25, maxW: 10, minH: 1, minW: 4 }
];
const layoutXxs = [
  { i: "1", x: 0, y: 0, w: 6, h: 5, maxH: 5, maxW: 6, minH: 4, minW: 2 },
  { i: "2", x: 4, y: 0, w: 6, h: 5, maxH: 5, maxW: 10, minH: 1, minW: 4 },
  { i: "3", x: 14, y: 0, w: 4, h: 5, maxH: 5, maxW: 10, minH: 1, minW: 4 }
];

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

const NewWork = props => {
  const classes = useStyles({});
  let layouts = {
    lg: layoutLarge,
    md: layoutMedium,
    sm: layoutSm,
    xs: layoutXs,
    xxs: layoutXxs
  };
  useEffect(() => {
    console.log("avant : ", Object.values(layouts));
    if (localStorage) layouts = JSON.parse(localStorage.getItem("layouts"));
    console.log("apres : ", Object.values(layouts));
  });
  let [state, setState] = React.useState({ layouts: layouts });
  const onLayoutChange = (layout, newLayout) => {
    setState({ layouts: newLayout });
    //console.log(Object.values(newLayout));
    localStorage.setItem("layouts", JSON.stringify(newLayout));
  };

  return (
    <ResponsiveGridLayout
      compactType={"horizontal"}
      rowHeight={96}
      margin={[1, 0]}
      preventCollision={false}
      isDraggable={false}
      isResizable={false}
      className={classes.grid}
      layouts={state.layouts}
      autoSize={false}
      breakpoints={{ lg: 1800, md: 1500, sm: 1300, xs: 1000, xxs: 800 }}
      cols={{ lg: 16, md: 16, sm: 16, xs: 16, xxs: 16 }}
      onLayoutChange={(layout, newLayout) => onLayoutChange(layout, newLayout)}
    >
      <div key="1" className={classes.root}>
        ...1
      </div>
      <div key="2" className={classes.root}></div>
      <div key="3" className={classes.root} style={{ flexDirection: "column" }}>
        <div
          style={{
            height: 20,
            width: "100%",
            border: "1px solid grey",
            color: "white",
            background: "grey",
            textAlign: "center"
          }}
        >
          Créer un dossier
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid grey",
            padding: 5
          }}
        >
          <FormNewDoc></FormNewDoc>
        </div>
      </div>
    </ResponsiveGridLayout>
  );
};

export default NewWork;
