import React, { useEffect, useState, useContext, useCallback } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { columns } from "../pages/projects/helpers";
import Papa from "papaparse";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchContext from "../context/search";
import FilterContext from "../context/filter";

export const USER_FIELDS = gql`
  fragment UserFields on User {
    firstName
    lastName
    email
  }
`;

const GET_CSV_DATA = gql`
  query PrivateCloudProjectsWithFilterSearch(
    $filter: FilterPrivateCloudProjectsInput
    $search: String
  ) {
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

    primaryTechnicalLeadName: `${primaryTechnicalLead.firstName} ${primaryTechnicalLead.lastName}`,
    primaryTechnicalLeadEmail: primaryTechnicalLead.email,

    secondaryTechnicalLeadName: secondaryTechnicalLead
      ? `${secondaryTechnicalLead.firstName} ${secondaryTechnicalLead.lastName}`
      : "",
    secondaryTechnicalLeadEmail: secondaryTechnicalLead
      ? secondaryTechnicalLead.email
      : "",
  };
};

// Replaces technicalLead or projectOwner with seperate headers for the name, email
const transformSelectedFields = (selectedFields) => {
  const columns = [...selectedFields];
  // Replace the project owner header with the ones below
  const projectOwnerIndex = columns.indexOf("projectOwner");

  if (projectOwnerIndex > -1) {
    columns.splice(
      projectOwnerIndex,
      1,
      "projectOwnerName",
      "projectOnwerEmail"
    );
  }

  const technicalLeadsIndex = columns.indexOf("technicalLeads");

  // Replace the technicalLeads header with the ones below
  if (technicalLeadsIndex > -1) {
    columns.splice(
      technicalLeadsIndex,
      1,

      "primaryTechnicalLeadName",
      "primaryTechnicalLeadEmail",
      "secondaryTechnicalLeadName",
      "secondaryTechnicalLeadEmail"
    );
  }

  return columns;
};

const downloadCsv = (csvString) => {
  let csvContent = "data:text/csv;charset=utf-8," + csvString;
  let encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "Project_Registry.csv");
  const elem = document.getElementById("csv-download-box");
  elem.appendChild(link).click();
  elem.removeChild(link);
};

export default function DownloadCsv() {
  const [open, setOpen] = useState(false);
  const [openFinished, setOpenFinished] = useState(false);
  const [selectedFields, setSelectedFields] = useState(
    columns.map((column) => column.id)
  );

  // Create shared context for ministry, cluster, search (instead of passing them down as props)
  const { debouncedSearch } = useContext(SearchContext);
  const { filter } = useContext(FilterContext);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedFields(typeof value === "string" ? value.split(",") : value);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleMouseEnter = () => {
    setOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenFinished(!open);
    }, 350);
  }, [open]);

  const [getCsvData, { data, error }] = useLazyQuery(GET_CSV_DATA, {
    fetchPolicy: "no-cache", // Prevents error where query is called on every render
  });

  // Generate and download the csv file when the data is returned from the query
  useEffect(() => {
    if (data) {
      const flattenedPrivateCloudProjects =
        data.privateCloudProjectsWithFilterSearch.map(flattenProject);

      const columns = transformSelectedFields(selectedFields);

      const csvString = Papa.unparse(flattenedPrivateCloudProjects, {
        columns,
      });

      downloadCsv(csvString);
    }
  }, [data, selectedFields]);

  const csvDownloadButton = (
    <IconButton
      size="small"
      onClick={() => {
        getCsvData({
          variables: { filter, search: debouncedSearch },
        });
      }}
      onMouseEnter={handleMouseEnter}
      disabled={!selectedFields.length > 0}
    >
      <CloudDownloadIcon />
    </IconButton>
  );

  const chevronLeft = (
    <IconButton
      style={{
        overflow: "hidden",
        transition: "width 0.3s",
        transitionDelay: "0.3s",
        transitionTimingFunction: "ease-out",
        width: !open ? 33 : 0,
        visibility: !openFinished ? "hidden" : "visible",
      }}
      size="small"
      onMouseEnter={handleMouseEnter}
    >
      <ChevronLeftIcon />
    </IconButton>
  );

  if (error) return `Error! ${error.message}`;

  return (
    <div
      id="csv-download-box"
      style={{
        display: "flex",
        border: "1px solid #cbcbcb",
        borderRadius: "5px",
        marginRight: "10px",
        height: 38.5,
        paddingRight: 5,
      }}
      onMouseLeave={handleMouseLeave}
    >
      {chevronLeft}
      <div
        style={{
          overflow: "hidden",
          transition: "width 0.8s",
          transitionTimingFunction: "ease-out",
          width: open ? 210 : 0,
        }}
      >
        <FormControl variant="standard" sx={{ m: 1 }}>
          <Select
            sx={{ width: 200 }}
            disableUnderline
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            size="small"
            multiple
            value={selectedFields}
            onChange={handleChange}
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
        </FormControl>
      </div>
      {csvDownloadButton}
    </div>
  );
}
