import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { ministries } from "./common/Constants";
import { Controller, useFormContext } from "react-hook-form";

export default function MetaDataInput() {
  const { control, errors, isDisabled } = useFormContext();

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 0, mb: 3, mt: 1, width: "45ch" },
        width: "550px",
      }}
      noValidate
      autoComplete="off"
    >
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
        <FormControl sx={{ mt: 0, mb: 2, minWidth: 250 }}>
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
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography sx={{ mt: 0, mb: 1, fontSize: 17 }}>
          Project Owner
        </Typography>
        <Controller
          name="projectOwner"
          defaultValue={""}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={isDisabled}
              size="small"
              helperText={
                errors.projectOwner ? errors.projectOwner?.message : ""
              }
              id="project-owner"
              label="Email"
            />
          )}
        />
        <Typography sx={{ mt: 0, mb: 1, fontSize: 17 }}>
          Primary Technical Lead
        </Typography>
        <Controller
          name="primaryTechnicalLead"
          defaultValue={""}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={isDisabled}
              size="small"
              helperText={
                errors.primaryTechnicalLead
                  ? errors.primaryTechnicalLead?.message
                  : ""
              }
              label="Email"
            />
          )}
        />
        <Typography sx={{ mt: 0, mb: 1, fontSize: 17 }}>
          Secondary Technical Lead
        </Typography>
        <Controller
          name="secondaryTechnicalLead"
          defaultValue={""}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={isDisabled}
              size="small"
              helperText={
                errors.secondaryTechnicalLead
                  ? errors.secondaryTechnicalLead?.message
                  : ""
              }
              label="Email"
            />
          )}
        />
      </Paper>
    </Box>
  );
}
