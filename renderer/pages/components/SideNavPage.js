import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import TodayIcon from "@material-ui/icons/Today";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";

const useStyles = makeStyles({
  ListItemIcon: {
    display: "block",
    zIndex: 1,
    background: "white",
    padding: 12,
    paddingLeft: 18,
    paddingRight: 18
  },
  list1: {
    width: 200,
    transition: "0.5s"
  },
  list2: {
    width: 60,
    transition: "0.5s"
  },
  text1: {
    transform: "translateX(0)",
    transition: "0.5s"
  },
  text2: {
    transform: "translateX(-100px)",
    transition: "0.5s"
  },
  root: {
    borderRight: "1px solid Grey",
    height: "100%"
  }
});

export default function SideNavPage() {
  const classes = useStyles();
  const [state, setState] = React.useState({ hover: false });

  const hoverOn = () => {
    setState({ hover: true });
  };
  const hoverOff = () => {
    setState({ hover: false });
  };

  const sideList = side => (
    <div
      className={state.hover ? classes.list1 : classes.list2}
      role="presentation"
    >
      <List className={classes.list1}>
        <ListItem button style={{ padding: 0 }}>
          <ListItemIcon className={classes.ListItemIcon}>
            <AddToQueueIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Nouveau dossier de travaux"}
            className={state.hover ? classes.text1 : classes.text2}
            style={{ zIndex: 0 }}
          />
        </ListItem>
      </List>
      <Divider />
      <List className={classes.list1}>
        <ListItem button style={{ padding: 0 }}>
          <ListItemIcon className={classes.ListItemIcon}>
            <WorkOutlineIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Elaboration de Travaux"}
            className={state.hover ? classes.text1 : classes.text2}
            style={{ zIndex: 0 }}
          />
        </ListItem>
      </List>
      <Divider />
      <List className={classes.list1}>
        <ListItem button style={{ padding: 0 }}>
          <ListItemIcon className={classes.ListItemIcon}>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Planning"}
            className={state.hover ? classes.text1 : classes.text2}
            style={{ zIndex: 0 }}
          />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div
      className={classes.root}
      onMouseEnter={hoverOn}
      onMouseLeave={hoverOff}
      style={{ paddingTop: "50px" }}
    >
      <div style={{ overflow: "hidden" }}>{sideList("left")}</div>
    </div>
  );
}
