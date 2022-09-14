import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import MetaDataInput from "../../components/MetaDataInput";
import ClusterInput from "../../components/ClusterInput";
import QuotaInput from "../../components/QuotaInput";
import NavToolbar from "../../components/NavToolbar";
import {
  userProjectToFormData,
  formDataToUserProject,
} from "../../components/common/FormHelpers";
import Typography from "@mui/material/Typography";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Button, IconButton, ButtonGroup } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../../components/common/LoadingSpinner";

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
    console.log(decision);
    console.log(id);
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
      <NavToolbar title={name}>
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
