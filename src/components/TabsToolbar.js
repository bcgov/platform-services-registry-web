import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DownloadCsv from "../components/DownloadCsv";
import Search from "../components/Search";
import { Outlet } from "react-router-dom";
import TabForm from "../components/TabForm";

export default function TabsToolbar({ routes, createButtonRoute }) {
  const { pathname } = useLocation();

  return (
    <>
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
        <Box sx={{ width: "100%" }}>
          <Tabs value={routes.indexOf(pathname)} aria-label="nav tabs">
            <Tab component={Link} label="Requests" to={routes[0]} />
            <Tab component={Link} label="Projects" to={routes[1]} />
          </Tabs>
        </Box>
        {/* <Search />
        <DownloadCsv /> */}
        <TabForm />
        <Button
          component={Link}
          to={createButtonRoute}
          variant="outlined"
          style={{ border: "none" }}
          size="large"
          endIcon={<AddIcon />}
        >
          Create
        </Button>

        {/* <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip> */}
      </Toolbar>
      <Outlet />
    </>
  );
}
