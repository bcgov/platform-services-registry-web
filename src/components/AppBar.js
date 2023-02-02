import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import styled from "styled-components";
import { useKeycloak } from "@react-keycloak/web";
import logoImage from "./assets/bcid-symbol-rev.svg";
import DropDownLoginMenu from "./DropDownLoginMenu";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import useWindowSize from "../hooks/useWindowSize";

const Logo = styled.img`
  max-width: 75px;
  margin-right: 20px;
  margin-top: 8px;
  margin-bottom: 6px;
`;

export default function DenseAppBar() {
  const { keycloak } = useKeycloak();
  const { width } = useWindowSize();

  const login = useCallback(() => {
    keycloak?.login({ idpHint: "idir" });
  }, [keycloak]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ borderBottom: "2px solid #fcba19" }}>
        <Toolbar
          variant="dense"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: { xs: 10, sm: 60 }
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link to="/" style={{ marginTop: 7 }}>
              <Logo alt="BC Gov Logo" src={logoImage} width="50" />
            </Link>
            {width > 600 && (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Typography
                  sx={{
                    mt: 2,
                    display: "inline-block",
                    fontWeight: "300",
                    fontSize: 20,
                    font: "roboto"
                  }}
                >
                  BC Platform Services&nbsp;
                </Typography>
                <Typography sx={{ mt: 2, fontWeight: "500", fontSize: 20 }}>
                  Product Registry
                </Typography>
              </div>
            )}
          </div>
          {keycloak?.authenticated ? (
            <DropDownLoginMenu />
          ) : (
            <Button onClick={login} style={{ color: "#fff" }}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
