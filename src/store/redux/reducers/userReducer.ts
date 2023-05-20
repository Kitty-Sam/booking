import { UserActions } from '@store/redux/actions/type';
import { ActionsType } from '@store/redux/reducers/types';

export interface IUser {
    id: string;
    email: string;
    password: string;
    phone: string;
}
export interface IUserInitState {
    modal: 'login' | 'logout' | 'register' | 'profile' | null;
    currentUser: IUser;
    allUsers: IUser[];
}

const initialState: IUserInitState = {
    modal: null,
    currentUser: {} as IUser,
    allUsers: [],
};

export const userReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case UserActions.SET_CURRENT_USER: {
            return { ...state, currentUser: action.payload.currentUser };
        }

        case UserActions.SET_MODAL: {
            return { ...state, modal: action.payload.modal };
        }

        case UserActions.ADD_NEW_USER: {
            const { email, password, id, phone } = action.payload;
            const newUser = {
                id,
                email,
                password,
                phone,
            };
            return { ...state, allUsers: [...state.allUsers, newUser] };
        }

        case UserActions.REMOVE_USER: {
            const { id } = action.payload;

            return { ...state, allUsers: state.allUsers.filter((user) => user.id !== id) };
        }

        default:
            return state;
    }
};
