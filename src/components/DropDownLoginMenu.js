import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useKeycloak } from "@react-keycloak/web";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Typography from "@mui/material/Typography";

export default function DropDownLoginMenu({ setMode }) {
    const { keycloak } = useKeycloak();
    const [anchorEl, setAnchorEl] = useState(null);
    const [localMode, setLocalMode] = useState(localStorage.getItem('appMode') === 'light' || true)
    const open = Boolean(anchorEl);

    const togglemode = () => {
        setLocalMode(!localMode)
        setMode(localMode ? 'light' : 'dark')
        localStorage.setItem('appMode', localMode ? 'light' : 'dark')
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const login = useCallback(() => {
        keycloak?.login({ idpHint: "idir" });
    }, [keycloak]);

    return (
        <Box>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>
                        {keycloak?.authenticated ? <AccountCircleIcon /> : <HomeIcon />}
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Typography
                        variant="body"
                        color="inherit"
                        component="p"
                        sx={{ flexGrow: 1 }}
                    >  {localMode ? 'Light' : 'Dark'}
                        <IconButton sx={{ ml: 1 }} onClick={togglemode} color="inherit">
                            {localMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Typography>
                </MenuItem>
                {/* <MenuItem>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                    <Avatar /> My account
                </MenuItem>*/}
                <Divider />
                {/* <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem> */}
                {!!keycloak?.authenticated ? (
                    <MenuItem onClick={() => keycloak.logout()}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                ) : (
                    <MenuItem onClick={login}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Login
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
}
