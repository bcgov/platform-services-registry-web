import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import Table from "./Common/Table";
import Chip from "@mui/material/Chip";

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

const ME = gql`
  query GetMe {
    me {
      firstName
      lastName
      activeRequests {
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
    }
  }
`;

export default function Requests() {
  const { loading, error, data } = useQuery(ME);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const { activeRequests } = data.me;

  const rows = activeRequests.map(
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

  return !!data.me && <Table columns={columns} rows={rows} />;
}
