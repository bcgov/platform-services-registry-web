import React from "react";
import { useQuery, gql } from "@apollo/client";
import { columns, projectsToRows } from "./helpers";
import StickyTable from "../../components/common/Table";
import Alert from "../../components/common/Alert";

const ALL_PROJECTS = gql`
  query PrivateCloudProjectsPaginated($offset: Int, $limit: Int) {
    privateCloudProjectsPaginated(offset: $offset, limit: $limit) {
      count
      projects {
        ... on PrivateCloudProject {
          id
          name
          description
          cluster
          ministry
          licencePlate
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
        }
      }
    }
  }
`;

export default function Projects() {
  const { loading, data, fetchMore, error } = useQuery(ALL_PROJECTS, {
    variables: {
      offset: 0,
      limit: 20,
    },
  });

  if (error) {
    return <Alert error={error} />;
  }

  return (
    <StickyTable
      onClickPath={"/private-cloud/admin/project/"}
      onNextPage={(page, pageSize) =>
        fetchMore({ variables: { offset: page * pageSize, limit: pageSize } })
      }
      columns={columns}
      rows={
        loading
          ? []
          : data.privateCloudProjectsPaginated.projects.map(projectsToRows)
      }
      count={loading ? 0 : data.privateCloudProjectsPaginated.count}
      title="Projects"
      loading={loading}
    />
  );
}
