import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ministries } from "../common/Constants";
import TitleTypography from "../common/TitleTypography";
import FormHelperText from "@mui/material/FormHelperText";
import RequiredField from "../common/RequiredField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const MinistryInput = ({ formik, isDisabled }) => {
  return (
    <Box sx={{ mb: 5, mt: 5, mr: 10, width: 300 }}>
      <div>
        <TitleTypography>Ministry</TitleTypography>
        <Typography sx={{ mb: 2 }} color="text.primary">
          Select the government ministry that this project belongs to.
        </Typography>
      </div>
      <FormControl sx={{ width: 250, mt: 1 }} size="small">
        <InputLabel id="ministry-label">Ministry</InputLabel>
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
      <Typography sx={{width: 700, mt: 5}}variant="subtitle2" color="text.secondary">
        * All product teams from the Ministries of Attorney General, Public Safety
        and Solicitor General and Emergency Management BC and BC Housing must
        engage with <a href="mailto:JAGMISO@gov.bc.ca">AG Security</a> prior to
        submitting a request for a new project.{" "}
      </Typography>
    </Box>
  );
};

export default MinistryInput;
