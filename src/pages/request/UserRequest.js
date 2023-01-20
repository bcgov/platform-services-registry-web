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
import { useParams, useNavigate } from "react-router-dom";
import { USER_ACTIVE_REQUESTS } from "../requests/UserRequests";
import { ALL_ACTIVE_REQUESTS } from "../requests/AdminRequests";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Container from "../../components/common/Container";

const ADMIN_REQUEST = gql`
  query Query($requestId: ID!) {
    userPrivateCloudActiveRequestById(requestId: $requestId) {
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
        productionQuota: productionQuotaSelected {
          cpu
          memory
          storage
        }
        testQuota: testQuotaSelected {
          cpu
          memory
          storage
        }
        developmentQuota: developmentQuotaSelected {
          cpu
          memory
          storage
        }
        toolsQuota: toolsQuotaSelected {
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

  const { data, loading, error } = useQuery(ADMIN_REQUEST, {
    variables: { requestId: id }
  });

  const { project, requestedProject, ...request } =
    data?.userPrivateCloudActiveRequestById || {};

  const formik = useFormik({
    initialValues
  });

  useEffect(() => {
    if (requestedProject) {
      // Form values cannon be null (uncontrolled input error), so replace nulls with empty strings
      formik.setValues(replaceNullsWithEmptyString(requestedProject));
    }
  }, [requestedProject]);

  console.log(requestedProject);

  const name =
    request?.type === "CREATE" ? requestedProject?.name : project?.name;

  return (
    <div>
      <NavToolbar path={"request"} title={name}></NavToolbar>
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
