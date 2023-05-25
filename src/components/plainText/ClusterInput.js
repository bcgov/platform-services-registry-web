import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ClusterInput({ cluster }) {
  return (
     [ <Typography sx={{ fontSize: 19, mb: 1, fontWeight: "bold"}}>Cluster</Typography>,
      <Typography color="text.primary">{cluster}</Typography>]  
  );
}
