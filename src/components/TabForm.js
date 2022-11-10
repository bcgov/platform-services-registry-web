import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import DownloadCsv from "./DownloadCsv";
import Search from "./Search";

export default function TabForm() {
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
      <DownloadCsv />
    </Box>
  );
}
