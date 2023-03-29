import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  defaultCpuOptionsLookup,
  defaultMemoryOptionsLookup,
  defaultStorageOptionsLookup,
} from "../common/Constants";
import TitleTypography from "../common/TitleTypography";
import Typography from "@mui/material/Typography";
import Styled from "styled-components";

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export default function QuotaInput({ nameSpace, quota }) {
  return (
    <Box sx={{ width: 340, mt: 3, mb: 5, mr: 4 }}>
      <Typography sx={{ fontSize: 19, mb: 1, fontWeight: "bold" }}>
        {nameSpace.capitalizeFirstLetter()}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ mb: 2 }} color="text.primary">
          {quota?.cpu}
        </Typography>
        <Typography sx={{ mb: 2 }} color="text.primary">
          {quota?.memory}
        </Typography>
        <Typography sx={{ mb: 2 }} color="text.primary">
          {quota?.storage}
        </Typography>
      </Box>
    </Box>
  );
}
