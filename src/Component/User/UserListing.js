import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CreateChat } from '../../redux/slices/chat';

const UserListing = ({ user, setDrawerOpen }) => {
    const dispatch = useDispatch();
    const loginUser = JSON.parse(localStorage.getItem('userInfo'));
    // const selectedChat = useSelector((state) => state.chat.SelectedChat);
    const chatData = useSelector((state) => state.chat.chatData);




    const accessChat = async (userId) => {
        try {
            const config = {
                'Content-type': 'application/json',
                headers: {
                    Authorization: `Bearer ${loginUser?.token}`
                }
            }
            dispatch(CreateChat(userId, config, dispatch, setDrawerOpen, chatData));

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Box
            onClick={() => accessChat(user._id)}
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
                background: "#38B2AC",
                color: "white",
            }}
            w="100%"
            d="flex"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
            />
            <Box>
                <Typography>{user.name}</Typography>
                <Typography fontSize="xs">
                    <b>Email : </b>
                    {user.email}
                </Typography>
            </Box>
        </Box>
    )
}

export default UserListing
