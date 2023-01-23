import Typography from "@mui/material/Typography";
import StyledLink from "../../components/common/StyledLink";

const ActiveRequestText = ({ hasActiveRequest, requestId }) => (
  <div style={{ minHeight: 50, marginTop: 10 }}>
    {hasActiveRequest && (
      <Typography variant="body" sx={{ ml: 3, color: "rgba(0, 0, 0, 0.6)" }}>
        This project cannot be edited as it has an{" "}
        <StyledLink to={`/private-cloud/user/request/${requestId}`}>
          <i>active request</i>
        </StyledLink>
      </Typography>
    )}
  </div>
);

export default ActiveRequestText;
