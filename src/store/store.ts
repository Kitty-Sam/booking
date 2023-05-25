import { combineReducers } from 'redux';
import { userReducer } from '@store/redux/reducers/userReducer';
import { authReducer } from '@store/redux/reducers/authReducer';

export const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
