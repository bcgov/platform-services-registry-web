import React, { useEffect, useRef, useState, useContext } from "react";
import * as yup from "yup";
import {
  MinistrySchema,
  BudgetInputSchema,
  ProviderSchema,
} from "../../../__generated__/resolvers-types";
import { useQuery, useMutation, gql } from "@apollo/client";
import MetaDataInput from "../../../components/forms/MetaDataInput";
import ProviderInput from "../../../components/forms/ProviderInput";
import MinistryInput from "../../../components/forms/MinistryInput";
import NavToolbar from "../../../components/NavToolbar";
import {
  createPublicCloudProjectInputInitalValues as projectInitialValues,
  replaceNullsWithEmptyString,
  replaceEmptyStringWithNull,
  stripTypeName,
} from "../../../components/common/FormHelpers";
import { useParams, useNavigate } from "react-router-dom";
import { USER_REQUESTS } from "../../requests/UserRequests";
import { ALL_ACTIVE_REQUESTS } from "../../requests/AdminRequests";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Container from "../../../components/common/Container";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Button, IconButton } from "@mui/material";
import ActiveRequestText from "../../../components/common/ActiveRequestText";
import Users from "../../../components/forms/Users";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import RolesContext from "../../../context/roles";
import UserContext from "../../../context/user";
import AccountCodingInput from "../../../components/forms/AccountCoding";
import BudgetInput from "../../../components/forms/Budget";
import ProviderPlainText from "../../../components/plainText/ProviderInput";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeletePublic from "../../../components/DeletePublic";
import { default as MetaDataPlainText } from "../../../components/plainText/MetaDataInput";
import { default as AccountCodingPlainText } from "../../../components/plainText/AccountCoding";
import { default as MinistryPlainText } from "../../../components/plainText/MinistryInput";
import { default as UsersPlainText } from "../../../components/plainText/Users";
import { default as BudgetPlainText } from "../../../components/plainText/Budget";

