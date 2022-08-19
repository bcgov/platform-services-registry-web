import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import CustomController from "../components/common/CustomController";
import Input from '@mui/material/Input';

import { ministries, clusters, defaultCpuOptions, defaultMemoryOptions, defaultStorageOptions } from "../components/common/Constants";

const mockData = {
  name: 'the best ever',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ministry: 'BCPC',
  projectOwner: 'projectOwner@email.com',
  technicalLeads: [
    {
      email: 'technicalLead1@email.com',
      id: 0,
    },
    {
      email: 'technicalLead221@email.com',
      id: 1,
    },
  ],
  cluster: 'SILVER',
  defaultCpuOption: 'CPU_REQUEST_0_5_LIMIT_1_5',
  defaultMemoryOption: 'MEMORY_REQUEST_2_LIMIT_4',
  defaultStorageOption: 'STORAGE_1'
}

export default function EditProject() {
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

  const [technicalLeads, setTechnicalLeads] = useState(mockData.technicalLeads);
  const [projectName, setProjectName] = useState(mockData.name);
  const [description, setDescription] = useState(mockData.description)
  const [projectOwner, setProjectOwner] = useState(mockData.projectOwner)
  const [ministry, setMinistry] = useState(mockData.ministry)
  const [cluster, setCluster] = useState(mockData.cluster)
  const [defaultCpuOption, setDefaultCpuOption] = useState(mockData.defaultCpuOption)
  const [defaultMemoryOption, setDefaultMemoryOption] = useState(mockData.defaultMemoryOption)
  const [defaultStorageOption, setDefaultStorageOption] = useState(mockData.defaultStorageOption)
  const [submitButtonState, setSubmitButtonState] = useState(false);

  const { clearErrors, handleSubmit, setValue, control, setError, formState: { errors } } = useForm({
    defaultValues: {
      name: initialState.name,
      description: initialState.description,
      projectOwner: initialState.projectOwner,
      techleadPrimary: initialState.technicalLeads[0].email,
      techleadSecondary: initialState.technicalLeads[1] ? initialState.technicalLeads[1].email : '',
    }
  });

  useEffect(() => {
    setSubmitButtonState(
      cluster !== initialState.cluster
      || defaultCpuOption !== initialState.defaultCpuOption
      || defaultMemoryOption !== initialState.defaultMemoryOption
      || defaultStorageOption !== initialState.defaultStorageOption
      || description !== initialState.description
      || ministry !== initialState.ministry
      || projectName !== initialState.name
      || projectOwner !== initialState.projectOwner
    )
  }, [cluster,
    defaultCpuOption,
    defaultMemoryOption,
    defaultStorageOption,
    description,
    ministry,
    projectName,
    projectOwner,
  ])

  const addTechnicalLead = () =>
    setTechnicalLeads(technicalLeads => [...technicalLeads, [{
      technicalLead: '',
      key: technicalLeads.length + 1,
    }]])

  const removeTechnicalLead = (key) =>
    setTechnicalLeads(technicalLeads => technicalLeads.filter(technicalLead => {
      return technicalLead.id !== key
    }))

  const handleTechnicalLeads = (key, value) => {
    console.log(key, value, technicalLeads)
    
    // setTechnicalLeads({ ...technicalLeads, [key]: {email: value, id: key} });


    // setTechnicalLeads(current  =>{
    //   current.map(obj => {
    //     if (obj.id === key) {
    //       console.log(key)
    //       return {...obj, email: value, id: key}
    //     }
    //     return obj;
    //   })})
    //   debugger
    // console.log(technicalLeads)
  }



  const onSubmit = () => {
    console.log({
      name: projectName,
      description: description,
      projectOwner: projectOwner,
      ministry: ministry,
      technicalLeads: technicalLeads,
      cluster: cluster,
      defaultCpuOption: defaultCpuOption,
      defaultMemoryOption: defaultMemoryOption,
    })
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
          width='50%'
          name={'name'}
          errors={errors}
          setError={setError}
          control={control}
          setFormEditedState={setProjectName}
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
          setFormEditedState={setDescription}
          setValue={setValue}
          maxLength={40}
          multiline={true}
          rows={4}
          check={(str) => {
            str.length === 0 ? setError("descriptionrequired", { type: "required", required: true, message: 'Description is required' }, {}) :
              clearErrors("descriptionrequired")
            str.length > 512 ? setError("descriptionmaxLength", { type: "maxLength", maxLength: 512, message: 'Max 512 characters' }) :
              clearErrors("descriptionmaxLength")
          }}
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
              value={ministry}
              label="Ministry *"
              error={!!errors.required}
              onChange={e => {
                e.target.value.length === 0 ? setError("required", { type: "required" }, { required: true }) :
                  clearErrors("required")
                setValue(field.name, e.target.value);
                setMinistry(e.target.value)
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
          <Typography sx={{ mt: 0, fontSize: 17 }} >
            Project Owner
          </Typography>
          <CustomController
            width='50%'
            name={'projectOwner'}
            errors={errors}
            setError={setError}
            control={control}
            setFormEditedState={setProjectOwner}
            setValue={setValue}
            maxLength={40}
            check={(str) => {
              str.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi) === null ?
                setError("projectOwnerpattern", { type: "pattern", message: 'Must meet the pattern xxxxxx@xxxxx.xxx', pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi }) :
                clearErrors("projectOwnerpattern")
              str.length === 0 ? setError("projectOwnerrequired", { type: "required", required: true, message: 'Email is required' }, {}) :
                clearErrors("projectOwnerrequired")
              str.length > 40 ? setError("projectOwnermaxLength", { type: "maxLength", maxLength: 40, message: 'Max 40 characters' }) :
                clearErrors("projectOwnermaxLength")
            }}
          />

          <Typography sx={{ mt: 0, mb: 1, fontSize: 17 }}>
            Technical Leads
          </Typography>
          {technicalLeads.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'end' }}>
              <CustomController
                width='50%'
                name={`techlead${index === 0 ? "Primary" : "Secondary"}`}
                errors={errors}
                setError={setError}
                control={control}
                setFormEditedState={(value) => handleTechnicalLeads(item.id, value)}
                setValue={setValue}
                maxLength={40}
                check={(str) => {
                  str.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi) === null ?
                    setError(`techlead${index === 0 ? "Primary" : "Secondary"}pattern`, { type: "pattern", message: 'Must meet the pattern xxxxxx@xxxxx.xxx', pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi }) :
                    clearErrors(`techlead${index === 0 ? "Primary" : "Secondary"}pattern`)
                  str.length === 0 ? setError(`techlead${index === 0 ? "Primary" : "Secondary"}required`, { type: "required", required: true, message: 'Email is required' }, {}) :
                    clearErrors("projectOwnerrequired")
                  str.length > 40 ? setError(`techlead${index === 0 ? "Primary" : "Secondary"}maxLength`, { type: "maxLength", maxLength: 40, message: 'Max 40 characters' }) :
                    clearErrors(`techlead${index === 0 ? "Primary" : "Secondary"}maxLength`)
                }}
              />
              {technicalLeads.length === 1 ? (
                <IconButton
                  sx={{ mt: 0, ml: 0.5 }}
                  onClick={addTechnicalLead}
                >
                  <AddCircleIcon />
                </IconButton>
              ) : (index === 1 && <IconButton
                sx={{ mt: 0, ml: 0.5 }}
                onClick={() => removeTechnicalLead(item.id)}
              >
                <RemoveCircleIcon />
              </IconButton>
              )}
            </div>
          ))}
        </Paper>
        <div>
          <FormControl sx={{ mt: 0, mt: 4, mb: 2, minWidth: 250 }}>
            <InputLabel >
              Cluster *
            </InputLabel>
            <Controller
              name="cluster"
              control={control}
              render={({ field }) => <Select
                size="medium"
                value={cluster}
                label="Cluster *"
                error={!!errors.required}
                onChange={e => {
                  e.target.value.length === 0 ? setError("required", { type: "required" }, { required: true }) :
                    clearErrors("required")
                  setValue(field.name, e.target.value);
                  setCluster(e.target.value)
                }}
              >
                {clusters.map((clusterOption) => (
                  <MenuItem key={clusterOption} value={clusterOption}>
                    {clusterOption}
                  </MenuItem>
                ))}
              </Select>}
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ mt: 0, mt: 4, mb: 2, minWidth: 250 }}>
            <InputLabel >
              DefaultCpuOptions
            </InputLabel>
            <Controller
              name="defaultCpuOption"
              control={control}
              render={({ field }) => <Select
                size="medium"
                value={defaultCpuOption}
                label="DefaultCpuOption"
                error={!!errors.required}
                onChange={e => {
                  e.target.value.length === 0 ? setError("required", { type: "required" }, { required: true }) :
                    clearErrors("required")
                  setValue(field.name, e.target.value);
                  setDefaultCpuOption(e.target.value)
                }}
              >
                {defaultCpuOptions.map((defaultCpuOption) => (
                  <MenuItem key={defaultCpuOption} value={defaultCpuOption}>
                    {defaultCpuOption}
                  </MenuItem>
                ))}
              </Select>}
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ mt: 0, mt: 4, mb: 2, minWidth: 250 }}>
            <InputLabel >
              DefaultMemoryOptions
            </InputLabel>
            <Controller
              name="defaultMemoryOption"
              control={control}
              render={({ field }) => <Select
                size="medium"
                value={defaultMemoryOption}
                label="DefaultMemoryOption"
                error={!!errors.required}
                onChange={e => {
                  e.target.value.length === 0 ? setError("required", { type: "required" }, { required: true }) :
                    clearErrors("required")
                  setValue(field.name, e.target.value);
                  setDefaultMemoryOption(e.target.value)
                }}
              >
                {defaultMemoryOptions.map((defaultMemoryOption) => (
                  <MenuItem key={defaultMemoryOption} value={defaultMemoryOption}>
                    {defaultMemoryOption}
                  </MenuItem>
                ))}
              </Select>}
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ mt: 0, mt: 4, mb: 2, minWidth: 250 }}>
            <InputLabel >
              DefaultStorageOptions
            </InputLabel>
            <Controller
              name="defaultStorageOption"
              control={control}
              render={({ field }) => <Select
                size="medium"
                value={defaultStorageOption}
                label="defaultStorageOption"
                error={!!errors.required}
                onChange={e => {
                  e.target.value.length === 0 ? setError("required", { type: "required" }, { required: true }) :
                    clearErrors("required")
                  setValue(field.name, e.target.value);
                  setDefaultStorageOption(e.target.value)
                }}
              >
                {defaultStorageOptions.map((defaultStorageOption) => (
                  <MenuItem key={defaultStorageOption} value={defaultStorageOption}>
                    {defaultStorageOption}
                  </MenuItem>
                ))}
              </Select>}
            />
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