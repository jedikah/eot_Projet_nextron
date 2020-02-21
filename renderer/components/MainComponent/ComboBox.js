/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withStyles } from "@material-ui/core/styles";

export default function ComboBox(props) {
  const [zoom, setZoom] = React.useState(1280 * 100);
  useEffect(() => {
    let width;
    if (window.innerWidth >= 1280) width = window.innerWidth * 100;
    else width = 1280 * 100;
    setZoom(width);
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1280) width = window.innerWidth * 100;
      else width = 1280 * 100;
      setZoom(width);
    });
  }, []);
  const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    "@global": {
      // You should target [class*="MuiButton-root"] instead if you nest themes.
      ".MuiAutocomplete-popper": {
        zoom: zoom / 1922 + "%"
      }
    }
  })(() => null);

  return (
    <div style={{ width: "100%" }}>
      <GlobalCss />
      <Autocomplete
        style={props.style}
        ListboxComponent={"ul"}
        freeSolo={true}
        blurOnSelect="mouse"
        autoHighlight={true}
        onInputChange={(e, v) => props.onInputChange(e, v)}
        id="combo-box-demo"
        options={props.list}
        getOptionLabel={option => option.Nom}
        renderInput={params => (
          <TextField
            {...params}
            required
            value={props.val}
            label="Nom client"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}
