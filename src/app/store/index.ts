import { combineReducers, configureStore } from "@reduxjs/toolkit"

import {
    persistReducer,
    persistStore,
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import storage from "redux-persist/es/storage";

import sessionSlice from "@entities/session";
import userSlice from "@entities/users";

export const rootReducer = combineReducers({
    session: sessionSlice,
    user: userSlice
})

const persistConfig = {
    key: 'root',
    storage: storage,
    whiteList: ['session'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const setupStore  = () => {
    return configureStore({
        reducer: pReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            });
        },
    })
}

export const store = setupStore()

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
