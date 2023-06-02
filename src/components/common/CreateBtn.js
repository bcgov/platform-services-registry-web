import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AdminContext from "../../context/admin";
import { routesUser, routesAdmin } from "../AppRouter";

export default function CreateBtn() {
  const isAdmin = useContext(AdminContext);
  const createButtonRoute = isAdmin.admin ? routesAdmin[2] : routesUser[2];

  return (
    <Button
      component={Link}
      to={createButtonRoute}
      variant="outlined"
      style={{ border: "none", marginTop: 8, marginLeft: 15 }}
      size="large"
      endIcon={<AddIcon />}
    >
      Create
    </Button>
  );
}
