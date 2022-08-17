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
import { ministries } from "./common/Constants";

export default function MetaDataInput({ formState, handleChange }) {
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

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 0, mb: 3, width: "45ch" },
        width: "500px",
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          size="small"
          style={{ width: "100%" }}
          value={formState["name"]}
          required
          id="name"
          onChange={handleChange("name")}
          label="Name"
        />
      </div>
      <div>
        <TextField
          size="small"
          style={{ width: "100%" }}
          value={formState["description"]}
          id="description"
          onChange={handleChange("description")}
          label="Description"
          multiline
          rows={4}
        />
      </div>
      <div>
        <FormControl required sx={{ mt: 0, mb: 2, minWidth: 250 }}>
          <InputLabel id="demo-simple-select-required-label">
            Ministry
          </InputLabel>
          <Select
            size="medium"
            labelId="select-ministry"
            id="select-ministry"
            value={formState["ministry"]}
            label="Ministry *"
            onChange={handleChange("ministry")}
          >
            {ministries.map((ministryOption) => (
              <MenuItem key={ministryOption} value={ministryOption}>
                {ministryOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography sx={{ mt: 0, mb: 1, fontSize: 17}} >
          Project Owner
        </Typography>
        <TextField
          size="small"
          value={formState["projectOwner"]}
          onChange={handleChange("projectOwner")}
          required
          id="project-owner"
          label="Email"
        />
        <Typography sx={{ mt: 0, mb: 1, fontSize: 17 }}>
          Technical Leads
        </Typography>
        {Object.values(technicalLeads).map((technicalLead, key) => (
          <div key={key}>
            <TextField
              size="small"ß
              value={technicalLead}
              onChange={(event) =>
                handleTechnicalLeadsChange(key, event.target.value)
              }
              required={key === 0}
              id={"technical-lead" + key}
              label="Email"
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
