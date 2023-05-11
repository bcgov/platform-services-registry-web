import React, { useEffect, useRef, useState, useContext } from "react";
import * as yup from "yup";
import {
  CreateUserInputSchema,
  CommonComponentsInputSchema,
  ProviderSchema,
  MinistrySchema,
  BudgetInputSchema
} from "../../../__generated__/resolvers-types";
import { useQuery, useMutation, gql } from "@apollo/client";
import MetaDataInput from "../../../components/forms/MetaDataInput";
import ClusterInput from "../../../components/forms/ClusterInput";
import MinistryInput from "../../../components/forms/MinistryInput";
import NavToolbar from "../../../components/NavToolbar";
import {
  projectInitialValues,
  replaceNullsWithEmptyString,
  replaceEmptyStringWithNull,
  stripTypeName
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
import ReadOnlyAdminContext from "../../../context/readOnlyAdmin";
import UserContext from "../../../context/user";
import Tooltip from "@mui/material/Tooltip";

const ADMIN_PROJECT = gql`
  query UserPublicCloudProjectById($projectId: ID!) {
    userPublicCloudProjectById(projectId: $projectId) {
      id
      name
      licencePlate
      description
      status
      billingGroup
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
      }
      technicalLeads {
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
`;

const UPDATE_PROJECT = gql`
  mutation Mutation(
    $projectId: ID!
    $name: String!
    $description: String!
    $ministry: Ministry!
    $billingGroup: String!
    $budget: BudgetInput!
    $projectOwner: CreateUserInput!
    $technicalLeads: [CreateUserInput!]!
    $commonComponents: CommonComponentsInput!
  ) {
    publicCloudProjectEditRequest(
      projectId: $projectId
      name: $name
      description: $description
      ministry: $ministry
      projectOwner: $projectOwner
      billingGroup: $billingGroup
      budget: $budget
      technicalLeads: $technicalLeads
    ) {
      id
      active
    }
  }
`;

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  ministry: MinistrySchema.required(),
  provider: ProviderSchema.required(),
  billingGroup: yup.string().required(),
  budget: BudgetInputSchema().required(),
  projectOwner: yup
    .object(CreateUserInputSchema)
    .transform((value, original) => {
      return replaceEmptyStringWithNull(value);
    }),
  primaryTechnicalLead: yup
    .object(CreateUserInputSchema)
    .transform((value, original) => {
      return replaceEmptyStringWithNull(value);
    }),
  secondaryTechnicalLead: yup
    .object(CreateUserInputSchema)
    .nullable()
    .transform((value) => (value?.email === "" ? null : value))
    .transform((value, original) => {
      return replaceEmptyStringWithNull(value);
    }),
  // technicalLeads: yup
  //   .array()
  //   .of(
  //     yup.object(CreateUserInputSchema).transform((value, original) => {
  //       return replaceEmptyStringWithNull(value);
  //     })
  //   )
  //   .min(1, "At least one technical lead is required")
  //   .required("Technical leads are required"),
  commonComponents: yup
    .object(CommonComponentsInputSchema)
    .transform((value, original) => {
      return replaceEmptyStringWithNull(value);
    })
  // commonComponents: CommonComponentsInputSchema(),
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
  p: 4
};

export default function AdminProject({ requestsRoute }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const toastId = useRef(null);
  const { readOnlyAdmin } = useContext(ReadOnlyAdminContext);
  const userContext = useContext(UserContext);
  const [initialValues, setInitialValues] = useState(projectInitialValues);
  const [open, setOpen] = useState(false);

  const { data, loading, error, refetch } = useQuery(ADMIN_PROJECT, {
    variables: { projectId: id },
    nextFetchPolicy: "cache-and-network"
  });

  const [
    publicCloudProjectEditRequest,
    {
      data: editProjectData,
      loading: editProjectLoading,
      error: editProjectError
    }
  ] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: USER_REQUESTS }, { query: ALL_ACTIVE_REQUESTS }]
  });

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
    }
  });

  const submitForm = () => {
    const { values } = formik;

    toastId.current = toast("Your edit request has been submitted", {
      autoClose: false
    });

    // Replace primary and secondary technical lead with an array of technical leads called technicalLeads
    const technicalLeads = [
      values.primaryTechnicalLead,
      values.secondaryTechnicalLead
    ].filter((lead) => lead !== null);

    const variables = validationSchema.cast({
      ...values,
      technicalLeads
    });

    publicCloudProjectEditRequest({
      variables: { projectId: id, ...variables },
      onError: (error) => {
        toast.update(toastId.current, {
          render: `Error: ${error.message}`,
          type: toast.TYPE.ERROR,
          autoClose: 5000
        });
      },

      onCompleted: (data) => {
        navigate(requestsRoute);

        if (data?.publicCloudProjectEditRequest) {
          toast.update(toastId.current, {
            render: "Request successfuly created",
            type: toast.TYPE.SUCCESS,
            autoClose: 5000
          });
        }
      }
    });
  };

  useEffect(() => {
    if (data) {
      // Form values cannot be null (uncontrolled input error), so replace nulls with empty strings
      const formData = stripTypeName(
        replaceNullsWithEmptyString(data?.publicCloudProjectById)
      );

      // Set give secondary technical lead an object with an empty string for all properties if null
      formData.secondaryTechnicalLead =
        formData.secondaryTechnicalLead !== ""
          ? formData.secondaryTechnicalLead
          : {
              email: "",
              firstName: "",
              lastName: "",
              ministry: ""
            };

      setInitialValues(formData);
    }
  }, [data]);

  const name = data?.publicCloudProjectById?.name;
  const isDisabled = !!data?.publicCloudProjectById?.activeEditRequest;

  const handleClose = () => setOpen(false);

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
        </NavToolbar>
        {isDisabled ? (
          <ActiveRequestText
            requestId={data?.publicCloudProjectById?.activeEditRequest?.id}
          />
        ) : null}
        <Container>
          <MetaDataInput formik={formik} isDisabled={isDisabled} />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <div>
            <div style={{ display: "flex" }}>
              <MinistryInput formik={formik} isDisabled={isDisabled} />
              <ClusterInput formik={formik} isDisabled={true} />
            </div>
            <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
            <Namespaces
              cluster={data?.publicCloudProjectById?.cluster}
              licencePlate={data?.publicCloudProjectById?.licencePlate}
            />
            <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
            <Users formik={formik} isDisabled={false} />
            <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
            <Quotas formik={formik} isDisabled={isDisabled} />
            <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
            <CommonComponents formik={formik} isDisabled={isDisabled} />
            <Button
              type="submit"
              disabled={!formik.dirty}
              sx={{ mr: 1, width: "170px" }}
              variant="contained"
            >
              Submit
            </Button>
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