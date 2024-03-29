import { useContext } from "react";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import EmptyListImage from '../assets/noProducts.png';
import CreateButtons from "./CreateButtons";
import AdminContext from "../../context/roles";
import { routesUser, routesAdmin } from "../AppRouter";


export default function EmptyList({ title, subtitle, isPrivate, isPublic }) {
    const { admin, readOnlyAdmin } = useContext(AdminContext);
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
        <Typography variant="body2" style={{ maxWidth: '320px', textAlign: 'center', marginBottom: 30 }}>{subtitle}</Typography>
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
