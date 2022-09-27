import React, { useState } from "react";
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
import UserInput from "./UserInput";
import { useQuery, useMutation, gql } from "@apollo/client";
import Container from "@mui/material/Container";

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
            style={{ width: "100%", height:59 }}
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
            style={{ width: "100%", height: 155 }}
            helperText={errors.description ? errors.description?.message : ""}
            id="description"
            label="Description"
            multiline
            rows={4}
          />
        )}
      />

      <div>
        <FormControl sx={{ mt: 0, mb: 1, minWidth: 250, height: 120 }}>
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
      <Box sx={{ p: 0, mb: 3, width: "100%" }}>
        <Typography variant="body1" sx={{ mt: 0, mb: 1}}>
          Project Owner
        </Typography>
        <UserInput
          name="projectOwner"
          control={control}
          isDisabled={isDisabled}
        />
        <Typography variant="body1" sx={{ mt: 0, mb: 1}}>
          Primary Technical Lead
        </Typography>
        <UserInput
          name="primaryTechnicalLead"
          control={control}
          isDisabled={isDisabled}
        />
        <Typography variant="body1" sx={{ mt: 0, mb: 1}}>
          Secondary Technical Lead
        </Typography>
        <UserInput
          name="secondaryTechnicalLead"
          control={control}
          isDisabled={isDisabled}
        />
      </Box>
    </Box>
  );
}
