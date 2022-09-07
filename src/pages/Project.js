import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import MetaDataInput from "../components/MetaDataInput";
import ClusterInput from "../components/ClusterInput";
import QuotaInput from "../components/QuotaInput";
import NavToolbar from "../components/NavToolbar";
import Typography from "@mui/material/Typography";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Button, IconButton } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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

const TitleTypography = (props) => (
  <Typography variant="h6" sx={{ mt: 0, mb: 1 }}>
    {props.children}
  </Typography>
);

const StyledForm = styled.form`
  width: 550px;
  margin-left: 24px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

const USER_PROJECT = gql`
  query Query($projectId: ID!) {
    userPrivateCloudProject(projectId: $projectId) {
      id
      name
      description
      projectOwner {
        email
      }
      technicalLeads {
        email
      }
      ministry
      cluster
      productionQuota {
        cpu {
          requests
          limits
        }
        memory {
          requests
          limits
        }
        storage {
          block
          file
          backup
          capacity
          pvcCount
        }
        snapshot {
          count
        }
      }
      testQuota {
        cpu {
          limits
          requests
        }
        memory {
          requests
          limits
        }
        storage {
          block
          file
          backup
          capacity
          pvcCount
        }
        snapshot {
          count
        }
      }
      developmentQuota {
        cpu {
          requests
          limits
        }
        memory {
          requests
          limits
        }
        storage {
          block
          file
          backup
          capacity
          pvcCount
        }
        snapshot {
          count
        }
      }
      toolsQuota {
        cpu {
          requests
          limits
        }
        memory {
          requests
          limits
        }
        storage {
          block
          file
          backup
          capacity
          pvcCount
        }
        snapshot {
          count
        }
      }
    }
  }
`;

const userProjectToFormData = (userPrivateCloudProject) => {
  const productionQuota = userPrivateCloudProject?.productionQuota;
  const testQuota = userPrivateCloudProject?.testQuota;
  const developmentQuota = userPrivateCloudProject?.developmentQuota;
  const toolsQuota = userPrivateCloudProject?.toolsQuota;

  return {
    ...userPrivateCloudProject,
    projectOwner: userPrivateCloudProject.projectOwner.email,
    primaryTechnicalLead: userPrivateCloudProject.technicalLeads[0]?.email,
    secondaryTechnicalLead: userPrivateCloudProject.technicalLeads[1]?.email,
    productionCpu:
      `CPU_REQUEST_${productionQuota.cpu.requests}_LIMIT_${productionQuota.cpu.limits}`.replaceAll(
        ".",
        "_"
      ),
    productionMemory:
      `MEMORY_REQUEST_${productionQuota.memory.requests}_LIMIT_${productionQuota.memory.limits}`.replaceAll(
        ".",
        "_"
      ),
    productionStorage: `STORAGE_${productionQuota.storage.file}`.replaceAll(
      ".",
      "_"
    ),
    developmentCpu:
      `CPU_REQUEST_${developmentQuota.cpu.requests}_LIMIT_${developmentQuota.cpu.limits}`.replaceAll(
        ".",
        "_"
      ),
    developmentMemory:
      `MEMORY_REQUEST_${developmentQuota.memory.requests}_LIMIT_${developmentQuota.memory.limits}`.replaceAll(
        ".",
        "_"
      ),
    developmentStorage: `STORAGE_${developmentQuota.storage.file}`.replaceAll(
      ".",
      "_"
    ),
    testCpu:
      `CPU_REQUEST_${testQuota.cpu.requests}_LIMIT_${testQuota.cpu.limits}`.replaceAll(
        ".",
        "_"
      ),
    testMemory:
      `MEMORY_REQUEST_${testQuota.memory.requests}_LIMIT_${testQuota.memory.limits}`.replaceAll(
        ".",
        "_"
      ),
    testStorage: `STORAGE_${testQuota.storage.file}`.replaceAll(".", "_"),
    toolsCpu:
      `CPU_REQUEST_${toolsQuota.cpu.requests}_LIMIT_${toolsQuota.cpu.limits}`.replaceAll(
        ".",
        "_"
      ),
    toolsMemory:
      `MEMORY_REQUEST_${toolsQuota.memory.requests}_LIMIT_${toolsQuota.memory.limits}`.replaceAll(
        ".",
        "_"
      ),
    toolsStorage: `STORAGE_${toolsQuota.storage.file}`.replaceAll(".", "_"),
  };
};

export default function Project() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(USER_PROJECT, {
    variables: { projectId: id },
  });

  const userPrivateCloudProject = data?.userPrivateCloudProject;

  useEffect(() => {
    if (!loading && !error) {
      reset(userProjectToFormData(userPrivateCloudProject));
    }
  }, [loading, error, userPrivateCloudProject]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log("data submitted: ", data);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <NavToolbar title={userPrivateCloudProject?.name}>
        <IconButton 
          sx={{ mr: 1 }}
          disabled={!isDirty}
          onClick={() => reset(userProjectToFormData(userPrivateCloudProject))}
          aria-label="delete"
        >
          <RestartAltIcon />
        </IconButton>
        <Button
          // style={{ border: "none" }}
          disabled={!isDirty}
          onClick={handleSubmit(onSubmit)}
          variant="outlined"
        >
          SUBMIT REQUEST
        </Button>
      </NavToolbar>
      <FormProvider
        {...{
          control,
          errors,
          initialValues: userProjectToFormData(userPrivateCloudProject),
        }}
      >
        <StyledForm>
          <div>
            <TitleTypography>
              Project Description and Contact Information
            </TitleTypography>
            <MetaDataInput />
          </div>
          <div style={{ marginLeft: 70 }}>
            <TitleTypography>Cluster</TitleTypography>
            <ClusterInput />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <TitleTypography>Production Quota</TitleTypography>
                <QuotaInput nameSpace={"production"} />
                <TitleTypography>Test Quota</TitleTypography>
                <QuotaInput nameSpace={"test"} />
              </div>
              <div>
                <TitleTypography>Tools Quota</TitleTypography>
                <QuotaInput nameSpace={"tools"} />
                <TitleTypography>Development Quota</TitleTypography>
                <QuotaInput nameSpace={"development"} />
              </div>
            </div>
          </div>
        </StyledForm>
      </FormProvider>
    </div>
  );
}
