import React, { useState, useEffect, useContext, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import { columns, projectsToRows } from "./helpers";
import StickyTable from "../../../components/common/Table";
import { InfoAlert, ErrorAlert } from "../../../components/common/Alert";
import EmptyList from "../../../components/common/EmptyList";
import SearchContext from "../../../context/search";
import FilterContext from "../../../context/filter";
import SortContext from "../../../context/sort";
import UserContext from "../../../context/user";

const USER_PROJECTS = gql`
  query PrivateCloudProjectsPaginated(
    $page: Int!
    $pageSize: Int!
    $filter: FilterPrivateCloudProjectsInput
    $search: String
    $sortOrder: Int
    $userId: String
  ) {
    privateCloudProjectsPaginated(
      page: $page
      pageSize: $pageSize
      filter: $filter
      search: $search
      sortOrder: $sortOrder
      userId: $userId
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
      total
    }
  }
`;

export default function Projects() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { debouncedSearch } = useContext(SearchContext);
  const [page, setPage] = useState(1);
  const { filter } = useContext(FilterContext);
  const { sortOrder } = useContext(SortContext);
  const userContext = useContext(UserContext);

  const { loading, data, fetchMore, startPolling, error } = useQuery(
    USER_PROJECTS,
    {
      variables: {
        page: page,
        pageSize: rowsPerPage,
        search: debouncedSearch,
        filter,
        sortOrder,
        userId: userContext.id
      }
      // fetchPolicy: "network-only"
    }
  );

  useEffect(() => {
    startPolling(15000);
  }, [startPolling]);

  useEffect(() => {
    fetchMore({
      variables: {
        page: 1,
        pageSize: rowsPerPage,
        search: debouncedSearch,
        filter,
        sortOrder,
        userId: userContext.id
      }
    });
    setPage(1);
  }, [rowsPerPage, debouncedSearch, filter, sortOrder, fetchMore]);

  useEffect(() => {
    fetchMore({
      variables: {
        page: 1,
        pageSize: rowsPerPage,
        search: debouncedSearch,
        filter,
        sortOrder,
        userId: userContext.id
      }
    });
  }, []);

  const getNextPage = useCallback(
    (page, pageSize) => {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchMore({
          variables: {
            page: nextPage,
            pageSize,
            search: debouncedSearch,
            filter,
            sortOrder,
            userId: userContext.id
          }
        });
        return nextPage;
      });
    },
    [filter, debouncedSearch, sortOrder]
  );

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

  return !loading ? (
    <>
      <div className="Loaded-indicator" />
      {data.privateCloudProjectsPaginated?.projects.length > 0 ? (
        <StickyTable
          onClickPath={"/private-cloud/user/product/"}
          onNextPage={getNextPage}
          columns={columns}
          rows={data?.privateCloudProjectsPaginated?.projects.map(
            projectsToRows
          )}
          count={loading ? 0 : data?.privateCloudProjectsPaginated?.total}
          title="Products"
          loading={loading}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      ) : (
        <EmptyList
          title="There are no products to be displayed"
          subtitle="You currently have no products hosted on the Private Cloud OpenShift platform."
          isPrivate={true}
          isPublic={false}
        />
      )}
    </>
  ) : null;
}