const ADMIN_PROJECT = gql`
  query PublicCloudProjectById($projectId: ID!) {
    publicCloudProjectById(projectId: $projectId) {
      id
      name
      licencePlate
      description
      status
      accountCoding
      budget {
        prod
        dev
        test
        tools
      }
      activeEditRequest {
        active
        id
      }
      projectOwner {
        email
        firstName
        lastName
        ministry
        upn
        idir
      }
      primaryTechnicalLead {
        email
        firstName
        lastName
        ministry
        upn
        idir
      }
      secondaryTechnicalLead {
        email
        firstName
        lastName
        ministry
        upn
        idir
      }
      ministry
      provider
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation Mutation(
    $projectId: ID!
    $name: String!
    $description: String!
    $ministry: Ministry!
    $accountCoding: String!
    $budget: BudgetInput!
    $projectOwner: CreateUserInput!
    $primaryTechnicalLead: CreateUserInput!
    $secondaryTechnicalLead: CreateUserInput
  ) {
    publicCloudProjectEditRequest(
      projectId: $projectId
      name: $name
      description: $description
      ministry: $ministry
      projectOwner: $projectOwner
      accountCoding: $accountCoding
      budget: $budget
      primaryTechnicalLead: $primaryTechnicalLead
      secondaryTechnicalLead: $secondaryTechnicalLead
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
    publicCloudProjectDeleteRequest(
      projectId: $projectId
      licencePlate: $licencePlate
      projectOwnerEmail: $projectOwnerEmail
    ) {
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
  provider: ProviderSchema.required(),
  accountCoding: yup
    .string()
    .transform((value) => value.replace(/\s/g, ""))
    .max(24)
    .required(),
  budget: BudgetInputSchema().required(),
  projectOwner: CreateUserInputSchema,
  primaryTechnicalLead: CreateUserInputSchema,
  secondaryTechnicalLead: CreateUserInputSchema.nullable(),
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
    userContext.email === data?.publicCloudProjectById.projectOwner.email ||
    userContext.email ===
      data?.publicCloudProjectById?.primaryTechnicalLead?.email ||
    userContext.email ===
      data?.publicCloudProjectById?.secondaryTechnicalLead?.email;

  const [
    publicCloudProjectEditRequest,
    {
      data: editProjectData,
      loading: editProjectLoading,
      error: editProjectError,
    },
  ] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: USER_REQUESTS }, { query: ALL_ACTIVE_REQUESTS }],
  });

  const [publicCloudProjectDeleteRequest] = useMutation(DELETE_USER_PROJECT, {
    refetchQueries: [{ query: USER_REQUESTS }, { query: ALL_ACTIVE_REQUESTS }],
  });

  const deleteOnClick = (licencePlate, projectOwnerEmail) => {
    toastId.current = toast("Your edit request has been submitted", {
      autoClose: false,
    });

    publicCloudProjectDeleteRequest({
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

    publicCloudProjectEditRequest({
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

        if (data?.publicCloudProjectEditRequest) {
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
      setInitialValues(stripTypeName(data?.publicCloudProjectById));
    }
  }, [data]);

  const name = data?.publicCloudProjectById?.name;
  const isDisabled = !!data?.publicCloudProjectById?.activeEditRequest;

  const handleClose = () => setOpen(false);
  const handleDeleteClose = () => setDeleteOpen(false);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <NavToolbar
          label={"products"}
          path={"admin/dashboard/public-cloud-products"}
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
            onClose={handleDeleteClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DeletePublic
              projectId={id}
              name={data?.publicCloudProjectById?.name}
              licencePlate={data?.publicCloudProjectById?.licencePlate}
              projectOwnerEmail={
                data?.publicCloudProjectById?.projectOwner?.email
              }
              deleteOnClick={deleteOnClick}
            />
          </Modal>
        </NavToolbar>
        {isDisabled ? (
          <ActiveRequestText
            requestId={data?.publicCloudProjectById?.activeEditRequest?.id}
          />
        ) : null}
        <Container>
          {isDisabled ? (
            <MetaDataPlainText
              name={name}
              description={data?.publicCloudProjectById?.description}
            />
          ) : (
            [
              <MetaDataInput formik={formik} isDisabled={isDisabled} />,
              <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />,
            ]
          )}

          <div>
            {isDisabled ? (
              [
                <MinistryPlainText
                  ministry={data?.publicCloudProjectById?.ministry}
                />,
                <ProviderPlainText
                  provider={data?.publicCloudProjectById?.provider}
                />,
              ]
            ) : (
              <div style={{ display: "flex" }}>
                <MinistryInput formik={formik} isDisabled={isDisabled} />
                <Box sx={{ pt: 3 }}>
                  <ProviderPlainText provider={formik.initialValues.provider} />
                </Box>
              </div>
            )}

            {isDisabled ? (
              <AccountCodingPlainText
                accountCoding={data?.publicCloudProjectById?.accountCoding}
              />
            ) : (
              [
                <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />,
                <AccountCodingInput formik={formik} isDisabled={isDisabled} />,
              ]
            )}

            {isDisabled
              ? [
                  <BudgetPlainText
                    budget={data?.publicCloudProjectById?.budget}
                  />,
                  <UsersPlainText
                    projectOwner={data?.publicCloudProjectById?.projectOwner}
                    primaryTechnicalLead={
                      data?.publicCloudProjectById?.primaryTechnicalLead
                    }
                    secondaryTechnicalLead={
                      data?.publicCloudProjectById?.secondaryTechnicalLead
                    }
                  />,
                ]
              : [
                  <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />,
                  <Users formik={formik} isDisabled={false} />,
                  <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />,
                  <BudgetInput formik={formik} isDisabled={isDisabled} />,
                  <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />,
                ]}

            {!readOnlyAdmin || readOnlyAdminIsAbleToEdit ? (
              <Button
                type="submit"
                disabled={!formik.dirty}
                sx={{ mr: 1, width: "170px" }}
                variant="contained"
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
