import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import MetaDataInput from "../components/MetaDataInput";
import ClusterInput from "../components/ClusterInput";
import QuotaInput from "../components/QuotaInput";
import Paper from "@mui/material/Paper";

const formState = {
  name: "",
  description: "",
  projectOwner: "",
  ministry: "",
  cluster: "",
  defaultCpuOption: "",
  defaultMemoryOption: "",
  defaultStorageOption: "",
};

export default function Project() {
  return (
    <div>
      <div>
        <Paper elevation={3} sx={{ p: 3, m:3 }} style={{width: "680px"}}>
          <MetaDataInput formState={formState} handleChange={() => ""} />
          <ClusterInput formState={formState} handleChange={() => ""} />
          <QuotaInput formState={formState} handleChange={() => ""} />
        </Paper>
      </div>
    </div>
  );
}
