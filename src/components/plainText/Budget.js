import Box from "@mui/material/Box";
import TitleTypography from "../common/TitleTypography";
import Typography from "@mui/material/Typography";

export default function Budget({ budget }) {
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { mb: 2, mt: 2 },
        mb: 4,
        mt: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <Box>
        <TitleTypography>Budget</TitleTypography>
        <Typography sx={{ mb: 1 }} color="text.primary">
          Budget for this project:
        </Typography>
      </Box>
      <Box sx={{ display: "flex", p: 0 }}>
        <Box sx={{ mr: 0, width: 550 }}>
          <Typography sx={{ mb: 1 }} color="text.primary">
            Production - {budget.prod}
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.primary">
            Development - {budget.dev}
          </Typography>
        </Box>
        <Box sx={{ mr: 0, width: 550 }}>
          <Typography sx={{ mb: 1 }} color="text.primary">
            Test - {budget.test}
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.primary">
            Tools - {budget.tools}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
