import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { clusters } from "./common/Constants";

export default function ClusterInput({ formState, handleChange }) {

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 0, mb: 3, width: "45ch" },
        width: "500px",
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <FormControl required sx={{ mt: 0, mb: 2, minWidth: 250 }}>
          <InputLabel id="demo-simple-select-required-label">
            Cluster
          </InputLabel>
          <Select
            size="medium"
            labelId="select-cluster"
            id="select-cluster"
            value={formState["cluster"]}
            label="Cluster *"
            onChange={handleChange("cluster")}
          >
            {clusters.map((clusterOption) => (
              <MenuItem key={clusterOption} value={clusterOption}>
                {clusterOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Box>
  );
}
