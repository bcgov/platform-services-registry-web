import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function DescriptionAlert({ error }) {
  if (error.message === "Not a user") {
    return (
      <Alert severity="info">
        <AlertTitle>You don't have any products yet</AlertTitle>
        You will see products here once you are assigned as product owner or
        technical lead. Use the <strong>create</strong> button to create your own product
      </Alert>
    );
  } else {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    );
  }
}
