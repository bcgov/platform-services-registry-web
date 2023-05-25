import Typography from "@mui/material/Typography";

export default function ClusterInput({ cluster }) {
  return (
     [ <Typography key="0" sx={{ fontSize: 19, mb: 1, fontWeight: "bold"}}>Cluster</Typography>,
      <Typography key="1" color="text.primary">{cluster}</Typography>]  
  );
}
