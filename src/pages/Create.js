import React from "react";
import { useMutation, gql } from "@apollo/client";
import NavToolbar from "../components/NavToolbar";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MetaDataInput from "../components/MetaDataInput";
import ClusterInput from "../components/ClusterInput";
import styled from "styled-components";
import { useForm, FormProvider } from "react-hook-form";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import CommonComponents from "../components/CommonComponents";
import {
  createProjectFormSchema as schema,
  formDataToUserProject,
} from "../components/common/FormHelpers";

const CREATE_USER_PROJECT = gql`
  mutation Mutation(
    $metaData: ProjectMetaDataInput!
    $commonComponents: CommonComponentsInput
  ) {
    privateCloudProjectRequest(
      metaData: $metaData
      commonComponents: $commonComponents
    ) {
      active
      status
    }
  }
`;

const FormContainer = styled.div`
  margin-left: 24px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

export default function Create() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
    // shouldUnregister: false,
  });

  const [privateCloudProjectRequest, { data, loading, error }] = useMutation(
    CREATE_USER_PROJECT,
    {
      errorPolicy: "ignore", // Query to refetch might not have been called yet, so ignore error
      refetchQueries: [
        "PrivateCloudActiveRequests",
        "UserPrivateCloudActiveRequests",
      ],
    }
  );

  const onSubmit = (data) => {
    const userProject = formDataToUserProject(data);

    privateCloudProjectRequest({
      variables: {
        ...userProject,
      },
      onCompleted: () => {
        console.log("SUBMITTED PROJECT CREATE REQUEST");
        navigate(-1);
      },
    });
  };

  return (
    <div>
      <FormProvider {...{ control, errors, setValue, watch }}>
        <NavToolbar title="Create Project">
          <Button
            sx={{ mr: 2 }}
            onClick={handleSubmit(onSubmit)}
            variant="outlined"
          >
            CREATE
          </Button>
        </NavToolbar>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 3 }}>
              <FormContainer>
                <MetaDataInput />
                <div style={{ marginLeft: 70 }}>
                  <ClusterInput />
                  <CommonComponents />
                </div>
              </FormContainer>
            </Box>
          </form>
        )}
      </FormProvider>
    </div>
  );
}
