import React, { useEffect, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import NavToolbar from "../components/NavToolbar";
import Button from "@mui/material/Button";
import MetaDataInput from "../components/MetaDataInput";
import ClusterInput from "../components/ClusterInput";
import { useNavigate } from "react-router-dom";
import CommonComponents from "../components/CommonComponents";
import { USER_ACTIVE_REQUESTS } from "./requests/UserRequests";
import { ALL_ACTIVE_REQUESTS } from "./requests/AdminRequests";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  createProjectInputInitalValues as initialValues,
  createProjectInputValidationSchema as validationSchema
} from "../components/common/FormHelpers";
import Container from "../components/common/Container";

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
    }
  }
`;

export default function Create({ requestsRoute }) {
  const navigate = useNavigate();
  const toastId = useRef(null);

  const [privateCloudProjectRequest, { data, loading, error }] = useMutation(
    CREATE_USER_PROJECT,
    {
      errorPolicy: "ignore", // Query to refetch might not have been called yet, so ignore error
      refetchQueries: [
        { query: USER_ACTIVE_REQUESTS },
        { query: ALL_ACTIVE_REQUESTS }
      ]
    }
  );

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: (values) => {
      console.log("submit");
      toastId.current = toast("Your create request has been submitted", {
        autoClose: false
      });

      // This may be unnecessary since I have remove @noNullInput for this mutation input
      const variables = { ...values };

      if (variables.secondaryTechnicalLead.email === "") {
        delete variables.secondaryTechnicalLead;
      }

      const { noServices, ...rest } = variables.commonComponents;

      for (let component in rest) {
        if (rest[component] === "") {
          delete variables.commonComponents[component];
        }
      }

      privateCloudProjectRequest({
        variables,
        onError: (error) => {
          console.log(error);
          toast.update(toastId.current, {
            render: `Error: ${error.message}`,
            type: toast.TYPE.ERROR,
            autoClose: 5000
          });
        },

        onCompleted: (data) => {
          navigate(requestsRoute);

          if (data?.privateCloudProjectRequest) {
            toast.update(toastId.current, {
              render: "Request successfuly created",
              type: toast.TYPE.SUCCESS,
              autoClose: 5000
            });
          }
        }
      });
    }
  });

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
          <div style={{ marginLeft: 50 }}>
            <ClusterInput formik={formik} isDisabled={false} />
            <CommonComponents formik={formik} isDisabled={false} />
          </div>
        </Container>
      </form>
    </div>
  );
}
