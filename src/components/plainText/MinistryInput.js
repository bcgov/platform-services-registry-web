import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TitleTypography from "../common/TitleTypography";
const MinistryInput = ({ ministry }) => {
  return (
    <Box>
      <div>
        <TitleTypography>
          Ministry
        </TitleTypography>
        <Typography sx={{ mb: 2 }} color="text.primary">{ministry}</Typography>
      </div>
    </Box>
  );
};

export default MinistryInput;
