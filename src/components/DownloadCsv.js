import React, { useEffect, useRef, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Slide from "@mui/material/Slide";
import { columns } from "../pages/projects/helpers";
import { Box } from "@mui/material";
import Papa from "papaparse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export const USER_FIELDS = gql`
  fragment UserFields on User {
    firstName
    lastName
    email
    githubId
  }
`;

const GET_CSV_DATA = gql`
  query Query($filter: FilterPrivateCloudProjectsInput, $search: String) {
    privateCloudProjectsWithFilterSearch(filter: $filter, search: $search) {
      id
      name
      description
      cluster
      ministry
      licencePlate
      projectOwner {
        ...UserFields
      }
      primaryTechnicalLead {
        ...UserFields
      }
      secondaryTechnicalLead {
        ...UserFields
      }
    }
  }
  ${USER_FIELDS}
`;

const flattenProject = (project) => {
  const {
    projectOwner,
    primaryTechnicalLead,
    secondaryTechnicalLead,
    ...rest
  } = project;
  return {
    ...rest,
    projectOwnerName: `${projectOwner.firstName} ${projectOwner.lastName}`,
    projectOnwerEmail: projectOwner.email,
    projectOwnerGithubId: projectOwner.githubId,

    primaryTechnicalLeadName: `${primaryTechnicalLead.firstName} ${primaryTechnicalLead.lastName}`,
    primaryTechnicalLeadEmail: primaryTechnicalLead.email,
    primaryTechnicalLeadGithubId: primaryTechnicalLead.githubId,

    secondaryTechnicalLeadName: secondaryTechnicalLead
      ? `${secondaryTechnicalLead.firstName} ${secondaryTechnicalLead.lastName}`
      : "",
    secondaryTechnicalLeadEmail: secondaryTechnicalLead
      ? secondaryTechnicalLead.email
      : "",
    secondaryTechnicalLeadGithubId: secondaryTechnicalLead
      ? secondaryTechnicalLead.githubId
      : "",
  };
};

const dowloadCsv = (csvString) => {
  let csvContent = "data:text/csv;charset=utf-8," + csvString;
  let encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "platform-registry-products");
  const elem = document.getElementById("csv-download-box");
  elem.appendChild(link).click();
  elem.removeChild(link);
};

export default function DownloadCsv({ ministry, cluster, search }) {
  // Create shared context for ministry, cluster, search (instead of passing them down as props)

  const [selectedFields, setSelectedFields] = useState(
    columns.map((column) => column.id)
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedFields(typeof value === "string" ? value.split(",") : value);
  };

  const [getCsvData, { data, error }] = useLazyQuery(GET_CSV_DATA, {
    variables: {
      filter: {
        ministry: ministry,
        cluster: cluster,
      },
      search: search,
    },
  });

  useEffect(() => {
    if (data) {
      const flattenedPrivateCloudProjects =
        data.privateCloudProjectsWithFilterSearch.map(flattenProject);

      // Replace the project owner header with the ones below
      const columns = [...selectedFields];
      const technicalLeadsIndex = columns.indexOf("technicalLeads");
      const projectOwnerIndex = columns.indexOf("projectOwner");

      if (projectOwnerIndex > -1) {
        columns.splice(
          projectOwnerIndex,
          1,
          "projectOwnerName",
          "projectOnwerEmail",
          "projectOwnerGithubId"
        );
      }
      // Replace the technicalLeads header with the ones below
      if (technicalLeadsIndex > -1) {
        columns.splice(
          technicalLeadsIndex,
          1,

          "primaryTechnicalLeadName",
          "primaryTechnicalLeadEmail",
          "primaryTechnicalLeadGithubId",
          "secondaryTechnicalLeadName",
          "secondaryTechnicalLeadEmail",
          "secondaryTechnicalLeadGithubId"
        );
      }
      const csvString = Papa.unparse(flattenedPrivateCloudProjects, {
        columns,
      });

      dowloadCsv(csvString);
    }
  }, [data]);

  if (error) return `Error! ${error.message}`;

  return (
    <Select
      sx={{ width: 200 }}
      labelId="demo-multiple-checkbox-label"
      id="demo-multiple-checkbox"
      size="small"
      multiple
      displayEmpty
      value={selectedFields}
      onChange={handleChange}
      input={<OutlinedInput />}
      renderValue={(selected) => {
        if (selected.length === columns.length) {
          return <em>All Fields</em>;
        }
        return selected.join(", ");
      }}
    >
      {columns.map((column) => (
        <MenuItem key={column.id} value={column.id}>
          <Checkbox checked={selectedFields.indexOf(column.id) > -1} />
          <ListItemText primary={column.label} />
        </MenuItem>
      ))}
    </Select>
  );
}
