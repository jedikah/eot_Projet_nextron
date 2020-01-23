import { useRouter } from "next/router";
import { useEffect } from "react";
import React from "react";
/********start dialog import */
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import orange from "@material-ui/core/colors/orange";
/********end dialog import */

/********start dialog style */
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    color: orange[500],
    height: "35px",
    padding: 0,
    marginLeft: "10px"
  },
  closeButton: {
    padding: 0,
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: orange[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    color: orange[800],
    height: "35px"
  }
}))(MuiDialogActions);

/********end dialog style */

const MyLink = props => {
  const router = useRouter();

  useEffect(() => {
    if (props.prefetch) router.prefetch(props.href);
  });
  const handleClick = e => {
    e.preventDefault();
    console.log("value", props.values.input.passWd);

    if (
      props.values.input.id === props.values.signId &&
      props.values.input.passWd === props.values.signPassWd
    ) {
      router.push(props.href);
    } else {
      console.log("Les valeurs ne corresponde pas");
      handleClickOpen();
    }
  };
  /********start dialog methode */
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  /********end dialog methode */
  return (
    <div>
      <div onClick={handleClick}>{props.children}</div>

      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Valeurs nom valide
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Les valeurs des champ ne correspondent pas, veuillez verifier !
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleClose}
              style={{ color: orange[500] }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default MyLink;
