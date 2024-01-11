import QuotaInput from "./QuotaInput";
import Box from "@mui/material/Box";
import TitleTypography from "../common/TitleTypography";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Quotas = ({ formik, isDisabled, currentProjectQuota={}}) => {
 
  return (
    <Box sx={{mt: 6}}>
      <div>
        <TitleTypography>Quota</TitleTypography>
        <Typography sx={{ mb: 2, width: 900 }} color="text.primary">
          All quota increase requests require <b>Platform Services Team's</b> approval
          and must have supporting information as per the <i>Quota Increase Request
          Process</i>. The Quota Requests without supporting information will <b>not</b>{" "}
          be processed. Find more information at{" "}
          <Link
          sx={{
            mb: 2,
            display: "inline-block",
            fontWeight: "bold",
            "&:hover": {
              cursor: "pointer"
            }
          }}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          href="https://docs.developer.gov.bc.ca/request-quota-increase-for-openshift-project-set/"
        >
          the quota increase documentation
        </Link> page.
        </Typography>
      </div>
      <div style={{ display: "flex" }}>
        <QuotaInput
          nameSpace={"production"}
          formik={formik}
          isDisabled={isDisabled}
          currentQuota = {currentProjectQuota?.productionQuota}
        />
        <QuotaInput
          nameSpace={"test"}
          formik={formik}
          isDisabled={isDisabled}
          currentQuota = {currentProjectQuota?.testQuota}
        />
        <QuotaInput
          nameSpace={"tools"}
          formik={formik}
          isDisabled={isDisabled}
          currentQuota = {currentProjectQuota?.toolsQuota}
        />
        <QuotaInput
          nameSpace={"development"}
          formik={formik}
          isDisabled={isDisabled}
          currentQuota = {currentProjectQuota?.developmentQuota}
        />
      </div>
    </Box>
  );
};

export default Quotas;
