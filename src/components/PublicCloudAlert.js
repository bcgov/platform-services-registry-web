import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useNavigate, useLocation } from "react-router-dom";

export default function DescriptionAlerts() {
  const location = useLocation();

  const routes = location.pathname.split("/");

  if (
    routes.includes("private-cloud") ||
    routes.includes("private-cloud-products") ||
    routes.includes("requests")
  ) {
    return null;
  }
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="info">
        <AlertTitle>Public Cloud Under Maintenance</AlertTitle>
        Creating and editing Public Cloud Projects has been{" "}
        <strong>temporarily disabled.</strong>
      </Alert>
    </Stack>
  );
}
