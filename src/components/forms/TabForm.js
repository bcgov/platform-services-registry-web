import Box from "@mui/material/Box";
import DownloadCsv from "../DownloadCsv";
import Search from "../Search";
import FilterPrivate from "../FilterPrivateCloud";
import FilterPublic from "../FilterPublicCloud";

export default function TabForm({isPrivate}) {
  return (
    <Box
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        flexGrow: 1,
        width: "100%",
      }}
    >
      <Search />
      {isPrivate ? <FilterPrivate /> : <FilterPublic />}
      <DownloadCsv />
    </Box>
  );
}
