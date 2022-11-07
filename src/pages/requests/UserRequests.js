import React from "react";
import { useQuery, gql } from "@apollo/client";
import StickyTable from "../../components/common/Table";
import { requestsToRows, columns } from "./helpers";
import Alert from "../../components/common/Alert";

const USER_ACTIVE_REQUESTS = gql`
  query UserPrivateCloudActiveRequests {
    userPrivateCloudActiveRequests {
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

  if (error) {
    return <Alert error={error} />;
  }

  return (
    <StickyTable
      onClickPath={"/private-cloud/user/request/"}
      columns={columns}
      rows={
        loading
          ? []
          : data.userPrivateCloudActiveRequests.map(requestsToRows).reverse()
      }
      title="Active Requests"
      loading={loading}
    />
  );
}
