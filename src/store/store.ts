import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@store/redux/reducers/userReducer';
import { authReducer } from '@store/redux/reducers/authReducer';

export const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
});
export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
    });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
