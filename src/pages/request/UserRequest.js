import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import MetaDataInput from "../../components/forms/MetaDataInput";
import ClusterInput from "../../components/forms/ClusterInput";
import QuotaInput from "../../components/forms/QuotaInput";
import MinistryInput from "../../components/forms/MinistryInput";
import NavToolbar from "../../components/NavToolbar";
import {
  projectInitialValues as initialValues,
  replaceNullsWithEmptyString
} from "../../components/common/FormHelpers";
import CommonComponents from "../../components/forms/CommonComponents";
import { useParams } from "react-router-dom";
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

  const name =
    request?.type === "CREATE" ? requestedProject?.name : project?.name;

  return (
    <div>
      <NavToolbar path={"request"} title={name}></NavToolbar>
      <Container>
        <MetaDataInput formik={formik} isDisabled={true} />
        <div style={{ marginLeft: 50 }}>
          <div style={{ display: "flex" }}>
            <MinistryInput formik={formik} isDisabled={true} />
            <ClusterInput formik={formik} isDisabled={true} />
          </div>
          <div>
            <QuotaInput
              nameSpace={"production"}
              formik={formik}
              isDisabled={true}
            />
            <QuotaInput nameSpace={"test"} formik={formik} isDisabled={true} />
            <QuotaInput nameSpace={"tools"} formik={formik} isDisabled={true} />
            <QuotaInput
              nameSpace={"development"}
              formik={formik}
              isDisabled={true}
            />
          </div>
          <CommonComponents formik={formik} isDisabled={true} />
        </div>
      </Container>
    </div>
  );
}
