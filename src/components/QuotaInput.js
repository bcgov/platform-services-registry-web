import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { defaultCpuOptions, defaultMemoryOptions, defaultStorageOptions } from "./common/Constants";

export default function QuotaInput({ formState, handleChange }) {

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 0, mb: 3, width: "45ch" },
        width: "50%",
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <FormControl required sx={{ mt: 0, mb: 2, minWidth: 250 }}>
          <InputLabel id="demo-simple-select-required-label">
            DefaultCpuOptions
          </InputLabel>
          <Select
            size="medium"
            labelId="select-defaultCpuOptions"
            id="select-defaultCpuOptions"
            value={formState.defaultCpuOption}
            label="DefaultCpuOptions *"
            onChange={handleChange("defaultCpuOption")}
          >
            {defaultCpuOptions.map((defaultCpuOption) => (
              <MenuItem key={defaultCpuOption} value={defaultCpuOption}>
                {defaultCpuOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl required sx={{ mt: 0, mb: 2, minWidth: 250 }}>
          <InputLabel id="demo-simple-select-required-label">
            DefaultMemoryOptions
          </InputLabel>
          <Select
            size="medium"
            labelId="select-defaultMemoryOptions"
            id="select-defaultMemoryOptions"
            value={formState.defaultMemoryOption}
            label="DefaultMemoryOptions *"
            onChange={handleChange("defaultMemoryOption")}
          >
            {defaultMemoryOptions.map((defaultMemoryOption) => (
              <MenuItem key={defaultMemoryOption} value={defaultMemoryOption}>
                {defaultMemoryOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl required sx={{ mt: 0, mb: 2, minWidth: 250 }}>
          <InputLabel id="demo-simple-select-required-label">
            DefaultStorageOptions
          </InputLabel>
          <Select
            size="medium"
            labelId="select-defaultStorageOptions"
            id="select-defaultStorageOptions"
            value={formState.defaultStorageOption}
            label="DefaultStorageOptions *"
            onChange={handleChange("defaultStorageOption")}
          >
            {defaultStorageOptions.map((defaultStorageOption) => (
              <MenuItem key={defaultStorageOption} value={defaultStorageOption}>
                {defaultStorageOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Box>
  );
}
