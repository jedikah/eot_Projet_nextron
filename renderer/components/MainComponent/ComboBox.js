/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBox(props) {
  return (
    <Autocomplete
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
          label="Nom client"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
}
