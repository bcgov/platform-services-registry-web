import Typography from "@mui/material/Typography";

export default function Provider({ provider }) {
  return [
    <Typography key="0" sx={{ fontSize: 19, mb: 1, fontWeight: "bold" }}>
      Provider
    </Typography>,
    <Typography key="1" color="text.primary">
      {provider}
    </Typography>
  ];
}
