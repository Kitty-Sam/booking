import { RootState } from '@store/store';
// @ts-ignore
export const getModal = (state: RootState) => state.user.modal;
export const getIsLogged = (state: RootState) => state.auth.isLogged;
// @ts-ignore
export const getAllUsers = (state: RootState) => state.user.allUsers;
// @ts-ignore
export const getCurrentUser = (state: RootState) => state.user.currentUser;
// @ts-ignore
export const getOrders = (state: RootState) => state.user.orders;
// @ts-ignore
export const getCurrentRestaurant = (state: RootState) => state.user.currentRestaurant;
