/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboMulti({
  list,
  currentIdCli,
  disabled,
  onInputChange,
  values
}) {
  const filterTrav = () => {
    return list.filter(item => item.IdCli === currentIdCli);
  };

  return (
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
  );
}
