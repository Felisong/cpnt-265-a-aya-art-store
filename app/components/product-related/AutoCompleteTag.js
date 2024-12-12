import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function AutocompleteTag(tags) {
  return (
    <Autocomplete
      disablePortal
      options={tags}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Tags" />}
    />
  );
}
