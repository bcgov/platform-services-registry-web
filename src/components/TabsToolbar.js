import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import TabForm from "./forms/ResponsiveTabForm";
import AdminContext from "../context/admin";
import ReadOnlyAdminContext from "../context/readOnlyAdmin";
import CreateBtn from "../components/common/CreateBtn"

export default function TabsToolbar({ routes }) {
  const { pathname } = useLocation();
  const { admin } = useContext(AdminContext);
  const { readOnlyAdmin } = useContext(ReadOnlyAdminContext);

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
            // sm: { display: "none", color: "red"}
            display: { xs: "none", sm: "block" },
          }}
        >
          PRIVATE CLOUD
        </Typography>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ display: { xs: "none", sm: "block" } }}
        />
        <Box sx={{ width: "100%" }}>
          <Tabs value={routes.indexOf(pathname)} aria-label="nav tabs">
            <Tab
              component={Link}
              label={
                pathname.includes("admin") ? "Active Requests" : "Requests"
              }
              to={routes[0]}
            />
            <Tab component={Link} label="Products" to={routes[1]} />
          </Tabs>
        </Box>
        {pathname === routes[1] && (admin||readOnlyAdmin) ? <TabForm /> : null}
        <CreateBtn/>
      </Toolbar>
      <Outlet />
    </>
  );
}
