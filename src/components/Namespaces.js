import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TitleTypography from "./common/TitleTypography";
const namespaces = ["prod", "dev", "test", "tools"];

function Namespaces({ cluster, licencePlate }) {
  return (
    <Box sx={{ mt: 5, mb: 5 }}>
      <TitleTypography>Namespaces</TitleTypography>
      <Typography sx={{ mb: 2, width: 600 }} color="text.primary">
        These are the <b>namespaces</b> that have been created for your project.
        You can access the <b>openshift console</b> by clicking on the links
        below.
      </Typography>
      {namespaces.map((namespace) => (
        <Typography sx={{ mb: 1 }} color="text.primary">
          <b>{namespace}:</b>{" "}
          <a
            href={`https://console.apps.${cluster?.toLowerCase()}.devops.gov.bc.ca/k8s/cluster/projects/${licencePlate}-${namespace}`}
          >
            {`${licencePlate}-${namespace}`}
          </a>
        </Typography>
      ))}
    </Box>
  );
}

export default Namespaces;
// https://console.apps.silver.devops.gov.bc.ca/topology/ns/a3c641-prod
