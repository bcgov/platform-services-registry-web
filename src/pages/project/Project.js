import React, { useEffect, useRef } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import MetaDataInput from "../../components/forms/MetaDataInput";
import ClusterInput from "../../components/forms/ClusterInput";
import QuotaInput from "../../components/forms/QuotaInput";
import NavToolbar from "../../components/NavToolbar";
import {
  userProjectToFormData,
  formDataToUserProject,
  projectFormSchema as schema
} from "../../components/common/FormHelpers";
import Typography from "@mui/material/Typography";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, IconButton } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import StyledLink from "../../components/common/StyledLink";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import StyledForm from "../../components/common/StyledForm";
import CommonComponents from "../../components/forms/CommonComponents";
import { USER_ACTIVE_REQUESTS } from "../requests/UserRequests";
import { ALL_ACTIVE_REQUESTS } from "../requests/AdminRequests";
import { toast } from "react-toastify";

const USER_PROJECT = gql`
  query Query($projectId: ID!) {
    userPrivateCloudProjectById(projectId: $projectId) {
      id
      name
      description
      activeEditRequest {
        id
        active
      }
      projectOwner {
        email
      }
      primaryTechnicalLead {
        email
      }
      secondaryTechnicalLead {
        email
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
        other
      }
      productionQuota: productionQuotaSelected {
        cpu
        memory
        storage
      }
      testQuota: testQuotaSelected {
        cpu
        memory
        storage
      }
      developmentQuota: developmentQuotaSelected {
        cpu
        memory
        storage
      }
      toolsQuota: toolsQuotaSelected {
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
    $metaData: EditProjectMetaDataInput
    $productionQuota: QuotaInput
    $developmentQuota: QuotaInput
    $testQuota: QuotaInput
    $toolsQuota: QuotaInput
  ) {
    privateCloudProjectEditRequest(
      projectId: $projectId
      metaData: $metaData
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
  mutation Mutation($projectId: ID!) {
    privateCloudProjectDeleteRequest(projectId: $projectId) {
      id
    }
  }
`;

export default function Project({ requestsRoute }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const toastId = useRef(null);

  const {
    loading: userProjectLoading,
    data: userProjectData,
    error: userProjectError
  } = useQuery(USER_PROJECT, {
    variables: { projectId: id }
  });

  const [
    createPrivateCloudProjectEditRequest,
    {
      data: editProjectData,
      loading: editProjectLoading,
      error: editProjectError
    }
  ] = useMutation(UPDATE_USER_PROJECT, {
    refetchQueries: [
      { query: USER_ACTIVE_REQUESTS },
      { query: ALL_ACTIVE_REQUESTS }
    ]
  });

  const [
    deletePrivateCloudProjectRequest,
    {
      data: deleteProjectData,
      loading: deleteProjectLoading,
      error: deleteProjectError
    }
  ] = useMutation(DELETE_USER_PROJECT, {
    refetchQueries: ["PrivateCloudActiveRequests"]
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isDirty, dirtyFields, errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const userPrivateCloudProject = userProjectData?.userPrivateCloudProjectById;

  useEffect(() => {
    if (!userProjectLoading && !userProjectError) {
      if (userPrivateCloudProject) {
        reset(userProjectToFormData(userPrivateCloudProject));
      }
    }
  }, [userProjectLoading, userProjectError, userPrivateCloudProject, reset]);

  const onSubmit = (data) => {
    const userProject = formDataToUserProject(data, dirtyFields);
    toastId.current = toast("Your edit request has been submitted", {
      autoClose: false
    });

    createPrivateCloudProjectEditRequest({
      variables: { projectId: id, ...userProject, ...userProject.quota },
      onCompleted: () => {
        navigate(requestsRoute);

        toast.update(toastId.current, {
          render: "Request successfuly created",
          type: toast.TYPE.SUCCESS,
          autoClose: 5000
        });
      }
    });
  };

  const onDeleteSubmit = () => {
    toastId.current = toast("Your edit request has been submitted", {
      autoClose: false
    });

    deletePrivateCloudProjectRequest({
      variables: { projectId: id },
      onCompleted: () => {
        navigate(requestsRoute);

        toast.update(toastId.current, {
          render: "Delete request successfuly created",
          type: toast.TYPE.SUCCESS,
          autoClose: 5000
        });
      }
    });
  };

  if (editProjectError && toastId.current) {
    toast.update(toastId.current, {
      render: `Error: ${editProjectError.message}`,
      type: toast.TYPE.SUCCESS,
      autoClose: 5000
    });
  } else if (deleteProjectError && toastId.current) {
    toast.update(toastId.current, {
      render: `Error: ${deleteProjectError.message}`,
      type: toast.TYPE.SUCCESS,
      autoClose: 5000
    });
  } else if (userProjectError) {
    // Find bettwr way to handle this
    return `Error! ${userProjectError}`;
  }
  return (
    <div>
      <NavToolbar path={"project"} title={userPrivateCloudProject?.name}>
        <IconButton
          sx={{ mr: 2 }}
          disabled={!isDirty}
          onClick={() => reset(userProjectToFormData(userPrivateCloudProject))}
          aria-label="delete"
        >
          <RestartAltIcon />
        </IconButton>
        <Button
          sx={{ mr: 1 }}
          disabled={!isDirty}
          onClick={handleSubmit(onSubmit)}
          variant="outlined"
        >
          SUBMIT EDIT REQUEST
        </Button>
        <IconButton
          sx={{ mr: 1 }}
          onClick={handleSubmit(onDeleteSubmit)}
          aria-label="delete"
        >
          <DeleteForeverIcon />
        </IconButton>
      </NavToolbar>
      <div style={{ minHeight: 50 }}>
        {userPrivateCloudProject?.activeRequest?.active && (
          <Typography
            variant="body"
            sx={{ mb: 0, ml: 3, color: "rgba(0, 0, 0, 0.6)" }}
          >
            This project cannot be edited as it has an{" "}
            <StyledLink
              to={`/private-cloud/user/request/${userPrivateCloudProject?.activeRequest?.id}`}
            >
              <i>active request</i>
            </StyledLink>
          </Typography>
        )}
      </div>
      {editProjectLoading ? (
        <LoadingSpinner />
      ) : (
        <FormProvider
          {...{
            control,
            errors,
            setValue,
            watch,
            initialValues: userProjectToFormData(userPrivateCloudProject),
            isDisabled: userPrivateCloudProject?.activeRequest?.active
          }}
        >
          <StyledForm>
            <MetaDataInput />
            <div style={{ marginLeft: 70 }}>
              <ClusterInput />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <QuotaInput nameSpace={"production"} />
                  <QuotaInput nameSpace={"test"} />
                </div>
                <div>
                  <QuotaInput nameSpace={"tools"} />
                  <QuotaInput nameSpace={"development"} />
                </div>
              </div>
              <CommonComponents />
            </div>
          </StyledForm>
        </FormProvider>
      )}
    </div>
  );
}
