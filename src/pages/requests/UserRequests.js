import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import StickyTable from "../../components/common/Table";
import { requestsToRows, columns } from "./helpers";
import { EmptyAlert, ErrorAlert } from "../../components/common/Alert";
import EmptyList from "../../components/common/EmptyList";

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
    userPublicCloudRequests {
      id
      active
      decisionStatus
      type
      created
      requestedProject {
        name
        description
        ministry
        provider
        licencePlate
        projectOwner {
          email
          firstName
          lastName
          email
        }
        primaryTechnicalLead {
          email
          firstName
          lastName
          email
        }
        secondaryTechnicalLead {
          email
          firstName
          lastName
          email
        }
      }
    }
  }
`;

export default function Requests() {
  const { loading, error, data, startPolling } = useQuery(USER_REQUESTS);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    startPolling(8000);
  }, [startPolling]);

  if (error && error.message === "Not a user") {
    return <EmptyAlert />;
  } else if (error) {
    return <ErrorAlert error={error} />;
  }

  return !loading ? (
    data?.userPrivateCloudRequests?.length > 0 ||
    data?.userPublicCloudRequests?.length > 0 ? (
      <StickyTable
        columns={columns}
        rows={[
          ...data.userPrivateCloudRequests,
          ...data.userPublicCloudRequests,
        ]
          .sort((a, b) => (a.created > b.created ? 1 : -1))
          .map(requestsToRows)
          .reverse()}
        count={
          loading
            ? 0
            : data?.userPrivateCloudRequests?.length +
              data?.userPublicCloudRequests?.length
        }
        title="Active Requests"
        loading={loading}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    ) : (
      <EmptyList
        title="There are no requests to be displayed"
        subtitle="You currently have no provisioning requests for the Private Cloud OpenShift platform."
        isPublic={true}
        isPrivate={true}
      />
    )
  ) : null;
}
