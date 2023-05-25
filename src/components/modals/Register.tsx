import { Button, TextField } from '@mui/material';
import { addNewUser, setModal } from '@store/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@styles/Login.module.css';
import { ChangeEvent, useState } from 'react';
import { getAllUsers } from '@store/redux/selectors';
import { toast } from 'react-toastify';

import { errorOptions, successOptions } from '@constants/toastOptions';
import { IUser } from '@store/redux/reducers/userReducer';
import { themeColors } from '@constants/themeColors';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const dispatch = useDispatch();

    const allUsers = useSelector(getAllUsers);
    const currentUser = allUsers.find((user: IUser) => user.email === email);

    const onRegisterPress = () => {
        if (currentUser) {
            // @ts-ignore
            toast.error('This user is already exists!', errorOptions);
        }
        if (!currentUser) {
            dispatch(
                addNewUser({
                    email: email.trim(),
                    password: password.trim(),
                    phone: phone.trim(),
                    id: Date.now().toString(),
                }),
            );

            // @ts-ignore
            toast.success('Success! Now login, please', successOptions);
            dispatch(setModal({ modal: null }));
        }
    };

    const onCancelPress = () => {
        dispatch(setModal({ modal: null }));
    };

    return (
        <div className={styles.wrapper}>
            <span>Register</span>

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

                <TextField
                    id="outlined-controlled"
                    label="Phone"
                    value={phone}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setPhone(event.target.value);
                    }}
                />
            </div>
            <div className={styles.buttonsWrapper}>
                <Button variant="contained" onClick={onCancelPress} color="error">
                    Cancel
                </Button>
                <Button variant="contained" onClick={onRegisterPress} style={{ backgroundColor: themeColors.violet }}>
                    Register
                </Button>
            </div>
        </div>
    );
};
