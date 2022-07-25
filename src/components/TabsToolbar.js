import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useKeycloak } from "@react-keycloak/web";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AdminContext from "../context/admin";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function TabsToolbar() {
  const { pathname } = useLocation();
  const { keycloak } = useKeycloak();
  const { admin, toggleAdmin } = useContext(AdminContext);

  const routes = ["/private-cloud/requests", "/private-cloud/projects"];

  const [tabValue, setTabValue] = useState(() => routes.indexOf(pathname));

  const handleTabsChange = () => {
    setTabValue(routes.indexOf(pathname));
  };

  const handleSwitchChange = (event) => {
    toggleAdmin(event.target.checked);
  };

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
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabsChange}
          aria-label="nav tabs example"
        >
          <Tab component={Link} label="Requests" to="/private-cloud/requests" />
          <Tab component={Link} label="Projects" to="/private-cloud/projects" />
        </Tabs>
      </Box>
      {!!keycloak.hasResourceRole("admin", "registry-api") && (
        <FormGroup>
          <FormControlLabel
            style={{ whiteSpace: "nowrap", marginRight: 14 }}
            control={
              <Switch
                onClick={handleSwitchChange}
                sx={{ m: 0 }}
                checked={admin}
              />
            }
            labelPlacement="start"
            label="show all"
          />
        </FormGroup>
      )}
      <Button
        component={Link}
        to="/private-cloud/create"
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
  );
}
