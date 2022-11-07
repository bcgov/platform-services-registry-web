import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { columns, projectsToRows } from "./helpers";
import StickyTable from "../../components/common/Table";
import DownloadDBtoCSV from "../../components/common/DownloadDBtoCSV"
import { ministries, clusters } from "../../components/common/Constants";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Alert from "../../components/common/Alert";


const ALL_PROJECTS = gql`
  query PrivateCloudProjectsPaginated(
    $offset: Int!, 
    $limit: Int!, 
    $filter: FilterPrivateCloudProjectsInput,
    $search: String,
    $sort: String,
    $sortOrder: SortOrder,
     ) {
    privateCloudProjectsPaginated(
      offset:$offset 
      limit:$limit 
      filter:$filter
      search:$search
      sort:$sort
      sortOrder:$sortOrder
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
          primaryTechnicalLead {
            firstName
            lastName
            githubId
          }
          secondaryTechnicalLead {
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
  const [ministry, setMinistry] = useState(null)
  const [cluster, setCluster] = useState(null)
  const [search, setSearch] = useState("")
  const { loading, data, fetchMore, error, refetch } = useQuery(ALL_PROJECTS, {
    variables: {
      offset: 0,
      limit: 20,
      filter: {
        ministry: ministry,
        cluster: cluster,
      },
      search: search,
      sort: "created",
      sortOrder: "ASCENDING",
    },
  });


  if (error) {
    return <Alert error={error} />;
  }


  return (
    <>
      <Box sx={{ minWidth: 120, pt: 3, pl: 2, display: 'flex', justifyContent: "flex-end" }}>
        <FormControl sx={{ minWidth: 160, pr: 2 }}>
          <InputLabel >Ministry</InputLabel>
          <Select
            value={ministry}
            label="Ministry"
            onChange={(event) => {
              setMinistry(event.target.value)
              refetch({ filter: { ministry: (event.target.value), cluster: cluster } })
            }}
          >
            <MenuItem value={null}>All Ministries</MenuItem>
            {ministries.map((ministry) => <MenuItem key={ministry} value={ministry}>{ministry}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 160, pr: 2 }}>
          <InputLabel >Cluster</InputLabel>
          <Select
            value={cluster}
            label="Cluster"
            onChange={(event) => {
              setCluster(event.target.value)
              refetch({ filter: { cluster: (event.target.value), ministry: ministry } })
            }}
          >
            <MenuItem value={null}>All Clusters</MenuItem>
            {clusters.map((cluster) => <MenuItem key={cluster} value={cluster}>{cluster}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField sx={{ minWidth: 160, pr: 2 }}
          label="Search"
          type="search"
          onChange={(event) => {
            setSearch(event.target.value)
            refetch({ search: (event.target.value) })
          }}
        />
        <DownloadDBtoCSV
          ministry={ministry}
          cluster={cluster}
          search={search}
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
        refetch={refetch}
      />
    </>
  );
}
