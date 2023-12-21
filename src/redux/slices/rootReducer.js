import { combineReducers } from "redux";
import ChatReducer from './chat'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root', // key is required
    storage, // storage is required
};


const rootReducer = combineReducers({
    chat: ChatReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export { persistedReducer };