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
} from "./common/Constants";

export default function QuotaInput({ nameSpace }) {
  const { control, errors, isDisabled, initialValues } = useFormContext();

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 0, mb: 3 },
        minWidth: 350,
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl sx={{ mt: 1, mb: 2, minWidth: 250 }}>
        <InputLabel id="demo-simple-select-required-label">Cpu</InputLabel>
        <Controller
          name={nameSpace + "Cpu"}
          defaultValue={""}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              disabled={isDisabled}
              size="medium"
              labelId="select-defaultCpuOptions"
              id="select-defaultCpuOptions"
              label="Cpu"
            >
              {[
                ...new Set([
                  initialValues?.[nameSpace + "Cpu"],
                  ...defaultCpuOptions,
                ]),
              ].filter(Boolean).map((cpuOption) => (
                <MenuItem key={cpuOption} value={cpuOption}>
                  {cpuOption}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.cpu ? errors.cpu?.message : ""}</FormHelperText>
      </FormControl>
      <FormControl sx={{ mt: 1, mb: 2, minWidth: 250 }}>
        <Controller
          name={nameSpace + "Memory"}
          defaultValue={""}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              disabled={isDisabled}
              size="medium"
              labelId="select-defaultMemoryOptions"
              id={`select-${nameSpace}-memory`}
              label="Memory Options"
            >
              {[
                ...new Set([
                  ...defaultMemoryOptions,
                  initialValues?.[nameSpace + "Memory"],
                ]),
              ].filter(Boolean).map((defaultMemoryOption) => (
                <MenuItem key={defaultMemoryOption} value={defaultMemoryOption}>
                  {defaultMemoryOption}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>
          {errors.memory ? errors.memory?.message : ""}
        </FormHelperText>
        <InputLabel id="demo-simple-select-required-label">Memory</InputLabel>
      </FormControl>
      <FormControl sx={{ mt: 1, mb: 2, minWidth: 250 }}>
        <InputLabel id="demo-simple-select-required-label">Storage</InputLabel>
        <Controller
          name={nameSpace + "Storage"}
          defaultValue={""}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              disabled={isDisabled}
              size="medium"
              labelId="select-defaultStorageOptions"
              id="select-defaultStorageOptions"
              label="DefaultStorageOptions"
            >
              {[
                ...new Set([
                  initialValues?.[nameSpace + "Storage"],
                  ...defaultStorageOptions,
                ]),
              ].filter(Boolean).map((defaultStorageOption) => (
                <MenuItem
                  key={defaultStorageOption}
                  value={defaultStorageOption}
                >
                  {defaultStorageOption}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>
          {errors.storage ? errors.storage?.message : ""}
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
