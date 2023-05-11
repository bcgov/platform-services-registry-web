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
            <TitleTypography>Billing Group</TitleTypography>
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
            value={formik.values.billingGroup}
            onChange={formik.handleChange}
            error={
              formik.touched.billingGroup && Boolean(formik.errors.billingGroup)
            }
            helperText={formik.touched.nambillingGroupe && <RequiredField />}
            size="small"
          />
        </Box>
      </Box>
    </Box>
  );
}
