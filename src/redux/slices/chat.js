import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    SelectedChat: {}, chatData: []
}

const slice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // loading
        loading(state, action) {
            state.isLoading = action.payload;
        },

        selectedChat(state, action) {
            state.SelectedChat = action.payload;
        },

        getChatData(state, action) {
            state.chatData = action.payload;
            console.log("chatData", state.chatData)
        }

    }
});
export const {selectedChat} = slice.actions;
export default slice.reducer;

export function CreateChat(userId, config, dispatch, setDrawerOpen, chatData) {
    return async () => {
        dispatch(slice.actions.loading());
        try {

            const response = await axios.post(
                `http://localhost:7000/chat`, { userId }, config,
            );
            console.log(!chatData.find((c) => c._id === response?.data?._id))
            if (!chatData.find((c) => c._id === response?.data?._id)) {
                console.log("called if slice")
                const updatedChat = [response?.data, ...chatData];
                console.log("updated", updatedChat)
                dispatch(slice.actions.getChatData(updatedChat));
            }
            if (response?.status === 200) {
                setDrawerOpen()
            }
            console.log("selected state", response.data)
            dispatch(slice.actions.selectedChat(response.data));
        } catch (error) {
            // dispatch(slice.actions.hasError(error.message));
            throw error;
        }
    };
}


export function FetchUserChat(config, dispatch) {
    return async () => {
        dispatch(slice.actions.loading());
        try {
            const response = await axios.get(
                `http://localhost:7000/chat`, config,
            );
            console.log("respone get ", response);
            dispatch(slice.actions.getChatData(response.data));
        } catch (error) {
            // dispatch(slice.actions.hasError(error.message));
            throw error;
        }
    };
}
// export function delteUserName(userId: number) {
//     return async () => {
//         dispatch(slice.actions.startLoading());
//         try {
//             const response: any = await axios.delete(
//                 `${process.env.REACT_APP_BASE_URL}/candidate/${userId}`
//             );
//             return response;
//         } catch (error: any) {
//             dispatch(slice.actions.hasError(error.message));
//             throw error;
//         }
//     };
// }