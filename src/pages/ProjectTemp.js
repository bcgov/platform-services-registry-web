import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import MetaDataInput from "../components/MetaDataInput";
import ClusterInput from "../components/ClusterInput";
import QuotaInput from "../components/QuotaInput";
import NavToolbar from "../components/NavToolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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
  productionCpu: yup.string().required(),
  productionMemory: yup.string().required(),
  productionStorage: yup.string().required(),
  developmentCpu: yup.string().required(),
  developmentMemory: yup.string().required(),
  developmentStorage: yup.string().required(),
  testCpu: yup.string().required(),
  testMemory: yup.string().required(),
  testStorage: yup.string().required(),
  toolsCpu: yup.string().required(),
  toolsMemory: yup.string().required(),
  toolsStorage: yup.string().required(),
});

const TitleTypography = (props) => (
  <Typography variant="h6" sx={{ mt: 0, mb: 1 }}>
    {props.children}
  </Typography>
);

const QuotaTypography = (props) => (
  <Typography variant="body1" sx={{ mt: 0, mb: 3, fontSize: 17 }}>
    {props.children}
  </Typography>
);

const CpuTypography = ({ requests, limits }) => (
  <QuotaTypography>
    CPU_REQUEST_
    {requests}
    _LIMIT_
    {limits}
  </QuotaTypography>
);

const MemoryTypography = ({ requests, limits }) => (
  <QuotaTypography>
    MEMORY_REQUEST_
    {requests}
    _LIMIT_
    {limits}
  </QuotaTypography>
);

const StorageTypography = ({ file }) => (
  <QuotaTypography>
    STORAGE_REQUEST_
    {file}
  </QuotaTypography>
);

const QuotaPaper = (props) => (
  <Paper sx={{ p: 2, mb: 3, mr: 6 }}>{props.children}</Paper>
);

const StyledForm = styled.form`
  width: 550px;
  margin-left: 24px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

const USER_PROJECT = gql`
  query Query($projectId: ID!) {
    userPrivateCloudProject(projectId: $projectId) {
      id
      name
      description
      projectOwner {
        email
      }
      technicalLeads {
        email
      }
      ministry
      cluster
      productionQuota {
        cpu {
          requests
          limits
        }
        memory {
          requests
          limits
        }
        storage {
          block
          file
          backup
          capacity
          pvcCount
        }
        snapshot {
          count
        }
      }
      testQuota {
        cpu {
          limits
          requests
        }
        memory {
          requests
          limits
        }
        storage {
          block
          file
          backup
          capacity
          pvcCount
        }
        snapshot {
          count
        }
      }
      developmentQuota {
        cpu {
          requests
          limits
        }
        memory {
          requests
          limits
        }
        storage {
          block
          file
          backup
          capacity
          pvcCount
        }
        snapshot {
          count
        }
      }
      toolsQuota {
        cpu {
          requests
          limits
        }
        memory {
          requests
          limits
        }
        storage {
          block
          file
          backup
          capacity
          pvcCount
        }
        snapshot {
          count
        }
      }
    }
  }
