import Typography from "@mui/material/Typography";
import TitleTypography from "../common/TitleTypography";

export default function AccountCoding({ accountCoding }) {
  return [
    <TitleTypography key="0" sx={{ fontSize: 19, mb: 1, fontWeight: "bold" }}>
      Account Coding
    </TitleTypography>,
    <Typography key="1" color="text.primary">
      {accountCoding?.replace(/(.{3})(.{5})(.{5})(.{4})(.{7})/g, "$1 $2 $3 $4 $5")}
    </Typography>
  ];
}
