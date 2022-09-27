import Typography from "@mui/material/Typography";

const TitleTypography = (props) => (
  <Typography variant="body1" sx={{ mt: 0, mb: 1 }}>
    {props.children}
  </Typography>
);

export default TitleTypography;
