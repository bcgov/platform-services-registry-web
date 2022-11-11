import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import SearchContext from "../context/search";

export default function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  return (
    <TextField
      sx={{ minWidth: 180, pr: 2 }}
      label="Search"
      type="search"
      size="small"
      value={searchValue}
      onChange={(event) => {
        console.log("CHANGE", event.target.value);
        setSearchValue(event.target.value);
      }}
    />
  );
}
