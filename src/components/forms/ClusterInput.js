import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { clusterNames } from "../common/Constants";
import TitleTypography from "../common/TitleTypography";
import FormHelperText from "@mui/material/FormHelperText";
import RequiredField from "../common/RequiredField";

export default function ClusterInput({ formik, isDisabled }) {
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 0, mb: 3, width: 250 },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TitleTypography>Cluster</TitleTypography>
        <FormControl size="small" sx={{ mt: 2, mb: 2, minWidth: 250 }}>
          <InputLabel id="demo-simple-select-required-label">
            Cluster
          </InputLabel>
          <Select
            id="cluster"
            name="cluster"
            value={formik.values.cluster}
            onChange={formik.handleChange}
            error={formik.touched.cluster && Boolean(formik.errors.cluster)}
            helpertext={formik.touched.cluster && formik.errors.cluster}
            disabled={isDisabled}
            labelId="select-cluster"
            label="Cluster"
          >
            {clusterNames.map((clusterOption) => (
              <MenuItem key={clusterOption.id} value={clusterOption.name}>
                {clusterOption.humanFriendlyName}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {formik.touched.cluster && <RequiredField />}
          </FormHelperText>
        </FormControl>
      </div>
    </Box>
  );
}
