import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { ministries } from "../common/Constants";
import UserInput from "./UserInput";
import TitleTypography from "../common/TitleTypography";
import { useLocation } from "react-router-dom";

export default function MetaDataInput({ formik, isDisabled }) {
  const { pathname } = useLocation();

  const defaultEditOpen = pathname.includes("create");

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 0, mb: 3, mt: 1, width: "30ch" },
        width: "550px",
      }}
      noValidate
      autoComplete="off"
    >
      <TitleTypography>Project Description</TitleTypography>

      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        disabled={isDisabled}
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helpertext={formik.touched.name && formik.errors.name}
        size="small"
      />

      <TextField
        fullWidth
        id="description"
        name="description"
        label="Description"
        disabled={isDisabled}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helpertext={formik.touched.email && formik.errors.email}
        size="small"
        style={{ width: "100%" }}
        multiline
        rows={4}
      />

     
      <UserInput
        label={"Product Owner"}
        contact="projectOwner"
        formik={formik}
        isDisabled={isDisabled}
        defaultEditOpen={defaultEditOpen}
      />
      <UserInput
        label={"Primary Technical Lead"}
        contact="primaryTechnicalLead"
        formik={formik}
        isDisabled={isDisabled}
        defaultEditOpen={defaultEditOpen}
      />

      <UserInput
        label={"Secondary Technical Lead"}
        contact="secondaryTechnicalLead"
        formik={formik}
        isDisabled={isDisabled}
        defaultEditOpen={defaultEditOpen}
      />
    </Box>
  );
}
