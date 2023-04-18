import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
import {commonComponents} from "../common/Constants" ;
import Box from "@mui/material/Box";
import TitleTypography from "../common/TitleTypography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";





export default function CommonComponents({ formik, isDisabled }) {
  const [dirty, setDirty] = useState(false);


  const noServices = formik.values.commonComponents.noServices;


  const onClick = (name) => (event) => {
    if (event.target.value === formik.values.commonComponents[name]) {
      formik.setFieldValue(event.target.name, "");
    } else {
      formik.setFieldValue(event.target.name, event.target.value);
    }
  };


  useEffect(() => {
    const { noServices, ...rest } = formik.values.commonComponents;
    const values = Object.values(rest).filter((value) => value !== "");


    setDirty(values.length !== 0);
  }, [formik.values.commonComponents]);


  return (
    <Box sx={{ mt: 6, mb: 4, width: 700 }}>
      <div >
        <TitleTypography>Common Components</TitleTypography>
        <Typography sx={{ mb: 2 }} color="text.primary">
          Please indicate what services you expect to utilize as part of your
          product?
        </Typography>
      </div>
      <FormControl>
        {commonComponents.map(({ name, description }) => (
          <div key={name} style={{ marginBottom: "10px" }}>
            <Typography
              variant="body1"
              sx={{ marginTop: 0.5, fontWeight: "medium" }}
            >
              {description}
            </Typography>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              onClick={onClick(name)}
              value={formik.values.commonComponents[name]}
            >
              <FormControlLabel
                sx={{
                  "& .MuiFormControlLabel-label.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
                  }
                }}
                control={
                  <Radio
                    id={"commonComponents" + name + "IMPLEMENTED"}
                    name={"commonComponents." + name}
                    value="IMPLEMENTED"
                    disabled={isDisabled || !!noServices}
                  />
                }
                label="Implemented"
              />
              <FormControlLabel
                sx={{
                  "& .MuiFormControlLabel-label.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
                  },
                  marginLeft: "180px"
                }}
                control={
                  <Radio
                    id={"commonComponents" + name + "IMPLEMENTED"}
                    name={"commonComponents." + name}
                    value="PLANNING_TO_USE"
                    disabled={isDisabled || !!noServices}
                  />
                }
                label="Planning to use"
              />
            </RadioGroup>
          </div>
        ))}
        <div style={{ display: "flex", marginTop: 15 }}>
          <Typography
            variant="body1"
            // color={isDisabled && "rgba(0, 0, 0, 0.38)"}
            sx={{ marginTop: 0.5, fontWeight: "medium" }}
          >
            Other
          </Typography>
          <TextField
            id="other"
            name="commonComponents.other"
            label="please specify"
            onChange={formik.handleChange}
            value={formik.values.commonComponents.other}
            sx={{
              "& .MuiInputBase-input.Mui-disabled, .MuiInputBase-input-MuiOutlinedInput-input": {
                WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
              },
              "& .MuiInputLabel-root": {
                WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
              },
              "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.87)",
              },
              ml: 3, width: "80%"
            }}
            disabled={isDisabled || !!noServices}
            size="small"
          />
        </div>
        <FormControlLabel
          sx={{
            "& .MuiFormControlLabel-label.Mui-disabled": {
              WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
            },
            marginTop: 2
          }}
          control={
            <Checkbox
              id="noServices"
              name="commonComponents.noServices"
              type="checkbox"
              onChange={formik.handleChange}
              disabled={isDisabled || dirty}
              checked={Boolean(formik.values.commonComponents.noServices)}
              value={formik.values.commonComponents.noServices?.[0] === "on"}
            />
          }
          label={"The app does not use any of these services"}
        />
        {formik.errors?.commonComponents}
        <FormHelperText>{formik.errors?.commonComponents}</FormHelperText>
        <FormHelperText>
          {formik.errors?.commonComponents?.noServices}
        </FormHelperText>
      </FormControl>
      {formik.errors?.commonComponents}
    </Box>
  );
}