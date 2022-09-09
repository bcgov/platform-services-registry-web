import React, { useState, useEffect } from "react";
import NavToolbar from "../components/NavToolbar";
import Progress from "../components/Progress";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Create() {
  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    projectOwner: yup.string().email("Must be a valid email address").required(),
    primaryTechnicalLead: yup
      .string()
      .email("Must be a valid email address")
      .required(),
    secondaryTechnicalLead: yup.string().email("Must be a valid email address"),
    ministry: yup.string().required(),
    cluster: yup.string().required(),
    productionCpu: yup.string().required(),
    productionMemory: yup.string().required(),
    productionStorage: yup.string().required(),
    developmentCpu: yup.string().required(),
    developmentMemory: yup.string().required(),
    developmentStorage: yup.string().required(),
    testCpu: yup.string().required(),
    testMemory: yup.string().required(),
    testStorage: yup.string().required(),
    toolsCpu: yup.string().required(),
    toolsMemory: yup.string().required(),
    toolsStorage: yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log("data submitted: ", data);

  return (
    <div>
      <NavToolbar title={"Create Project"} />
      <FormProvider {...{ control, errors, }}>
        <Progress />
      </FormProvider>
    </div>
  );
}
