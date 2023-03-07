import React, { useContext } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FilterContext from "../context/filter";
import { ministriesNames, clusters } from "./common/Constants";

export default function Filter() {
  const { setMinistry, setCluster, filter } = useContext(FilterContext);
  const { ministry, cluster } = filter;

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <FormControl size="small" sx={{ minWidth: 120, pr: 2 }}>
        <InputLabel>Ministry</InputLabel>
        <Select
          value={ministry}
          label="Ministry"
          onChange={(event) => {
            setMinistry(event.target.value);
          }}
        >
          <MenuItem value={""}>All Ministries</MenuItem>
          {ministriesNames.map((ministry) => (
            <MenuItem key={ministry} value={ministry.name}>
              {ministry.humanFriendlyName} ({ministry.name})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120, pr: 2 }}>
        <InputLabel>Cluster</InputLabel>
        <Select
          value={cluster}
          label="Cluster"
          onChange={(event) => {
            setCluster(event.target.value);
          }}
        >
          <MenuItem value={""}>All Clusters</MenuItem>
          {clusters.map((cluster) => (
            <MenuItem key={cluster} value={cluster}>
              {cluster}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
