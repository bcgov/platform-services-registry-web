import React, { useEffect, useRef } from "react";
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
import { USER_ACTIVE_REQUESTS } from "../requests/UserRequests";
import { ALL_ACTIVE_REQUESTS } from "../requests/AdminRequests";
import { toast } from "react-toastify";

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
          id
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
    $projectId: ID
  ) {
    makePrivateCloudRequestDecision(
      requestId: $requestId, 
      decision: $decision, 
      projectId:$projectId)
  }
`;

export default function Request() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toastId = useRef(null);

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
  ] = useMutation(MAKE_REQUEST_DECISION, {
    refetchQueries: [
      { query: USER_ACTIVE_REQUESTS },
      { query: ALL_ACTIVE_REQUESTS }
    ]
  });

  const adminPrivateCloudRequest = adminRequestData?.privateCloudActiveRequest;
  const initalFormData = userProjectToFormData(
    adminPrivateCloudRequest?.requestedProject
  );

  const projectId =
    adminPrivateCloudRequest?.type !== "CREATE"
      ? adminPrivateCloudRequest?.project?.id
      : null;

  const makeDecisionOnClick = (decision) => {
    toastId.current = toast("Your decision has been submitted", {
      autoClose: false
    });
    makePrivateCloudRequestDecision({
      variables: { requestId: id, decision, projectId: projectId },
      onCompleted: () => {
        navigate(-1);
        toast.update(toastId.current, {
          render: "Decision successful",
          type: toast.TYPE.SUCCESS,
          autoClose: 5000
        });
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


  useEffect(() => {
    if (!adminRequestLoading && !adminRequestError) {
      reset(userProjectToFormData(adminPrivateCloudRequest.requestedProject));
    }
  }, [adminRequestLoading, adminRequestError, adminPrivateCloudRequest, reset]);

  if (decisionError && toastId.current) {
    toast.update(toastId.current, {
      render: `Error: ${decisionError.message}`,
      type: toast.TYPE.SUCCESS,
      autoClose: 5000
    });
  } else if (adminRequestError) {
    return `Error! ${adminRequestError}`;
  }

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
                <div style={{ marginLeft: 45 }}>
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
