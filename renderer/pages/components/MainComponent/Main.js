import React, { useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "../../../../node_modules/react-grid-layout/css/styles.css";
import "../../../../node_modules/react-resizable/css/styles.css";
import { makeStyles, createStyles } from "@material-ui/core";

const ResponsiveGridLayout = WidthProvider(Responsive);

const useStyles = makeStyles(theme =>
  createStyles({
    grid: {
      border: "1px solid green",
      width: "100%",
      maxHeight: "100%"
    },
    root: {
      border: "1px solid red"
    }
  })
);

const layoutLarge = [
  { i: "1", x: 0, y: 0, w: 2, h: 1, minW: 2 },
  { i: "2", x: 2, y: 0, w: 2, h: 1, minW: 2 },
  { i: "3", x: 4, y: 0, w: 2, h: 1, minW: 2 },
  { i: "4", x: 6, y: 0, w: 2, h: 1, minW: 2 },
  { i: "5", x: 0, y: 2, w: 2, h: 1, minW: 2 },
  { i: "6", x: 2, y: 2, w: 2, h: 1, minW: 2 },
  { i: "7", x: 4, y: 2, w: 2, h: 1, minW: 2 }
];
const layoutMedium = [
  { i: "1", x: 0, y: 0, w: 10, h: 1, minW: 2 },
  { i: "2", x: 2, y: 0, w: 2, h: 1, minW: 2 },
  { i: "3", x: 4, y: 0, w: 2, h: 1, minW: 2 },
  { i: "4", x: 6, y: 0, w: 2, h: 1, minW: 2 },
  { i: "5", x: 0, y: 2, w: 2, h: 1, minW: 2 },
  { i: "6", x: 2, y: 2, w: 2, h: 1, minW: 2 },
  { i: "7", x: 4, y: 2, w: 2, h: 1, minW: 2 }
];

const Main = () => {
  const classes = useStyles({});
  const [state, setState] = React.useState({});
  const layouts = { lg: layoutLarge, md: layoutMedium };

  useEffect(() => {});

  const onLayoutChange = (layout, newLayout) => {
    setState({ layouts: newLayout });
  };
  return (
    <ResponsiveGridLayout
      preventCollision={false}
      className={classes.grid}
      layouts={layouts}
      autoSize={true}
      breakpoints={{ lg: 1100, md: 768 }}
      onLayoutChange={(layout, newLayout) => onLayoutChange(layout, newLayout)}
    >
      <div key="1" className={classes.root}>
        ...
      </div>
      <div key="2" className={classes.root}>
        ...
      </div>
      <div key="3" className={classes.root}>
        ...
      </div>
      <div key="4" className={classes.root}>
        ...
      </div>
      <div key="5" className={classes.root}>
        ...
      </div>
      <div key="6" className={classes.root}>
        ...
      </div>
      <div key="7" className={classes.root}>
        ...
      </div>
    </ResponsiveGridLayout>
  );
};

export default Main;
