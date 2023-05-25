import * as Yup from 'yup';

export const phoneRegExp = /^(\+\d{1,4})?[-\s]?(\(\d{1,3}\)[-.\s]?)?(\d{2,4}[-.\s]?){1,2}\d{3,4}$/;

export const registerSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email'),
    password: Yup.string().min(3, 'Too Short Password!').max(50, 'Too Long Password!'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email'),
    password: Yup.string().min(3, 'Too Short Password!').max(50, 'Too Long Password!'),
});
