
import * as yup from 'yup';

export const validationSchema = yup.object({
    email: yup
        .string()
        .email('Введите корректный email')
        .required('Почта обязательна'),
    password: yup
        .string()
        .min(6, 'Пароль должен быть состоять не менее чем из 6 симовлов')
        .required('Пароль обязателен'),
});