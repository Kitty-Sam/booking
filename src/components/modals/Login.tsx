import { Button, InputAdornment, TextField } from '@mui/material';
import { setCurrentUser, setIsLoggedUser, setModal } from '@store/redux/actions/actions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styles from '@styles/Login.module.css';
import { getAllUsers } from '@store/redux/selectors';
import { toast } from 'react-toastify';

import { errorOptions, successOptions } from '@constants/toastOptions';
import { IUser } from '@store/redux/reducers/userReducer';
import { themeColors } from '@constants/themeColors';
import { useFormik } from 'formik';
import { loginSchema } from '@constants/validationSchema';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

export const Login = () => {
    const [isVisible, setIsVisible] = useState(false);
    const allUsers = useSelector(getAllUsers, shallowEqual);

    const dispatch = useDispatch();

    const onCancelPress = () => {
        dispatch(setModal({ modal: null }));
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            const currentUser = allUsers.find((user: IUser) => user.email === values.email);

            if (!currentUser) {
                // @ts-ignore
                toast.info('Register first!', errorOptions);
                return;
            }
            if (currentUser && currentUser.password === values.password) {
                dispatch(setIsLoggedUser({ isLogged: true }));
                dispatch(setCurrentUser({ currentUser }));
                dispatch(setModal({ modal: null }));
                // @ts-ignore
                toast.success('Success!', successOptions);
                return;
            }
            // @ts-ignore
            toast.error('Check your credentials!', errorOptions);
        },
        validationSchema: loginSchema,
    });

    return (
        <div className={styles.wrapper}>
            <span>Login</span>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <TextField
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    style={{ marginTop: 20 }}
                    helperText={formik.errors.email}
                />

                <TextField
                    name="password"
                    label="Password"
                    value={formik.values.password}
                    type={isVisible ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    style={{ marginTop: 20 }}
                    helperText={formik.errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {isVisible ? (
                                    <Visibility onClick={toggleVisibility} />
                                ) : (
                                    <VisibilityOff onClick={toggleVisibility} />
                                )}
                            </InputAdornment>
                        ),
                    }}
                />

                <div className={styles.buttonsWrapper}>
                    <Button variant="contained" onClick={onCancelPress} color="error">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" style={{ backgroundColor: themeColors.violet }}>
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
};
