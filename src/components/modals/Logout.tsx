import { Button } from '@mui/material';
import { addCurrentRestaurant, setIsLoggedUser, setModal } from '@store/redux/actions/actions';
import { useDispatch } from 'react-redux';
import styles from '@styles/Login.module.css';
import { useNavigate } from 'react-router-dom';
import { themeColors } from '@constants/themeColors';

export const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onCloseModalPress = () => {
        dispatch(setModal({ modal: null }));
    };

    const onLogOutModalPress = () => {
        dispatch(setIsLoggedUser({ isLogged: false }));
        dispatch(addCurrentRestaurant({ currentRestaurant: '' }));
        dispatch(setModal({ modal: null }));
        navigate('/');
    };

    return (
        <div className={styles.wrapper}>
            <span>Are you really want to log out?</span>
            <div className={styles.buttonsWrapper}>
                <Button
                    variant="contained"
                    onClick={onLogOutModalPress}
                    size="small"
                    style={{ backgroundColor: themeColors.violet }}
                >
                    Log out
                </Button>
                <Button variant="contained" onClick={onCloseModalPress} size="small" color="error">
                    Cancel
                </Button>
            </div>
        </div>
    );
};
