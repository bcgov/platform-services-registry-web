import { useContext } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import TabForm from "./forms/ResponsiveTabForm";
import AdminContext from "../context/admin";
import ReadOnlyAdminContext from "../context/readOnlyAdmin";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { routesUser, routesAdmin } from "./AppRouter";
import ButtonGroup from "@mui/material/ButtonGroup";

import AddIcon from "@mui/icons-material/Add";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#003366",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "#f5f5f5",
    boxShadow: "none"
  },
  boxShadow: "none",
  border: "1px solid",
  borderColor: "#bdbdbd"
}));

function CreateButtons({ privateCloudCreatePath, publicCloudCreatePath }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ whiteSpace: "nowrap", minWidth: "auto" }}
    >
      <ColorButton
        size="small"
        variant="contained"
        href={privateCloudCreatePath}
      >
        Create Private Cloud Project
      </ColorButton>
      <ColorButton
        size="small"
        variant="contained"
        href={publicCloudCreatePath}
      >
        Create Public Cloud Project
      </ColorButton>
    </Stack>
  );
}

// function CreateButtons({ privateCloudCreatePath, publicCloudCreatePath }) {
//   return (
//     <ButtonGroup
//       disableElevation
//       variant="text"
//       aria-label="Disabled elevation buttons"
//       sx={{ whiteSpace: "nowrap", minWidth: "auto" }}
//     >
//       <Button>Create Private Cloud Project</Button>
//       <Button>Create Public Cloud Project</Button>
//     </ButtonGroup>
//   );
// }

export default function TabsToolbar({ routes }) {
  const { pathname } = useLocation();
  const { admin } = useContext(AdminContext);
  const { readOnlyAdmin } = useContext(ReadOnlyAdminContext);

  return (
    <>
      <Toolbar style={{ width: "96%" }}>
        <Typography
          variant="button"
          color="inherit"
          component="div"
          noWrap={true}
          sx={{
            flexGrow: 1,
            fontWeight: 400,
            color: "rgba(0, 0, 0, 0.6)",
            fontSize: 20,
            minWidth: 210,
            // sm: { display: "none", color: "red"}
            display: { xs: "none", sm: "block" }
          }}
        >
          PRODUCT REGISTRY
        </Typography>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ display: { xs: "none", sm: "block" } }}
        />
        <Box sx={{ width: "100%" }}>
          <Tabs value={routes.indexOf(pathname)} aria-label="nav tabs">
            <Tab
              component={Link}
              label={
                pathname.includes("admin") ? "Active Requests" : "Requests"
              }
              to={routes[0]}
            />
            <Tab component={Link} label="Products" to={routes[1]} />
          </Tabs>
        </Box>
        {pathname === routes[1] && (admin || readOnlyAdmin) ? (
          <TabForm />
        ) : (
          <CreateButtons
            privateCloudCreatePath={
              admin || readOnlyAdmin ? routesAdmin[2] : routesUser[2]
            }
            publicCloudCreatePath={
              admin || readOnlyAdmin ? routesAdmin[4] : routesUser[4]
            }
          />
        )}
      </Toolbar>
      <Outlet />
    </>
  );
}
