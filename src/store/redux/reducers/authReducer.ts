import { AuthActions } from '@store/redux/actions/type';
import { ActionsType } from '@store/redux/reducers/types';

export interface IAuthInitState {
    isLogged: boolean;
}

const initialState: IAuthInitState = {
    isLogged: false,
};

export const authReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case AuthActions.IS_LOGGED: {
            return { ...state, isLogged: action.payload.isLogged };
        }

        default:
            return state;
    }
};
