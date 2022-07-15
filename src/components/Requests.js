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

export const ACTIVE_REQUEST_FIELDS = gql`
  fragment ActiveRequestFields on Request {
    id
    status
    type
    requestedProject {
      name
      description
      projectOwner {
        firstName
        lastName
      }
      technicalLeads {
        firstName
        lastName
      }
      ... on PrivateCloudProject {
        cluster
      }
      ministry
    }
  }
`;

const USER_ACTIVE_REQUESTS = gql`
  ${ACTIVE_REQUEST_FIELDS}
  query UserPrivateCloudActiveRequests {
    userPrivateCloudActiveRequests {
      ...ActiveRequestFields
    }
  }
`;

const ALL_ACTIVE_REQUESTS = gql`
  ${ACTIVE_REQUEST_FIELDS}
  query PrivateCloudActiveRequests {
    privateCloudActiveRequests {
      ...ActiveRequestFields
    }
  }
`;

export default function Requests() {
  const { admin } = useContext(AdminContext);

  const [loadUserActiveRequests, userActiveRequests] =
    useLazyQuery(USER_ACTIVE_REQUESTS);
  const allActiveRequests = useQuery(ALL_ACTIVE_REQUESTS);

  if (!admin && !userActiveRequests.called) {
    loadUserActiveRequests();
    return "Loading...";
  }

  const errors = userActiveRequests.error || allActiveRequests.error;
  const loading = userActiveRequests.loading || allActiveRequests.loading;

  if (loading) return "Loading...";
  if (errors) return `Error! ${errors.message}`;

  const privateCloudActiveRequests = admin
    ? allActiveRequests.data?.privateCloudActiveRequests
    : userActiveRequests.data?.userPrivateCloudActiveRequests;

  const rows = privateCloudActiveRequests.map(
    ({
      status,
      type,
      requestedProject: {
        name,
        description,
        projectOwner,
        technicalLeads,
        ministry,
        cluster,
      },
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
      status,
      type: <Chip style={{ borderRadius: 7 }} label={type} />,
    })
  );

  return <Table columns={columns} rows={rows} />;
}
