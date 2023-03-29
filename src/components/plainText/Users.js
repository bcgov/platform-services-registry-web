import { useLocation } from "react-router-dom";
import UserInput from "./UserInput";
import Box from "@mui/material/Box";
import TitleTypography from "../common/TitleTypography";
import Typography from "@mui/material/Typography";

const Users = ({
  projectOwner,
  primaryTechnicalLead,
  secondaryTechnicalLead,
}) => {
  return (
    <Box sx={{ display: "flex", mt: 6, mb: 7 }}>
      <Box sx={{ display: "flex", flexDirection: "column", mr: 14 }}>
        <div style={{ width: 500 }}>
          <TitleTypography>Product Owner</TitleTypography>
        </div>

        <UserInput
          label={"Product Owner"}
          firstName={projectOwner?.firstName}
          lastName={projectOwner?.lastName}
          email={projectOwner?.email}
          ministry={projectOwner?.ministry}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <div style={{ width: 600 }}>
          <TitleTypography>Technical Leads</TitleTypography>
        </div>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <UserInput
            label={"Primary Technical Lead"}
            firstName={primaryTechnicalLead?.firstName}
            lastName={primaryTechnicalLead?.lastName}
            email={primaryTechnicalLead?.email}
            ministry={primaryTechnicalLead?.ministry}
          />

          <UserInput
            label={"Secondary Technical Lead"}
            firstName={secondaryTechnicalLead?.firstName}
            lastName={secondaryTechnicalLead?.lastName}
            email={secondaryTechnicalLead?.email}
            ministry={secondaryTechnicalLead?.ministry}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Users;
