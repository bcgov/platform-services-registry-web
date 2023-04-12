import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useLocation } from "react-router-dom";
import { routesUser, routesAdmin } from "./Constants";

export default function CreateBtn() {
    const pathName = useLocation().pathname;
    const createButtonRoute =
        pathName === (routesAdmin[1] || routesAdmin[0])
            ? routesAdmin[2] : routesUser[2]

    return <Button
        component={Link}
        to={createButtonRoute}
        variant="outlined"
        style={{ border: "none", marginTop: 8, marginLeft: 15 }}
        size="large"
        endIcon={<AddIcon />}
    >
        Create
    </Button>

}