`;

export default function Project() {
  const [isEdit, setEdit] = useState(true);
  const [defaultValues, setDefaultValues] = useState({});

  const { id } = useParams();

  const { loading, error, data } = useQuery(USER_PROJECT, {
    variables: { projectId: id },
  });

  const userPrivateCloudProject = data?.userPrivateCloudProject;

  useEffect(() => {
    if (!loading && !error) {
      console.log("SET RESET VALUES");
      reset({
        ...userPrivateCloudProject,
        projectOwner: userPrivateCloudProject.projectOwner.email,
        primaryTechnicalLead: userPrivateCloudProject.technicalLeads[0].email,
        secondaryTechnicalLead: userPrivateCloudProject.technicalLeads[1].email,
      });
    }
  }, [loading, error, userPrivateCloudProject]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log("data submitted: ", data);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <NavToolbar title={userPrivateCloudProject?.name} />
      <FormProvider {...{ control, errors, isDisabled: !isEdit }}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TitleTypography>
              Project Description and Contact Information
            </TitleTypography>
            <MetaDataInput />
          </div>
          <div style={{ marginLeft: 70 }}>
            <TitleTypography>Cluster</TitleTypography>
            <ClusterInput />
            {isEdit ? (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <TitleTypography>Production Quota</TitleTypography>
                  <QuotaInput nameSpace={"production"} />
                  <TitleTypography>Test Quota</TitleTypography>
                  <QuotaInput nameSpace={"test"} />
                </div>
                <div>
                  <TitleTypography>Tools Quota</TitleTypography>
                  <QuotaInput nameSpace={"tools"} />
                  <TitleTypography>Development Quota</TitleTypography>
                  <QuotaInput nameSpace={"development"} />
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <TitleTypography>Production Quota</TitleTypography>
                  <QuotaPaper>
                    <CpuTypography
                      requests={
                        userPrivateCloudProject.productionQuota.cpu.requests
                      }
                      limits={
                        userPrivateCloudProject.productionQuota.cpu.limits
                      }
                    />
                    <MemoryTypography
                      requests={
                        userPrivateCloudProject.productionQuota.memory.requests
                      }
                      limits={
                        userPrivateCloudProject.productionQuota.memory.limits
                      }
                    />
                    <StorageTypography
                      file={
                        userPrivateCloudProject.productionQuota.storage.file
                      }
                    />
                  </QuotaPaper>
                  <TitleTypography>Test Quota</TitleTypography>
                  <QuotaPaper>
                    <CpuTypography
                      requests={userPrivateCloudProject.testQuota.cpu.requests}
                      limits={userPrivateCloudProject.testQuota.cpu.limits}
                    />
                    <MemoryTypography
                      requests={
                        userPrivateCloudProject.testQuota.memory.requests
                      }
                      limits={userPrivateCloudProject.testQuota.memory.limits}
                    />
                    <StorageTypography
                      file={userPrivateCloudProject.testQuota.storage.file}
                    />
                  </QuotaPaper>
                </div>
                <div>
                  <TitleTypography>Tools Quota</TitleTypography>
                  <QuotaPaper>
                    <CpuTypography
                      requests={userPrivateCloudProject.toolsQuota.cpu.requests}
                      limits={userPrivateCloudProject.toolsQuota.cpu.limits}
                    />
                    <MemoryTypography
                      requests={
                        userPrivateCloudProject.toolsQuota.memory.requests
                      }
                      limits={userPrivateCloudProject.toolsQuota.memory.limits}
                    />
                    <StorageTypography
                      file={userPrivateCloudProject.toolsQuota.storage.file}
                    />
                  </QuotaPaper>
                  <TitleTypography>Development Quota</TitleTypography>
                  <QuotaPaper>
                    <CpuTypography
                      requests={
                        userPrivateCloudProject.developmentQuota.cpu.requests
                      }
                      limits={
                        userPrivateCloudProject.developmentQuota.cpu.limits
                      }
                    />
                    <MemoryTypography
                      requests={
                        userPrivateCloudProject.developmentQuota.memory.requests
                      }
                      limits={
                        userPrivateCloudProject.developmentQuota.memory.limits
                      }
                    />
                    <StorageTypography
                      file={
                        userPrivateCloudProject.developmentQuota.storage.file
                      }
                    />
                  </QuotaPaper>
                </div>
              </div>
            )}
          </div>
          {/* <input type="submit" /> */}
        </StyledForm>
      </FormProvider>
    </div>
  );
}

{
  /* <QuotaPaper>
<CpuTypography requests={userPrivateCloudProject.toolsQuota.cpu.requests} limits={userPrivateCloudProject.toolsQuota.cpu.limits} />
<MemoryTypography requests={userPrivateCloudProject.toolsQuota.memory.requests} limits={userPrivateCloudProject.toolsQuota.memory.limits} />
<StorageTypography file={userPrivateCloudProject.toolsQuota.storage.file} />
</QuotaPaper>

<QuotaPaper>
<CpuTypography requests={userPrivateCloudProject.developmentQuota.cpu.requests} limits={userPrivateCloudProject.developmentQuota.cpu.limits} />
<MemoryTypography requests={userPrivateCloudProject.developmentQuota.memory.requests} limits={userPrivateCloudProject.developmentQuota.memory.limits} />
<StorageTypography file={userPrivateCloudProject.developmentQuota.storage.file} />
</QuotaPaper> */
}
