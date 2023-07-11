import { useRef, useState, useContext } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import MetaDataInput from "../../../components/plainText/MetaDataInput";
import MinistryInput from "../../../components/plainText/MinistryInput";
import ProviderInput from "../../../components/plainText/ProviderInput";
import AccountCoding from "../../../components/plainText/AccountCoding";
import NavToolbar from "../../../components/NavToolbar";
import TitleTypography from "../../../components/common/TitleTypography";
import { Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { USER_REQUESTS } from "../../requests/UserRequests";
import { ALL_ACTIVE_REQUESTS } from "../../requests/AdminRequests";
import { toast } from "react-toastify";
import Container from "../../../components/common/Container";
import Users from "../../../components/plainText/Users";
import Divider from "@mui/material/Divider";
import Quotas from "../../../components/plainText/Quotas";
import Namespaces from "../../../components/Namespaces";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import ReProvisionButton from "../../../components/ReProvisionButton";
import ReadOnlyAdminContext from "../../../context/readOnlyAdmin";

const ADMIN_REQUEST = gql`
  query PublicCloudRequestById($requestId: ID!) {
    publicCloudRequestById(requestId: $requestId) {
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

const MAKE_REQUEST_DECISION = gql`
  mutation PublicCloudRequestDecision(
    $requestId: ID!
    $decision: RequestDecision!
    $humanComment: String
  ) {
    publicCloudRequestDecision(
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
  mutation PublicCloudReProvisionRequest($requestId: ID!) {
    publicCloudReProvisionRequest(requestId: $requestId) {
      id
    }
  }
`;

export default function AdminRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toastId = useRef(null);
  const [humanCommentInput, setHumanCommentInput] = useState(null);
  const { readOnlyAdmin } = useContext(ReadOnlyAdminContext);

  const { data, loading, error } = useQuery(ADMIN_REQUEST, {
    variables: { requestId: id }
  });

  console.log(data);

  const { project, requestedProject, ...request } =
    data?.publicCloudRequestById || {};

  const [
    publicCloudRequestDecision,
    { data: decisionData, loading: decisionLoading, error: decisionError }
  ] = useMutation(MAKE_REQUEST_DECISION, {
    refetchQueries: [{ query: USER_REQUESTS }, { query: ALL_ACTIVE_REQUESTS }]
  });

  const [
    publicCloudReProvisionRequest,
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

    publicCloudReProvisionRequest({
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
    publicCloudRequestDecision({
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

  const name =
    request?.type === "CREATE" ? requestedProject?.name : project?.name;
  const isDisabled = !requestedProject || request?.decisionStatus !== "PENDING";

  return (
    <div>
      <NavToolbar
        label={"requests"}
        path={"admin/dashboard/requests"}
        title={name}
      >
        {request?.decisionStatus === "APPROVED" && request?.active === true ? (
          <ReProvisionButton onClickHandler={reProvisionOnClick} />
        ) : null}
      </NavToolbar>
      <Container>
        <MetaDataInput
          name={requestedProject?.name}
          description={requestedProject?.description}
        />
        <MinistryInput ministry={requestedProject?.ministry} />
        <ProviderInput provider={requestedProject?.provider} />
        <AccountCoding accountCoding={requestedProject?.accountCoding} />
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

          <Divider variant="middle" sx={{ mb: 6 }} />
          
        </div>
        <TitleTypography sx={{ mt: 3, mb: 1 }}>
          Reviewer’s comments
        </TitleTypography>
        <TextField
          fullWidth
          id="humanComment"
          name="humanComment"
          placeholder="Provide feedback to the PO/TC regarding your decision for this product"
          value={request?.humanComment}
          onChange={(e) => setHumanCommentInput(e.target.value)}
          size="small"
          style={{ display: "block", width: "700px", maxWidth: "100%" }}
          multiline
          rows={4}
        />
        {!readOnlyAdmin && (
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
        )}
      </Container>
    </div>
  );
}
