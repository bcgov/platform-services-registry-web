import React, { useRef, useState } from "react";
import * as yup from "yup";
import {
  CreateUserInputSchema,
  // CommonComponentsInputSchema,
  ProviderSchema,
  BudgetInputSchema,
  MinistrySchema
} from "../../__generated__/resolvers-types";
import {
  createPublicCloudProjectInputInitalValues as initialValues,
  replaceEmptyStringWithNull
} from "../../components/common/FormHelpers";
import { useFormik } from "formik";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import NavToolbar from "../../components/NavToolbar";
import Button from "@mui/material/Button";
import MetaDataInput from "../../components/forms/MetaDataInput";
import MinistryInput from "../../components/forms/MinistryInput";
// import CommonComponents from "../../components/forms/CommonComponents";
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
import AccountCoding from "../../components/forms/AccountCoding";
import Budget from "../../components/forms/Budget";
import ProviderInput from "../../components/forms/ProviderInput";

const CREATE_USER_PROJECT = gql`
    mutation PublicCloudProjectRequest(
      $name: String!
      $description: String!
      $ministry: Ministry!
      $provider: Provider!
      # $commonComponents: CommonComponentsInput!
      $projectOwner: CreateUserInput!
      $primaryTechnicalLead: CreateUserInput!
      $secondaryTechnicalLead: CreateUserInput
      $accountCoding: String
      $budget: BudgetInput!
    ) {
      publicCloudProjectRequest(
        name: $name
        description: $description
        ministry: $ministry
        provider: $provider
        # commonComponents: $commonComponents
        projectOwner: $projectOwner
        primaryTechnicalLead: $primaryTechnicalLead
        secondaryTechnicalLead: $secondaryTechnicalLead
        accountCoding: $accountCoding
        budget: $budget
      ) {
        id
        active
        decisionStatus
        humanComment
      }
    }
  `;

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  ministry: MinistrySchema.required(),
  provider: ProviderSchema.required(),
  accountCoding: yup.string()
    .transform((value) => value.replace(/\s/g, ''))
    .max(24)
    .min(24)
    .required(),
  budget: BudgetInputSchema().required(),
  projectOwner: CreateUserInputSchema(),
  primaryTechnicalLead: CreateUserInputSchema(),
  secondaryTechnicalLead: yup
    .object(CreateUserInputSchema)
    .nullable()
    .transform((value) => (value?.email === "" ? null : value)),
  // commonComponents: CommonComponentsInputSchema(),
  // commonComponents: yup
  // .object(CommonComponentsInputSchema)
  // .transform((value, original) => {
  //   return replaceEmptyStringWithNull(value);
  // })
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '70%',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function Create({ requestsRoute }) {
  const navigate = useNavigate();
  const toastId = useRef(null);
  const [open, setOpen] = useState(false);
  const [AGministries, setAGministries] = useState(false);

  const [publicCloudProjectRequest, { data, loading, error }] = useMutation(
    CREATE_USER_PROJECT,
    {
      errorPolicy: "ignore", // Query to refetch might not have been called yet, so ignore error
      refetchQueries: [{ query: USER_REQUESTS }, { query: ALL_ACTIVE_REQUESTS }]
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
    }
  });

  const submitForm = () => {
    const { values } = formik;

    toastId.current = toast("Your create request has been submitted", {
      autoClose: false
    });

    const variables = validationSchema.cast(values);

    publicCloudProjectRequest({
      variables,
      onError: (error) => {
        toast.update(toastId.current, {
          render: `Error: ${error.message}`,
          type: toast.TYPE.ERROR,
          autoClose: 5000
        });
      },

      onCompleted: (data) => {
        navigate(requestsRoute);

        if (data?.publicCloudProjectRequest) {
          toast.update(toastId.current, {
            render: "Request successfuly created",
            type: toast.TYPE.SUCCESS,
            autoClose: 5000
          });
        }
      }
    });
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <NavToolbar title="Create Product"></NavToolbar>
        <Container>
          <MetaDataInput
            formik={formik}
            isDisabled={false}
            cloudProvider={"Cloud Pathfinder"}
            mail={"cloud.pathfinder@gov.bc.ca"}
            platform={"Public Cloud"}
          />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <div>
            <div style={{ display: "flex" }}>
              <MinistryInput formik={formik} isDisabled={false} />
              <ProviderInput formik={formik} isDisabled={false} />
            </div>
            <AGMinistry formik={formik} setAGministries={setAGministries} />
          </div>
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <Users formik={formik} isDisabled={false} />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <AccountCoding formik={formik} isDisabled={false} />
           <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <Budget formik={formik} isDisabled={false} />
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
              disabled
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
                <Typography id="modal-modal-title" variant="h4" component="h2">
                  All Set?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  After hitting request, our smart robots will start working hard behind the scenes. There is one step, the approval process, where a human is involved. They'll take the opportunity, if needed, to reach out and have an on-boarding conversation with you.
                  <br />Also, look out for our Notification emails that will provide you with valuable information regarding your product status and details.
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Provisioning Requests for BC Gov’s Landing Zone in AWS - Ministry Product Teams are required to complete two prior steps;
                  <br />1. Sign a Memorandum of Understanding (MoU) with the Public Cloud Accelerator Service Team. If you do not have a MoU in place, please email us at <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`mailto:cloud.pathfinder@gov.bc.ca`}
                  >
                    cloud.pathfinder@gov.bc.ca
                  </a>.
                  <br />2. Attend an onboarding session with the Public Cloud Accelerator Service Team. To book an onboarding session, please email us at <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`mailto:cloud.pathfinder@gov.bc.ca`}
                  >
                    cloud.pathfinder@gov.bc.ca
                  </a>.
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  By clicking Create button, I confirm that the ministry product team has signed a Memorandum of Understanding (MoU) and have attended an onboarding session with the Public Cloud Accelerator Service Team. I also confirm that I have read and understood the roles and responsibilities as described in the <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://aws.amazon.com/compliance/shared-responsibility-model/`}
                  >
                    Public Cloud Services Shared Responsibility Model                    </a>.
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  By clicking Create button, I confirm that the ministry product team is liable to pay the base charge of CAD 400 to 600 per month for each project set created. This value may fluctuate depending on the USD to CAD exchange rate changes.
                </Typography>
                <Button
                  onClick={submitForm}
                  sx={{ mr: 1, width: "170px", mt: 3 }}
                  variant="contained"
                  disabled
                >
                  Create
                </Button>
              </Box>
            </Modal>
          </div>
        </Container>
      </form>
    </div>
  );
}
