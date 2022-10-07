/* eslint-disable no-undef */
import React, {useState} from "react";
import { gql, useLazyQuery } from "@apollo/client";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { columns } from "../../pages/projects/helpers";
import { Box } from "@mui/material";

const DB_TO_CSV = gql`
  query privateCloudProjectsCSV(
    $fields:[String], 
    $ministry: String, 
    $cluster: Int,
    $search: String,
    $sortField: String,
    $sortOrder: Int,
     ) {
        privateCloudProjectsCSV(
        fields:$fields, 
        ministry:$ministry, 
        cluster:$cluster,
        search:$search,
        sortField:$sortField,
        sortOrder:$sortOrder,
    ) {
      csv      
    }
     }
`;
export default function DownloadDBtoCSV({
    ministry,
    cluster,
    search,
    sortField,
    sortOrder,
}) {

    const [fields, setFields] = useState(['Name', 'Description', 'Ministry', 'Cluster', 'Project Owner', 'Technical Leads', 'License Place']);
   
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setFields(
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(fields)
    };

    const [loadCollection, { data, error }] = useLazyQuery(DB_TO_CSV, {
        variables: {
            fields: fields,
            ministry: ministry,
            cluster: cluster,
            search: search,
            sortField: sortField,
            sortOrder: sortOrder,
        },
    });
    if (error) return `Error! ${error.message}`;
    data && createFile(data.privateCloudProjectsCSV.csv)
    function createFile(fileData) {
        let csvContent = "data:text/csv;charset=utf-8," + fileData;
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link).click();
    }

    return (
        <Box sx={{ ml: "auto", display:'inline-flex', alignItems: 'center'}}>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel>Fields</InputLabel>
                <Select
                    multiple
                    value={fields}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                >
                    {columns.map((column) => (
                        <MenuItem
                            key={column.id}
                            value={column.id}
                        >
                            {column.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <IconButton size="large" onClick={() => loadCollection()}>
                <CloudDownloadIcon />
            </IconButton>
        </Box>
    );
}
