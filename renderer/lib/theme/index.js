import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#19857b"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    }
  }
});
