import QuotaInput from "./QuotaInput";
import Box from "@mui/material/Box";

const Quotas = ({ project = {}, requestedProject = {} }) => {
  return (
    <Box sx={{ mt: 6 }}>
      <div style={{ display: "flex" }}>
        <QuotaInput
          nameSpace={"production"}
          quota={requestedProject?.productionQuota}
          currentQuota={project?.productionQuota}
        />
        <QuotaInput
          nameSpace={"test"}
          quota={project?.testQuota}
          currentQuota={project?.productionQuota}
        />
        <QuotaInput
          nameSpace={"tools"}
          quota={requestedProject?.toolsQuota}
          currentQuota={project?.toolsQuota}
        />
        <QuotaInput
          nameSpace={"development"}
          quota={requestedProject?.developmentQuota}
          currentQuota={project?.developmentQuota}
        />
      </div>
    </Box>
  );
};

export default Quotas;
