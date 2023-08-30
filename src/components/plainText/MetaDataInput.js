import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TitleTypography from "../common/TitleTypography";
export default function MetaDataInput({ name, description }) {
  return (
    <Box sx={{ display: "flex", p: 0 }}>
      <Box sx={{ mr: 0, width: 650 }}>
        <div>
          <TitleTypography
            color="text.primary"
          >
            Name
          </TitleTypography>
          <Typography sx={{ mb: 2 }} color="text.primary">
            {name}
          </Typography>
        </div>
        <div>
          <TitleTypography
            color="text.primary"
          >
            Description
          </TitleTypography>
          <Typography sx={{ mb: 2 }} color="text.primary">
            {description}
          </Typography>
        </div>
      </Box>
    </Box>
  );
}
