import { useLocation } from "react-router-dom";
import UserInput from "./UserInput";
import Box from "@mui/material/Box";
import TitleTypography from "../common/TitleTypography";
import Typography from "@mui/material/Typography";

const Users = ({ formik, isDisabled }) => {
  const { pathname } = useLocation();

  const defaultEditOpen = pathname.includes("create");
  return (
    <Box sx={{ display: "flex", mt: 6, mb: 7 }}>
      <Box sx={{ display: "flex", flexDirection: "column", mr: 14 }}>
        <div style={{ width: 500 }}>
          <TitleTypography>Project Owner</TitleTypography>
          <Typography sx={{ mb: 4 }} color="text.primary">
            Tell us about the <b>Product Owner (PO).</b> This is typically the
            business owner of the application. We will use this information to
            contact them with any non-technical questions.
          </Typography>
        </div>

        <UserInput
          label={"Product Owner"}
          contact="projectOwner"
          formik={formik}
          isDisabled={isDisabled}
          defaultEditOpen={defaultEditOpen}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <div style={{ width: 600 }}>
          <TitleTypography>Technical Leads</TitleTypography>
          <Typography sx={{ mb: 4 }} color="text.priamry">
            This is typically the <b>DevOps specialist.</b> We use this information to contact them with
            technical questions or notify them about platform events. You
            require a <b>Primary Technical Lead</b>, a{" "}
            <b>Secondary Technical Lead</b> is optional.
          </Typography>
        </div>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <UserInput
            label={"Primary Technical Lead"}
            contact="primaryTechnicalLead"
            formik={formik}
            isDisabled={isDisabled}
            defaultEditOpen={defaultEditOpen}
          />

          <UserInput
            label={"Secondary Technical Lead"}
            contact="secondaryTechnicalLead"
            formik={formik}
            isDisabled={isDisabled}
            defaultEditOpen={defaultEditOpen}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Users;
