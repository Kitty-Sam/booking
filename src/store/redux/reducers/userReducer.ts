import { UserActions } from '@store/redux/actions/type';
import { ActionsType } from '@store/redux/reducers/types';

export interface IUser {
    id: string;
    email: string;
    password: string;
    phone: string;
}

export interface IOrder {
    id: string;
    dateAndTime: string;
    quests: number;
    tableNumber: number;
}
export interface IUserInitState {
    modal: 'login' | 'logout' | 'register' | 'profile' | null;
    currentUser: IUser;
    allUsers: IUser[];
    orders: IOrder[];
    currentRestaurant: string;
}

const initialState: IUserInitState = {
    modal: null,
    currentUser: {} as IUser,
    allUsers: [],
    orders: [],
    currentRestaurant: '',
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

        case UserActions.ADD_NEW_ORDER: {
            const { id, dateAndTime, quests, tableNumber } = action.payload;
            const newOrder = {
                id,
                dateAndTime,
                quests,
                tableNumber,
            };
            return { ...state, orders: [...state.orders, newOrder] };
        }

        case UserActions.REMOVE_USER: {
            const { id } = action.payload;

            return { ...state, allUsers: state.allUsers.filter((user) => user.id !== id) };
        }

        case UserActions.ADD_CURRENT_RESTAURANT: {
            return { ...state, currentRestaurant: action.payload.currentRestaurant };
        }

        case UserActions.REMOVE_ORDER: {
            const { id } = action.payload;
            console.log('remove order');

            return { ...state, orders: state.orders.filter((order) => order.id !== id) };
        }

        default:
            return state;
    }
};
