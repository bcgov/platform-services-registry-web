import React from "react";
import { useQuery, gql } from "@apollo/client";
import StickyTable from "../../components/common/Table";
import { requestsToRows, columns } from "./helpers";

const ALL_ACTIVE_REQUESTS = gql`
  query PrivateCloudActiveRequests {
    privateCloudActiveRequests {
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
  }
`;

export default function Requests() {
  const { loading, error, data } = useQuery(ALL_ACTIVE_REQUESTS);

  if (error) return `Error! ${error.message}`;

  return (
    <StickyTable
      onClickPath={"/private-cloud/admin/request/"}
      columns={columns}
      rows={
        loading
          ? []
          : data.privateCloudActiveRequests.map(requestsToRows).reverse()
      }
      title="Active Requests"
      loading={loading}
    />
  );
}
