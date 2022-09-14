import React from "react";
import { useMutation, gql } from "@apollo/client";
import NavToolbar from "../components/NavToolbar";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MetaDataInput from "../components/MetaDataInput";
import ClusterInput from "../components/ClusterInput";
import styled from "styled-components";
import { useForm, FormProvider } from "react-hook-form";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const CREATE_USER_PROJECT = gql`
  mutation Mutation($metaData: ProjectMetaDataInput!) {
    privateCloudProjectRequest(metaData: $metaData) {
      active
      status
    }
  }
`;

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  projectOwner: yup.string().email("Must be a valid email address").required(),
  primaryTechnicalLead: yup
    .string()
    .email("Must be a valid email address")
    .required(),
  secondaryTechnicalLead: yup.string().email("Must be a valid email address"),
  ministry: yup.string().required(),
  cluster: yup.string().required(),
});

const FormContainer = styled.div`
  width: 550px;
  margin-left: 24px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

const TitleTypography = (props) => (
  <Typography variant="h6" sx={{ mt: 0, mb: 1 }}>
    {props.children}
  </Typography>
);

export default function Create() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [privateCloudProjectRequest, { data, loading, error }] =
    useMutation(CREATE_USER_PROJECT);

  const onSubmit = (data) => {
    const { primaryTechnicalLead, secondaryTechnicalLead, ...metaData } = data;

    privateCloudProjectRequest({
      variables: {
        metaData: {
          ...metaData,
          technicalLeads: [primaryTechnicalLead, secondaryTechnicalLead].filter(
            Boolean
          ),
        },
      },
      onCompleted: () => {
        console.log("SUBMITTED PROJECT CREATE REQUEST");
        navigate(-1);
      },
    });
  };

  // if (error)
  //   return (
  //     <div>
  //       <NavToolbar title={"Create Project"} />
  //       {`Submission error! ${error.message}`}
  //     </div>
  //   );

  return (
    <div>
      <FormProvider {...{ control, errors }}>
        <NavToolbar title={"Create Project"}>
          <Button
            sx={{ mr: 2, mt: 1 }}
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
            <Box sx={{ mb: 3 }} style={{ width: "50%" }}>
              <>
                <FormContainer>
                  <div>
                    <TitleTypography>
                      Project Description and Contact Information
                    </TitleTypography>
                    <MetaDataInput />
                  </div>
                  <div style={{ marginLeft: 70 }}>
                    <TitleTypography>Cluster</TitleTypography>
                    <ClusterInput />
                  </div>
                </FormContainer>
              </>
            </Box>
          </form>
        )}
      </FormProvider>
    </div>
  );
}
