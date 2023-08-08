import React, { useEffect, useRef, useState, useContext } from "react";
import * as yup from "yup";
import {
  // CreateUserInputSchema,
  CommonComponentsInputSchema,
  QuotaInputSchema,
  MinistrySchema,
  ClusterSchema,
} from "../../../__generated__/resolvers-types";
import { useQuery, useMutation, gql } from "@apollo/client";
import MetaDataInput from "../../../components/forms/MetaDataInput";
import ClusterInputText from "../../../components/plainText/ClusterInput";
import MinistryInput from "../../../components/forms/MinistryInput";
import NavToolbar from "../../../components/NavToolbar";
import {
  projectInitialValues,
  replaceNullsWithEmptyString,
  replaceEmptyStringWithNull,
  stripTypeName,
} from "../../../components/common/FormHelpers";
import CommonComponents from "../../../components/forms/CommonComponents";
import { useParams, useNavigate } from "react-router-dom";
import { USER_REQUESTS } from "../../requests/UserRequests";
import { ALL_ACTIVE_REQUESTS } from "../../requests/AdminRequests";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Container from "../../../components/common/Container";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, IconButton } from "@mui/material";
import ActiveRequestText from "../../../components/common/ActiveRequestText";
import Users from "../../../components/forms/Users";
import Divider from "@mui/material/Divider";
import Quotas from "../../../components/forms/Quotas";
import Namespaces from "../../../components/Namespaces";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ReProvisionButton from "../../../components/ReProvisionButton";
import RolesContext from "../../../context/roles";
import UserContext from "../../../context/user";
import Tooltip from "@mui/material/Tooltip";

const ADMIN_PROJECT = gql`
  query PrivateCloudProjectById($projectId: ID!) {
    privateCloudProjectById(projectId: $projectId) {
      id
      name
      licencePlate
      description
      status
      activeEditRequest {
        active
        id
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
`;

const UPDATE_USER_PROJECT = gql`
  mutation Mutation(
    $projectId: ID!
    $name: String!
    $description: String!
    $ministry: Ministry!
    $projectOwner: CreateUserInput!
    $primaryTechnicalLead: CreateUserInput!
    $secondaryTechnicalLead: CreateUserInput
    $commonComponents: CommonComponentsInput!
    $productionQuota: QuotaInput!
    $developmentQuota: QuotaInput!
    $testQuota: QuotaInput!
    $toolsQuota: QuotaInput!
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

const DELETE_USER_PROJECT = gql`
  mutation Mutation(
    $projectId: ID!
    $licencePlate: String!
    $projectOwnerEmail: EmailAddress!
  ) {
    privateCloudProjectDeleteRequest(
      projectId: $projectId
      licencePlate: $licencePlate
      projectOwnerEmail: $projectOwnerEmail
    ) {
      id
    }
  }
`;

const RE_PROVISION_PROJECT = gql`
  mutation PrivateCloudReProvisionProject($projectId: ID!) {
    privateCloudReProvisionProject(projectId: $projectId) {
      id
    }
  }
