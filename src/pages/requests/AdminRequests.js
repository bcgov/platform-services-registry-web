import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import StickyTable from "../../components/common/Table";
import { requestsToRows, columns } from "./helpers";
import { EmptyAlert, ErrorAlert } from "../../components/common/Alert";

export const ALL_ACTIVE_REQUESTS = gql`
  query PrivateCloudActiveRequests {
    privateCloudActiveRequests {
      id
      active
      decisionStatus
      type
      created
      requestedProject {
        name
        description
        ministry
        cluster
        licencePlate
        projectOwner {
          firstName
          lastName
          email
        }
        primaryTechnicalLead {
          firstName
          lastName
          email
        }
        secondaryTechnicalLead {
          firstName
          lastName
          email
        }
      }
    }
  }
`;

export default function Requests() {
  const { loading, error, data, startPolling } = useQuery(ALL_ACTIVE_REQUESTS);

  useEffect(() => {
    startPolling(8000);
  }, [startPolling]);

  if (error && error.message === "Not a user") {
    return <EmptyAlert />;
  } else if (error) {
    return <ErrorAlert error={error} />;
  }

  return !loading ? (
    <StickyTable
      onClickPath={"/private-cloud/admin/request/"}
      columns={columns}
      rows={data.privateCloudActiveRequests.map(requestsToRows).reverse()}
      title="Active Requests"
      loading={loading}
      count={loading ? 0 : data?.privateCloudActiveRequests?.length}
    />
  ) : null;
}
