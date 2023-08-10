import Typography from "@mui/material/Typography";
import StyledLink from "../../components/common/StyledLink";
import { useLocation } from "react-router-dom";
import RolesContext from "../../context/roles";
import { useContext } from "react";

const ActiveRequestText = ({ requestId }) => {
  const location = useLocation();
  const { admin, readOnlyAdmin } = useContext(RolesContext);

  const cloud = location.pathname.split("/")[3];
  const userRole = admin || readOnlyAdmin ? "admin" : "user";

  return (
    <div style={{ minHeight: 50, marginTop: 10 }}>
      <Typography variant="body" sx={{ ml: 3, color: "rgba(0, 0, 0, 0.6)" }}>
        This product cannot be edited as it has an{" "}
        <StyledLink to={`/registry/${userRole}/${cloud}/request/${requestId}`}>
          <i>active request</i>
        </StyledLink>
      </Typography>
    </div>
  );
};

export default ActiveRequestText;
