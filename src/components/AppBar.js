import * as React from "react";
import {Link} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useKeycloak } from "@react-keycloak/web";
import logoImage from "./Common/assets/bcid-symbol-rev.svg"

const Logo = styled.img`
  max-width: 125px;
  margin-right: 20px;
`;

export default function DenseAppBar({ title }) {
  const { keycloak } = useKeycloak();

  const login = React.useCallback(() => {
    keycloak?.login({ idpHint: "idir" });

  }, [keycloak]);

  const style = {
    "border-bottom": "2px solid #fcba19"
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={style}>
        <Toolbar variant="dense">
        <Link to="/">
          <Logo alt="BC Gov Logo" src={logoImage} width="125px"/>
        </Link>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
          {!!keycloak?.authenticated ? (<Button color="inherit" onClick={() => keycloak.logout()}>
          Logout
          </Button>) :
          <div>
          <Button type="button" color="inherit" onClick={login}>
            Login
          </Button>
        </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
