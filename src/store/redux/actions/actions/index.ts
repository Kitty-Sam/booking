import {
    AddNewUserPayload,
    RemoveUserPayload,
    SetCurrentUserPayload,
    SetIsLoggedPayload,
    SetModalPayload,
} from '../../reducers/types';
import { AuthActions, UserActions } from '@store/redux/actions/type';

export const setModal = (payload: SetModalPayload) => ({
    type: UserActions.SET_MODAL,
    payload,
});

export const setCurrentUser = (payload: SetCurrentUserPayload) => ({
    type: UserActions.SET_CURRENT_USER,
    payload,
});

export const setIsLoggedUser = (payload: SetIsLoggedPayload) => ({
    type: AuthActions.IS_LOGGED,
    payload,
});

export const addNewUser = (payload: AddNewUserPayload) => ({
    type: UserActions.ADD_NEW_USER,
    payload,
});
export const removeUser = (payload: RemoveUserPayload) => ({
    type: UserActions.REMOVE_USER,
    payload,
});
