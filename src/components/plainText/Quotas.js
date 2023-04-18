import QuotaInput from "./QuotaInput";
import Box from "@mui/material/Box";

const Quotas = ({ project = {}, requestedProject = {} }) => {
  return (
    <Box sx={{ mt: 6 }}>
      <div style={{ display: "flex" }}>
        <QuotaInput
          nameSpace={"production"}
          requestedQuota={requestedProject?.productionQuota}
          currentQuota={project?.productionQuota}
        />
        <QuotaInput
          nameSpace={"test"}
          requestedQuota={requestedProject?.testQuota}
          currentQuota={project?.testQuota}
        />
        <QuotaInput
          nameSpace={"tools"}
          requestedQuota={requestedProject?.toolsQuota}
          currentQuota={project?.toolsQuota}
        />
        <QuotaInput
          nameSpace={"development"}
          requestedQuota={requestedProject?.developmentQuota}
          currentQuota={project?.developmentQuota}
        />
      </div>
    </Box>
  );
};

export default Quotas;
