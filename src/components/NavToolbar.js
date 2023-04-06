import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

export default function NavToolbar({ title, label, path, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToPath = () => {
    const currentBasePath = location.pathname.split("/")[1];
    if (path) {
      navigate(`/${currentBasePath}/${path}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <Toolbar style={{ width: "97%" }}>
      <Typography
        variant="button"
        color="inherit"
        component="div"
        noWrap={true}
        sx={{
          flexGrow: 1,
          fontWeight: 400,
          color: "rgba(0, 0, 0, 0.6)",
          fontSize: 20,
          minWidth: 170,
        }}
      >
        PRIVATE CLOUD
      </Typography>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <IconButton
          onClick={() => navigateToPath(path)}
          aria-label="back"
          color="primary"
        >
          <ArrowBackIcon />
        </IconButton>
        <div
          style={{
            marginLeft: "14px",
            marginTop: "7px",
            color: "#212121",
            flexGrow: 1,
            minWidth: 170,
            // fontSize: 20,
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            {path && (
              <Typography sx={{ fontSize: 18 }} variant="body">
                {label}
              </Typography>
            )}
            <Typography
              sx={{ fontSize: 18 }}
              variant="body"
              color="text.primary"
            >
              {title}
            </Typography>
          </Breadcrumbs>
        </div>
        {children}
      </Box>
    </Toolbar>
  );
}
