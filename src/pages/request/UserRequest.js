import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import MetaDataInput from "../../components/plainText/MetaDataInput";
import ClusterInput from "../../components/plainText/ClusterInput";
import MinistryInput from "../../components/plainText/MinistryInput";
import NavToolbar from "../../components/NavToolbar";
import { projectInitialValues as initialValues } from "../../components/common/FormHelpers";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import Container from "../../components/common/Container";
import Users from "../../components/plainText/Users";
import Divider from "@mui/material/Divider";
import Quotas from "../../components/plainText/Quotas";
import Namespaces from "../../components/Namespaces";
import TitleTypography from "../../components/common/TitleTypography";
import { Typography } from "@mui/material";
import { Box } from "@mui/material"
const USER_REQUEST = gql`
  query UserPrivateCloudRequestById($requestId: ID!) {
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

export default function UserRequest() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(USER_REQUEST, {
    variables: { requestId: id },
  });

  const { project, requestedProject, ...request } =
    data?.userPrivateCloudRequestById || {};

  const name =
    request?.type === "CREATE" ? requestedProject?.name : project?.name;

  return (
    <div>
      <NavToolbar
        label={"requests"}
        path={"user/dashboard/requests"}
        title={name}
      ></NavToolbar>
      <Container>
        <MetaDataInput
          name={requestedProject?.name}
          description={requestedProject?.description}
        />
        <MinistryInput ministry={requestedProject?.ministry} />
        <Box
          sx={{ pt: 2 }}
        >
          <ClusterInput cluster={requestedProject?.cluster} />
        </Box>
        <div>
          {request?.type !== "CREATE" ? (
            <div>
              <Namespaces
                cluster={requestedProject?.cluster}
                licencePlate={requestedProject?.licencePlate}
              />
              <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
            </div>
          ) : null}
          <Users
            projectOwner={requestedProject?.projectOwner}
            primaryTechnicalLead={requestedProject?.primaryTechnicalLead}
            secondaryTechnicalLead={requestedProject?.secondaryTechnicalLead}
          />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <Quotas project={project} requestedProject={requestedProject} active={request.active} />
          <Divider variant="middle" sx={{ mb: 6 }} />
        </div>
        {request?.humanCommentText && (
          <>
            <Divider variant="middle" sx={{ mt: 1, mb: 5 }} />,
            <TitleTypography> Reviewer’s comments</TitleTypography>,
            <Typography sx={{ mb: 6, maxWidth: 600 }} color="text.primary">
              {request?.humanCommentText}
            </Typography>
          </>
        )}
      </Container>
    </div>
  );
}
