import React, { useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import styled from "styled-components";
import { useKeycloak } from "@react-keycloak/web";
import logoImage from "./assets/bcid-symbol-rev.svg";
import AdminContext from "../context/admin";
import DropDownLoginMenu from "./DropDownLoginMenu";
import { useNavigate } from 'react-router-dom';

const Logo = styled.img`
  max-width: 75px;
  margin-right: 20px;
  margin-top: 8px;
  margin-bottom: 6px;
`;

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ borderBottom: "2px solid #fcba19" }}>
        <Toolbar
          variant="dense"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link to="/" style={{ marginTop: 7 }} >
              <Logo alt="BC Gov Logo" src={logoImage} width="50" />
            </Link>
            <p style={{ fontWeight: "300", fontSize: 20, font: "roboto" }}>
              BC Platform Services&nbsp;
            </p>
            <p style={{ fontWeight: "500", fontSize: 20 }}>Project Registry</p>
          </div>
          <DropDownLoginMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}