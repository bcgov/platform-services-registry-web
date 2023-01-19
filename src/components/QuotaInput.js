import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext } from "react-hook-form";
import {
  defaultCpuOptions,
  defaultMemoryOptions,
  defaultStorageOptions,
  defaultCpuOptionsLookup,
  defaultMemoryOptionsLookup,
  defaultStorageOptionsLookup
} from "./common/Constants";
import TitleTypography from "./common/TitleTypography";
import Styled from "styled-components";

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const StyledBox = Styled(Box)`
  display: "flex";
  flexDirection: "column";
  width: 280;
`;

export default function QuotaInput({ nameSpace, formik, isDisabled }) {
  const cpu = formik.values[nameSpace + "QuotaSelected"]?.cpu;
  const memory = formik.values[nameSpace + "QuotaSelected"]?.memory;
  const storage = formik.values[nameSpace + "QuotaSelected"]?.storage;

  return (
    <StyledBox>
      <TitleTypography>
        {nameSpace.capitalizeFirstLetter()} Quota
      </TitleTypography>
      <FormControl size="small" sx={{ mt: 2, mb: 2, mr: 3, minWidth: 250 }}>
        <InputLabel id="demo-simple-select-required-label">Cpu</InputLabel>
        <Select
          id={nameSpace + "QuotaSelected.cpu"}
          name={nameSpace + "QuotaSelected.cpu"}
          label="Cpu"
          disabled={isDisabled}
          value={cpu}
          onChange={formik.handleChange}
          error={
            formik.touched[nameSpace + "QuotaSelected"]?.cpu &&
            Boolean(formik.errors[nameSpace + "QuotaSelected"]?.cpu)
          }
          helpertext={
            formik.touched[nameSpace + "QuotaSelected"]?.cpu &&
            formik.errors[nameSpace + "QuotaSelected"]?.cpu
          }
        >
          {Object.entries(defaultCpuOptionsLookup).map((cpuOption) => (
            <MenuItem key={cpuOption[1]} value={cpuOption[0]}>
              {cpuOption[1]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ mt: 2, mb: 2, mr: 3, minWidth: 250 }}>
        <InputLabel id="demo-simple-select-required-label">Memory</InputLabel>
        <Select
          id={nameSpace + "QuotaSelected.memory"}
          name={nameSpace + "QuotaSelected.memory"}
          label="Memory"
          disabled={isDisabled}
          value={memory}
          onChange={formik.handleChange}
          error={
            formik.touched[nameSpace + "QuotaSelected"]?.memory &&
            Boolean(formik.errors[nameSpace + "QuotaSelected"]?.memory)
          }
          helpertext={
            formik.touched[nameSpace + "QuotaSelected"]?.memory &&
            formik.errors[nameSpace + "QuotaSelected"]?.memory
          }
        >
          {Object.entries(defaultMemoryOptionsLookup).map((memoryOption) => (
            <MenuItem key={memoryOption[1]} value={memoryOption[0]}>
              {memoryOption[1]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ mt: 2, mb: 2, mr: 3, minWidth: 250 }}>
        <InputLabel id="demo-simple-select-required-label">Storage</InputLabel>
        <Select
          id={nameSpace + "QuotaSelected.storage"}
          name={nameSpace + "QuotaSelected.storage"}
          label="Storage"
          disabled={isDisabled}
          value={storage}
          onChange={formik.handleChange}
          error={
            formik.touched[nameSpace + "QuotaSelected"]?.storage &&
            Boolean(formik.errors[nameSpace + "QuotaSelected"]?.storage)
          }
          helpertext={
            formik.touched[nameSpace + "QuotaSelected"]?.storage &&
            formik.errors[nameSpace + "QuotaSelected"]?.storage
          }
        >
          {Object.entries(defaultStorageOptionsLookup).map((storageOption) => (
            <MenuItem key={storageOption[1]} value={storageOption[0]}>
              {storageOption[1]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </StyledBox>
  );
}
