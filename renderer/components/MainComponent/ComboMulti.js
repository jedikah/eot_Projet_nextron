/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withStyles } from "@material-ui/core/styles";

export default function ComboMulti({
  list,
  currentIdCli,
  disabled,
  onInputChange,
  values
}) {
  const [zoom, setZoom] = React.useState(1280 * 100);
  const { remote } = require("electron");
  useEffect(() => {
    let width;
    let min = 1280;
    if (remote.getCurrentWindow().getMaximumSize()[0] >= 1920) min = 1600;
    if (window.innerWidth >= min) width = window.innerWidth * 100;
    else width = min * 100;
    setZoom(width);
    window.addEventListener("resize", () => {
      if (window.innerWidth >= min) width = window.innerWidth * 100;
      else width = min * 100;
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
  const filterTrav = () => {
    return list.filter(item => item.IdCli === currentIdCli);
  };

  return (
    <div tyle={{ width: "100%" }}>
      <GlobalCss />
      <Autocomplete
        multiple
        id="tags-outlined"
        disabled={disabled}
        options={filterTrav()}
        value={values}
        onChange={(e, v) => onInputChange(e, v)}
        getOptionLabel={option => option.TypeTrav + " du " + option.DateTrav}
        filterSelectedOptions
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label="Liste des travaux à facturer"
            placeholder="Traveau"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}
