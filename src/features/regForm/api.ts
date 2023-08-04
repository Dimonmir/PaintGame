
import { addToken, removeToken } from '@entities/session/sessionSlice';
import { app } from '@/main';
import { useAppDispatch } from '@/shared/store/redux';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
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
    name: yup
        .string()
        .max(30, 'Слишком длинное имя')
        .required('Пароль обязателен'),
});

export const regTry = async (email: string, password: string) => {
    const auth = getAuth(app);
    return  createUserWithEmailAndPassword(auth, email, password)
}