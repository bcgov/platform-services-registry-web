import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function InfoAlert({ title, message }) {
  return (
    <Alert severity="info">
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
}

function EmptyAlert() {
  return (
    <InfoAlert
      title="You don't have any products yet"
      message={
        <p>
          You will see products here once you are assigned as product owner or
          technical lead. Use the <strong>create</strong> button to create your
          own product.
        </p>
      }
    />
  );
}

function ErrorAlert({ error }) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {error.message}
    </Alert>
  );
}

export { InfoAlert, ErrorAlert, EmptyAlert };
