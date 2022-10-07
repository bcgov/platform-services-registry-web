import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import MetaDataInput from "../../components/MetaDataInput";
import ClusterInput from "../../components/ClusterInput";
import QuotaInput from "../../components/QuotaInput";
import NavToolbar from "../../components/NavToolbar";
import {
  userProjectToFormData,
  formDataToUserProject,
  projectFormSchema as schema,
} from "../../components/common/FormHelpers";
import Typography from "@mui/material/Typography";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Button, IconButton } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import StyledLink from "../../components/common/StyledLink";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import StyledForm from "../../components/common/StyledForm";
import TitleTypography from "../../components/common/TitleTypography";

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

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    watch,
    setValue,
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
        navigate(-1);
      },
    });
  };

  if (userProjectError || editProjectError)
    return `Error! ${userProjectError} ${editProjectError}`;

  return (
    <div>
      <NavToolbar path={"project"} title={userPrivateCloudProject?.name}>
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
          disabled={!isDirty}
          onClick={handleSubmit(onSubmit)}
          variant="outlined"
        >
          SUBMIT EDIT REQUEST
        </Button>
      </NavToolbar>
      <div style={{ minHeight: 50 }}>
        {userPrivateCloudProject?.activeRequest?.active && (
          <Typography
            variant="body"
            sx={{ mb: 0, ml: 3, color: "rgba(0, 0, 0, 0.6)" }}
          >
            This project cannot be edited as it has an{" "}
            <StyledLink
              to={`/private-cloud/user/request/${userPrivateCloudProject?.activeRequest?.id}`}
            >
              <i>active request</i>
            </StyledLink>
          </Typography>
        )}
      </div>
      {editProjectLoading ? (
        <LoadingSpinner />
      ) : (
        <FormProvider
          {...{
            control,
            errors,
            setValue,
            watch,
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
      )}
    </div>
  );
}
