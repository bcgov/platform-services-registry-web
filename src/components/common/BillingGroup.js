import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TitleTypography from "../common/TitleTypography";
import RequiredField from "../common/RequiredField";
import Typography from "@mui/material/Typography";

export default function BillingGroup({ formik, isDisabled }) {
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { mb: 2, mt: 2 },
        mb: 4,
        mt: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end"
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ display: "flex", p: 0 }}>
        <Box sx={{ mr: 0, width: 650 }}>
          <div>
            <TitleTypography>Product Description</TitleTypography>
            <Typography sx={{ mb: 1 }} color="text.primary">
              Please provide a biling group for this project. If you do not
              provide a billing group, one will be created for you.
            </Typography>
          </div>
          <TextField
            id="billingGroup"
            name="billingGroup"
            label="Billing Group"
            disabled={isDisabled}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.name && <RequiredField />}
            size="small"
            sx={{
              "& .MuiInputBase-input.Mui-disabled, .MuiInputBase-input-MuiOutlinedInput-input":
                {
                  WebkitTextFillColor: "rgba(0, 0, 0, 0.87)"
                },
              "& .MuiInputLabel-root": {
                WebkitTextFillColor: "rgba(0, 0, 0, 0.87)"
              },
              "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "rgba(0, 0, 0, 0.87)"
                },
              width: "100%"
            }}
            multiline
            rows={4}
          />
        </Box>
      </Box>
    </Box>
  );
}
