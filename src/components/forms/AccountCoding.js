import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TitleTypography from "../common/TitleTypography";
import RequiredField from "../common/RequiredField";
import Typography from "@mui/material/Typography";

export default function AccountCoding({ formik, isDisabled }) {
  const [errorLengthMessage, setErrorLengthMessage] = useState('');
  const [errorSpecialCharMessage, setErrorSpecialCharMessage] = useState('');
  const [error, setError] = useState(false);

  const hasSpecialCharacters = (str) => {
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return specialChars.test(str);
  }

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { mb: 2, mt: 2, minWidth: "100%", },
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
            <TitleTypography>Please enter the account coding for this project</TitleTypography>
            <Typography sx={{ mb: 1 }} color="text.primary">
              Account Coding
            </Typography>
          </div>
          <TextField
            id="accountCoding"
            name="accountCoding"
            label="Account Coding"
            disabled={isDisabled}
            value={formik.values.accountCoding?.toUpperCase()
              .replace(/[^A-Z0-9]/g, '')
              .replace(/\s/g, '')
              .replace(/(.{3})(.{5})(.{5})(.{4})(.{7})/g, "$1 $2 $3 $4 $5")}
            onChange={formik.handleChange}
            required
            placeholder="Enter account coding here (e.g. 000 22222 99898 6666 9898989)"
            error={
              (formik.touched.accountCoding && Boolean(formik.errors.accountCoding)) || error
            }
            helperText={
              (formik.touched.accountCoding && <RequiredField />) || (error && [<p>{errorLengthMessage}</p>, <p>{errorSpecialCharMessage}</p>])
            }
            size="small"
            onInput={(e) => {
              if (hasSpecialCharacters(e.target.value)) {
                setErrorSpecialCharMessage("Wrong input only digits and Uppercase characters are allowed")
              }
              else if (e.target.value.length !== 24) {
                if (e.target.value.length < 24) {
                  setErrorLengthMessage(`There are ${e.target.value.replace(/\s/g, '').length} characters - code should be 24 characters`)
                  setError(true)
                }
                if (e.target.value.length > 24) {
                  setErrorLengthMessage(`There are more than 24 characters - code should be 24 characters`)
                }
              }
              else {
                setError(false)
                setErrorLengthMessage('')
                setErrorSpecialCharMessage('')
              }
              e.target.value = e.target.value.replace(/[@#$%^&*()_+[\]{}|\\,.?:;'"!<>~`\-=/\s]/g, '').toUpperCase().substring(0, 24)
            }}
          />
          <Typography sx={{ mb: 1 }} color="text.primary">
            Please make sure that the account coding entered above matches the account coding on the MoU for this project.                      If the account coding is changed at any point, all charges in the current quarter will be applied to the new account coding            </Typography>
        </Box>
      </Box>
    </Box>
  );
}
