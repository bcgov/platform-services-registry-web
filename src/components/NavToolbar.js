import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';

export default function NavToolbar({ title }) {
  const navigate = useNavigate()

  return (
    <Toolbar style={{ width: "93.7%" }}>
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
        <IconButton onClick={() => navigate(-1)} aria-label="back" color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="body1"
          color="black"
          component="div"
          noWrap={true}
          sx={{
            marginLeft: "14px",
            marginTop: "4.8px",
            color: "#212121",
            flexGrow: 1,
            minWidth: 170,
            fontSize: 20,
          }}
        >
          {title}
        </Typography>
      </Box>
    </Toolbar>
  );
}
