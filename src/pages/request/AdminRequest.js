import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import MetaDataInput from "../../components/forms/MetaDataInput";
import ClusterInput from "../../components/forms/ClusterInput";
import MinistryInput from "../../components/forms/MinistryInput";
import NavToolbar from "../../components/NavToolbar";
import {
  projectInitialValues as initialValues,
  replaceNullsWithEmptyString
} from "../../components/common/FormHelpers";
import TitleTypography from "../../components/common/TitleTypography";
import { Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { USER_REQUESTS } from "../requests/UserRequests";
import { ALL_ACTIVE_REQUESTS } from "../requests/AdminRequests";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Container from "../../components/common/Container";
import Users from "../../components/forms/Users";
import Divider from "@mui/material/Divider";
import Quotas from "../../components/forms/Quotas";
import Namespaces from "../../components/Namespaces";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import ReProvisionButton from "../../components/ReProvisionButton";

const ADMIN_REQUEST = gql`
  query PrivateCloudActiveRequestById($requestId: ID!) {
    privateCloudActiveRequestById(requestId: $requestId) {
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
      decisionStatus
      humanComment
      active
      created
      decisionDate
      project {
        name
        productionQuota {
          cpu
          memory
          storage
        }
        testQuota {
          cpu
          memory
          storage
        }
        developmentQuota {
          cpu
          memory
          storage
        }
        toolsQuota {
          cpu
          memory
          storage
        }
      }
      requestedProject {
        id
        name
        licencePlate
        description
        status
        projectOwner {
          email
          firstName
          lastName
          ministry
        }
        primaryTechnicalLead {
          email
          firstName
          lastName
          ministry
        }
        secondaryTechnicalLead {
          email
          firstName
          lastName
          ministry
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
          noServices
          other
        }
        productionQuota {
          cpu
          memory
          storage
        }
        testQuota {
          cpu
          memory
          storage
        }
        developmentQuota {
          cpu
          memory
          storage
        }
        toolsQuota {
          cpu
          memory
          storage
        }
      }
    }
  }
`;

const MAKE_REQUEST_DECISION = gql`
  mutation PrivateCloudRequestDecision(
    $requestId: ID!
    $decision: RequestDecision!
    $humanComment: String
  ) {
    privateCloudRequestDecision(
      requestId: $requestId
      decision: $decision
      humanComment: $humanComment
    ) {
      id
      decisionStatus
      humanComment
    }
  }
`;

const RE_PROVISION_REQUEST = gql`
  mutation PrivateCloudReProvisionRequest($requestId: ID!) {
    privateCloudReProvisionRequest(requestId: $requestId) {
      id
    }
  }
`;

export default function AdminRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toastId = useRef(null);
  const [humanCommentInput, setHumanCommentInput] = useState(null);

  const { data, loading, error } = useQuery(ADMIN_REQUEST, {
    variables: { requestId: id }
  });

  const { project, requestedProject, ...request } =
    data?.privateCloudActiveRequestById || {};

  const [
    privateCloudRequestDecision,
    { data: decisionData, loading: decisionLoading, error: decisionError }
  ] = useMutation(MAKE_REQUEST_DECISION, {
    refetchQueries: [{ query: USER_REQUESTS }, { query: ALL_ACTIVE_REQUESTS }]
  });

  const [
    privateCloudReProvisionRequest,
    {
      data: reprovisionData,
      loading: reprovisionLoading,
      error: reprovisionError
    }
  ] = useMutation(RE_PROVISION_REQUEST, {
    refetchQueries: [{ query: USER_REQUESTS }, { query: ALL_ACTIVE_REQUESTS }]
  });

  const reProvisionOnClick = () => {
    toastId.current = toast("Re provisioning request has been submitted", {
      autoClose: false
    });

    privateCloudReProvisionRequest({
      variables: { requestId: id },
      onError: (error) => {
        console.log(error);
        toast.update(toastId.current, {
          render: `Error: ${error.message}`,
          type: toast.TYPE.ERROR,
          autoClose: 5000
        });
      },
      onCompleted: () => {
        navigate(-1);
        toast.update(toastId.current, {
          render: "Re provisioning request successful",
          type: toast.TYPE.SUCCESS,
          autoClose: 5000
        });
      }
    });
  };

  const makeDecisionOnClick = (decision) => {
    toastId.current = toast("Your decision has been submitted", {
      autoClose: false
    });
    privateCloudRequestDecision({
      variables: { requestId: id, decision, humanComment: humanCommentInput },
      onError: (error) => {
        console.log(error);
        toast.update(toastId.current, {
          render: `Error: ${error.message}`,
          type: toast.TYPE.ERROR,
          autoClose: 5000
        });
      },
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

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  useEffect(() => {
    if (data) {
      // Form values cannon be null (uncontrolled input error), so replace nulls with empty strings
      formik.setValues(replaceNullsWithEmptyString(requestedProject));
    }
  }, [data]);

  useEffect(() => {
    if (request.humanComment) {
      setHumanCommentInput(request.humanComment);
    }
  }, [request.humanComment]);

  const name =
    request?.type === "CREATE" ? requestedProject?.name : project?.name;
  const isDisabled = !requestedProject || request?.decisionStatus !== "PENDING";

  return (
    <div>
      <NavToolbar path={"request"} title={name}>
        <ReProvisionButton
          style={{ right: 90 }}
          onClickHandler={reProvisionOnClick}
        />
      </NavToolbar>
      <Container>
        <MetaDataInput formik={formik} isDisabled={true} />
        <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
        <div>
          <div style={{ display: "flex" }}>
            <MinistryInput formik={formik} isDisabled={true} />
            <ClusterInput formik={formik} isDisabled={true} />
          </div>
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          {request?.type !== "CREATE" ? (
            <div>
              <Namespaces
                cluster={
                  data?.privateCloudActiveRequestById?.requestedProject?.cluster
                }
                licencePlate={
                  data?.privateCloudActiveRequestById?.requestedProject
                    ?.licencePlate
                }
              />
              <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
            </div>
          ) : null}
          <Users formik={formik} isDisabled={true} />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <Quotas
            formik={formik}
            isDisabled={true}
            currentProjectQuota={data?.privateCloudActiveRequestById?.project}
          />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
        </div>
        <TitleTypography> Reviewer’s comments</TitleTypography>
        <TextField
          fullWidth
          id="humanComment"
          name="humanComment"
          placeholder="Provide feedback to the PO/TC regarding your decision for this product"
          value={humanCommentInput}
          onChange={(e) => setHumanCommentInput(e.target.value)}
          size="small"
          style={{ display: "block", width: "700px", maxWidth: "100%" }}
          multiline
          rows={4}
        />
        <Box sx={{ mt: 3, mb: 3 }}>
          <Button
            disabled={isDisabled}
            sx={{ mr: 1, minWidth: "120px" }}
            onClick={() => makeDecisionOnClick("APPROVED")}
            variant="contained"
          >
            Approve
          </Button>
          <Button
            disabled={isDisabled}
            sx={{ mr: 1, minWidth: "120px" }}
            onClick={() => makeDecisionOnClick("REJECTED")}
            variant="outlined"
          >
            Reject
          </Button>
        </Box>
      </Container>
    </div>
  );
}
