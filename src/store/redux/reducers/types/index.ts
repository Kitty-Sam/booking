import { AuthActions, UserActions } from '@store/redux/actions/type';
import { IOrder, IUser } from '@store/redux/reducers/userReducer';

export interface SetModalPayload {
    modal: 'login' | 'logout' | 'register' | 'profile' | null;
}

export type SetModal = {
    type: typeof UserActions.SET_MODAL;
    payload: SetModalPayload;
};

export interface SetCurrentUserPayload {
    currentUser: IUser;
}

export type SetCurrentUser = {
    type: typeof UserActions.SET_CURRENT_USER;
    payload: SetCurrentUserPayload;
};

export interface SetIsLoggedPayload {
    isLogged: boolean;
}

export type SetIsLoggedUser = {
    type: typeof AuthActions.IS_LOGGED;
    payload: SetIsLoggedPayload;
};

export interface AddNewUserPayload {
    id: string;
    phone: string;
    email: string;
    password: string;
}

export type AddNewUser = {
    type: typeof UserActions.ADD_NEW_USER;
    payload: AddNewUserPayload;
};

export interface RemoveUserPayload {
    id: string;
}

export type RemoveUser = {
    type: typeof UserActions.REMOVE_USER;
    payload: RemoveUserPayload;
};

export interface AddNewOrderPayload {
    id: string;
    quests: number;
    dateAndTime: string | undefined;
    tableNumber: number;
}

export type AddNewOrder = {
    type: typeof UserActions.ADD_NEW_ORDER;
    payload: AddNewOrderPayload;
};

export interface AddCurrentResPayload {
    currentRestaurant: string;
}

export type AddCurrentRes = {
    type: typeof UserActions.ADD_CURRENT_RESTAURANT;
    payload: AddCurrentResPayload;
};

export interface RemoveOrderPayload {
    id: string;
}

export type RemoveOrder = {
    type: typeof UserActions.REMOVE_ORDER;
    payload: RemoveOrderPayload;
};

export interface FetchOrdersPayload {
    orders: IOrder[];
}

export type FetchOrders = {
    type: typeof UserActions.FETCH_ORDERS;
    payload: FetchOrdersPayload;
};

export type ActionsType =
    | SetModal
    | SetCurrentUser
    | SetIsLoggedUser
    | AddNewUser
    | RemoveUser
    | AddNewOrder
    | AddCurrentRes
    | RemoveOrder
    | FetchOrders;
