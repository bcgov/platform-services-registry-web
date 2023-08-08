<<<<<<< HEAD
=======
import { useState, useEffect, useContext, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import {  columns,
  columnsXs,
  projectsToRows,
  projectsToRowsXs } from "./helpers";
import StickyTable from "../../../components/common/Table";
>>>>>>> ed6457e752766584395421af818ad9ac67dbf1c4
import { InfoAlert, ErrorAlert } from "../../../components/common/Alert";
import { useState, useContext, useEffect, useCallback } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  columns,
  columnsXs,
  projectsToRows,
  projectsToRowsXs,
} from "./helpers";
import StickyTable from "../../../components/common/Table";
import SearchContext from "../../../context/search";
import FilterContext from "../../../context/publicCloudFilter";
import SortContext from "../../../context/sort";
import useWindowSize from "../../../hooks/useWindowSize";
import EmptyList from "../../../components/common/EmptyList";
import SearchContext from "../../../context/search";
import FilterContext from "../../../context/publicCloudFilter";
import SortContext from "../../../context/sort";
import UserContext from "../../../context/user";
import useWindowSize from "../../../hooks/useWindowSize";

const USER_PROJECTS = gql`
<<<<<<< HEAD
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
=======
query PublicCloudProjectsPaginated(
  $page: Int!
  $pageSize: Int!
  $filter: FilterPublicCloudProjectsInput
  $search: String
  $sortOrder: Int
) {
  publicCloudProjectsPaginated(
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
>>>>>>> ed6457e752766584395421af818ad9ac67dbf1c4
      }
      total
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
<<<<<<< HEAD
=======
  const userContext = useContext(UserContext);
>>>>>>> ed6457e752766584395421af818ad9ac67dbf1c4
  const { width } = useWindowSize();

  const { loading, data, fetchMore, startPolling, error } = useQuery(
    USER_PROJECTS,
    {
<<<<<<< HEAD
      nextFetchPolicy: "cache-first",
=======
      //nextFetchPolicy: "cache-first",
>>>>>>> ed6457e752766584395421af818ad9ac67dbf1c4
      variables: {
        page: page,
        pageSize: rowsPerPage,
        search: debouncedSearch,
        filter,
        sortOrder,
<<<<<<< HEAD
      },
=======
        userId: userContext.id
      }
>>>>>>> ed6457e752766584395421af818ad9ac67dbf1c4
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
<<<<<<< HEAD
      },
=======
        userId: userContext.id,
      }
>>>>>>> ed6457e752766584395421af818ad9ac67dbf1c4
    });
    setPage(1);
  }, [rowsPerPage, debouncedSearch, filter, sortOrder, fetchMore]);

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
<<<<<<< HEAD
          },
=======
            userId: userContext.id,
          }
>>>>>>> ed6457e752766584395421af818ad9ac67dbf1c4
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
<<<<<<< HEAD
    <>
      <div className="Loaded-indicator" />
      {data.publicCloudProjectsPaginated?.projects.length > 0 ? (
        <StickyTable
          onNextPage={getNextPage}
          columns={width < 900 ? columnsXs : columns}
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
=======
    data?.publicCloudProjectsPaginated?.projects.length > 0 ? (
      <StickyTable
      onNextPage={getNextPage}
      columns={width < 900 ? columnsXs : columns}
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
    )
>>>>>>> ed6457e752766584395421af818ad9ac67dbf1c4
  ) : null;
}
