import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function NavTabs() {
  const { pathname } = useLocation();
  const routes = ["/private-cloud/requests", "/private-cloud/projects"];

  const [value, setValue] = React.useState(() => routes.indexOf(pathname));

  const handleChange = () => {
    setValue(routes.indexOf(pathname));
  };

  return (
    <Toolbar>
      <Typography
        variant="button"
        color="inherit"
        component="div"
        noWrap={true}
        sx={{ flexGrow: 1, fontWeight: 400,  color: "rgba(0, 0, 0, 0.6)",fontSize: 20, minWidth: 170 }}
      >
        <span style={{display: "inlineBlock"}}> PRIVATE CLOUD</span>
      </Typography>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <Tab component={Link} label="Requests" to="/private-cloud/requests" />
          <Tab component={Link} label="Projects" to="/private-cloud/projects" />
        </Tabs>
      </Box>
    </Toolbar>
  );
}
