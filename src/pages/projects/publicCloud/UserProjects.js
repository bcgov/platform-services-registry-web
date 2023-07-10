import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { columns, projectsToRows } from "./helpers";
import StickyTable from "../../../components/common/Table";
import { InfoAlert, ErrorAlert } from "../../../components/common/Alert";
import EmptyList from "../../../components/common/EmptyList";

const USER_PROJECTS = gql`
  query UserProjects {
    userPublicCloudProjects {
      id
      name
      description
      ministry
      provider
      licencePlate
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
    }
  }
`;

export default function Projects() {
  const { loading, error, data, startPolling } = useQuery(USER_PROJECTS);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    startPolling(15000);
  }, [startPolling]);

  if (error && error.message === "Not a user") {
    return (
      <InfoAlert
        title="You don't have any products yet"
        message={
          <p>
            You will see products here once you are assigned as product owner or
            technical lead. Use the <strong>create</strong> button to create
            your own product.
          </p>
        }
      />
    );
  } else if (error) {
    return <ErrorAlert error={error} />;
  }
console.log(data)
  return !loading ? (
    data?.userPrivateCloudProjects?.length > 0 ? (
      <StickyTable
        columns={columns}
        rows={data.userPrivateCloudProjects.map(projectsToRows)}
        count={loading ? 0 : data?.userPrivateCloudProjects?.length}
        title="Projects"
        loading={loading}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    ) : (
      <EmptyList
        title="There are no products to be displayed"
        subtitle="You currently have no products hosted on the Private Cloud OpenShift platform."
        isPrivate={false}
        isPublic={true}
      />
    )
  ) : null;
}
