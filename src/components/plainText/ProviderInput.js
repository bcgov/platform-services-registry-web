import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TitleTypography from "../common/TitleTypography";

export default function Provider({ provider }) {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <TitleTypography>Provider</TitleTypography>
       <Typography key="1" color="text.primary">
        {provider}
      </Typography>
    </Box>
  );
}
