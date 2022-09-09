import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import MetaDataInput from "../components/MetaDataInput";
import ClusterInput from "../components/ClusterInput";
import QuotaInput from "../components/QuotaInput";
import NavToolbar from "../components/NavToolbar";
import {
  userProjectToFormData,
  formDataToUserProject,
} from "../components/common/FormHelpers";
import Typography from "@mui/material/Typography";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Button, IconButton, ButtonGroup } from "@mui/material";
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

const USER_PROJECT = gql`
  query Query($projectId: ID!) {
    userPrivateCloudProject(projectId: $projectId) {
      id
      name
      description
      activeRequest {
        id
        active
      }
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
          file
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
          file
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
          file
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
          file
        }
        snapshot {
          count
        }
      }
    }
  }
`;

const UPDATE_USER_PROJECT = gql`
  mutation Mutation(
    $projectId: ID!
    $metaData: EditProjectMetaDataInput
    $productionQuota: QuotaInput
    $developmentQuota: QuotaInput
    $testQuota: QuotaInput
    $toolsQuota: QuotaInput
  ) {
    privateCloudProjectEditRequest(
      projectId: $projectId
      metaData: $metaData
      productionQuota: $productionQuota
      developmentQuota: $developmentQuota
      testQuota: $testQuota
      toolsQuota: $toolsQuota
    ) {
      id
      active
    }
  }
`;

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

export default function Project() {
  const { id } = useParams();

  const {
    loading: userProjectLoading,
    data: userProjectData,
    error: userProjectError,
  } = useQuery(USER_PROJECT, {
    variables: { projectId: id },
  });

  const [
    createPrivateCloudProjectEditRequest,
    {
      data: editProjectData,
      loading: editProjectLoading,
      error: editProjectError,
    },
  ] = useMutation(UPDATE_USER_PROJECT);

  const userPrivateCloudProject = userProjectData?.userPrivateCloudProject;

  useEffect(() => {
    if (!userProjectLoading && !userProjectError) {
      reset(userProjectToFormData(userPrivateCloudProject));
    }
  }, [userProjectLoading, userProjectError, userPrivateCloudProject]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, dirtyFields, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const changedFields = Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {});

    const userProject = formDataToUserProject(changedFields);

    createPrivateCloudProjectEditRequest({
      variables: { projectId: id, ...userProject },
      onCompleted: () => {
        console.log("COMPLETED");
      },
    });
  };

  console.log(userPrivateCloudProject)
  console.log(userPrivateCloudProject?.activeRequest?.active)

  if (userProjectLoading) return null;
  if (userProjectError || editProjectError)
    return `Error! ${userProjectError} ${editProjectError}`;

  return (
    <div>
      <NavToolbar title={userPrivateCloudProject?.name}>
        <IconButton
          sx={{ mr: 2 }}
          disabled={!isDirty}
          onClick={() => reset(userProjectToFormData(userPrivateCloudProject))}
          aria-label="delete"
        >
          <RestartAltIcon />
        </IconButton>
        <Button
          sx={{ mr: 1 }}
          // style={{ border: "none" }}
          disabled={!isDirty}
          onClick={handleSubmit(onSubmit)}
          variant="outlined"
        >
          SUBMIT EDIT REQUEST
        </Button>
      </NavToolbar>
      <FormProvider
        {...{
          control,
          errors,
          initialValues: userProjectToFormData(userPrivateCloudProject),
          isDisabled: userPrivateCloudProject?.activeRequest?.active,
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
