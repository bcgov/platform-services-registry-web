import React, { useEffect, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import NavToolbar from "../components/NavToolbar";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import MetaDataInput from "../components/MetaDataInput";
import ClusterInput from "../components/ClusterInput";
import { useForm, FormProvider } from "react-hook-form";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import CommonComponents from "../components/CommonComponents";
import {
  createProjectFormSchema as schema,
  formDataToUserProject
} from "../components/common/FormHelpers";
import StyledForm from "../components/common/StyledForm";
import { USER_ACTIVE_REQUESTS } from "./requests/UserRequests";
import { ALL_ACTIVE_REQUESTS } from "./requests/AdminRequests";
import { toast } from "react-toastify";

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

export default function Create({ requestsRoute }) {
  const navigate = useNavigate();
  const toastId = useRef(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, dirtyFields }
  } = useForm({
    resolver: yupResolver(schema)
    // shouldUnregister: false,
  });

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

  const onSubmit = (data) => {
    const userProject = formDataToUserProject(data);
    toastId.current = toast("Your create request has been submitted", {
      autoClose: false
    });

    privateCloudProjectRequest({
      variables: {
        ...userProject
      },
      onError: (error) => {
        console.log(error);
        toast.update(toastId.current, {
          render: `Error: ${error.message}`,
          type: toast.TYPE.ERROR,
          autoClose: 5000
        });
      },

      onCompleted: (data) => {
        console.log("onCompleted");
        console.log(data);
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
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <MetaDataInput />
            <div style={{ marginLeft: 50 }}>
              <ClusterInput />
              <CommonComponents />
            </div>
          </StyledForm>
        )}
      </FormProvider>
    </div>
  );
}
