import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import StickyTable from "../../components/common/Table";
import { adminRequestsToRows, columns } from "./helpers";
import { EmptyAlert, ErrorAlert } from "../../components/common/Alert";
import EmptyList from "../../components/common/EmptyList";

export const ALL_ACTIVE_REQUESTS = gql`
  query AllActiveRequests {
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
          email
          firstName
          lastName
          isNew{
            public
            private
          }
        }
        primaryTechnicalLead {
          email
          firstName
          lastName
          isNew{
            public
            private
          }
        }
        secondaryTechnicalLead {
          email
          firstName
          lastName
          isNew{
            public
            private
          }
        }
      }
    }
    publicCloudActiveRequests {
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
          isNew{
            public
            private
          }
        }
        primaryTechnicalLead {
          email
          firstName
          lastName
          isNew{
            public
            private
          }
        }
        secondaryTechnicalLead {
          email
          firstName
          lastName
          isNew{
            public
            private
          }
        }
      }
    }
  }
`;

export default function Requests() {
  const { loading, error, data, startPolling } = useQuery(ALL_ACTIVE_REQUESTS);
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
    data?.privateCloudActiveRequests?.length > 0 ||
    data?.publicCloudActiveRequests?.length > 0 ? (
      <StickyTable
        columns={columns}
        rows={[
          ...data.privateCloudActiveRequests,
          ...data.publicCloudActiveRequests,
        ]
          .sort((a, b) => (a.created > b.created ? 1 : -1))
          .map(adminRequestsToRows)
          .reverse()}
        title="Active Requests"
        loading={loading}
        count={
          loading
            ? 0
            : data?.privateCloudActiveRequests?.length +
              data?.publicCloudActiveRequests?.length
        }
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