`;

const CreateUserInputSchema = yup.object({
  email: yup.string().defined(),
  firstName: yup.string().defined(),
  lastName: yup.string().defined(),
  ministry: yup.string(),
});

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  ministry: MinistrySchema.required(),
  cluster: ClusterSchema.required(),
  projectOwner: CreateUserInputSchema,
  primaryTechnicalLead: CreateUserInputSchema,
  secondaryTechnicalLead: CreateUserInputSchema.nullable(),

  commonComponents: yup
    .object(CommonComponentsInputSchema)
    .transform((value, original) => {
      return replaceEmptyStringWithNull(value);
    }),
  // commonComponents: CommonComponentsInputSchema(),
  productionQuota: yup.object(QuotaInputSchema).required(),
  developmentQuota: yup.object(QuotaInputSchema).required(),
  toolsQuota: yup.object(QuotaInputSchema).required(),
  testQuota: yup.object(QuotaInputSchema).required(),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AdminProject({ requestsRoute }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const toastId = useRef(null);
  const { readOnlyAdmin } = useContext(RolesContext);
  const userContext = useContext(UserContext);
  const [initialValues, setInitialValues] = useState(projectInitialValues);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data, loading, error, refetch } = useQuery(ADMIN_PROJECT, {
    variables: { projectId: id },
    nextFetchPolicy: "cache-and-network",
  });

  const readOnlyAdminIsAbleToEdit =
    userContext.email === data?.privateCloudProjectById.projectOwner.email ||
    userContext.email ===
      data?.privateCloudProjectById?.primaryTechnicalLead?.email ||
    userContext.email ===
      data?.privateCloudProjectById?.secondaryTechnicalLead?.email;

  const [
    privateCloudProjectEditRequest,
    {
      data: editProjectData,
      loading: editProjectLoading,
      error: editProjectError,
    },
  ] = useMutation(UPDATE_USER_PROJECT, {
    refetchQueries: [{ query: USER_REQUESTS }, { query: ALL_ACTIVE_REQUESTS }],
  });

  const [privateCloudProjectDeleteRequest] = useMutation(DELETE_USER_PROJECT, {
    refetchQueries: [{ query: USER_REQUESTS }, { query: ALL_ACTIVE_REQUESTS }],
  });

  const deleteOnClick = (licencePlate, projectOwnerEmail) => {
    toastId.current = toast("Your edit request has been submitted", {
      autoClose: false,
    });

    privateCloudProjectDeleteRequest({
      variables: {
        projectId: id,
        licencePlate,
        projectOwnerEmail,
      },
      onError: (error) => {
        toast.update(toastId.current, {
          render: `Error: ${error.message}`,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        });
      },
      onCompleted: () => {
        navigate(requestsRoute);
        toast.update(toastId.current, {
          render: "Delete request successfuly created",
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
        });
      },
    });
  };

  const [
    privateCloudReProvisionProject,
    {
      data: reprovisionData,
      loading: reprovisionLoading,
      error: reprovisionError,
    },
  ] = useMutation(RE_PROVISION_PROJECT, {
    refetchQueries: [{ query: USER_REQUESTS }, { query: ALL_ACTIVE_REQUESTS }],
  });

  const reProvisionOnClick = () => {
    toastId.current = toast("Re provisioning request has been submitted", {
      autoClose: false,
    });

    privateCloudReProvisionProject({
      variables: { projectId: id },
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
          render: "Re provisioning request successful",
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
        });
      },
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const result = await formik.validateForm();
      if (Object.keys(result).length === 0 && formik.dirty) {
        // Submit the form only if there are no errors and the form has been touched
        setOpen(true);
      }
    },
  });

  const submitForm = () => {
    const { values } = formik;

    toastId.current = toast("Your edit request has been submitted", {
      autoClose: false,
    });

    const variables = validationSchema.cast(values);

    privateCloudProjectEditRequest({
      variables: { projectId: id, ...variables },
      onError: (error) => {
        toast.update(toastId.current, {
          render: `Error: ${error.message}`,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        });
      },

      onCompleted: (data) => {
        navigate(requestsRoute);

        if (data?.privateCloudProjectEditRequest) {
          toast.update(toastId.current, {
            render: "Request successfuly created",
            type: toast.TYPE.SUCCESS,
            autoClose: 5000,
          });
        }
      },
    });
  };

  useEffect(() => {
    if (data) {
      setInitialValues(stripTypeName(data?.privateCloudProjectById));
    }
  }, [data]);

  const name = data?.privateCloudProjectById?.name;
  const isDisabled = !!data?.privateCloudProjectById?.activeEditRequest;

  const handleClose = () => setOpen(false);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <NavToolbar
          label={"products"}
          path={"admin/dashboard/private-cloud-products"}
          title={name}
        >
          <IconButton
            disabled={!formik.dirty}
            onClick={() => formik.resetForm()}
            // type="reset"
            aria-label="reset"
          >
            <RestartAltIcon />
          </IconButton>
          <IconButton
            disabled={isDisabled}
            onClick={() => setDeleteOpen(true)}
            aria-label="delete"
          >
            <DeleteForeverIcon />
          </IconButton>
          <Modal
            open={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Delete
              projectId={id}
              name={data?.privateCloudProjectById?.name}
              licencePlate={data?.privateCloudProjectById?.licencePlate}
              projectOwnerEmail={
                data?.privateCloudProjectById?.projectOwner?.email
              }
              deleteOnClick={deleteOnClick}
            />
          </Modal>
          {!readOnlyAdmin && (
            <ReProvisionButton onClickHandler={reProvisionOnClick} />
          )}
        </NavToolbar>
        {isDisabled ? (
          <ActiveRequestText
            requestId={data?.privateCloudProjectById?.activeEditRequest?.id}
          />
        ) : null}
        <Container>
          <MetaDataInput formik={formik} isDisabled={isDisabled} />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <div>
            <div style={{ display: "flex" }}>
              <MinistryInput formik={formik} isDisabled={isDisabled} />
              <Box sx={{ pt: 5 }}>
                <ClusterInputText cluster={formik.values.cluster} />
              </Box>
            </div>
            <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
            <Namespaces
              cluster={data?.privateCloudProjectById?.cluster}
              licencePlate={data?.privateCloudProjectById?.licencePlate}
            />
            <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
            <Users formik={formik} isDisabled={isDisabled} />
            <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
            <Quotas formik={formik} isDisabled={isDisabled} />
            <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
            <CommonComponents formik={formik} isDisabled={isDisabled} />
            {!readOnlyAdmin || readOnlyAdminIsAbleToEdit ? (
              <Button
                type="submit"
                sx={{ mr: 1, width: "170px" }}
                variant="contained"
                disabled={isDisabled || !formik.dirty}
              >
                Submit
              </Button>
            ) : null}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Please Confirm Your Request
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Are you sure you want to edit this product?
                  <Button
                    onClick={submitForm}
                    disabled={!formik.dirty}
                    sx={{ mr: 1, width: "170px", mt: 3 }}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Typography>
              </Box>
            </Modal>
          </div>
        </Container>
      </form>
    </div>
  );
}
