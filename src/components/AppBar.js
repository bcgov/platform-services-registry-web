import React, { useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useKeycloak } from "@react-keycloak/web";
import logoImage from "./assets/bcid-symbol-rev.svg";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import StyledSwitch from "./common/Switch";
import AdminContext from "../context/admin";

const Logo = styled.img`
  max-width: 75px;
  margin-right: 20px;
  margin-top: 8px;
  margin-bottom: 6px;
`;

export default function DenseAppBar({ title }) {
  const { keycloak } = useKeycloak();
  const { admin, toggleAdmin } = useContext(AdminContext);

  const handleChange = (event) => {
    toggleAdmin(event.target.checked);
  };

  const login = useCallback(() => {
    keycloak?.login({ idpHint: "idir" });
  }, [keycloak]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ borderBottom: "2px solid #fcba19" }}>
        <Toolbar variant="dense">
          <Link to="/">
            <Logo alt="BC Gov Logo" src={logoImage} width="125px" />
          </Link>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
          {keycloak.hasResourceRole("admin", "registry-api") && (
            <FormGroup>
              <FormControlLabel
                control={
                  <StyledSwitch
                    onClick={handleChange}
                    sx={{ m: 1 }}
                    checked={admin}
                  />
                }
                labelPlacement="start"
                label="admin"
              />
            </FormGroup>
          )}
          <div style={{ marginLeft: 75 }}>
            {!!keycloak?.authenticated ? (
              <Button color="inherit" onClick={() => keycloak.logout()}>
                Logout
              </Button>
            ) : (
              <div>
                <Button type="button" color="inherit" onClick={login}>
                  Login
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
