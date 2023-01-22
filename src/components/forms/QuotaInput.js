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
} from "../common/Constants";
import TitleTypography from "../common/TitleTypography";
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
  const cpu = formik.values[nameSpace + "Quota"]?.cpu;
  const memory = formik.values[nameSpace + "Quota"]?.memory;
  const storage = formik.values[nameSpace + "Quota"]?.storage;

  return (
    <StyledBox>
      <TitleTypography>
        {nameSpace.capitalizeFirstLetter()} Quota
      </TitleTypography>
      <FormControl size="small" sx={{ mt: 2, mb: 2, mr: 3, minWidth: 250 }}>
        <InputLabel id="demo-simple-select-required-label">Cpu</InputLabel>
        <Select
          id={nameSpace + "Quota.cpu"}
          name={nameSpace + "Quota.cpu"}
          label="Cpu"
          disabled={isDisabled}
          value={cpu}
          onChange={formik.handleChange}
          error={
            formik.touched[nameSpace + "Quota"]?.cpu &&
            Boolean(formik.errors[nameSpace + "Quota"]?.cpu)
          }
          helpertext={
            formik.touched[nameSpace + "Quota"]?.cpu &&
            formik.errors[nameSpace + "Quota"]?.cpu
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
          selectProps={{IconComponent: () => null}}
          id={nameSpace + "Quota.memory"}
          name={nameSpace + "Quota.memory"}
          label="Memory"
          disabled={isDisabled}
          value={memory}
          onChange={formik.handleChange}
          error={
            formik.touched[nameSpace + "Quota"]?.memory &&
            Boolean(formik.errors[nameSpace + "Quota"]?.memory)
          }
          helpertext={
            formik.touched[nameSpace + "Quota"]?.memory &&
            formik.errors[nameSpace + "Quota"]?.memory
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
          id={nameSpace + "Quota.storage"}
          name={nameSpace + "Quota.storage"}
          label="Storage"
          disabled={isDisabled}
          value={storage}
          onChange={formik.handleChange}
          error={
            formik.touched[nameSpace + "Quota"]?.storage &&
            Boolean(formik.errors[nameSpace + "Quota"]?.storage)
          }
          helpertext={
            formik.touched[nameSpace + "Quota"]?.storage &&
            formik.errors[nameSpace + "Quota"]?.storage
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
