import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Slide from "@mui/material/Slide";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import IconButton from "@mui/material/IconButton";
import DownloadCsv from "./DownloadCsv";
import Search from "./Search";




export default function TabForm() {

  const [open, setOpen] = useState(false);


  const handleMouseLeave = () => {
    setOpen(false);
  }

  const handleMouseEnter = () => {
    setOpen(true);
  }
    
  const csvButton = (
    <IconButton
      size="large"
      // onClick={() => getCsvData()}
      onMouseEnter={handleMouseEnter}
      // disabled={!selectedFields.length > 0}
    >
      <CloudDownloadIcon />
    </IconButton>
  );

  return (
    <Box
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        flexGrow: 1,
        width: "100%",
      }}
    >
      <Search />
      <div style={{display: "flex" }}
        onMouseLeave={handleMouseLeave}
      >
        <div
          style={{
            overflow: "hidden",
            transition: "width 0.8s",
            width: open ? 200 : 0,
          }}
        >
          <DownloadCsv />
        </div>
        {csvButton}
      </div>
    </Box>
  );
}
