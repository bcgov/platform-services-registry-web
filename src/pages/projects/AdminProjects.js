import React, { useContext, useEffect, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import { columns, projectsToRows } from "./helpers";
import StickyTable from "../../components/common/Table";
import Alert from "../../components/common/Alert";
import SearchContext from "../../context/search";
import FilterContext from "../../context/filter";
import useDebounce from "../../components/utilities/UseDebounce";

const ALL_PROJECTS = gql`
  query PrivateCloudProjectsPaginated(
    $offset: Int!
    $limit: Int!
    $search: String
    $filter: FilterPrivateCloudProjectsInput
  ) {
    privateCloudProjectsPaginated(
      offset: $offset
      limit: $limit
      search: $search
      filter: $filter
    ) {
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
  const { search } = useContext(SearchContext);
  const { filter } = useContext(FilterContext);
  const debouncedSearch = useDebounce(search, 450);

  const { loading, data, fetchMore, refetch, error } = useQuery(ALL_PROJECTS, {
    variables: {
      offset: 0,
      limit: 10,
      search: null,
      filter: {
        cluster: null,
        ministry: null,
      },
    },
  });

  useEffect(() => {
    refetch({
      search: debouncedSearch,
      offset: 0,
      limit: 10,
      filter,
    });
  }, [filter, debouncedSearch, refetch]);

  // useCallback is required to prevet fetchMore from being called on every render
  const getNextPage = useCallback(
    (page, pageSize) =>
      fetchMore({
        variables: {
          offset: page * pageSize,
          limit: pageSize,
          filter,
          search: debouncedSearch,
        },
      }),
    [filter, debouncedSearch, fetchMore]
  );

  if (error) {
    return <Alert error={error} />;
  }

  return (
    <StickyTable
      onClickPath={"/private-cloud/admin/project/"}
      onNextPage={getNextPage}
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
