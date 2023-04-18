import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ministriesNames, checkBoxMinistries } from "../common/Constants";
import TitleTypography from "../common/TitleTypography";
import FormHelperText from "@mui/material/FormHelperText";
import RequiredField from "../common/RequiredField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const MinistryInput = ({ formik, setAGministries }) => {
  const [AGministry, setAGministry] = useState(false)

  useEffect(() => {
    setAGministries(checkBoxMinistries.indexOf(formik.values.ministry) !== -1?!AGministry:false)
    
  })

  useEffect(() => {
    setAGministries(checkBoxMinistries.indexOf(formik.values.ministry) !== -1 ? !AGministry : false)
 
  }, [AGministry, formik.values.ministry, setAGministries])
  
  const handleChangeCheckBox = (event) => {
    setAGministry(event.target.checked)
  }
 
  return (
    <Box sx={{ mb: 5, mt: 5, mr: 10, width: 300 }}>
      <div>
        <TitleTypography>Ministry</TitleTypography>
        <Typography sx={{ mb: 2 }} color="text.primary">
          Select the government ministry that this product belongs to.
        </Typography>
      </div>
      <FormControl sx={{
        "& .MuiInputBase-input.Mui-disabled, .MuiInputBase-input-MuiOutlinedInput-input": {
          WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
        },
        "& .MuiInputLabel-root": {
          WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
        },
        "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(0, 0, 0, 0.87)",
        },
        width: 250, mt: 1
      }} size="small">
        <InputLabel id="ministry-label">Ministry</InputLabel>
        <Select
          id="select-ministry"
          name="ministry"
          label="Ministry"
          labelId="select-ministry"
          disabled={false}
          value={formik.values.ministry}
          onChange={formik.handleChange}
          error={formik.touched.ministry && Boolean(formik.errors.ministry)}
        >
          {ministriesNames.map((ministryOption) => (
            <MenuItem key={ministryOption} value={ministryOption.name}>
              {ministryOption.humanFriendlyName} ({ministryOption.name})
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {formik.touched.ministry && <RequiredField />}
        </FormHelperText>
        {
          checkBoxMinistries.indexOf(formik.values.ministry) !== -1 &&
          <FormControlLabel
            style={{
              minWidth: '700px',
            }}
            control={
              <Checkbox
                id="ministryAG"
                name="ministryAGname"
                type="checkbox"
                checked={checkBoxMinistries.indexOf(formik.values.ministry) !== -1 ? AGministry : true}
                onChange={handleChangeCheckBox}
                style={{
                  color: `${!AGministry?'red':'#003366'}`,
                }}
              />
            }
            label={
              <Typography sx={{ width: 700, mt: 1 }} variant="subtitle2" color="text.secondary">
                I confirm that I have contacted the AG Security and received their approval for provisioning the namespaces in Private Cloud Openshift plaform.
              </Typography>
            }
          />}
      </FormControl>
      <Typography sx={{ width: 700, mt: 1 }} variant="subtitle2" color="text.secondary">
        * All product teams from the Ministries of Attorney General, Public Safety
        and Solicitor General and Emergency Management BC and BC Housing must
        engage with <a href="mailto:JAGMISO@gov.bc.ca">AG Security</a> prior to
        submitting a request for a new product.{" "}
      </Typography>
    </Box>
  );
};

export default MinistryInput;
