import React from "react";
import { useQuery, gql } from "@apollo/client";
import StickyTable from "../../components/common/Table";
import { requestsToRows, columns } from "./helpers";
import { EmptyAlert, ErrorAlert } from "../../components/common/Alert";

export const USER_ACTIVE_REQUESTS = gql`
  query UserPrivateCloudActiveRequests {
    userPrivateCloudActiveRequests {
      id
      active,
      decisionStatus
      type
      requestedProject {
        name
        description
        projectOwner {
          firstName
          lastName
          githubId
        }
        primaryTechnicalLead {
          firstName
          lastName
          githubId
        }
        secondaryTechnicalLead {
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
  const { loading, error, data } = useQuery(USER_ACTIVE_REQUESTS);

  if (error && error.message === "Not a user") {
    return <EmptyAlert />;
  } else if (error) {
    return <ErrorAlert error={error} />;
  }

  return !loading ? (
    <StickyTable
      onClickPath={"/private-cloud/user/request/"}
      columns={columns}
      rows={data.userPrivateCloudActiveRequests.map(requestsToRows).reverse()}
      title="Active Requests"
      loading={loading}
    />
  ) : null;
}
