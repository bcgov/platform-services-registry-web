import React, { useState, useEffect } from "react";
import NavToolbar from "../components/NavToolbar";
import Progress from "../components/Progress";
import { ministries, clusters, defaultCpuOptions, defaultMemoryOptions, defaultStorageOptions } from "../components/Common/Constants";

export default function Create() {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    projectOwner: "",
    ministry: ministries[0],
    cluster: clusters[0],
    defaultCpuOption: defaultCpuOptions[0],
    defaultMemoryOption: defaultMemoryOptions[0],
    defaultStorageOption: defaultStorageOptions[0],
  });

  const handleChange = (input) => (event) => {
    setFormState({ ...formState, [input]: event.target.value });
  };

  return (
    <div>
      <NavToolbar title={"Create Project"} />
      <Progress formState={formState} handleChange={handleChange} />
    </div>
  );
}
