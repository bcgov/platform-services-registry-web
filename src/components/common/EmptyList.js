import { useContext } from "react";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import EmptyListImage from '../assets/noProducts.png';
import CreateButtons from "./CreateButtons";
import AdminContext from "../../context/admin";
import ReadOnlyAdminContext from "../../context/readOnlyAdmin";
import { routesUser, routesAdmin } from "../AppRouter";


export default function EmptyList({ title, subtitle, isPrivate, isPublic }) {
    const { admin } = useContext(AdminContext);
    const { readOnlyAdmin } = useContext(ReadOnlyAdminContext);
    return <Box
        display='flex'
        flex='1'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        style={{ height: 'calc(100vh - 135px)' }}
    >
        <img
            src={EmptyListImage}
            alt="no products"
            loading="lazy"
        />
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" style={{ maxWidth: '320px', textAlign: 'center' }}>{subtitle}</Typography>
        <CreateButtons
            privateCloudCreatePath={isPrivate ?
                admin || readOnlyAdmin ? routesAdmin[2] : routesUser[2] : undefined
            }
            publicCloudCreatePath={isPublic ?
                admin || readOnlyAdmin ? routesAdmin[4] : routesUser[4] : undefined
            }
        />
    </Box>
}
