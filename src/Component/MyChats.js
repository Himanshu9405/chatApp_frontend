import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FetchUserChat } from '../redux/slices/chat';
import { Autocomplete, Avatar, Box, Button, Modal,  TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { selectedChat } from '../redux/slices/chat';
import ChatLoading from './ChatLoading';
import { getSenderName } from '../common/Logic';

const MyChats = () => {
    const [groupChatModal, setGroupModal] = useState(false);
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const selectedChatt = useSelector((state) => state.chat.SelectedChat);
    const chatData = useSelector((state) => state.chat.chatData);
    console.log("chat Data", chatData)
    const dispatch = useDispatch();

    console.log("selectedChatt", selectedChatt)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const fetchChat = async () => {
        try {
            const config = {
                'Content-type': 'application/json',
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            }

            dispatch(FetchUserChat(config, dispatch));

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchChat();
    }, [])

    return (
        <Box
            sx={{
                display: {
                    true: 'none',
                    false: 'flex',
                }[selectedChatt], md: { display: "flex" },
                flexDirection: "column", alignItems: 'center', pt: 2, pr: 2, bgcolor: 'white', width: { base: "100%", md: '31%' },
                color: 'black', height: '80vh'
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    pb: 3, px: 3,
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"

            >
                My Chats
                <Button
                    fontSize={{ base: '17px', md: '10px', lg: '17px' }}
                    sx={{ mr: 2 }}
                    endIcon={<AddIcon />}
                    color='secondary'
                    onClick={() => setGroupModal(true)}
                >
                    New Group Chat
                </Button>
            </Box>
            <Box
                d="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                w="100%"
                h="100%"
                borderRadius="lg"
            // overflowY="hidden"
            >
                {
                    chatData?.length > 0 ? (
                        <Box sx={{ overflowY: 'scroll', height: "60vh", backgroundColor: "#E8E8E8" }}>
                            {
                                chatData.map((chat) => (
                                    <Box
                                        onClick={() => dispatch(selectedChat(chat))}
                                        cursor="pointer"
                                        bgcolor={selectedChatt._id === chat._id ? "#38B2AC" : "#E8E8E8"}
                                        color={selectedChatt._id === chat._id ? "white" : "black"}
                                        px={3}
                                        py={2}
                                        borderRadius="lg"
                                        key={chat._id}
                                        sx={{ display: 'flex', alignContent: "center", alignItems: 'center' }}
                                    >
                                        <Avatar
                                            size="sm"
                                            // cursor={isLoading ? 'not-allowed' : 'pointer'}
                                            name={user?.name}
                                            src={user?.pic}
                                        />
                                        <Typography sx={{ ml: 3 }}>
                                            {
                                                !chat.isGroupChat ? (getSenderName(user, chat.users)) : (chat.chatName)
                                            }
                                        </Typography>
                                    </Box>
                                ))
                            }
                        </Box>
                    ) : (
                        <ChatLoading />
                    )
                }
            </Box>
            {groupChatModal && (
                <Modal
                    open={groupChatModal}
                    onClose={() => setGroupModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box>
                            <Typography fontSize={{ base: "28px", md: "30px" }}
                                fontFamily="Work sans">
                                <b>Create Group Chat</b>
                            </Typography>
                        </Box>
                        <Box>
                            <TextField label="Group Chat Name" fullWidth />
                            <Autocomplete
                                sx={{ mt: 2 }}
                                multiple
                                fullWidth
                                options={chatData[0].users}
                                getOptionLabel={(option) => option.name}
                                // defaultValue={[options[13]]}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField {...params} label="Group Users" placeholder="Add Users" />
                                )}
                            />
                        </Box>
                        <Button sx={{ mt: 2, float: "right" }} color='secondary'>
                            Create Chat
                        </Button>
                    </Box>
                </Modal>
            )}
        </Box>
    )
}

export default MyChats
