import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Provider({ provider }) {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography key="0" sx={{ fontSize: 19, mb: 1, fontWeight: "bold" }}>
        Provider
      </Typography>

      <Typography key="1" color="text.primary">
        {provider}
      </Typography>
    </Box>
  );
}
