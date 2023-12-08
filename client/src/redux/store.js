import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';


const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const rootReducer = combineReducers({user: userReducer});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistedStore = persistStore(store);
