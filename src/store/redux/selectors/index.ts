import { RootState } from '@store/store';

export const getModal = (state: RootState) => state.user.modal;
export const getIsLogged = (state: RootState) => state.auth.isLogged;
export const getAllUsers = (state: RootState) => state.user.allUsers;
export const getCurrentUser = (state: RootState) => state.user.currentUser;
