import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import MetaDataInput from "../../components/forms/MetaDataInput";
import ClusterInput from "../../components/forms/ClusterInput";
import MinistryInput from "../../components/forms/MinistryInput";
import NavToolbar from "../../components/NavToolbar";
import {
  projectInitialValues as initialValues,
  replaceNullsWithEmptyString,
} from "../../components/common/FormHelpers";
import CommonComponents from "../../components/forms/CommonComponents";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import Container from "../../components/common/Container";
import Users from "../../components/forms/Users";
import Divider from "@mui/material/Divider";
import Quotas from "../../components/forms/Quotas";

const USER_REQUEST = gql`
  query Query($requestId: ID!) {
    userPrivateCloudRequestById(requestId: $requestId) {
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

export default function UserRequest() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(USER_REQUEST, {
    variables: { requestId: id },
  });

  const { project, requestedProject, ...request } =
    data?.userPrivateCloudRequestById || {};

  const formik = useFormik({
    initialValues,
  });

  useEffect(() => {
    if (requestedProject) {
      // Form values cannon be null (uncontrolled input error), so replace nulls with empty strings
      formik.setValues(replaceNullsWithEmptyString(requestedProject));
    }
  }, [requestedProject]);

  const name =
    request?.type === "CREATE" ? requestedProject?.name : project?.name;
  const isDisabled = !requestedProject || request?.decisionStatus !== "PENDING";

  return (
    <div>
      <NavToolbar path={"request"} title={name}></NavToolbar>
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
          <Quotas formik={formik} isDisabled={true} />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <CommonComponents formik={formik} isDisabled={true} />
        </div>
      </Container>
    </div>
  );
}
