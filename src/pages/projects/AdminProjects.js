import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { columns, projectsToRows } from "./helpers";
import StickyTable from "../../components/common/Table";
import { ministries, clusters } from "../../components/common/Constants";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const ALL_PROJECTS = gql`
  query PrivateCloudProjectsPaginated(
    $offset: Int, 
    $limit: Int, 
    $ministry: String,
     $cluster: Int,
     $search: String,
    #  $sortField:String,
    #   $sortOrder:Int,
     ) {
    privateCloudProjectsPaginated(offset: $offset,
         limit: $limit,
      ministry: $ministry,
     cluster: $cluster,
     search: $search,
    # sortField: $sortField
    # sortOrder:$sortOrder
    ) {
      count
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

export default function Projects() {
  const [ministry, setMinistry] = useState('')
  const [cluster, setCluster] = useState(null)
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortOrder, setSortOrder] = useState(1)
  const { loading, data, fetchMore, error, refetch } = useQuery(ALL_PROJECTS, {
    variables: {
      offset: 0,
      limit: 20,
      ministry: ministry,
      cluster: cluster,
      search: search,
      // sortField:sortField,
      // sortOrder:sortOrder,
    },
  });

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Box sx={{ minWidth: 120, pt: 3, pl: 2 }}>
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel >Ministry</InputLabel>
          <Select
            value={ministry}
            label="Ministry"
            onChange={(event) => {
              setMinistry(event.target.value)
              refetch({ ministry: (event.target.value) })
            }}
          >
            <MenuItem value={''}>All Ministries</MenuItem>
            {ministries.map((ministry, index) => <MenuItem key={index} value={ministry}>{ministry}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel >Cluster</InputLabel>
          <Select
            value={cluster}
            label="Cluster"
            onChange={(event) => {
              setCluster(event.target.value)
              refetch({ cluster: (event.target.value) })
            }}
          >
            <MenuItem value={null}>All Clusters</MenuItem>
            {clusters.map((cluster, index) => <MenuItem key={index} value={index + 1}>{cluster}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField
          label="Search"
          type="search"
          onChange={(event) => {
            setSearch(event.target.value)
            refetch({ search: (event.target.value) })
          }}
        />
      </Box>
      <StickyTable
        onClickPath={"/private-cloud/admin/project/"}
        onNextPage={(page, pageSize) =>
          fetchMore({ variables: { offset: page * pageSize, limit: pageSize } })
        }
        columns={columns}
        rows={
          loading
            ? []
            : data.privateCloudProjectsPaginated.projects.map(projectsToRows)
        }
        count={loading ? 0 : data.privateCloudProjectsPaginated.count}
        title="Projects"
        loading={loading}
        // refetch={refetch}
      />
    </>
  );
}
