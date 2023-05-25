import {
    AddCurrentResPayload,
    AddNewOrderPayload,
    AddNewUserPayload,
    FetchOrdersPayload,
    RemoveOrderPayload,
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

export const addNewOrder = (payload: AddNewOrderPayload) => ({
    type: UserActions.ADD_NEW_ORDER,
    payload,
});

export const addCurrentRestaurant = (payload: AddCurrentResPayload) => ({
    type: UserActions.ADD_CURRENT_RESTAURANT,
    payload,
});

export const removeOrder = (payload: RemoveOrderPayload) => ({
    type: UserActions.REMOVE_ORDER,
    payload,
});

export const fetchOrders = (payload: FetchOrdersPayload) => ({
    type: UserActions.FETCH_ORDERS,
    payload,
});
