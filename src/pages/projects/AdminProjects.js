import React, { useContext, useEffect, useState, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { columns, projectsToRows } from "./helpers";
import StickyTable from "../../components/common/Table";
import AdminContext from "../../context/admin";

const ALL_PROJECTS = gql`
  query PrivateCloudProjects {
    privateCloudProjects {
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
      technicalLeads {
        firstName
        lastName
        githubId
      }
    }
  }
`;

export default function Projects() {
  const { admin } = useContext(AdminContext);

  const { loading, error, data } = useQuery(ALL_PROJECTS);

  const rows = useMemo(() => {
    if (!loading && !error && data) {
      return data.privateCloudProjects.map(projectsToRows);
    } else {
      return [];
    }
  }, [data]);

  if (error) return `Error! ${error.message}`;

  return (
    <StickyTable
      onClickPath={"/private-cloud/admin/project/"}
      columns={columns}
      rows={rows}
      title="Projects"
      loading={loading}
    />
  );
}
