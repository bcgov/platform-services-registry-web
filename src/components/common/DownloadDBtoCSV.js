/* eslint-disable no-undef */
import React, {useState} from "react";
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
import { parse } from "json2csv";
const DB_TO_CSV = gql`
  query privateCloudProjectsCSV(
    $fields:[String], 
    $ministry: String, 
    $cluster: Int,
    $search: String,
     ) {
        privateCloudProjectsCSV(
        fields:$fields, 
        ministry:$ministry, 
        cluster:$cluster,
        search:$search,
    ) {
      csv    
      projects {
        ... on PrivateCloudProject {
        #   id
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

    const [fields, setFields] = useState([]);
   
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setFields(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [loadCollection, { data, error }] = useLazyQuery(DB_TO_CSV, {
        variables: {
            fields: fields,
            ministry: ministry,
            cluster: cluster,
            search: search
        },
    });
    if (error) return `Error! ${error.message}`;
    data && createFile(data.privateCloudProjectsCSV.projects)
    function createFile(fileData) {
        let tmpArr = ''
const fields = ['name', 'description', 'projectOwner','technicalLeads']
fileData.map((item, index) => 
Object.keys(item).map((key) =>{
  if((Array.isArray(item[key]))){
    item[key].map((lead) => {
       if  (fields.indexOf(key)!==-1){
       tmpArr+=`${lead.firstName} ${lead.lastName}' '`
    }   
      
    })
  }
 else if(typeof(item[key]) !== 'object'&&!Array.isArray(item[key])){
  if  (fields.indexOf(key)!==-1) {tmpArr+=`${item[key]}','`}
  } 
  else{
    if  (fields.indexOf(key)!==-1){
       tmpArr+=`${item[key].firstName} ${item[key].lastName}','`
    }    
  }
}
)
)
        console.log(tmpArr)
        let csvContent = "data:text/csv;charset=utf-8," + tmpArr;
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
            <IconButton size="large" onClick={() => loadCollection()} disabled={!fields.length>0}>
                <CloudDownloadIcon />
            </IconButton>
        </Box>
    );
}
