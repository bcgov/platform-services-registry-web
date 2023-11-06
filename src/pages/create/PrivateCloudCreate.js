import React, { useRef, useState } from "react";
import * as yup from "yup";
import {
  CommonComponentsInputSchema,
  ClusterSchema,
  MinistrySchema,
} from "../../__generated__/resolvers-types";
import {
  createProjectInputInitalValues as initialValues,
  replaceEmptyStringWithNull,
} from "../../components/common/FormHelpers";
import { useFormik } from "formik";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import NavToolbar from "../../components/NavToolbar";
import Button from "@mui/material/Button";
import MetaDataInput from "../../components/forms/MetaDataInput";
import ClusterInput from "../../components/forms/ClusterInput";
import MinistryInput from "../../components/forms/MinistryInput";
import CommonComponents from "../../components/forms/CommonComponents";
import AGMinistry from "../../components/forms/AGMinistry";
import { USER_REQUESTS } from "../requests/UserRequests";
import { ALL_ACTIVE_REQUESTS } from "../requests/AdminRequests";
import { toast } from "react-toastify";
import Container from "../../components/common/Container";
import Users from "../../components/forms/Users";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const CREATE_USER_PROJECT = gql`
  mutation PrivateCloudProjectRequest(
    $name: String!
    $description: String!
    $ministry: Ministry!
    $cluster: Cluster!
    $commonComponents: CommonComponentsInput!
    $projectOwner: CreateUserInput!
    $primaryTechnicalLead: CreateUserInput!
    $secondaryTechnicalLead: CreateUserInput
  ) {
    privateCloudProjectRequest(
      name: $name
      description: $description
      ministry: $ministry
      cluster: $cluster
      commonComponents: $commonComponents
      projectOwner: $projectOwner
      primaryTechnicalLead: $primaryTechnicalLead
      secondaryTechnicalLead: $secondaryTechnicalLead
    ) {
      id
      active
      decisionStatus
      humanComment
    }
  }
`;

const CreateUserInputSchema = yup.object({
  email: yup.string().defined(),
  firstName: yup.string().defined(),
  lastName: yup.string().defined(),
  ministry: yup.string(),
  upn: yup.string(),
  idir: yup.string(),
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

export default function Create({ requestsRoute }) {
  const navigate = useNavigate();
  const toastId = useRef(null);
  const [open, setOpen] = useState(false);
  const [AGministries, setAGministries] = useState(false);

  const [privateCloudProjectRequest, { data, loading, error }] = useMutation(
    CREATE_USER_PROJECT,
    {
      errorPolicy: "ignore", // Query to refetch might not have been called yet, so ignore error
      refetchQueries: [
        { query: USER_REQUESTS },
        { query: ALL_ACTIVE_REQUESTS },
      ],
    }
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const result = await formik.validateForm();

      if (Object.keys(result).length === 0 && formik.dirty && !AGministries) {
        // Submit the form only if there are no errors and the form has been touched
        setOpen(true);
      }
    },
  });

  const submitForm = () => {
    const { values } = formik;

    toastId.current = toast("Your create request has been submitted", {
      autoClose: false,
    });

    const variables = validationSchema.cast(values);

    privateCloudProjectRequest({
      variables,
      onError: (error) => {
        toast.update(toastId.current, {
          render: `Error: ${error.message}`,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        });
      },

      onCompleted: (data) => {
        navigate(requestsRoute);

        if (data?.privateCloudProjectRequest) {
          toast.update(toastId.current, {
            render: "Request successfuly created",
            type: toast.TYPE.SUCCESS,
            autoClose: 5000,
          });
        }
      },
    });
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <NavToolbar title="Create Product"></NavToolbar>
        <Container>
          <MetaDataInput formik={formik} isDisabled={false} isPrivate={true} />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <div>
            <div style={{ display: "flex" }}>
              <MinistryInput formik={formik} isDisabled={false} />
              <ClusterInput formik={formik} isDisabled={false} />
            </div>
            <AGMinistry
              formik={formik}
              setAGministries={setAGministries}
              text={"the namespaces in Private Cloud Openshift"}
            />
          </div>
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <Users formik={formik} isDisabled={false} />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <CommonComponents formik={formik} isDisabled={false} />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <Typography sx={{ mb: 3, mt: 3, width: 1100 }} color="text.primary">
            <b>All set?</b> After hitting create, our smart robots will start
            working hard behind the scenes. There is one step, the{" "}
            <b>approval process</b>, where a human is involved. They'll take the
            opportunity, if needed, to reach out and have an on-boarding
            conversation with you. Also, look out for our{" "}
            <b>Notification emails</b> that will provide you with valuable
            information regarding your product status and details. By
            proceeding, you confirm that you have read and understood the roles
            and responsibilities as described in the Onboarding Guide."
          </Typography>
          <div>
            <Button
              type="submit"
              sx={{ mr: 1, width: "170px" }}
              variant="contained"
              onClick={() => console.log(formik.values)}
            >
              Create
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
                  Are you sure you want to create this product?
                  <Button
                    onClick={submitForm}
                    sx={{ mr: 1, width: "170px", mt: 3 }}
                    variant="contained"
                  >
                    Create
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
