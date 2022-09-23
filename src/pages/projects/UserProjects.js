import React, { useContext, useEffect, useState, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { columns, projectsToRows } from "./helpers";
import StickyTable from "../../components/common/Table";
import AdminContext from "../../context/admin";

const USER_PROJECTS = gql`
  query UserProjects {
    userPrivateCloudProjects {
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

  const { loading, error, data } = useQuery(USER_PROJECTS);

  if (error) return `Error! ${error.message}`;

  return (
    <StickyTable
      onClickPath={"/private-cloud/user/project/"}
      columns={columns}
      rows={loading ? [] : data.userPrivateCloudProjects.map(projectsToRows)}
      title="Projects"
      loading={loading}
    />
  );
}
