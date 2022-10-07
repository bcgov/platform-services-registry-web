import React, { useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import MetaDataInput from "../../components/MetaDataInput";
import ClusterInput from "../../components/ClusterInput";
import QuotaInput from "../../components/QuotaInput";
import NavToolbar from "../../components/NavToolbar";
import {
  userProjectToFormData,
  projectFormSchema as schema,
} from "../../components/common/FormHelpers";
import { Button, IconButton, ButtonGroup } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import StyledForm from "../../components/common/StyledForm";
import TitleTypography from "../../components/common/TitleTypography";

const ADMIN_REQUEST = gql`
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

const MAKE_REQUEST_DECISION = gql`
  mutation MakePrivateCloudRequestDecision(
    $requestId: ID!
    $decision: RequestDecision!
  ) {
    makePrivateCloudRequestDecision(requestId: $requestId, decision: $decision)
  }
`;

export default function Request() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loading: adminRequestLoading,
    data: adminRequestData,
    error: adminRequestError,
  } = useQuery(ADMIN_REQUEST, {
    variables: { requestId: id },
  });

  const [
    createPrivateCloudProjectEditRequest,
    { data: decisionData, loading: decisionLoading, error: decisionError },
  ] = useMutation(MAKE_REQUEST_DECISION);

  const makeDecisionOnClick = (decision) => {
    createPrivateCloudProjectEditRequest({
      variables: { requestId: id, decision },
      onCompleted: () => {
        console.log("MAKE REQUEST DECISION COMPLETED");
        navigate(-1);
      },
    });
  };

  const adminPrivateCloudRequest = adminRequestData?.privateCloudActiveRequest;

  useEffect(() => {
    if (!adminRequestLoading && !adminRequestError) {
      reset(userProjectToFormData(adminPrivateCloudRequest.requestedProject));
    }
  }, [adminRequestLoading, adminRequestError, adminPrivateCloudRequest]);

  const {
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (adminRequestError) return `Error! ${adminRequestError}`;

  const name =
    adminPrivateCloudRequest?.type === "CREATE"
      ? adminPrivateCloudRequest?.requestedProject?.name
      : adminPrivateCloudRequest?.project?.name;

  return (
    <div>
      <NavToolbar path={"request"} title={name}>
        <div>
          <Button
            disabled={adminPrivateCloudRequest?.status !== "PENDING_DECISION"}
            sx={{ mr: 1 }}
            onClick={() => makeDecisionOnClick("APPROVE")}
            variant="outlined"
          >
            Approve
          </Button>
          <Button
            disabled={adminPrivateCloudRequest?.status !== "PENDING_DECISION"}
            sx={{ mr: 1 }}
            onClick={() => makeDecisionOnClick("REJECT")}
            variant="outlined"
          >
            Reject
          </Button>
        </div>
      </NavToolbar>
      {decisionLoading ? (
        <LoadingSpinner />
      ) : (
        <FormProvider
          {...{
            control,
            errors,
            setValue,
            watch,
            initialValues: userProjectToFormData(
              adminPrivateCloudRequest?.requestedProject
            ),
            isDisabled: adminPrivateCloudRequest?.active,
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
