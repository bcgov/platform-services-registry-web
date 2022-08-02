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
  const { register, handleSubmit, setValue, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: formEditedState.name,
      description: formEditedState.description,
      ministry: formEditedState.ministry
    }
  });


  const handleChange = (name, value) => {

    // setFormEditedState({ ...formEditedState, [input]: event.target.value });
  };

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
          width: "50%",
        }}
        style={{ width: "50%" }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}>
          {/* <CustomController
          name={}
           rules, control, setFormEditedState
          /> */}
        <Controller
          name="name"
          control={control}
          rules={{ required: true, maxLength: 45 }}
          render={({ field }) => <TextField
            {...field}
            sx={{ mt: 4 }}
            required
            label="Name"
            size="small"
            onChange={e => {
              setValue(field.name, e.target.value);
              setFormEditedState({ ...formEditedState, [field.name]: e.target.value })
            }}
          />}
        />
        <Typography variant="body1" style={{ color: 'red', fontSize: '10px' }}>
          {errors.name?.type === 'required' && "Name is required"}
          {errors.name?.type === 'maxLength' && "too long"}
        </Typography>
        <Controller
          name="description"
          control={control}
          rules={{ maxLength: 504 }}
          render={({ field }) => <TextField
            {...field}
            sx={{ mt: 4 }}
            label="Description"
            size="small"
            style={{ width: "100%" }}
            multiline
            rows={4}
            onChange={e => {
              setValue(field.name, e.target.value);
              setFormEditedState({ ...formEditedState, [field.name]: e.target.value })
            }}
          />}
        />
        <Typography variant="body1" style={{ color: 'red', fontSize: '10px' }}>
          {errors.description?.type === 'maxLength' && "too long"}
        </Typography>
        <Controller
          name="ministry"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <FormControl sx={{ mt: 0, mt:4, mb: 2, minWidth: 250 }}>
            <InputLabel >
              Ministry
            </InputLabel>
            <Select
              size="medium"
              value={formEditedState.ministry}
              label="Ministry *"
              onChange={e => {
                setValue(field.name, e.target.value);
                setFormEditedState({ ...formEditedState, [field.name]: e.target.value })
              }}
            >
              {ministries.map((ministryOption) => (
                <MenuItem key={ministryOption} value={ministryOption}>
                  {ministryOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>}
        />
        <Typography variant="body1" style={{ color: 'red', fontSize: '10px' }}>
          {errors.ministry?.type === 'required' && "is required"}
        </Typography>
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