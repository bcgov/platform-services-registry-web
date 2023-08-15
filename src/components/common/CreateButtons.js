import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RolesContext from "../../context/roles";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#003366",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "#f5f5f5",
    boxShadow: "none",
  },
  boxShadow: "none",
  border: "1px solid",
  borderColor: "#bdbdbd",
}));

export default function CreateButtons({
  privateCloudCreatePath,
  privateCloudCreateLabel,
  publicCloudCreatePath,
  publicCloudCreateLabel,
}) {
  const { featureTester } = useContext(RolesContext);

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ whiteSpace: "nowrap", minWidth: "auto" }}
    >
      {privateCloudCreatePath && (
        <ColorButton
          component={Link}
          to={privateCloudCreatePath}
          size="small"
          variant="contained"
          endIcon={<AddIcon />}
        >
          {privateCloudCreateLabel||'Create Private Cloud Product'}
        </ColorButton>
      )}
      {featureTester && publicCloudCreatePath && (
        <ColorButton
          component={Link}
          to={publicCloudCreatePath}
          size="small"
          variant="contained"
          endIcon={<AddIcon />}
        >
          {publicCloudCreateLabel||'Create Public Cloud Product'}
        </ColorButton>
      )}
    </Stack>
  );
}
