import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
      // onChange={(event) => {
      //   setSearch(event.target.value);
      //   refetch({ search: event.target.value });
      // }}
      onChange={(event) => {
        setSearch(event.target.value);
      }}
    />
  );
}
