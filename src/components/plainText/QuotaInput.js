import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  defaultCpuOptionsLookup,
  defaultMemoryOptionsLookup,
  defaultStorageOptionsLookup,
} from "../common/Constants";
import TitleTypography from "../common/TitleTypography";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export default function QuotaInput({ nameSpace, quota, currentQuota }) {
  return (
    <Box sx={{ width: 340, mt: 3, mb: 5, mr: 4 }}>
      <TitleTypography>
        {nameSpace.capitalizeFirstLetter()} Quota
      </TitleTypography>

      <Box sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: 18, fontWeight: "500" }}>
            Current Cpu
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.primary">
            {defaultCpuOptionsLookup[quota?.cpu]}
          </Typography>
          <Typography sx={{ fontSize: 18, fontWeight: "500" }}>
            Requested Cpu
          </Typography>
          {currentQuota?.cpu !== quota?.cpu ? (
            <Typography sx={{ mb: 1 }} color="text.primary">
              {defaultCpuOptionsLookup[currentQuota?.cpu]}
            </Typography>
          ) : (
            <Typography sx={{ mb: 1 }} color="text.disabled">
              No change
            </Typography>
          )}
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: 18, fontWeight: "500" }}>
            Current Memory
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.primary">
            {defaultMemoryOptionsLookup[currentQuota?.memory]}
          </Typography>
          <Typography sx={{ fontSize: 18, fontWeight: "500" }}>
            Requested Memory
          </Typography>
          {currentQuota?.cpu !== quota?.cpu ? (
            <Typography sx={{ mb: 1 }} color="text.primary">
              {defaultMemoryOptionsLookup[currentQuota?.memory]}
            </Typography>
          ) : (
            <Typography sx={{ mb: 1 }} color="text.disabled">
              No change
            </Typography>
          )}
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: 18, fontWeight: "500" }}>
            Current Storage
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.primary">
            {defaultStorageOptionsLookup[currentQuota?.storage]}
          </Typography>
          <Typography sx={{ fontSize: 18, fontWeight: "500" }}>
            Requested Storage
          </Typography>
          {currentQuota?.cpu !== quota?.cpu ? (
            <Typography sx={{ mb: 1 }} color="text.primary">
              {defaultStorageOptionsLookup[currentQuota?.storage]}
            </Typography>
          ) : (
            <Typography sx={{ mb: 1 }} color="text.disabled">
              No change
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
