import { Avatar, Box, Button, Drawer, Menu, MenuItem, Paper, Snackbar, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListing from '../User/UserListing';

const SideDrawer = () => {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [loadingChat, setLoadingChat] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null);
    const open = Boolean(anchorEl);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [state, setState] = React.useState({
        SnackBaropen: false,
        vertical: 'top',
        horizontal: 'right',
    });

    console.log("drawerOpen", drawerOpen)
    const { vertical, horizontal, SnackBaropen } = state;

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setDrawerOpen(open);
    };

    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/')
    }

    useEffect(() => {
        const loginUser = JSON.parse(localStorage.getItem('userInfo'));
        setUser(loginUser);
    }, [])

    const handleCloseSnackBar = () => {
        setState({ ...state, opSnackBaropen: false });
    };

    const handleSearch = async () => {

        if (!search) {
            <Box sx={{ width: 500 }}>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    autoHideDuration={6000}
                    open={true}
                    onClose={handleCloseSnackBar}
                    message="Search User"
                    key={vertical + horizontal}

                />
            </Box>
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            }
            const { data, status } = await axios.get(`http://localhost:7000/user?search=${search}`, config);
            console.log("data", data, status)
            if (status === 200) {
                setLoading(false);
                setSearchResult(data)
            }

        } catch (error) {
            console.log(error.message);
            <Box sx={{ width: 500 }}>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    autoHideDuration={6000}
                    open={true}
                    onClose={handleCloseSnackBar}
                    message={error.message}
                    key={vertical + horizontal}

                />
            </Box>
        }
    }

    return (
        <>
            {
                SnackBaropen && (
                    <Box sx={{ width: 500 }}>
                        <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={SnackBaropen}
                            onClose={handleCloseSnackBar}
                            message="Search User"
                            key={vertical + horizontal}
                        />
                    </Box>
                )
            }
            <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', bgcolor: 'white', width: '100%' }}>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    <Paper sx={{ width: '300px' }}>
                        <Typography color='black' sx={{ fontSize: '24px' }}>
                            Search User
                        </Typography>
                    </Paper>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                        <TextField label="Search User" onChange={(e) => setSearch(e.target.value)} />
                        <Button variant='contained' sx={{ mx: 1 }} onClick={handleSearch}>
                            Go
                        </Button>
                    </Box>
                    {
                        loading ? (
                            <ChatLoading user={user} />
                        ) : (
                            searchResult.length > 0 ? (
                                searchResult.map((usr) => (
                                    <UserListing user={usr} key={usr._id} setDrawerOpen={() => setDrawerOpen(false)} />
                                ))) : (
                                <div>
                                    NO DATA FOUND
                                </div>
                            )
                        )
                    }
                </Drawer>
                <Tooltip title='Search User to chat' arrow placement='bottom-end'>
                    <Button onClick={toggleDrawer(true)}>
                        <SearchIcon color='primary' fontSize="large" />
                        <Typography color='black'>
                            Search User
                        </Typography>
                    </Button>
                </Tooltip>

                <Typography color='black' sx={{ fontSize: '24px', fontFamily: "Work sans" }}>
                    Talk A Tive
                </Typography>
                <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        // onClick={handleClick}
                        disabled="true"
                    >
                        <NotificationsIcon fontSize='large' />
                    </Button>
                    <Button
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        disableElevation
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        <Avatar
                            alt="Pic"
                            name={user?.name}
                            src={user?.profile_pic}
                            sx={{ width: 56, height: 56 }}
                        />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <Profile user={user}>
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                            </Profile>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Button>
                </div>
            </Box>
        </>
    )
}

export default SideDrawer
