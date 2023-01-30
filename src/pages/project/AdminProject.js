import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import {
  CreateUserInputSchema,
  CommonComponentsInputSchema,
  QuotaInputSchema,
  MinistrySchema,
  ClusterSchema,
} from "../../__generated__/resolvers-types";
import { useQuery, useMutation, gql } from "@apollo/client";
import MetaDataInput from "../../components/forms/MetaDataInput";
import ClusterInput from "../../components/forms/ClusterInput";
import QuotaInput from "../../components/forms/QuotaInput";
import MinistryInput from "../../components/forms/MinistryInput";
import NavToolbar from "../../components/NavToolbar";
import {
  projectInitialValues,
  replaceNullsWithEmptyString,
  replaceEmptyStringWithNull,
  stripTypeName,
} from "../../components/common/FormHelpers";
import CommonComponents from "../../components/forms/CommonComponents";
import { useParams, useNavigate } from "react-router-dom";
import { USER_ACTIVE_REQUESTS } from "../requests/UserRequests";
import { ALL_ACTIVE_REQUESTS } from "../requests/AdminRequests";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Container from "../../components/common/Container";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, IconButton } from "@mui/material";
import ActiveRequestText from "../../components/common/ActiveRequestText";

const ADMIN_PROJECT = gql`
  query Query($projectId: ID!) {
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
        githubId
        lastName
        ministry
      }
      primaryTechnicalLead {
        email
        firstName
        githubId
        lastName
        ministry
      }
      secondaryTechnicalLead {
        email
        firstName
        githubId
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
  mutation Mutation($projectId: ID!) {
    privateCloudProjectDeleteRequest(projectId: $projectId) {
      id
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
    .transform((value) => (value?.email === "" ? null : value)),
  commonComponents: yup
    .object(CommonComponentsInputSchema)
    .transform((value, original) => {
      return replaceEmptyStringWithNull(value);
    }),
  productionQuota: yup.object(QuotaInputSchema).required(),
  developmentQuota: yup.object(QuotaInputSchema).required(),
  toolsQuota: yup.object(QuotaInputSchema).required(),
  testQuota: yup.object(QuotaInputSchema).required(),
});

export default function AdminProject({ requestsRoute }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const toastId = useRef(null);

  const [initialValues, setInitialValues] = useState(projectInitialValues);

  const { data, loading, error, refetch } = useQuery(ADMIN_PROJECT, {
    variables: { projectId: id },
  });

  const [
    privateCloudProjectEditRequest,
    {
      data: editProjectData,
      loading: editProjectLoading,
      error: editProjectError,
    },
  ] = useMutation(UPDATE_USER_PROJECT, {
    refetchQueries: [
      { query: USER_ACTIVE_REQUESTS },
      { query: ALL_ACTIVE_REQUESTS },
    ],
  });

  const [privateCloudProjectDeleteRequest] = useMutation(DELETE_USER_PROJECT, {
    refetchQueries: [
      { query: USER_ACTIVE_REQUESTS },
      { query: ALL_ACTIVE_REQUESTS },
    ],
  });

  const deleteOnClick = () => {
    toastId.current = toast("Your edit request has been submitted", {
      autoClose: false,
    });

    privateCloudProjectDeleteRequest({
      variables: { projectId: id },
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
    onSubmit: (values) => {
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
    },
  });

  useEffect(() => {
    if (data) {
      // Form values cannot be null (uncontrolled input error), so replace nulls with empty strings
      setInitialValues(
        stripTypeName(
          replaceNullsWithEmptyString(data?.privateCloudProjectById)
        )
      );
    }
  }, [data]);

  const name = data?.privateCloudProjectById?.name;
  const hasActiveRequest = !!data?.privateCloudProjectById?.activeEditRequest;

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <NavToolbar path={"product"} title={name}>
          <IconButton
            sx={{ mr: 2 }}
            disabled={!formik.dirty}
            onClick={() => formik.resetForm()}
            // type="reset"
            aria-label="reset"
          >
            <RestartAltIcon />
          </IconButton>
          <Button
            sx={{ mr: 1 }}
            type="submit"
            disabled={!formik.dirty}
            variant="outlined"
          >
            SUBMIT EDIT REQUEST
          </Button>
          <IconButton
            sx={{ mr: 1 }}
            disabled={hasActiveRequest}
            onClick={deleteOnClick}
            aria-label="delete"
          >
            <DeleteForeverIcon />
          </IconButton>
        </NavToolbar>
        {hasActiveRequest ? (
          <ActiveRequestText
            requestId={data?.privateCloudProjectById?.activeEditRequest?.id}
          />
        ) : null}
        <Container>
          <MetaDataInput formik={formik} isDisabled={hasActiveRequest} />
          <div>
            <div style={{ display: "flex" }}>
              <MinistryInput formik={formik} isDisabled={hasActiveRequest} />
              <ClusterInput formik={formik} isDisabled={true} />
            </div>
            <div>
              <QuotaInput
                nameSpace={"production"}
                formik={formik}
                isDisabled={hasActiveRequest}
              />
              <QuotaInput
                nameSpace={"test"}
                formik={formik}
                isDisabled={hasActiveRequest}
              />
              <QuotaInput
                nameSpace={"tools"}
                formik={formik}
                isDisabled={hasActiveRequest}
              />
              <QuotaInput
                nameSpace={"development"}
                formik={formik}
                isDisabled={hasActiveRequest}
              />
            </div>
            <CommonComponents formik={formik} isDisabled={hasActiveRequest} />
          </div>
        </Container>
      </form>
    </div>
  );
}
