import React from "react";
import Box from "@mui/material/Box";
import TitleTypography from "../common/TitleTypography";
import Typography from "@mui/material/Typography";

export default function ClusterInput({ cluster }) {
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { mb: 2, mt: 2 },
        mb: 2,
        mt: 2,
      }}
    >
      <Typography sx={{ fontSize: 19, mb: 1, fontWeight: "bold" }}>Cluster</Typography>
      <Typography color="text.primary">{cluster}</Typography>
    </Box>
  );
}
