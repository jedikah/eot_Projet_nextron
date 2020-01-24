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
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

const useStyles = makeStyles({
  ListItemIcon: {
    display: "block",
    zIndex: 1,
    background: "white",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 18,
    paddingRight: 18,
    "&:hover": {
      background: "coral",
      color: "white"
    }
  },
  ListItemIcon_menu: {
    display: "block",
    zIndex: 1,
    background: "white",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 18,
    paddingRight: 18,
    "&:hover": {
      background: "#283593",
      color: "white"
    }
  },
  list1: {
    width: 200,
    transition: "0.5s",
    padding: 0,
    "&:not(:first-child)>:hover": {
      width: 200,
      transition: "0.5s",
      padding: 0,
      background: "coral",
      color: "white",
      transition: "color 0s"
    }
  },
  list2: {
    width: 60,
    transition: "0.5s",
    padding: 0
  },
  text1: {
    transform: "translateX(0)",
    transition: "0.5s",
    textAlign: "center"
  },
  text2: {
    transform: "translateX(-100px)",
    transition: "0.5s",
    textAlign: "center"
  },
  root: {
    borderRight: "1px solid Grey",
    height: "100%"
  }
});

export default function SideNavPage() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    hoverMenu: false
  });

  const hoverMenuOn = () => {
    setState({ hoverMenu: true });
  };
  const hoverMenuOff = () => {
    setState({ hoverMenu: false });
  };
  React.render;

  const sideList = side => (
    <div
      className={state.hoverMenu ? classes.list1 : classes.list2}
      role="presentation"
      style={{ color: "black" }}
    >
      <List className={classes.list1} onMouseEnter={hoverMenuOn}>
        <ListItem button style={{ padding: 0 }}>
          <ListItemIcon
            className={
              state.hoverMenu
                ? classes.hoverMenuIcon_on
                : classes.hoverMenuIcon_off
            }
            className={classes.ListItemIcon_menu}
          >
            <MenuRoundedIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Menu"}
            className={state.hoverMenu ? classes.text1 : classes.text2}
            style={{ zIndex: 0 }}
          />
        </ListItem>
      </List>
      <Divider />
      <List className={classes.list1}>
        <ListItem button style={{ padding: 0 }}>
          <ListItemIcon className={classes.ListItemIcon}>
            <AddToQueueIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Nouveau dossier de travaux"}
            className={state.hoverMenu ? classes.text1 : classes.text2}
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
            className={state.hoverMenu ? classes.text1 : classes.text2}
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
            className={state.hoverMenu ? classes.text1 : classes.text2}
            style={{ zIndex: 0 }}
          />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root} onMouseLeave={hoverMenuOff}>
      <div style={{ overflow: "hidden" }}>{sideList("left")}</div>
    </div>
  );
}
