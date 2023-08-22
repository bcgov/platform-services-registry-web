import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import DownloadCsv from "../DownloadCsv";
import Search from "../Search";
import FilterPrivate from "../FilterPrivateCloud";
import FilterPublic from "../FilterPublicCloud";

export default function TabForm({ isPrivate }) {
  console.log(isPrivate)
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <div>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", xl: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: 150
            }}
          >
            <Search />
            <FilterPrivate />
            {isPrivate ? <FilterPrivate /> : <FilterPublic />}
            {isPrivate && <DownloadCsv />}
          </div>
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "none", xl: "flex" } }}>
        <Search />
        {isPrivate ? <FilterPrivate /> : <FilterPublic />}
        {isPrivate && <DownloadCsv />}
      </Box>
    </div>
  );
}
