import Typography from "@mui/material/Typography";
import TitleTypography from "../common/TitleTypography";
export default function ClusterInput({ cluster }) {
  return [
    <TitleTypography>
      Cluster
    </TitleTypography>,
    <Typography color="text.primary">
      {cluster}
    </Typography>
  ];
}
