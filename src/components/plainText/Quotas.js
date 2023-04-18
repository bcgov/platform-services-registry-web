import QuotaInput from "./QuotaInput";
import Box from "@mui/material/Box";

const Quotas = ({ project = {}, requestedProject = {}, active = true }) => {
  return (
    <Box sx={{ mt: 6 }}>
      <div style={{ display: "flex" }}>
        <QuotaInput
          nameSpace={"production"}
          requestedQuota={requestedProject?.productionQuota}
          currentQuota={project?.productionQuota}
          active={active}
        />
        <QuotaInput
          nameSpace={"test"}
          requestedQuota={requestedProject?.testQuota}
          currentQuota={project?.testQuota}
          active={active}
        />
        <QuotaInput
          nameSpace={"tools"}
          requestedQuota={requestedProject?.toolsQuota}
          currentQuota={project?.toolsQuota}
          active={active}
        />
        <QuotaInput
          nameSpace={"development"}
          requestedQuota={requestedProject?.developmentQuota}
          currentQuota={project?.developmentQuota}
          active={active}
        />
      </div>
    </Box>
  );
};

export default Quotas;
