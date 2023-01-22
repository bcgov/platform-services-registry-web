import React, { useContext, useEffect, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  columns,
  columnsXs,
  projectsToRows,
  projectsToRowsXs
} from "./helpers";
import StickyTable from "../../components/common/Table";
import SearchContext from "../../context/search";
import FilterContext from "../../context/filter";
import useWindowSize from "../../hooks/useWindowSize";
import { EmptyAlert, ErrorAlert } from "../../components/common/Alert";

const ALL_PROJECTS = gql`
  query PrivateCloudProjectsPaginated(
    $page: Int!
    $pageSize: Int!
    $filter: FilterPrivateCloudProjectsInput
    $search: String
  ) {
    privateCloudProjectsPaginated(
      page: $page
      pageSize: $pageSize
      filter: $filter
      search: $search
    ) {
      projects {
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
      total
    }
  }
`;

export default function Projects() {
  console.log("RENDER");
  const { debouncedSearch } = useContext(SearchContext);
  const { filter } = useContext(FilterContext);
  const { width } = useWindowSize();

  const { loading, data, fetchMore, refetch, error } = useQuery(ALL_PROJECTS, {
    nextFetchPolicy: "cache-first",
    variables: {
      page: 1,
      pageSize: 5,
      search: debouncedSearch,
      filter
    }
  });

  const getNextPage = useCallback(
    (page, pageSize) => {
      fetchMore({
        variables: {
          page,
          pageSize,
          search: debouncedSearch,
          filter
        }
      });
    },
    [filter, debouncedSearch]
  );

  if (error && error.message === "Not a user") {
    return <EmptyAlert />;
  } else if (error) {
    return <ErrorAlert error={error} />;
  }

  return !loading ? (
    <StickyTable
      onClickPath={"/private-cloud/admin/product/"}
      onNextPage={getNextPage}
      columns={width < 900 ? columnsXs : columns}
      rows={
        width < 900
          ? data?.privateCloudProjectsPaginated?.projects.map(projectsToRowsXs)
          : data?.privateCloudProjectsPaginated?.projects.map(projectsToRows)
      }
      count={loading ? 0 : data?.privateCloudProjectsPaginated?.total}
      title="Products"
      loading={loading}
    />
  ) : null;
}
