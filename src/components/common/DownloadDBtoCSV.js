/* eslint-disable no-undef */
import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { columns } from "../../pages/projects/helpers";
import { Box } from "@mui/material";

const DB_TO_CSV = gql`
  query privateCloudProjectsCSV(
    $filter: FilterPrivateCloudProjectsInput,
    $search: String,
     ) {
        privateCloudProjectsCSV(        
          filter:$filter,
        search:$search,
    ) {
       
      projects {
        ... on PrivateCloudProject {
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
    }
     }
`;
export default function DownloadDBtoCSV({
  ministry,
  cluster,
  search,
}) {
  const [fields, setFields] = useState(columns.map(column => column.id))

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFields(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const createCSVString = (fileData) => {
    let subFields = `${Object.keys(fileData[0]).filter(field => fields.indexOf(field) !== -1).join(',')}\n`

    fileData.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if ((Array.isArray(item[key]))) {
          item[key].forEach((lead) => {
            if (fields.indexOf(key) !== -1) {
              subFields += `${lead.firstName} ${lead.lastName} `
            }
          })
          subFields += ','
        }
        else if (typeof (item[key]) !== 'object' && !Array.isArray(item[key])) {
          if (fields.indexOf(key) !== -1) { subFields += `${item[key]},` }
        }
        else {
          if (fields.indexOf(key) !== -1) {
            subFields += `${item[key].firstName} ${item[key].lastName},`
          }
        }
      })
      subFields += '\n'
    })
    return subFields
  }

  const createFile = (fileData) => {
    let csvContent = "data:text/csv;charset=utf-8," + createCSVString(fileData);
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${new Date()}collection.csv`);
    const elem = document.getElementById('csv-download-box')
    elem.appendChild(link).click();
    elem.removeChild(link)
  }

  const [loadCollection, { data, error }] = useLazyQuery(DB_TO_CSV, {
    variables: {
      filter: {
        ministry: ministry,
        cluster: cluster,
      },
      search: search
    },
  });
  if (error) return `Error! ${error.message}`;

  data && createFile(data.privateCloudProjectsCSV.projects)

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', p: 0 }} id='csv-download-box'>
      <FormControl sx={{ m: 0, width: 300 }}>
        <InputLabel>Fields</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={fields}
          onChange={handleChange}
          input={<OutlinedInput label="Field" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {columns.map((column) => (
            <MenuItem key={column.id}
              value={column.id}>
              <Checkbox checked={fields.indexOf(column.id) > -1} />
              <ListItemText primary={column.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton size="large" onClick={() => loadCollection()} disabled={!fields.length > 0}>
        <CloudDownloadIcon />
      </IconButton>
    </Box>
  );
}
