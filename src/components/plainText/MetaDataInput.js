import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function MetaDataInput({ name, description }) {
  return (
    <Box sx={{ display: "flex", p: 0 }}>
      <Box sx={{ mr: 0, width: 650 }}>
        <div>
          <Typography
            sx={{ mb: 1, fontWeight: "bold", fontSize: 19 }}
            color="text.primary"
          >
            Name
          </Typography>
          <Typography sx={{ mb: 2 }} color="text.primary">
            {name}
          </Typography>
        </div>
        <div>
          <Typography
            sx={{ mb: 1, fontWeight: "bold", fontSize: 19 }}
            color="text.primary"
          >
            Description
          </Typography>
          <Typography sx={{ mb: 2 }} color="text.primary">
            {description}
          </Typography>
        </div>
      </Box>
    </Box>
  );
}
