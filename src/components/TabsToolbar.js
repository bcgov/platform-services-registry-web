import React from "react";
import { useContext } from "react";
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
import { routesUser, routesAdmin } from "./AppRouter";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import MenuList from "@mui/material/MenuList";
import CreateButtons from "../components/common/CreateButtons"; 


function CreateButtonsDropdown({
  privateCloudCreatePath,
  publicCloudCreatePath,
  handleClose
}) {
  return (
    <MenuList>
      <MenuItem
        onClick={handleClose}
        component={Link}
        to={privateCloudCreatePath}
      >
        Create Private Cloud Project
      </MenuItem>
      <MenuItem
        onClick={handleClose}
        component={Link}
        to={publicCloudCreatePath}
      >
        Create Public Cloud Project
      </MenuItem>
    </MenuList>
  );
}

export default function TabsToolbar({ routes }) {
  const { pathname } = useLocation();
  const { admin } = useContext(AdminContext);
  const { readOnlyAdmin } = useContext(ReadOnlyAdminContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Toolbar style={{ width: "96%" }}>
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
            minWidth: 210,
            display: { xs: "none", sm: "block" }
          }}
        >
          PRODUCT REGISTRY
        </Typography>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ display: { xs: "none", sm: "block" } }}
        />
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={[routes[0], routes[1], routes[3]].indexOf(pathname)}
            aria-label="nav tabs"
          >
            <Tab
              component={Link}
              label={
                pathname.includes("admin") ? "Active Requests" : "Requests"
              }
              to={routes[0]}
            />
            <Tab
              component={Link}
              label="Private Cloud Products"
              to={routes[1]}
            />
            <Tab
              component={Link}
              label="Public Cloud Products"
              to={routes[3]}
            />
          </Tabs>
        </Box>
        {pathname === routes[1] && (admin || readOnlyAdmin) ? (
          <TabForm />
        ) : null}
        {pathname === routes[0] ? (
          <Box sx={{ display: { xs: "none", xl: "flex" } }}>
            <CreateButtons
              privateCloudCreatePath={
                admin || readOnlyAdmin ? routesAdmin[2] : routesUser[2]
              }
              publicCloudCreatePath={
                admin || readOnlyAdmin ? routesAdmin[4] : routesUser[4]
              }
            />
          </Box>
        ) : null}
        {pathname.includes("requests") ? (
          <Box sx={{ display: { xs: "flex", xl: "none" } }}>
            <IconButton onClick={handleClick} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))"
                }
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <CreateButtonsDropdown
                privateCloudCreatePath={
                  admin || readOnlyAdmin ? routesAdmin[2] : routesUser[2]
                }
                publicCloudCreatePath={
                  admin || readOnlyAdmin ? routesAdmin[4] : routesUser[4]
                }
                handleClose={handleClose}
              />
            </Menu>
          </Box>
        ) : null}
      </Toolbar>
      <Outlet />
    </>
  );
}
