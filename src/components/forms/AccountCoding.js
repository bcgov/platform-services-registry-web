import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TitleTypography from "../common/TitleTypography";
import Typography from "@mui/material/Typography";
import OnInputErrorField from "./OnInputErrorField"

const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

export default function AccountCoding({ formik, isDisabled }) {
  const [value, setValue] = useState({
    accountCodingClientCode: formik.values.accountCoding?.substring(0, 3) || '',
    accountCodingRC: formik.values.accountCoding?.substring(3, 8) || '',
    accountCodingSL: formik.values.accountCoding?.substring(8, 13) || '',
    accountCodingSTOB: formik.values.accountCoding?.substring(13, 17) || '',
    accountCodingProjectCode: formik.values.accountCoding?.substring(17, 24) || '',
  })

  const handleChange = (name, val) => {
    const updatedState = { ...value, [name]: val };
    setValue(updatedState)
  }

  useEffect(() => {
    formik.values.accountCoding?.length > 23 && setValue(
      {
        accountCodingClientCode: formik.values.accountCoding?.substring(0, 3),
        accountCodingRC: formik.values.accountCoding?.substring(3, 8),
        accountCodingSL: formik.values.accountCoding?.substring(8, 13),
        accountCodingSTOB: formik.values.accountCoding?.substring(13, 17),
        accountCodingProjectCode: formik.values.accountCoding?.substring(17, 24),
      }
    )
  }, [formik.values.accountCoding])

  useEffect(() => {
    formik.setFieldValue("accountCoding", Object.values(value).toString().replace(/[,]/g, ''))
  }, [value])

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
      <Box sx={{ display: "flex", p: 0, maxWidth: "80%" }}>
        <Box sx={{ mr: 0 }}>
          <div>
            <TitleTypography>Billing (Account Coding)</TitleTypography>
            <Typography sx={{ mb: 1 }} color="text.primary">
              Please refer to the Memorandum of Understanding (MoU) signed for this project to enter the information required below. Please make sure that the information entered below matches the account coding on the MoU for this project. <b>If the account coding is changed at any point, all charges in the current quarter will be applied to the new account coding</b></Typography>
          </div>
          <Box sx={{ display: "flex", justifyContent: 'space-between', p: 0 }}>
            <Box sx={{ width: '48%' }}>
              <OnInputErrorField
                formik={formik}
                isDisabled={isDisabled}
                placeholder="Enter the client code here (e.g. 111)"
                title="Client Code"
                length={3}
                id="accountCodingClientCode"
                handleChange={handleChange}
                value={value.accountCodingClientCode}
                specialChars={specialChars}
              />
              <OnInputErrorField
                formik={formik}
                isDisabled={isDisabled}
                placeholder="Enter the service line here (e.g. 33333)"
                title="Service Line (SL)"
                length={5}
                handleChange={handleChange}
                value={value.accountCodingSL}
                id="accountCodingSL"
                specialChars={specialChars}
              />
              <OnInputErrorField
                formik={formik}
                isDisabled={isDisabled}
                placeholder="Enter the project code here (e.g. 9999999)"
                title="Project Code"
                length={7}
                handleChange={handleChange}
                value={value.accountCodingProjectCode}
                id="accountCodingProjectCode"
                specialChars={specialChars}
              />
            </Box>
            <Box sx={{ width: '48%' }}>
              <OnInputErrorField
                formik={formik}
                isDisabled={isDisabled}
                placeholder="Enter the responsibility centre here (e.g. 22222)"
                title="Responsibility Centre (RC)"
                length={5}
                handleChange={handleChange}
                value={value.accountCodingRC}
                id="accountCodingRC"
                specialChars={specialChars}
              />
              <OnInputErrorField
                formik={formik}
                isDisabled={isDisabled}
                placeholder="Enter the STOB here (e.g. 4444)"
                title="Standard Object of Expense (STOB)"
                length={4}
                handleChange={handleChange}
                value={value.accountCodingSTOB}
                id="accountCodingSTOB"
                specialChars={specialChars}
              />
            </Box>
          </Box>
          <TextField
            id="accountCoding"
            name="accountCoding"
            label="Account Coding"
            disabled={true}
            value={formik.values.accountCoding.replace(/\s/g, '').replace(/(.{3})(.{5})(.{5})(.{4})(.{7})/g, "$1 $2 $3 $4 $5")}
            onChange={formik.handleChange}
            required
            placeholder="Value populated from Client Code+Responsibility Centre (RC)+Service Line (SL)+Standard Object of Expense (STOB)+Project Code"
            size="small"
          />
        </Box>
      </Box>
    </Box>
  );
}
