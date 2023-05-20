import { Button, TextField } from '@mui/material';
import { setCurrentUser, setIsLoggedUser, setModal } from '@store/redux/actions/actions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styles from '@styles/Login.module.css';
import { ChangeEvent, useState } from 'react';
import { getAllUsers } from '@store/redux/selectors';
import { toast } from 'react-toastify';

import { errorOptions, successOptions } from '@constants/toastOptions';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const allUsers = useSelector(getAllUsers, shallowEqual);

    const currentUser = allUsers.find((user) => user.email === email);

    const dispatch = useDispatch();

    const onLoginPress = () => {
        if (!currentUser) {
            toast.info('Register first!', errorOptions);
            return;
        }
        if (currentUser && currentUser.password === password) {
            dispatch(setIsLoggedUser({ isLogged: true }));
            dispatch(setCurrentUser({ currentUser }));
            dispatch(setModal({ modal: null }));
            toast.success('Success!', successOptions);
            return;
        }
        toast.error('Check your credentials!', errorOptions);
    };

    const onCancelPress = () => {
        dispatch(setModal({ modal: null }));
    };

    return (
        <div className={styles.wrapper}>
            <span>Login</span>

            <div className={styles.form}>
                <TextField
                    id="outlined-controlled"
                    label="Email"
                    value={email}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setEmail(event.target.value);
                    }}
                />

                <TextField
                    id="outlined-controlled"
                    label="Password"
                    value={password}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setPassword(event.target.value);
                    }}
                />
            </div>
            <div className={styles.buttonsWrapper}>
                <Button variant="contained" onClick={onCancelPress} color="error">
                    Cancel
                </Button>
                <Button variant="contained" onClick={onLoginPress}>
                    Login
                </Button>
            </div>
        </div>
    );
};
