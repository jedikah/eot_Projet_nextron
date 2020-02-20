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
  const [state, setState] = React.useState({
    zoom: 0,
    width: 0,
    height: 0
  });
  useEffect(() => {
    let width = 0;
    if (window.innerWidth >= 1280) width = window.innerWidth * 100;
    else width = 1280 * 100;
    setState({
      ...state,
      zoom: width
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1280) width = window.innerWidth * 100;
      else width = 1280 * 100;
      setState({
        ...state,
        zoom: width
      });
    });
  }, []);
  const GlobalCss = withStyles({
    // @global is handled by jss-plugin-global.
    "@global": {
      // You should target [class*="MuiButton-root"] instead if you nest themes.
      ".MuiAutocomplete-popper": {
        zoom: state.zoom / 1922 + "%"
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
