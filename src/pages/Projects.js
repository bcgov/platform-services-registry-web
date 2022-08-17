import React, { useContext, useEffect, useState, useMemo } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import StickyTable from "../components/common/Table";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import AdminContext from "../context/admin";
import { useKeycloak } from "@react-keycloak/web";
import TabsToolbar from "../components/TabsToolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

const columns = [
  { id: "name", label: "Name", minWidth: 180 },
  { id: "description", label: "Description", minWidth: 200 },
  { id: "ministry", label: "Ministry", minWidth: 0 },
  { id: "cluster", label: "Cluster", minWidth: 0 },
  { id: "projectOwner", label: "Project Owner", minWidth: 0 },
  { id: "technicalLeads", label: "Technical Leads", minWidth: 0 },
  { id: "licencePlate", label: "License Place", minWidth: 0 },
];

export const PROJECT_FIELDS = gql`
  fragment ProjectFields on PrivateCloudProject {
    id
    name
    description
    cluster
    ministry
    licencePlate
    projectOwner {
      firstName
      lastName
      githubId
    }
    technicalLeads {
      firstName
      lastName
      githubId
    }
  }
`;

const USER_PROJECTS = gql`
  ${PROJECT_FIELDS}
  query UserProjects {
    userPrivateCloudProjects {
      ...ProjectFields
    }
  }
`;

const ALL_PROJECTS = gql`
  ${PROJECT_FIELDS}
  query PrivateCloudProjects {
    privateCloudProjects {
      ...ProjectFields
    }
  }
`;

const projectsToRows = ({
  id,
  name,
  description,
  projectOwner,
  technicalLeads,
  ministry,
  cluster,
  licencePlate,
}) => ({
  id,
  name: <span style={{ fontSize: 16, fontWeight: "450" }}>{name}</span>,
  description: (
    <span style={{ fontSize: 14 }}> {truncate(description, 130)}</span>
  ),
  ministry,
  cluster,
  licencePlate: (
    <b style={{ fontSize: 16, fontWeight: "500" }}>{licencePlate}</b>
  ),
  projectOwner: (
    <Chip
      key={projectOwner.githubId + licencePlate + "po"}
      style={{ width: "fit-content" }}
      avatar={
        <Avatar
          alt={projectOwner.firstName}
          src={`https://github.com/${projectOwner.githubId}.png`}
        />
      }
      label={`${projectOwner.firstName} ${projectOwner.lastName}`}
      variant="outlined"
    />
  ),
  technicalLeads: (
    <Stack direction="column" spacing={1}>
      {technicalLeads.map(({ firstName, lastName, githubId }, i) => (
        <Chip
          key={projectOwner.githubId + licencePlate + i}
          style={{ width: "fit-content" }}
          avatar={
            <Avatar
              alt={firstName}
              src={`https://github.com/${githubId}.png`}
            />
          }
          label={`${firstName} ${lastName}`}
          variant="outlined"
        />
      ))}
    </Stack>
  ),
});

export default function Projects() {
  const { admin } = useContext(AdminContext);
  const { keycloak } = useKeycloak();
  const [privateCloudProjects, setPrivateCloudProjects] = useState([]);
  const navigate = useNavigate();

  const onClickHandler = (id) => {
    navigate(id)
  }

  const allProjects = useQuery(ALL_PROJECTS, {
    skip: !keycloak.hasResourceRole("admin", "registry-api"),
  });

  const [loadUserProjects, userProjects] = useLazyQuery(USER_PROJECTS);

  if (!admin && !userProjects.called) {
    loadUserProjects();
  }

  const errors = userProjects.error || allProjects.error;
  const loadingProjects = userProjects.loading || allProjects.loading;

  useEffect(() => {
    if (!loadingProjects) {
      const privateCloudProjects = admin
        ? allProjects.data?.privateCloudProjects
        : userProjects.data?.userPrivateCloudProjects;

      setPrivateCloudProjects(privateCloudProjects);
    }
  }, [loadingProjects, admin, allProjects, userProjects]);

  const rows = useMemo(
    () => privateCloudProjects.map(projectsToRows),
    [privateCloudProjects]
  );

  if (errors) return `Error! ${errors.message}`;

  return (
    <div>
      <TabsToolbar />
      <StickyTable
        onClick={onClickHandler}
        loading={loadingProjects}
        title={"Private Cloud Projects"}
        columns={columns}
        rows={rows}
      />
    </div>
  );
}
