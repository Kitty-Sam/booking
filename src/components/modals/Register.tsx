import { Button, InputAdornment, TextField } from '@mui/material';
import { addNewUser, fetchOrders, setModal } from '@store/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@styles/Login.module.css';
import { getAllUsers } from '@store/redux/selectors';
import { toast } from 'react-toastify';

import { errorOptions, successOptions } from '@constants/toastOptions';
import { IUser } from '@store/redux/reducers/userReducer';
import { themeColors } from '@constants/themeColors';
import { useFormik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { registerSchema } from '@constants/validationSchema';

export const Register = () => {
    const [isVisible, setIsVisible] = useState(false);
    const allUsers = useSelector(getAllUsers);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            phone: '',
        },
        onSubmit: (values) => {
            const currentUser = allUsers.find((user: IUser) => user.email === values.email);
            if (currentUser) {
                // @ts-ignore
                toast.error('This user is already exists!', errorOptions);
            }
            if (!currentUser) {
                dispatch(
                    addNewUser({
                        email: values.email.trim(),
                        password: values.password.trim(),
                        phone: values.phone.trim(),
                        id: Date.now().toString(),
                    }),
                );

                // @ts-ignore
                toast.success('Success! Now login, please', successOptions);
                dispatch(setModal({ modal: null }));
                dispatch(fetchOrders({ orders: [] }));
            }
        },
        validationSchema: registerSchema,
    });

    const onCancelPress = () => {
        dispatch(setModal({ modal: null }));
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className={styles.wrapper}>
            <span>Register</span>

            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <TextField
                    name="email"
                    label="Email"
                    style={{ marginTop: 30 }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                    name="password"
                    label="Password"
                    style={{ marginTop: 30 }}
                    value={formik.values.password}
                    type={isVisible ? 'text' : 'password'}
                    onChange={formik.handleChange}
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
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <TextField
                    name="phone"
                    label="Phone"
                    placeholder="+1 (123) 456-7890"
                    style={{ marginTop: 30 }}
                    value={formik.values.phone}
                    type="phone"
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />

                <div className={styles.buttonsWrapper}>
                    <Button variant="contained" onClick={onCancelPress} color="error">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" style={{ backgroundColor: themeColors.violet }}>
                        Register
                    </Button>
                </div>
            </form>
        </div>
    );
};
