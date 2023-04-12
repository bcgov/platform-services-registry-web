import React from "react";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import EmptyListImage from '../assets/noProducts.png';
import CreateBtn from "./CreateBtn"; 

export default function EmptyList() {
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
        <Typography variant="h5">There are no requests to be displayed</Typography>
        <Typography variant="body2">You currently have no provisioning requests for the OpenShift 4 platform.</Typography>
        <CreateBtn/>
    </Box>

}
