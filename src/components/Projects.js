import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
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
    privateCloudProjects {
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
  const { admin, toggleAdmin } = useContext(AdminContext);

  const { loading, error, data } = useQuery(
    admin ? ALL_PROJECTS : USER_PROJECTS
  );

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (data === undefined) return <p>ERROR</p>;

  const privateCloudProjects =
    data?.privateCloudProjects || data?.userPrivateCloudProjects;

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
