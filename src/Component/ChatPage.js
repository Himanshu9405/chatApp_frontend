import React, { useEffect, useState } from 'react';
// import axios from "axios";
import { Box } from '@mui/material';
import SideDrawer from './miscellaneous/SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';

const ChatPage = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const login = JSON.parse(localStorage.getItem('userInfo'));
        setUser(login);
    }, []);
    console.log("user", user)
    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box sx={{ display: 'flex', justifyContent: "space-between", width: '90%', height: "91.5", p: 5 }}>
                {user && <MyChats />}
                {user && <ChatBox />}
            </Box>

        </div>
    )
}

export default ChatPage
