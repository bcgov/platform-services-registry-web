import React, { useContext, useEffect, useState, useMemo } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import StickyTable from "./common/Table";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import AdminContext from "../context/admin";
import { useKeycloak } from "@react-keycloak/web";
import NavTabs from "../pages/NavTabs";

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

const statusLookup = {
  APPROVED: "APPROVED",
  PENDING_DECISION: "PENDING DECISION",
};

const statusColourLookup = {
  APPROVED: "success",
  PENDING_DECISION: "secondary",
  REJECTED: "error",
};

const typeLookup = {
  CREATE: "CREATE",
};

const columns = [
  { id: "type", label: "Type", minWidth: 0 },
  { id: "status", label: "Status", minWidth: 0 },
  { id: "name", label: "Name", minWidth: 0 },
  { id: "description", label: "Description", minWidth: 200 },
  { id: "ministry", label: "Ministry", minWidth: 0 },
  { id: "cluster", label: "Cluster", minWidth: 0 },
  { id: "projectOwner", label: "Project Owner", minWidth: 0 },
  { id: "technicalLeads", label: "Technical Leads", minWidth: 0 },
  { id: "licencePlate", label: "License Place", minWidth: 0 },
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
        githubId
      }
      technicalLeads {
        firstName
        lastName
        githubId
      }
      ... on PrivateCloudProject {
        cluster
        licencePlate
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

const requestsToRows = ({
  status,
  type,
  requestedProject: {
    name,
    description,
    licencePlate,
    projectOwner,
    technicalLeads,
    ministry,
    cluster,
  },
}) => ({
  name: <span style={{ fontSize: 16, fontWeight: "500" }}>{name}</span>,
  description: (
    <span style={{ fontSize: 14 }}> {truncate(description, 130)}</span>
  ),
  licencePlate: (
    <b style={{ fontSize: 16, fontWeight: "500" }}>{licencePlate}</b>
  ),
  ministry,
  cluster,
  projectOwner: (
    <Chip
      key={projectOwner.githubId}
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
      {technicalLeads.map(({ firstName, lastName, githubId }) => (
        <Chip
          key={githubId}
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
  status: (
    <Chip
      style={{ borderRadius: 7, fontWeight: "500" }}
      color={statusColourLookup[status]}
      variant="outlined"
      label={statusLookup[status]}
    />
  ),
  type: <Chip style={{ borderRadius: 7 }} label={typeLookup[type]} />,
});

export default function Requests() {
  const { admin } = useContext(AdminContext);
  const { keycloak } = useKeycloak();
  const [privateCloudActiveRequests, setPrivateCloudActiveRequests] = useState(
    []
  );

  const allActiveRequests = useQuery(ALL_ACTIVE_REQUESTS, {
    skip: !keycloak.hasResourceRole("admin", "registry-api"),
  });

  const [loadUserActiveRequests, userActiveRequests] =
    useLazyQuery(USER_ACTIVE_REQUESTS);

  if (!admin && !userActiveRequests.called) {
    loadUserActiveRequests();
  }

  const errors = userActiveRequests.error || allActiveRequests.error;
  const loadingRequests =
    userActiveRequests.loading || allActiveRequests.loading;

  const rows = useMemo(
    () => privateCloudActiveRequests.map(requestsToRows),
    [privateCloudActiveRequests]
  );

  useEffect(() => {
    if (!loadingRequests) {
      const privateCloudActiveRequests = admin
        ? allActiveRequests.data?.privateCloudActiveRequests
        : userActiveRequests.data?.userPrivateCloudActiveRequests;

      setPrivateCloudActiveRequests(privateCloudActiveRequests);
    }
  }, [loadingRequests, admin]);

  if (errors) return `Error! ${errors.message}`;

  return (
    <div>
      <NavTabs />
      <StickyTable
        loading={loadingRequests}
        title={"Active Requests"}
        columns={columns}
        rows={rows}
      />
    </div>
  );
}
