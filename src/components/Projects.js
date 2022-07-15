import React, { useContext } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import Table from "./common/Table";
import Chip from "@mui/material/Chip";
import AdminContext from "../context/admin";

const columns = [
  { id: "type", label: "Type", minWidth: 0 },
  { id: "name", label: "Name", minWidth: 0 },
  { id: "description", label: "Description", minWidth: 200 },
  { id: "ministry", label: "Ministry", minWidth: 0 },
  { id: "cluster", label: "Cluster", minWidth: 0 },
  { id: "projectOwner", label: "Project Owner", minWidth: 0 },
  { id: "technicalLeads", label: "Technical Leads", minWidth: 0 },
  { id: "status", label: "Status", minWidth: 0 },
  { id: "licensePlate", label: "License Place", minWidth: 0 },
];

export const PROJECT_FIELDS = gql`
  fragment ProjectFields on PrivateCloudProject {
    id
    name
    description
    cluster
    ministry
    projectOwner {
      firstName
      lastName
    }
    technicalLeads {
      firstName
      lastName
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

export default function Requests() {
  const { admin } = useContext(AdminContext);

  const [loadUserProjects, userProjects] = useLazyQuery(USER_PROJECTS);
  const allProjects = useQuery(ALL_PROJECTS);

  if (!admin && !userProjects.called) {
    loadUserProjects();
    return "Loading...";
  }

  const errors = userProjects.error || allProjects.error;
  const loading = userProjects.loading || allProjects.loading;

  if (loading) return "Loading...";
  if (errors) return `Error! ${errors.message}`;

  const privateCloudProjects = admin
    ? allProjects.data?.privateCloudProjects
    : userProjects.data?.userPrivateCloudProjects;

  const rows = privateCloudProjects.map(
    ({
      name,
      description,
      projectOwner,
      technicalLeads,
      ministry,
      cluster,
    }) => ({
      name,
      description,
      ministry,
      cluster,
      projectOwner: `${projectOwner.firstName} ${projectOwner.lastName}`,
      technicalLeads: (
        <div>
          {technicalLeads.map(({ firstName, lastName }, i) => (
            <div key={i}>{`${firstName} ${lastName}`}</div>
          ))}
        </div>
      ),
    })
  );

  return <Table columns={columns} rows={rows} />;
}
