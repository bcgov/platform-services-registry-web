import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import SearchContext from "../context/search";

export default function Search() {
  const { search, setSearch } = useContext(SearchContext);
  return (
    <TextField
      sx={{ minWidth: 180, pr: 2 }}
      label="Search"
      type="search"
      size="small"
      value={search}
      defaultValue={""}
      onChange={(event) => {
        setSearch(event.target.value);
      }}
    />
  );
}
