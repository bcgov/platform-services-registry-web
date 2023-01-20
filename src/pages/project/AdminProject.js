import React, { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import MetaDataInput from "../../components/MetaDataInput";
import ClusterInput from "../../components/ClusterInput";
import QuotaInput from "../../components/QuotaInput";
import NavToolbar from "../../components/NavToolbar";
import {
  projectInitialValues,
  replaceNullsWithEmptyString
} from "../../components/common/FormHelpers";
import CommonComponents from "../../components/CommonComponents";
import { useParams, useNavigate } from "react-router-dom";
import { USER_ACTIVE_REQUESTS } from "../requests/UserRequests";
import { ALL_ACTIVE_REQUESTS } from "../requests/AdminRequests";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Container from "../../components/common/Container";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, IconButton } from "@mui/material";

const ADMIN_PROJECT = gql`
  query Query($projectId: ID!) {
    privateCloudProjectById(projectId: $projectId) {
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
`;

const UPDATE_USER_PROJECT = gql`
  mutation Mutation(
    $projectId: ID!
    $name: String!
    $description: String!
    $ministry: String
    $projectOwner: CreateUserInput
    $primaryTechnicalLead: CreateUserInput
    $secondaryTechnicalLead: CreateUserInput
    $commonComponents: CommonComponentsInput
    $productionQuota: QuotaInput
    $developmentQuota: QuotaInput
    $testQuota: QuotaInput
    $toolsQuota: QuotaInput
  ) {
    privateCloudProjectEditRequest(
      projectId: $projectId
      name: $name
      description: $description
      ministry: $ministry
      projectOwner: $projectOwner
      primaryTechnicalLead: $primaryTechnicalLead
      secondaryTechnicalLead: $secondaryTechnicalLead
      commonComponents: $commonComponents
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

const DELETE_USER_PROJECT = gql`
  mutation Mutation($projectId: ID!) {
    privateCloudProjectDeleteRequest(projectId: $projectId) {
      id
    }
  }
`;

export default function AdminProject({ requestsRoute }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const toastId = useRef(null);

  const [initialValues, setInitialValues] = useState(projectInitialValues);

  const { data, loading, error, refetch } = useQuery(ADMIN_PROJECT, {
    variables: { projectId: id }
  });

  const project = data?.privateCloudProjectById || {};

  const [
    privateCloudRequestDecision,
    { data: decisionData, loading: decisionLoading, error: decisionError }
  ] = useMutation(MAKE_REQUEST_DECISION, {
    refetchQueries: [
      { query: USER_ACTIVE_REQUESTS },
      { query: ALL_ACTIVE_REQUESTS }
    ]
  });

  const [
    createPrivateCloudProjectEditRequest,
    {
      data: editProjectData,
      loading: editProjectLoading,
      error: editProjectError
    }
  ] = useMutation(UPDATE_USER_PROJECT, {
    refetchQueries: [
      { query: USER_ACTIVE_REQUESTS },
      { query: ALL_ACTIVE_REQUESTS }
    ]
  });

  const [deletePrivateCloudProjectRequest] = useMutation(DELETE_USER_PROJECT, {
    refetchQueries: [
      { query: USER_ACTIVE_REQUESTS },
      { query: ALL_ACTIVE_REQUESTS }
    ]
  });

  const deleteOnClick = () => {
    toastId.current = toast("Your edit request has been submitted", {
      autoClose: false
    });

    deletePrivateCloudProjectRequest({
      variables: { projectId: id },
      onError: (error) => {
        toast.update(toastId.current, {
          render: `Error: ${error.message}`,
          type: toast.TYPE.ERROR,
          autoClose: 5000
        });
      },
      onCompleted: () => {
        navigate(requestsRoute);
        toast.update(toastId.current, {
          render: "Delete request successfuly created",
          type: toast.TYPE.SUCCESS,
          autoClose: 5000
        });
      }
    });
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  useEffect(() => {
    if (data) {
      // Form values cannon be null (uncontrolled input error), so replace nulls with empty strings
      setInitialValues(replaceNullsWithEmptyString(project));
    }
  }, [data]);

  const name = project?.name;

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <NavToolbar path={"request"} title={name}>
          <IconButton
            sx={{ mr: 2 }}
            disabled={!formik.dirty}
            onClick={() => {
              refetch({ projectId: id });
            }}
            aria-label="delete"
          >
            <RestartAltIcon />
          </IconButton>
          <Button
            sx={{ mr: 1 }}
            type="submit"
            disabled={!formik.dirty}
            variant="outlined"
          >
            SUBMIT EDIT REQUEST
          </Button>
          <IconButton
            sx={{ mr: 1 }}
            onClick={deleteOnClick}
            aria-label="delete"
          >
            <DeleteForeverIcon />
          </IconButton>
        </NavToolbar>
        <Container>
          <MetaDataInput formik={formik} isDisabled={false} />
          <div style={{ marginLeft: 50 }}>
            <ClusterInput formik={formik} isDisabled={true} />
            <div>
              <QuotaInput
                nameSpace={"production"}
                formik={formik}
                isDisabled={false}
              />
              <QuotaInput
                nameSpace={"test"}
                formik={formik}
                isDisabled={false}
              />
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
      </form>
    </div>
  );
}
