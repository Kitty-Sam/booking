import { Avatar, Button, Typography } from '@mui/material';
import styles from '@styles/Header.module.css';
import { setModal } from '@store/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, getIsLogged, getModal } from '@store/redux/selectors';
import { Login } from '@components/modals/Login';
import { CustomModal } from '@components/modals/CustomModal';
import { Logout } from '@components/modals/Logout';
import { Register } from '@components/modals/Register';
import { Menu } from '@components/Menu';

export const Header = () => {
    const dispatch = useDispatch();

    const modal = useSelector(getModal);
    const isLogged = useSelector(getIsLogged);
    const currentUser = useSelector(getCurrentUser);

    const onLoginPress = () => {
        dispatch(setModal({ modal: 'login' }));
    };

    const onLogOutPress = () => {
        dispatch(setModal({ modal: 'logout' }));
    };

    const onRegisterPress = () => {
        dispatch(setModal({ modal: 'register' }));
    };

    return (
        <div className={styles.wrapper}>
            <Menu />

            {isLogged ? (
                <div className={styles.buttonsWrapper}>
                    <Typography variant="h6" className={styles.email}>
                        {currentUser.email}
                    </Typography>
                    <Avatar onClick={onLogOutPress} />
                </div>
            ) : (
                <div className={styles.buttonsWrapper}>
                    <Button variant="outlined" onClick={onLoginPress}>
                        Login
                    </Button>
                    <Button variant="contained" onClick={onRegisterPress}>
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
