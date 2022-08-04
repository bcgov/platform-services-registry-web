import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import NavToolbar from "../components/NavToolbar";
import CustomController from "../components/common/Controller";
import Input from '@mui/material/Input';

import { ministries, clusters, defaultCpuOptions, defaultMemoryOptions, defaultStorageOptions } from "../components/common/Constants";

const mockData = {
  name: 'the best ever',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ministry: 'BCPC',
  projectOwner: 'projectOwner@email.com',
  technicalLeads: [
    {
      technicalLead: 'technicalLead1@email.com',
      key: 0,
    }, {
      technicalLead: 'technicalLead2@email.com',
      key: 1,
    },
    {
      technicalLead: 'technicalLead3@email.com',
      key: 2,
    },
  ],
  cluster: 'SILVER',
  defaultCpuOption: 'CPU_REQUEST_0_5_LIMIT_1_5',
  defaultMemoryOption: 'MEMORY_REQUEST_2_LIMIT_4',
  defaultStorageOption: 'STORAGE_1'
}

export default function EditProject() {
  const [technicalLeads, setTechnicalLeads] = useState(mockData.technicalLeads);
  const [submitButtonState, setSubmitButtonState] = useState(false);


  const initialState = {
    name: mockData.name,
    description: mockData.description,
    projectOwner: mockData.projectOwner,
    ministry: mockData.ministry,
    technicalLeads: mockData.technicalLeads,
    cluster: mockData.cluster,
    defaultCpuOption: mockData.defaultCpuOption,
    defaultMemoryOption: mockData.defaultMemoryOption,
    defaultStorageOption: mockData.defaultStorageOption,
  }
  const [formEditedState, setFormEditedState] = useState({
    name: mockData.name,
    description: mockData.description,
    projectOwner: mockData.projectOwner,
    ministry: mockData.ministry,
    technicalLeads: mockData.technicalLeads,
    cluster: mockData.cluster,
    defaultCpuOption: mockData.defaultCpuOption,
    defaultMemoryOption: mockData.defaultMemoryOption,
    defaultStorageOption: mockData.defaultStorageOption,
  });
  const { clearErrors, handleSubmit, setValue, control, setError, formState: { errors } } = useForm({
    defaultValues: {
      name: formEditedState.name,
      description: formEditedState.description,
      ministry: formEditedState.ministry
    }
  });


  useEffect(() => {
    setSubmitButtonState(
      formEditedState.cluster !== initialState.cluster
      || formEditedState.defaultCpuOption !== initialState.defaultCpuOption
      || formEditedState.defaultMemoryOption !== initialState.defaultMemoryOption
      || formEditedState.defaultStorageOption !== initialState.defaultStorageOption
      || formEditedState.description !== initialState.description
      || formEditedState.ministry !== initialState.ministry
      || formEditedState.name !== initialState.name
      || formEditedState.projectOwner !== initialState.projectOwner
    )
  }, [formEditedState.cluster,
  formEditedState.defaultCpuOption,
  formEditedState.defaultMemoryOption,
  formEditedState.defaultStorageOption,
  formEditedState.description,
  formEditedState.ministry,
  formEditedState.name,
  formEditedState.projectOwner,
  ])

  const addTechnicalLead = () =>
    setTechnicalLeads(technicalLeads => [...technicalLeads, [{
      technicalLead: '',
      key: technicalLeads.length + 1,
    }]])

  const removeTechnicalLead = (key) =>
    setTechnicalLeads(technicalLeads => technicalLeads.filter(technicalLead => {
      return technicalLead.key !== key
    }))

  const handleTechnicalLeadsChange = (key, value) => {
    setTechnicalLeads({ ...technicalLeads, [key]: value });
  };
  const handleChange = () => {

  }

  const onSubmit = () => {
    console.log(formEditedState)
  }

  return (
    <div>
      <NavToolbar title={"Edit Project"} />
      <form
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 0, mb: 3, width: "45ch" },
          width: "50%"
        }}
        style={{ width: "50%" }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}>
        <CustomController
          name={'name'}
          errors={errors}
          setError={setError}
          control={control}
          setFormEditedState={setFormEditedState}
          formEditedState={formEditedState}
          setValue={setValue}
          maxLength={40}
          check={(str) => {
            str.match(/^[a-zA-Z][a-zA-Z0-9. ,$;]*$/gi) === null ? setError("namepattern", { type: "pattern", message: 'Must be alphanumetic starting with a letter', pattern: /^[a-zA-Z][a-zA-Z0-9. ,$;]*$/gi }) :
              clearErrors("namepattern")
            str.length === 0 ? setError("namerequired", { type: "required", required: true, message: 'Name is required' }, {}) :
              clearErrors("namerequired")
            str.length > 40 ? setError("namemaxLength", { type: "maxLength", maxLength: 40, message: 'Max 40 characters' }) :
              clearErrors("namemaxLength")
          }}
        />
        <CustomController
          name={'description'}
          errors={errors}
          setError={setError}
          control={control}
          setFormEditedState={setFormEditedState}
          formEditedState={formEditedState}
          setValue={setValue}
          maxLength={40}
          multiline={true}
          rows={4}
          check={(str) => {
            str.length === 0 ? setError("descriptionrequired", { type: "required", required: true, message: 'Description is required' }, {}) :
              clearErrors("descriptionrequired")
            str.length > 40 ? setError("descriptionmaxLength", { type: "maxLength", maxLength: 512, message: 'Max 512 characters' }) :
              clearErrors("descriptionmaxLength")
          }}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => <TextField
            {...field}
            sx={{ mt: 4 }}
            label="Description"
            size="small"
            style={{ width: "100%" }}
            multiline
            rows={4}
            error={!!errors.maxLength}
            helperText={(errors.required && "Name is required") || (errors.maxLength && "No more than 500 characters")}
            onChange={e => {
              e.target.value.length === 0 ? setError("required", { type: "required" }, { required: true }) :
                clearErrors("required")
              e.target.value.length > 500 ? setError("maxLength", { type: "maxLength" }, { maxLength: 500 }) :
                clearErrors("maxLength")
              setValue(field.name, e.target.value);
              setFormEditedState({ ...formEditedState, [field.name]: e.target.value })
            }}
          />}
        />
        <FormControl sx={{ mt: 0, mt: 4, mb: 2, minWidth: 250 }}>
          <InputLabel >
            Ministry *
          </InputLabel>
          <Controller
            name="ministry"
            control={control}
            render={({ field }) => <Select
              size="medium"
              value={formEditedState.ministry}
              label="Ministry *"
              error={!!errors.required}
              onChange={e => {
                e.target.value.length === 0 ? setError("required", { type: "required" }, { required: true }) :
                  clearErrors("required")
                setValue(field.name, e.target.value);
                setFormEditedState({ ...formEditedState, [field.name]: e.target.value })
              }}
            >
              {ministries.map((ministryOption) => (
                <MenuItem key={ministryOption} value={ministryOption}>
                  {ministryOption}
                </MenuItem>
              ))}
            </Select>}
          />
        </FormControl>
        <Paper sx={{ p: 2, mb: 4 }} >
          <Typography sx={{ mt: 0, mb: 1, fontSize: 17 }} >
            Project Owner
          </Typography>
          <TextField
            size="small"
            value={formEditedState.projectOwner}
            onChange={handleChange("projectOwner")}
            required
            id="project-owner"
            label="Email"
          />
          <Typography sx={{ mt: 0, mb: 1, fontSize: 17 }}>
            Technical Leads
          </Typography>
          {technicalLeads.map(({ technicalLead, key }, index) => (
            <div key={index}>
              <TextField
                size="small" ß
                value={technicalLead}
                onChange={(event) =>
                  handleTechnicalLeadsChange(index, event.target.value)
                }
                required={index === 0}
                id={"technical-lead" + index}
                label="Email"
              />
              {index === technicalLeads.length - 1 ? (
                <IconButton
                  sx={{ mt: 0, ml: 0.5 }}
                  onClick={addTechnicalLead}
                  aria-label="add-technical-lead"
                >
                  <AddCircleIcon />
                </IconButton>
              ) : (technicalLeads.length > 1 && <IconButton
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
        <div>
          <FormControl required sx={{ mt: 0, mb: 2, minWidth: 250 }}>
            <InputLabel id="demo-simple-select-required-label">
              Cluster
            </InputLabel>
            <Select
              size="medium"
              labelId="select-cluster"
              id="select-cluster"
              value={formEditedState.cluster}
              label="Cluster *"
              onChange={handleChange("cluster")}
            >
              {clusters.map((clusterOption) => (
                <MenuItem key={clusterOption} value={clusterOption}>
                  {clusterOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl required sx={{ mt: 0, mb: 2, minWidth: 250 }}>
            <InputLabel id="demo-simple-select-required-label">
              DefaultCpuOptions
            </InputLabel>
            <Select
              size="medium"
              labelId="select-defaultCpuOptions"
              id="select-defaultCpuOptions"
              value={formEditedState.defaultCpuOption}
              label="DefaultCpuOptions *"
              onChange={handleChange("defaultCpuOption")}
            >
              {defaultCpuOptions.map((defaultCpuOption) => (
                <MenuItem key={defaultCpuOption} value={defaultCpuOption}>
                  {defaultCpuOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl required sx={{ mt: 0, mb: 2, minWidth: 250 }}>
            <InputLabel id="demo-simple-select-required-label">
              DefaultMemoryOptions
            </InputLabel>
            <Select
              size="medium"
              labelId="select-defaultMemoryOptions"
              id="select-defaultMemoryOptions"
              value={formEditedState.defaultMemoryOption}
              label="DefaultMemoryOptions *"
              onChange={handleChange("defaultMemoryOption")}
            >
              {defaultMemoryOptions.map((defaultMemoryOption) => (
                <MenuItem key={defaultMemoryOption} value={defaultMemoryOption}>
                  {defaultMemoryOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl required sx={{ mt: 0, mb: 2, minWidth: 250 }}>
            <InputLabel id="demo-simple-select-required-label">
              DefaultStorageOptions
            </InputLabel>
            <Select
              size="medium"
              labelId="select-defaultStorageOptions"
              id="select-defaultStorageOptions"
              value={formEditedState.defaultStorageOption}
              label="DefaultStorageOptions *"
              onChange={handleChange("defaultStorageOption")}
            >
              {defaultStorageOptions.map((defaultStorageOption) => (
                <MenuItem key={defaultStorageOption} value={defaultStorageOption}>
                  {defaultStorageOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Input
          type="submit"
          disabled={!submitButtonState}
        />
      </form>
    </div>
  );
}