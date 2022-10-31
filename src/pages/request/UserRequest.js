import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import MetaDataInput from "../../components/MetaDataInput";
import ClusterInput from "../../components/ClusterInput";
import QuotaInput from "../../components/QuotaInput";
import NavToolbar from "../../components/NavToolbar";
import {
  userProjectToFormData,
  projectFormSchema as schema,
} from "../../components/common/FormHelpers";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import TitleTypography from "../../components/common/TitleTypography";
import StyledForm from "../../components/common/StyledForm";

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
          primaryTechnicalLead {
            email
          }
          secondaryTechnicalLead {
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

  const {
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const userPrivateCloudRequest = userRequestData?.privateCloudActiveRequest;

  useEffect(() => {
    if (!userRequestLoading && !userRequestError) {
      reset(userProjectToFormData(userPrivateCloudRequest.requestedProject));
    }
  }, [userRequestLoading, userRequestError, userPrivateCloudRequest, reset]);

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
          setValue,
          watch,
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
