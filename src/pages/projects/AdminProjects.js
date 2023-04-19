import React, { useState, useContext, useEffect, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  columns,
  columnsXs,
  projectsToRows,
  projectsToRowsXs,
} from "./helpers";
import StickyTable from "../../components/common/Table";
import SearchContext from "../../context/search";
import FilterContext from "../../context/filter";
import SortContext from "../../context/sort";
import useWindowSize from "../../hooks/useWindowSize";
import { EmptyAlert, ErrorAlert } from "../../components/common/Alert";
import EmptyList from "../../components/common/EmptyList";


const ALL_PROJECTS = gql`
  query PrivateCloudProjectsPaginated(
    $page: Int!
    $pageSize: Int!
    $filter: FilterPrivateCloudProjectsInput
    $search: String
    $sortOrder: Int
  ) {
    privateCloudProjectsPaginated(
      page: $page
      pageSize: $pageSize
      filter: $filter
      search: $search
      sortOrder: $sortOrder
    ) {
      projects {
        id
        name
        description
        cluster
        ministry
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
      total
    }
  }
`;

export default function Projects() {
  const { debouncedSearch } = useContext(SearchContext);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const { filter } = useContext(FilterContext);
  const { sortOrder } = useContext(SortContext);
  const { width } = useWindowSize();

  const { loading, data, fetchMore, startPolling, error } = useQuery(
    ALL_PROJECTS,
    {
      nextFetchPolicy: "cache-first",
      variables: {
        page: page,
        pageSize: rowsPerPage,
        search: debouncedSearch,
        filter,
        sortOrder,
      },
      pollInterval: 500,
    }
  );

  useEffect(() => {
    startPolling(7000);
  }, [startPolling]);

  const getNextPage = useCallback(
    (page, pageSize) => {
      setPage(page + 1)
      fetchMore({
        variables: {
          page: page,
          pageSize,
          search: debouncedSearch,
          filter,
          sortOrder: sortOrder,
        },
      });
    },
    [filter, debouncedSearch, sortOrder]
  );

  if (error && error.message === "Not a user") {
    return <EmptyAlert />;
  } else if (error) {
    return <ErrorAlert error={error} />;
  }

  return !loading ?
    <>
      <div className="Loaded-indicator" />
      {data.privateCloudProjectsPaginated?.projects.length > 0 ? <StickyTable
        onClickPath={"/private-cloud/admin/product/"}
        onNextPage={getNextPage}
        columns={width < 900 ? columnsXs : columns}
        rows={
          width < 900
            ? data?.privateCloudProjectsPaginated?.projects
              .map(projectsToRowsXs)
              .reverse()
            : data?.privateCloudProjectsPaginated?.projects.map(projectsToRows)
        }
        count={loading ? 0 : data?.privateCloudProjectsPaginated?.total}
        title="Products"
        loading={loading}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      /> :
        <EmptyList
          title='There are no products to be displayed'
          subtitle='You currently have no products hosted on the Private Cloud OpenShift platform.'
        />
      }
    </>
    : null;
}
