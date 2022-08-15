import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingSpinner() {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <CircularProgress
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </Box>
  );
}
