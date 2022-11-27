import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import LocationOn from "@mui/icons-material/LocationOn";
import Switch from "@mui/material/Switch";

export default function UserCard({ toggleEdit, children }) {
  return (
    <Card>
      <Box
        sx={{
          p: 2,
          display: "flex"
        }}
      >
        <Avatar variant="rounded" src="avatar1.jpg" />
        <Stack sx={{ width: "100%", ml: 2 }} spacing={0.5}>
          <Typography fontWeight={700}>Michael Scott</Typography>
          <Typography variant="body2" color="text.secondary">
            Scranton, PA
          </Typography>
        </Stack>
        <IconButton sx={{ width: 40, height: 40, p: 1 }}>
          <Edit sx={{ fontSize: 17 }} />
        </IconButton>
      </Box>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, py: 1, bgcolor: "background.default" }}
      >
        {children}
      </Stack>
    </Card>
  );
}
