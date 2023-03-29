import QuotaInput from "./QuotaInput";
import Box from "@mui/material/Box";
import TitleTypography from "../common/TitleTypography";
import Typography from "@mui/material/Typography";

const Quotas = ({ project = {} }) => {
  return (
    <Box sx={{ mt: 6 }}>
      <TitleTypography>Quota</TitleTypography>
      <div style={{ display: "flex" }}>
        <QuotaInput
          nameSpace={"production"}
          quota={project?.productionQuota}
        />
        <QuotaInput nameSpace={"test"} quota={project?.testQuota} />
        <QuotaInput
          nameSpace={"tools"}
          quota={project?.toolsQuota}
        />
        <QuotaInput
          nameSpace={"development"}
          quota={project?.developmentQuota}
        />
      </div>
    </Box>
  );
};

export default Quotas;
