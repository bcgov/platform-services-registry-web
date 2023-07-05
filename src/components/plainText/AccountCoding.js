import Typography from "@mui/material/Typography";

export default function AccountCoding({ accountCoding }) {
  return [
    <Typography key="0" sx={{ fontSize: 19, mb: 1, fontWeight: "bold" }}>
      Account Coding
    </Typography>,
    <Typography key="1" color="text.primary">
      {accountCoding}
    </Typography>
  ];
}
