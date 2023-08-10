import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const MinistryInput = ({ ministry }) => {
  return (
    <Box>
      <div>
        <Typography sx={{ fontSize: 19, mb: 1, fontWeight: "bold" }}>
          Ministry
        </Typography>
        <Typography color="text.primary">{ministry}</Typography>
      </div>
    </Box>
  );
};

export default MinistryInput;
