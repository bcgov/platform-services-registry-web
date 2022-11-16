import React, { useContext, useEffect, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import { columns, projectsToRows } from "./helpers";
import StickyTable from "../../components/common/Table";
import Alert from "../../components/common/Alert";
import SearchContext from "../../context/search";
import FilterContext from "../../context/filter";

const ALL_PROJECTS = gql`
  query PrivateCloudProjectsPaginated(
    $offset: Int!
    $limit: Int!
    $search: String
    $filter: FilterPrivateCloudProjectsInput
  ) {
    privateCloudProjectsCount(search: $search, filter: $filter)
    privateCloudProjectsPaginated(
      offset: $offset
      limit: $limit
      search: $search
      filter: $filter
    ) {
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
`;

export default function Projects() {
  const { debouncedSearch } = useContext(SearchContext);
  const { filter } = useContext(FilterContext);

  const { loading, data, fetchMore, refetch, error } = useQuery(ALL_PROJECTS, {
    nextFetchPolicy: "cache-first",
    variables: {
      offset: 0,
      limit: 10,
      search: debouncedSearch,
      filter,
    },
  });

  const getNextPage = useCallback(
    (page, pageSize) => {
      fetchMore({
        variables: {
          offset: page * pageSize,
          limit: pageSize,
          debouncedSearch,
          filter,
        },
      });
    },
    [filter, debouncedSearch, fetchMore]
  );

  if (error) {
    return <Alert error={error} />;
  }

  return (
    <StickyTable
      onClickPath={"/private-cloud/admin/product/"}
      onNextPage={getNextPage}
      columns={columns}
      rows={
        loading ? [] : data.privateCloudProjectsPaginated.map(projectsToRows)
      }
      count={loading ? 0 : data.privateCloudProjectsCount}
      title="Products"
      loading={loading}
    />
  );
}
