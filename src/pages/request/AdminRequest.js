import React, { useEffect, useRef } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import MetaDataInput from "../../components/MetaDataInput";
import ClusterInput from "../../components/ClusterInput";
import QuotaInput from "../../components/QuotaInput";
import NavToolbar from "../../components/NavToolbar";
import {
  projectInitialValues as initialValues,
  replaceNullsWithEmptyString
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
import { useFormik } from "formik";
import Container from "../../components/common/Container";

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
      }
      requestedProject {
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
          noServices
          other
        }
        productionQuotaSelected {
          cpu
          memory
          storage
        }
        testQuotaSelected {
          cpu
          memory
          storage
        }
        developmentQuotaSelected {
          cpu
          memory
          storage
        }
        toolsQuotaSelected {
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

  const { data, loading, error } = useQuery(ADMIN_REQUEST, {
    variables: { requestId: id }
  });

  const { project, requestedProject, ...request } =
    data?.privateCloudActiveRequestById || {};

  const [
    privateCloudRequestDecision,
    { data: decisionData, loading: decisionLoading, error: decisionError }
  ] = useMutation(MAKE_REQUEST_DECISION, {
    refetchQueries: [
      { query: USER_ACTIVE_REQUESTS },
      { query: ALL_ACTIVE_REQUESTS }
    ]
  });

  const makeDecisionOnClick = (decision) => {
    toastId.current = toast("Your decision has been submitted", {
      autoClose: false
    });
    privateCloudRequestDecision({
      variables: { requestId: id, decision },
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

  const name =
    request?.type === "CREATE" ? requestedProject?.name : project?.name;
  const decisionAlreadyMade =
    !requestedProject || request?.decisionStatus !== "PENDING";

  return (
    <div>
      <NavToolbar path={"request"} title={name}>
        <Button
          disabled={decisionAlreadyMade}
          sx={{ mr: 1 }}
          onClick={() => makeDecisionOnClick("APPROVED")}
          variant="outlined"
        >
          Approve
        </Button>
        <Button
          disabled={decisionAlreadyMade}
          sx={{ mr: 1 }}
          onClick={() => makeDecisionOnClick("REJECTED")}
          variant="outlined"
        >
          Reject
        </Button>
      </NavToolbar>
      <Container>
        <MetaDataInput formik={formik} isDisabled={false} />
        <div style={{ marginLeft: 50 }}>
          <ClusterInput formik={formik} isDisabled={false} />
          <div>
            <QuotaInput
              nameSpace={"production"}
              formik={formik}
              isDisabled={false}
            />
            <QuotaInput nameSpace={"test"} formik={formik} isDisabled={false} />
            <QuotaInput
              nameSpace={"tools"}
              formik={formik}
              isDisabled={false}
            />
            <QuotaInput
              nameSpace={"development"}
              formik={formik}
              isDisabled={false}
            />
          </div>
          <CommonComponents formik={formik} isDisabled={false} />
        </div>
      </Container>
    </div>
  );
}
