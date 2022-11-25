import React, { useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import MetaDataInput from "../../components/MetaDataInput";
import ClusterInput from "../../components/ClusterInput";
import QuotaInput from "../../components/QuotaInput";
import NavToolbar from "../../components/NavToolbar";
import {
  userProjectToFormData,
  projectFormSchema as schema
} from "../../components/common/FormHelpers";
import CommonComponents from "../../components/CommonComponents";
import { Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import StyledForm from "../../components/common/StyledForm";

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
          primaryTechnicalLead {
            email
          }
          secondaryTechnicalLead {
            email
          }
          ministry
          cluster
          commonComponents {
            addressAndGeolocation
            workflowManagement
            formDesignAndSubmission
            identityManagement
            paymentServices
            documentManagement
            endUserNotificationAndSubscription
            publishing
            businessIntelligence
            other
          }
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
    error: adminRequestError
  } = useQuery(ADMIN_REQUEST, {
    variables: { requestId: id }
  });

  const [
    makePrivateCloudRequestDecision,
    { data: decisionData, loading: decisionLoading, error: decisionError }
  ] = useMutation(MAKE_REQUEST_DECISION);

  const makeDecisionOnClick = (decision) => {
    makePrivateCloudRequestDecision({
      variables: { requestId: id, decision },
      onCompleted: () => {
        console.log("MAKE REQUEST DECISION COMPLETED");
        navigate(-1);
      }
    });
  };

  const {
    control,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const adminPrivateCloudRequest = adminRequestData?.privateCloudActiveRequest;
  const initalFormData = userProjectToFormData(
    adminPrivateCloudRequest?.requestedProject
  );

  useEffect(() => {
    if (!adminRequestLoading && !adminRequestError) {
      reset(userProjectToFormData(adminPrivateCloudRequest.requestedProject));
    }
  }, [adminRequestLoading, adminRequestError, adminPrivateCloudRequest, reset]);

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
            initialValues: initalFormData,
            isDisabled: adminPrivateCloudRequest?.active
          }}
        >
          <StyledForm>
              <MetaDataInput />
            <div style={{ marginLeft: 70 }}>
              <ClusterInput />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <QuotaInput nameSpace={"production"} />
                  <QuotaInput nameSpace={"test"} />
                </div>
                <div>
                  <QuotaInput nameSpace={"tools"} />
                  <QuotaInput nameSpace={"development"} />
                </div>
              </div>
              <CommonComponents />
            </div>
          </StyledForm>
        </FormProvider>
      )}
    </div>
  );
}
