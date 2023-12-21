import { configureStore } from '@reduxjs/toolkit';
import { persistedReducer } from './slices/rootReducer';
import persistStore from 'redux-persist/es/persistStore';
// import { rootPersistConfig, rootReducer } from './rootReducer';
// const store = createStore(persistedReducer);
const store = configureStore({
    reducer: persistedReducer,
});
const persistor = persistStore(store);

export { store, persistor };