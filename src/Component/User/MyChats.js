import React from 'react'
import { useDispatch } from 'react-redux';
import { FetchUserChat } from '../../redux/slices/chat';

const MyChats = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const selectedChat = useSelector((state) => state.chat.SelectedChat);
    const dispatch = useDispatch();


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

    useEffect

    return (
        <div>

        </div>
    )
}

export default MyChats
