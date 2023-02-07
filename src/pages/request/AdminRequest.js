import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import MetaDataInput from "../../components/forms/MetaDataInput";
import ClusterInput from "../../components/forms/ClusterInput";
import MinistryInput from "../../components/forms/MinistryInput";
import NavToolbar from "../../components/NavToolbar";
import {
  projectInitialValues as initialValues,
  replaceNullsWithEmptyString,
} from "../../components/common/FormHelpers";
import CommonComponents from "../../components/forms/CommonComponents";
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

const ADMIN_REQUEST = gql`
  query Query($requestId: ID!) {
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
          email
          firstName
          lastName
          ministry
          githubId
        }
        primaryTechnicalLead {
          email
          firstName
          lastName
          ministry
          githubId
        }
        secondaryTechnicalLead {
          email
          email
          firstName
          lastName
          ministry
          githubId
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
  ) {
    privateCloudRequestDecision(requestId: $requestId, decision: $decision) {
      id
      decisionStatus
    }
  }
`;

export default function AdminRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toastId = useRef(null);
  const [currentProjectQuota, setCurrentProjectQuota] = useState({})

  const { data, loading, error } = useQuery(ADMIN_REQUEST, {
    variables: { requestId: id },
  });

  const { project, requestedProject, ...request } =
    data?.privateCloudActiveRequestById || {};

  const [
    privateCloudRequestDecision,
    { data: decisionData, loading: decisionLoading, error: decisionError },
  ] = useMutation(MAKE_REQUEST_DECISION, {
    refetchQueries: [{ query: USER_REQUESTS }, { query: ALL_ACTIVE_REQUESTS }],
  });

  const makeDecisionOnClick = (decision) => {
    toastId.current = toast("Your decision has been submitted", {
      autoClose: false,
    });
    privateCloudRequestDecision({
      variables: { requestId: id, decision },
      onError: (error) => {
        console.log(error);
        toast.update(toastId.current, {
          render: `Error: ${error.message}`,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        });
      },
      onCompleted: () => {
        navigate(-1);
        toast.update(toastId.current, {
          render: "Decision successful",
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
        });
      },
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (data) {
      // Form values cannon be null (uncontrolled input error), so replace nulls with empty strings
      formik.setValues(replaceNullsWithEmptyString(requestedProject));
      setCurrentProjectQuota(data.privateCloudActiveRequestById.project)
    }
  }, [data]);

  const name =
    request?.type === "CREATE" ? requestedProject?.name : project?.name;
  const isDisabled = !requestedProject || request?.decisionStatus !== "PENDING";

  return (
    <div>
      <NavToolbar path={"request"} title={name}>
        <Button
          disabled={isDisabled}
          sx={{ mr: 1 }}
          onClick={() => makeDecisionOnClick("APPROVED")}
          variant="outlined"
        >
          Approve
        </Button>
        <Button
          disabled={isDisabled}
          sx={{ mr: 1 }}
          onClick={() => makeDecisionOnClick("REJECTED")}
          variant="outlined"
        >
          Reject
        </Button>
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
          <Users formik={formik} isDisabled={true} />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <Quotas
            formik={formik}
            isDisabled={isDisabled}
            currentProjectQuota={currentProjectQuota}
          />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <CommonComponents formik={formik} isDisabled={true} />
        </div>
      </Container>
    </div>
  );
}
