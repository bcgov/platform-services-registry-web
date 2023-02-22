import React, { useRef } from "react";
import * as yup from "yup";
import {
  CreateUserInputSchema,
  CommonComponentsInputSchema,
  ClusterSchema,
  MinistrySchema,
} from "../__generated__/resolvers-types";
import {
  createProjectInputInitalValues as initialValues,
  replaceEmptyStringWithNull,
} from "../components/common/FormHelpers";
import { useFormik } from "formik";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import NavToolbar from "../components/NavToolbar";
import Button from "@mui/material/Button";
import MetaDataInput from "../components/forms/MetaDataInput";
import ClusterInput from "../components/forms/ClusterInput";
import MinistryInput from "../components/forms/MinistryInput";
import CommonComponents from "../components/forms/CommonComponents";
import { USER_REQUESTS } from "./requests/UserRequests";
import { ALL_ACTIVE_REQUESTS } from "./requests/AdminRequests";
import { toast } from "react-toastify";
import Container from "../components/common/Container";
import Users from "../components/forms/Users";
import Divider from "@mui/material/Divider";

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

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  ministry: MinistrySchema.required(),
  cluster: ClusterSchema.required(),
  projectOwner: CreateUserInputSchema(),
  primaryTechnicalLead: CreateUserInputSchema(),
  secondaryTechnicalLead: yup
    .object(CreateUserInputSchema)
    .nullable()
    .transform((value) => (value.email === "" ? null : value)),
  // commonComponents: CommonComponentsInputSchema(),
  commonComponents: yup
    .object(CommonComponentsInputSchema)
    .transform((value, original) => {
      return replaceEmptyStringWithNull(value);
    }),
});

export default function Create({ requestsRoute }) {
  const navigate = useNavigate();
  const toastId = useRef(null);

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
    onSubmit: (values) => {
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
    },
  });

  console.log(formik.errors);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <NavToolbar title="Create Project">
          <Button type="submit" sx={{ mr: 2 }} variant="outlined">
            CREATE
          </Button>
        </NavToolbar>
        <Container>
          <MetaDataInput formik={formik} isDisabled={false} />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <div style={{ display: "flex" }}>
            <MinistryInput formik={formik} isDisabled={false} />
            <ClusterInput formik={formik} isDisabled={false} />
          </div>
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <Users formik={formik} isDisabled={false} />
          <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />
          <CommonComponents formik={formik} isDisabled={false} />
          <Button
            type="submit"
            sx={{ mt: 3, ml: 2, mb: 4, width: 350 }}
            variant="outlined"
          >
            CREATE
          </Button>
        </Container>
      </form>
    </div>
  );
}
