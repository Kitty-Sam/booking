import { Button } from '@mui/material';
import { setIsLoggedUser, setModal } from '@store/redux/actions/actions';
import { useDispatch } from 'react-redux';
import styles from '@styles/Login.module.css';

export const Logout = () => {
    const dispatch = useDispatch();
    const onCloseModalPress = () => {
        dispatch(setModal({ modal: null }));
    };

    const onLogOutModalPress = () => {
        dispatch(setIsLoggedUser({ isLogged: false }));
        dispatch(setModal({ modal: null }));
    };

    return (
        <div className={styles.wrapper}>
            <span>Are you really want to log out?</span>
            <div className={styles.buttonsWrapper}>
                <Button variant="contained" onClick={onLogOutModalPress} size="small">
                    Log out
                </Button>
                <Button variant="contained" onClick={onCloseModalPress} size="small" color="error">
                    Cancel
                </Button>
            </div>
        </div>
    );
};
