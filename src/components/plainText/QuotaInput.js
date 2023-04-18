import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  defaultCpuOptionsLookup,
  defaultMemoryOptionsLookup,
  defaultStorageOptionsLookup,
} from "../common/Constants";
import TitleTypography from "../common/TitleTypography";

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export default function QuotaInput({
  nameSpace,
  requestedQuota,
  currentQuota,
  active,
}) {
  const isCreateRequest = currentQuota === undefined;
  const isCupQuotaChanged = currentQuota?.cpu !== requestedQuota?.cpu;
  const isMemoryQuotaChanged = currentQuota?.memory !== requestedQuota?.memory;
  const isStorageQuotaChanged =
    currentQuota?.storage !== requestedQuota?.storage;

  return (
    <Box sx={{ width: 340, mt: 3, mb: 5, mr: 4 }}>
      {!active ? (
        <div>
          <TitleTypography>
            {nameSpace.capitalizeFirstLetter()} Quota
          </TitleTypography>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
              <Typography
                sx={{ fontSize: 18, fontWeight: "500" }}
                color={"text.primary"}
              >
                Requested Cpu
              </Typography>
              <Typography sx={{ mb: 1 }} color="text.primary">
                {defaultCpuOptionsLookup[requestedQuota?.cpu]}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
              <Typography
                sx={{ fontSize: 18, fontWeight: "500" }}
                color={"text.primary"}
              >
                Requested Memory
              </Typography>
              <Typography sx={{ mb: 1 }} color="text.primary">
                {defaultCpuOptionsLookup[requestedQuota?.cpu]}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
              <Typography
                sx={{ fontSize: 18, fontWeight: "500" }}
                color={"text.primary"}
              >
                Requested Storage
              </Typography>
              <Typography sx={{ mb: 1 }} color="text.primary">
                {defaultCpuOptionsLookup[requestedQuota?.cpu]}
              </Typography>
            </Box>
          </Box>
        </div>
      ) : (
        <div>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ fontSize: 18, fontWeight: "500" }}
                color={isCupQuotaChanged ? "text.primary" : "text.disabled"}
              >
                Current Cpu
              </Typography>
              {isCreateRequest ? (
                <Typography sx={{ mb: 1 }} color="text.disabled">
                  None
                </Typography>
              ) : (
                <Typography
                  sx={{ mb: 1 }}
                  color={isCupQuotaChanged ? "text.primary" : "text.disabled"}
                >
                  {defaultCpuOptionsLookup[currentQuota?.cpu]}
                </Typography>
              )}
              <Typography
                sx={{ fontSize: 18, fontWeight: "500" }}
                color={isCupQuotaChanged ? "text.primary" : "text.disabled"}
              >
                Requested Cpu
              </Typography>
              {isCupQuotaChanged ? (
                <Typography sx={{ mb: 1 }} color="text.primary">
                  {defaultCpuOptionsLookup[requestedQuota?.cpu]}
                </Typography>
              ) : (
                <Typography sx={{ mb: 1 }} color="text.disabled">
                  No change
                </Typography>
              )}
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ fontSize: 18, fontWeight: "500" }}
                color={isMemoryQuotaChanged ? "text.primary" : "text.disabled"}
              >
                Current Memory
              </Typography>
              {isCreateRequest ? (
                <Typography sx={{ mb: 1 }} color="text.disabled">
                  None
                </Typography>
              ) : (
                <Typography
                  sx={{ mb: 1 }}
                  color={
                    isMemoryQuotaChanged ? "text.primary" : "text.disabled"
                  }
                >
                  {defaultMemoryOptionsLookup[currentQuota?.memory]}
                </Typography>
              )}
              <Typography
                sx={{ fontSize: 18, fontWeight: "500" }}
                color={isMemoryQuotaChanged ? "text.primary" : "text.disabled"}
              >
                Requested Memory
              </Typography>
              {isMemoryQuotaChanged ? (
                <Typography sx={{ mb: 1 }} color="text.primary">
                  {defaultMemoryOptionsLookup[requestedQuota?.memory]}
                </Typography>
              ) : (
                <Typography sx={{ mb: 1 }} color="text.disabled">
                  No change
                </Typography>
              )}
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ fontSize: 18, fontWeight: "500" }}
                color={isStorageQuotaChanged ? "text.primary" : "text.disabled"}
              >
                Current Storage
              </Typography>
              {isCreateRequest ? (
                <Typography sx={{ mb: 1 }} color="text.disabled">
                  None
                </Typography>
              ) : (
                <Typography
                  sx={{ mb: 1 }}
                  color={
                    isStorageQuotaChanged ? "text.primary" : "text.disabled"
                  }
                >
                  {defaultStorageOptionsLookup[currentQuota?.storage]}
                </Typography>
              )}
              <Typography
                sx={{ fontSize: 18, fontWeight: "500" }}
                color={isStorageQuotaChanged ? "text.primary" : "text.disabled"}
              >
                Requested Storage
              </Typography>
              {isStorageQuotaChanged ? (
                <Typography sx={{ mb: 1 }} color="text.primary">
                  {defaultStorageOptionsLookup[requestedQuota?.storage]}
                </Typography>
              ) : (
                <Typography sx={{ mb: 1 }} color="text.disabled">
                  No change
                </Typography>
              )}
            </Box>
          </Box>
        </div>
      )}
    </Box>
  );
}
