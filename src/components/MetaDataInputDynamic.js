import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { ministries } from "./common/Constants";
import { Controller, useFormContext } from "react-hook-form";

export default function MetaDataInput() {
  const [technicalLeads, setTechnicalLeads] = useState({ 0: "" });

  const addTechnicalLead = () =>
    setTechnicalLeads({ ...technicalLeads, [technicalLeadsSize]: "" });

  const removeTechnicalLead = (key) => {
    const values = Object.values(technicalLeads).filter((e, i) => i !== key);
    const newObj = Object.fromEntries(values.map((e, i) => [i, e]));
    setTechnicalLeads(newObj);
  };

  const handleTechnicalLeadsChange = (key, value) => {
    setTechnicalLeads({ ...technicalLeads, [key]: value });
  };

  const technicalLeadsSize = Object.keys(technicalLeads).length;


  const { control, errors } = useFormContext();


  return (
    <Box
      // component="form"
      sx={{
        "& .MuiTextField-root": { m: 0, mb: 3, width: "45ch" },
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
                // defaultValue=""
                {...field}
                size="medium"
                labelId="select-ministry"
                // helperText={errors.ministry ? errors.ministry?.message : ""}
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
          Technical Leads
        </Typography>
        {Object.values(technicalLeads).map((technicalLead, key) => (
          <div key={key}>
            <Controller
              name="technicalLead"
              defaultValue={""}
              control={control}
              rules={{ required: key === 0 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  helperText={
                    errors.technicalLead ? errors.technicalLead?.message : ""
                  }
                  // onChange={(event) =>
                  //   handleTechnicalLeadsChange(key, event.target.value)
                  // }
                  // required={key === 0}
                  id={"technical-lead" + key}
                  label="Email"
                />
              )}
            />

            {key === technicalLeadsSize - 1 ? (
              <IconButton
                sx={{ mt: 0, ml: 0.5 }}
                onClick={addTechnicalLead}
                aria-label="add-technical-lead"
              >
                <AddCircleIcon />
              </IconButton>
            ) : (
              <IconButton
                sx={{ mt: 0, ml: 0.5 }}
                onClick={() => removeTechnicalLead(key)}
                aria-label="add-technical-lead"
              >
                <RemoveCircleIcon />
              </IconButton>
            )}
          </div>
        ))}
      </Paper>
    </Box>
  );
}
