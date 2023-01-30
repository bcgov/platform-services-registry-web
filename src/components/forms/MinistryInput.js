import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ministries } from "../common/Constants";
import TitleTypography from "../common/TitleTypography";
import FormHelperText from "@mui/material/FormHelperText";
import RequiredField from "../common/RequiredField";

const MinistryInput = ({ formik, isDisabled }) => {
  return (
    <div>
      <TitleTypography>Ministry</TitleTypography>
      <FormControl size="small" sx={{ minWidth: 250, mt: 2, mr: 3 }}>
        <InputLabel id="demo-simple-select-required-label">Ministry</InputLabel>

        <Select
          id="select-ministry"
          name="ministry"
          label="Ministry"
          labelId="select-ministry"
          disabled={isDisabled}
          value={formik.values.ministry}
          onChange={formik.handleChange}
          error={formik.touched.ministry && Boolean(formik.errors.ministry)}
        >
          {ministries.map((ministryOption) => (
            <MenuItem key={ministryOption} value={ministryOption}>
              {ministryOption}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {formik.touched.ministry && <RequiredField />}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default MinistryInput;
