import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import MetaDataInput from "../../components/MetaDataInput";
import ClusterInput from "../../components/ClusterInput";
import QuotaInput from "../../components/QuotaInput";
import NavToolbar from "../../components/NavToolbar";
import { userProjectToFormData } from "../../components/common/FormHelpers";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import TitleTypography from "../../components/common/TitleTypography";
import StyledForm from "../../components/common/StyledForm";

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

const USER_REQUEST = gql`
  query Query($requestId: ID!) {
    privateCloudActiveRequest(requestId: $requestId) {
      id
      createdBy {
        firstName
        lastName
      }
      decisionMaker {
        firstName
        lastName
        id
      }
      type
      status
      active
      created
      decisionDate
      project {
        ... on PrivateCloudProject {
          name
        }
      }
      requestedProject {
        ... on PrivateCloudProject {
          id
          name
          licencePlate
          description
          status
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
        }
      }
    }
  }
`;

export default function Request() {
  const { id } = useParams();

  const {
    loading: userRequestLoading,
    data: userRequestData,
    error: userRequestError,
  } = useQuery(USER_REQUEST, {
    variables: { requestId: id },
  });

  const userPrivateCloudRequest = userRequestData?.privateCloudActiveRequest;

  useEffect(() => {
    if (!userRequestLoading && !userRequestError) {
      reset(userProjectToFormData(userPrivateCloudRequest.requestedProject));
    }
  }, [userRequestLoading, userRequestError, userPrivateCloudRequest]);

  const {
    control,
    reset,
    formState: { isDirty, dirtyFields, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (userRequestError) return `Error! ${userRequestError}`;

  const name =
    userPrivateCloudRequest?.type === "CREATE"
      ? userPrivateCloudRequest?.requestedProject?.name
      : userPrivateCloudRequest?.project?.name;

  return (
    <div>
      <NavToolbar path={"request"} title={name} />
      <FormProvider
        {...{
          control,
          errors,
          initialValues: userProjectToFormData(
            userPrivateCloudRequest?.requestedProject
          ),
          isDisabled: userPrivateCloudRequest?.active,
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
