import { InfoAlert, ErrorAlert } from "../../../components/common/Alert";
import { useState, useContext, useEffect, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  columnsPublic,
  columnsXs,
  projectsToRows,
  projectsToRowsXs
} from "./helpers";
import StickyTable from "../../../components/common/Table";
import SearchContext from "../../../context/search";
import FilterContext from "../../../context/publicCloudFilter";
import SortContext from "../../../context/sort";
import useWindowSize from "../../../hooks/useWindowSize";
import EmptyList from "../../../components/common/EmptyList";
import UserContext from "../../../context/user";

const USER_PROJECTS = gql`
  query PublicCloudProjectsPaginated(
    $page: Int!
    $pageSize: Int!
    $filter: FilterPublicCloudProjectsInput
    $search: String
    $sortOrder: Int
    $userId: String
  ) {
    publicCloudProjectsPaginated(
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
  const userContext = useContext(UserContext);
  const { width } = useWindowSize();

  const { loading, data, fetchMore, startPolling, error } = useQuery(
    USER_PROJECTS,
    {
      nextFetchPolicy: "cache-first",
      //nextFetchPolicy: "cache-first",
      variables: {
        page: page,
        pageSize: rowsPerPage,
        search: debouncedSearch,
        filter,
        sortOrder,
        userId: userContext.id
      }
    }
  );

  useEffect(() => {
    startPolling(25000);
  }, [startPolling]);

  // Add this useEffect hook to handle rowsPerPage change
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
      {data.publicCloudProjectsPaginated?.projects.length > 0 ? (
        <StickyTable
          onNextPage={getNextPage}
          columns={width < 900 ? columnsXs : columnsPublic}
          rows={
            width < 900
              ? data?.publicCloudProjectsPaginated?.projects
                  .map(projectsToRowsXs)
                  .reverse()
              : data?.publicCloudProjectsPaginated?.projects.map(projectsToRows)
          }
          count={loading ? 0 : data?.publicCloudProjectsPaginated?.total}
          title="Products"
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
      )}
    </>
  ) : null;
}
