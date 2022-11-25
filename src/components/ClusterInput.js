import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { clusters } from "./common/Constants";
import { Controller, useFormContext } from "react-hook-form";
import TitleTypography from "./common/TitleTypography";

export default function ClusterInput() {
  const { control, errors, isDisabled } = useFormContext();
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 0, mb: 3, width: 250 }
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TitleTypography>Cluster</TitleTypography>

        <FormControl sx={{ mt: 0, mb: 2, minWidth: 250 }}>
          <InputLabel id="demo-simple-select-required-label">
            Cluster
          </InputLabel>
          <Controller
            name="cluster"
            defaultValue={""}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                disabled={isDisabled}
                size="medium"
                labelId="select-cluster"
                id="select-cluster"
                label="Cluster"
              >
                {clusters.map((clusterOption) => (
                  <MenuItem key={clusterOption} value={clusterOption}>
                    {clusterOption}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>
            {errors.cluster ? errors.cluster?.message : ""}
          </FormHelperText>
        </FormControl>
      </div>
    </Box>
  );
}
