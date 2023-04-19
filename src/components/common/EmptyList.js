import React from "react";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import EmptyListImage from '../assets/noProducts.png';
import CreateBtn from "./CreateBtn"; 

export default function EmptyList({title, subtitle}) {
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
        <Typography variant="body2" style={{maxWidth:'320px', textAlign:'center'}}>{subtitle}</Typography>
        <CreateBtn/>
    </Box>

}
