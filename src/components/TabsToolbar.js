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
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { routesUser, routesAdmin } from "./AppRouter";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import MenuList from "@mui/material/MenuList";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#003366",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "#f5f5f5",
    boxShadow: "none"
  },
  boxShadow: "none",
  border: "1px solid",
  borderColor: "#bdbdbd"
}));

function CreateButtons({ privateCloudCreatePath, publicCloudCreatePath }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ whiteSpace: "nowrap", minWidth: "auto" }}
    >
      <ColorButton
        component={Link}
        to={privateCloudCreatePath}
        size="small"
        variant="contained"
        endIcon={<AddIcon />}
      >
        Create Private Cloud Project
      </ColorButton>
      <ColorButton
        component={Link}
        to={publicCloudCreatePath}
        size="small"
        variant="contained"
        endIcon={<AddIcon />}
      >
        Create Public Cloud Project
      </ColorButton>
    </Stack>
  );
}

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
          <Tabs value={routes.indexOf(pathname)} aria-label="nav tabs">
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
        ) : (
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
        )}
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
