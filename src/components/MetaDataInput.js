import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { ministries } from "./common/Constants";
import { Controller, useFormContext } from "react-hook-form";
import UserInput from "./UserInput";
import TitleTypography from "./common/TitleTypography";

export default function MetaDataInput() {
  const { control, errors, isDisabled } = useFormContext();

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 0, mb: 3, mt: 1, width: "30ch" },
        width: "550px",
      }}
      noValidate
      autoComplete="off"
    >
      <TitleTypography>
        Project Description
      </TitleTypography>
      <Controller
        name="name"
        defaultValue={""}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            disabled={isDisabled}
            size="small"
            style={{ width: "100%" }}
            helperText={errors.name ? errors.name?.message : ""}
            id="name"
            label="Name"
          />
        )}
      />
      <Controller
        name="description"
        defaultValue={""}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            disabled={isDisabled}
            size="small"
            style={{ width: "100%" }}
            helperText={errors.description ? errors.description?.message : ""}
            id="description"
            label="Description"
            multiline
            rows={4}
          />
        )}
      />

      <div>
        <FormControl sx={{ minWidth: 250, mt: 1 }}>
          <InputLabel id="demo-simple-select-required-label">
            Ministry
          </InputLabel>
          <Controller
            name="ministry"
            defaultValue={""}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                disabled={isDisabled}
                size="medium"
                labelId="select-ministry"
                id="select-ministry"
                label="Ministry"
              >
                {ministries.map((ministryOption) => (
                  <MenuItem key={ministryOption} value={ministryOption}>
                    {ministryOption}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>
            {errors.ministry ? errors.ministry?.message : ""}
          </FormHelperText>
        </FormControl>
      </div>
      <Box sx={{ p: 0, mt: 3, mb: 3, width: "100%" }}>
        <TitleTypography>Product Owner</TitleTypography>
        <UserInput
          name="projectOwner"
          control={control}
          isDisabled={isDisabled}
        />
        <TitleTypography>Primary Technical Lead </TitleTypography>
        <UserInput
          name="primaryTechnicalLead"
          control={control}
          isDisabled={isDisabled}
        />
        <TitleTypography>Secondary Technical Lead </TitleTypography>
        <UserInput
          name="secondaryTechnicalLead"
          control={control}
          isDisabled={isDisabled}
        />
      </Box>
    </Box>
  );
}
