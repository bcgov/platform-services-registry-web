import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import MetaDataInput from "../../components/MetaDataInput";
import ClusterInput from "../../components/ClusterInput";
import QuotaInput from "../../components/QuotaInput";
import NavToolbar from "../../components/NavToolbar";
import {
  userProjectToFormData,
  projectFormSchema as schema
} from "../../components/common/FormHelpers";
import CommonComponents from "../../components/CommonComponents";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import StyledForm from "../../components/common/StyledForm";

const USER_REQUEST = gql`
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
            cpuRequests
            cpuLimits
            memoryRequests
            memoryLimits
            storageFile
            snapshotCount
          }
          testQuota {
            cpuRequests
            cpuLimits
            memoryRequests
            memoryLimits
            storageFile
            snapshotCount
          }
          developmentQuota {
            cpuRequests
            cpuLimits
            memoryRequests
            memoryLimits
            storageFile
            snapshotCount
          }
          toolsQuota {
            cpuRequests
            cpuLimits
            memoryRequests
            memoryLimits
            storageFile
            snapshotCount
          }
        }
      }
    }
  }
`;

export default function Request() {
  const { id } = useParams();

  const {
    loading: userRequestLoading,
    data: userRequestData,
    error: userRequestError
  } = useQuery(USER_REQUEST, {
    variables: { requestId: id }
  });

  const {
    control,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const userPrivateCloudRequest =
    userRequestData?.userPrivateCloudActiveRequestById;

  useEffect(() => {
    if (!userRequestLoading && !userRequestError) {
      reset(userProjectToFormData(userPrivateCloudRequest.requestedProject));
    }
  }, [userRequestLoading, userRequestError, userPrivateCloudRequest, reset]);

  if (userRequestError) return `Error! ${userRequestError}`;

  const name =
    userPrivateCloudRequest?.type === "CREATE"
      ? userPrivateCloudRequest?.requestedProject?.name
      : userPrivateCloudRequest?.project?.name;

  return (
    <div>
      <NavToolbar path={"request"} title={name} />
      <FormProvider
        {...{
          control,
          errors,
          setValue,
          watch,
          initialValues: userProjectToFormData(
            userPrivateCloudRequest?.requestedProject
          ),
          isDisabled: userPrivateCloudRequest?.active
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
    </div>
  );
}
