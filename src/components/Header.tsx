import { Avatar, Button, Typography } from '@mui/material';
import styles from '@styles/Header.module.css';
import { setModal } from '@store/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentRestaurant, getCurrentUser, getIsLogged, getModal } from '@store/redux/selectors';
import { Login } from '@components/modals/Login';
import { CustomModal } from '@components/modals/CustomModal';
import { Logout } from '@components/modals/Logout';
import { Register } from '@components/modals/Register';
import { Menu } from '@components/Menu';
import { useLocation } from 'react-router-dom';
import { getPathName } from '@utils/getPathName';
import { themeColors } from '@constants/themeColors';

export const Header = () => {
    const dispatch = useDispatch();

    const modal = useSelector(getModal);
    const isLogged = useSelector(getIsLogged);
    const currentUser = useSelector(getCurrentUser);
    const currentRestaurant = useSelector(getCurrentRestaurant);

    const onLoginPress = () => {
        dispatch(setModal({ modal: 'login' }));
    };

    const onLogOutPress = () => {
        dispatch(setModal({ modal: 'logout' }));
    };

    const onRegisterPress = () => {
        dispatch(setModal({ modal: 'register' }));
    };

    const location = useLocation();

    return (
        <div className={styles.wrapper}>
            <div className={styles.block}>
                <Menu />
                <Typography variant="h6" className={styles.pathName}>
                    {getPathName(location.pathname)}: {currentRestaurant || ''}
                </Typography>
            </div>

            {isLogged ? (
                <div className={styles.buttonsWrapper}>
                    <Typography variant="h6">{currentUser.email}</Typography>
                    <Avatar onClick={onLogOutPress} className={styles.avatar} />
                </div>
            ) : (
                <div className={styles.buttonsWrapper}>
                    <Button variant="outlined" onClick={onLoginPress}>
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onRegisterPress}
                        style={{ backgroundColor: themeColors.violet }}
                    >
                        Register
                    </Button>
                </div>
            )}

            <CustomModal open={modal === 'login'}>
                <Login />
            </CustomModal>

            <CustomModal open={modal === 'logout'}>
                <Logout />
            </CustomModal>

            <CustomModal open={modal === 'register'}>
                <Register />
            </CustomModal>
        </div>
    );
};
