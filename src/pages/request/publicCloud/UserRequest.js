import { useQuery, gql } from "@apollo/client";
import MetaDataInput from "../../../components/plainText/MetaDataInput";
import AccountCoding from "../../../components/plainText/AccountCoding";
import ProviderInput from "../../../components/plainText/ProviderInput";
import MinistryInput from "../../../components/plainText/MinistryInput";
import NavToolbar from "../../../components/NavToolbar";
import { useParams } from "react-router-dom";
import Container from "../../../components/common/Container";
import Users from "../../../components/plainText/Users";
import Divider from "@mui/material/Divider";
import Budget from "../../../components/plainText/Budget";
import EnterpriseSupport from "../../../components/plainText/EnterpriseSupport";
import TitleTypography from "../../../components/common/TitleTypography";
import { Typography } from "@mui/material";

const USER_REQUEST = gql`
  query UserPublicCloudRequestById($requestId: ID!) {
    userPublicCloudRequestById(requestId: $requestId) {
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
      }
      requestedProject {
        id
        name
        licencePlate
        description
        accountCoding
        status
        budget {
          dev
          test
          prod
          tools
        }
        enterpriseSupport {
          dev
          test
          tools
          prod
        }
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
        provider
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
    data?.userPublicCloudRequestById || {};

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
        <ProviderInput provider={requestedProject?.provider} />
        <AccountCoding accountCoding={requestedProject?.accountCoding} />
        <div>
        {requestedProject?.budget && <Budget
            budget={requestedProject?.budget}
          />}
          <Users
            projectOwner={requestedProject?.projectOwner}
            primaryTechnicalLead={requestedProject?.primaryTechnicalLead}
            secondaryTechnicalLead={requestedProject?.secondaryTechnicalLead}
          />
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
