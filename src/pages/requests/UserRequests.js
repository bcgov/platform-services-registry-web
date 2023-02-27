import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import StickyTable from "../../components/common/Table";
import { requestsToRows, columns } from "./helpers";
import { EmptyAlert, ErrorAlert } from "../../components/common/Alert";

export const USER_REQUESTS = gql`
  query UserPrivateCloudRequests {
    userPrivateCloudRequests {
      id
      active
      decisionStatus
      type
      created
      requestedProject {
        name
        description
        projectOwner {
          email
          firstName
          lastName
        }
        primaryTechnicalLead {
          email
          firstName
          lastName
        }
        secondaryTechnicalLead {
          email
          firstName
          lastName
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
  const { loading, error, data, startPolling } = useQuery(USER_REQUESTS);

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
      onClickPath={"/private-cloud/user/request/"}
      columns={columns}
      rows={data.userPrivateCloudRequests.map(requestsToRows).reverse()}
      count={loading ? 0 : data?.userPrivateCloudRequests?.length}
      title="Active Requests"
      loading={loading}
    />
  ) : null;
}
