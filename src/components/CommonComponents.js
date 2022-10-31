import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Controller, useFormContext } from "react-hook-form";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormHelperText from "@mui/material/FormHelperText";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

const StyledCheckboxContainer = styled.div`
  min-width: 400px;
  display: inline-block;
  display: flex;
  flex-direction: row;
  column-gap: 15px;
  margin-left: 100px;
  align-items: flex-start;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  padding-bottom: 50px;
  max-width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledContainer = styled.div`
  padding: 20px;
  margin-bottom: 10px;
  max-width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledControler = styled(Controller)`
  align-self: left;
`;

const commonComponents = [
  { name: "addressAndGeolocation", description: "Address and geolocation" },
  {
    name: "workflowManagement",
    description: "Workflow Management (similar to Camunda)",
  },
  {
    name: "formDesignAndSubmission",
    description:
      "Form Design and Submission (similar to CHEFS, Gravity, Orbeon)",
  },
  {
    name: "identityManagement",
    description: "Identity management (user authentication and authorization)",
  },
  {
    name: "paymentServices",
    description:
      "Payment services (i.e. collection, processing, reconciliation, ledger management)",
  },
  {
    name: "documentManagement",
    description:
      "Document Management (file storage and transfer, PDF and other document generation)",
  },
  {
    name: "endUserNotificationAndSubscription",
    description:
      "End user notification and subscription service (email, text messages, automated phone calls, in-app pop up messages)",
  },
  { name: "publishing", description: "Publishing (web content management)" },
  {
    name: "businessIntelligence",
    description:
      "Business Intelligence Dashboard and Metrics reporting (i.e. diagrams and pie charts, report generation)",
  },
];

function CheckBoxRow({ name, description }) {
  const { control, errors, isDisabled, initialValues, setValue, watch } =
    useFormContext();

  const selection = watch(name);
  const noServices = watch("noServices");

  const onClick = (event) => {
    if (event.target.value === selection) {
      setValue(name, undefined);
    }
  };

  return (
    <StyledContainer>
      <Typography
        variant="body1"
        color={noServices && "rgba(0, 0, 0, 0.38)"}
        sx={{ marginTop: 0.5 }}
      >
        {description}
      </Typography>
      <StyledCheckboxContainer>
        <StyledControler
          name={name}
          control={control}
          // defaultValue={""}
          render={({ field }) => (
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              {...field}
              value={field.value || ""}
            >
              <FormControlLabel
                value={"IMPLEMENTED"}
                control={
                  <Radio
                    onClick={onClick}
                    checked={field.value === "IMPLEMENTED"}
                    disabled={noServices}
                  />
                }
                label="Implemented"
              />

              <FormControlLabel
                value={"PLANNING_TO_USE"}
                control={
                  <Radio
                    onClick={onClick}
                    checked={field.value === "PLANNING_TO_USE"}
                    disabled={noServices}
                  />
                }
                label="Planning to use"
              />
            </RadioGroup>
          )}
        />
      </StyledCheckboxContainer>
    </StyledContainer>
  );
}

export default function CommonComponents() {
  const { control, errors, isDisabled, initialValues, setValue, watch } =
    useFormContext();

  const isDirty =
    watch(["other", ...commonComponents.map(({ name }) => name)]).filter(
      Boolean
    ).length > 0;
  const noServices = watch("noServices");

  useEffect(() => {
    if (!noServices && !isDirty) {
      setValue("noServices", undefined);
    } else if (isDirty) {
      setValue("noServices", false);
    }
  }, [noServices, isDirty, setValue]);

  return (
    <StyledPaper>
      <FormGroup>
        {commonComponents.map(({ name, description }, index) => (
          <CheckBoxRow name={name} description={description} key={index} />
        ))}
        <FormControlLabel
          sx={{ ml: 2.5, display: "flex", justifyContent: "flex-end", mb: 3 }}
          labelPlacement="start"
          label={"Other"}
          disabled={isDisabled || noServices}
          control={
            <Controller
              name="other"
              defaultValue={""}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ ml: 5, width: "80%" }}
                  disabled={isDisabled || noServices}
                  size="small"
                  helperText={errors.other ? errors.name?.other : ""}
                  id="name"
                  label="please specify"
                />
              )}
            />
          }
        />
        <FormControlLabel
          sx={{ ml: 1 }}
          control={
            <Controller
              disabled={isDirty}
              name="noServices"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  disabled={isDirty}
                  required={!isDirty}
                  checked={isDirty ? false : field.value}
                  {...field}
                />
              )}
            />
          }
          label={"The app does not use any of these services"}
        />
        <FormHelperText>
          {errors.noServices && !isDirty ? "required field" : ""}
        </FormHelperText>
      </FormGroup>
    </StyledPaper>
  );
}
