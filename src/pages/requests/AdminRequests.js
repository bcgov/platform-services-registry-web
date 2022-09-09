import React, { useContext, useEffect, useState, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import StickyTable from "../../components/common/Table";
import { requestsToRows, columns } from "./helpers";
import AdminContext from "../../context/admin";

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
  const { admin } = useContext(AdminContext);

  const { loading, error, data } = useQuery(ALL_ACTIVE_REQUESTS);

  const rows = useMemo(() => {
    if (!loading && !error && data) {
      return data.privateCloudActiveRequests.map(requestsToRows);
    } else {
      return [];
    }
  }, [data]);

  if (error) return `Error! ${error.message}`;

  return (
    <StickyTable
      onClickPath={"/private-cloud/admin/request/"}
      columns={columns}
      rows={rows}
      title="Active Requests"
      loading={loading}
    />
  );
}
