import React, { useState, useEffect } from "react";
import NavToolbar from "../components/NavToolbar";
import Progress from "../components/Progress";
import { ministries } from "../components/common/Constants";

export default function Create() {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    projectOwner: "",
    ministry: ministries[0],
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
