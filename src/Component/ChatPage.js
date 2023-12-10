import React, { useEffect, useState } from 'react';
import axios from "axios";

const ChatPage = () => {
    const [chats, setChats] = useState([]);
    const fethData = async () => {
        const result = await axios.get('http://localhost:7000/chat');
        console.log("result", result);
        setChats(result.data);
    }
    useEffect(() => {
        fethData();
    }, [])
    return (
        <div>
            {chats.length > 0 ?
                chats.map((chat) => (
                    <div key={chat._id}>{chat.chatName} </div>
                )) : ''}
        </div>
    )
}

export default ChatPage
