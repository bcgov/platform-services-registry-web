import React from 'react'
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { blue } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';

export default function MyHelperIcon({ title, description }) {
    return (
        <Tooltip color="primary"
            arrow
            placement="top"
            title={
                <React.Fragment>
                    <Typography color="inherit" variant="h6">{title}</Typography>
                    {description}
                </React.Fragment>
            }
        >
            <IconButton color="primary" aria-label="help icon" component="span" tabIndex="-1">
                <InfoOutlinedIcon sx={{ position: 'absolute', color: blue[200] }} />
            </IconButton>
        </Tooltip>
    )
}