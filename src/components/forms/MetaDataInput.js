import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import TitleTypography from "../common/TitleTypography";
import RequiredField from "../common/RequiredField";
import Typography from "@mui/material/Typography";

//. : + = @ _ / - allowed
const specialChars = /[!#$%^&*()_\-\[\]{};'"\\|,<>\?]/g;

export default function MetaDataInput({ formik, isDisabled, isPublic = false, isPrivate = false }) {
  const cloudProvider = isPublic ? "Cloud Pathfinder" : isPrivate ? "Platform Services" : undefined;
  const platform = isPublic ? "Public Cloud" : isPrivate ? "Private Cloud" : undefined;
  const mail = isPublic ? "cloud.pathfinder@gov.bc.ca" : isPrivate ? "PlatformServicesTeam@gov.bc.ca" : undefined;
  const [value, setValue] = useState(formik.values.name || '')
  const [errorLengthMessage, setErrorLengthMessage] = useState('');
  const [errorSpecialCharMessage, setErrorSpecialCharMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setValue(formik.values.name)
  }, [formik.values.name])

  useEffect(() => {
    formik.setFieldValue("name", value)
  }, [value])

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { mb: 2, mt: 2 },
        mb: 4,
        mt: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ display: "flex", p: 0 }}>
        <Box sx={{ mr: 0, width: 650 }}>
          <div>
            <TitleTypography>Product Description</TitleTypography>
            {(isPublic || isPrivate) && <Typography sx={{ mb: 1 }} color="text.primary">
              If this is your first time on the <b>{platform} platform</b> you need
              to book an alignment meeting with the{" "}
              <b>{cloudProvider} Team.</b> Reach out to{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`mailto:${mail}`}
              >
                {cloudProvider}
              </a>{" "}
              to get started.
            </Typography>}
          </div>
          <TextField
            sx={{
              "& .MuiInputBase-input.Mui-disabled, .MuiInputBase-input-MuiOutlinedInput-input":
              {
                WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
              },
              "& .MuiInputLabel-root": {
                WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
              },
              "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "rgba(0, 0, 0, 0.87)",
              },
              width: "100%",
            }}
            fullWidth
            id="name"
            name="name"
            label="Name"
            required
            disabled={isDisabled}
            value={formik.values.name}
            onChange={isPrivate ? formik.handleChange : (e) => { setValue(e.target.value) }}
            error={(formik.touched.name && Boolean(formik.errors.name)) || error}
            helperText={
              (formik.touched.name && <RequiredField />) || (error && [<span>{errorLengthMessage}</span>, <span>{errorSpecialCharMessage}</span>])
            }
            size="small"
            onInput={isPrivate ? undefined : (e) => {
              if (specialChars.test(e.target.value)) {
                setError(true)
                setErrorSpecialCharMessage("Wrong input only digits and Uppercase characters are allowed")
              }
              else {
                setErrorSpecialCharMessage('')
              }
              if (e.target.value.length > 250) {
                setError(true)
                setErrorLengthMessage(`There are more than ${250} characters - code should be ${250} characters`)
              }
              else {
                setErrorLengthMessage('')
              }
              setError(e.target.value.length > 250 || specialChars.test(e.target.value))
              e.target.value = e.target.value.replace(specialChars, '')
            }}
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            disabled={isDisabled}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && <RequiredField />}
            size="small"
            sx={{
              "& .MuiInputBase-input.Mui-disabled, .MuiInputBase-input-MuiOutlinedInput-input":
              {
                WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
              },
              "& .MuiInputLabel-root": {
                WebkitTextFillColor: "rgba(0, 0, 0, 0.87)",
              },
              "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "rgba(0, 0, 0, 0.87)",
              },
              width: "100%",
            }}
            multiline
            rows={4}
          />
        </Box>
        <Box></Box>
      </Box>
    </Box>
  );
}
